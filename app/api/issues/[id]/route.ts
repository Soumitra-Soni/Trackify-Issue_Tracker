import { IssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { error } from "console";
import { NextResponse } from "next/server";

export async function PATCH(
  request: NextResponse,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const valiation = IssueSchema.safeParse(body);
  if (!valiation.success) {
    return NextResponse.json(valiation.error.format(), {
      status: 400,
    });
  }
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue);
}
