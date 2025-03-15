import { bankSchema } from "@/app/zod-schema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = bankSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  try {
    const bank = await prisma.bank.create({
      data: body,
    });
    return NextResponse.json({ data: bank }, { status: 200 });
  } catch (error) {
    console.error(`error: ${error}`);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const banks = await prisma.bank.findMany(); // ✅ Fetch all banks
    return NextResponse.json({ data: banks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching banks:", error);
    return NextResponse.json(
      { error: "Failed to fetch banks" },
      { status: 500 }
    );
  }
}
