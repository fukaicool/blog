# Blog

一个基于 [VitePress](https://vitepress.dev/) 构建的个人技术博客。

通过 Markdown 记录技术知识、学习笔记、开发经验和生活思考，持续积累知识，分享学习成果。

## 🌐 Online

**Blog:** [https://fukaicool.github.io/blog/](https://fukaicool.github.io/blog/)

**Repository:** [https://github.com/fukaicool/blog](https://github.com/fukaicool/blog)

## ✨ Features

- Built with VitePress: lightweight and fast.
- Markdown-based blog content management.
- Powered by Vue and Vite.
- Responsive layout for desktop and mobile devices.
- Light and dark mode support.
- Built-in full-text search.
- Automated build and deployment with GitHub Actions.
- Version control with Git.

## 🛠️ Tech Stack

| Technology | Description |
|---|---|
| VitePress | Static Site Generator |
| Vue | Frontend Framework |
| Vite | Frontend Build Tool |
| TypeScript | Programming Language |
| Markdown | Content Authoring |
| Node.js | JavaScript Runtime |
| npm | Package Manager |
| GitHub Pages | Static Website Hosting |
| GitHub Actions | CI/CD |

## 📋 Requirements

- Node.js 22.0+
- npm
- Git

## 🚀 Getting Started

### 1. Clone repository

```bash
git clone https://github.com/fukaicool/blog.git
cd blog
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run docs:dev
```

Default address:

http://localhost:5173

### 4. Build production site

```bash
npm run docs:build
```

Generated static files:

```text
docs/.vitepress/dist/
```

### 5. Preview production site

```bash
npm run docs:preview
```

Default address:

http://localhost:4173

## 📁 Project Structure

```text
blog/
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
│
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts           # VitePress configuration
│   │   └── theme/
│   │       ├── index.ts        # Custom theme entry
│   │       └── custom.css      # Custom styles
│   │
│   ├── blog/
│   │   ├── index.md            # Blog index
│   │   └── posts/              # Blog articles
│   │
│   ├── public/                 # Static assets
│   │
│   ├── about.md                # About page
│   └── index.md                # Homepage
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## 📝 Writing Posts

Blog articles are written in Markdown and stored in:

```text
docs/blog/posts/
```

Use YAML Frontmatter to define article metadata.

Example:

```markdown
---
title: My First Blog Post
date: 2026-11-01
description: My first article.
author: Fukai
tags:
  - VitePress
  - Technology
---

# My First Blog Post

Write your content here.
```

After creating a new article, add its link to `docs/blog/index.md`.

## 🚢 Deployment

This project uses GitHub Pages for hosting and GitHub Actions for automated deployment.

Push changes to the `main` branch:

```bash
git add .
git commit -m "docs: update blog content"
git push origin main
```

GitHub Actions will automatically:

1. Check out the repository.
2. Install dependencies.
3. Build the VitePress site.
4. Deploy the generated site to GitHub Pages.

Visit the blog:

**https://fukaicool.github.io/blog/**

## 📚 References

- [VitePress Documentation](https://vitepress.dev/)
- [Vue Documentation](https://vuejs.org/)
- [Vite Documentation](https://vite.dev/)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages](https://pages.github.com/)
- [GitHub Actions](https://docs.github.com/en/actions)

## 📄 License

The original content and code in this repository are copyrighted by their respective authors.

All rights reserved. Reproduction, redistribution, modification, or other use of original content requires prior written permission from the copyright holder.

Third-party dependencies and resources remain subject to their respective licenses.