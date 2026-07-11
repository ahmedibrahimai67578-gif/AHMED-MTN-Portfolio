document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initStickyHeader();
  initMobileNav();
  initCustomCursor();
  initMagneticElements();
  initScrollReveals();
  initBackToTop();
  initHoverVideoPreviews();
  initPortfolioFilters();
  initThemeToggle();
  initContactForm();
  initLanguageToggle();
});

// ---------------------------------------------------------------------------
// Bilingual (EN/AR) translation dictionary
// Keys are namespaced by page. Shared keys (nav/footer/buttons) are used
// across every page. Elements are tagged with data-i18n="key" (textContent)
// or data-i18n-html="key" (innerHTML, only for entries containing a <br>).
// ---------------------------------------------------------------------------
const translations = {
  ar: {
    // Shared chrome
    nav_home: 'الرئيسية', nav_about: 'من أنا', nav_services: 'الخدمات', nav_portfolio: 'الأعمال', nav_contact: 'تواصل معنا',
    footer_desc: 'تصميم موشن جرافيك سينمائي، إعلانات تجارية، أفلام ترويجية، ومرئيات مميزة تأسر الجمهور حول العالم.',
    footer_explore: 'تصفح', footer_socials: 'تواصل اجتماعي',
    footer_copy: '© 2026 أحمد إم تي إن. تصميم وتطوير أحمد إبراهيم',
    footer_location: 'مقيم في مصر. متاح للعمل حول العالم.',
    btn_whatsapp_msg: 'راسلني عبر واتساب', btn_whatsapp_chat: 'محادثة واتساب',
    btn_view_case_study: 'عرض دراسة الحالة', btn_view_project_case: 'عرض تفاصيل المشروع',
    loader_about: 'نبذة عني', loader_services: 'الخدمات', loader_portfolio: 'أعمالي', loader_contact: 'لنتحدث',
    loader_flow: 'دراسة حالة: فلو', loader_genie: 'دراسة حالة: جيني', loader_nilea: 'دراسة حالة: نيليا', loader_athar: 'دراسة حالة: أثر',

    // index.html
    idx_hero_subtitle: 'مصمم موشن جرافيك',
    idx_hero_title_html: 'أصمم حركة<br>تبعث الحياة في منتجاتك',
    idx_hero_desc: 'أحمد مصمم موشن جرافيك متخصص في إنتاج إعلانات منتجات سينمائية، حملات سوشيال ميديا، أنيميشن لوجوهات، وفيديوهات ترويجية تحوّل الأفكار إلى تجارب بصرية جذابة.',
    idx_btn_projects: 'شاهد أعمالي', idx_btn_talk: 'لنتحدث',
    idx_about_p1: 'أُدعى أحمد، وأعمل مصممًا متخصصًا في الموشن جرافيك، أُساعد العلامات التجارية على تحويل منتجاتها إلى محتوى فيديو قصير عالي الجودة، مصمم خصيصًا لجذب انتباه العميل وتعزيز صورة المنتج في السوق.',
    idx_about_p2: 'تعتمد الدراسات الحديثة أن 63% من المستهلكين حول العالم يفضّلون مشاهدة فيديو قصير عن المنتج قبل اتخاذ قرار الشراء.',
    idx_about_p3: 'لذلك أصمم كل مشروع بحيث يخدم هدفًا تسويقيًا واضحًا وليس مجرد فيديو جميل.',
    idx_about_p4: 'يشمل نطاق عملي تصميم فيديوهات المنتجات، الهوية الحركية، الإعلانات، والمحتوى المخصص لمنصات التواصل الاجتماعي مع أعلى جودة إنتاجية.',
    idx_about_sign: '— أحمد إبراهيم',
    idx_stat1_label: 'دراسات حالة', idx_stat2_label: 'خدمة متخصصة', idx_stat3_label: 'أفكار أصلية',
    idx_stat4_num: 'متاح', idx_stat4_label: 'لعملاء جدد',
    idx_discover_btn: 'تعرف على قصتي',
    idx_services_subtitle: 'ماذا أقدم', idx_services_title: 'خدمات إبداعية مصممة للعلامات المميزة',
    idx_svc1_title: 'فيديوهات إعلانية للمنتجات', idx_svc1_desc: 'إضاءة سينمائية، حركة عالية الدقة، وسرد بصري مبهر مصمم لإبراز منتجاتك المميزة.',
    idx_svc2_title: 'فيديوهات ترويجية للتطبيقات', idx_svc2_desc: 'تحويل شاشات وتدفقات التطبيقات المعقدة إلى رحلات حركية سلسة ونشطة تزيد من تحميل التطبيق.',
    idx_svc3_title: 'أنيميشن اللوجو', idx_svc3_desc: 'امنح هوية علامتك التجارية طابعًا حركيًا مميزًا، يعزز التذكر ويرفع من القيمة الإنتاجية.',
    idx_explore_services_btn: 'استكشف كل الخدمات العشر',
    idx_portfolio_subtitle: 'أعمال مختارة', idx_portfolio_title: 'دراسات حالة سينمائية',
    idx_p1_tag: 'ترويج تطبيق', idx_p1_dur: '15 ثانية', idx_p1_desc: 'تصور التحول من الفوضى الذهنية إلى الوضوح التام من خلال حركة سريعة وديناميكية.',
    idx_p2_tag: 'سينمائي للمنتج', idx_p2_dur: '15 ثانية', idx_p2_desc: 'دراسة حالة بصرية لعلامة عصائر مصرية فاخرة تُبرز تفاصيل المنتج والعناصر الثقافية.',
    idx_p3_tag: 'إعلان تجاري', idx_p3_dur: '10 ثوانٍ', idx_p3_desc: 'إعلان لعلامة طماطم سعودية تقليدية بإضاءة سينمائية دافئة وأنيميشن شخصية ودودة.',
    idx_seeall_btn: 'شاهد كل المشاريع',
    idx_cta_subtitle: 'لنعمل سويًا', idx_cta_title: 'لنصنع سويًا شيئًا مذهلًا',

    // about.html
    about_hero_subtitle: 'نبذة عني', about_hero_name: 'أحمد إبراهيم',
    about_hero_desc: 'مصمم مبدع أول ومهندس موشن جرافيك، متخصص في صناعة إعلانات تجارية قصيرة فاخرة، إعلانات تطبيقات، وحركات لوجو، مع تركيز عميق على معدلات التحويل وقيمة العلامة التجارية.',
    about_arabic_p1: 'أُدعى أحمد، وأعمل مصممًا متخصصًا في الموشن جرافيك، أُساعد العلامات التجارية على تحويل منتجاتها إلى محتوى فيديو قصير عالي الجودة، مصمم خصيصًا لجذب انتباه العميل وتعزيز صورة المنتج في السوق.',
    about_arabic_p2: 'تعتمد الدراسات الحديثة أن 63% من المستهلكين حول العالم يفضّلون مشاهدة فيديو قصير عن المنتج قبل اتخاذ قرار الشراء.',
    about_arabic_p3: 'لذلك أصمم كل مشروع بحيث يخدم هدفًا تسويقيًا واضحًا وليس مجرد فيديو جميل.',
    about_arabic_p4: 'يشمل نطاق عملي تصميم فيديوهات المنتجات، الهوية الحركية، الإعلانات، والمحتوى المخصص لمنصات التواصل الاجتماعي مع أعلى جودة إنتاجية.',
    about_arabic_sign: '— مصمم الموشن أحمد إبراهيم',
    about_track_subtitle: 'الوضع الحالي', about_track_title: 'الآن',
    about_stat1_label: 'دراسة حالة منشورة', about_stat2_label: 'خدمة مقدَّمة', about_stat3_label: 'أداة وبرنامج أستخدمها',
    about_stat4_label: 'أعمال مخصصة، بدون قوالب', about_stat5_label: 'متوسط وقت الرد',
    about_why_subtitle: 'مميزاتي', about_why_title: 'ليه تختار العمل مع أحمد؟',
    about_why1_title: 'تفكير إبداعي', about_why1_desc: 'تطوير مفاهيم بصرية فريدة تميز منتجك عن الفيديوهات الجاهزة التقليدية، مع تصميم كل حركة لتلائم جوهر مزاج العلامة التجارية.',
    about_why2_title: 'عقلية تسويقية', about_why2_desc: 'كل إطار حركي مصمم ليخدم هدفًا تسويقيًا — جذب المشاهد في أول 3 ثوانٍ، الحفاظ على التفاعل، وتحفيز دعوة واضحة لاتخاذ إجراء.',
    about_why3_title: 'جودة إنتاجية عالية', about_why3_desc: 'إضاءة سينمائية، محاكاة فيزيائية دقيقة، خطوط إنتاج عالية الدقة، ودرجات ألوان مدروسة تمنح ثقة وقيمة فورية.',
    about_why4_title: 'اهتمام بالتفاصيل', about_why4_desc: 'تخطيطات حركية دقيقة، مزامنة صوتية محكمة، وتدفق إطارات سلس لضمان أن كل جزء من الثانية في الفيديو يترك أثرًا.',

    // services.html
    svc_hero_subtitle: 'نطاق الخدمات', svc_hero_title: 'خدمات احترافية',
    svc_hero_desc: 'مجموعة متكاملة من قدرات الإنتاج وما بعد الإنتاج مصممة لرفع مستوى المنتجات وتطبيقات الموبايل وحملات العلامات التجارية إلى روايات بصرية مميزة.',
    svc1_title: 'فيديوهات إعلانية للمنتجات', svc1_desc: 'إضاءة سينمائية، حركة فيزيائية ديناميكية، وتوقيت دقيق مصمم لإبراز وظائف المنتج وجودة تصنيعه الفاخرة.',
    svc2_title: 'فيديوهات ترويجية للتطبيقات', svc2_desc: 'تحويل لوحات التحكم وشاشات التطبيقات ورحلات المستخدم إلى إعلانات حركية نشطة تزيد من عمليات التحميل.',
    svc3_title: 'أنيميشن اللوجو', svc3_desc: 'رفع مستوى هوية علامتك التجارية بنظرية حركة فاخرة، مزامنة صوتية مخصصة، وسلوكيات لوجو مميزة.',
    svc4_title: 'إعلانات السوشيال ميديا', svc4_desc: 'حملات اجتماعية عالية التفاعل (إنستجرام، تيك توك، يوتيوب) بجذب بصري قوي، تسميات توضيحية حركية، وإيقاع جذاب.',
    svc5_title: 'صور المنتجات', svc5_desc: 'نماذج بصرية ثلاثية الأبعاد فاخرة وصور واقعية للمنتج محسّنة لمتاجر التجارة الإلكترونية الفاخرة وعروض التقديم.',
    svc6_title: 'تحسين جودة الوسائط', svc6_desc: 'تحويل الصور منخفضة الدقة واللقطات الخام إلى مخرجات عالية الوضوح بدقة 4K باستخدام تقنيات الذكاء الاصطناعي، مع تثبيت الإطارات وتقليل الضوضاء للطباعة والعرض وجاهزية دور السينما.',
    svc7_title: 'تحويل نسبة العرض إلى الارتفاع', svc7_desc: 'تكييف الملفات الإعلانية الأفقية بسلاسة إلى صيغ عمودية (9:16) ومربعة دون فقدان التركيز على التفاصيل البصرية المهمة.',
    svc8_title: 'إزالة الخلفية', svc8_desc: 'استخراج المنتجات والعناصر من الخلفيات غير المرتبة، وإنتاج طبقات شفافة نظيفة للتركيب في الخطوط الزمنية الحركية.',
    svc9_title: 'توسيع الصورة', svc9_desc: 'توسيع أبعاد القماش للقوالب الأفقية لدعم اللوحات الإعلانية الكبيرة أو التنسيقات العمودية الحديثة.',
    svc10_title: 'محتوى قصير', svc10_desc: 'فيديوهات تيك توك وريلز وشورتس جذابة ومصممة لزيادة تفاعل الجمهور والمشاهدات والتحويلات الاجتماعية.',

    // portfolio.html
    pf_hero_subtitle: 'دراسات الحالة', pf_hero_title: 'أعمال مختارة',
    pf_hero_desc: 'مجموعة من مشاريع الموشن جرافيك المفاهيمية والتجارية التي تعرض روايات المنتجات، الإضاءة المخصصة، محاكاة السوائل، وتنسيقات الإعلانات السينمائية.',
    pf_filter_all: 'كل المشاريع', pf_filter_app: 'ترويج تطبيق', pf_filter_fmcg: 'إعلان تجاري', pf_filter_product: 'سينمائي للمنتج', pf_filter_brand: 'هوية بصرية',
    pf_p1_tag: 'ترويج تطبيق', pf_p1_dur: '15 ثانية', pf_p1_desc: 'طباعة حركية ومتجهات هندسية توضح الانتقال الذهني من الفوضى إلى وضوح تام في بيئة العمل.',
    pf_p2_tag: 'سينمائي للمنتج', pf_p2_dur: '15 ثانية', pf_p2_desc: 'فيلم منتج بتصوير ماكرو يعرض رذاذ السوائل، التغليف الفاخر، والهوية المصرية التراثية.',
    pf_p3_tag: 'إعلان تجاري', pf_p3_dur: '10 ثوانٍ', pf_p3_desc: 'إعلان لعصير طماطم سعودي يجمع بين العمارة التراثية الإقليمية وأنيميشن شخصية مرحة.',
    pf_p4_tag: 'فيلم هوية بصرية', pf_p4_dur: '15 ثانية', pf_p4_desc: 'هوية بصرية كاملة وفيديو سينمائي لبراند قهوة مختصة — من تصميم اللوجو والعبوة، لحركة تحكي رحلة القهوة كاملة.',

    // contact.html
    c_hero_subtitle: 'تواصل معي',
    c_hero_title_html: "لنصنع<br>شيئًا رائعًا",
    c_hero_desc: "عندك حملة أو إطلاق منتج قادم؟ ابعتلي التفاصيل عبر نموذج الاستفسار، أو ابدأ محادثة مباشرة عبر واتساب لمناقشة الستوري بورد والميزانية والجدول الزمني.",
    c_detail1_label: 'تواصل واتساب', c_detail2_label: 'البريد الإلكتروني', c_detail3_label: 'الموقع',
    c_detail3_value: 'القاهرة، مصر (خدمة عالمية)',
    c_label_name: 'الاسم الكامل', c_placeholder_name: 'مثال: محمد أحمد',
    c_label_email: 'البريد الإلكتروني', c_placeholder_email: 'مثال: name@brand.com',
    c_label_project_type: 'نوع المشروع',
    c_opt_commercial: 'إعلان منتج', c_opt_app_promo: 'فيديو ترويجي لتطبيق', c_opt_logo: 'أنيميشن لوجو',
    c_opt_social: 'حملة سوشيال ميديا', c_opt_other: 'أعمال موشن جرافيك أخرى',
    c_label_budget: 'الميزانية المتوقعة',
    c_opt_under300: 'أقل من 300$', c_opt_300_800: '300$ - 800$', c_opt_800plus: 'أكثر من 800$', c_opt_notsure: 'مش متأكد بعد — يلا نتناقش',
    c_label_message: 'تفاصيل المشروع', c_placeholder_message: 'اذكر تفاصيل المشروع، القيود الزمنية، والإلهام البصري...',
    c_btn_send: 'إرسال الطلب', c_or_connect: 'أو تواصل فورًا عبر', c_btn_whatsapp_chat: 'محادثة واتساب',

    // shared project-page timeline + sections
    tl_subtitle: 'المنهجية', tl_title: 'مراحل العملية الإبداعية',
    tl_step1_title: 'تحديد الهدف', tl_step1_desc: 'مواءمة أهداف المشروع، الأهداف التسويقية، والمعايير التقنية.',
    tl_step2_title: 'البحث', tl_step2_desc: 'تحليل المنافسين، الاتجاهات البصرية، ولغات التصميم.',
    tl_step3_title: 'الستوري بورد', tl_step3_desc: 'رسم الإطارات لتحديد تدفق السرد البصري.',
    tl_step4_title: 'التصميم', tl_step4_desc: 'إنشاء تخطيطات فيكتور، لوحات ألوان، ونماذج واجهة.',
    tl_step5_title: 'الحركة', tl_step5_desc: 'إحياء العناصر بمنحنيات حركة، إيقاع، وديناميكية.',
    tl_step6_title: 'الرندر', tl_step6_desc: 'تصدير بدقة عالية، مع إضافة ضبابية الحركة وفلاتر التوهج.',
    tl_step7_title: 'التسليم', tl_step7_desc: 'توفير الصيغ النهائية المخصصة لمنصات التواصل الاجتماعي.',
    gallery_subtitle: 'اللوحة البصرية', gallery_title: 'معرض الستوري بورد',
    final_video_subtitle: 'الناتج النهائي', final_video_title: 'الفيديو الترويجي النهائي',
    next_case_label: 'دراسة الحالة التالية', production_stack_label: 'أدوات الإنتاج', btn_view_next_case: 'دراسة الحالة التالية',
    meta_client: 'العميل', meta_duration: 'المدة', meta_style: 'الأسلوب', meta_message: 'الرسالة الرئيسية',
    project_overview_title: 'نظرة عامة على المشروع', client_brief_title: 'ملخص طلب العميل',

    // project-flow.html
    flow_hero_category: 'ترويج تطبيق', flow_hero_title: 'فلو',
    flow_client: 'فلو للإنتاجية', flow_duration: '15 ثانية', flow_style: 'حركة فائقة', flow_message: 'من الفوضى إلى الإنجاز',
    flow_overview_p1: 'فلو تطبيق إنتاجية عالي الأداء مصمم لمساعدة المحترفين المعاصرين على تنظيم المهام المعقدة، وضع الأجندات، والتخلص من الفوضى الرقمية المشتتة.',
    flow_overview_p2: 'كان هدف هذه الحملة الحركية هو عرض وظائف وواجهة التطبيق الأساسية، وترجمة الشعور بالإرهاق الرقمي إلى وضوح منظم من خلال أنظمة بصرية ديناميكية.',
    flow_brief_p1: 'يستهدف فلو المستخدمين النشطين الذين يعانون من صعوبة في التركيز الذهني، إدارة الوقت، ومتابعة المهام. طلب العميل إعلانًا حركيًا نشطًا يعكس فعالية التطبيق السريعة.',
    flow_brief_p2: 'من خلال مزج انتقالات طباعية سريعة مع نماذج فيكتور نيون متوسعة، صممنا التحول النفسي من الفوضى إلى التركيز المطلق، مبرزين تحرر المستخدم من الأعباء الإدارية.',
    flow_next_name: 'نيليا',

    // project-genie.html
    genie_hero_category: 'إعلان تجاري', genie_hero_title: 'جيني الطبيعة',
    genie_client: 'جيني الطبيعة', genie_duration: '10 ثوانٍ', genie_style: 'كلاسيكي سينمائي', genie_message: 'طعم طبيعي كل يوم',
    genie_overview_p1: 'جيني الطبيعة علامة عصير طماطم سعودية فاخرة تفخر بتقديم مكونات طبيعية 100% وطازجة من المزرعة للعائلات في المنطقة.',
    genie_overview_p2: 'كان هدف هذه الحملة تصميم أنيميشن سينمائي دافئ يمزج بين الهوية الإقليمية السعودية التقليدية وتفاعلات شخصية مرحة، لبناء طابع عائلي ودود.',
    genie_brief_p1: 'طلبت العلامة فيديو إعلاني سينمائي يضم تميمتهم الودودة على شكل طماطم. احتاجت البيئة لتعكس الجذور المعمارية الإقليمية — بإضاءة دافئة ساعة الغروب تنعكس على مباني الطين النجدية التقليدية.',
    genie_brief_p2: 'قمنا بإنشاء بيئة ثلاثية الأبعاد مخصصة وأنيميشن للتميمة وهي تتجول في شوارع القرية المشمسة، لتنتهي بمشهد صب ديناميكي يعرض محاكاة عصير طازج وواقعي.',
    genie_next_name: 'أثر',

    // project-nilea.html
    nilea_hero_category: 'سينمائي للمنتج', nilea_hero_title: 'نيليا',
    nilea_client: 'نيليا للعصائر الفاخرة', nilea_duration: '15 ثانية', nilea_style: 'فيلم منتج ماكرو', nilea_message: 'ثمار النيل',
    nilea_overview_p1: 'نيليا علامة عصير مصرية فاخرة، مستوحاة من حقول الفاكهة التاريخية في دلتا النيل. تتمحور العلامة حول التاريخ المصري القديم، النقاء العضوي، والإرث الملكي.',
    nilea_overview_p2: 'كان هدف هذا الإعلان صياغة إنتاج ماكرو فاخر للغاية يعرض تصميم العبوة، التفاصيل المذهبة الدقيقة، وتصادمات الفاكهة الديناميكية.',
    nilea_brief_p1: 'أبرزت إرشادات الحملة الرذاذ الطازج، القطرات الماكرو، الملمس الفاخر، والرموز التراثية التقليدية. احتاج العرض لأن يبدو فاخرًا للغاية ونظيفًا، بعيدًا عن الإعدادات الإعلانية التقليدية.',
    nilea_brief_p2: 'صممنا محاكاة سوائل بطيئة الحركة تتفاعل مع أسطح زجاجية، ورسمنا هيروغليفية ذهبية على هندسة الزجاجة ثلاثية الأبعاد، مع إضاءة ماكرو لإبراز دوامات العصير الطازجة وتفاصيل المنتج.',
    nilea_next_name: 'جيني الطبيعة',

    // project-athar.html
    athar_hero_category: 'فيلم هوية بصرية', athar_hero_title: 'أثر',
    athar_duration: '15 ثانية', athar_style: 'سينمائي عصري', athar_message: 'من الحبة إلى الكوباية، القهوة اللي بتترك أثر',
    athar_overview_p1: 'أثر براند قهوة مختصة بيقدّم تشكيلة من درجات التحميص (Dark / Medium / Light Roast). المشروع بدأ من الصفر — مفيش هوية بصرية جاهزة، فكانت المهمة الأولى بناء الهوية كاملة (الاسم، اللوجو، تصميم العبوة) قبل حتى التفكير في أي حركة.',
    athar_overview_p2: 'هدف الحملة كان إنتاج فيديو تعريفي بيحكي رحلة القهوة من الحبة الخام للكوباية بأسلوب سينمائي عصري، وفي نفس الوقت يوضح إن البراند بيقدم تشكيلة متنوعة مش منتج واحد بس — عشان يُستخدم كمعاينة مباشرة في التواصل مع أصحاب محلات القهوة المختصة.',
    athar_brief_p1: 'البراند احتاج حل كامل: هوية بصرية تنافس براندات القهوة المختصة في السوق الخليجي، وفيديو ترويجي يقدر يوصل جودة المنتج وحرفية التحضير من غير ما يعتمد على تصوير حقيقي أو استوديو.',
    athar_brief_p2: 'اتنفذ الحل على مرحلتين: أولًا تصميم نظام العبوة الكامل (كيس كرافت مطفي، نافذة دائرية، ألوان تميّز كل درجة تحميص) عشان يبقى قابل للتطبيق على أي منتج مستقبلي للبراند، وبعدها فيديو موشن بستايل داكن وعصري بيبدأ بانسكاب الحبوب من الكيس ويختم بعرض التشكيلة الكاملة مع الشعار — عشان يوصل رسالتين في نفس الوقت: الحرفية، والتنوع.',
    athar_next_name: 'فلو'
  },
  en: {
    // Shared chrome
    nav_home: 'Home', nav_about: 'About', nav_services: 'Services', nav_portfolio: 'Portfolio', nav_contact: 'Contact',
    footer_desc: 'Crafting cinematic motion design, commercials, promotional movies, and premium visualizations that captivate audiences worldwide.',
    footer_explore: 'Explore', footer_socials: 'Socials',
    footer_copy: '© 2026 AHMED MTN. Designed & Developed by Ahmed Ibrahim',
    footer_location: 'Based in Egypt. Available Worldwide.',
    btn_whatsapp_msg: 'WhatsApp Message', btn_whatsapp_chat: 'WhatsApp Chat',
    btn_view_case_study: 'View Case Study', btn_view_project_case: 'View Project Case',
    loader_about: 'ABOUT ME', loader_services: 'SERVICES', loader_portfolio: 'PORTFOLIO', loader_contact: 'LETS TALK',
    loader_flow: 'CASE STUDY: FLOW', loader_genie: 'CASE STUDY: GENIE', loader_nilea: 'CASE STUDY: NILEA', loader_athar: 'CASE STUDY: ATHAR',

    idx_hero_subtitle: 'Motion Designer',
    idx_hero_title_html: 'Crafting Motion<br>That Brings Products To Life',
    idx_hero_desc: 'Ahmed is a Motion Designer specialized in creating cinematic product advertisements, social media campaigns, logo animations and promotional videos that transform ideas into engaging visual experiences.',
    idx_btn_projects: 'View Projects', idx_btn_talk: "Let's Talk",
    idx_about_p1: "My name is Ahmed, and I work as a specialized motion graphics designer. I help brands transform their products into high-quality short-form video content, crafted specifically to capture customer attention and elevate the product's market image.",
    idx_about_p2: 'Recent studies show that 63% of consumers worldwide prefer watching a short video about a product before making a purchase decision.',
    idx_about_p3: "That's why I design every project to serve a clear marketing goal, not just to be a beautiful video.",
    idx_about_p4: 'My scope of work includes product videos, motion identity, advertisements, and content tailored for social media platforms, all delivered with the highest production quality.',
    idx_about_sign: '— Ahmed Ibrahim',
    idx_stat1_label: 'Case Studies', idx_stat2_label: 'Specialized Services', idx_stat3_label: 'Original Concepts',
    idx_stat4_num: 'Open', idx_stat4_label: 'For New Clients',
    idx_discover_btn: 'Discover My Journey',
    idx_services_subtitle: 'What I Do', idx_services_title: 'Creative Services tailored for Luxury Brands',
    idx_svc1_title: 'Product Commercial Videos', idx_svc1_desc: 'Cinematic lighting, high-fidelity dynamics, and stunning visual storytelling designed to elevate your premium physical goods.',
    idx_svc2_title: 'App Promo Videos', idx_svc2_desc: 'Transform complex application screens and flows into smooth, energetic kinetic journeys that drive app downloads.',
    idx_svc3_title: 'Logo Animation', idx_svc3_desc: 'Give your brand identity a striking motion personality, enhancing recall and establishing high production value.',
    idx_explore_services_btn: 'Explore All 10 Services',
    idx_portfolio_subtitle: 'Selected Work', idx_portfolio_title: 'Cinematic Case Studies',
    idx_p1_tag: 'App Promo', idx_p1_dur: '15s', idx_p1_desc: 'Visualizing the transformation from cognitive chaos to ultimate clarity through hyper motion kinetics.',
    idx_p2_tag: 'Product Cinematic', idx_p2_dur: '15s', idx_p2_desc: 'Premium Egyptian juice brand visual case study showing macro product visuals and cultural design elements.',
    idx_p3_tag: 'FMCG Commercial', idx_p3_dur: '10s', idx_p3_desc: 'Traditional Saudi tomato brand commercial featuring warm cinematic lighting and friendly mascot animations.',
    idx_seeall_btn: 'See All Projects',
    idx_cta_subtitle: "Let's Work Together", idx_cta_title: "Let's Create Something Amazing Together",

    about_hero_subtitle: 'Biography', about_hero_name: 'Ahmed Ibrahim',
    about_hero_desc: 'A senior creative designer and motion engineer specializing in crafting premium short-form commercial videos, app advertisements, and logo dynamics with a deep focus on conversion rates and brand value.',
    about_arabic_p1: "My name is Ahmed, and I work as a specialized motion graphics designer. I help brands transform their products into high-quality short-form video content, crafted specifically to capture customer attention and elevate the product's market image.",
    about_arabic_p2: 'Recent studies show that 63% of consumers worldwide prefer watching a short video about a product before making a purchase decision.',
    about_arabic_p3: "That's why I design every project to serve a clear marketing goal, not just to be a beautiful video.",
    about_arabic_p4: 'My scope of work includes product videos, motion identity, advertisements, and content tailored for social media platforms, all delivered with the highest production quality.',
    about_arabic_sign: '— Ahmed Ibrahim, Motion Designer',
    about_track_subtitle: 'Where Things Stand', about_track_title: 'Right Now',
    about_stat1_label: 'Live Case Studies', about_stat2_label: 'Services Offered', about_stat3_label: 'Tools & Software Used',
    about_stat4_label: 'Custom, No Templates', about_stat5_label: 'Average Response Time',
    about_why_subtitle: 'Advantages', about_why_title: 'Why Partner With Ahmed?',
    about_why1_title: 'Creative Thinking', about_why1_desc: 'Developing unique visual concepts that separate your product from typical stock videos, tailoring every movement to match the core mood of the brand.',
    about_why2_title: 'Marketing Mindset', about_why2_desc: 'Every dynamic frame is engineered to serve a marketing goal—hooking viewers in the first 3 seconds, sustaining engagement, and prompting clear calls to action.',
    about_why3_title: 'Premium Quality', about_why3_desc: 'Cinema-grade lighting, precise physics simulation, high fidelity render pipelines, and curated color grades that command immediate trust and value.',
    about_why4_title: 'Attention To Detail', about_why4_desc: 'Pixel-perfect kinetic layouts, precise sound design syncing, and ultra-smooth frame pacing to ensure every millisecond of video delivers maximum punch.',

    svc_hero_subtitle: 'Scope of Capabilities', svc_hero_title: 'Professional Services',
    svc_hero_desc: 'A comprehensive suite of production and post-production capabilities tailored to elevate products, mobile apps, and brand campaigns into premium visual narratives.',
    svc1_title: 'Product Commercial Videos', svc1_desc: 'Cinema-grade lighting, dynamic physical animations, and precise timing designed to showcase product functions and premium builds.',
    svc2_title: 'App Promo Videos', svc2_desc: 'Converting application dashboards, screen mockups, and mobile user journeys into energetic kinetic promotions that drive installs.',
    svc3_title: 'Logo Animation', svc3_desc: 'Elevating brand identities with premium motion theory, custom sound alignment, and distinctive logo behaviors.',
    svc4_title: 'Social Media Ads', svc4_desc: 'High-retention social campaigns (Instagram, TikTok, YouTube) featuring strong visual hooks, kinetic captions, and punchy rhythms.',
    svc5_title: 'Product Images', svc5_desc: 'Premium 3D visual mockups and photorealistic product renders optimized for luxury eCommerce stores and presentation decks.',
    svc6_title: 'Media Upscaling', svc6_desc: 'Transforming low-res images and raw footage into crisp, high-fidelity 4K output using AI super-resolution, frame stabilization, and noise reduction for prints, displays, and cinema-ready delivery.',
    svc7_title: 'Aspect Ratio Conversion', svc7_desc: 'Adapting horizontal commercial files smoothly to portrait (9:16) and square formats without losing focus of key visual details.',
    svc8_title: 'Background Removal', svc8_desc: 'Extracting products and subjects from messy backdrops, generating clean transparency layers for composite motion timelines.',
    svc9_title: 'Image Outpainting', svc9_desc: 'Extending canvas dimensions of landscape templates to support large billboards or modern vertical layout configurations.',
    svc10_title: 'Short Form Content', svc10_desc: 'Punchy, highly engaging TikToks, Reels, and Shorts designed to increase audience engagement, views, and social conversions.',

    pf_hero_subtitle: 'Case Studies', pf_hero_title: 'Selected Work',
    pf_hero_desc: 'A collection of conceptual and commercial motion design projects showcasing product narratives, custom lighting, fluid simulations, and cinematic advertising layouts.',
    pf_filter_all: 'All Projects', pf_filter_app: 'App Promo', pf_filter_fmcg: 'FMCG Commercial', pf_filter_product: 'Product Cinematic', pf_filter_brand: 'Brand Identity',
    pf_p1_tag: 'App Promo', pf_p1_dur: '15 Seconds', pf_p1_desc: 'Kinetic typography and geometric vectors illustrating cognitive transition from chaos into extreme workspace clarity.',
    pf_p2_tag: 'Product Cinematic', pf_p2_dur: '15 Seconds', pf_p2_desc: 'Macro cinematography product film showcasing fluid splashes, luxury packaging and ancestral Egyptian heritage branding.',
    pf_p3_tag: 'FMCG Commercial', pf_p3_dur: '10 Seconds', pf_p3_desc: 'Saudi tomato juice commercial combining traditional regional heritage architecture with playful character animation and mascot dynamics.',
    pf_p4_tag: 'Brand Identity Film', pf_p4_dur: '15 Seconds', pf_p4_desc: 'Complete visual identity and cinematic video for a specialty coffee brand — from logo and packaging design to motion that tells the full coffee journey.',

    c_hero_subtitle: 'Get In Touch',
    c_hero_title_html: "Let's Create<br>Something Amazing",
    c_hero_desc: "Have an upcoming campaign or product launch? Drop a line through the project inquiry form, or launch a direct chat via WhatsApp to discuss storyboards, budgets and schedules.",
    c_detail1_label: 'WhatsApp Contact', c_detail2_label: 'Studio Email', c_detail3_label: 'Location',
    c_detail3_value: 'Cairo, Egypt (Global Service)',
    c_label_name: 'Your Name', c_placeholder_name: 'e.g. John Doe',
    c_label_email: 'Email Address', c_placeholder_email: 'e.g. john@brand.com',
    c_label_project_type: 'Project Type',
    c_opt_commercial: 'Product Commercial', c_opt_app_promo: 'App Promo Video', c_opt_logo: 'Logo Animation',
    c_opt_social: 'Social Media Campaign', c_opt_other: 'Other Motion Graphics',
    c_label_budget: 'Estimated Budget',
    c_opt_under300: 'Under $300', c_opt_300_800: '$300 - $800', c_opt_800plus: '$800+', c_opt_notsure: "Not Sure Yet — Let's Discuss",
    c_label_message: 'Project Description', c_placeholder_message: 'Outline project details, timeline constraints and visual inspiration...',
    c_btn_send: 'Send Inquiry', c_or_connect: 'or connect instantly via', c_btn_whatsapp_chat: 'WhatsApp Chat',

    tl_subtitle: 'Methodology', tl_title: 'Creative Process Timeline',
    tl_step1_title: 'Brief', tl_step1_desc: 'Aligning project goals, marketing aims and technical benchmarks.',
    tl_step2_title: 'Research', tl_step2_desc: 'Analyzing competitors, visual trends, and design languages.',
    tl_step3_title: 'Storyboard', tl_step3_desc: 'Sketching frames to define the visual narrative flow.',
    tl_step4_title: 'Design', tl_step4_desc: 'Creating vector layouts, color palettes, and UI models.',
    tl_step5_title: 'Animation', tl_step5_desc: 'Bringing assets to life with curves, pacing and dynamics.',
    tl_step6_title: 'Rendering', tl_step6_desc: 'Exporting in high resolutions, adding motion blur & glow filters.',
    tl_step7_title: 'Delivery', tl_step7_desc: 'Providing final formats tailored to social platforms.',
    gallery_subtitle: 'Visual Board', gallery_title: 'Storyboard Gallery',
    final_video_subtitle: 'Output', final_video_title: 'Final Promotional Video',
    next_case_label: 'Next Case Study', production_stack_label: 'Production Stack', btn_view_next_case: 'View Next Case',
    meta_client: 'Client', meta_duration: 'Duration', meta_style: 'Style', meta_message: 'Main Message',
    project_overview_title: 'Project Overview', client_brief_title: 'Client Brief',

    flow_hero_category: 'App Promo', flow_hero_title: 'FLOW',
    flow_client: 'Flow Productivity', flow_duration: '15 Seconds', flow_style: 'Hyper Motion', flow_message: 'From Chaos To Achievement',
    flow_overview_p1: 'Flow is a high-performance productivity application designed to help modern professionals organize complex tasks, outline agendas, and eliminate distracting digital clutter.',
    flow_overview_p2: "The goal of this motion campaign was to showcase the core application functionality and interface, translating the feeling of digital overload into organized workspace clarity through dynamic visual systems.",
    flow_brief_p1: 'Flow targets active users who struggle with cognitive focus, time management, and tasks tracking. The brief requested an energetic kinetic motion advertisement that mirrors the app\'s snappy utility.',
    flow_brief_p2: "By blending fast typographic transitions with expanding neon vector models, we animated the psychological shift from chaos to absolute focus, highlighting the user's release from administrative friction.",
    flow_next_name: 'Nilea',

    genie_hero_category: 'FMCG Commercial', genie_hero_title: 'Genie Al Tabiah',
    genie_client: 'Genie Al Tabiah', genie_duration: '10 Seconds', genie_style: 'Cinematic Classic', genie_message: 'Natural Taste Every Day',
    genie_overview_p1: 'Genie Al Tabiah is a premium Saudi tomato juice brand that prides itself on delivering 100% natural, farm-fresh ingredients to families across the region.',
    genie_overview_p2: 'The goal of this campaign was to design a warm, cinematic animation that merges traditional Saudi regional identity with playful character interactions, establishing a family-friendly aesthetic.',
    genie_brief_p1: 'The brand required a cinematic video commercial featuring their friendly tomato mascot. The environment needed to reflect regional architectural roots—capturing warm, golden hour lighting falling across traditional Najdi clay mudbrick structures.',
    genie_brief_p2: 'We created a custom 3D environment and animated the mascot navigating through the sunny village streets, culminating in a dynamic pouring scene showcasing fresh, photorealistic juice simulation.',
    genie_next_name: 'Athar',

    nilea_hero_category: 'Product Cinematic', nilea_hero_title: 'Nilea',
    nilea_client: 'Nilea Premium Juices', nilea_duration: '15 Seconds', nilea_style: 'Macro Product Film', nilea_message: 'Fruits Of The Nile',
    nilea_overview_p1: 'Nilea is a luxury Egyptian juice brand, inspired by the historical fruit fields of the Nile delta. The brand centers around ancient Egyptian history, organic freshness, and royal heritage.',
    nilea_overview_p2: 'The goal of this commercial was to formulate a highly luxurious, macro cinematic production showcasing the package design, intricate gold-engraved details, and dynamic fruit collisions.',
    nilea_brief_p1: 'The campaign guidelines highlighted fresh splashes, macro droplets, premium textures, and traditional heritage iconography. The presentation needed to look extremely prestigious and clean, avoiding generic commercial setups.',
    nilea_brief_p2: 'We designed slow-motion liquid simulations reacting to glass surfaces, mapping gold hieroglyphs onto 3D bottle geometry, and using macro lighting to highlight fresh juice swirls and product facets.',
    nilea_next_name: 'Genie Al Tabiah',

    athar_hero_category: 'Brand Identity Film', athar_hero_title: 'ATHAR',
    athar_duration: '15 Seconds', athar_style: 'Modern Cinematic', athar_message: 'From Bean To Cup, Coffee That Leaves A Mark',
    athar_overview_p1: 'ATHAR is a specialty coffee brand offering a range of roast profiles (Dark, Medium, and Light Roast). The project started from zero — there was no existing visual identity, so the first task was building the complete brand identity (name, logo, and packaging design) before even thinking about motion.',
    athar_overview_p2: 'The goal of the campaign was to produce an introductory video narrating the coffee\'s journey from raw bean to cup in a modern cinematic style, while also showcasing that the brand offers a diverse roast range rather than a single product — designed to serve as a direct preview when reaching out to specialty coffee shop owners.',
    athar_brief_p1: 'The brand needed a complete end-to-end solution: a visual identity that competes with specialty coffee brands in the Gulf market, and a promotional video that could convey product quality and preparation craftsmanship without relying on real-world filming or a physical studio.',
    athar_brief_p2: 'The solution was executed in two phases: first, designing a complete packaging system (matte kraft pouch, circular window, and colors distinguishing each roast level) so it could scale to any future product from the brand, followed by a dark, modern-style motion video that opens with beans pouring from the pouch and closes on the full roast range alongside the logo — delivering two messages at once: craftsmanship and variety.',
    athar_next_name: 'Flow'
  }
};

// 9.7 Language Toggle (EN / AR with RTL support)
function initLanguageToggle() {
  const toggleBtns = document.querySelectorAll('.lang-toggle');
  if (!toggleBtns.length) return;

  const root = document.documentElement;

  const applyLang = (lang) => {
    const dict = translations[lang];
    if (!dict) return;

    root.setAttribute('lang', lang);
    if (lang === 'ar') {
      root.setAttribute('dir', 'rtl');
    } else {
      root.setAttribute('dir', 'ltr');
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key] !== undefined) el.setAttribute('placeholder', dict[key]);
    });

    document.querySelectorAll('.lang-toggle .lang-label').forEach(el => {
      el.textContent = lang === 'ar' ? 'EN' : 'AR';
    });
  };

  let currentLang = root.getAttribute('lang') === 'ar' ? 'ar' : 'en';
  applyLang(currentLang); // sync labels + dir even if EN, and honor no-flash script result

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = currentLang === 'ar' ? 'en' : 'ar';
      applyLang(currentLang);
      try {
        localStorage.setItem('lang', currentLang);
      } catch (e) {
        // localStorage unavailable, language just won't persist across reloads
      }
    });
  });
}

// 1. Page Preloader
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 600); // Small grace period for visual load
    });
  }
}

// 2. Sticky Navigation Header
function initStickyHeader() {
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
}

// 3. Mobile Navigation Menu
function initMobileNav() {
  const menuBtn = document.querySelector('.menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const body = document.body;

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      mobileNav.classList.toggle('active');
      
      if (mobileNav.classList.contains('active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
    });

    // Close mobile nav when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileNav.classList.remove('active');
        body.style.overflow = '';
      });
    });
  }
}

// 4. Custom Cursor with Lerp Smoothing
function initCustomCursor() {
  const dot = document.createElement('div');
  const ring = document.createElement('div');
  
  dot.className = 'custom-cursor-dot';
  ring.className = 'custom-cursor-ring';
  
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = 0, mouseY = 0; // Current mouse coords
  let ringX = 0, ringY = 0;   // Lerped ring coords
  
  const speed = 0.15; // Speed multiplier for lag-behind feeling

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Set variables on document for mouse-interactive grids and gradients
    document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);
    
    // Position dot instantly
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
  });

  // Lerp loop for the cursor ring
  function animateRing() {
    ringX += (mouseX - ringX) * speed;
    ringY += (mouseY - ringY) * speed;
    
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Add hover effects for buttons, links and select cards
  const interactiveSelector = 'a, button, .filter-btn, .project-card, .glass-card, [data-lightbox]';
  
  document.body.addEventListener('mouseenter', (e) => {
    if (e.target.matches && e.target.matches(interactiveSelector)) {
      document.body.classList.add('hover-link');
    }
  }, true);

  document.body.addEventListener('mouseleave', (e) => {
    if (e.target.matches && e.target.matches(interactiveSelector)) {
      document.body.classList.remove('hover-link');
      document.body.classList.remove('hover-view'); // Clean up any lingering lightbox hover
    }
  }, true);

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });

  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
}

// 5. Magnetic Button / Link Interaction
function initMagneticElements() {
  const magnetics = document.querySelectorAll('.magnetic');
  
  if (window.innerWidth > 1024) { // Only enable on desktop
    magnetics.forEach(elem => {
      elem.addEventListener('mousemove', function(e) {
        const bound = elem.getBoundingClientRect();
        
        // Calculate relative mouse position inside the element bounds
        const x = e.clientX - bound.left - (bound.width / 2);
        const y = e.clientY - bound.top - (bound.height / 2);
        
        // Pull strength (adjustable)
        const strength = 18;
        
        elem.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
        // Slightly pull text or inner icon
        const child = elem.querySelector('.btn-icon, .magnetic-inner');
        if (child) {
          child.style.transform = `translate(${x / (strength * 0.5)}px, ${y / (strength * 0.5)}px)`;
        }
      });

      elem.addEventListener('mouseleave', function() {
        elem.style.transform = 'translate(0px, 0px)';
        const child = elem.querySelector('.btn-icon, .magnetic-inner');
        if (child) {
          child.style.transform = 'translate(0px, 0px)';
        }
      });
    });
  }
}

// 6. Scroll Trigger Reveals using Intersection Observer
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
  
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve once revealed to keep layout performant
        observer.unobserve(entry.target);
      }
    });
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Reveal when 15% of target is visible
  };

  const observer = new IntersectionObserver(revealCallback, observerOptions);

  reveals.forEach(element => {
    observer.observe(element);
  });
}

// 7. Back To Top with Circular Scroll Progress
function initBackToTop() {
  const progressWrap = document.querySelector('.scroll-progress-wrap');
  const progressPath = document.querySelector('.scroll-progress-wrap path');
  
  if (progressWrap && progressPath) {
    const pathLength = progressPath.getTotalLength();
    
    // Set up SVG circle dashes
    progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
    progressPath.style.strokeDashoffset = pathLength;
    
    // Function to calculate and update stroke progress
    const updateProgress = () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPos = window.scrollY;
      
      if (scrollPos > 150) {
        progressWrap.classList.add('active');
      } else {
        progressWrap.classList.remove('active');
      }
      
      if (scrollTotal > 0) {
        const offset = pathLength - (scrollPos * pathLength / scrollTotal);
        progressPath.style.strokeDashoffset = offset;
      }
    };
    
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Run once in case page loads down scrolled
    
    progressWrap.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// 8. Auto-Play Video Previews on Hover
function initHoverVideoPreviews() {
  const videoCards = document.querySelectorAll('.project-video-wrapper');
  
  videoCards.forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;
    
    card.addEventListener('mouseenter', () => {
      video.play().catch(error => {
        console.log("Muted video autoplay blocked: ", error);
      });
    });
    
    card.addEventListener('mouseleave', () => {
      video.pause();
      // Reset play time so it starts from beginning on next hover
      video.currentTime = 0;
    });
  });
}

// 9.5 Dark / Light Mode Toggle
function initThemeToggle() {
  const toggleBtns = document.querySelectorAll('.theme-toggle:not(.lang-toggle)');
  if (!toggleBtns.length) return;

  const root = document.documentElement;

  const applyTheme = (theme) => {
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
  };

  // Sync with whatever the no-flash inline script already applied
  let currentTheme = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(currentTheme);
      try {
        localStorage.setItem('theme', currentTheme);
      } catch (e) {
        // localStorage unavailable, theme just won't persist across reloads
      }
    });
  });
}

// 9.6 Project Inquiry Form (Netlify Forms with mailto fallback)
function initContactForm() {
  const form = document.getElementById('project-inquiry-form');
  if (!form) return;

  const statusBox = document.getElementById('form-status');
  const submitBtn = form.querySelector('button[type="submit"]');
  const notifyEmail = 'ahmedibrahim.ai67578@gmail.com';

  const encodeForm = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  };

  const showStatus = (message, isError) => {
    if (!statusBox) return;
    statusBox.textContent = message;
    statusBox.style.display = 'block';
    statusBox.classList.remove('form-status-success', 'form-status-error');
    statusBox.classList.add(isError ? 'form-status-error' : 'form-status-success');
  };

  const openMailtoFallback = (fields) => {
    const subject = encodeURIComponent('New Project Inquiry from ' + (fields.name || 'Website Visitor'));
    const body = encodeURIComponent(
      'Name: ' + (fields.name || '') + '\n' +
      'Email: ' + (fields.email || '') + '\n' +
      'Project Type: ' + (fields['project-type'] || '') + '\n' +
      'Estimated Budget: ' + (fields.budget || '') + '\n\n' +
      'Project Description:\n' + (fields.message || '')
    );
    window.location.href = 'mailto:' + notifyEmail + '?subject=' + subject + '&body=' + body;
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Honeypot: if filled, silently drop (bot submission)
    const honeypot = form.querySelector('input[name="bot-field"]');
    if (honeypot && honeypot.value) return;

    const formData = new FormData(form);
    const fields = {};
    formData.forEach((value, key) => { fields[key] = value; });

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
    }

    fetch(window.location.pathname, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encodeForm(fields)
    })
      .then((response) => {
        if (response.ok) {
          showStatus("Thanks! Your message is on its way — I'll get back to you soon.", false);
          form.reset();
        } else {
          throw new Error('Form endpoint unavailable on this host');
        }
      })
      .catch(() => {
        // Static hosts without form processing (e.g. GitHub Pages) fall back to opening the email app
        showStatus('Opening your email app to send this directly to ' + notifyEmail + '...', false);
        openMailtoFallback(fields);
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Inquiry';
        }
      });
  });
}

// 9. Portfolio Filter Logic
function initPortfolioFilters() {
  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-grid .project-card');
  
  if (filters.length > 0 && cards.length > 0) {
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        // Toggle active button
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        
        const category = filter.getAttribute('data-filter');
        
        cards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 400); // Match CSS transition timing
          }
        });
      });
    });
  }
}
