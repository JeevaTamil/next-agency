import { billEntrySchema } from "@/app/zod-schema";
import { prisma, prismaExt } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validation = billEntrySchema.safeParse(body);
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

    // ✅ Get the current financial year (April to March)
    const now = new Date();
    const currentYear = now.getFullYear();
    const financialYear =
      now.getMonth() + 1 >= 4 ? currentYear % 100 : (currentYear - 1) % 100; // Example: 2024 → "24"

    // ✅ Find the last billId for this financial year
    const lastBill = await prisma.billEntry.findFirst({
      where: {
        billId: { startsWith: `${financialYear}/` },
      },
      orderBy: { id: "desc" }, // Get latest bill
    });

    // ✅ Get the next incremental number
    const nextNumber = lastBill
      ? parseInt(lastBill.billId.split("/")[1]) + 1
      : 1;
    const newBillId = `${financialYear}/${nextNumber}`; // ✅ Format: "24/1", "24/2"

    // Save the bill entry
    const billEntry = await prisma.billEntry.create({
      data: {
        ...body,
        billId: newBillId, // ✅ Assign custom ID
      },
    });

    return NextResponse.json(
      {
        message: "Bill entry created successfully",
        data: billEntry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating bill entry:", error);
    return NextResponse.json(
      { error: "Failed to create bill entry" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const agencyId = searchParams.get("agencyId");
    const customerId = searchParams.get("customerId");
    const supplierId = searchParams.get("supplierId");

    if (!agencyId) {
      return NextResponse.json(
        { error: "Agency ID is required" },
        { status: 400 }
      );
    }

    // ✅ Add `agencyId` to the filter
    const whereClause = {
      agencyId: Number(agencyId),
      ...(customerId ? { customerId: Number(customerId) } : {}),
      ...(supplierId ? { supplierId: Number(supplierId) } : {}),
    };

    const billEntries = await prismaExt.billEntry.findMany({
      where: whereClause, // ✅ Filter by agencyId
      include: {
        customer: true,
        supplier: true,
        transport: true,
        payments: true,
      },
    });

    const billEntriesFinal = billEntries.map((b) => {
      const unPaidAmount =
        b.grossAmount -
        b.payments.reduce((sum, p) => sum + p.transactionAmount, 0);

      const taxAmount = parseFloat((b.grossAmount * (5 / 100)).toFixed(2));

      return {
        ...b,
        taxAmount,
        unPaidAmount,
      };
    });

    return NextResponse.json(
      {
        data: billEntriesFinal,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching bill entries:", error);
    return NextResponse.json(
      { error: "Failed to fetch bill entries" },
      { status: 500 }
    );
  }
}
