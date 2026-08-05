// Theo dõi số chương đã đọc (lưu localStorage, phát sự kiện để header cập nhật).
export const READ_KEY = "dj:chaptersRead";
export const READ_EVENT = "dj:read";

export function readChaptersRead(): Set<string> {
  try {
    const a = JSON.parse(localStorage.getItem(READ_KEY) || "[]");
    return new Set(Array.isArray(a) ? (a as string[]) : []);
  } catch {
    return new Set();
  }
}

export function markChapterRead(id: string) {
  const set = readChaptersRead();
  if (set.has(id)) return;
  set.add(id);
  localStorage.setItem(READ_KEY, JSON.stringify([...set]));
  window.dispatchEvent(new Event(READ_EVENT));
}
