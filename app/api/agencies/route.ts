import { agencySchema } from "@/app/zod-schema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = agencySchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  try {
    const agency = await prisma.agency.create({
      data: body,
    });
    return NextResponse.json({ data: agency }, { status: 200 });
  } catch (error) {
    console.error(`error: ${error}`);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET() {
  const agencies = await prisma.agency.findMany();
  return NextResponse.json({ data: agencies }, { status: 200 });
}
