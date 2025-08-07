# Global Ping

Global Ping 是一个基于 Cloudflare Workers 和 Durable Objects 构建的全球网络延迟测试工具。它利用 Cloudflare 的全球边缘网络，提供准确的全球网络延迟数据。

## 特性

- 🌍 利用 Cloudflare 的全球边缘网络进行延迟测试
- ⚡️ 实时响应，快速获取测试结果
- 🔄 支持多地区测试
- 📊 使用 Durable Objects 从指定地区发起请求

## 技术栈

- TypeScript
- Cloudflare Workers
- Cloudflare Durable Objects
- Wrangler CLI

## 前置要求

- Node.js 18.x 或更高版本
- pnpm 包管理器
- Cloudflare 账号
- Wrangler CLI

## 安装

1. 克隆仓库：

```bash
git clone <your-repo-url>
cd global-ping
```

2. 安装依赖：

```bash
pnpm install
```

3. 配置 Wrangler：

确保你已经登录到 Cloudflare 账号：

```bash
pnpm wrangler login
```

## 开发

启动本地开发服务器：

```bash
pnpm dev
```

## 部署

部署到 Cloudflare Workers：

```bash
pnpm deploy
```

## 构建

执行构建但不部署（dry-run）：

```bash
pnpm build
```

## 配置

项目配置在 `wrangler.toml` 文件中，你可以根据需要修改相关配置。
