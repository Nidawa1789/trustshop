import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [categories, brands] = await Promise.all([
      client.fetch(
        `*[_type == 'category'] | order(title asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`,
        {},
        { next: { revalidate: 0 } },
      ),
      client.fetch(`*[_type == 'brand'] | order(title asc)`, {}, { next: { revalidate: 0 } }),
    ]);

    return NextResponse.json({ categories, brands });
  } catch (error) {
    console.error("Error fetching shop filters:", error);
    return NextResponse.json({ error: "Error fetching shop filters" }, { status: 500 });
  }
}
