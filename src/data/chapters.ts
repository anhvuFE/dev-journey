// ============================================================
//  DỮ LIỆU CỐT TRUYỆN — 7 chương hành trình code
//  Mỗi chương = 1 category, 1 theme riêng.
//  Repo của khách/công ty đã được ẩn danh (privacy: "client").
//  Giọng văn: ngôi thứ nhất, đời thường. Chỗ (…) là gợi ý để
//  Xuan Anh tự thêm kỷ niệm thật cho tự nhiên hơn.
// ============================================================

export type Privacy = "personal" | "client";

export interface Localized {
  vi: string;
  en: string;
}

export interface RepoItem {
  /** tên hiển thị (đã ẩn danh nếu là repo khách) */
  name: string;
  privacy: Privacy;
  stack: string[];
  commits?: number;
  blurb: Localized;
}

export interface Lesson {
  title: Localized;
  body: Localized;
}

export interface ChapterTheme {
  /** dùng cho data-theme trong CSS + màu accent cho 3D/badge */
  key: string;
  accent: string; // hex, dùng cho 3D và điểm nhấn
  glow: string;
  mood: Localized;
}

export interface Chapter {
  id: string;
  order: number;
  title: Localized;
  tagline: Localized;
  theme: ChapterTheme;
  story: { vi: string[]; en: string[] };
  lessons: Lesson[];
  repos: RepoItem[];
}

export const chapters: Chapter[] = [
  {
    id: "first-lines",
    order: 1,
    title: { vi: "Những dòng code đầu tiên", en: "The First Lines of Code" },
    tagline: {
      vi: "Khi <div> còn là phép màu",
      en: "When <div> still felt like magic",
    },
    theme: {
      key: "first-lines",
      accent: "#c98a3c",
      glow: "#e8c07d",
      mood: { vi: "Hoài niệm, giấy cũ", en: "Nostalgic, old paper" },
    },
    story: {
      vi: [
        "Mình bắt đầu chẳng có gì ngoài một file index.html và sự tò mò. Copy code từ W3Schools, đổi vài chữ, F5, rồi trố mắt khi thấy trang web hiện ra thật.",
        "Chưa biết Git là gì. Backup bằng cách… copy cả folder ra đặt tên 'final', rồi 'final2', rồi 'final_that_su'. (Ai cũng từng qua giai đoạn này đúng không?)",
        "Mấy trang tĩnh này trông ngây ngô, nhưng chính chúng dạy mình HTML dựng khung, CSS làm đẹp, và cảm giác 'mình vừa tạo ra một thứ gì đó' — thứ khiến mình dính lấy nghề này.",
      ],
      en: [
        "I started with nothing but an index.html and pure curiosity. I copied snippets from W3Schools, changed a few words, hit refresh, and stared as a real webpage appeared.",
        "I had no idea what Git was. My backup strategy was duplicating the whole folder as 'final', then 'final2', then 'final_for_real'.",
        "These static pages look naive now, but they taught me structure with HTML, style with CSS, and that addictive feeling of having made something.",
      ],
    },
    lessons: [
      {
        title: {
          vi: "Đừng chờ 'đủ giỏi' mới bắt đầu",
          en: "Don't wait until you're 'good enough'",
        },
        body: {
          vi: "Trang web xấu nhưng chạy được vẫn hơn trang hoàn hảo trong đầu. Cứ làm, cứ F5, cứ sai.",
          en: "An ugly page that runs beats a perfect page in your head. Just build, refresh, break things.",
        },
      },
      {
        title: {
          vi: "Học Git càng sớm càng đỡ khổ",
          en: "Learn Git sooner, suffer less",
        },
        body: {
          vi: "Mình mất khá lâu mới bỏ được thói quen 'folder final2'. Giá mà biết `git init` từ ngày đầu.",
          en: "It took me too long to drop the 'final2 folder' habit. I wish I'd run `git init` on day one.",
        },
      },
    ],
    repos: [
      { name: "bookstore", privacy: "personal", stack: ["HTML", "CSS"], blurb: { vi: "Trang nhà sách tĩnh — bài tập vỡ lòng.", en: "A static bookstore — my ABC exercise." } },
      { name: "coffeeshop", privacy: "personal", stack: ["CSS"], blurb: { vi: "Landing quán cà phê, tập layout.", en: "A coffee shop landing to practice layout." } },
      { name: "backroads-app", privacy: "personal", stack: ["CSS"], blurb: { vi: "Làm theo course, học cách chia section.", en: "A course clone to learn sectioning." } },
      { name: "W3_BAND", privacy: "personal", stack: ["CSS"], blurb: { vi: "Trang ban nhạc — nghịch typography.", en: "A band page — playing with typography." } },
    ],
  },
  {
    id: "enter-react",
    order: 2,
    title: { vi: "Bước vào React & TypeScript", en: "Entering React & TypeScript" },
    tagline: {
      vi: "Component, state, và cơn đau useEffect đầu tiên",
      en: "Components, state, and the first useEffect headache",
    },
    theme: {
      key: "enter-react",
      accent: "#22d3ee",
      glow: "#a855f7",
      mood: { vi: "Neon, hiện đại", en: "Neon, modern" },
    },
    story: {
      vi: [
        "Lần đầu gặp JSX mình đã nghĩ 'sao lại nhét HTML vào JavaScript?'. Rồi mình hiểu ra sức mạnh của component: viết một lần, dùng khắp nơi.",
        "useState thì dễ thương, nhưng useEffect thì… là cả một hành trình. Vòng lặp vô tận, dependency array thiếu, re-render không kiểm soát. Mình debug tới 2h sáng chỉ vì quên một biến trong array.",
        "Đây cũng là lúc mình gặp TypeScript và Vite + Tailwind. Ban đầu ghét TypeScript vì 'lắm lỗi đỏ', sau mới biết nó cứu mình khỏi cả tá bug lúc nửa đêm.",
      ],
      en: [
        "The first time I saw JSX I thought, 'why put HTML inside JavaScript?'. Then components clicked: write once, reuse everywhere.",
        "useState felt friendly; useEffect was a whole journey. Infinite loops, missing deps, uncontrolled re-renders. I debugged until 2am over one missing variable.",
        "This is also where TypeScript, Vite and Tailwind entered. I hated TS at first for all the 'red squiggles' — later I learned it saved me from countless midnight bugs.",
      ],
    },
    lessons: [
      {
        title: { vi: "Nghĩ theo component", en: "Think in components" },
        body: {
          vi: "Chia UI thành mảnh nhỏ tái dùng được. Một component nên làm tốt đúng một việc.",
          en: "Break the UI into small reusable pieces. A component should do one thing well.",
        },
      },
      {
        title: { vi: "TypeScript là bạn, không phải thù", en: "TypeScript is a friend, not a foe" },
        body: {
          vi: "Lỗi đỏ lúc code còn hơn lỗi trắng lúc production. Cứ để nó la mình sớm.",
          en: "A red error while coding beats a white screen in production. Let it yell early.",
        },
      },
    ],
    repos: [
      { name: "portfolio", privacy: "personal", stack: ["React", "TypeScript"], commits: 51, blurb: { vi: "Portfolio cá nhân, nơi mình thử mọi ý tưởng mới.", en: "My personal portfolio — a playground for new ideas." } },
      { name: "vubach_Auto", privacy: "personal", stack: ["React", "Vite", "TS"], commits: 5, blurb: { vi: "Trang giới thiệu gara ô tô.", en: "A landing site for a car garage." } },
      { name: "xanh-learn", privacy: "personal", stack: ["React", "Vite"], commits: 46, blurb: { vi: "Sân chơi để mình học đủ thứ front-end.", en: "A sandbox to learn all things front-end." } },
    ],
  },
  {
    id: "fullstack",
    order: 3,
    title: { vi: "Full-stack thực chiến", en: "Real-World Full-Stack" },
    tagline: {
      vi: "Database, auth, deploy — và deadline",
      en: "Database, auth, deploy — and deadlines",
    },
    theme: {
      key: "fullstack",
      accent: "#34d399",
      glow: "#10b981",
      mood: { vi: "Terminal, dark pro", en: "Terminal, dark pro" },
    },
    story: {
      vi: [
        "Front-end đẹp mấy cũng vô nghĩa nếu không có dữ liệu thật. Mình bắt đầu viết backend với Node/NestJS, dựng database, làm auth, rồi deploy lên server thật cho người thật dùng.",
        "Đây là lúc mình học Git một cách nghiêm túc: branch, pull request, code review, giải quyết conflict. Lần đầu làm hỏng branch chính mình toát mồ hôi hột.",
        "Có những dự án là của khách hàng thật (mình xin phép ẩn tên). Áp lực khác hẳn bài tập: dữ liệu thật, tiền thật, và bug production lúc 11h đêm là có thật.",
      ],
      en: [
        "A pretty front-end means nothing without real data. I started writing backends with Node/NestJS, set up databases, built auth, and deployed to real servers for real users.",
        "This is where I learned Git seriously: branches, pull requests, code review, resolving conflicts. The first time I broke the main branch, I broke into a cold sweat.",
        "Some projects were for real clients (names anonymized on purpose). The pressure is nothing like homework: real data, real money, real 11pm production bugs.",
      ],
    },
    lessons: [
      {
        title: { vi: "Bảo mật không phải là 'để sau'", en: "Security is not a 'later' task" },
        body: {
          vi: "Không hardcode secret, không commit .env, validate mọi input. Mình học điều này bằng vài phen hú vía.",
          en: "No hardcoded secrets, never commit .env, validate every input. I learned this the scary way.",
        },
      },
      {
        title: { vi: "PR nhỏ, review kỹ", en: "Small PRs, careful reviews" },
        body: {
          vi: "PR 2000 dòng không ai review nổi. Chia nhỏ, atomic, dễ đọc — cả nhóm biết ơn bạn.",
          en: "Nobody can review a 2000-line PR. Keep them small and atomic — your team will thank you.",
        },
      },
    ],
    repos: [
      { name: "LCMS_v2", privacy: "personal", stack: ["React", "Tailwind", "NestJS"], commits: 463, blurb: { vi: "Hệ thống quản lý học tập — dự án lớn nhất tự làm, 463 commit.", en: "A learning management system — my biggest solo build, 463 commits." } },
      { name: "Ecocau", privacy: "personal", stack: ["React", "Tailwind", "Go"], commits: 137, blurb: { vi: "Sản phẩm eco, front-end React + backend Go.", en: "An eco product, React front-end + Go backend." } },
      { name: "Homestay (khách hàng)", privacy: "client", stack: ["React", "Tailwind"], commits: 143, blurb: { vi: "Website đặt phòng homestay cho khách thật — đã ẩn brand.", en: "A homestay booking site for a real client — brand hidden." } },
      { name: "Kiosk bán hàng (công ty)", privacy: "client", stack: ["React", "Vite", "TS"], commits: 465, blurb: { vi: "Hệ thống kiosk thương mại — dự án công ty, ẩn danh.", en: "A commercial kiosk system — company project, anonymized." } },
    ],
  },
  {
    id: "mobile",
    order: 4,
    title: { vi: "Chạm vào Mobile & đa nền tảng", en: "Going Mobile & Cross-Platform" },
    tagline: {
      vi: "Khi app chạy trên điện thoại thật lần đầu",
      en: "When the app first ran on a real phone",
    },
    theme: {
      key: "mobile",
      accent: "#60a5fa",
      glow: "#818cf8",
      mood: { vi: "Glass, iOS", en: "Glass, iOS" },
    },
    story: {
      vi: [
        "React Native mở ra một thế giới khác: cùng tư duy React nhưng chạy trên iOS/Android. Lần đầu build lên điện thoại thật, mình cầm máy mà cười một mình.",
        "Rồi mới thấm: mobile không phải web thu nhỏ. Gesture, safe area, permission, hiệu năng list dài — mỗi thứ là một bài học.",
      ],
      en: [
        "React Native opened another world: the same React mindset, running on iOS/Android. The first time I built to a real phone, I grinned at the screen alone.",
        "Then it sank in: mobile isn't a shrunken website. Gestures, safe areas, permissions, long-list performance — each was its own lesson.",
      ],
    },
    lessons: [
      {
        title: { vi: "Nền tảng nào cũng có luật riêng", en: "Every platform has its own rules" },
        body: {
          vi: "Đừng bê nguyên tư duy web sang mobile. Học đúng pattern của từng nền tảng.",
          en: "Don't drag web habits into mobile. Learn each platform's real patterns.",
        },
      },
    ],
    repos: [
      { name: "learn_react_native", privacy: "personal", stack: ["React Native", "Expo"], blurb: { vi: "Nơi mình tập tành RN từ số 0.", en: "Where I learned RN from zero." } },
      { name: "todo-rn", privacy: "personal", stack: ["React Native"], commits: 16, blurb: { vi: "App todo — 'hello world' của mobile.", en: "A todo app — the 'hello world' of mobile." } },
      { name: "App dịch vụ sửa chữa (khách hàng)", privacy: "client", stack: ["React", "Capacitor"], commits: 3876, blurb: { vi: "App đa nền tảng quy mô lớn mình đồng tác giả — đã ẩn danh.", en: "A large cross-platform app I co-authored — anonymized." } },
    ],
  },
  {
    id: "out-of-comfort",
    order: 5,
    title: { vi: "Ra khỏi vùng an toàn", en: "Out of the Comfort Zone" },
    tagline: {
      vi: "Game, Java, Go — khi JavaScript không còn là tất cả",
      en: "Games, Java, Go — when JavaScript isn't everything",
    },
    theme: {
      key: "out-of-comfort",
      accent: "#f472b6",
      glow: "#fb7185",
      mood: { vi: "Pixel, arcade retro", en: "Pixel, retro arcade" },
    },
    story: {
      vi: [
        "Chỉ biết web thì dễ thành 'thợ một nghề'. Mình cố tình bước ra: làm game với C#/Unity, học Java hướng đối tượng, viết tool bằng Go.",
        "Mỗi ngôn ngữ ép mình nghĩ khác đi. Game dạy mình về game loop và state machine; Go dạy sự tối giản; Java dạy kỷ luật kiểu dữ liệu. Về lại JavaScript, mình code 'chín' hơn hẳn.",
      ],
      en: [
        "Knowing only the web risks becoming a one-trick dev. I deliberately stepped out: games in C#/Unity, object-oriented Java, tooling in Go.",
        "Each language forced a new way of thinking. Games taught me the game loop and state machines; Go taught minimalism; Java taught type discipline. Back in JS, I wrote far more maturely.",
      ],
    },
    lessons: [
      {
        title: { vi: "Học ngôn ngữ thứ 2, 3 để hiểu ngôn ngữ thứ 1", en: "Learn a 2nd/3rd language to understand your 1st" },
        body: {
          vi: "Ý tưởng hay từ ngôn ngữ này thường soi sáng ngôn ngữ khác.",
          en: "Good ideas from one language often illuminate another.",
        },
      },
    ],
    repos: [
      { name: "gamePRU", privacy: "personal", stack: ["C#", "Unity"], blurb: { vi: "Game 2D đầu tay bằng Unity.", en: "My first 2D game in Unity." } },
      { name: "tilevania", privacy: "personal", stack: ["Unity"], blurb: { vi: "Platformer theo course Unity.", en: "A platformer from a Unity course." } },
      { name: "Thriftly", privacy: "personal", stack: ["Java"], blurb: { vi: "Đồ án Java — luyện OOP.", en: "A Java project — practicing OOP." } },
      { name: "figma-mcp (Go)", privacy: "client", stack: ["Go"], commits: 25, blurb: { vi: "MCP server viết bằng Go — dự án nhóm, ẩn danh.", en: "An MCP server in Go — team project, anonymized." } },
    ],
  },
  {
    id: "ecommerce",
    order: 6,
    title: { vi: "Thế giới E-commerce & Shopify", en: "The E-commerce & Shopify World" },
    tagline: {
      vi: "Code cho tiền thật chạy qua",
      en: "Writing code that real money flows through",
    },
    theme: {
      key: "ecommerce",
      accent: "#fbbf24",
      glow: "#fb923c",
      mood: { vi: "Gradient vàng-cam, sang", en: "Gold-orange gradient, premium" },
    },
    story: {
      vi: [
        "E-commerce là nơi code gặp kinh doanh. Mình làm app Shopify với Prisma/Remix: giỏ hàng, thanh toán, webhook đơn hàng, tích hợp bên thứ 3.",
        "Ở đây một bug không chỉ là xấu UI — nó có thể là tiền. Mình học cách viết cẩn thận hơn, log kỹ hơn, và test kịch bản thất bại chứ không chỉ 'happy path'.",
      ],
      en: [
        "E-commerce is where code meets business. I built Shopify apps with Prisma/Remix: carts, checkout, order webhooks, third-party integrations.",
        "Here a bug isn't just ugly UI — it can be money. I learned to write more carefully, log more thoroughly, and test failure paths, not just the happy path.",
      ],
    },
    lessons: [
      {
        title: { vi: "Test cả đường thất bại", en: "Test the failure paths too" },
        body: {
          vi: "Thanh toán lỗi, webhook trễ, mạng rớt — người dùng thật sẽ gặp hết. Chuẩn bị trước.",
          en: "Failed payments, late webhooks, dropped networks — real users hit them all. Prepare for it.",
        },
      },
    ],
    repos: [
      { name: "App Shopify (công ty)", privacy: "client", stack: ["Shopify", "Prisma", "TS"], commits: 1026, blurb: { vi: "App Shopify thương mại mình đồng tác giả — 1026 commit, ẩn danh.", en: "A commercial Shopify app I co-authored — 1026 commits, anonymized." } },
      { name: "xanh-learn-shopify", privacy: "personal", stack: ["Shopify", "Prisma"], blurb: { vi: "Nơi mình tự học nền tảng Shopify.", en: "Where I self-taught the Shopify platform." } },
      { name: "xanh-ecommerce", privacy: "personal", stack: ["JavaScript"], blurb: { vi: "Thử làm một shop online từ đầu.", en: "An attempt at an online shop from scratch." } },
    ],
  },
  {
    id: "growing-up",
    order: 7,
    title: { vi: "Trưởng thành: đồ án lớn & dự án khách", en: "Growing Up: Big Projects & Client Work" },
    tagline: {
      vi: "Từ 'code cho chạy' đến 'code để duy trì'",
      en: "From 'make it run' to 'make it last'",
    },
    theme: {
      key: "growing-up",
      accent: "#38bdf8",
      glow: "#0ea5e9",
      mood: { vi: "Navy chuyên nghiệp", en: "Professional navy" },
    },
    story: {
      vi: [
        "Cuối hành trình (cho tới hiện tại) là những dự án lớn: monorepo, làm việc nhóm nhiều người, đồ án tốt nghiệp, và code chạy trong môi trường thật lâu dài.",
        "Mình nhận ra: viết code chạy được là mức sàn. Viết code để người khác đọc hiểu, mở rộng, và duy trì được — đó mới là trưởng thành. Đây là chương vẫn đang được viết tiếp.",
      ],
      en: [
        "The latest stretch of the journey is the big stuff: monorepos, multi-person teamwork, a capstone project, and code that lives in production long-term.",
        "I realized: making code run is the floor. Writing code others can read, extend, and maintain — that's growing up. This chapter is still being written.",
      ],
    },
    lessons: [
      {
        title: { vi: "Viết cho người đọc sau bạn", en: "Write for the next reader" },
        body: {
          vi: "6 tháng sau, 'người khác' đọc code của bạn chính là bạn. Hãy tử tế với chính mình.",
          en: "In 6 months, the 'someone else' reading your code is you. Be kind to future-you.",
        },
      },
    ],
    repos: [
      { name: "Monorepo (công ty)", privacy: "client", stack: ["TypeScript", "Monorepo"], commits: 748, blurb: { vi: "Monorepo quy mô công ty — làm việc nhóm, ẩn danh.", en: "A company-scale monorepo — teamwork, anonymized." } },
      { name: "Đồ án LMS (trường)", privacy: "client", stack: ["JavaScript"], blurb: { vi: "Đồ án trường — private, ẩn danh.", en: "A university project — private, anonymized." } },
      { name: "natural_Disaster_Response", privacy: "personal", stack: ["React", "TS"], blurb: { vi: "Ý tưởng ứng phó thiên tai — dự án cộng đồng.", en: "A disaster-response idea — a community project." } },
    ],
  },
];

export const getChapter = (id: string) => chapters.find((c) => c.id === id);
