/* ============================================================
   script.js — Personal site of Mohammad Jafari (v4)
   - Theme: dark / light / system (default: system, persisted)
   - Language: 10 dictionaries (en fa ar es ja zh fr it de tr)
   - RTL for Persian & Arabic
   - Quick sidebar navigation (rail on desktop, drawer on mobile)
   - Touch feedback, mobile menu, scroll-reveal animations
   All DOM lookups are guarded so a missing element never
   breaks the whole script.
   ============================================================ */

"use strict";

/* ---------- JS guard for reveal animations ---------- */
document.documentElement.classList.add("js");

/* ================== Theme system ================== */
const THEME_KEY = "mj_theme";
const THEME_ORDER = ["dark", "light", "system"];
const THEME_ICONS = { dark: "🌙", light: "☀️", system: "💻" };

const themeBtn = document.getElementById("themeBtn");
const themeBtnSide = document.getElementById("themeBtnSide");
const colorSchemeMedia = window.matchMedia("(prefers-color-scheme: dark)");

function getStoredTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return THEME_ORDER.includes(t) ? t : "system";
  } catch (e) {
    return "system";
  }
}

function syncThemeButtons(mode) {
  [themeBtn, themeBtnSide].forEach((btn) => {
    if (!btn) return;
    btn.textContent = THEME_ICONS[mode];
    btn.setAttribute("aria-label", "Theme: " + mode);
    btn.title = "Dark / Light / System — (" + mode + ")";
  });
}

function setTheme(mode, persist) {
  document.documentElement.dataset.theme = mode;
  syncThemeButtons(mode);
  if (persist) {
    try { localStorage.setItem(THEME_KEY, mode); } catch (e) {}
  }
}

if (colorSchemeMedia.addEventListener) {
  colorSchemeMedia.addEventListener("change", () => {
    if (getStoredTheme() === "system") setTheme("system", false);
  });
}

[themeBtn, themeBtnSide].forEach((btn) => {
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = getStoredTheme();
    const next = THEME_ORDER[(THEME_ORDER.indexOf(current) + 1) % THEME_ORDER.length];
    setTheme(next, true);
  });
});

syncThemeButtons(getStoredTheme());

/* ================== Language system ================== */
const LANG_KEY = "mj_lang";
const RTL_LANGS = ["fa", "ar"];
const DEFAULT_LANG = "en";

const LANG_OPTION_LABELS = {
  en: "🇬🇧 English",
  fa: "🇮🇷 فارسی",
  ar: "🇸🇦 العربية",
  es: "🇪🇸 Español",
  ja: "🇯🇵 日本語",
  zh: "🇨🇳 中文",
  fr: "🇫🇷 Français",
  it: "🇮🇹 Italiano",
  de: "🇩🇪 Deutsch",
  tr: "🇹🇷 Türkçe"
};

const I18N = {
  /* ---------------- English (fallback) ---------------- */
  en: {
    title: "Mohammad Jafari | Aspiring AI Engineer",
    nav_about: "About me",
    nav_learning: "Learning Journey",
    nav_projects: "Projects",
    nav_contact: "Contact me",
    side_toggle: "Quick navigation",
    side_close: "Close navigation",
    side_home: "Home",
    side_about: "About me",
    side_learning: "Learning",
    side_projects: "Projects",
    side_contact: "Contact",
    hero_headline: "Aspiring AI Engineer | Learning, Building, and Growing with AI",
    hero_desc: "I'm building my foundations in programming and artificial intelligence, turning what I learn into practical projects, and connecting with people who share a passion for technology and innovation.",
    btn_projects: "View projects",
    btn_contact: "Get in touch",
    about_title: "About me",
    about_text: "I'm Mohammad Jafari, a 15-year-old Iranian aspiring AI engineer with a strong curiosity about technology and a passion for continuous learning. I'm currently building my foundations in Python, machine learning, and artificial intelligence. My goal is to turn what I learn into practical projects that solve real-world problems and help me grow as an engineer. I believe that age shouldn't be a barrier to learning, creating, or pursuing ambitious goals. I enjoy experimenting, learning from mistakes, and improving step by step. Along this journey, I aim to build useful AI-powered applications, share my progress, and connect with people who are passionate about technology and innovation.",
    about_focus_label: "Currently focused:",
    about_focus_text: "Strengthening my programming skills, exploring AI, and building a solid foundation for future projects.",
    learn_title: "My Learning Journey",
    learn_text: "I'm at the beginning of my journey into programming and AI. I'm learning step by step, building my foundations, and working toward my first projects.",
    learn_intro: "Topics I'm currently learning:",
    tag_ml: "Machine Learning",
    tag_python: "Python",
    tag_ai: "Working with AI model APIs",
    tag_prompt: "Prompt Engineering",
    tag_more: "...and exploring more",
    proj_title: "Projects",
    proj_github_title: "My GitHub Profile",
    proj_github_desc: "Follow my learning journey and explore the code behind my projects on GitHub.",
    btn_github: "View my GitHub",
    proj_coming_title: "More Projects Coming Soon",
    proj_coming_text: "I'm working on my first real projects. They'll be published here as soon as they're ready.",
    contact_title: "Contact me",
    contact_intro: "The best way to reach me right now is through GitHub. More contact options will be added soon.",
    c_github: "GitHub",
    c_linkedin: "LinkedIn",
    c_soon: "Coming soon",
    contact_note: "Feel free to open an issue or start a discussion on any of my repositories.",
    footer_copy: "© Mohammad Jafari — Learning with curiosity. Building with purpose."
  },

  /* ---------------- Persian (Farsi) ---------------- */
  fa: {
    title: "محمد جعفری | در مسیر مهندسی هوش مصنوعی",
    nav_about: "درباره من",
    nav_learning: "مسیر یادگیری",
    nav_projects: "پروژه‌ها",
    nav_contact: "تماس با من",
    side_toggle: "ناوبری سریع",
    side_close: "بستن ناوبری",
    side_home: "خانه",
    side_about: "درباره من",
    side_learning: "یادگیری",
    side_projects: "پروژه‌ها",
    side_contact: "تماس",
    hero_headline: "در مسیر مهندسی هوش مصنوعی | در حال یادگیری، ساختن و رشد کردن با هوش مصنوعی",
    hero_desc: "من در حال ساختن پایه‌های برنامه‌نویسی و هوش مصنوعی هستم، هر چیزی که یاد می‌گیرم را به پروژه‌های کاربردی تبدیل می‌کنم و با افرادی که به تکنولوژی و نوآوری علاقه دارند ارتباط برقرار می‌کنم.",
    btn_projects: "دیدن پروژه‌ها",
    btn_contact: "ارتباط با من",
    about_title: "درباره من",
    about_text: "من محمد جعفری هستم؛ نوجوانی ۱۵ ساله و اهل ایران که در مسیر تبدیل‌شدن به مهندس هوش مصنوعی است، با کنجکاوی زیاد نسبت به تکنولوژی و عشق به یادگیری مداوم. در حال حاضر دارم روی پایه‌های پایتون، یادگیری ماشین (Machine Learning) و هوش مصنوعی (AI) کار می‌کنم. هدفم این است که هر چیزی که یاد می‌گیرم را به پروژه‌های کاربردی تبدیل کنم که مسائل دنیای واقعی را حل می‌کنند و به رشد من به‌عنوان یک مهندس کمک می‌کنند. باور دارم که سن نباید مانع یادگیری، خلق کردن یا دنبال کردن اهداف بزرگ باشد. از آزمودن، یادگیری از اشتباهات و بهتر شدن قدم‌به‌قدم لذت می‌برم. در این مسیر قصد دارم اپلیکیشن‌های مفید مبتنی بر هوش مصنوعی بسازم، پیشرفتم را به اشتراک بگذارم و با افرادی که به تکنولوژی و نوآوری علاقه دارند ارتباط برقرار کنم.",
    about_focus_label: "تمرکز فعلی:",
    about_focus_text: "تقویت مهارت‌های برنامه‌نویسی، کشف دنیای هوش مصنوعی و ساختن یک پایه قوی برای پروژه‌های آینده.",
    learn_title: "مسیر یادگیری من",
    learn_text: "من در آغاز مسیر یادگیری برنامه‌نویسی و هوش مصنوعی هستم. قدم‌به‌قدم یاد می‌گیرم، پایه‌هایم را قوی می‌کنم و در حال کار روی اولین پروژه‌هایم هستم.",
    learn_intro: "موضوعاتی که در حال یادگیری آن‌ها هستم:",
    tag_ml: "یادگیری ماشین (Machine Learning)",
    tag_python: "پایتون (Python)",
    tag_ai: "کار با API مدل‌های هوش مصنوعی",
    tag_prompt: "مهندسی پرامپت",
    tag_more: "...و کاوش موارد بیشتر",
    proj_title: "پروژه‌ها",
    proj_github_title: "پروفایل گیت‌هاب من",
    proj_github_desc: "مسیر یادگیری من را دنبال کنید و کد پروژه‌هایم را در گیت‌هاب ببینید.",
    btn_github: "مشاهده گیت‌هاب من",
    proj_coming_title: "پروژه‌های بیشتر به‌زودی",
    proj_coming_text: "در حال کار روی اولین پروژه‌های واقعی‌ام هستم. به‌محض آماده شدن، همین‌جا منتشر می‌شوند.",
    contact_title: "تماس با من",
    contact_intro: "در حال حاضر بهترین راه ارتباط با من از طریق گیت‌هاب است. روش‌های تماس بیشتر به‌زودی اضافه می‌شوند.",
    c_github: "گیت‌هاب",
    c_linkedin: "لینکدین",
    c_soon: "به‌زودی",
    contact_note: "خوشحال می‌شوم در مخازن من یک issue یا بحث جدید باز کنید.",
    footer_copy: "© محمد جعفری — با کنجکاوی یاد می‌گیرم و با هدف می‌سازم."
  },

  /* ---------------- Arabic ---------------- */
  ar: {
    title: "محمد جعفري | طموح في هندسة الذكاء الاصطناعي",
    nav_about: "نبذة عني",
    nav_learning: "رحلة التعلم",
    nav_projects: "المشاريع",
    nav_contact: "تواصل معي",
    side_toggle: "التنقل السريع",
    side_close: "إغلاق التنقل",
    side_home: "الرئيسية",
    side_about: "نبذة عني",
    side_learning: "التعلم",
    side_projects: "المشاريع",
    side_contact: "التواصل",
    hero_headline: "طموح في هندسة الذكاء الاصطناعي | أتعلم وأبني وأنمو مع الذكاء الاصطناعي",
    hero_desc: "أنا أبني أساسياتي في البرمجة والذكاء الاصطناعي، وأحوّل ما أتعلمه إلى مشاريع عملية، وأتواصل مع أشخاص يشاركونني الشغف بالتكنولوجيا والابتكار.",
    btn_projects: "عرض المشاريع",
    btn_contact: "تواصل معي",
    about_title: "نبذة عني",
    about_text: "أنا محمد جعفري، شاب إيراني يبلغ من العمر 15 عاماً وأطمح لأصبح مهندس ذكاء اصطناعي، أتمتع بفضول قوي تجاه التكنولوجيا وشغف بالتعلم المستمر. أنا أبني حالياً أساسياتي في بايثون وتعلم الآلة والذكاء الاصطناعي. هدفي هو تحويل ما أتعلمه إلى مشاريع عملية تحل مشكلات واقعية وتساعدني على النمو كمهندس. أؤمن بأن العمر لا يجب أن يكون عائقاً أمام التعلم والإبداع أو تحقيق الأهداف الطموحة. أستمتع بالتجريب والتعلم من الأخطاء والتحسن خطوة بخطوة. في هذه الرحلة، أهدف إلى بناء تطبيقات مفيدة تعتمد على الذكاء الاصطناعي، ومشاركة تقدمي، والتواصل مع من يشاركونني الشغف بالتكنولوجيا والابتكار.",
    about_focus_label: "تركيزي الحالي:",
    about_focus_text: "تعزيز مهاراتي في البرمجة، واستكشاف الذكاء الاصطناعي، وبناء أساس متين لمشاريع المستقبل.",
    learn_title: "رحلة تعلمي",
    learn_text: "أنا في بداية رحلتي في البرمجة والذكاء الاصطناعي. أتعلم خطوة بخطوة، وأبني أساسياتي، وأعمل على أول مشاريعي.",
    learn_intro: "المواضيع التي أتعلمها حالياً:",
    tag_ml: "تعلم الآلة (Machine Learning)",
    tag_python: "بايثون (Python)",
    tag_ai: "العمل مع واجهات برمجة نماذج الذكاء الاصطناعي",
    tag_prompt: "هندسة الأوامر (Prompt Engineering)",
    tag_more: "...والمزيد قيد الاستكشاف",
    proj_title: "المشاريع",
    proj_github_title: "ملف GitHub الخاص بي",
    proj_github_desc: "تابع رحلة تعلمي واستكشف الأكواد وراء مشاريعي على GitHub.",
    btn_github: "زيارة GitHub الخاص بي",
    proj_coming_title: "المزيد من المشاريع قريباً",
    proj_coming_text: "أعمل على أول مشاريعي الحقيقية. سيتم نشرها هنا فور جاهزيتها.",
    contact_title: "تواصل معي",
    contact_intro: "أفضل طريقة للتواصل معي حالياً هي عبر GitHub. سيتم إضافة خيارات تواصل أخرى قريباً.",
    c_github: "GitHub",
    c_linkedin: "لينكدإن",
    c_soon: "قريباً",
    contact_note: "لا تتردد في فتح نقاش أو سؤال في أي من مستودعاتي.",
    footer_copy: "© محمد جعفري — أتعلم بفضول، وأبني بهدف."
  },

  /* ---------------- Spanish ---------------- */
  es: {
    title: "Mohammad Jafari | Futuro ingeniero de IA",
    nav_about: "Sobre mí",
    nav_learning: "Mi aprendizaje",
    nav_projects: "Proyectos",
    nav_contact: "Contacto",
    side_toggle: "Navegación rápida",
    side_close: "Cerrar navegación",
    side_home: "Inicio",
    side_about: "Sobre mí",
    side_learning: "Aprendizaje",
    side_projects: "Proyectos",
    side_contact: "Contacto",
    hero_headline: "Futuro ingeniero de IA | Aprendiendo, creando y creciendo con IA",
    hero_desc: "Estoy construyendo mis bases en programación e inteligencia artificial, convirtiendo lo que aprendo en proyectos prácticos y conectando con personas que comparten mi pasión por la tecnología y la innovación.",
    btn_projects: "Ver proyectos",
    btn_contact: "Contáctame",
    about_title: "Sobre mí",
    about_text: "Soy Mohammad Jafari, un joven iraní de 15 años que aspira a convertirse en ingeniero de IA, con una gran curiosidad por la tecnología y pasión por el aprendizaje continuo. Actualmente estoy construyendo mis bases en Python, machine learning e inteligencia artificial. Mi objetivo es convertir lo que aprendo en proyectos prácticos que resuelvan problemas reales y me ayuden a crecer como ingeniero. Creo que la edad no debería ser una barrera para aprender, crear o perseguir objetivos ambiciosos. Disfruto experimentando, aprendiendo de los errores y mejorando paso a paso. En este camino, quiero construir aplicaciones útiles basadas en IA, compartir mi progreso y conectar con personas apasionadas por la tecnología y la innovación.",
    about_focus_label: "Enfoque actual:",
    about_focus_text: "Fortalecer mis habilidades de programación, explorar la IA y construir una base sólida para futuros proyectos.",
    learn_title: "Mi camino de aprendizaje",
    learn_text: "Estoy al principio de mi camino en la programación y la IA. Aprendo paso a paso, construyo mis bases y trabajo en mis primeros proyectos.",
    learn_intro: "Temas que estoy aprendiendo:",
    tag_ml: "Machine Learning",
    tag_python: "Python",
    tag_ai: "APIs de modelos de IA",
    tag_prompt: "Ingeniería de prompts",
    tag_more: "...y explorando más",
    proj_title: "Proyectos",
    proj_github_title: "Mi perfil de GitHub",
    proj_github_desc: "Sigue mi camino de aprendizaje y explora el código de mis proyectos en GitHub.",
    btn_github: "Ver mi GitHub",
    proj_coming_title: "Próximamente más proyectos",
    proj_coming_text: "Estoy trabajando en mis primeros proyectos reales. Los publicaré aquí en cuanto estén listos.",
    contact_title: "Contacto",
    contact_intro: "La mejor forma de contactarme ahora es a través de GitHub. Pronto añadiré más opciones de contacto.",
    c_github: "GitHub",
    c_linkedin: "LinkedIn",
    c_soon: "Pronto",
    contact_note: "Siéntete libre de abrir una discusión o un issue en cualquiera de mis repositorios.",
    footer_copy: "© Mohammad Jafari — Aprendiendo con curiosidad. Creando con propósito."
  },

  /* ---------------- Japanese ---------------- */
  ja: {
    title: "Mohammad Jafari | AIエンジニアを目指して",
    nav_about: "私について",
    nav_learning: "学習の旅",
    nav_projects: "プロジェクト",
    nav_contact: "お問い合わせ",
    side_toggle: "クイックナビゲーション",
    side_close: "ナビゲーションを閉じる",
    side_home: "ホーム",
    side_about: "私について",
    side_learning: "学習",
    side_projects: "プロジェクト",
    side_contact: "お問い合わせ",
    hero_headline: "AIエンジニアを目指して｜AIとともに学び、作り、成長する",
    hero_desc: "プログラミングとAIの基礎を築きながら、学んだことを実用的なプロジェクトに変え、テクノロジーとイノベーションに情熱を持つ人々とつながっています。",
    btn_projects: "プロジェクトを見る",
    btn_contact: "連絡する",
    about_title: "私について",
    about_text: "私はMohammad Jafari。15歳のイラン人で、AIエンジニアを目指しています。テクノロジーへの強い好奇心と継続的な学習への情熱を持っています。現在はPython、機械学習、AIの基礎を築いているところです。目標は、学んだことを現実の課題を解決する実用的なプロジェクトに変え、エンジニアとして成長することです。年齢は学びや創造、大きな目標の妨げになるべきではないと信じています。試行錯誤し、失敗から学び、一歩ずつ成長することを楽しんでいます。この道のりで、AIを活用した役立つアプリを作り、進歩を共有し、テクノロジーとイノベーションに情熱を持つ人々とつながりたいと考えています。",
    about_focus_label: "現在の焦点：",
    about_focus_text: "プログラミングスキルの強化、AIの探求、そして将来のプロジェクトのための確かな基礎づくり。",
    learn_title: "私の学習の旅",
    learn_text: "私はプログラミングとAIの旅の始まりにいます。一歩ずつ学び、基礎を築きながら、最初のプロジェクトに向かって進んでいます。",
    learn_intro: "現在学んでいるトピック：",
    tag_ml: "機械学習",
    tag_python: "Python",
    tag_ai: "AIモデルのAPIを使った開発",
    tag_prompt: "プロンプトエンジニアリング",
    tag_more: "…などを探求中",
    proj_title: "プロジェクト",
    proj_github_title: "GitHubプロフィール",
    proj_github_desc: "私の学習の旅をフォローして、GitHubでプロジェクトのコードをご覧ください。",
    btn_github: "GitHubを見る",
    proj_coming_title: "今後さらにプロジェクトを追加予定",
    proj_coming_text: "最初の本格的なプロジェクトに取り組んでいます。完成次第、こちらで公開します。",
    contact_title: "お問い合わせ",
    contact_intro: "今のところ、GitHubが連絡の最適な方法です。今後、他の連絡方法も追加予定です。",
    c_github: "GitHub",
    c_linkedin: "LinkedIn",
    c_soon: "近日公開",
    contact_note: "リポジトリでディスカッションやissueを立てていただければ幸いです。",
    footer_copy: "© Mohammad Jafari — 好奇心で学び、目的を持って創る。"
  },

  /* ---------------- Chinese (Simplified) ---------------- */
  zh: {
    title: "Mohammad Jafari | 立志成为 AI 工程师",
    nav_about: "关于我",
    nav_learning: "学习之旅",
    nav_projects: "项目",
    nav_contact: "联系我",
    side_toggle: "快速导航",
    side_close: "关闭导航",
    side_home: "首页",
    side_about: "关于我",
    side_learning: "学习",
    side_projects: "项目",
    side_contact: "联系",
    hero_headline: "立志成为 AI 工程师 | 与 AI 一起学习、创造、成长",
    hero_desc: "我正在打牢编程与人工智能的基础，把学到的知识转化为实用的项目，并结识同样热爱技术与创新的人。",
    btn_projects: "查看项目",
    btn_contact: "联系我",
    about_title: "关于我",
    about_text: "我是 Mohammad Jafari，一名15岁的伊朗少年，立志成为 AI 工程师。我对技术充满好奇，热爱不断学习。目前正在打牢 Python、机器学习和人工智能的基础。我的目标是把所学转化为解决实际问题的实用项目，并成长为一名工程师。我相信年龄不应成为学习、创造或追求远大目标的障碍。我喜欢动手尝试、从错误中学习、一步一步地进步。在这条路上，我希望构建有用的 AI 应用、分享自己的进展，并结识同样热爱技术与创新的人。",
    about_focus_label: "目前的重点：",
    about_focus_text: "强化编程技能、探索 AI，并为未来的项目打下坚实基础。",
    learn_title: "我的学习之旅",
    learn_text: "我正处于编程与 AI 学习之旅的起点。我一步一步地学习，打牢基础，并朝着第一个项目努力。",
    learn_intro: "我正在学习的主题：",
    tag_ml: "机器学习",
    tag_python: "Python",
    tag_ai: "使用 AI 模型 API",
    tag_prompt: "提示词工程",
    tag_more: "……持续探索更多",
    proj_title: "项目",
    proj_github_title: "我的 GitHub 主页",
    proj_github_desc: "关注我的学习历程，在 GitHub 上浏览我项目的代码。",
    btn_github: "查看我的 GitHub",
    proj_coming_title: "更多项目即将推出",
    proj_coming_text: "我正在开发自己的第一批真实项目，完成后会第一时间在这里发布。",
    contact_title: "联系我",
    contact_intro: "目前通过 GitHub 联系我最方便。更多联系方式将在稍后添加。",
    c_github: "GitHub",
    c_linkedin: "领英",
    c_soon: "即将上线",
    contact_note: "欢迎在我的仓库中发起讨论或提交 issue。",
    footer_copy: "© Mohammad Jafari — 怀着好奇心学习，带着目标去创造。"
  },

  /* ---------------- French ---------------- */
  fr: {
    title: "Mohammad Jafari | Futur ingénieur en IA",
    nav_about: "À propos",
    nav_learning: "Parcours d'apprentissage",
    nav_projects: "Projets",
    nav_contact: "Contact",
    side_toggle: "Navigation rapide",
    side_close: "Fermer la navigation",
    side_home: "Accueil",
    side_about: "À propos",
    side_learning: "Apprentissage",
    side_projects: "Projets",
    side_contact: "Contact",
    hero_headline: "Futur ingénieur en IA | J'apprends, je crée et je progresse avec l'IA",
    hero_desc: "Je bâtis mes bases en programmation et en intelligence artificielle, je transforme ce que j'apprends en projets concrets et je me connecte avec des personnes qui partagent ma passion pour la technologie et l'innovation.",
    btn_projects: "Voir mes projets",
    btn_contact: "Me contacter",
    about_title: "À propos de moi",
    about_text: "Je suis Mohammad Jafari, un jeune Iranien de 15 ans qui aspire à devenir ingénieur en IA, avec une forte curiosité pour la technologie et une passion pour l'apprentissage continu. Je bâtis actuellement mes bases en Python, en machine learning et en intelligence artificielle. Mon objectif est de transformer ce que j'apprends en projets concrets qui résolvent de vrais problèmes et m'aident à grandir en tant qu'ingénieur. Je crois que l'âge ne doit pas être un obstacle pour apprendre, créer ou poursuivre des objectifs ambitieux. J'aime expérimenter, apprendre de mes erreurs et progresser pas à pas. Sur ce chemin, je veux créer des applications utiles basées sur l'IA, partager mes progrès et me connecter avec des personnes passionnées par la technologie et l'innovation.",
    about_focus_label: "Priorité actuelle :",
    about_focus_text: "Renforcer mes compétences en programmation, explorer l'IA et bâtir des bases solides pour mes futurs projets.",
    learn_title: "Mon parcours d'apprentissage",
    learn_text: "Je suis au début de mon parcours en programmation et en IA. J'apprends pas à pas, je bâtis mes bases et je travaille sur mes premiers projets.",
    learn_intro: "Sujets que j'apprends actuellement :",
    tag_ml: "Machine Learning",
    tag_python: "Python",
    tag_ai: "Utilisation des API de modèles d'IA",
    tag_prompt: "Ingénierie de prompts",
    tag_more: "...et j'explore davantage",
    proj_title: "Projets",
    proj_github_title: "Mon profil GitHub",
    proj_github_desc: "Suivez mon parcours d'apprentissage et explorez le code de mes projets sur GitHub.",
    btn_github: "Voir mon GitHub",
    proj_coming_title: "D'autres projets arrivent bientôt",
    proj_coming_text: "Je travaille sur mes premiers vrais projets. Ils seront publiés ici dès qu'ils seront prêts.",
    contact_title: "Contact",
    contact_intro: "Le meilleur moyen de me joindre pour le moment est GitHub. D'autres options de contact seront ajoutées bientôt.",
    c_github: "GitHub",
    c_linkedin: "LinkedIn",
    c_soon: "Bientôt",
    contact_note: "N'hésitez pas à ouvrir une discussion ou une issue dans l'un de mes dépôts.",
    footer_copy: "© Mohammad Jafari — Apprendre avec curiosité. Créer avec intention."
  },

  /* ---------------- Italian ---------------- */
  it: {
    title: "Mohammad Jafari | Futuro ingegnere AI",
    nav_about: "Chi sono",
    nav_learning: "Percorso di apprendimento",
    nav_projects: "Progetti",
    nav_contact: "Contattami",
    side_toggle: "Navigazione rapida",
    side_close: "Chiudi navigazione",
    side_home: "Home",
    side_about: "Chi sono",
    side_learning: "Apprendimento",
    side_projects: "Progetti",
    side_contact: "Contatto",
    hero_headline: "Futuro ingegnere AI | Imparo, creo e cresco con l'IA",
    hero_desc: "Sto costruendo le mie basi di programmazione e intelligenza artificiale, trasformando ciò che imparo in progetti pratici e connettendomi con persone che condividono la mia passione per la tecnologia e l'innovazione.",
    btn_projects: "Vedi i progetti",
    btn_contact: "Contattami",
    about_title: "Chi sono",
    about_text: "Sono Mohammad Jafari, un ragazzo iraniano di 15 anni che sogna di diventare ingegnere AI, con una forte curiosità per la tecnologia e una passione per l'apprendimento continuo. Sto attualmente costruendo le mie basi in Python, machine learning e intelligenza artificiale. Il mio obiettivo è trasformare ciò che imparo in progetti pratici che risolvono problemi reali e mi aiutano a crescere come ingegnere. Credo che l'età non debba essere un ostacolo per imparare, creare o perseguire obiettivi ambiziosi. Mi piace sperimentare, imparare dagli errori e migliorare passo dopo passo. Lungo questo percorso voglio creare applicazioni utili basate sull'IA, condividere i miei progressi e connettermi con persone appassionate di tecnologia e innovazione.",
    about_focus_label: "Focus attuale:",
    about_focus_text: "Rafforzare le mie competenze di programmazione, esplorare l'IA e costruire una base solida per i progetti futuri.",
    learn_title: "Il mio percorso di apprendimento",
    learn_text: "Sono all'inizio del mio percorso nella programmazione e nell'IA. Imparo passo dopo passo, costruisco le mie basi e lavoro ai miei primi progetti.",
    learn_intro: "Argomenti che sto imparando:",
    tag_ml: "Machine Learning",
    tag_python: "Python",
    tag_ai: "Uso delle API dei modelli di IA",
    tag_prompt: "Prompt engineering",
    tag_more: "...e altro in esplorazione",
    proj_title: "Progetti",
    proj_github_title: "Il mio profilo GitHub",
    proj_github_desc: "Segui il mio percorso di apprendimento ed esplora il codice dei miei progetti su GitHub.",
    btn_github: "Vai al mio GitHub",
    proj_coming_title: "Altri progetti in arrivo",
    proj_coming_text: "Sto lavorando ai miei primi progetti veri. Li pubblicherò qui non appena saranno pronti.",
    contact_title: "Contattami",
    contact_intro: "Al momento il modo migliore per contattarmi è GitHub. Presto aggiungerò altre opzioni di contatto.",
    c_github: "GitHub",
    c_linkedin: "LinkedIn",
    c_soon: "In arrivo",
    contact_note: "Sentiti libero di aprire una discussione o una issue in uno dei miei repository.",
    footer_copy: "© Mohammad Jafari — Imparo con curiosità. Creo con uno scopo."
  },

  /* ---------------- German ---------------- */
  de: {
    title: "Mohammad Jafari | KI-Ingenieur in Ausbildung",
    nav_about: "Über mich",
    nav_learning: "Lernweg",
    nav_projects: "Projekte",
    nav_contact: "Kontakt",
    side_toggle: "Schnellnavigation",
    side_close: "Navigation schließen",
    side_home: "Start",
    side_about: "Über mich",
    side_learning: "Lernen",
    side_projects: "Projekte",
    side_contact: "Kontakt",
    hero_headline: "Künftiger KI-Ingenieur | Lernen, Bauen und Wachsen mit KI",
    hero_desc: "Ich baue meine Grundlagen in Programmierung und Künstlicher Intelligenz auf, verwandle Gelerntes in praktische Projekte und vernetze mich mit Menschen, die meine Begeisterung für Technologie und Innovation teilen.",
    btn_projects: "Projekte ansehen",
    btn_contact: "Kontakt aufnehmen",
    about_title: "Über mich",
    about_text: "Ich bin Mohammad Jafari, ein 15-jähriger Iraner, der KI-Ingenieur werden möchte, mit großer Neugier auf Technologie und einer Leidenschaft für kontinuierliches Lernen. Derzeit baue ich meine Grundlagen in Python, Machine Learning und Künstlicher Intelligenz auf. Mein Ziel ist es, Gelerntes in praktische Projekte zu verwandeln, die echte Probleme lösen und mich als Ingenieur wachsen lassen. Ich glaube, dass das Alter keine Barriere für Lernen, Schaffen oder ehrgeizige Ziele sein sollte. Ich experimentiere gerne, lerne aus Fehlern und verbessere mich Schritt für Schritt. Auf diesem Weg möchte ich nützliche KI-Anwendungen bauen, meinen Fortschritt teilen und mich mit Menschen vernetzen, die Technologie und Innovation lieben.",
    about_focus_label: "Aktueller Fokus:",
    about_focus_text: "Meine Programmierkenntnisse stärken, KI entdecken und eine solide Basis für zukünftige Projekte schaffen.",
    learn_title: "Mein Lernweg",
    learn_text: "Ich stehe am Anfang meines Weges in Programmierung und KI. Ich lerne Schritt für Schritt, baue meine Grundlagen auf und arbeite an meinen ersten Projekten.",
    learn_intro: "Themen, die ich gerade lerne:",
    tag_ml: "Machine Learning",
    tag_python: "Python",
    tag_ai: "Arbeit mit KI-Modell-APIs",
    tag_prompt: "Prompt Engineering",
    tag_more: "...und mehr im Entdecken",
    proj_title: "Projekte",
    proj_github_title: "Mein GitHub-Profil",
    proj_github_desc: "Folge meinem Lernweg und sieh dir den Code meiner Projekte auf GitHub an.",
    btn_github: "Zu meinem GitHub",
    proj_coming_title: "Weitere Projekte folgen bald",
    proj_coming_text: "Ich arbeite an meinen ersten richtigen Projekten. Sie erscheinen hier, sobald sie fertig sind.",
    contact_title: "Kontakt",
    contact_intro: "Der beste Weg, mich gerade zu erreichen, ist GitHub. Weitere Kontaktmöglichkeiten folgen bald.",
    c_github: "GitHub",
    c_linkedin: "LinkedIn",
    c_soon: "Demnächst",
    contact_note: "Öffne gerne eine Diskussion oder ein Issue in einem meiner Repositories.",
    footer_copy: "© Mohammad Jafari — Mit Neugier lernen. Mit Absicht bauen."
  },

  /* ---------------- Turkish ---------------- */
  tr: {
    title: "Mohammad Jafari | AI Mühendisi Adayı",
    nav_about: "Hakkımda",
    nav_learning: "Öğrenme Yolculuğum",
    nav_projects: "Projeler",
    nav_contact: "İletişim",
    side_toggle: "Hızlı gezinme",
    side_close: "Gezinmeyi kapat",
    side_home: "Ana Sayfa",
    side_about: "Hakkımda",
    side_learning: "Öğrenme",
    side_projects: "Projeler",
    side_contact: "İletişim",
    hero_headline: "AI Mühendisi Adayı | Yapay zekâ ile öğreniyor, inşa ediyor ve büyüyorum",
    hero_desc: "Programlama ve yapay zekâ temellerimi inşa ediyor, öğrendiklerimi pratik projelere dönüştürüyor ve teknoloji ile yeniliğe tutkuyla bağlı insanlarla bağ kuruyorum.",
    btn_projects: "Projeleri gör",
    btn_contact: "Bana ulaş",
    about_title: "Hakkımda",
    about_text: "Ben Mohammad Jafari; teknolojiye güçlü bir merak ve sürekli öğrenme tutkusuyla, AI mühendisi olmayı hedefleyen 15 yaşında bir İranlıyım. Şu anda Python, makine öğrenmesi ve yapay zekâ temellerimi inşa ediyorum. Amacım, öğrendiklerimi gerçek sorunları çözen pratik projelere dönüştürerek mühendis olarak büyümek. Yaşın; öğrenmeye, üretmeye veya iddialı hedeflere ulaşmaya engel olmaması gerektiğine inanıyorum. Deney yapmayı, hatalardan ders çıkarmayı ve adım adım gelişmeyi seviyorum. Bu yolda yapay zekâ destekli faydalı uygulamalar geliştirmeyi, ilerlememi paylaşmayı ve teknolojiye tutkuyla bağlı insanlarla bağ kurmayı hedefliyorum.",
    about_focus_label: "Şu anki odak:",
    about_focus_text: "Programlama becerilerimi güçlendirmek, yapay zekâyı keşfetmek ve gelecekteki projeler için sağlam bir temel oluşturmak.",
    learn_title: "Öğrenme Yolculuğum",
    learn_text: "Programlama ve yapay zekâ yolculuğumun başındayım. Adım adım öğreniyor, temellerimi inşa ediyor ve ilk projelerime doğru çalışıyorum.",
    learn_intro: "Şu anda öğrendiğim konular:",
    tag_ml: "Makine Öğrenmesi",
    tag_python: "Python",
    tag_ai: "AI modeli API'leriyle çalışma",
    tag_prompt: "Prompt Mühendisliği",
    tag_more: "...ve daha fazlasını keşfediyorum",
    proj_title: "Projeler",
    proj_github_title: "GitHub Profilim",
    proj_github_desc: "Öğrenme yolculuğumu takip et ve projelerimin kodlarını GitHub'da keşfet.",
    btn_github: "GitHub'uma git",
    proj_coming_title: "Yakında daha fazla proje",
    proj_coming_text: "İlk gerçek projelerim üzerinde çalışıyorum. Hazır olur olmaz burada yayınlanacak.",
    contact_title: "İletişim",
    contact_intro: "Şu anda bana ulaşmanın en iyi yolu GitHub üzerinden. Yakında daha fazla iletişim seçeneği eklenecek.",
    c_github: "GitHub",
    c_linkedin: "LinkedIn",
    c_soon: "Yakında",
    contact_note: "Depolarımdan birinde bir tartışma veya issue açmaktan çekinme.",
    footer_copy: "© Mohammad Jafari — Merakla öğreniyor, amaçla inşa ediyorum."
  }
};

const langSelect = document.getElementById("langSelect");

if (langSelect) {
  Array.from(langSelect.options).forEach((opt) => {
    const label = LANG_OPTION_LABELS[opt.value];
    if (label) opt.textContent = label;
  });
}

function getStoredLang() {
  try {
    const l = localStorage.getItem(LANG_KEY);
    return I18N[l] ? l : DEFAULT_LANG;
  } catch (e) {
    return DEFAULT_LANG;
  }
}

function applyLang(lang) {
  const dict = I18N[lang] || I18N[DEFAULT_LANG];
  const active = I18N[lang] ? lang : DEFAULT_LANG;

  document.documentElement.lang = active;
  document.documentElement.dir = RTL_LANGS.includes(active) ? "rtl" : "ltr";
  document.title = dict.title;

  /* Visible text */
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  /* Accessible names */
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.getAttribute("data-i18n-aria");
    if (dict[key] !== undefined) el.setAttribute("aria-label", dict[key]);
  });

  /* Sidebar tooltips / mobile labels */
  document.querySelectorAll("[data-i18n-tip]").forEach((el) => {
    const key = el.getAttribute("data-i18n-tip");
    if (dict[key] !== undefined) el.setAttribute("data-tip", dict[key]);
  });

  if (langSelect) langSelect.value = active;

  try { localStorage.setItem(LANG_KEY, active); } catch (e) {}
}

if (langSelect) {
  langSelect.addEventListener("change", () => applyLang(langSelect.value));
}
applyLang(getStoredLang());

/* ================== Touch feedback (mobile) ================== */
const TOUCH_SELECTOR = ".btn, a.contact-item, .theme-btn, .theme-btn-side, .lang-select, .hamburger, .nav-links a, .quick-nav a, .sidebar-toggle";
const PRESS_DELAY = 160;
const MOVE_THRESHOLD = 12;
let pressTimer = null;
let touchStartX = 0;
let touchStartY = 0;

function clearTouchClasses() {
  document.querySelectorAll(".touched, .pressed").forEach((el) => {
    el.classList.remove("touched", "pressed");
  });
}

document.addEventListener("touchstart", (e) => {
  const target = e.target.closest(TOUCH_SELECTOR);
  if (!target) return;

  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;

  target.classList.add("touched");
  target.classList.remove("pressed");

  clearTimeout(pressTimer);
  pressTimer = setTimeout(() => {
    target.classList.add("pressed");
  }, PRESS_DELAY);
}, { passive: true });

document.addEventListener("touchmove", (e) => {
  if (!document.querySelector(".touched")) return;
  const t = e.touches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;
  if (dx * dx + dy * dy > MOVE_THRESHOLD * MOVE_THRESHOLD) {
    clearTimeout(pressTimer);
    document.querySelectorAll(".pressed").forEach((el) => el.classList.remove("pressed"));
  }
}, { passive: true });

function endTouch() {
  clearTimeout(pressTimer);
  clearTouchClasses();
}
document.addEventListener("touchend", endTouch, { passive: true });
document.addEventListener("touchcancel", endTouch, { passive: true });

/* ================== Mobile menu (navbar) ================== */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  if (!navLinks) return;
  navLinks.classList.remove("open");
  if (hamburger) hamburger.setAttribute("aria-expanded", "false");
}

if (hamburger && navLinks) {
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const willOpen = !navLinks.classList.contains("open");
    navLinks.classList.toggle("open", willOpen);
    hamburger.setAttribute("aria-expanded", willOpen ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("open") && !navLinks.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

/* ================== Quick sidebar navigation ================== */
const quickNav = document.getElementById("quickNav");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebarClose = document.getElementById("sidebarClose");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");

function openSidebar() {
  if (!quickNav || !sidebarToggle) return;
  quickNav.classList.add("open");
  sidebarToggle.setAttribute("aria-expanded", "true");
  if (sidebarBackdrop) sidebarBackdrop.hidden = false;
  document.body.classList.add("no-scroll");
  const firstLink = quickNav.querySelector("a");
  if (firstLink) firstLink.focus();
}

function closeSidebar() {
  if (!quickNav || !sidebarToggle) return;
  quickNav.classList.remove("open");
  sidebarToggle.setAttribute("aria-expanded", "false");
  if (sidebarBackdrop) sidebarBackdrop.hidden = true;
  document.body.classList.remove("no-scroll");
}

function toggleSidebar() {
  if (!quickNav) return;
  if (quickNav.classList.contains("open")) {
    closeSidebar();
    if (sidebarToggle) sidebarToggle.focus();
  } else {
    openSidebar();
  }
}

if (sidebarToggle) {
  sidebarToggle.addEventListener("click", toggleSidebar);
}
if (sidebarClose) {
  sidebarClose.addEventListener("click", () => {
    closeSidebar();
    if (sidebarToggle) sidebarToggle.focus();
  });
}
if (sidebarBackdrop) {
  sidebarBackdrop.addEventListener("click", () => {
    closeSidebar();
    if (sidebarToggle) sidebarToggle.focus();
  });
}

/* Close the drawer after navigating, and on Escape */
if (quickNav) {
  quickNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeSidebar();
      if (sidebarToggle) sidebarToggle.focus();
    });
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSidebar();
});

/* Highlight the active section in the sidebar */
const sectionLinks = {};
if (quickNav) {
  quickNav.querySelectorAll("a[data-section]").forEach((a) => {
    sectionLinks[a.getAttribute("data-section")] = a;
  });
}

const pageSections = document.querySelectorAll("section[id]");
if ("IntersectionObserver" in window && pageSections.length) {
  const updateActiveSection = (activeId) => {
    Object.keys(sectionLinks).forEach((id) => {
      sectionLinks[id].classList.toggle("active", id === activeId);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveSection(entry.target.id);
        }
      });
    },
    { rootMargin: "-30% 0px -50% 0px" }
  );
  pageSections.forEach((s) => sectionObserver.observe(s));

  window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 15) {
      updateActiveSection("contact");
    }
  }, { passive: true });
}

/* ================== Scroll-reveal animations ================== */
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  revealElements.forEach((el) => observer.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add("visible"));
}
