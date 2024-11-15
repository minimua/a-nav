# A-Nav 导航站

一个使用 Next.js + Tailwind CSS + shadcn/ui 构建的现代导航网站。

## 特性

- 🌓 支持深色/浅色主题切换
- 📱 响应式设计，完美支持移动端
- 🔍 全局搜索功能
- 📋 分类导航
- ⚡ 快速加载
- 🎨 现代 UI 设计
- 🚀 一键部署到 Vercel

## 技术栈

- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons

## 开始使用

1. 克隆仓库:

```bash
git clone https://github.com/your-username/a-nav.git
cd a-nav
```

2. 安装依赖:

```bash
npm install
```

3. 启动开发服务器:

```bash
npm run dev
```

4. 打开 [http://localhost:3000](http://localhost:3000) 查看结果。

## 自定义导航数据

导航数据存储在 `src/data/navigation.json` 中，你可以根据需要修改它：

```json
{
  "categories": [
    {
      "name": "分类名称",
      "links": [
        {
          "title": "链接标题",
          "description": "链接描述",
          "url": "https://example.com"
        }
      ]
    }
  ]
}
```

## 部署

项目可以轻松部署到 Vercel：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/a-nav)

## License

MIT License