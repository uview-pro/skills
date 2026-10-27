#!/usr/bin/env node
/**
 * update-api.mjs —— uview-pro API 快照「一条命令」更新（维护者用，author-time，零依赖 Node >= 18）
 * ------------------------------------------------------------------
 * 在项目根目录执行，依次完成三步，任一步失败即中止（exit 1）：
 *   ① 重提取并重生成：从组件库源码生成 references/api/model.json + 全部卡片 + 索引
 *   ② 一致性核对：gen-api-cards.mjs --check（磁盘产物 vs 模型，应 0 漂移）
 *   ③ 语料回归：verify-u-usage.mjs 扫页面目录（应 0 error；目录不存在自动跳过）
 * 结束后输出「变更报告」：库版本 / 全库指纹 / 组件新增·移除·API 变更清单。
 *
 * 用法：
 *   node <本脚本路径> [--lib <dir>] [--verify <dir>] [--no-verify]
 *
 *   --lib <dir>     组件库源码目录（默认 <cwd>/uni_modules/uview-pro）
 *                   源码不可读（如加密）时无法更新，请在源码可读环境执行；
 *                   消费侧无需本脚本——快照与卡片随技能发货。
 *   --verify <dir>  页面语料目录（默认 <cwd>/pages）
 *   --no-verify     跳过语料回归
 *
 * 退出码：0 = 全部通过；1 = 任一步失败或环境错误；2 = 参数错误
 */

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.resolve(SCRIPT_DIR, '..');
const GEN_SCRIPT = path.join(SCRIPT_DIR, 'gen-api-cards.mjs');
const VERIFY_SCRIPT = path.join(SCRIPT_DIR, 'verify-u-usage.mjs');
const SNAPSHOT_PATH = path.join(SKILL_ROOT, 'references', 'api', 'model.json');

function usage() {
    console.error('用法：node scripts/update-api.mjs [--lib <组件库目录>] [--verify <页面目录>] [--no-verify]');
}

function parseArgs(argv) {
    const opts = { lib: null, verify: null, noVerify: false };
    for (let i = 0; i < argv.length; i++) {
        const a = argv[i];
        if (a === '--lib') opts.lib = argv[++i];
        else if (a === '--verify') opts.verify = argv[++i];
        else if (a === '--no-verify') opts.noVerify = true;
        else {
            console.error(`未知参数：${a}`);
            usage();
            process.exit(2);
        }
    }
    return opts;
}

function readSnapshot() {
    try {
        return JSON.parse(fs.readFileSync(SNAPSHOT_PATH, 'utf8'));
    } catch {
        return null;
    }
}

/** 运行子脚本（stdio 直通）；失败返回 false（原因由子脚本与下方提示给出） */
function runStep(label, script, args) {
    console.log(`\n[update-api] ${label}`);
    const r = spawnSync(process.execPath, [script, ...args], { stdio: 'inherit' });
    if (r.error) {
        console.error(`[update-api] 无法启动子进程：${r.error.message}`);
        return false;
    }
    if (r.status !== 0) {
        console.error(`[update-api] 步骤失败（exit ${r.status ?? 'signal'}）：${label}。修复后重跑本命令`);
        return false;
    }
    return true;
}

/** 新旧快照对比 → 变更报告行（旧快照缺失时按首次生成） */
function buildReport(oldModel, newModel) {
    const newComps = newModel.components ?? {};
    const newNames = Object.keys(newComps).sort();

    if (!oldModel?.components) {
        return [`首次生成：库版本 v${newModel.libVersion}，${newNames.length} 个组件`];
    }

    const oldComps = oldModel.components;
    const oldNames = Object.keys(oldComps).sort();
    const added = newNames.filter((n) => !oldComps[n]);
    const removed = oldNames.filter((n) => !newComps[n]);
    const changed = newNames.filter((n) => oldComps[n] && oldComps[n].apiHash !== newComps[n].apiHash);

    const lines = [];
    if (oldModel.libVersion !== newModel.libVersion) {
        lines.push(`库版本：v${oldModel.libVersion} → v${newModel.libVersion}`);
    }
    if (oldModel.libHash !== newModel.libHash) {
        lines.push(`全库 API 指纹：${String(oldModel.libHash).slice(0, 23)}… → ${String(newModel.libHash).slice(0, 23)}…`);
    }
    const cap = (arr) => arr.slice(0, 8).join('、') + (arr.length > 8 ? ` 等 ${arr.length} 个` : '');
    if (added.length === 0 && removed.length === 0 && changed.length === 0) {
        lines.push(`组件 ${newNames.length} 个，无 API 变更（快照与库一致）`);
    } else {
        lines.push(`组件 ${newNames.length} 个：新增 ${added.length}${added.length ? `（${cap(added)}）` : ''}｜` +
            `移除 ${removed.length}${removed.length ? `（${cap(removed)}）` : ''}｜` +
            `API 变更 ${changed.length}${changed.length ? `（${cap(changed)}）` : ''}`);
    }
    return lines;
}

function main() {
    const opts = parseArgs(process.argv.slice(2));
    const cwd = process.cwd();

    // ---- 预检：组件库源码必须可读（加密场景给出明确报错，而非静默） ----
    const lib = path.resolve(cwd, opts.lib ?? path.join('uni_modules', 'uview-pro'));
    if (!fs.existsSync(lib)) {
        console.error(`[update-api] 组件库目录不存在：${lib}`);
        console.error('[update-api] 请用 --lib <组件库目录> 指定；源码加密/不可读的项目无法更新快照（消费侧无需本脚本，快照随技能发货）');
        process.exit(1);
    }
    if (!fs.existsSync(path.join(lib, 'components'))) {
        console.error(`[update-api] 组件库源码不可读（缺少 components/，可能已加密）：${lib}`);
        console.error('[update-api] 更新需在源码可读环境执行；消费侧快照随技能发货，无需运行本脚本');
        process.exit(1);
    }

    const oldModel = readSnapshot();

    if (!runStep('① 重新提取并生成（model.json + 卡片 + 索引）', GEN_SCRIPT, ['--lib', lib])) process.exit(1);
    if (!runStep('② 一致性核对（--check）', GEN_SCRIPT, ['--check'])) process.exit(1);

    if (!opts.noVerify) {
        const verifyDir = path.resolve(cwd, opts.verify ?? 'pages');
        const verifyLabel = opts.verify ?? 'pages';
        if (!fs.existsSync(verifyDir)) {
            if (opts.verify) {
                console.error(`\n[update-api] --verify 指定目录不存在：${verifyDir}`);
                process.exit(1);
            }
            console.log(`\n[update-api] ③ 跳过语料回归：${verifyLabel} 不存在（可用 --verify <dir> 指定）`);
        } else if (!runStep(`③ 语料回归（verify-u-usage ${verifyLabel}）`, VERIFY_SCRIPT, [verifyDir])) {
            console.error('[update-api] 语料回归未通过：若为页面用了已改名/删除的 API，修正页面即可；若怀疑提取异常，请查看上方明细');
            process.exit(1);
        }
    }

    const newModel = readSnapshot();
    console.log('\n[update-api] 变更报告');
    if (!newModel) {
        console.error('  快照读取失败（更新产物缺失或损坏，请重跑本命令）');
        process.exit(1);
    }
    for (const line of buildReport(oldModel, newModel)) console.log('  ' + line);
    console.log('[update-api] ✅ 更新完成：快照与卡片已同步，全部检查通过');
}

main();
