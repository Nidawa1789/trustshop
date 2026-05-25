import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const addresses = await client.fetch(
      `*[_type == "address"] | order(createdAt desc)`,
      {},
      { next: { revalidate: 0 } },
    );

    return NextResponse.json(addresses);
  } catch (error) {
    console.error("Error fetching addresses:", error);
    return NextResponse.json({ error: "Error fetching addresses" }, { status: 500 });
  }
}
