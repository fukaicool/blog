使用 VitePress 从零搭建精美博客
你目前的仓库已经有 Git 初始化记录，但还没有真正的 VitePress 项目结构。好消息是，不需要重新创建 GitHub 仓库，也不需要推倒重来，可以直接在当前项目中安装 VitePress。

我的建议是：先使用 VitePress 官方默认主题，快速搭建出一个完整、漂亮、支持深色模式和响应式布局的博客；然后再逐步增加文章列表、分类、标签、归档、搜索等博客功能。

先明确几个概念：
- VitePress：基于 Vue 和 Vite 的静态网站生成器，使用 Markdown 编写内容。
- 默认主题（Default Theme）：官方提供的现成主题，包含导航栏、侧边栏、首页布局、深色模式等。
- 博客功能：文章列表、发布时间、分类、标签、归档等，需要自己组织内容并适当扩展主题。VitePress 默认更偏向文档网站，并不是开箱即用的完整博客 CMS。
一、检查当前项目
你现在的目录结构是：
blog/
├── .git/
├── README.md
└── index.html


首先，在项目根目录执行：
pwd
node -v
npm -v
git status


目前官方 VitePress 文档要求 Node.js 22 或更高版本。如果 Node.js 版本不满足，先升级，再安装 VitePress。

VitePress+1

推荐采用以下工具组合：
工具	作用
Node.js 22+	JavaScript 运行环境
npm	依赖管理
VitePress	生成博客网站
Markdown	编写博客文章
Vue	扩展页面和主题组件
GitHub	管理源码
GitHub Pages	免费托管静态博客

这里采用 docs/ 作为网站源码目录。这种方式可以将博客与仓库根目录的其他项目文件分开，后续维护也比较方便。
二、安装 VitePress 并初始化博客
2.1 创建 package.json
在 blog 项目根目录执行：
npm init -y


2.2 安装 VitePress
这里有一个需要注意的版本问题。

截至 2026 年 10 月 31 日，npm 上的版本区分如下：
版本	版本号	建议
稳定版 latest	1.6.4	推荐初学者
开发版 next	2.0.0-alpha.21	暂不建议正式博客使用

官方当前开发文档已经使用 vitepress@next，但 npm 的 latest 仍然指向稳定版 1.6.4。对于刚开始建设的个人博客，我建议优先使用稳定版。

npm+1

执行：
npm add -D vitepress@latest


2.3 启动初始化向导
执行：
npx vitepress init


VitePress 会询问一些配置问题。建议按照以下方式选择：
向导问题	推荐回答
Where should VitePress initialize the config?	./docs
Where should VitePress look for your markdown files?	./docs
Site title	Fukai Blog
Site description	技术、开发与生活记录
Theme	Default Theme
Use TypeScript?	Yes
Add VitePress npm scripts?	Yes
Add a prefix for npm scripts?	Yes
Prefix	docs

这样做的好处是：配置文件和 Markdown 内容都放在 docs 里面，而 Git、README 等项目文件依然保留在仓库根目录。

这是 VitePress 官方推荐的一种现有项目集成方式。

VitePress+1

2.4 检查初始化后的目录结构
完成后，项目结构大致如下：
blog/
├── .git/
├── README.md
├── index.html
├── package.json
├── package-lock.json
│
└── docs/
    ├── .vitepress/
    │   └── config.ts
    │
    ├── index.md
    ├── api-examples.md
    └── markdown-examples.md


说明：
- package.json：项目依赖和运行脚本。
- package-lock.json：锁定依赖版本。
- docs/：VitePress 网站的项目根目录和 Markdown 内容目录。
- docs/.vitepress/：VitePress 的配置、主题和构建相关文件。
- docs/index.md：网站首页。
向导也可能根据选择生成其他扩展名的配置文件，例如 config.mts，以实际生成结果为准。
2.5 检查 package.json
确认向导已经添加以下脚本，并且根目录的 package.json 包含 "type": "module"。缺少时手动补充：
{
  "type": "module",
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  }
}


这里展示的是需要存在的字段，不要为了复制示例而删除原本的 dependencies 等配置。

三个命令分别负责：
命令	功能
npm run docs:dev	开发模式，实时预览
npm run docs:build	生成正式静态网站
npm run docs:preview	本地预览正式构建结果

2.6 启动博客
npm run docs:dev


默认开发地址：
http://localhost:5173


完成阶段一
到这里，你已经有一个能够运行的 VitePress 网站了。

三、配置精美的博客首页
VitePress 默认主题已经提供了相当不错的视觉效果：




















6













默认主题包含：
- 响应式布局，适配电脑和手机。
- 浅色与深色模式。
- 顶部导航栏。
- 侧边栏和文章目录。
- 首页 Hero 展示区域。
- Feature 卡片。
- 站内全文搜索。
- Markdown 代码高亮。
其中首页的 Hero 和 Features 不需要编写 Vue 代码，通过 Markdown Frontmatter 就能配置。

VitePress+1

3.1 修改网站配置
打开：
docs/.vitepress/config.ts


将内容修改为：

import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',

  title: 'Fukai Blog',

  description: '记录技术、开发与生活',

  // 显示 Git 最近提交的更新时间
  lastUpdated: true,

  themeConfig: {
    // 顶部导航
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/blog/' },
      { text: '关于我', link: '/about' }
    ],

    // 本地全文搜索
    search: {
      provider: 'local'
    },

    // GitHub 链接
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/你的GitHub用户名'
      }
    ],

    // 页面底部
    footer: {
      message: '持续学习，持续记录。',
      copyright: 'Copyright © 2026 Fukai'
    }
  }
})



这里使用了官方支持的 nav、search、socialLinks 和 footer 配置。

VitePress+2

注意：Git 更新时间依据文章文件的最近一次 Git 提交时间计算。新文件没有提交前，可能无法显示预期的更新时间。
3.2 制作首页
打开：
docs/index.md


将原来的内容替换为：

---
layout: home

hero:
  name: Fukai's Blog
  text: 记录技术，分享思考
  tagline: Keep learning. Keep creating.
  actions:
    - theme: brand
      text: 开始阅读
      link: /blog/
    - theme: alt
      text: 关于我
      link: /about

features:
  - icon: 💻
    title: 技术探索
    details: 记录编程、前端开发、人工智能及技术实践。

  - icon: 📚
    title: 学习笔记
    details: 整理知识体系，记录学习过程和经验。

  - icon: 🌱
    title: 生活记录
    details: 分享日常生活、思考和个人成长。
---

## 欢迎来到我的博客

这里是我记录知识、分享技术和整理思考的地方。

希望通过持续记录，让知识真正成为自己的财富。

## 最新文章

- [使用 VitePress 快速创建博客](/blog/posts/vitepress-start)
- [我的技术学习路线](/blog/posts/learning-roadmap)



保存文件后，浏览器会自动刷新。

这里有几个关键概念：
配置	作用
layout: home	使用首页布局
hero	首页顶部展示区域
name	品牌名称
text	主标题
tagline	副标题
actions	首页操作按钮
features	首页特色功能卡片

以上都是默认主题原生支持的功能。

VitePress+1

3.3 增加关于页面
创建：
docs/about.md


内容：
# 关于我

你好，欢迎来到我的博客。

这里主要记录：

- Web 前端开发
- Node.js 和 Vue
- AI 与新技术
- 个人学习和生活

希望与你一起进步。


目前目录结构变化如下：
blog/
├── .git/
├── README.md
├── index.html
├── package.json
├── package-lock.json
│
└── docs/
    ├── .vitepress/
    │   └── config.ts
    │
    ├── index.md
    ├── about.md
    ├── api-examples.md
    └── markdown-examples.md


此时已经有一个具备首页、导航栏、搜索和关于页面的个人网站了。

四、建立真正的博客文章系统
这是从文档网站转变为博客网站的重要阶段。

我的建议是按照文章、归档、分类等不同功能组织 Markdown 文件，而不是把所有文章直接放在 docs/ 根目录。
4.1 规划博客目录
在 docs 下创建：
blog/
├── index.md
└── posts/
    ├── vitepress-start.md
    └── learning-roadmap.md


扩展后整体结构：
blog/
├── .git/
├── README.md
├── index.html
├── package.json
├── package-lock.json
│
└── docs/
    ├── .vitepress/
    │   └── config.ts
    │
    ├── blog/
    │   ├── index.md
    │   └── posts/
    │       ├── vitepress-start.md
    │       └── learning-roadmap.md
    │
    ├── index.md
    ├── about.md
    ├── api-examples.md
    └── markdown-examples.md


VitePress 使用基于文件的路由：
Markdown 文件	网站访问路径
docs/index.md	/
docs/about.md	/about.html
docs/blog/index.md	/blog/
docs/blog/posts/vitepress-start.md	/blog/posts/vitepress-start.html

默认内部链接可以省略 .html 后缀。

VitePress+1

4.2 编写第一篇博客
创建：
docs/blog/posts/vitepress-start.md


内容：

---
title: 使用 VitePress 快速创建博客
date: 2026-10-31
description: 从零开始搭建 VitePress 个人博客。
author: Fukai
tags:
  - VitePress
  - Vue
  - Blog
---

# 使用 VitePress 快速创建博客

## 前言

今天开始使用 VitePress 搭建自己的个人博客。

## 一、为什么选择 VitePress？

VitePress 具有以下优势：

- 使用 Markdown 编写文章
- 基于 Vue 和 Vite
- 静态页面生成
- 默认主题美观
- 支持自定义主题

## 二、安装

```bash
npm add -D vitepress@latest
```

## 三、总结

通过 VitePress，可以快速搭建一个轻量、漂亮的个人博客。



这里使用的是 YAML Frontmatter。

非常值得注意： title、date、author、tags 等字段可以用来记录文章元数据，但是默认主题不会自动把这些自定义字段变成博客文章卡片、分类系统或归档列表。这些功能需要你自己扩展。

Frontmatter 本身是 VitePress 原生支持的。

VitePress+1

4.3 制作博客文章首页
创建：
docs/blog/index.md


先采用简单、容易维护的方式：

# 博客文章

这里记录我的技术学习和日常思考。

## 2026 年

### 10 月

- [10-31 | 使用 VitePress 快速创建博客](./posts/vitepress-start)

- [10-31 | 我的技术学习路线](./posts/learning-roadmap)



这种方式需要手动添加文章链接，但不需要额外的插件或 Vue 开发。

后续文章数量增加以后，可以进一步开发自动文章列表，让系统读取 Frontmatter 自动生成文章卡片。
4.4 增加分类与标签
建议未来逐步形成以下内容结构：
docs/
├── blog/
│   ├── index.md
│   ├── posts/
│   │   ├── frontend/
│   │   ├── backend/
│   │   ├── ai/
│   │   └── life/
│   │
│   ├── archive/
│   │   └── index.md
│   │
│   └── tags/
│       └── index.md
│
├── about.md
└── index.md


这是一种推荐的内容组织方式，并非 VitePress 强制要求的目录结构。
五、让博客拥有独特的视觉风格
前面使用的都是 VitePress 原生默认主题。接下来可以通过自定义 CSS 调整品牌颜色、字体和整体视觉风格。

建议先扩展默认主题，而不是从头开发一个 Vue 主题。

VitePress 官方提供了扩展默认主题的方式，可以保留原有功能，同时覆盖 CSS 样式。

VitePress+1

5.1 创建主题目录
新建：
docs/.vitepress/theme/
├── index.ts
└── custom.css


index.ts：

import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default {
  extends: DefaultTheme
} satisfies Theme



这里的 extends: DefaultTheme 很重要：表示在默认主题的基础上扩展，而不是完全替换默认主题。
5.2 自定义主题颜色
在 custom.css 中添加：

/* 品牌主色 */
:root {
  --vp-c-brand-1: #4f46e5;
  --vp-c-brand-2: #4338ca;
  --vp-c-brand-3: #3730a3;

  /* 页面圆角风格 */
  --vp-button-brand-border: transparent;
  --vp-button-brand-text: #ffffff;
  --vp-button-brand-bg: #4f46e5;
  --vp-button-brand-hover-bg: #4338ca;
}

/* 暗色模式 */
.dark {
  --vp-c-brand-1: #a5b4fc;
  --vp-c-brand-2: #818cf8;
  --vp-c-brand-3: #6366f1;
}



修改后，可以得到一套偏现代、简洁的紫蓝色品牌风格。

你也可以把主色改为自己喜欢的颜色。
5.3 本阶段目录结构
docs/
├── .vitepress/
│   ├── config.ts
│   └── theme/
│       ├── index.ts
│       └── custom.css
│
├── blog/
│   ├── index.md
│   └── posts/
│       ├── vitepress-start.md
│       └── learning-roadmap.md
│
├── index.md
└── about.md


到这里，博客已经具备：
1. 完整的首页布局。
2. 文章页面。
3. 自定义品牌颜色。
4. 响应式布局。
5. 深色模式。
6. 搜索功能。
7. Git 更新时间展示。

六、生成正式博客网站
开发过程中使用：
npm run docs:dev


准备发布时：
npm run docs:build


VitePress 会把 Markdown、Vue 组件等内容编译成静态 HTML、CSS 和 JavaScript。

默认输出目录：
docs/.vitepress/dist/


目录结构大致如下：
docs/.vitepress/
├── config.ts
├── theme/
│   ├── index.ts
│   └── custom.css
│
├── cache/
└── dist/
    ├── index.html
    ├── about.html
    ├── blog/
    │   ├── index.html
    │   └── posts/
    │       └── vitepress-start.html
    │
    ├── assets/
    └── ...


其中：
- cache/：开发和构建缓存。
- dist/：可以直接部署到静态网站托管平台的成品。
生成以后执行：
npm run docs:preview


默认在：
http://localhost:4173


查看实际的生产构建效果。

注意，正式项目应该在 .gitignore 中排除这些目录：
node_modules/
docs/.vitepress/cache/
docs/.vitepress/dist/


不需要将生成的整个网站文件提交到 GitHub，GitHub Actions 可以自动完成构建。

VitePress+1


七、发布到 GitHub Pages
对于个人博客，我推荐：









GitHub Pages

免费静态网站托管，支持 GitHub Actions 自动发布。
GitHub Pages 官方网站

7.1 配置 base 路径
这一步很重要。

假设你的 GitHub 仓库地址是：
https://github.com/用户名/blog


最终网站地址通常是：
https://用户名.github.io/blog/


那么在 docs/.vitepress/config.ts 中增加：
export default defineConfig({
  base: '/blog/',

  // 其他配置保持不变
})


这里的 /blog/ 应该替换成你的实际 GitHub 仓库名称。

如果使用自己的域名，或者仓库名就是 用户名.github.io，通常使用默认的 / 即可。

VitePress+1

7.2 创建 GitHub Actions 工作流
在项目根目录创建：
.github/
└── workflows/
    └── deploy.yml


deploy.yml 内容：

name: Deploy VitePress site to Pages

on:
  push:
    branches:
      - main

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v5
        with:
          fetch-depth: 0

      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: npm

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run docs:build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    needs: build
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4



这里使用官方部署指南中的 GitHub Actions 流程。fetch-depth: 0 可以保留完整 Git 历史，避免 VitePress 获取最近更新时间时出现问题。

VitePress+1

7.3 设置 GitHub Pages
进入 GitHub 仓库：
1. 打开 Settings。
2. 找到 Pages。
3. 在 Build and deployment 中，将 Source 设置为 GitHub Actions。
4. 保存。
然后在项目根目录执行：
git add .
git commit -m "feat: initialize vitepress blog"
git push origin main


之后每次向 main 分支推送代码，GitHub Actions 就会自动构建和发布网站。

完整流程：
本地编辑 Markdown

docs/blog/posts/*.md


Git 提交和推送

git push origin main


GitHub Actions

npm ci → VitePress build


GitHub Pages

发布 docs/.vitepress/dist


在线访问你的个人博客



八、最终项目目录结构
经过上述步骤，你的项目最终可以整理成下面这样：
blog/
│
├── .git/
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── .gitignore
├── .npmrc                  # 可选
├── README.md
├── index.html              # 原有文件，可保留
├── package.json
├── package-lock.json
│
└── docs/
    │
    ├── .vitepress/
    │   ├── config.ts
    │   │
    │   ├── theme/
    │   │   ├── index.ts
    │   │   └── custom.css
    │   │
    │   ├── cache/          # 自动生成，不提交
    │   └── dist/           # 正式网站构建结果，不提交
    │
    ├── blog/
    │   ├── index.md
    │   │
    │   ├── posts/
    │   │   ├── frontend/
    │   │   ├── backend/
    │   │   ├── ai/
    │   │   └── life/
    │   │
    │   ├── archive/
    │   │   └── index.md
    │   │
    │   └── tags/
    │       └── index.md
    │
    ├── index.md
    ├── about.md
    │
    └── public/
        ├── logo.svg
        ├── favicon.ico
        └── images/


说明：

public/ 用来存放网站需要直接引用的静态资源，例如 Logo、图标、文章图片等。

archive/ 和 tags/ 是未来扩展的目录，目前还需要自己开发对应的文章归档和标签功能。

九、建议的学习和开发顺序
如果按照实际项目开发的思路，我建议分成三个阶段。
阶段一：快速上线
优先完成

目标：先拥有一个漂亮、可访问的个人博客。
- 安装 VitePress
- 配置默认主题
- 制作首页与 About 页面
- 建立 Markdown 文章目录
- GitHub Pages 部署


阶段二：完善博客功能

目标：从简单的网站升级为真正的博客。
- 自动读取 Markdown 文章
- 自动生成文章列表和卡片
- 自动显示发布日期
- 分类、标签和归档
- 文章封面与阅读体验
- RSS 订阅、SEO 优化


阶段三：打造个人品牌

目标：拥有自己独特的博客风格与完整生态。
- 定制 Vue 组件
- 自定义首页和文章详情页
- 评论系统
- 访问统计
- 多语言支持
- 自定义域名


十、值得收藏的官方学习资料
下面这些是本次搭建过程中最值得参考的资料：
学习内容	官方文档
快速开始与安装	Getting Started
首页和 Hero 布局	Home Page
导航与侧边栏	Default Theme Config
Markdown 与 Frontmatter	Frontmatter
搜索功能	Search
自定义 CSS 和主题	Extending Default Theme
自定义主题开发	Custom Theme
自动部署	Deploy Your VitePress Site


我的最终建议
对于你的这个 blog 仓库，我会选择：

VitePress 1.6.4 + 官方默认主题 + 自定义 CSS + Vue 文章列表组件 + GitHub Pages。

原因是：
1. 不需要从零开发网站 UI。
2. 不需要引入复杂的前端框架。
3. 所有文章使用 Markdown 管理，方便长期维护。
4. 可以逐步学习 Vue，并将 Vue 应用到博客功能开发。
5. GitHub Actions 能够自动构建和发布。
6. 整个博客可以长期免费使用 GitHub Pages 托管（不包含自定义域名等额外费用）。
还有一个架构上的建议：不要急于寻找大量第三方 VitePress 插件。 先把文章数据结构、文章列表、分类和标签系统设计好，再决定哪些功能值得用插件实现，哪些适合自己开发。

这样不仅能快速上线，也能把这个博客逐渐发展成一个真正属于自己的 Vue 项目。