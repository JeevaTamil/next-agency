import { supplierSchema } from "@/app/zod-schema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = supplierSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }

    // ✅ Ensure `agencyId` is included in the request
    if (!body.agencyId) {
      return NextResponse.json(
        { error: "Agency ID is required" },
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
  } catch (error) {
    console.error("Error creating supplier:", error);
    return NextResponse.json(
      { error: "Failed to create supplier" },
      { status: 500 }
    );
  }
}

// ✅ New GET route to fetch suppliers by `agencyId`
export async function GET(request: NextRequest) {
  try {
    // ✅ Extract `agencyId` from request query
    const { searchParams } = new URL(request.url);
    const agencyId = searchParams.get("agencyId");

    if (!agencyId) {
      return NextResponse.json(
        { error: "Agency ID is required" },
        { status: 400 }
      );
    }

    const suppliers = await prisma.supplier.findMany({
      where: { agencyId: Number(agencyId) }, // ✅ Filter by agency
    });

    return NextResponse.json({ data: suppliers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return NextResponse.json(
      { error: "Failed to fetch suppliers" },
      { status: 500 }
    );
  }
}
