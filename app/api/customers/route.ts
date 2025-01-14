import { customerSchema } from "@/app/customer-schema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = customerSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const customer = await prisma.customer.create({
    data: body,
  });

  return NextResponse.json(customer, { status: 201 });
}
