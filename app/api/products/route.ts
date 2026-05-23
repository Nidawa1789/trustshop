import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const variant = searchParams.get("variant");

  if (!variant) {
    return NextResponse.json({ error: "Missing variant parameter" }, { status: 400 });
  }

  try {
    const products = await client.fetch(
      `*[_type == "product" && variant == $variant] | order(name asc) {
        ...,
        "categories": categories[]->title
      }`,
      { variant },
      { next: { revalidate: 0 } },
    );

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 });
  }
}
