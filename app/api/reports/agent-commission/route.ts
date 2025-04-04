import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const agencyId = searchParams.get("agencyId");
    // const startDate = searchParams.get("startDate");
    // const endDate = searchParams.get("endDate");
    const supplierId = searchParams.get("supplierId");

    if (!agencyId && !supplierId) {
      return NextResponse.json(
        { error: "Agency ID & Supplier ID is required" },
        { status: 400 }
      );
    }

    console.log("Agency ID:", agencyId);
    console.log("Supplier ID:", supplierId);

    // return NextResponse.json({ message: "request received" }, { status: 200 });

    const payments = await prisma.payment.findMany({
      where: {
        agencyId: agencyId ? parseInt(agencyId) : undefined,
        billEntry: {
          supplierId: supplierId ? parseInt(supplierId) : undefined,
          //   billDate: {
          //     gte: startDate ? new Date(startDate) : undefined,
          //     lte: endDate ? new Date(endDate) : undefined,
          //   },
        },
      },
      include: {
        billEntry: {
          include: {
            supplier: true,
            customer: true,
          },
        },
        agentCommission: true,
      },
    });

    if (payments.length === 0) {
      return NextResponse.json(
        { message: "No payments found for the given period" },
        { status: 404 }
      );
    }
    return NextResponse.json({ report: payments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching commission report:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
