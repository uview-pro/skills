---
name: "mcp"
description: "uView Pro 为 AI 编辑器提供了基于 Model Context Protocol (MCP) 的组件文档查询服务，让 AI 能够实时获取最新的组件 API 信息。. Invoke when user needs guidance on mcp."
url: "https://uviewpro.cn/zh/guide/mcp.html"
triggers: ["mcp"]
---

# MCP 协议支持

uView Pro 为 AI 编辑器提供了基于 Model Context Protocol (MCP) 的组件文档查询服务，让 AI 能够实时获取最新的组件 API 信息。

## 什么是 MCP

**Model Context Protocol (MCP)** 是一种标准化协议，允许 AI 编辑器与外部工具进行通信。通过 MCP，AI 可以：

- 查询组件的 Props、Events、Methods、Slots 等 API 信息
- 获取组件的使用示例代码
- 检查代码是否正确使用了组件
- 查询 Hooks、Tools、指南等文档内容

## 功能特性

### 组件搜索
- 支持中英文名称模糊搜索
- 返回组件简介、分类、平台兼容性

### API 查询
- 获取组件的完整 Props 列表（参数、类型、默认值、说明）
- 获取组件支持的 Events（事件名、说明、回调参数）
- 获取组件的 Methods 和 Slots

### 代码示例
- 返回组件的使用示例代码
- 包含不同场景下的用法示例

### Hooks 和 Tools 查询
- 查询组合式函数（Hooks）的用法
- 查询工具函数（Tools）的参数和返回值

### 代码验证
- 检查组件使用是否符合规范
- 验证属性名称和类型是否正确

## 支持的 AI 编辑器

| Cursor | Claude Desktop | Trae AI | 其他支持 MCP 的编辑器 |
|:-:|:-:|:-:|:-:|
| √ | √ | √ | √ |

## 安装配置

### 在 Cursor 中使用

创建 `.cursor/mcp.json` 文件：

```json
{
  "mcpServers": {
    "uview-pro": {
      "command": "npx",
      "args": ["-y", "@uview-pro/mcp"]
    }
  }
}
```

### 在 Claude Desktop 中使用

编辑 `claude_desktop_config.json`：

```json
{
  "mcpServers": {
    "uview-pro": {
      "command": "npx",
      "args": ["-y", "@uview-pro/mcp"]
    }
  }
}
```

### 在 Trae 中使用

创建 `.trae/mcp.json` 文件：

```json
{
  "mcpServers": {
    "uview-pro": {
      "command": "npx",
      "args": ["-y", "@uview-pro/mcp"]
    }
  }
}
```

### 直接运行

```bash
npx @uview-pro/mcp
```

## 使用示例

在 AI 编辑器中直接提问：

```
- "uview 有哪些表单组件？"
- "button 组件有哪些属性？"
- "如何使用 useToast？"
- "检查这段代码是否正确使用了 form 组件"
```

AI 会自动调用 MCP 服务获取最新的文档信息。

## 数据来源

MCP 服务的数据来源于 uView Pro 官方文档，包含：

### 组件库
- 基础组件：Button、Icon、Image、Cell、Badge 等
- 表单组件：Input、Field、Textarea、Radio、Checkbox 等
- 反馈组件：Toast、Modal、Loading、ActionSheet 等
- 导航组件：Navbar、Tabbar、Tabs、Steps 等

### Hooks
- useToast、useModal、useLoading 等组合式函数
- useColor、useTheme 等状态管理 Hooks

### Tools
- 颜色处理（color、colorSwitch）
- 数据操作（deepClone、deepMerge）
- 格式化工具（timeFormat、priceFormat）

### 指南
- 代码规范、主题配置、国际化支持等

## 版本更新

MCP 服务会随着 uView Pro 的版本更新而发布新版本，确保 AI 获取到最新的组件文档和 API 信息。

## 结合 llms.txt 和 Skills 使用

为了获得最佳的 AI 辅助开发体验，建议同时使用：

1. **llms.txt** - 为 AI 提供组件库的完整上下文
2. **MCP** - 提供实时、精确的 API 查询能力
3. **Skills** - 提供标准化的代码生成能力

三者结合，可以让 AI 更准确地理解你的需求并生成高质量的 uView Pro 代码。

## 开源仓库

MCP 项目完全开源，欢迎社区贡献：

**GitHub：** <https://github.com/uview-pro/mcp>

**Gitee：** <https://gitee.com/uview-pro/mcp>

## 问题反馈

如果在使用 MCP 服务过程中发现问题或有改进建议，欢迎通过以下方式反馈：

- [GitHub Issues](https://github.com/uview-pro/mcp/issues)
- [Gitee Issues](https://gitee.com/uview-pro/mcp/issues)
