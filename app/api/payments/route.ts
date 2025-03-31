import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const agencyId = searchParams.get("agencyId");

    if (!agencyId) {
      return NextResponse.json(
        { error: "Agency ID is required" },
        { status: 400 }
      );
    }

    const payments = await prisma.payment.findMany({
      where: {
        agencyId: parseInt(agencyId),
      },
      include: {
        billEntry: {
          include: {
            supplier: true,
          },
        },
      },
    });

    if (payments.length === 0) {
      return NextResponse.json(
        { message: "No payments found for the given period" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Agent commission report fetched successfully",
        data: payments,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching agent commission report:", error);
    return NextResponse.json(
      { error: "Failed to fetch agent commission report" },
      { status: 500 }
    );
  }
}
