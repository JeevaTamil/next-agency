import { paymentSchema } from "@/app/zod-schema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const validation = body.safeParse(paymentSchema);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const paymentVoucher = await prisma.payment.create({
    data: body,
  });

  return NextResponse.json(
    { message: "Payment request added" },
    { status: 200 }
  );
}
