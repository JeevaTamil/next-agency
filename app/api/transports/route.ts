import { transportSchema } from "@/app/zod-schema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const valiation = transportSchema.safeParse(body);
  if (!valiation.success) {
    return NextResponse.json(
      { error: valiation.error.errors },
      { status: 400 }
    );
  }

  const transport = await prisma.transport.create({
    data: body,
  });

  return NextResponse.json(
    { message: "Transport Created", data: transport },
    { status: 201 }
  );
}

export async function GET() {
  try {
    const transports = await prisma.transport.findMany(); // ✅ Fetch all transports
    return NextResponse.json({ data: transports }, { status: 200 });
  } catch (error) {
    console.error("Error fetching transports:", error);
    return NextResponse.json(
      { error: "Failed to fetch transports" },
      { status: 500 }
    );
  }
}
