import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssuesSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createIssuesSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const newIssues = await prisma.issues.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newIssues, { status: 201 });
}
