import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  params: {
    params: { id: string };
  }
) {
  const billEntry = await prisma.billEntry.findUnique({
    where: {
      id: parseInt(params.params.id),
    },
    include: {
      customer: {
        select: {
          name: true,
        },
      },
      supplier: {
        select: {
          name: true,
        },
      },
      transport: {
        select: {
          name: true,
        },
      },
    },
  });

  if (billEntry !== null) {
    return NextResponse.json({ data: billEntry }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "No entry found with the id" },
      { status: 400 }
    );
  }
}
