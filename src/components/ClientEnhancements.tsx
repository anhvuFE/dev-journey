"use client";

import dynamic from "next/dynamic";

// Các widget "trang trí/tăng cường" — không cần cho first paint nên nạp động
// sau khi hydrate (tách khỏi bundle ban đầu, giảm JS phải tải/parse lúc đầu).
const NeonCursor = dynamic(() => import("./NeonCursor"), { ssr: false });
const CommandPalette = dynamic(() => import("./CommandPalette"), { ssr: false });
const TerminalEasterEgg = dynamic(() => import("./TerminalEasterEgg"), { ssr: false });
const BackToTop = dynamic(() => import("./BackToTop"), { ssr: false });
const ReaderAchievement = dynamic(() => import("./ReaderAchievement"), { ssr: false });
const ShortcutsHelp = dynamic(() => import("./ShortcutsHelp"), { ssr: false });

export default function ClientEnhancements() {
  return (
    <>
      <NeonCursor />
      <CommandPalette />
      <TerminalEasterEgg />
      <BackToTop />
      <ReaderAchievement />
      <ShortcutsHelp />
    </>
  );
}
