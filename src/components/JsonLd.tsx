// Chèn dữ liệu có cấu trúc (JSON-LD) cho SEO. Render trên server, 0 chi phí client.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Dữ liệu do mình kiểm soát (không phải input người dùng) -> an toàn.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
