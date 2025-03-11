import { debitNoteSchema } from "@/app/zod-schema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  const validation = debitNoteSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const debitNote = await prisma.debitNote.create({
    data: body,
  });

  return NextResponse.json(
    { message: "debitNote request added" },
    { status: 201 }
  );
}
