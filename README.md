# A-Nav 导航站

一个使用 Next.js + Tailwind CSS + Notion API 构建的现代导航网站。使用 Notion 作为 CMS，轻松管理导航内容。

## 特性

- 🎯 使用 Notion 作为 CMS，轻松管理导航内容
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
- Notion API

## Notion 设置指南

### 1. 创建 Notion Integration

1. 访问 [Notion Developers](https://www.notion.so/my-integrations)
2. 点击 "New integration"
3. 填写基本信息：
   - Name: 例如 "A-Nav"
   - Logo: 可选
   - Associated workspace: 选择你的工作空间
4. 点击 "Submit"
5. 保存显示的 `Internal Integration Token`（这将用作 `NOTION_TOKEN`）

### 2. 创建数据库

> 可以直接复制我的数据库模板：https://www.notion.so/13f4f514b6538025a8c8e00e5771ca38?pvs=4

自己创建：需要创建两个数据库：Categories（分类）和 Links（链接）

#### Categories 数据库
1. 在 Notion 中创建一个新页面
2. 输入 `/table` 创建数据库
3. 添加以下属性：
   - Name (标题列，默认存在)
   - Description (文本类型)
   - Order (数字类型，用于排序)
   - Icon (文件类型，用于显示图标)

#### Links 数据库
1. 创建另一个新页面
2. 输入 `/table` 创建数据库
3. 添加以下属性：
   - Name (标题列，默认存在)
   - Description (文本类型)
   - URL (URL 类型)
   - Categories (关联类型，关联到 Categories 数据库)
   - Tags (多选类型)
   - Order (数字类型，用于排序)
   - Icon (文件类型，用于显示图标)

### 3. 授权和获取数据库 ID

1. 分别打开两个数据库页面
2. 点击右上角的 Share 按钮
3. 点击 "Invite"
4. 搜索并选择你创建的 integration
5. 从 URL 获取数据库 ID：
   ```
   https://www.notion.so/workspace/xxxxx?v=xxxx
                                 ↑
                         这串就是数据库 ID
   ```
   Categories 数据库的 ID 将用作 `NOTION_CATEGORIES_DB_ID`
   Links 数据库的 ID 将用作 `NOTION_LINKS_DB_ID`

### 4. 添加内容

#### 添加分类
1. 在 Categories 数据库中添加行
2. 填写名称和描述
3. 设置 Order 数字来控制显示顺序
4. 可选：添加图标
   - 点击 Icon 列
   - 上传图片或添加外部链接

#### 添加链接
1. 在 Links 数据库中添加行
2. 填写名称、描述和 URL
3. 在 Categories 列选择对应分类
4. 设置 Order 数字来控制显示顺序
5. 可选：添加标签和图标

## 项目设置

### 环境变量
创建 `.env.local` 文件：
```env
NOTION_TOKEN=你的_integration_token
NOTION_CATEGORIES_DB_ID=分类数据库的ID
NOTION_LINKS_DB_ID=链接数据库的ID
```

### 安装和运行

1. 克隆仓库:
```bash
git clone https://github.com/minimua/a-nav.git
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

## 部署

项目可以轻松部署到 Vercel：

1. 在 Vercel 中导入项目
2. 设置环境变量：
   - `NOTION_TOKEN`
   - `NOTION_CATEGORIES_DB_ID`
   - `NOTION_LINKS_DB_ID`
3. 部署

## 内容管理

### 修改导航内容
1. 直接在 Notion 数据库中编辑
2. 内容会在几分钟内自动更新（缓存时间为 1 小时）

### 调整显示顺序
1. 在 Categories 或 Links 数据库中
2. 修改 Order 列的数值
3. 数字越小显示越靠前

### 添加/修改图标
1. 在对应数据库中找到 Icon 列
2. 可以：
   - 上传本地图片
   - 添加图片 URL
   - 复制其他网站图标链接

## License

MIT License