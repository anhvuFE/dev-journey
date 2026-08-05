export type Locale = "vi" | "en";

export interface AboutCopy {
  back: string;
  kicker: string;
  body: string[];
  skillsLabel: string;
  connectLabel: string;
  stats: { n: string; l: string }[];
}

export const aboutCopy: Record<Locale, AboutCopy> = {
  vi: {
    back: "Về trang chủ",
    kicker: "Về mình",
    body: [
      "Mình là Vũ Xuân Anh, một Full Stack Developer vẫn đang học mỗi ngày. Trang này gom lại gần như tất cả những gì mình từng gõ ra: từ mấy trang HTML ngây ngô đầu tiên, tới các dự án full-stack cho khách hàng thật.",
      "Mình không phải thiên tài lập trình. Mình chỉ làm nhiều, sai nhiều, và ghi lại. Nếu bạn là newbie, hy vọng hành trình này khiến bạn thấy: ai cũng bắt đầu từ số 0.",
    ],
    skillsLabel: "Mình làm việc với",
    connectLabel: "Kết nối với mình",
    stats: [
      { n: "60+", l: "dự án" },
      { n: "7.000+", l: "commit" },
      { n: "8+", l: "ngôn ngữ" },
      { n: "2022→nay", l: "hành trình" },
    ],
  },
  en: {
    back: "Back home",
    kicker: "About",
    body: [
      "I'm Vũ Xuân Anh, a Full Stack Developer still learning every day. This page gathers almost everything I've ever typed out: from my first naive HTML pages to full-stack projects for real clients.",
      "I'm no coding genius. I just build a lot, break a lot, and write it down. If you're a beginner, I hope this journey shows you that everyone starts at zero.",
    ],
    skillsLabel: "I work with",
    connectLabel: "Connect with me",
    stats: [
      { n: "60+", l: "projects" },
      { n: "7,000+", l: "commits" },
      { n: "8+", l: "languages" },
      { n: "2022→now", l: "the journey" },
    ],
  },
};
