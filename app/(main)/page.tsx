import { Carousel } from "@/components/UI/Carousel";
import { env } from "@/lib/env";

export default async function Home() {
  const productsRes = await fetch(`${env.API_URL}/products`);
  const products = await productsRes.json();
  return <Carousel items={products} />;
}
