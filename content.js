/**
 * GP Investment Group Limited — website content model.
 * Single source of truth for all copy. Every string is trilingual (zh-Hant / zh-Hans / en).
 * Facts, figures and names come from pages/*.md — do not add invented claims here.
 */
'use strict';

const BASE_URL = 'https://www.gpinvestment.com'; // TBD: confirm production domain before launch

const LOCALES = [
  { code: 'zh-Hant', label: '繁體中文', short: '繁', ogLocale: 'zh_HK', cjkFont: 'Noto+Sans+TC:wght@400;500;700' },
  { code: 'zh-Hans', label: '简体中文', short: '简', ogLocale: 'zh_CN', cjkFont: 'Noto+Sans+SC:wght@400;500;700' },
  { code: 'en', label: 'English', short: 'EN', ogLocale: 'en_US', cjkFont: null },
];

// Route slugs per page (locale prefix handled by build.js: zh-Hant at root, zh-hans/, en/)
const PAGES = ['home', 'about', 'solutions', 'patents', 'opportunities', 'contact'];
const SLUGS = { home: '', about: 'about/', solutions: 'solutions/', patents: 'patents/', opportunities: 'opportunities/', contact: 'contact/' };

/* ------------------------------------------------------------------ */
/* UI chrome (nav, buttons, forms, footer, aria, 404)                  */
/* ------------------------------------------------------------------ */
const ui = {
  'zh-Hant': {
    skip: '跳至主要內容',
    menuOpen: '開啟選單', menuClose: '關閉選單', menu: '選單',
    langSwitch: '切換語言', langLabel: '語言',
    navAria: '主導覽', breadcrumbAria: '麵包屑導覽',
    cta: '探索AI方案',
    nav: { home: '首頁', about: '關於我們', solutions: '產品與解決方案', patents: '專利與技術', opportunities: '市場機遇', contact: '聯絡我們' },
    learnMore: '了解更多',
    footerTagline: 'AI研發 · 教育及中小企業數碼化賦能',
    footerNav: '網站導覽', footerContact: '聯絡方式', footerLegal: '法律資訊',
    privacy: '私隱政策', terms: '使用條款',
    contactLabels: { address: '地址', tel: '電話', fax: '傳真', email: '電郵' },
    form: {
      title: '業務諮詢', lead: '填寫以下表格，我們的團隊會盡快回覆。',
      name: '姓名', company: '公司', email: '電郵', phone: '電話', interest: '感興趣的產品/服務', message: '留言',
      required: '必填', optional: '選填', selectPlaceholder: '請選擇…', submit: '提交',
      errRequired: '請填寫此欄位', errEmail: '請輸入有效的電郵地址', errPhone: '請輸入有效的電話號碼',
      successTitle: '提交成功', successBody: '感謝您的查詢！我們的團隊會盡快與您聯絡。',
      errSubmit: '提交時發生錯誤，請稍後再試，或直接電郵 info@gpinvestment.com。',
      options: [
        '學界AI方案（AI本地部署/RAG/AI教學/行政自動化）',
        '企業AI方案（AI本地部署/RAG/內部AI應用）',
        'AI算力伺服器',
        'RAG知識庫平台',
        'AI應用中間件',
        '合作模式諮詢',
        '其他',
      ],
    },
    notFound: { title: '找不到頁面', body: '您要找的頁面不存在或已移動。', back: '返回首頁' },
  },
  'zh-Hans': {
    skip: '跳至主要内容',
    menuOpen: '打开菜单', menuClose: '关闭菜单', menu: '菜单',
    langSwitch: '切换语言', langLabel: '语言',
    navAria: '主导航', breadcrumbAria: '面包屑导航',
    cta: '探索AI方案',
    nav: { home: '首页', about: '关于我们', solutions: '产品与解决方案', patents: '专利与技术', opportunities: '市场机遇', contact: '联系我们' },
    learnMore: '了解更多',
    footerTagline: 'AI研发 · 教育及中小企业数字化赋能',
    footerNav: '网站导航', footerContact: '联系方式', footerLegal: '法律信息',
    privacy: '隐私政策', terms: '使用条款',
    contactLabels: { address: '地址', tel: '电话', fax: '传真', email: '电邮' },
    form: {
      title: '业务咨询', lead: '填写以下表格，我们的团队会尽快回复。',
      name: '姓名', company: '公司', email: '电邮', phone: '电话', interest: '感兴趣的产品/服务', message: '留言',
      required: '必填', optional: '选填', selectPlaceholder: '请选择…', submit: '提交',
      errRequired: '请填写此字段', errEmail: '请输入有效的电邮地址', errPhone: '请输入有效的电话号码',
      successTitle: '提交成功', successBody: '感谢您的查询！我们的团队会尽快与您联系。',
      errSubmit: '提交时发生错误，请稍后再试，或直接电邮 info@gpinvestment.com。',
      options: [
        '学界AI方案（AI本地部署/RAG/AI教学/行政自动化）',
        '企业AI方案（AI本地部署/RAG/内部AI应用）',
        'AI算力服务器',
        'RAG知识库平台',
        'AI应用中间件',
        '合作模式咨询',
        '其他',
      ],
    },
    notFound: { title: '找不到页面', body: '您要找的页面不存在或已移动。', back: '返回首页' },
  },
  en: {
    skip: 'Skip to main content',
    menuOpen: 'Open menu', menuClose: 'Close menu', menu: 'Menu',
    langSwitch: 'Switch language', langLabel: 'Language',
    navAria: 'Primary navigation', breadcrumbAria: 'Breadcrumb',
    cta: 'Explore AI Solutions',
    nav: { home: 'Home', about: 'About Us', solutions: 'Products & Solutions', patents: 'Patents & Technology', opportunities: 'Market Opportunities', contact: 'Contact Us' },
    learnMore: 'Learn more',
    footerTagline: 'AI R&D · Digital Empowerment for Education & SMEs',
    footerNav: 'Sitemap', footerContact: 'Contact', footerLegal: 'Legal',
    privacy: 'Privacy Policy', terms: 'Terms of Use',
    contactLabels: { address: 'Address', tel: 'Tel', fax: 'Fax', email: 'Email' },
    form: {
      title: 'Business Enquiry', lead: 'Fill in the form below and our team will get back to you shortly.',
      name: 'Name', company: 'Company', email: 'Email', phone: 'Phone', interest: 'Interested Product/Service', message: 'Message',
      required: 'required', optional: 'optional', selectPlaceholder: 'Please select…', submit: 'Submit',
      errRequired: 'Please fill in this field', errEmail: 'Please enter a valid email address', errPhone: 'Please enter a valid phone number',
      successTitle: 'Submitted successfully', successBody: "Thank you for your enquiry! Our team will get back to you shortly.",
      errSubmit: 'Something went wrong. Please try again later, or email info@gpinvestment.com directly.',
      options: [
        'Education AI Solutions (On-Premise/RAG/Teaching/Admin)',
        'Enterprise AI Solutions (On-Premise/RAG/Internal AI Apps)',
        'AI Compute Server',
        'RAG Knowledge Base Platform',
        'AI Application Middleware',
        'Partnership Model Enquiry',
        'Others',
      ],
    },
    notFound: { title: 'Page not found', body: "The page you're looking for doesn't exist or has moved.", back: 'Back to Home' },
  },
};

const CONTACT = {
  address: {
    'zh-Hant': '香港灣仔港灣道6-8號瑞安中心19樓1906-07室',
    'zh-Hans': '香港湾仔港湾道6-8号瑞安中心19楼1906-07室',
    en: 'Unit 1906-07, 19/F, Shui On Centre, 6-8 Harbour Road, Wan Chai, Hong Kong',
  },
  tel: '(+852) 3628 3499',
  telHref: '+85236283499',
  fax: '(+852) 3628 3498',
  email: 'info@gpinvestment.com',
};

/* ------------------------------------------------------------------ */
/* Page 01 — Home                                                      */
/* ------------------------------------------------------------------ */
const home = {
  meta: {
    'zh-Hant': {
      title: 'GP Investment Group Limited — AI研發 · 教育及中小企業數碼化賦能',
      description: 'GP Investment Group Limited 是一家專注於AI研發與企業數碼化解決方案的科技公司。聚焦香港學界與中小企業市場，提供AI算力本地部署、RAG知識庫建立及AI教學/行政/商業應用方案，已申請12項核心技術專利。',
    },
    'zh-Hans': {
      title: 'GP Investment Group Limited — AI研发 · 教育及中小企业数字化赋能',
      description: 'GP Investment Group Limited 是一家专注于AI研发与企业数字化解决方案的科技公司。聚焦香港学界与中小企业市场，提供AI算力本地部署、RAG知识库建立及AI教学/行政/商业应用方案，已申请12项核心技术专利。',
    },
    en: {
      title: 'GP Investment Group Limited — AI R&D · Digital Empowerment for Education & SMEs',
      description: 'GP Investment Group Limited is a technology company focused on AI R&D and enterprise digital solutions. Targeting Hong Kong\'s education and SME sectors, we provide AI on-premise deployment, RAG knowledge base construction, and AI-powered teaching/administrative/business application solutions, with 12 core technology patents filed.',
    },
  },
  hero: {
    'zh-Hant': {
      overline: '香港AI研發 · 企業數碼化',
      h1: ['AI研發驅動', '教育及中小企業數碼化賦能'],
      sub: 'GP Investment Group Limited 專注於AI技術研發與企業數碼化解決方案。聚焦 <strong>香港學界與中小企業</strong> 兩大核心市場，提供AI算力本地部署、RAG知識庫建立及AI教學/行政/商業應用方案。以 <strong>12項核心技術專利</strong> 為壁壘，助力香港AI普及浪潮。',
      ctaPrimary: '探索AI方案', ctaSecondary: '市場機遇',
    },
    'zh-Hans': {
      overline: '香港AI研发 · 企业数字化',
      h1: ['AI研发驱动', '教育及中小企业数字化赋能'],
      sub: 'GP Investment Group Limited 专注于AI技术研发与企业数字化解决方案。聚焦 <strong>香港学界与中小企业</strong> 两大核心市场，提供AI算力本地部署、RAG知识库建立及AI教学/行政/商业应用方案。以 <strong>12项核心技术专利</strong> 为壁垒，助力香港AI普及浪潮。',
      ctaPrimary: '探索AI方案', ctaSecondary: '市场机遇',
    },
    en: {
      overline: 'Hong Kong AI R&D · Enterprise Digitalization',
      h1: ['AI-Driven R&D', 'Digital Empowerment for Education & SMEs'],
      sub: 'GP Investment Group Limited specializes in AI technology R&D and enterprise digital solutions. Focusing on Hong Kong\'s <strong>education and SME</strong> sectors, we provide AI on-premise deployment, RAG knowledge base construction, and AI-powered teaching/administrative/business application solutions. With <strong>12 core technology patents</strong> as our moat, we empower Hong Kong\'s AI adoption wave.',
      ctaPrimary: 'Explore AI Solutions', ctaSecondary: 'Market Opportunities',
    },
  },
  metrics: {
    'zh-Hant': {
      overline: '核心數據', heading: '數字看板',
      items: [
        { n: 12, suffix: '項', label: '核心技術專利', sub: '申請中' },
        { n: 2, label: '聚焦市場', sub: '香港學界 · 中小企業' },
        { n: 3, label: '核心方案', sub: 'AI本地部署 · RAG知識庫 · AI教學/行政/商業應用' },
        { n: 20, suffix: '億港元', label: '市場機遇', sub: '優質教育基金20億 · 全民AI 3億扶持' },
      ],
    },
    'zh-Hans': {
      overline: '核心数据', heading: '数字看板',
      items: [
        { n: 12, suffix: '项', label: '核心技术专利', sub: '申请中' },
        { n: 2, label: '聚焦市场', sub: '香港学界 · 中小企业' },
        { n: 3, label: '核心方案', sub: 'AI本地部署 · RAG知识库 · AI教学/行政/商业应用' },
        { n: 20, suffix: '亿港元', label: '市场机遇', sub: '优质教育基金20亿 · 全民AI 3亿扶持' },
      ],
    },
    en: {
      overline: 'Key Metrics', heading: 'At a Glance',
      items: [
        { n: 12, label: 'Core Technology Patents', sub: 'Filed' },
        { n: 2, label: 'Target Markets', sub: 'Hong Kong Education · SMEs' },
        { n: 3, label: 'Core Solutions', sub: 'AI On-Premise · RAG Knowledge Base · AI Teaching/Admin/Business Apps' },
        { n: 2, prefix: 'HK$', suffix: 'B', label: 'Market Opportunities', sub: 'QEF HK$2B · 全民AI HK$300M Support' },
      ],
    },
  },
  pillars: {
    'zh-Hant': {
      overline: '三大業務板塊', heading: '學界 · 企業 · 研發', lead: '以自主技術為核心，服務香港兩大核心市場。',
      items: [
        { num: '01', accent: 'green', icon: 'cap', title: '學界AI方案', desc: '為香港中小學及大專院校提供AI算力本地部署、RAG知識庫建立、AI輔助教學及行政自動化處理方案。緊握優質教育基金20億港元校本AI教育項目的市場機遇。', page: 'solutions', anchor: 's2-education' },
        { num: '02', accent: 'blue', icon: 'briefcase', title: '企業AI方案', desc: '為香港中小企業提供AI算力本地部署、RAG知識庫建立及企業內部多元化AI應用方案。配合政府「數碼轉型支援先導計劃」3億港元扶持政策，助力企業智能化升級。', page: 'solutions', anchor: 's3-enterprise' },
        { num: '03', accent: 'gold', icon: 'flask', title: '技術研發與專利', desc: '持續投入AI核心技術研發，累計申請12項專利，構建堅實的技術壁壘與持續創新能力。', page: 'patents', anchor: '' },
      ],
    },
    'zh-Hans': {
      overline: '三大业务板块', heading: '学界 · 企业 · 研发', lead: '以自主技术为核心，服务香港两大核心市场。',
      items: [
        { num: '01', accent: 'green', icon: 'cap', title: '学界AI方案', desc: '为香港中小学及大专院校提供AI算力本地部署、RAG知识库建立、AI辅助教学及行政自动化处理方案。紧握优质教育基金20亿港元校本AI教育项目的市场机遇。', page: 'solutions', anchor: 's2-education' },
        { num: '02', accent: 'blue', icon: 'briefcase', title: '企业AI方案', desc: '为香港中小企业提供AI算力本地部署、RAG知识库建立及企业内部多元化AI应用方案。配合政府「数码转型支援先导计划」3亿港元扶持政策，助力企业智能化升级。', page: 'solutions', anchor: 's3-enterprise' },
        { num: '03', accent: 'gold', icon: 'flask', title: '技术研发与专利', desc: '持续投入AI核心技术研发，累计申请12项专利，构建坚实的技术壁垒与持续创新能力。', page: 'patents', anchor: '' },
      ],
    },
    en: {
      overline: 'Three Business Pillars', heading: 'Education · Enterprise · R&D', lead: 'Proprietary technology serving Hong Kong\'s two core markets.',
      items: [
        { num: '01', accent: 'green', icon: 'cap', title: 'Education AI Solutions', desc: 'AI on-premise deployment, RAG knowledge base construction, AI-assisted teaching, and administrative automation for Hong Kong schools and tertiary institutions. Capturing the HK$2 billion Quality Education Fund opportunity for school-based AI education projects.', page: 'solutions', anchor: 's2-education' },
        { num: '02', accent: 'blue', icon: 'briefcase', title: 'SME AI Solutions', desc: 'AI on-premise deployment, RAG knowledge base construction, and diversified internal AI application solutions for Hong Kong SMEs. Aligned with the government\'s "Digital Transformation Support Pilot Programme" with HK$300 million in funding.', page: 'solutions', anchor: 's3-enterprise' },
        { num: '03', accent: 'gold', icon: 'flask', title: 'Technology R&D & Patents', desc: 'Continuous investment in AI core technology R&D, with 12 patents filed cumulatively, building a solid technology moat and sustained innovation capacity.', page: 'patents', anchor: '' },
      ],
    },
  },
  partners: {
    'zh-Hant': {
      overline: '合作夥伴',
      items: [
        { name: '香港理工大學', role: '聯合研發' },
        { name: 'OrchardTech Greenova Group', role: '母公司 · 資源協同' },
        { name: '香港優質教育基金', role: '政策對接' },
      ],
    },
    'zh-Hans': {
      overline: '合作伙伴',
      items: [
        { name: '香港理工大学', role: '联合研发' },
        { name: 'OrchardTech Greenova Group', role: '母公司 · 资源协同' },
        { name: '香港优质教育基金', role: '政策对接' },
      ],
    },
    en: {
      overline: 'Partners',
      items: [
        { name: 'Hong Kong Polytechnic University', role: 'Joint R&D' },
        { name: 'OrchardTech Greenova Group', role: 'Parent Company · Resource Synergy' },
        { name: 'Quality Education Fund', role: 'Policy Alignment' },
      ],
    },
  },
  cta: {
    'zh-Hant': { heading: '準備好探索AI方案了嗎？', button: '聯絡我們' },
    'zh-Hans': { heading: '准备好探索AI方案了吗？', button: '联系我们' },
    en: { heading: 'Ready to explore AI solutions?', button: 'Contact Us' },
  },
};

/* ------------------------------------------------------------------ */
/* Page 02 — About Us                                                  */
/* ------------------------------------------------------------------ */
const about = {
  meta: {
    'zh-Hant': {
      title: '關於我們 | GP Investment Group Limited — AI研發與企業數碼化',
      description: 'GP Investment Group Limited 是一家總部位於香港的AI研發與企業數碼化解決方案提供商，專注於AI算力基礎設施、RAG知識庫系統及AI應用方案的自主研發，累計申請12項核心技術專利。',
    },
    'zh-Hans': {
      title: '关于我们 | GP Investment Group Limited — AI研发与企业数字化',
      description: 'GP Investment Group Limited 是一家总部位于香港的AI研发与企业数字化解决方案提供商，专注于AI算力基础设施、RAG知识库系统及AI应用方案的自主研发，累计申请12项核心技术专利。',
    },
    en: {
      title: 'About Us | GP Investment Group Limited — AI R&D & Enterprise Digitalization',
      description: 'GP Investment Group Limited is a Hong Kong-headquartered AI R&D and enterprise digital solution provider, focused on proprietary R&D of AI compute infrastructure, RAG knowledge base systems, and AI application solutions, with 12 core technology patents filed.',
    },
  },
  hero: {
    'zh-Hant': { h1: '關於我們', sub: '公司簡介與研發實力 — 以自主研發為根基，以專利技術為壁壘，服務香港學界與中小企業。' },
    'zh-Hans': { h1: '关于我们', sub: '公司简介与研发实力 — 以自主研发为根基，以专利技术为壁垒，服务香港学界与中小企业。' },
    en: { h1: 'About Us', sub: 'Company Profile & R&D Strength — rooted in proprietary R&D, fortified by patents, serving Hong Kong\'s education sector and SMEs.' },
  },
  profile: {
    'zh-Hant': {
      overline: '01 · 公司簡介', heading: '公司簡介',
      body: 'GP Investment Group Limited 是一家總部位於香港的AI研發與企業數碼化解決方案提供商。公司專注於AI算力基礎設施、RAG知識庫系統及AI應用方案的自主研發，以技術創新為核心驅動力，為香港學界及中小企業客戶提供定制化的智能解決方案。',
      calloutTitle: '核心定位',
      callout: '以 <strong>自主研發</strong> 為根基，以 <strong>專利技術</strong> 為壁壘，精準對焦 <strong>香港AI政策紅利</strong>，打造學界及中小企業數碼轉型的首選AI合作夥伴。',
    },
    'zh-Hans': {
      overline: '01 · 公司简介', heading: '公司简介',
      body: 'GP Investment Group Limited 是一家总部位于香港的AI研发与企业数字化解决方案提供商。公司专注于AI算力基础设施、RAG知识库系统及AI应用方案的自主研发，以技术创新为核心驱动力，为香港学界及中小企业客户提供定制化的智能解决方案。',
      calloutTitle: '核心定位',
      callout: '以 <strong>自主研发</strong> 为根基，以 <strong>专利技术</strong> 为壁垒，精准对焦 <strong>香港AI政策红利</strong>，打造学界及中小企业数字化转型的首选AI合作伙伴。',
    },
    en: {
      overline: '01 · Company Profile', heading: 'Company Profile',
      body: 'GP Investment Group Limited is a Hong Kong-headquartered AI R&D and enterprise digital solution provider. We focus on proprietary R&D of AI compute infrastructure, RAG knowledge base systems, and AI application solutions. Driven by technological innovation, we deliver customized smart solutions for Hong Kong\'s education sector and SMEs.',
      calloutTitle: 'Core Positioning',
      callout: 'Rooted in <strong>proprietary R&D</strong>, fortified by <strong>patent technology</strong>, precisely aligned with <strong>Hong Kong\'s AI policy dividends</strong> — building the premier AI partner for digital transformation in education and SMEs.',
    },
  },
  rd: {
    'zh-Hant': {
      overline: '02 · 研發實力', heading: '研發實力',
      stats: [
        { n: 12, suffix: '項', label: '累計申請核心技術專利' },
        { n: 2, suffix: '項', label: '已獲正式授權' },
      ],
      statsNote: '持續構建堅實的技術壁壘與創新能力',
      directionsTitle: '研發方向',
      directions: ['AI算力本地部署與優化', 'RAG知識庫系統架構', 'AI教學輔助與行政自動化算法', '企業AI應用中間件'],
      teamTitle: '研發團隊',
      team: ['核心成員來自知名科技企業與科研機構', '與香港理工大學建立聯合研發關係', '持續跟蹤前沿AI技術動態，保持技術敏銳度'],
    },
    'zh-Hans': {
      overline: '02 · 研发实力', heading: '研发实力',
      stats: [
        { n: 12, suffix: '项', label: '累计申请核心技术专利' },
        { n: 2, suffix: '项', label: '已获正式授权' },
      ],
      statsNote: '持续构建坚实的技术壁垒与创新能力',
      directionsTitle: '研发方向',
      directions: ['AI算力本地部署与优化', 'RAG知识库系统架构', 'AI教学辅助与行政自动化算法', '企业AI应用中间件'],
      teamTitle: '研发团队',
      team: ['核心成员来自知名科技企业与科研机构', '与香港理工大学建立联合研发关系', '持续跟踪前沿AI技术动态，保持技术敏锐度'],
    },
    en: {
      overline: '02 · R&D Capabilities', heading: 'R&D Capabilities',
      stats: [
        { n: 12, label: 'Core technology patents filed cumulatively' },
        { n: 2, label: 'Officially granted' },
      ],
      statsNote: 'Continuously building a solid technology moat and innovation capacity',
      directionsTitle: 'R&D Directions',
      directions: ['AI on-premise deployment and optimization', 'RAG knowledge base system architecture', 'AI-assisted teaching and administrative automation algorithms', 'Enterprise AI application middleware'],
      teamTitle: 'R&D Team',
      team: ['Core members from leading technology companies and research institutions', 'Joint R&D relationship with Hong Kong Polytechnic University', 'Continuous tracking of cutting-edge AI technology trends'],
    },
  },
  history: {
    'zh-Hant': {
      overline: '03 · 發展歷程', heading: '發展歷程',
      items: [
        { year: '2022', text: 'GP Investment 正式成立，聚焦AI技術研發' },
        { year: '2023', text: '首款AI原型系統完成開發；開始佈局專利組合' },
        { year: '2024', text: '累計申請專利達12項；與香港理工大學建立合作' },
        { year: '2025', text: 'AI教育方案正式推出；業務拓展至中小企業領域' },
        { year: '2026', text: '深度參與集團AI綠色智慧節能大廈項目；全面對接優質教育基金及全民AI政策' },
      ],
    },
    'zh-Hans': {
      overline: '03 · 发展历程', heading: '发展历程',
      items: [
        { year: '2022', text: 'GP Investment 正式成立，聚焦AI技术研发' },
        { year: '2023', text: '首款AI原型系统完成开发；开始布局专利组合' },
        { year: '2024', text: '累计申请专利达12项；与香港理工大学建立合作' },
        { year: '2025', text: 'AI教育方案正式推出；业务拓展至中小企业领域' },
        { year: '2026', text: '深度参与集团AI绿色智慧节能大厦项目；全面对接优质教育基金及全民AI政策' },
      ],
    },
    en: {
      overline: '03 · Development History', heading: 'Development History',
      items: [
        { year: '2022', text: 'GP Investment established, focusing on AI technology R&D' },
        { year: '2023', text: 'First AI prototype system developed; patent portfolio initiated' },
        { year: '2024', text: '12 patents filed cumulatively; partnership with PolyU established' },
        { year: '2025', text: 'AI education solutions launched; business expanded to SMEs' },
        { year: '2026', text: 'Deep involvement in Group\'s AI Green Smart Building project; full alignment with QEF and 全民AI policies' },
      ],
    },
  },
};

/* ------------------------------------------------------------------ */
/* Page 03 — Products & Solutions                                      */
/* ------------------------------------------------------------------ */
const solutions = {
  meta: {
    'zh-Hant': {
      title: '產品與解決方案 | GP Investment Group Limited — AI教育 · AI企業 · 技術產品',
      description: '為香港學界及中小企業提供AI算力本地部署、RAG知識庫建立、AI教學/行政自動化及企業內部AI應用方案，並提供AI算力伺服器、RAG知識庫平台及AI應用中間件三大技術產品。',
    },
    'zh-Hans': {
      title: '产品与解决方案 | GP Investment Group Limited — AI教育 · AI企业 · 技术产品',
      description: '为香港学界及中小企业提供AI算力本地部署、RAG知识库建立、AI教学/行政自动化及企业内部AI应用方案，并提供AI算力服务器、RAG知识库平台及AI应用中间件三大技术产品。',
    },
    en: {
      title: 'Products & Solutions | GP Investment Group Limited — AI Education · AI Enterprise · Technology Products',
      description: 'AI on-premise deployment, RAG knowledge base construction, AI teaching/administrative automation, and internal AI applications for Hong Kong schools and SMEs — plus AI Compute Server, RAG Knowledge Base Platform, and AI Application Middleware.',
    },
  },
  hero: {
    'zh-Hant': { h1: '產品與解決方案', sub: 'AI教育方案 · AI企業方案 · 技術產品 — 為香港學界與中小企業打造專屬AI能力。' },
    'zh-Hans': { h1: '产品与解决方案', sub: 'AI教育方案 · AI企业方案 · 技术产品 — 为香港学界与中小企业打造专属AI能力。' },
    en: { h1: 'Products & Solutions', sub: 'AI Education · AI Enterprise · Technology Products — building tailored AI capabilities for Hong Kong\'s schools and SMEs.' },
  },
  education: {
    'zh-Hant': {
      overline: '01 · 學界AI解決方案', heading: '學界AI解決方案',
      targetLabel: '目標客戶', target: '香港中小學、大專院校',
      marketLabel: '市場背景',
      market: '香港優質教育基金已預留 <strong>20億港元</strong> 推進中小學數字教育，開展校本AI教育項目。其中5億元用於「『智』啟學教」計劃，成功申請的學校可獲 <strong>一次性50萬港元撥款</strong>，用於採購AI工具、舉辦AI素養培訓活動及推動基礎設施升級。',
      coreLabel: '核心方案',
      cards: [
        { icon: 'server', title: 'AI算力本地部署', desc: '為學校提供安全、合規的本地AI算力基礎設施，確保學生數據私隱與網絡安全，滿足教育機構對數據主權的嚴格要求' },
        { icon: 'database', title: 'RAG知識庫建立', desc: '基於檢索增強生成（RAG）技術，為學校構建專屬知識庫，整合校本教材、教案、試題等教學資源，實現智能化教學輔助與個性化學習推薦' },
        { icon: 'cap', title: 'AI輔助教學', desc: '為教師提供AI備課工具、智能作業批改、學情分析等教學輔助功能，提升教學效率與質量' },
        { icon: 'workflow', title: '行政自動化處理', desc: '利用AI技術實現學校行政流程自動化，包括學生檔案管理、排課優化、家校溝通、財務處理等，釋放行政資源' },
      ],
    },
    'zh-Hans': {
      overline: '01 · 学界AI解决方案', heading: '学界AI解决方案',
      targetLabel: '目标客户', target: '香港中小学、大专院校',
      marketLabel: '市场背景',
      market: '香港优质教育基金已预留 <strong>20亿港元</strong> 推进中小学数字教育，开展校本AI教育项目。其中5亿元用于「『智』启学教」计划，成功申请的学校可获 <strong>一次性50万港元拨款</strong>，用于采购AI工具、举办AI素养培训活动及推动基础设施升级。',
      coreLabel: '核心方案',
      cards: [
        { icon: 'server', title: 'AI算力本地部署', desc: '为学校提供安全、合规的本地AI算力基础设施，确保学生数据隐私与网络安全，满足教育机构对数据主权的严格要求' },
        { icon: 'database', title: 'RAG知识库建立', desc: '基于检索增强生成（RAG）技术，为学校构建专属知识库，整合校本教材、教案、试题等教学资源，实现智能化教学辅助与个性化学习推荐' },
        { icon: 'cap', title: 'AI辅助教学', desc: '为教师提供AI备课工具、智能作业批改、学情分析等教学辅助功能，提升教学效率与质量' },
        { icon: 'workflow', title: '行政自动化处理', desc: '利用AI技术实现学校行政流程自动化，包括学生档案管理、排课优化、家校沟通、财务处理等，释放行政资源' },
      ],
    },
    en: {
      overline: '01 · Education AI Solutions', heading: 'Education AI Solutions',
      targetLabel: 'Target Clients', target: 'Hong Kong primary & secondary schools, tertiary institutions',
      marketLabel: 'Market Background',
      market: 'The Quality Education Fund has reserved <strong>HK$2 billion</strong> to advance digital education in primary and secondary schools, launching school-based AI education projects. Among this, HK$500 million is allocated to the "AI-Enabling Learning and Teaching" scheme, with successful applicant schools receiving a one-off <strong>HK$500,000 grant</strong> for AI tool procurement, AI literacy training, and infrastructure upgrades.',
      coreLabel: 'Core Solutions',
      cards: [
        { icon: 'server', title: 'AI On-Premise Deployment', desc: 'Secure, compliant on-premise AI infrastructure for schools, ensuring student data privacy and cybersecurity while meeting strict data sovereignty requirements' },
        { icon: 'database', title: 'RAG Knowledge Base', desc: 'Retrieval-Augmented Generation (RAG)-based proprietary knowledge base integrating school-based teaching materials, lesson plans, exam papers, and more — enabling intelligent teaching assistance and personalized learning recommendations' },
        { icon: 'cap', title: 'AI-Assisted Teaching', desc: 'AI lesson planning tools, smart assignment grading, and learning analytics to enhance teaching efficiency and quality' },
        { icon: 'workflow', title: 'Administrative Automation', desc: 'AI-powered automation of school administration including student records, timetable optimization, parent-school communication, and financial processing' },
      ],
    },
  },
  enterprise: {
    'zh-Hant': {
      overline: '02 · 企業AI解決方案', heading: '企業AI解決方案',
      targetLabel: '目標客戶', target: '香港中小企業',
      marketLabel: '市場背景',
      market: '香港政府推出優化版「數碼轉型支援先導計劃」，撥款 <strong>3億港元</strong> 重點扶持中小企利用市場現成的AI及網絡安全數碼方案。香港的AI佈局已由逐項推進進入系統佈局階段，力求讓AI賦能千行百業。',
      coreLabel: '核心方案',
      cards: [
        { icon: 'server', title: 'AI算力本地部署', desc: '為中小企業提供安全、可控的本地AI算力基礎設施，滿足數據私隱、合規性及定制化需求，無需依賴公有雲服務' },
        { icon: 'database', title: 'RAG知識庫建立', desc: '基於RAG技術為企業構建專屬知識庫，整合內部文檔、制度、產品資料、客戶信息等，實現智能檢索、知識管理與決策輔助' },
      ],
      wideCard: {
        icon: 'apps', title: '企業內部AI應用', desc: '覆蓋多元業務場景：',
        chips: [
          { name: '市場營銷', detail: '客戶畫像與精準推廣' },
          { name: '運營管理', detail: '流程自動化與智能調度' },
          { name: '客戶服務', detail: '智能客服與情感分析' },
          { name: '數據分析', detail: '趨勢預測與決策支持' },
        ],
      },
    },
    'zh-Hans': {
      overline: '02 · 企业AI解决方案', heading: '企业AI解决方案',
      targetLabel: '目标客户', target: '香港中小企业',
      marketLabel: '市场背景',
      market: '香港政府推出优化版「数码转型支援先导计划」，拨款 <strong>3亿港元</strong> 重点扶持中小企利用市场现成的AI及网络安全数码方案。香港的AI布局已由逐项推进进入系统布局阶段，力求让AI赋能千行百业。',
      coreLabel: '核心方案',
      cards: [
        { icon: 'server', title: 'AI算力本地部署', desc: '为中小企业提供安全、可控的本地AI算力基础设施，满足数据隐私、合规性及定制化需求，无需依赖公有云服务' },
        { icon: 'database', title: 'RAG知识库建立', desc: '基于RAG技术为企业构建专属知识库，整合内部文档、制度、产品资料、客户信息等，实现智能检索、知识管理与决策辅助' },
      ],
      wideCard: {
        icon: 'apps', title: '企业内部AI应用', desc: '覆盖多元业务场景：',
        chips: [
          { name: '市场营销', detail: '客户画像与精准推广' },
          { name: '运营管理', detail: '流程自动化与智能调度' },
          { name: '客户服务', detail: '智能客服与情感分析' },
          { name: '数据分析', detail: '趋势预测与决策支持' },
        ],
      },
    },
    en: {
      overline: '02 · Enterprise AI Solutions', heading: 'Enterprise AI Solutions',
      targetLabel: 'Target Clients', target: 'Hong Kong SMEs',
      marketLabel: 'Market Background',
      market: 'The Hong Kong government has launched an optimized "Digital Transformation Support Pilot Programme" with <strong>HK$300 million</strong> in funding to support SMEs in adopting market-ready AI and cybersecurity digital solutions. Hong Kong\'s AI development has evolved from isolated initiatives to systematic deployment, aiming to empower all industries with AI.',
      coreLabel: 'Core Solutions',
      cards: [
        { icon: 'server', title: 'AI On-Premise Deployment', desc: 'Secure, controllable on-premise AI infrastructure for SMEs, meeting data privacy, compliance, and customization needs without relying on public cloud services' },
        { icon: 'database', title: 'RAG Knowledge Base', desc: 'RAG-based enterprise knowledge base integrating internal documents, policies, product materials, and client information — enabling smart search, knowledge management, and decision support' },
      ],
      wideCard: {
        icon: 'apps', title: 'Internal AI Applications', desc: 'Covering a wide range of business scenarios:',
        chips: [
          { name: 'Marketing', detail: 'Customer profiling & targeted promotion' },
          { name: 'Operations', detail: 'Process automation & intelligent scheduling' },
          { name: 'Customer Service', detail: 'Smart chatbots & sentiment analysis' },
          { name: 'Data Analytics', detail: 'Trend forecasting & decision support' },
        ],
      },
    },
  },
  products: {
    'zh-Hant': {
      overline: '03 · 技術產品', heading: '技術產品',
      items: [
        { code: 'GP-COMPUTE', title: 'AI算力伺服器', desc: '高性能本地AI算力設備，預裝主流AI開發框架與推理引擎，即插即用，支持主流開源大模型本地部署' },
        { code: 'GP-RAG', title: 'RAG知識庫平台', desc: '企業/學校級知識管理平台，支持多格式文檔導入、智能向量化檢索、大模型問答與內容生成，保障數據安全與私隱' },
        { code: 'GP-MW', title: 'AI應用中間件', desc: '提供標準化的API接口與可視化配置工具，幫助客戶快速將AI能力集成至現有業務流程' },
      ],
    },
    'zh-Hans': {
      overline: '03 · 技术产品', heading: '技术产品',
      items: [
        { code: 'GP-COMPUTE', title: 'AI算力服务器', desc: '高性能本地AI算力设备，预装主流AI开发框架与推理引擎，即插即用，支持主流开源大模型本地部署' },
        { code: 'GP-RAG', title: 'RAG知识库平台', desc: '企业/学校级知识管理平台，支持多格式文档导入、智能向量化检索、大模型问答与内容生成，保障数据安全与隐私' },
        { code: 'GP-MW', title: 'AI应用中间件', desc: '提供标准化的API接口与可视化配置工具，帮助客户快速将AI能力集成至现有业务流程' },
      ],
    },
    en: {
      overline: '03 · Technology Products', heading: 'Technology Products',
      items: [
        { code: 'GP-COMPUTE', title: 'AI Compute Server', desc: 'High-performance on-premise AI compute device with pre-installed mainstream AI frameworks and inference engines — plug-and-play, supporting local deployment of major open-source LLMs' },
        { code: 'GP-RAG', title: 'RAG Knowledge Base Platform', desc: 'Enterprise/school-grade knowledge management platform supporting multi-format document import, intelligent vector search, LLM Q&A, and content generation with data security and privacy protection' },
        { code: 'GP-MW', title: 'AI Application Middleware', desc: 'Standardized API interfaces and visual configuration tools enabling rapid integration of AI capabilities into existing business processes' },
      ],
    },
  },
};

/* ------------------------------------------------------------------ */
/* Page 04 — Patents & Technology                                      */
/* ------------------------------------------------------------------ */
const patents = {
  meta: {
    'zh-Hant': {
      title: '專利與技術 | GP Investment Group Limited — 12項核心技術專利',
      description: 'GP Investment Group Limited 持續投入AI技術研發，已累計申請12項核心技術專利，其中2項已獲正式授權，覆蓋AI算力本地部署、RAG知識庫架構、AI教學輔助算法及企業AI應用中間件四大領域。',
    },
    'zh-Hans': {
      title: '专利与技术 | GP Investment Group Limited — 12项核心技术专利',
      description: 'GP Investment Group Limited 持续投入AI技术研发，已累计申请12项核心技术专利，其中2项已获正式授权，覆盖AI算力本地部署、RAG知识库架构、AI教学辅助算法及企业AI应用中间件四大领域。',
    },
    en: {
      title: 'Patents & Technology | GP Investment Group Limited — 12 Core Technology Patents',
      description: 'GP Investment Group Limited continuously invests in AI technology R&D, with a cumulative total of 12 core technology patents filed, of which 2 have been officially granted, spanning on-premise AI deployment, RAG architecture, AI teaching algorithms, and enterprise AI middleware.',
    },
  },
  hero: {
    'zh-Hant': { h1: '專利與技術', sub: '12項核心技術專利 — 以自主研發構建技術護城河。', chip: '2項已獲正式授權', chipLabel: '核心技術專利' },
    'zh-Hans': { h1: '专利与技术', sub: '12项核心技术专利 — 以自主研发构建技术护城河。', chip: '2项已获正式授权', chipLabel: '核心技术专利' },
    en: { h1: 'Patents & Technology', sub: '12 core technology patents — building our technology moat through proprietary R&D.', chip: '2 officially granted', chipLabel: 'Core technology patents' },
  },
  overview: {
    'zh-Hant': {
      overline: '01 · 專利概覽', heading: '專利概覽',
      intro: 'GP Investment Group Limited 持續投入AI技術研發，已累計申請 <strong>12項核心技術專利</strong>，其中 <strong>2項已獲正式授權</strong>。',
      caption: 'GP Investment 專利領域、數量與狀態概覽',
      cols: ['專利領域', '數量', '狀態'],
      rows: [
        { area: 'AI算力本地部署與優化', status: '申請中/已授權' },
        { area: 'RAG知識庫系統架構', status: '申請中/已授權' },
        { area: 'AI教學輔助算法', status: '申請中/已授權' },
        { area: '企業AI應用中間件', status: '申請中/已授權' },
      ],
    },
    'zh-Hans': {
      overline: '01 · 专利概览', heading: '专利概览',
      intro: 'GP Investment Group Limited 持续投入AI技术研发，已累计申请 <strong>12项核心技术专利</strong>，其中 <strong>2项已获正式授权</strong>。',
      caption: 'GP Investment 专利领域、数量与状态概览',
      cols: ['专利领域', '数量', '状态'],
      rows: [
        { area: 'AI算力本地部署与优化', status: '申请中/已授权' },
        { area: 'RAG知识库系统架构', status: '申请中/已授权' },
        { area: 'AI教学辅助算法', status: '申请中/已授权' },
        { area: '企业AI应用中间件', status: '申请中/已授权' },
      ],
    },
    en: {
      overline: '01 · Patent Overview', heading: 'Patent Overview',
      intro: 'GP Investment Group Limited continuously invests in AI technology R&D, with a cumulative total of <strong>12 core technology patents</strong> filed, of which <strong>2 have been officially granted</strong>.',
      caption: 'Overview of GP Investment patent areas, counts and status',
      cols: ['Patent Area', 'Count', 'Status'],
      rows: [
        { area: 'AI On-Premise Deployment & Optimization', status: 'Filed/Granted' },
        { area: 'RAG Knowledge Base System Architecture', status: 'Filed/Granted' },
        { area: 'AI-Assisted Teaching Algorithms', status: 'Filed/Granted' },
        { area: 'Enterprise AI Application Middleware', status: 'Filed/Granted' },
      ],
    },
  },
  moat: {
    'zh-Hant': {
      overline: '02 · 技術壁壘', heading: '技術壁壘',
      items: [
        { icon: 'shield', title: '自主研發 · 持續創新', desc: '堅持核心AI技術的自主研發，構建難以複製的技術護城河。研發團隊持續跟蹤前沿技術動態，確保產品競爭力。' },
        { icon: 'target', title: '場景化深耕', desc: '深度理解香港學界與中小企業的業務場景與痛點，提供精準對焦的AI解決方案。' },
        { icon: 'users', title: '產學研融合', desc: '與香港理工大學等學術機構保持深度合作，將前沿AI研究成果快速轉化為商業化應用。' },
      ],
    },
    'zh-Hans': {
      overline: '02 · 技术壁垒', heading: '技术壁垒',
      items: [
        { icon: 'shield', title: '自主研发 · 持续创新', desc: '坚持核心AI技术的自主研发，构建难以复制的技术护城河。研发团队持续跟踪前沿技术动态，确保产品竞争力。' },
        { icon: 'target', title: '场景化深耕', desc: '深度理解香港学界与中小企业的业务场景与痛点，提供精准对焦的AI解决方案。' },
        { icon: 'users', title: '产学研融合', desc: '与香港理工大学等学术机构保持深度合作，将前沿AI研究成果快速转化为商业化应用。' },
      ],
    },
    en: {
      overline: '02 · Technology Moat', heading: 'Technology Moat',
      items: [
        { icon: 'shield', title: 'Proprietary R&D · Continuous Innovation', desc: 'Committed to independent R&D of core AI technologies, building an un-replicable technology moat. Our team continuously tracks cutting-edge trends to ensure product competitiveness.' },
        { icon: 'target', title: 'Scenario-Focused Deep Dive', desc: 'Deep understanding of the business scenarios and pain points of Hong Kong\'s education sector and SMEs, delivering precisely aligned AI solutions.' },
        { icon: 'users', title: 'Industry-Academia Integration', desc: 'Deep collaboration with PolyU and other academic institutions, rapidly transforming cutting-edge AI research into commercial applications.' },
      ],
    },
  },
  commitment: {
    'zh-Hant': {
      overline: '03 · 研發投入承諾', heading: '研發投入承諾',
      intro: 'GP Investment 將持續加大研發投入，重點佈局：',
      items: ['下一代輕量化AI算力部署方案', '多模態RAG知識庫系統', '個性化AI教學輔助引擎', '企業AI Agent自動化工作流平台'],
    },
    'zh-Hans': {
      overline: '03 · 研发投入承诺', heading: '研发投入承诺',
      intro: 'GP Investment 将持续加大研发投入，重点布局：',
      items: ['下一代轻量化AI算力部署方案', '多模态RAG知识库系统', '个性化AI教学辅助引擎', '企业AI Agent自动化工作流平台'],
    },
    en: {
      overline: '03 · R&D Investment Commitment', heading: 'R&D Investment Commitment',
      intro: 'GP Investment will continue to increase R&D investment, focusing on:',
      items: ['Next-generation lightweight AI compute deployment solutions', 'Multimodal RAG knowledge base systems', 'Personalized AI-assisted teaching engines', 'Enterprise AI Agent automated workflow platforms'],
    },
  },
};

/* ------------------------------------------------------------------ */
/* Page 05 — Market Opportunities                                      */
/* ------------------------------------------------------------------ */
const opportunities = {
  meta: {
    'zh-Hant': {
      title: '市場機遇 | GP Investment Group Limited — 優質教育基金20億 · 全民AI',
      description: '香港優質教育基金預留20億港元推進校本AI教育，每所成功申請的學校可獲一次性50萬港元撥款；政府另撥款3億港元支援中小企數碼轉型。GP Investment 以AI本地部署、RAG知識庫及AI教學/行政方案精準把握政策紅利。',
    },
    'zh-Hans': {
      title: '市场机遇 | GP Investment Group Limited — 优质教育基金20亿 · 全民AI',
      description: '香港优质教育基金预留20亿港元推进校本AI教育，每所成功申请的学校可获一次性50万港元拨款；政府另拨款3亿港元支援中小企数码转型。GP Investment 以AI本地部署、RAG知识库及AI教学/行政方案精准把握政策红利。',
    },
    en: {
      title: 'Market Opportunities | GP Investment Group Limited — QEF HK$2B · 全民AI',
      description: 'The Quality Education Fund has reserved HK$2 billion for school-based AI education, with each successful school eligible for a one-off HK$500,000 grant; the government also allocated HK$300 million for SME digital transformation. GP Investment is positioned to capture this policy-driven wave.',
    },
  },
  hero: {
    'zh-Hant': { h1: '市場機遇', sub: '優質教育基金20億 · 全民AI — 香港AI市場的歷史性機遇。' },
    'zh-Hans': { h1: '市场机遇', sub: '优质教育基金20亿 · 全民AI — 香港AI市场历史性机遇。' },
    en: { h1: 'Market Opportunities', sub: 'QEF HK$2B · 全民AI — a historic opportunity in Hong Kong\'s AI market.' },
  },
  intro: {
    'zh-Hant': {
      overline: '01 · 市場總覽', heading: '香港AI市場：歷史性機遇',
      body: '香港政府正以前所未有的力度推動人工智能普及與應用，為GP Investment 的核心業務創造了巨大的市場空間。',
    },
    'zh-Hans': {
      overline: '01 · 市场总览', heading: '香港AI市场：历史性机遇',
      body: '香港政府正以前所未有的力度推动人工智能普及与应用，为GP Investment 的核心业务创造了巨大的市场空间。',
    },
    en: {
      overline: '01 · Market Overview', heading: 'Hong Kong AI Market: A Historic Opportunity',
      body: 'The Hong Kong government is driving AI adoption with unprecedented momentum, creating immense market opportunities for GP Investment\'s core businesses.',
    },
  },
  qef: {
    'zh-Hant': {
      overline: '02 · 機遇一', heading: '優質教育基金20億港元 — 學界AI藍海',
      narrative: '香港優質教育基金已預留 <strong>20億港元</strong> 推進中小學數字教育，開展校本AI教育項目。',
      dataLabel: '關鍵數據',
      data: [
        { n: 20, suffix: '億港元', label: '專項支持中小學數字教育' },
        { n: 5, suffix: '億港元', label: '用於「『智』啟學教」計劃' },
        { n: 50, suffix: '萬港元', label: '每所學校可獲一次性撥款' },
        { n: 1000, prefix: '超過', suffix: '所', label: '覆蓋全港中小學' },
      ],
      gpTitle: 'GP Investment 的機遇',
      gpBody: '每所成功申請的學校均可獲得50萬港元撥款用於採購AI工具、舉辦AI素養培訓及基礎設施升級。GP Investment 的AI算力本地部署、RAG知識庫建立及AI教學/行政方案，精準匹配學校需求，是這一波政策紅利的直接受益者。',
      targetLabel: '目標', targetN: 50, targetSuffix: '所以上', targetText: '未來12個月內服務香港學校，建立學界AI解決方案的標杆案例。',
    },
    'zh-Hans': {
      overline: '02 · 机遇一', heading: '优质教育基金20亿港元 — 学界AI蓝海',
      narrative: '香港优质教育基金已预留 <strong>20亿港元</strong> 推进中小学数字教育，开展校本AI教育项目。',
      dataLabel: '关键数据',
      data: [
        { n: 20, suffix: '亿港元', label: '专项支持中小学数字教育' },
        { n: 5, suffix: '亿港元', label: '用于「『智』启学教」计划' },
        { n: 50, suffix: '万港元', label: '每所学校可获一次性拨款' },
        { n: 1000, prefix: '超过', suffix: '所', label: '覆盖全港中小学' },
      ],
      gpTitle: 'GP Investment 的机遇',
      gpBody: '每所成功申请的学校均可获得50万港元拨款用于采购AI工具、举办AI素养培训及基础设施升级。GP Investment 的AI算力本地部署、RAG知识库建立及AI教学/行政方案，精准匹配学校需求，是这一波政策红利的直接受益者。',
      targetLabel: '目标', targetN: 50, targetSuffix: '所以上', targetText: '未来12个月内服务香港学校，建立学界AI解决方案的标杆案例。',
    },
    en: {
      overline: '02 · Opportunity 1', heading: 'QEF HK$2 Billion — the Education AI Blue Ocean',
      narrative: 'The Quality Education Fund has reserved <strong>HK$2 billion</strong> to advance digital education in primary and secondary schools, launching school-based AI education projects.',
      dataLabel: 'Key Data',
      data: [
        { n: 2, prefix: 'HK$', suffix: 'B', label: 'Dedicated to primary and secondary digital education' },
        { n: 500, prefix: 'HK$', suffix: 'M', label: 'For the "AI-Enabling Learning and Teaching" scheme' },
        { n: 500, prefix: 'HK$', suffix: 'K', label: 'One-off grant per eligible school' },
        { n: 1000, suffix: '+', label: 'Primary and secondary schools covered across Hong Kong' },
      ],
      gpTitle: 'GP Investment\'s Opportunity',
      gpBody: 'Each successful applicant school receives HK$500,000 for AI tool procurement, AI literacy training, and infrastructure upgrades. GP Investment\'s AI on-premise deployment, RAG knowledge base, and AI teaching/administration solutions precisely match school needs — positioning us as a direct beneficiary of this policy-driven wave.',
      targetLabel: 'Target', targetN: 50, targetSuffix: '+', targetText: 'Hong Kong schools served within the next 12 months, establishing benchmark cases in education AI solutions.',
    },
  },
  sme: {
    'zh-Hant': {
      overline: '03 · 機遇二', heading: '全民AI · 3億港元中小企業扶持',
      narrative: '香港政府推出優化版「數碼轉型支援先導計劃」，撥款 <strong>3億港元</strong> 重點扶持中小企採用AI及網絡安全數碼方案。同時撥款 <strong>5,000萬港元</strong> 推行「全民AI培訓」，邀請公營機構聯同科技企業及大專院校籌辦AI應用學習課程。',
      dataLabel: '關鍵數據',
      data: [
        { n: 3, suffix: '億港元', label: '中小企業AI方案扶持' },
        { n: 5000, suffix: '萬港元', label: '全民AI培訓' },
        { n: 34, prefix: '超過', suffix: '萬間', label: '覆蓋全港中小企業' },
      ],
      gpTitle: 'GP Investment 的機遇',
      gpBody: 'GP Investment 的企業AI解決方案（AI算力本地部署、RAG知識庫建立、內部AI應用）精準對焦中小企業數碼轉型需求，是政府扶持政策的理想技術合作夥伴。',
    },
    'zh-Hans': {
      overline: '03 · 机遇二', heading: '全民AI · 3亿港元中小企业扶持',
      narrative: '香港政府推出优化版「数码转型支援先导计划」，拨款 <strong>3亿港元</strong> 重点扶持中小企采用AI及网络安全数码方案。同时拨款 <strong>5,000万港元</strong> 推行「全民AI培训」，邀请公营机构联同科技企业及大专院校筹办AI应用学习课程。',
      dataLabel: '关键数据',
      data: [
        { n: 3, suffix: '亿港元', label: '中小企业AI方案扶持' },
        { n: 5000, suffix: '万港元', label: '全民AI培训' },
        { n: 34, prefix: '超过', suffix: '万间', label: '覆盖全港中小企业' },
      ],
      gpTitle: 'GP Investment 的机遇',
      gpBody: 'GP Investment 的企业AI解决方案（AI算力本地部署、RAG知识库建立、内部AI应用）精准对焦中小企业数字化转型需求，是政府扶持政策的理想技术合作伙伴。',
    },
    en: {
      overline: '03 · Opportunity 2', heading: '全民AI · HK$300M SME Support',
      narrative: 'The Hong Kong government has launched an optimized "Digital Transformation Support Pilot Programme" with <strong>HK$300 million</strong> in funding to support SMEs in adopting AI and cybersecurity digital solutions. An additional <strong>HK$50 million</strong> has been allocated for "全民AI Training," inviting public organizations to partner with technology companies and tertiary institutions to organize AI application learning courses.',
      dataLabel: 'Key Data',
      data: [
        { n: 300, prefix: 'HK$', suffix: 'M', label: 'For SME AI solution support' },
        { n: 50, prefix: 'HK$', suffix: 'M', label: 'For 全民AI training' },
        { n: 340000, prefix: 'Over ', label: 'SMEs covered across Hong Kong' },
      ],
      gpTitle: 'GP Investment\'s Opportunity',
      gpBody: 'GP Investment\'s enterprise AI solutions (AI on-premise deployment, RAG knowledge base, internal AI applications) precisely address SME digital transformation needs, positioning us as an ideal technology partner for government-supported initiatives.',
    },
  },
  summary: {
    'zh-Hant': {
      overline: '04 · 市場前景總結', heading: '市場前景總結',
      caption: '市場領域、政策驅動、市場規模與GP定位總結',
      cols: ['市場領域', '政策驅動', '市場規模', 'GP定位'],
      rows: [
        ['學界AI', '優質教育基金20億', '1,000+所學校', 'AI算力本地部署 + RAG知識庫 + AI教學/行政'],
        ['中小企業AI', '數碼轉型支援計劃3億', '34萬+家企業', 'AI算力本地部署 + RAG知識庫 + 內部AI應用'],
      ],
    },
    'zh-Hans': {
      overline: '04 · 市场前景总结', heading: '市场前景总结',
      caption: '市场领域、政策驱动、市场规模与GP定位总结',
      cols: ['市场领域', '政策驱动', '市场规模', 'GP定位'],
      rows: [
        ['学界AI', '优质教育基金20亿', '1,000+所学校', 'AI算力本地部署 + RAG知识库 + AI教学/行政'],
        ['中小企业AI', '数码转型支援计划3亿', '34万+家企业', 'AI算力本地部署 + RAG知识库 + 内部AI应用'],
      ],
    },
    en: {
      overline: '04 · Market Outlook Summary', heading: 'Market Outlook Summary',
      caption: 'Summary of markets, policy drivers, market size and GP positioning',
      cols: ['Market', 'Policy Driver', 'Market Size', 'GP Positioning'],
      rows: [
        ['Education AI', 'QEF HK$2B', '1,000+ schools', 'AI On-Premise + RAG + AI Teaching/Admin'],
        ['SME AI', 'Digital Transformation Support HK$300M', '340,000+ enterprises', 'AI On-Premise + RAG + Internal AI Applications'],
      ],
    },
  },
  cta: {
    'zh-Hant': { heading: '把握政策紅利，開啟AI之旅。', button: '聯絡我們' },
    'zh-Hans': { heading: '把握政策红利，开启AI之旅。', button: '联系我们' },
    en: { heading: 'Seize the policy dividend — start your AI journey.', button: 'Contact Us' },
  },
};

/* ------------------------------------------------------------------ */
/* Page 06 — Contact Us                                                */
/* ------------------------------------------------------------------ */
const contact = {
  meta: {
    'zh-Hant': {
      title: '聯絡我們 | GP Investment Group Limited',
      description: '聯絡GP Investment Group Limited：香港灣仔港灣道6-8號瑞安中心19樓1906-07室，電話 (+852) 3628 3499，電郵 info@gpinvestment.com。歡迎查詢AI教育方案、企業AI方案及技術產品。',
    },
    'zh-Hans': {
      title: '联系我们 | GP Investment Group Limited',
      description: '联系GP Investment Group Limited：香港湾仔港湾道6-8号瑞安中心19楼1906-07室，电话 (+852) 3628 3499，电邮 info@gpinvestment.com。欢迎查询AI教育方案、企业AI方案及技术产品。',
    },
    en: {
      title: 'Contact Us | GP Investment Group Limited',
      description: 'Contact GP Investment Group Limited: Unit 1906-07, 19/F, Shui On Centre, 6-8 Harbour Road, Wan Chai, Hong Kong · (+852) 3628 3499 · info@gpinvestment.com. Enquire about our AI education solutions, enterprise AI solutions, and technology products.',
    },
  },
  hero: {
    'zh-Hant': { h1: '聯絡我們', sub: '與我們的團隊探討AI數碼化方案 — 我們樂意為您提供專業建議。' },
    'zh-Hans': { h1: '联系我们', sub: '与我们的团队探讨AI数字化方案 — 我们乐意为您提供专业建议。' },
    en: { h1: 'Contact Us', sub: 'Talk to our team about AI digitalization — we\'re happy to provide expert advice.' },
  },
  infoTitle: { 'zh-Hant': '香港總部', 'zh-Hans': '香港总部', en: 'Hong Kong Headquarters' },
  section: { 'zh-Hant': '01 · 聯絡方式與業務諮詢', 'zh-Hans': '01 · 联系方式与业务咨询', en: '01 · Contact & Business Enquiry' },
};

module.exports = { BASE_URL, LOCALES, PAGES, SLUGS, ui, CONTACT, home, about, solutions, patents, opportunities, contact };
