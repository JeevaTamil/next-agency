import { agentCommissionSchema } from "@/app/zod-schema";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    const body = await request.json();
      console.log(body);
    
      const validation = agentCommissionSchema.safeParse(body);
    
      if (!validation.success) {
        return NextResponse.json(
          { error: validation.error.errors },
          { status: 400 }
        );
      }
    
      const agenctCommission = await prisma.agentCommission.create({
        data: body,
      });
    
      return NextResponse.json(
        { message: "Agenct Commission request added" },
        { status: 201 }
      );

}