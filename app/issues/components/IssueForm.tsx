"use client";
import axios from "axios";
import { z } from "zod";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaExclamationTriangle } from "react-icons/fa";
import { IssueSchema } from "@/app/validationSchemas";
import { TextField, Button, Callout } from "@radix-ui/themes";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root className="mb-10">
          <Callout.Icon className="text-red-500">
            <FaExclamationTriangle />
          </Callout.Icon>
          <Callout.Text className="text-red-500">{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className="space-y-10"
        onSubmit={handleSubmit(async (data) => {
          try {
            setLoading(true);
            if (issue) await axios.patch("/api/issues/" + issue.id, data);
            else await axios.post("/api/issues", data);
            router.push("/issues");
            router.refresh();
          } catch (error) {
            setLoading(false);
            setError("An Unexpected Error Occurred");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button size={"4"} disabled={isLoading}>
          {issue ? "Update Issue" : "Submit New Issue"}{" "}
          {isLoading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
