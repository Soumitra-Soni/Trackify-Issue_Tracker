import IssueForm from "../components/IssueForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  // Ensure that params.id is provided
  if (!params.id) {
    // Handle the case where id is missing, e.g., redirect or show an error
    return <div>Error: Issue ID is missing.</div>;
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
