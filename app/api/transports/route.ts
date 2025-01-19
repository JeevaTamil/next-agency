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
