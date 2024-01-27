import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <div>
      <Button size="4">
        <Pencil2Icon />
        <Link href={`/issues/${issueId}/Edit`}>Edit Issue</Link>
      </Button>
    </div>
  );
};

export default EditIssueButton;
