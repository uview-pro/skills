const fs = require('fs');
const path = require('path');

// 文档根目录
const docsRoot = path.join(__dirname, '../../uView-Pro-Doc/docs/zh');
// Skills输出目录
const skillsRoot = path.join(__dirname, '../skills/uview-pro');
const referencesDir = path.join(skillsRoot, 'references');

// 要处理的目录列表
const dirs = [
    { name: 'guide', type: 'guide', label: '指南' },
    { name: 'components', type: 'component', label: '组件' },
    { name: 'tools', type: 'tool', label: '工具' },
    { name: 'hooks', type: 'hook', label: '钩子' },
    { name: 'layout', type: 'layout', label: '布局' }
];

// 中文关键词映射（常用组件/工具的中文名）
const chineseNameMap = {
    // 组件
    button: '按钮',
    input: '输入框',
    textarea: '文本域',
    form: '表单',
    field: '表单字段',
    modal: '模态框',
    popup: '弹出层',
    toast: '轻提示',
    loading: '加载',
    icon: '图标',
    image: '图片',
    avatar: '头像',
    badge: '徽标',
    tag: '标签',
    card: '卡片',
    cell: '单元格',
    grid: '宫格',
    list: '列表',
    swiper: '轮播图',
    tabs: '标签页',
    tabbar: '标签栏',
    navbar: '导航栏',
    steps: '步骤条',
    progress: '进度条',
    slider: '滑块',
    switch: '开关',
    checkbox: '复选框',
    radio: '单选框',
    rate: '评分',
    picker: '选择器',
    calendar: '日历',
    upload: '上传',
    table: '表格',
    search: '搜索',
    dropdown: '下拉菜单',
    actionSheet: '动作面板',
    alertTips: '警告提示',
    noticeBar: '通知栏',
    collapse: '折叠面板',
    divider: '分割线',
    gap: '间隔槽',
    skeleton: '骨架屏',
    empty: '空状态',
    backTop: '返回顶部',
    sticky: '吸顶',
    fab: '悬浮按钮',
    color: '颜色',
    // 工具
    colorSwitch: '颜色转换',
    debounce: '防抖',
    deepClone: '深克隆',
    deepMerge: '深度合并',
    fastUse: '快速使用',
    getRect: '获取元素尺寸',
    guid: 'GUID生成',
    http: 'HTTP请求',
    md5: 'MD5加密',
    mpShare: '小程序分享',
    queryParams: '查询参数',
    random: '随机数',
    randomArray: '随机数组',
    request: '网络请求',
    route: '路由跳转',
    test: '正则测试',
    time: '时间处理',
    trim: '字符串修剪',
    // 钩子
    useColor: '颜色管理',
    useDebounce: '防抖钩子',
    useLocale: '国际化',
    useModal: '模态框钩子',
    useTheme: '主题管理',
    useThrottle: '节流钩子',
    useToast: '轻提示钩子',
    // 布局
    address: '地址',
    citySelect: '城市选择',
    comment: '评论',
    coupon: '优惠券',
    keyboardPay: '键盘支付',
    login: '登录',
    menu: '菜单',
    order: '订单',
    submitBar: '提交栏',
    wxCenter: '微信个人中心',
    // 指南
    codeHint: '代码提示',
    customIcon: '自定义图标',
    customStyle: '自定义样式',
    customTheme: '自定义主题',
    demo: '示例',
    design: '设计',
    faq: '常见问题',
    i18n: '国际化配置',
    note: '注意事项',
    theme: '主题配置',
    themeGenerate: '主题生成',
    skills: '技能说明',
    llms: 'LLMs说明',
    intro: '介绍'
};

// 获取中文名称
function getChineseName(name) {
    return chineseNameMap[name] || name;
}

// 确保目录存在
function ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
}

// 读取Markdown文件内容
function readMarkdownFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

// 提取文档标题
function extractTitle(content) {
    const match = content.match(/^#\s+([^\n]+)/);
    return match ? match[1].trim() : '';
}

// 提取文档描述（从第一段内容）
function extractDescription(content) {
    const lines = content.split('\n');
    let description = '';
    
    for (const line of lines) {
        if (line.trim() && !line.startsWith('#') && !line.startsWith('<') && !line.startsWith('```')) {
            description = line.trim();
            break;
        }
    }
    
    return description;
}

// 生成skill的frontmatter
function generateFrontmatter(name, description, type, url) {
    let invokeText = '';
    let triggerPatterns = [name];
    
    const chineseName = getChineseName(name);
    if (chineseName && chineseName !== name) {
        triggerPatterns.push(chineseName);
    }
    
    switch (type) {
        case 'component':
            invokeText = `Invoke when user needs to use ${name} component`;
            break;
        case 'tool':
            invokeText = `Invoke when user needs to use ${name} tool`;
            break;
        case 'hook':
            invokeText = `Invoke when user needs to use ${name} hook`;
            break;
        case 'guide':
            invokeText = `Invoke when user needs guidance on ${name}`;
            break;
        case 'layout':
            invokeText = `Invoke when user needs layout examples for ${name}`;
            break;
        default:
            invokeText = `Invoke when user needs information about ${name}`;
    }
    
    return `---
name: "${name}"
description: "${description}. ${invokeText}."
url: "${url}"
triggers: ${JSON.stringify(triggerPatterns)}
---

`;
}

// 存储所有技能信息用于生成索引
const allSkills = {
    guide: [],
    component: [],
    tool: [],
    hook: [],
    layout: []
};

// 处理目录文档
function processDir(dirInfo) {
    const dirPath = path.join(docsRoot, dirInfo.name);
    const files = fs.readdirSync(dirPath);
    const outputDir = path.join(referencesDir, dirInfo.name);
    
    ensureDir(outputDir);
    
    files.forEach(file => {
        if (file.endsWith('.md') && file !== 'intro.md' && file !== 'changelog.md' && file !== 'setting.md') {
            const filePath = path.join(dirPath, file);
            const content = readMarkdownFile(filePath);
            const name = path.basename(file, '.md');
            const title = extractTitle(content);
            const description = extractDescription(content);
            
            if (title && description) {
                // 生成URL
                const url = `https://uviewpro.cn/zh/${dirInfo.name}/${name}.html`;
                const skillPath = path.join(outputDir, `${name}.md`);
                const skillContent = generateFrontmatter(name, description, dirInfo.type, url) + content;
                fs.writeFileSync(skillPath, skillContent);
                
                // 存储技能信息
                const chineseName = getChineseName(name);
                allSkills[dirInfo.type].push({
                    name,
                    title: title.replace(/<[^>]+>/g, '').trim(),
                    description,
                    chineseName,
                    url: `references/${dirInfo.name}/${name}.md`
                });
                
                console.log(`Generated skill for ${dirInfo.name}: ${name}`);
            }
        }
    });
}

// 生成技能列表Markdown
function generateSkillList(skills, type) {
    return skills.map(skill => {
        const displayName = skill.chineseName !== skill.name ? `${skill.chineseName}(${skill.name})` : skill.name;
        return `- [${skill.name}](${skill.url}) - ${displayName}`;
    }).join('\n');
}

// 生成关键词映射表
function generateKeywordMap() {
    const lines = [];
    
    // 组件类关键词
    if (allSkills.component.length > 0) {
        lines.push('### 组件类关键词');
        allSkills.component.slice(0, 15).forEach(skill => {
            if (skill.chineseName && skill.chineseName !== skill.name) {
                lines.push(`- ${skill.chineseName}, ${skill.name} → ${skill.name} 技能`);
            }
        });
        lines.push('- ...');
    }
    
    // 工具类关键词
    if (allSkills.tool.length > 0) {
        lines.push('\n### 工具类关键词');
        allSkills.tool.slice(0, 10).forEach(skill => {
            if (skill.chineseName && skill.chineseName !== skill.name) {
                lines.push(`- ${skill.chineseName}, ${skill.name} → ${skill.name} 技能`);
            }
        });
        lines.push('- ...');
    }
    
    // 钩子类关键词
    if (allSkills.hook.length > 0) {
        lines.push('\n### 钩子类关键词');
        allSkills.hook.forEach(skill => {
            const keyword = skill.name.replace('use', '').toLowerCase();
            lines.push(`- ${skill.chineseName}, ${keyword} → ${skill.name} 技能`);
        });
    }
    
    return lines.join('\n');
}

// 创建skills/SKILL.md文件
function createSkillsReadme() {
    const readmeContent = `---
name: uview-pro
description: "uView Pro 组件库完整技能集。Invoke when user needs to use uView Pro components, tools, hooks or layouts in uni-app project."
---

# uView Pro 技能文档

## 触发条件

当用户有以下需求时，自动调用相应技能：

| 用户意图 | 触发技能 |
|---------|---------|
| 使用按钮/表单/弹窗等组件 | components/{name} |
| 需要颜色/时间/路由等工具 | tools/{name} |
| 使用主题/国际化等钩子 | hooks/{name} |
| 需要页面布局模板 | layout/{name} |
| 配置主题/国际化/图标 | guide/{name} |

## 快速命令格式

\`\`\`
uview {category} {name}    # 快速访问指定技能
uview button               # 访问按钮组件
uview theme                # 访问主题配置
uview useTheme             # 访问主题钩子
\`\`\`

## 关键词触发

以下关键词会自动触发对应技能：

${generateKeywordMap()}

## 技能分类索引

### 指南类 Skills (${allSkills.guide.length})
${generateSkillList(allSkills.guide, 'guide')}

### 组件类 Skills (${allSkills.component.length})
${generateSkillList(allSkills.component.slice(0, 20), 'component')}
${allSkills.component.length > 20 ? '- ... 更多组件请查看 references/components/' : ''}

### 工具类 Skills (${allSkills.tool.length})
${generateSkillList(allSkills.tool, 'tool')}

### 钩子类 Skills (${allSkills.hook.length})
${generateSkillList(allSkills.hook, 'hook')}

### 布局类 Skills (${allSkills.layout.length})
${generateSkillList(allSkills.layout, 'layout')}

## 使用示例

**示例 1: 使用按钮组件**
\`\`\`
User: 如何在页面中添加一个主要按钮？
→ 调用 button 技能，提供 type="primary" 示例
\`\`\`

**示例 2: 配置主题**
\`\`\`
User: 我想切换暗黑模式
→ 调用 useTheme 钩子技能，提供 toggleTheme 示例
\`\`\`

**示例 3: 使用工具函数**
\`\`\`
User: 如何生成一个随机数？
→ 调用 random 工具技能，提供使用示例
\`\`\`

## 技能格式说明

每个技能文档都包含以下内容：
- **name**: 技能的唯一标识符
- **description**: 技能的功能描述和触发条件
- **url**: 官方文档链接
- **triggers**: 触发关键词列表
- **详细说明**: 包含平台差异、基本使用、API文档等
- **示例代码**: 提供完整的使用示例

## 贡献

如果您发现技能文档有问题或需要更新，请提交PR进行改进。
`;
    
    fs.writeFileSync(path.join(skillsRoot, 'SKILL.md'), readmeContent);
    console.log('Created skills/SKILL.md');
}

// 主函数
function main() {
    console.log('Generating skills from docs...');
    
    // 确保references目录存在
    ensureDir(referencesDir);
    
    // 处理每个目录
    dirs.forEach(dir => {
        processDir(dir);
    });
    
    // 创建技能说明文档
    createSkillsReadme();
    
    console.log('Skills generation completed!');
    console.log(`\nSummary:`);
    console.log(`- Guide: ${allSkills.guide.length} skills`);
    console.log(`- Component: ${allSkills.component.length} skills`);
    console.log(`- Tool: ${allSkills.tool.length} skills`);
    console.log(`- Hook: ${allSkills.hook.length} skills`);
    console.log(`- Layout: ${allSkills.layout.length} skills`);
    console.log(`Total: ${Object.values(allSkills).flat().length} skills`);
}

// 执行脚本
main();
