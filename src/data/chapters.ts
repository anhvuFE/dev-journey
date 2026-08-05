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

export interface Snippet {
  file: string;
  lang: string;
  code: string;
}

export interface CaseStudy {
  challenge: Localized;
  fix: Localized;
}

export interface RepoItem {
  /** tên hiển thị (đã ẩn danh nếu là repo khách) */
  name: string;
  privacy: Privacy;
  stack: string[];
  commits?: number;
  blurb: Localized;
  /** commit thật đáng chú ý (nguyên văn) */
  commitsShown?: string[];
  caseStudy?: CaseStudy;
  snippet?: Snippet;
}

export interface Lesson {
  title: Localized;
  body: Localized;
}

export interface Tip {
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
  intro?: Localized;
  story: { vi: string[]; en: string[] };
  lessons: Lesson[];
  tips?: Tip[];
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
    intro: {
      vi: "Chưa biết Git, chưa biết framework — chỉ có một file index.html, trình duyệt, và sự tò mò. Đây là nơi mọi thứ bắt đầu.",
      en: "No Git, no frameworks — just an index.html, a browser, and curiosity. This is where it all began.",
    },
    story: {
      vi: [
        "Trang web đầu tiên của mình là một dòng chữ đen thui trên nền trắng: gõ `<h1>Xin chào</h1>`, double-click cái file, thấy chữ hiện lên trong trình duyệt — và cảm giác thần kỳ 'mình vừa tạo ra một trang web'.",
        "Mình copy nguyên cục từ W3Schools mà chẳng hiểu gì. Thấy đoạn CSS đẹp là paste, chạy được thì mừng, hỏng thì xoá thử cái khác. Code như xếp Lego bịt mắt — nhưng chính từ đó mò ra `class`, `id`, `margin` là gì.",
        "Chưa biết Git, nên mỗi lần sợ hỏng là copy cả thư mục ra đặt tên mới: `final`, `final2`, `final_that_su`. Máy đầy những bản backup mà chẳng nhớ cái nào mới nhất.",
        "Căn giữa một cái div là trận chiến hai tiếng: thử `text-align`, rồi `margin: auto`, rồi `float`… cuối cùng chép đúng combo trên mạng mà vẫn không hiểu vì sao nó chạy. Ai học CSS cũng có ký ức này.",
        "Rồi mình gửi file .html khoe bạn qua Zalo — bạn mở lên thì mất sạch ảnh và CSS. Lần đầu chạm vào khái niệm 'đường dẫn', và hiểu ra: một trang web không chỉ là một file.",
      ],
      en: [
        "My first webpage was a single black line on white: I typed `<h1>Hello</h1>`, double-clicked the file, saw it in the browser — and felt the magic of 'I just made a website'.",
        "I copied whole chunks from W3Schools without understanding them. Nice CSS? Paste it. Works? Great. Breaks? Delete and try another. Blindfolded Lego — but that's how I stumbled onto `class`, `id`, `margin`.",
        "No Git yet, so every time I feared breaking things I duplicated the folder: `final`, `final2`, `final_for_real`. My machine was full of backups I couldn't tell apart.",
        "Centering a div was a two-hour battle: `text-align`, then `margin: auto`, then `float`… I finally copied the right combo online without understanding why it worked. Every CSS learner has this memory.",
        "Then I sent a friend my .html over Zalo — they opened it and all images and CSS were gone. My first brush with 'paths', and the realization: a website isn't just one file.",
      ],
    },
    lessons: [
      {
        title: { vi: "'Chạy được' chưa chắc là 'hiểu'", en: "'It runs' isn't 'I get it'" },
        body: {
          vi: "Copy từ W3Schools/StackOverflow không sai — ai cũng làm. Nhưng hãy tập xoá từng dòng để xem cái gì đổi; đó là cách hiểu code nhanh nhất giai đoạn này.",
          en: "Copying from W3Schools/StackOverflow is fine — everyone does. But practice deleting lines one by one to see what changes; it's the fastest way to actually understand code now.",
        },
      },
      {
        title: { vi: "HTML là khung nhà, CSS là sơn", en: "HTML is the frame, CSS is the paint" },
        body: {
          vi: "Nội dung (chữ, ảnh, nút) viết trong HTML; màu, khoảng cách, font để CSS lo. Tách bạch từ đầu, lên framework sẽ quen tư duy này.",
          en: "Content (text, images, buttons) goes in HTML; color, spacing, fonts belong to CSS. Separate them early and frameworks will feel natural later.",
        },
      },
      {
        title: { vi: "Đường dẫn là kẻ thù đầu tiên", en: "Paths are your first enemy" },
        body: {
          vi: 'Ảnh mất, CSS không lên gần như luôn do path sai. `href="style.css"` khác `/style.css` khác `./css/style.css`. Hiểu tương đối vs tuyệt đối sớm sẽ đỡ khổ.',
          en: 'Missing images and CSS are almost always a wrong path. `href="style.css"` differs from `/style.css` and `./css/style.css`. Learn relative vs absolute early.',
        },
      },
      {
        title: { vi: "Nỗi đau `final2` chính là lý do Git ra đời", en: "The `final2` pain is why Git exists" },
        body: {
          vi: "Chưa cần học Git vội, nhưng hãy nhớ cảm giác 'không biết bản nào mới nhất' — sau này `git init` sẽ xoá sạch nỗi đau đó.",
          en: "No rush to learn Git yet, but remember the 'which copy is newest?' pain — later `git init` erases it completely.",
        },
      },
    ],
    tips: [
      {
        title: { vi: "Luôn F5 sau khi lưu", en: "Always refresh after saving" },
        body: {
          vi: "Vòng lặp sửa → Ctrl+S → F5 là nhịp thở giai đoạn này. Và luôn tự hỏi: mình đang mở đúng cái file vừa sửa chưa?",
          en: "The edit → Ctrl+S → F5 loop is your heartbeat now. And always ask: am I even viewing the file I just edited?",
        },
      },
      {
        title: { vi: "Đừng sợ trang đầu xấu", en: "Don't fear an ugly first page" },
        body: {
          vi: "Trang web đầu tiên xấu là chuyện đương nhiên. Quan trọng là nó chạy, và mỗi ngày bạn hiểu thêm một chút.",
          en: "Your first page being ugly is normal. What matters is that it runs, and you understand a little more each day.",
        },
      },
    ],
    repos: [
      {
        name: "bookstore",
        privacy: "personal",
        stack: ["HTML", "CSS"],
        blurb: {
          vi: "Trang nhà sách tĩnh — bài tập vỡ lòng, cũng là file HTML đầu tiên mình viết.",
          en: "A static bookstore — my ABC exercise, and my very first HTML file.",
        },
        snippet: {
          file: "index.html",
          lang: "html",
          code: `<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <title>My Bookstore</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Hello, world 📚</h1>
  </body>
</html>`,
        },
      },
      {
        name: "W3_BAND",
        privacy: "personal",
        stack: ["HTML", "CSS"],
        blurb: {
          vi: "Trang ban nhạc — nơi mình đánh 'trận chiến căn giữa div' huyền thoại.",
          en: "A band page — home of my legendary 'center a div' battle.",
        },
        snippet: {
          file: "style.css",
          lang: "css",
          code: `/* The 2-hour battle: centering a div.
   The key I wish I'd known sooner: Flexbox */
.hero {
  display: flex;
  justify-content: center; /* horizontal */
  align-items: center;     /* vertical */
  min-height: 100vh;
}`,
        },
      },
      {
        name: "coffeeshop",
        privacy: "personal",
        stack: ["CSS"],
        blurb: {
          vi: "Landing quán cà phê — tập chia section và layout.",
          en: "A coffee-shop landing — practicing sections and layout.",
        },
        snippet: {
          file: "style.css",
          lang: "css",
          code: `.btn {
  padding: 12px 28px;
  background: #6f4e37; /* coffee brown */
  color: #fff;
  border-radius: 999px;
  transition: transform 0.2s ease;
}
.btn:hover {
  transform: translateY(-2px);
}`,
        },
      },
      {
        name: "backroads-app",
        privacy: "personal",
        stack: ["CSS"],
        blurb: {
          vi: "Làm theo course — học cách dựng bố cục nhiều phần.",
          en: "A course build — learning multi-section layouts.",
        },
        snippet: {
          file: "styles.css",
          lang: "css",
          code: `/* responsive grid — no media queries needed */
.tours {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}`,
        },
      },
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
    intro: {
      vi: "Lần đầu gặp component, state, và cơn đau useEffect. Cũng là lúc mình dính những cái bẫy rất 'JavaScript' — và học được rằng hiệu ứng đẹp không bao giờ miễn phí.",
      en: "My first components, state, and useEffect headaches. Also where I hit very 'JavaScript' traps — and learned that fancy effects are never free.",
    },
    story: {
      vi: [
        "Commit đời đầu của mình trong repo portfolio tên là `Commit` rồi `Completed commit` — đúng dấu vết một đứa chưa biết viết commit message là gì.",
        "Mình ham hiệu ứng: làm nền 12 chòm sao WebGL cho portfolio. Máy lag ngay lập tức. Cả một loạt commit `perf(hero)...` rồi một cú revert cay đắng: `drop 12-constellation background`.",
        "Vừa vui vì lên React 19 thì npm phun lỗi xung đột peer dependency. Phải thêm `.npmrc` với `legacy-peer-deps` để cứu — đúng kiểu 'hello world của nỗi đau JS'.",
        "Ở vubach_Auto mình ôm cả MUI lẫn Ant Design cùng lúc, rồi thay qua thay lại giữa hai bên trong đúng vài commit. Bài học xương máu: chọn MỘT thứ và bám theo.",
        "Đến xanh-learn thì đã biết làm feature branch, mở tới 22 PR, commit chuẩn Conventional Commits, và tự tin đổi database từ SQLite sang PostgreSQL giữa dự án. Từ 'lưu LocalStorage' đến 'Prisma + Postgres' là cả một nấc trưởng thành.",
      ],
      en: [
        "My very first commits in the portfolio repo were literally named `Commit` then `Completed commit` — the fingerprint of someone who didn't know what a commit message was.",
        "I chased effects: a 12-constellation WebGL starfield behind the portfolio. It instantly lagged. A whole run of `perf(hero)...` commits, then a bitter revert: `drop 12-constellation background`.",
        "Just as I got excited about React 19, npm threw peer-dependency conflicts. I had to add an `.npmrc` with `legacy-peer-deps` to survive — the 'hello world of JS pain'.",
        "In vubach_Auto I hauled in both MUI and Ant Design at once, then flip-flopped between them across a few commits. Hard lesson: pick ONE and commit.",
        "By xanh-learn I was doing feature branches, 22 PRs, Conventional Commits, and confidently swapping the database from SQLite to PostgreSQL mid-project. From 'LocalStorage' to 'Prisma + Postgres' is a whole rung of growing up.",
      ],
    },
    lessons: [
      {
        title: { vi: "Hiệu ứng đẹp KHÔNG miễn phí", en: "Fancy effects are NOT free" },
        body: {
          vi: "Tắt animation khi không nhìn thấy (`IntersectionObserver`), tôn trọng `prefers-reduced-motion`, và lazy-load thứ nặng (WebGL) bằng `React.lazy`.",
          en: "Turn effects off when off-screen (`IntersectionObserver`), respect `prefers-reduced-motion`, and lazy-load heavy things (WebGL) with `React.lazy`.",
        },
      },
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
          vi: "Lỗi đỏ lúc code còn hơn màn hình trắng lúc production. Cứ để nó la mình sớm.",
          en: "A red error while coding beats a white screen in production. Let it yell early.",
        },
      },
      {
        title: { vi: "Lên chuẩn quy trình sớm", en: "Adopt real workflow early" },
        body: {
          vi: "Feature branch + PR + commit `type(scope): mô tả`. Đổi cả database giữa chừng (SQLite → Postgres) là bình thường — đừng sợ refactor.",
          en: "Feature branch + PR + `type(scope): message` commits. Swapping databases mid-project (SQLite → Postgres) is normal — don't fear refactors.",
        },
      },
    ],
    tips: [
      {
        title: { vi: "Đừng trộn 2 thư viện UI", en: "Don't mix two UI libraries" },
        body: {
          vi: "MUI + Ant Design cùng lúc = thay qua thay lại + phình bundle. Chọn một và đi tới cùng.",
          en: "MUI + Ant Design together = endless flip-flopping + bundle bloat. Pick one and stick with it.",
        },
      },
      {
        title: { vi: "Bọc localStorage trong try/catch", en: "Wrap localStorage in try/catch" },
        body: {
          vi: "Chế độ ẩn danh của trình duyệt có thể ném lỗi khi đụng `localStorage`. Luôn phòng thủ.",
          en: "Private/incognito mode can throw when touching `localStorage`. Always guard it.",
        },
      },
    ],
    repos: [
      {
        name: "portfolio",
        privacy: "personal",
        stack: ["React", "TypeScript", "MUI", "Framer Motion"],
        commits: 51,
        blurb: {
          vi: "Portfolio cá nhân kiểu bento-grid, có intro WebGL, command palette ⌘K, widget GitHub. Nơi mình thử mọi ý tưởng.",
          en: "A bento-grid personal portfolio with a WebGL intro, ⌘K command palette, GitHub widget. My idea playground.",
        },
        commitsShown: [
          "revert(home): drop 12-constellation background, restore parallax starfield",
          "perf: stop needless re-renders on the main page",
          "fix: add .npmrc to resolve TypeScript peer dependency conflict",
          "fix: revert years experience back to 3+",
        ],
        caseStudy: {
          challenge: {
            vi: "Nền 12 chòm sao vẽ bằng CSS `box-shadow` quá tốn paint → lag; và lên React 19 thì npm báo xung đột peer dependency.",
            en: "A 12-constellation background drawn with CSS `box-shadow` was too paint-heavy → lag; and moving to React 19 triggered npm peer-dependency conflicts.",
          },
          fix: {
            vi: "Giảm số sao + `will-change: transform` đẩy lên GPU + dừng animation khi hero cuộn khuất bằng `IntersectionObserver`; cuối cùng revert hẳn về 2 layer. Xung đột peer-dep: thêm `.npmrc` (`legacy-peer-deps`).",
            en: "Fewer stars + `will-change: transform` to the GPU + pause the animation when the hero scrolls off-screen via `IntersectionObserver`; eventually reverted to 2 layers. Peer-dep conflict: add an `.npmrc` (`legacy-peer-deps`).",
          },
        },
        snippet: {
          file: "src/App.tsx",
          lang: "tsx",
          code: `const [showIntro] = useState<boolean>(() => {
  if (typeof window === "undefined") return false; // safe during SSR
  try {
    const seen = localStorage.getItem(INTRO_SEEN_KEY);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    return !seen && !reduced;
  } catch {
    return false; // incognito may throw
  }
});`,
        },
      },
      {
        name: "vubach_Auto",
        privacy: "personal",
        stack: ["React", "Vite", "Zustand", "Ant Design"],
        commits: 5,
        blurb: {
          vi: "Landing + admin bán ô tô cũ, KHÔNG backend — dữ liệu lưu LocalStorage, export/import JSON để sao lưu.",
          en: "A used-car landing + admin with NO backend — data in LocalStorage, JSON export/import for backup.",
        },
        commitsShown: [
          "feat: implement Vu Bach Auto landing page with modern design",
          "refactor: enhance UI design with MUI and Ant Design integration",
          "feat(ui): enhance Ant Design integration and responsive design",
        ],
        caseStudy: {
          challenge: {
            vi: "Không có database — phải tự sinh id cho mỗi xe; và lỡ ôm cả MUI lẫn Ant Design nên UI thiếu nhất quán.",
            en: "No database — I had to generate an id per car; and having both MUI and Ant Design made the UI inconsistent.",
          },
          fix: {
            vi: "Sinh id bằng `Date.now()` + chuỗi ngẫu nhiên khi thêm xe; sao lưu bằng export/import JSON. Và chốt lại chỉ dùng Ant Design cho đồng nhất.",
            en: "Generate an id from `Date.now()` + a random string on add; back up via JSON export/import. And settle on Ant Design only, for consistency.",
          },
        },
        snippet: {
          file: "src/store/carStore.ts",
          lang: "ts",
          code: `addCar: (carData) => {
  const newCar: Car = {
    ...carData,
    id: \`car-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  set((state) => ({ cars: [newCar, ...state.cars] }));
},`,
        },
      },
      {
        name: "xanh-learn",
        privacy: "personal",
        stack: ["Remix", "Shopify", "Prisma", "Polaris"],
        commits: 46,
        blurb: {
          vi: "Sân chơi học Shopify app: Polaris + Prisma. Nơi mình lần đầu chạm ORM thật và quy trình PR nghiêm túc.",
          en: "A Shopify-app learning sandbox: Polaris + Prisma. Where I first met a real ORM and a serious PR workflow.",
        },
        commitsShown: [
          "feat: add scalable app structure with TypeScript types and Zustand stores",
          "feat(database): add PostgreSQL setup with Prisma ORM",
          "refactor(orders): improve TypeScript type safety in order pages",
        ],
        caseStudy: {
          challenge: {
            vi: "Prisma tạo connection mới mỗi lần hot-reload → rò rỉ kết nối; và dự án bắt đầu bằng SQLite rồi cần chuyển sang PostgreSQL.",
            en: "Prisma spawned a new connection on every hot-reload → leaks; and the project started on SQLite but needed PostgreSQL.",
          },
          fix: {
            vi: "Dùng một `PrismaClient` global ở môi trường dev để tái sử dụng; đổi datasource sang Postgres rồi chạy lại migrate. Đổi DB giữa dự án là chuyện thường.",
            en: "Reuse a single global `PrismaClient` in dev; switch the datasource to Postgres and re-run migrations. Changing DB mid-project is normal.",
          },
        },
        snippet: {
          file: "app/db.server.ts",
          lang: "ts",
          code: `import { PrismaClient } from "@prisma/client";

declare global {
  var prismaGlobal: PrismaClient;
}
// dev: reuse one global client to avoid connection leaks on hot-reload
if (process.env.NODE_ENV !== "production") {
  if (!global.prismaGlobal) global.prismaGlobal = new PrismaClient();
}
const prisma = global.prismaGlobal ?? new PrismaClient();
export default prisma;`,
        },
      },
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
    intro: {
      vi: "Front-end đẹp mấy cũng vô nghĩa nếu không có dữ liệu thật. Chương này là lúc mình tự dựng backend, làm auth, deploy cho người thật dùng — và ăn đủ loại bug 'chỉ xảy ra trên mạng của tôi'.",
      en: "A pretty front-end means nothing without real data. This is where I built backends, auth, and deployed for real users — collecting every 'works on my machine' bug along the way.",
    },
    story: {
      vi: [
        "Mình bắt đầu tự dựng backend (NestJS/Express + MongoDB), làm auth, deploy lên server thật. Từ 'code cho mình xem' sang 'code cho người khác dùng' là một khoảng cách lớn.",
        "Auth cho mình một bài học nhớ đời: refresh token ở dự án homestay mình sửa tới 3-4 lần mới ổn — `implement...` rồi `fix: improve...missing access tokens` rồi `httpOnly cookies`. Đồng bộ token giữa header và cookie, giữa FE và BE, đúng là ác mộng.",
        "Toàn những bug 'chỉ xảy ra trên mạng của tôi': rate-limit chặn cả lúc dev, CORS whitelist, `_id` của MongoDB không khớp với FE. Full-stack là lúc mình gặp cả một thế giới bug môi trường mới.",
        "LCMS là đỉnh của ám ảnh hiệu năng: hàng chục PR optimize liên tiếp, ba vòng tối ưu trang Pricing tới `97/100 Lighthouse`. Và cú tự bắn vào chân kinh điển: thêm `immer` vào cart store rồi phải gỡ vì lỗi dependency.",
        "Đối mặt khách hàng thật là ràng buộc thật: đơn cho cả khách vãng lai, tích hợp cổng thanh toán, gửi email đơn, thậm chí đổi API thời tiết sang bản miễn phí để tiết kiệm chi phí. Bug production lúc 11h đêm là có thật.",
      ],
      en: [
        "I started building backends (NestJS/Express + MongoDB), auth, deploying to real servers. Going from 'code I look at' to 'code others use' is a huge leap.",
        "Auth taught me an unforgettable lesson: I reworked the refresh-token flow on a homestay project 3-4 times — `implement...`, then `fix: improve...missing access tokens`, then `httpOnly cookies`. Syncing tokens across header/cookie and FE/BE is a nightmare.",
        "So many 'only-on-my-machine' bugs: rate-limits blocking dev, CORS whitelists, MongoDB `_id` not matching the FE. Full-stack introduced me to a whole new world of environment bugs.",
        "LCMS was peak performance obsession: dozens of optimization PRs, three rounds on the Pricing page up to `97/100 Lighthouse`. And the classic foot-gun: adding `immer` to the cart store, then ripping it out over a dependency bug.",
        "Real clients mean real constraints: guest checkouts, payment gateways, order emails, even swapping the weather API for a free one to cut costs. 11pm production bugs are very real.",
      ],
    },
    lessons: [
      {
        title: { vi: "Đo trước khi tối ưu", en: "Measure before optimizing" },
        body: {
          vi: "LCMS tối ưu theo điểm Lighthouse thật (v1 → v2 → v3, 97/100), không tối ưu mù. Và nhớ: tối ưu có thể đẻ bug — thêm `immer` rồi phải gỡ.",
          en: "LCMS optimized against real Lighthouse scores (v1 → v2 → v3, 97/100), not blindly. And remember: optimizing can create bugs — `immer` went in, then came out.",
        },
      },
      {
        title: { vi: "Bảo mật không phải 'để sau'", en: "Security is not a 'later' task" },
        body: {
          vi: "Không hardcode secret, không commit `.env`, validate mọi input, đọc config từ `import.meta.env` / `process.env`.",
          en: "No hardcoded secrets, never commit `.env`, validate every input, read config from `import.meta.env` / `process.env`.",
        },
      },
      {
        title: { vi: "Auth + refresh token là phần khó", en: "Auth + refresh tokens are the hard part" },
        body: {
          vi: "Dự án thật cũng phải sửa 3-4 lần mới ổn. Đồng bộ token qua header/cookie ở cả FE lẫn BE cần cực kỳ cẩn thận.",
          en: "Even real projects rework it 3-4 times. Syncing tokens across header/cookie on both FE and BE needs great care.",
        },
      },
      {
        title: { vi: "Tách tầng rõ ràng", en: "Layer your backend clearly" },
        body: {
          vi: "routes → controllers → services → models. Thêm feature chỉ việc lặp khuôn; và tách việc nặng/đặc thù (nhận diện khuôn mặt) ra service riêng bằng Python.",
          en: "routes → controllers → services → models. New features just repeat the pattern; and split heavy/specialized work (face recognition) into its own Python service.",
        },
      },
    ],
    tips: [
      {
        title: { vi: "Đừng để 2 nguồn sự thật", en: "Never keep two sources of truth" },
        body: {
          vi: "Một dự án của mình có 2 cơ chế giỏ hàng song song → số lượng lệch. Một dữ liệu, một nguồn.",
          en: "One project had two parallel cart mechanisms → mismatched quantities. One piece of data, one source.",
        },
      },
      {
        title: { vi: "Phân biệt dev/prod sớm", en: "Split dev/prod early" },
        body: {
          vi: "Rate-limit và CORS chỉ nên siết ở production; bật hết ở dev sẽ đẻ ra 'lỗi chỉ xảy ra trên mạng của tôi'.",
          en: "Rate-limits and CORS should only tighten in production; enabling them in dev breeds 'works-on-my-machine' bugs.",
        },
      },
      {
        title: { vi: "MongoDB `_id` → `id`", en: "MongoDB `_id` → `id`" },
        body: {
          vi: "Cấu hình `toJSON.transform` trong schema để đổi `_id` thành `id` (string) trước khi trả về FE.",
          en: "Configure `toJSON.transform` in the schema to expose `_id` as a string `id` before returning to the FE.",
        },
      },
    ],
    repos: [
      {
        name: "LCMS_v2",
        privacy: "personal",
        stack: ["React", "Zustand", "NestJS", "MongoDB"],
        commits: 463,
        blurb: {
          vi: "Hệ thống quản lý dịch vụ giặt ủi/vệ sinh 4 vai trò: booking, thanh toán, tồn kho, và chấm công bằng nhận diện khuôn mặt. Dự án lớn nhất tự làm.",
          en: "A laundry & cleaning management system for 4 roles: booking, payments, inventory, and face-recognition attendance. My biggest solo build.",
        },
        commitsShown: [
          "feat(performance): achieve 97/100 Lighthouse score - production optimization",
          "fix: remove immer middleware from cartStore to resolve dependency issue",
          "feat(weather): replace OpenWeatherMap with Open-Meteo free API",
        ],
        caseStudy: {
          challenge: {
            vi: "Trang Pricing nặng cần tối ưu; và chi phí API thời tiết OpenWeatherMap. Đồng thời tối ưu quá tay lại đẻ bug.",
            en: "A heavy Pricing page needed optimizing; plus OpenWeatherMap API costs. And over-optimizing created new bugs.",
          },
          fix: {
            vi: "Đo bằng Lighthouse, tối ưu 3 vòng tới 97/100 (useState → useReducer, debounce validate 300ms, `React.memo` + custom compare, cache/dedupe API). Đổi sang Open-Meteo miễn phí. Bài học đắt: thêm `immer` vào cartStore rồi phải gỡ.",
            en: "Measured with Lighthouse, optimized in 3 rounds to 97/100 (useState → useReducer, 300ms debounced validation, `React.memo` + custom compare, cache/dedupe API). Switched to free Open-Meteo. Costly lesson: `immer` in the cart store had to be removed.",
          },
        },
        snippet: {
          file: "src/stores/cartStore.ts",
          lang: "ts",
          code: `// each item carries time metadata to optimize & debug re-renders
export interface CartItem {
  id: string;
  serviceId: string;
  serviceName: string;
  quantity: number;
  price: number;
  addedAt?: number;
  lastModified?: number;
}`,
        },
      },
      {
        name: "Ecocau",
        privacy: "personal",
        stack: ["React", "Zustand", "EmailJS", "Nginx"],
        commits: 137,
        blurb: {
          vi: "Web bán sản phẩm thân thiện môi trường: giỏ hàng, checkout, blog, admin. Đơn gửi qua EmailJS, giá VND, đa ngôn ngữ.",
          en: "An eco-friendly e-commerce site: cart, checkout, blog, admin. Orders via EmailJS, VND pricing, bilingual.",
        },
        commitsShown: [
          "fix: step by step in order, timezone,...",
          "fix: order v3",
          "Switch frontend server setup to Nginx in CI",
        ],
        caseStudy: {
          challenge: {
            vi: "Lên React 19 thì React Quill (rich text editor) không tương thích; tồn tại 2 cơ chế giỏ hàng song song gây lệch số lượng; và bug timezone khi lên đơn.",
            en: "React 19 broke React Quill (the rich-text editor); two parallel cart mechanisms caused quantity drift; and a timezone bug in the order flow.",
          },
          fix: {
            vi: "Gỡ React Quill, phân trang phía client cho hết nhấp nháy; gộp về một nguồn giỏ hàng duy nhất; format tiền VND bằng `Intl.NumberFormat('vi-VN')`.",
            en: "Removed React Quill, paginated client-side to stop flicker; merged to a single cart source; formatted VND with `Intl.NumberFormat('vi-VN')`.",
          },
        },
        snippet: {
          file: "src/components/cart/CartSidebar.tsx",
          lang: "tsx",
          code: `const formatPrice = (price: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);`,
        },
      },
      {
        name: "Homestay (khách hàng)",
        privacy: "client",
        stack: ["React", "Express", "MongoDB", "JWT"],
        commits: 143,
        blurb: {
          vi: "Website bán hàng cho một cửa hàng nhỏ: trang khách + admin đầy đủ, backend Express 3 tầng, thanh toán, chat hỗ trợ. Khách thật — đã ẩn brand.",
          en: "A full shop for a small business: storefront + admin, a 3-layer Express backend, payments, support chat. A real client — brand hidden.",
        },
        commitsShown: [
          "feat(auth): implement automatic refresh token via httpOnly cookies",
          "fix: improve token refresh handling for missing access tokens",
          "feat(chat): add floating customer support chat widget",
        ],
        caseStudy: {
          challenge: {
            vi: "Auth JWT + refresh token phải làm đi làm lại 3-4 lần mới ổn; và rate-limit chặn luôn cả lúc dev.",
            en: "The JWT + refresh-token flow took 3-4 reworks to get right; and the rate-limiter blocked local dev too.",
          },
          fix: {
            vi: "Middleware tự dùng refresh token (từ header hoặc cookie) sinh access token mới trả về qua header; FE có interceptor bắt lại. Chỉ bật `express-rate-limit` ở production.",
            en: "Middleware auto-uses the refresh token (from header or cookie) to mint a new access token returned via header; the FE interceptor catches it. Enable `express-rate-limit` in production only.",
          },
        },
        snippet: {
          file: "src/middlewares/auth.ts",
          lang: "ts",
          code: `export const authorize =
  (...roles: string[]) =>
  (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError("Forbidden", 403);
    }
    next();
  };`,
        },
      },
      {
        name: "Kiosk đọc báo số (công ty)",
        privacy: "client",
        stack: ["React", "React Query", "Firebase", "Vite"],
        commits: 465,
        blurb: {
          vi: "SPA đọc báo/tạp chí số: subscription, bookmark, cá nhân hoá 'For You', nghe bài viết (text-to-speech). Dự án công ty — ẩn danh.",
          en: "A digital news/magazine SPA: subscriptions, bookmarks, a personalized 'For You', and text-to-speech. Company project — anonymized.",
        },
        commitsShown: [
          "feat: Replace cookie-based authentication with localStorage token storage",
          "fix: fix text to speech for Mobile",
          "fix: add missing PressReader font files to resolve icon display issues",
        ],
        caseStudy: {
          challenge: {
            vi: "Khi API trả 401 phải tự refresh token rồi gọi lại request; và text-to-speech chạy loạn/không ổn định trên mobile.",
            en: "On a 401 the app had to refresh the token and retry the request; and text-to-speech was unstable on mobile.",
          },
          fix: {
            vi: "Retry đệ quy có giới hạn (`MAX_RETRIES = 2`), vẫn fail thì xoá token + về login. Tách toàn bộ logic TTS phức tạp ra custom hook `useTextToSpeechLogic` để UI gọn.",
            en: "Bounded recursive retry (`MAX_RETRIES = 2`); still failing → clear token + redirect to login. Extract all the gnarly TTS logic into a `useTextToSpeechLogic` hook to keep the UI clean.",
          },
        },
        snippet: {
          file: "src/hooks/useApiQuery.tsx",
          lang: "ts",
          code: `const apiRequest = async (endpoint, options = {}, retryCount = 0) => {
  const MAX_RETRIES = 2;
  try {
    const res = await fetch(API_BASE_URL + "/" + endpoint, config);
    if (!res.ok) {
      if (res.status === 401) throw new Error("TOKEN_EXPIRED");
      throw new Error("HTTP " + res.status);
    }
    return await res.json();
  } catch (error) {
    if (error.message === "TOKEN_EXPIRED" && retryCount < MAX_RETRIES) {
      const t = await getNewAccessToken();
      setAccessToken(t.accessToken);
      return apiRequest(endpoint, options, retryCount + 1); // retry
    }
    throw error;
  }
};`,
        },
      },
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
    intro: {
      vi: "React Native mang tư duy React lên điện thoại. Nhưng mobile không phải web thu nhỏ — và 'khoá app trên iOS' dạy mình rằng có những thứ CSS không giải quyết được.",
      en: "React Native brought the React mindset to phones. But mobile isn't a shrunken web — and 'locking an app on iOS' taught me some things CSS can't solve.",
    },
    story: {
      vi: [
        "React Native mở ra một thế giới khác: cùng tư duy React nhưng chạy trên iOS/Android. Lần đầu build lên điện thoại thật, mình cầm máy cười một mình.",
        "Từ 'học React Native', mình dám xoá đồ án tập để làm một app thật — app kiểm soát giờ dùng máy cho trẻ em. Bước ngoặt: từ làm-theo-hướng-dẫn sang làm-sản-phẩm-của-mình.",
        "Rồi vỡ ra: 'khoá app trên iOS' không phải chuyện CSS. Phải viết native module (FamilyControls của Apple), build một Expo Dev Client riêng, và chỉ test được trên iPhone thật.",
        "Khoảnh khắc thành thật nhất: mình viết vào file SHIELD-BUILD.md rằng cách re-shield bằng `setTimeout` là workaround chưa hoàn hảo — ship 'đủ tốt' nhưng ghi rõ nợ kỹ thuật để sau còn sửa.",
        "Bài học tiền bạc: ở một app đặt lịch dịch vụ, một dòng timer mặc định 60 phút đặt sai làm tính sai tiền cả loạt. Từ đó mình đẩy hết ràng buộc tiền/giờ về server — và phát hiện Capacitor gói cùng codebase React thành app iOS/Android chỉ bằng vài dòng khai báo.",
      ],
      en: [
        "React Native opened another world: the same React mindset, on iOS/Android. The first time I built to a real phone, I grinned at the screen alone.",
        "From 'learning React Native', I dared delete the practice project to build something real — a kids' screen-time control app. The turning point: from following tutorials to shipping my own product.",
        "Then it hit me: 'locking an app on iOS' isn't CSS. It needs a native module (Apple's FamilyControls), a custom Expo Dev Client, and can only be tested on a real iPhone.",
        "My most honest moment: I wrote in SHIELD-BUILD.md that the `setTimeout` re-shield was an imperfect workaround — shipping 'good enough' but documenting the tech debt for later.",
        "The money lesson: in a booking app, one misplaced default 60-minute timer mis-billed a whole batch. So I pushed all money/time rules to the server — and discovered Capacitor wraps the same React codebase into iOS/Android apps in a few lines.",
      ],
    },
    lessons: [
      {
        title: { vi: "Nền tảng nào cũng có luật riêng", en: "Every platform has its own rules" },
        body: {
          vi: "Đừng bê nguyên tư duy web sang mobile. Gesture, safe area, permission, hiệu năng list dài — mỗi thứ một pattern.",
          en: "Don't drag web habits into mobile. Gestures, safe areas, permissions, long-list performance — each has its own pattern.",
        },
      },
      {
        title: { vi: "Native module luôn cần stub fallback", en: "Native modules always need a stub fallback" },
        body: {
          vi: "Phần chỉ chạy được ở một nơi (iOS shield) hãy trả rỗng cho nơi khác, đừng để app crash.",
          en: "Code that only runs in one place (the iOS shield) should return empty elsewhere — never crash.",
        },
      },
      {
        title: { vi: "Đừng tin client — validate ở server", en: "Never trust the client — validate on the server" },
        body: {
          vi: "Mọi ràng buộc tiền/giờ (dedup, daily cap, refund) enforce ở backend, không ở app con.",
          en: "Every money/time rule (dedup, daily cap, refund) is enforced on the backend, not the child app.",
        },
      },
      {
        title: { vi: "Ghi lại nợ kỹ thuật", en: "Write down your tech debt" },
        body: {
          vi: "Prototype được phép 'đủ tốt', nhưng viết rõ workaround (như SHIELD-BUILD.md) để sau còn biết đường quay lại sửa.",
          en: "A prototype may be 'good enough', but document the workaround (like SHIELD-BUILD.md) so you can come back and fix it.",
        },
      },
    ],
    tips: [
      {
        title: { vi: "Capacitor gói web thành mobile rất rẻ", en: "Capacitor wraps web into mobile cheaply" },
        body: {
          vi: "Cùng codebase React, thêm `@capacitor/ios` + `android`, đặt `webDir: 'dist'`, khai báo permission — là có app cho store.",
          en: "Same React codebase, add `@capacitor/ios` + `android`, set `webDir: 'dist'`, declare permissions — and you have store-ready apps.",
        },
      },
      {
        title: { vi: "Gom hằng số & secret ngay từ đầu", en: "Centralize constants & secrets from day one" },
        body: {
          vi: "Giá về một file constant, secret về env. Ghi 'DO NOT COMMIT' trong file là chưa đủ — phải cho vào `.gitignore` thật.",
          en: "Prices into one constants file, secrets into env. Writing 'DO NOT COMMIT' in a file isn't enough — actually add it to `.gitignore`.",
        },
      },
    ],
    repos: [
      {
        name: "App kiểm soát giờ dùng máy (prototype)",
        privacy: "client",
        stack: ["React Native", "Expo", "NestJS", "Firebase"],
        commits: 16,
        blurb: {
          vi: "App cho trẻ làm nhiệm vụ đổi giờ dùng máy; iOS tự khoá app khi hết giờ. 3 mặt: app con (Expo), backend (NestJS GraphQL), dashboard bố mẹ. Đã ẩn danh.",
          en: "A kids' app that earns screen time by doing tasks; iOS locks apps when time's up. Three surfaces: child app (Expo), backend (NestJS GraphQL), parent dashboard. Anonymized.",
        },
        commitsShown: [
          "learn react native",
          "feat: split into fe/ + be/, add NestJS GraphQL backend with Firebase",
          "fix(be): auto-approve settings + submission dedup + cancel refund + daily cap",
        ],
        caseStudy: {
          challenge: {
            vi: "Khoá app trên iOS cần native module (FamilyControls), không chạy trên Expo Go, chỉ test được trên máy thật; và chưa có DeviceActivityMonitor extension để tự re-shield.",
            en: "Locking apps on iOS needs a native module (FamilyControls), won't run on Expo Go, only tests on a real device; and there was no DeviceActivityMonitor extension to auto re-shield.",
          },
          fix: {
            vi: "Viết native module + stub fallback cho nền tảng khác; tạm re-shield bằng `setTimeout` + `AppState` listener làm lưới an toàn khi app bật lại; ghi rõ workaround trong SHIELD-BUILD.md.",
            en: "Wrote the native module + a stub fallback for other platforms; temporarily re-shield via `setTimeout` + an `AppState` listener as a safety net; documented the workaround in SHIELD-BUILD.md.",
          },
        },
        snippet: {
          file: "fe/App.tsx",
          lang: "tsx",
          code: `await ScreenShield.unshieldFor(minutes);
// native won't auto re-shield without a DeviceActivityMonitor extension
reshieldTimer = setTimeout(() => {
  ScreenShield.shieldNow().catch(() => {});
  refetchBank();
}, remainingMs);`,
        },
      },
      {
        name: "App đặt lịch dịch vụ sửa nhà (khách hàng)",
        privacy: "client",
        stack: ["React", "Capacitor", "Supabase", "Stripe"],
        commits: 3876,
        blurb: {
          vi: "Marketplace đặt lịch thợ sửa nhà theo giờ: tính tiền theo phút, chia doanh thu Stripe Connect, đặt lịch bằng giọng nói. Đồng tác giả — đã ẩn danh.",
          en: "A marketplace to book home-repair pros by the hour: per-minute billing, Stripe Connect revenue split, voice booking. Co-authored — anonymized.",
        },
        commitsShown: [
          "fix(booking): resolve double-discount, per-service rounding, and AI service matching",
          "fix(pricing): remove basePrice dependency and calculate from minutes",
          "fix(calculator): correct earnings calculations and improve consistency",
        ],
        caseStudy: {
          challenge: {
            vi: "Timer mặc định 60 phút đặt sai chỗ → tính tiền sai cả loạt; secret và giá bị hardcode rải rác khắp code.",
            en: "A misplaced default 60-minute timer mis-billed a whole batch; secrets and prices were hardcoded all over the code.",
          },
          fix: {
            vi: "Gom giá về một file constant (derive giá từ giá, không gõ cứng), đưa secret sang `import.meta.env.VITE_*`; hợp nhất luồng timer → billing → charge trong một edge function chạy đúng thứ tự.",
            en: "Centralize prices into one constants file (derive, don't hardcode), move secrets to `import.meta.env.VITE_*`; unify timer → billing → charge in one correctly-ordered edge function.",
          },
        },
        snippet: {
          file: "supabase/functions/utils/pricing.constants.ts",
          lang: "ts",
          code: `export const HOURLY_RATE = 75;
export const BLOCK_MINUTES = 15;
export const BLOCK_RATE = HOURLY_RATE / 4; // don't hardcode 18.75
export const MINIMUM_BILLABLE_MINUTES = 60;
export const POST_FIRST_HOUR_HANDYMAN_SPLIT = 0.6;`,
        },
      },
      {
        name: "learn_react_native",
        privacy: "personal",
        stack: ["React Native", "Expo"],
        blurb: {
          vi: "Nơi mình tập tành React Native từ số 0.",
          en: "Where I learned React Native from zero.",
        },
        snippet: {
          file: "components/Greeting.tsx",
          lang: "tsx",
          code: `import { View, Text, StyleSheet } from "react-native";

export default function Greeting({ name }: { name: string }) {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>Hello, {name} 👋</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { padding: 16, alignItems: "center" },
  text: { fontSize: 18, fontWeight: "600" },
});`,
        },
      },
      {
        name: "01-next-rn",
        privacy: "personal",
        stack: ["Next.js"],
        blurb: {
          vi: "Scaffold thử nối Next.js với React Native — mới ở giai đoạn khởi tạo.",
          en: "A scaffold exploring Next.js + React Native — still at the init stage.",
        },
        snippet: {
          file: "app/[slug]/page.tsx",
          lang: "tsx",
          code: `export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params; // Next.js 16: params is now a Promise
  return <h1>{slug}</h1>;
}`,
        },
      },
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
    intro: {
      vi: "Biết mỗi web thì dễ thành 'thợ một nghề'. Chương này là lúc mình cố tình bước ra khỏi JavaScript — và ăn hành từ những ngôn ngữ mới.",
      en: "Knowing only the web risks becoming a one-trick dev. This is where I deliberately stepped outside JavaScript — and took a beating from new languages.",
    },
    story: {
      vi: [
        "Lần đầu gõ Go mà không có JSX, không có `npm install` quen thuộc — lạ lẫm nhưng đã. Mình viết một MCP server nối AI với Figma bằng Go.",
        "Và Go 'chào' mình bằng một cú panic. Timer timeout và response về gần như cùng lúc, hai goroutine cùng đụng một channel — chương trình chết ngay lập tức. Mình học `sync.Once` theo đúng nghĩa 'bằng máu'.",
        "Chưa hết: file Figma to là WebSocket rớt, log phun ra `read limited at 32769 bytes`. Hoá ra thư viện có giới hạn đọc ngầm 32 KiB. Bài học: đọc kỹ giá trị mặc định của thư viện, đừng tin nó 'tự biết điều'.",
        "Làm tool cho AI dạy mình một tư duy hoàn toàn mới: tối ưu theo **token**, không phải theo 'đẹp cho người đọc'. Mình chia dữ liệu trả về thành 3 mức chi tiết, và có hẳn một commit tên `reduce token consuming`.",
        "Nhưng Go cũng có đêm 2-3h sáng của nó: một backend Gin/GORM mình viết còn nguyên cụm commit `update` rồi `Revert \"update\"` ba lần liên tiếp. Ngôn ngữ nào thì con người vẫn có những đêm deploy hoảng loạn như nhau.",
      ],
      en: [
        "The first time I wrote Go — no JSX, no familiar `npm install` — it felt alien but exciting. I built an MCP server bridging AI and Figma, in Go.",
        "And Go greeted me with a panic. A timer timeout and a response arrived almost simultaneously; two goroutines touched the same channel — instant crash. I learned `sync.Once` the hard way.",
        "Then large Figma files kept dropping the WebSocket with `read limited at 32769 bytes`. Turned out the library had a hidden 32 KiB read cap. Lesson: read your library's defaults; don't assume it 'knows better'.",
        "Building tools for AI taught me a brand-new mindset: optimize for **tokens**, not for human readability. I split the payload into three detail levels — there's literally a commit called `reduce token consuming`.",
        "But Go has its 2-3am nights too: one Gin/GORM backend of mine still carries an `update` commit followed by `Revert \"update\"` three times in a row. Whatever the language, humans still have panicked deploy nights.",
      ],
    },
    lessons: [
      {
        title: { vi: "Học ngôn ngữ thứ 2 để hiểu ngôn ngữ thứ 1", en: "Learn a 2nd language to understand your 1st" },
        body: {
          vi: "Go dạy mình sự tối giản và cách nghĩ về concurrency; quay lại JavaScript, mình viết 'chín' hơn hẳn. Ý tưởng hay từ ngôn ngữ này thường soi sáng ngôn ngữ khác.",
          en: "Go taught me minimalism and a real feel for concurrency; back in JavaScript I write far more maturely. Good ideas from one language illuminate another.",
        },
      },
      {
        title: { vi: "Concurrency: cẩn thận channel & timer", en: "Concurrency: mind your channels & timers" },
        body: {
          vi: "Dùng `sync.Once` để tránh close/send một channel cùng lúc; luôn gọi `timer.Stop()` trước khi `Reset()`. Đa số panic của người mới học Go đến từ đây.",
          en: "Use `sync.Once` to avoid closing/sending a channel concurrently; always `timer.Stop()` before `Reset()`. Most beginner Go panics start here.",
        },
      },
      {
        title: { vi: "Luôn đọc giá trị mặc định của thư viện", en: "Always read your library's defaults" },
        body: {
          vi: "Lỗi `read limited 32769 bytes` đến từ giới hạn ngầm 32 KiB. Rất nhiều bug 'kỳ lạ' thực ra là một default bạn chưa đọc tới.",
          en: "The `read limited 32769 bytes` error came from a hidden 32 KiB cap. So many 'weird' bugs are just a default you never read.",
        },
      },
      {
        title: { vi: "Sửa dữ liệu chung phải atomic", en: "Mutating shared data must be atomic" },
        body: {
          vi: "Trừ tồn kho kiểu đọc-rồi-ghi mà không transaction sẽ bán lố (oversell) khi hai đơn đặt cùng lúc. Gói trong transaction và update có điều kiện.",
          en: "Read-then-write stock decrements without a transaction oversell when two orders land at once. Wrap it in a transaction with a conditional update.",
        },
      },
    ],
    tips: [
      {
        title: { vi: "CORS `*` + credentials là cặp SAI", en: "CORS `*` + credentials is a WRONG pair" },
        body: {
          vi: "Đặt `Access-Control-Allow-Origin: *` cùng `Allow-Credentials: true` vừa không hợp lệ vừa rủi ro. Hãy chỉ định origin cụ thể.",
          en: "Setting `Access-Control-Allow-Origin: *` together with `Allow-Credentials: true` is both invalid and risky. Whitelist specific origins.",
        },
      },
      {
        title: { vi: "Thư viện ngừng bảo trì thì bỏ", en: "Drop unmaintained libraries" },
        body: {
          vi: "`dgrijalva/jwt-go` đã deprecated — chuyển sang `golang-jwt/jwt`. Đừng ôm nợ bảo mật vì lười đổi.",
          en: "`dgrijalva/jwt-go` is deprecated — move to `golang-jwt/jwt`. Don't carry a security debt out of laziness.",
        },
      },
      {
        title: { vi: "Thiết kế cho LLM = thiết kế cho token", en: "Designing for LLMs = designing for tokens" },
        body: {
          vi: "Khi viết tool cho AI, cho nhiều mức chi tiết (minimal / compact / full) và mô tả tool thật rõ — tiết kiệm token là tiết kiệm tiền.",
          en: "When building AI tools, offer detail levels (minimal / compact / full) and write crystal-clear tool descriptions — saving tokens saves money.",
        },
      },
    ],
    repos: [
      {
        name: "MCP server nối AI ↔ Figma (Go)",
        privacy: "client",
        stack: ["Go", "MCP", "WebSocket", "Svelte"],
        commits: 25,
        blurb: {
          vi: "Server MCP cho phép AI đọc/sửa file Figma trực tiếp qua plugin + WebSocket, né rate-limit của REST API. Dự án nhóm, đã ẩn danh.",
          en: "An MCP server letting AI read/edit Figma files directly via a plugin + WebSocket, dodging REST rate limits. Team project, anonymized.",
        },
        commitsShown: [
          "fix: fix channel panic",
          "fix: remove default values to reduce token consuming",
          "feat: migrate plugin to Svelte + bun, support Write to Figma",
        ],
        caseStudy: {
          challenge: {
            vi: "Timer timeout và response về gần cùng lúc → một goroutine `close(channel)`, goroutine kia `channel <- resp` → panic. Thêm nữa, file Figma to làm WebSocket rớt với lỗi `read limited at 32769 bytes` (giới hạn đọc mặc định 32 KiB).",
            en: "A timer timeout and a response arrived at nearly the same moment → one goroutine `close(channel)`, the other `channel <- resp` → panic. Large Figma files also dropped the socket with `read limited at 32769 bytes` (a 32 KiB default read cap).",
          },
          fix: {
            vi: "Bọc mỗi 'pending entry' bằng `sync.Once` — ai chạy trước thì khoá, bên kia thành no-op; gọi `timer.Stop()` trước `Reset()`. Và nâng giới hạn đọc: `conn.SetReadLimit(100 * 1024 * 1024)`.",
            en: "Guard each pending entry with `sync.Once` — whoever runs first wins, the other becomes a no-op; call `timer.Stop()` before `Reset()`. And raise the cap: `conn.SetReadLimit(100 * 1024 * 1024)`.",
          },
        },
        snippet: {
          file: "internal/bridge.go",
          lang: "go",
          code: `type pendingEntry struct {
    ch    chan BridgeResponse
    timer *time.Timer
    once  sync.Once // guards concurrent close/send -> no panic
}`,
        },
      },
      {
        name: "REST API bán hàng (Go)",
        privacy: "client",
        stack: ["Go", "Gin", "GORM", "MySQL"],
        blurb: {
          vi: "Backend REST cho một shop online nhỏ: auth, sản phẩm, đơn hàng, upload ảnh. Clean Architecture 4 tầng. Dự án nhóm, ẩn danh.",
          en: "A REST backend for a small shop: auth, products, orders, image upload. A slim 4-layer clean architecture. Team project, anonymized.",
        },
        commitsShown: [
          "Implement product stock deduction on order actions",
          "Manually bind multipart form data in product handlers",
          'update',
          'Revert "update"',
          'Revert "update"',
        ],
        caseStudy: {
          challenge: {
            vi: "`ShouldBind` không parse được form vừa có file vừa có field số/optional; và trừ tồn kho kiểu đọc-rồi-ghi không transaction → oversell khi hai đơn đặt cùng lúc.",
            en: "`ShouldBind` couldn't parse a form with both a file and numeric/optional fields; and read-then-write stock decrements without a transaction oversold when two orders raced.",
          },
          fix: {
            vi: "Parse tay từng field bằng `c.PostForm` + `strconv`, dùng con trỏ `*int` để phân biệt 'không gửi' với '0'. Trừ kho thì gói trong `db.Transaction` + `UPDATE ... SET stock = stock - ? WHERE id = ? AND stock >= ?` rồi kiểm `RowsAffected`.",
            en: "Parse each field by hand with `c.PostForm` + `strconv`, using `*int` pointers to tell 'omitted' from '0'. Decrement stock inside `db.Transaction` + `UPDATE ... SET stock = stock - ? WHERE id = ? AND stock >= ?`, then check `RowsAffected`.",
          },
        },
        snippet: {
          file: "middleware/authorize.go",
          lang: "go",
          code: `func RequiredAuth(store AuthenStore, tp tokenprovider.Provider) func(*gin.Context) {
    return func(c *gin.Context) {
        token, err := extractToken(c.GetHeader("Authorization"))
        if err != nil { panic(err) }
        payload, err := tp.Validate(token)
        if err != nil { panic(err) }
        user, _ := store.FindUser(c.Request.Context(),
            map[string]interface{}{"id": payload.UserId()})
        c.Set(common.CurrentUser, user)
        c.Next()
    }
}`,
        },
      },
      {
        name: "gamePRU",
        privacy: "personal",
        stack: ["C#", "Unity"],
        blurb: {
          vi: "Game 2D đầu tay bằng Unity — nơi mình lần đầu gặp game loop và state machine.",
          en: "My first 2D game in Unity — where I first met the game loop and state machines.",
        },
        snippet: {
          file: "PlayerController.cs",
          lang: "csharp",
          code: `using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float speed = 5f;

    void Update() // runs every frame — the game loop
    {
        float h = Input.GetAxis("Horizontal");
        transform.Translate(Vector3.right * h * speed * Time.deltaTime);
    }
}`,
        },
      },
      {
        name: "Thriftly",
        privacy: "personal",
        stack: ["Java"],
        blurb: {
          vi: "Đồ án Java — luyện tư duy hướng đối tượng và kỷ luật kiểu dữ liệu.",
          en: "A Java project — practicing OOP and type discipline.",
        },
        snippet: {
          file: "Product.java",
          lang: "java",
          code: `public class Product {
    private final String name;
    private final double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public double discountedPrice(double percent) {
        return price * (1 - percent / 100);
    }
}`,
        },
      },
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
    intro: {
      vi: "E-commerce là nơi code gặp kinh doanh — và một bug không chỉ xấu UI, nó là tiền thật của người khác.",
      en: "E-commerce is where code meets business — and a bug isn't just ugly UI, it's someone's real money.",
    },
    story: {
      vi: [
        "Mình bắt đầu tử tế: dựng từ template Shopify chính chủ, học `authenticate.admin` + Polaris trên mock data trước khi làm thật.",
        "Cú sốc version: cùng một repo mà runtime `January25`, codegen `July25`, webhook `2026-04` — Shopify đổi API version như thay áo, phải học sống chung.",
        "Đau đầu database: port 5432 bị chiếm, migration kẹt — mình viết hẳn một file DATABASE_SETUP.md để lần sau (và người sau) đỡ khổ.",
        "Lên production thật — một monorepo gộp 11 Shopify app: webhook Shopify gửi trùng, và gửi cả sau khi app đã bị gỡ. Phải làm handler idempotent và trả 200 thật nhanh.",
        "Quy tắc vàng khắc trong đầu: KHÔNG bao giờ `migrate reset` hay `docker compose down -v` — 11 app share chung một database, một lệnh nhầm là mất sạch dữ liệu thật.",
      ],
      en: [
        "I started right: scaffolded from Shopify's official template, learned `authenticate.admin` + Polaris on mock data before going real.",
        "Version shock: one repo running `January25`, codegen `July25`, webhooks `2026-04` — Shopify rotates API versions like clothes, and you learn to live with it.",
        "Database headaches: port 5432 taken, migrations stuck — I wrote a whole DATABASE_SETUP.md so future-me (and others) suffer less.",
        "Real production — a monorepo of 11 Shopify apps: webhooks arrive duplicated, and even after the app is uninstalled. Handlers must be idempotent and return 200 fast.",
        "A golden rule burned into me: NEVER `migrate reset` or `docker compose down -v` — 11 apps share one database, and one wrong command wipes real data.",
      ],
    },
    lessons: [
      {
        title: { vi: "Test cả đường thất bại", en: "Test the failure paths too" },
        body: {
          vi: "Thanh toán lỗi, webhook trễ, mạng rớt — người dùng thật sẽ gặp hết. Đừng chỉ test 'happy path'.",
          en: "Failed payments, late webhooks, dropped networks — real users hit them all. Don't only test the happy path.",
        },
      },
      {
        title: { vi: "Webhook phải idempotent", en: "Webhooks must be idempotent" },
        body: {
          vi: "Shopify gửi at-least-once (trùng, và cả sau khi gỡ app). Kiểm tra tồn tại trước khi xử lý, trả 200 nhanh.",
          en: "Shopify delivers at-least-once (duplicates, even post-uninstall). Check existence before acting, return 200 fast.",
        },
      },
      {
        title: { vi: "Auth trước, luôn luôn", en: "Auth first, always" },
        body: {
          vi: "Mọi loader/action gọi `authenticate.admin(request)` trước; multi-tenant thì mọi query lọc theo `shopId`.",
          en: "Every loader/action calls `authenticate.admin(request)` first; for multi-tenancy, every query filters by `shopId`.",
        },
      },
      {
        title: { vi: "Migration khi nhiều app share DB", en: "Migrations when apps share a DB" },
        body: {
          vi: "Viết SQL idempotent (`IF NOT EXISTS`); `migrate deploy` một lần mỗi môi trường; tuyệt đối không reset.",
          en: "Write idempotent SQL (`IF NOT EXISTS`); `migrate deploy` once per environment; never reset.",
        },
      },
    ],
    tips: [
      {
        title: { vi: "API version đổi liên tục", en: "API versions change constantly" },
        body: {
          vi: "Shopify (và nhiều SaaS) đổi API version theo quý. Khoá version rõ ràng, nâng cấp có kế hoạch.",
          en: "Shopify (and many SaaS) rotate API versions quarterly. Pin versions explicitly, upgrade deliberately.",
        },
      },
      {
        title: { vi: "Ghi lại cách dựng môi trường", en: "Document your setup" },
        body: {
          vi: "Port bị chiếm, migration kẹt... viết một DATABASE_SETUP.md để mình-tương-lai đỡ khổ.",
          en: "Ports taken, migrations stuck... write a DATABASE_SETUP.md so future-you suffers less.",
        },
      },
    ],
    repos: [
      {
        name: "Monorepo 11 Shopify app (công ty)",
        privacy: "client",
        stack: ["Shopify", "Remix", "Prisma", "AWS"],
        commits: 1026,
        blurb: {
          vi: "Monorepo gộp 11 Shopify app (label maker, stock alert, pre-order...) share chung 1 Postgres + các package `shared-*`. Đồng tác giả — ẩn danh.",
          en: "A monorepo of 11 Shopify apps (label maker, stock alert, pre-order...) sharing one Postgres + `shared-*` packages. Co-authored — anonymized.",
        },
        commitsShown: [
          "fix(faq-page): accept test charges on dev stores + typed GraphQL split",
          "fix(cookie-banner): close 3 race conditions on save / update / seed paths",
          "fix(prisma): make rename-affected migrations idempotent",
        ],
        caseStudy: {
          challenge: {
            vi: "Webhook Shopify gửi nhiều lần và cả sau khi gỡ app (at-least-once); migration lặp làm vỡ deploy khi 11 app dùng chung 1 DB.",
            en: "Shopify webhooks fire multiple times, even post-uninstall (at-least-once); repeated migrations broke deploys when 11 apps share one DB.",
          },
          fix: {
            vi: "Handler idempotent: kiểm tra session tồn tại trước khi xoá, track fire-and-forget để trả 200 nhanh; viết migration SQL idempotent (`IF NOT EXISTS`).",
            en: "Idempotent handlers: check the session exists before deleting, fire-and-forget to return 200 fast; write idempotent SQL migrations (`IF NOT EXISTS`).",
          },
        },
        snippet: {
          file: "apps/label-maker/app/shopify.server.ts",
          lang: "ts",
          code: `const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.January25,
  sessionStorage: new CustomPrismaSessionStorage(),
  hooks: {
    afterAuth: async ({ session }) => {
      await ensureShopExists(session.shop, session, "LABEL_MAKER");
    },
  },
});`,
        },
      },
      {
        name: "xanh-learn-shopify",
        privacy: "personal",
        stack: ["Remix", "Shopify", "Polaris", "Prisma"],
        blurb: {
          vi: "Nơi mình tự học nền tảng Shopify: embedded app, Polaris, Prisma session. Chủ yếu mock data để tập kiến trúc.",
          en: "Where I self-taught Shopify: embedded app, Polaris, Prisma sessions. Mostly mock data to practice architecture.",
        },
        caseStudy: {
          challenge: {
            vi: "Dựng PostgreSQL + Prisma cho session (template gốc dùng SQLite); port 5432 bị chiếm, migration kẹt.",
            en: "Set up PostgreSQL + Prisma for sessions (the template used SQLite); port 5432 taken, migrations stuck.",
          },
          fix: {
            vi: "Đổi datasource sang Postgres qua docker-compose, đổi port khi bị chiếm, dùng `prisma migrate status/resolve`; luôn `authenticate.admin` trước trong loader/action.",
            en: "Switched the datasource to Postgres via docker-compose, changed ports on conflict, used `prisma migrate status/resolve`; always `authenticate.admin` first in loaders/actions.",
          },
        },
        snippet: {
          file: "app/routes/app.orders.tsx",
          lang: "ts",
          code: `export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin, session } = await authenticate.admin(request); // always auth FIRST
  // ... query Shopify Admin API qua admin.graphql(...)
  return json({ shop: session.shop });
};`,
        },
      },
      {
        name: "xanh-ecommerce",
        privacy: "personal",
        stack: ["JavaScript"],
        blurb: {
          vi: "Thử làm một shop online từ đầu — bản nháp đầu tiên trước khi biết tới Shopify.",
          en: "An attempt at an online shop from scratch — my first draft before discovering Shopify.",
        },
        snippet: {
          file: "cart.js",
          lang: "js",
          code: `// classic cart total with reduce
const cartTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.qty, 0);`,
        },
      },
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
    intro: {
      vi: "Những dự án lớn nhất, và bài học lớn nhất: viết code chạy được chỉ là mức sàn — viết code để người khác (và mình-6-tháng-sau) duy trì được mới là trưởng thành.",
      en: "The biggest projects, and the biggest lesson: making code run is only the floor — writing code others (and future-you) can maintain is what growing up means.",
    },
    story: {
      vi: [
        "Lần đầu mở một monorepo công ty — web, mobile, backend nằm chung một chỗ, `turbo.json` với `dependsOn: ['^build']` nhìn như tiếng nước ngoài. Cảm giác nhỏ bé trước một hệ thống thật.",
        "Cái ngày CI đỏ lòm vì mình: push code, GitHub Actions báo 403 khi push tag; hoá ra thiếu `permissions: contents: write`. Rồi test tự dưng fail vì DatePicker phụ thuộc ngày giờ hệ thống — mình học cách freeze thời gian trong test.",
        "Bài học Git bằng máu: ở một dự án khác, commit tên `update` nhét luôn cả `node_modules`, còn `src/` code thật thì biến mất chỉ còn `dist/`. Từ đó `.gitignore` là việc đầu tiên của mọi dự án.",
        "Làm cho người mình thương: website cưới của chính mình — vật lộn với nhạc bị chặn autoplay, deploy GitHub Pages trắng trang vì quên `base`. Nhưng lần đầu tách data ra file riêng và thấy code sạch hẳn — 'à, mình bắt đầu nghĩ như dev thật'.",
        "Mình nhận ra: viết code chạy được là mức sàn. Viết code để người khác đọc hiểu, mở rộng, duy trì được — đó mới là trưởng thành. Và chương này vẫn đang được viết tiếp.",
      ],
      en: [
        "Opening a company monorepo for the first time — web, mobile, backend all in one place, `turbo.json` with `dependsOn: ['^build']` looked like a foreign language. I felt tiny before a real system.",
        "The day CI went red because of me: I pushed, GitHub Actions threw 403 pushing a tag; turns out I lacked `permissions: contents: write`. Then a test failed because a DatePicker depended on the system clock — I learned to freeze time in tests.",
        "A Git lesson in blood: on another project, an `update` commit swallowed `node_modules`, while the real `src/` vanished leaving only `dist/`. Since then `.gitignore` is the first thing in every project.",
        "Building for someone I love: my own wedding site — fighting blocked audio autoplay, a blank GitHub Pages deploy from a missing `base`. But separating data into its own file for the first time felt clean — 'ah, I'm starting to think like a real dev'.",
        "I realized: making code run is the floor. Writing code others can read, extend, maintain — that's growing up. And this chapter is still being written.",
      ],
    },
    lessons: [
      {
        title: { vi: "Viết cho người đọc sau bạn", en: "Write for the next reader" },
        body: {
          vi: "6 tháng sau, 'người khác' đọc code của bạn chính là bạn. Tách god-service thành domain service, đặt tên rõ ràng.",
          en: "In 6 months, the 'someone else' reading your code is you. Split god-services into focused domains, name things clearly.",
        },
      },
      {
        title: { vi: "Git hooks bắt lỗi trước CI", en: "Git hooks catch bugs before CI" },
        body: {
          vi: "Husky `pre-commit` chạy lint-staged, `pre-push` chạy typecheck + test. Ít khi làm đỏ CI của cả nhóm.",
          en: "Husky `pre-commit` runs lint-staged, `pre-push` runs typecheck + tests. You rarely turn the team's CI red.",
        },
      },
      {
        title: { vi: "`.gitignore` là việc đầu tiên", en: "`.gitignore` comes first" },
        body: {
          vi: "`node_modules/ dist/ .env` ngay từ commit đầu. Và đừng bao giờ đặt tên commit là 'update'.",
          en: "`node_modules/ dist/ .env` from commit one. And never name a commit 'update'.",
        },
      },
      {
        title: { vi: "Một nguồn dữ liệu duy nhất", en: "A single source of truth" },
        body: {
          vi: "Data viết ở 2 nơi chắc chắn sẽ lệch. Gom về `src/data/` rồi import khắp nơi.",
          en: "Data written in two places will drift. Keep it in `src/data/` and import it everywhere.",
        },
      },
    ],
    tips: [
      {
        title: { vi: "Test đừng phụ thuộc thời gian thật", en: "Don't let tests depend on real time" },
        body: {
          vi: "DatePicker / ngày giờ → freeze (pin) thời gian trong test, nếu không hôm nay pass mai fail.",
          en: "DatePicker / dates → freeze (pin) time in tests, or it passes today and fails tomorrow.",
        },
      },
      {
        title: { vi: "Deploy static nhớ set `base`", en: "Static deploys need `base`" },
        body: {
          vi: "GitHub Pages chạy ở subpath `/tên-repo/`; quên `base` là CSS/JS/ảnh 404 hết.",
          en: "GitHub Pages runs under `/repo-name/`; forget `base` and your CSS/JS/images all 404.",
        },
      },
    ],
    repos: [
      {
        name: "Monorepo sản phẩm (công ty)",
        privacy: "client",
        stack: ["TypeScript", "Turborepo", "NestJS", "React Native"],
        commits: 748,
        blurb: {
          vi: "Monorepo gộp app mobile + web dashboard + backend + package `shared` (types/zod/API client). Turborepo cache & build song song. Ẩn danh.",
          en: "A monorepo of a mobile app + web dashboard + backend + a `shared` package (types/zod/API client). Turborepo caching & parallel builds. Anonymized.",
        },
        commitsShown: [
          "fix(ci): grant contents:write so Android workflows can push release tags",
          "fix(web): pin system time in tests so DatePicker cases are deterministic",
          "refactor(backend): split TaskService god-service into focused domain services",
        ],
        caseStudy: {
          challenge: {
            vi: "CI báo 403 khi push git tag để release (thiếu quyền workflow); test 'flaky' vì DatePicker phụ thuộc ngày giờ hệ thống.",
            en: "CI threw 403 pushing a release tag (missing workflow permission); flaky tests because a DatePicker depended on the system clock.",
          },
          fix: {
            vi: "Cấp `permissions: contents: write` cho workflow; freeze thời gian hệ thống trong test. Turborepo cache + chỉ build phần đổi bằng `--filter`.",
            en: "Grant `permissions: contents: write`; freeze system time in tests. Turborepo caches and builds only what changed via `--filter`.",
          },
        },
        snippet: {
          file: "turbo.json",
          lang: "json",
          code: `{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**"]
    },
    "dev": { "cache": false, "persistent": true },
    "test": { "dependsOn": ["^build"] }
  }
}`,
        },
      },
      {
        name: "natural_Disaster_Response",
        privacy: "personal",
        stack: ["Express", "MongoDB", "Zod"],
        blurb: {
          vi: "Hệ thống điều phối ứng cứu thiên tai: báo sự cố theo toạ độ, reverse-geocode, điều phối lực lượng. Cũng là 'hiện trường' của một bài học Git đau thương.",
          en: "A disaster-response coordination system: geo-tagged incidents, reverse-geocoding, dispatch. Also the scene of a painful Git lesson.",
        },
        commitsShown: ["update", "feat: initialize backend with core API structure", "Initial commit"],
        caseStudy: {
          challenge: {
            vi: "Commit tên `update` lỡ nhét cả `node_modules`/`dist` vào git (2000+ file), còn `src/` code thật thì biến mất chỉ còn bản build.",
            en: "An `update` commit accidentally swallowed `node_modules`/`dist` (2000+ files), while the real `src/` vanished leaving only the build.",
          },
          fix: {
            vi: "Đặt `.gitignore` (`node_modules/ dist/ .env`) ngay từ commit đầu; validate input ở backend bằng zod trước khi đụng DB.",
            en: "Add `.gitignore` (`node_modules/ dist/ .env`) from the first commit; validate input on the backend with zod before touching the DB.",
          },
        },
        snippet: {
          file: "src/controllers/incident.controller.ts",
          lang: "ts",
          code: `const createIncidentSchema = z.object({
  reporterName: z.string().min(2),
  location: z.object({
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  }),
  description: z.string().min(5),
});`,
        },
      },
      {
        name: "online_Wedding",
        privacy: "personal",
        stack: ["React", "Vite", "Framer Motion"],
        commits: 3,
        blurb: {
          vi: "Thiệp cưới online của chính mình: đếm ngược, nhạc nền, RSVP. Nơi mình lần đầu 'nghĩ như dev thật'.",
          en: "My own online wedding invite: countdown, background music, RSVP. Where I first 'thought like a real dev'.",
        },
        commitsShown: ["feat: build wedding invitation website", "feat: add GitHub Pages deployment", "Initial commit"],
        caseStudy: {
          challenge: {
            vi: "Nhạc nền bị trình duyệt chặn autoplay; deploy GitHub Pages trắng trang vì sai `base`.",
            en: "The browser blocked audio autoplay; the GitHub Pages deploy was blank due to a wrong `base`.",
          },
          fix: {
            vi: "Chỉ `.play()` sau khi user bấm 'Enter' + `.catch()` nuốt lỗi; set `base: '/online_Wedding/'` trong `vite.config.ts` và dùng `import.meta.env.BASE_URL` cho asset.",
            en: "Only `.play()` after the user clicks 'Enter' + `.catch()` to swallow errors; set `base: '/online_Wedding/'` in `vite.config.ts` and use `import.meta.env.BASE_URL` for assets.",
          },
        },
        snippet: {
          file: "src/hooks/use-countdown.ts",
          lang: "ts",
          code: `export function useCountdown(target: string): CountdownTime {
  const [time, setTime] = useState(calculate(target));
  useEffect(() => {
    const id = setInterval(() => setTime(calculate(target)), 1000);
    return () => clearInterval(id); // clean up on unmount
  }, [target]);
  return time;
}`,
        },
      },
      {
        name: "Lifelines",
        privacy: "personal",
        stack: ["React", "R3F", "Redux", "WebXR"],
        commits: 2,
        blurb: {
          vi: "Bảo tàng ký ức số: quét ảnh cũ (AR) để nghe lại giọng người thân. Kiến trúc feature-based + atomic design.",
          en: "A digital memory museum: scan old photos (AR) to hear loved ones' voices. Feature-based + atomic design.",
        },
        commitsShown: ["feat: implement Lifelines digital memory museum website", "Initial commit"],
        caseStudy: {
          challenge: {
            vi: "Nhồi cả app vào 1 commit (không review/rollback được); dữ liệu `memories` viết cứng ở 2 nơi → lệch.",
            en: "The whole app in one commit (no review/rollback); `memories` data hardcoded in two places → drift.",
          },
          fix: {
            vi: "Commit nhỏ, atomic; gom data về `src/data/` một nguồn duy nhất; tôn trọng `prefers-reduced-motion` và xử lý khi thiết bị không hỗ trợ AR.",
            en: "Small atomic commits; consolidate data into a single `src/data/` source; respect `prefers-reduced-motion` and handle devices without AR.",
          },
        },
        snippet: {
          file: "src/utils/cn.ts",
          lang: "ts",
          code: `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}`,
        },
      },
    ],
  },
];

export const getChapter = (id: string) => chapters.find((c) => c.id === id);
