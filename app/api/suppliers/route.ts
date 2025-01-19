import { supplierSchema } from "@/app/zod-schema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = supplierSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  }

  const supplier = await prisma.supplier.create({
    data: body,
  });

  return NextResponse.json(
    { message: "Supplier Created", data: supplier },
    { status: 201 }
  );
}
