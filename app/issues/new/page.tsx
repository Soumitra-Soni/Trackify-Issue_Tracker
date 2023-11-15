"use client";
import axios from "axios";
import { z } from "zod";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaExclamationTriangle } from "react-icons/fa";
import { createIssueSchema } from "@/app/validationSchemas";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
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
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An Unexpected Error Occurred");
          }
        })}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        {errors.title && (
          <Text as="p" className="text-red-500">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text as="p" className="text-red-500">
            {errors.description.message}
          </Text>
        )}

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
