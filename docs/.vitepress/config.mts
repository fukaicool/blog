import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/blog/',

  lang: 'zh-CN',

  title: 'Fukai Blog',

  description: '记录技术、开发与生活',

  // 显示 Git 最近提交的更新时间
  lastUpdated: true,

  themeConfig: {
    logo: '/logo.svg',

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
        link: 'https://github.com/fukaicool'
      }
    ],

    // 页面底部
    footer: {
      message: '持续学习，持续记录。',
      copyright: 'Copyright © 2026 Fukai'
    }
  }
})
