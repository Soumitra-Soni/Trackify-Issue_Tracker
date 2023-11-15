"use client";
import React from "react";
import { TextField, Button, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import { FaExclamationTriangle } from "react-icons/fa";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const { register, control, handleSubmit } = useForm<IssueForm>();
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
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
