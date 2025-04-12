import { customerSchema } from "@/app/zod-schema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = customerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }

    // ✅ Ensure `agencyId` is included
    if (!body.agencyId) {
      return NextResponse.json(
        { error: "Agency ID is required" },
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
  } catch (error) {
    console.error("Error creating customer: ", error);
    return NextResponse.json(
      { error: "Failed to create customer: " + error },
      { status: 500 }
    );
  }
}

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

    const customers = await prisma.customer.findMany({
      where: { agencyId: Number(agencyId) }, // ✅ Filter by agency
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
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    const updatedCustomer = await prisma.customer.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(
      { message: "Customer Updated", data: updatedCustomer },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating customer:", error);
    return NextResponse.json(
      { error: "Failed to update customer" },
      { status: 500 }
    );
  }
}

// ✅ Delete (DELETE) operation
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Customer ID is required" },
        { status: 400 }
      );
    }

    await prisma.customer.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Customer Deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return NextResponse.json(
      { error: "Failed to delete customer" },
      { status: 500 }
    );
  }
}
