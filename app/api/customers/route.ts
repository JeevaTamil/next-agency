import { customerSchema } from "@/app/zod-schema";
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

  return NextResponse.json(
    { message: "Customer Created", data: customer },
    { status: 201 }
  );
}

export async function GET() {
  const customers = await prisma.customer.findMany({
    include: {
      bills: true,
    },
  });

  return NextResponse.json(
    {
      data: customers,
    },
    { status: 200 }
  );
}
