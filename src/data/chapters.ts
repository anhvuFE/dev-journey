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
  if (typeof window === "undefined") return false; // an toàn khi SSR
  try {
    const seen = localStorage.getItem(INTRO_SEEN_KEY);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    return !seen && !reduced;
  } catch {
    return false; // incognito có thể ném lỗi
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
// dev: dùng lại một client toàn cục để không rò rỉ kết nối khi hot-reload
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
          code: `// mỗi item mang metadata thời gian để tối ưu & debug re-render
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
      return apiRequest(endpoint, options, retryCount + 1); // gọi lại
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
    once  sync.Once // chặn close/send đồng thời -> hết panic
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
      },
      {
        name: "Thriftly",
        privacy: "personal",
        stack: ["Java"],
        blurb: {
          vi: "Đồ án Java — luyện tư duy hướng đối tượng và kỷ luật kiểu dữ liệu.",
          en: "A Java project — practicing OOP and type discipline.",
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
