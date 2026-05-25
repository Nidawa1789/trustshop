import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const variant = searchParams.get("variant");
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const price = searchParams.get("price");

  try {
    let minPrice = 0;
    let maxPrice = 10000;

    if (price) {
      const [min, max] = price.split("-").map(Number);
      minPrice = Number.isFinite(min) ? min : minPrice;
      maxPrice = Number.isFinite(max) ? max : maxPrice;
    }

    const products = await client.fetch(
      `*[_type == "product"
        && (!defined($variant) || variant == $variant)
        && (!defined($category) || references(*[_type == "category" && slug.current == $category]._id))
        && (!defined($brand) || references(*[_type == "brand" && slug.current == $brand]._id))
        && (!defined($price) || (price >= $minPrice && price <= $maxPrice))
      ] | order(name asc) {
        ...,
        "categories": categories[]->title
      }`,
      { variant, category, brand, price, minPrice, maxPrice },
      { next: { revalidate: 0 } },
    );

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}
