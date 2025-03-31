import { paymentSchema } from "@/app/zod-schema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  console.log(body);

  const validation = paymentSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const paymentVoucher = await prisma.payment.create({
    data: body,
  });

  const billEntry = await prisma.billEntry.findUnique({
    where: {
      id: body.billEntryId,
    },
    include: {
      supplier: true,
    },
  });

  if (billEntry != null) {
    const commissionAmount =
      (paymentVoucher.transactionAmount -
        paymentVoucher.transactionAmount * 0.04762) *
      (parseFloat(billEntry.supplier.commission) / 100);
    const paymentId = paymentVoucher.id;
    const date = new Date(paymentVoucher.date);
    const agencyId = billEntry.agencyId;

    const agentCommission = await prisma.agentCommission.create({
      data: {
        paymentId,
        date,
        agencyId,
        commissionAmount,
      },
    });
    console.log("Agent commission created:", agentCommission);
  }

  return NextResponse.json(
    { message: "Payment request added", data: paymentVoucher },
    { status: 201 }
  );
}
