import { billEntrySchema } from "@/app/zod-schema";
import { prisma, prismaExt } from "@/prisma/client";
import { format } from "date-fns";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Validate the request body
  const valdation = billEntrySchema.safeParse(body);
  if (!valdation.success) {
    return NextResponse.json({
      status: 400,
      body: {
        message: valdation.error.errors,
      },
    });
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
    {
      status: 201,
    }
  );
}
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const customerId = searchParams.get("customerId");

  const whereClause = customerId ? { customerId: parseInt(customerId) } : {};

  const billEntries = await prismaExt.billEntry.findMany({
    where: whereClause,
    include: {
      customer: {
        select: {
          id: true,
          name: true,
        },
      },
      supplier: {
        select: {
          id: true,
          name: true,
        },
      },
      transport: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  const billEntriesFinal = billEntries.map((b) => ({
    ...b,
    billDate: format(new Date(b.billDate), "dd/MM/yyyy"),
    lrDate: format(new Date(b.lrDate), "dd/MM/yyyy"),
  }));

  return NextResponse.json(
    {
      data: billEntriesFinal,
    },
    { status: 200 }
  );
}
