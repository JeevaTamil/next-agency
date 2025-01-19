import { billEntrySchema } from "@/app/zod-schema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate the request body
  const valdation = billEntrySchema.safeParse(body);
  if (!valdation.success) {
    return NextResponse.json({
      status: 400,
      body: {
        message: valdation.error.errors,
      },
    });
  }

  // Save the bill entry
  const billEntry = await prisma.billEntry.create({
    data: body,
  });
  return NextResponse.json(
    {
      message: "Bill entry created successfully",
      data: billEntry,
    },
    {
      status: 201,
    }
  );
}
