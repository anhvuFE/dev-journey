import { notFound } from "next/navigation";

// Bắt mọi đường dẫn không khớp trong [locale] -> render trang 404 (not-found.tsx)
export default function CatchAll() {
  notFound();
}
