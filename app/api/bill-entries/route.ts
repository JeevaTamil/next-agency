import { billEntrySchema } from "@/app/zod-schema";
import { prisma, prismaExt } from "@/prisma/client";
import { format } from "date-fns";
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

    // Save the bill entry
    const billEntry = await prisma.billEntry.create({
      data: body,
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

      return {
        ...b,
        //billDate: format(new Date(b.billDate), "dd/MM/yyyy"),
        //lrDate: format(new Date(b.lrDate), "dd/MM/yyyy"),
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
