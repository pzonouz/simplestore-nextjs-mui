export default function myImageLoader({ src, width, quality }) {
  const imageHost = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost/";
  return `${imageHost}/${src}`;
}
