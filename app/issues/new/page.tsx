"use client";
import React from "react";
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
<<<<<<< HEAD
  const { register, control, handleSubmit } = useForm<IssueForm>();
  return (
    <form
      className="max-w-xl space-y-10"
      onSubmit={handleSubmit((data) => console.log(data))}
=======
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  console.log(register);
  return (
    <form
      className="max-w-xl space-y-10"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
>>>>>>> 4749fc8f94a47414d41e23f9d5b175fe23a71a78
    >
      <TextField.Root>
        <TextField.Input placeholder="Title" {...register("title")} />
      </TextField.Root>
      <Controller
        name="description"
        control={control}
<<<<<<< HEAD
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
=======
        render={(feild) => <SimpleMDE placeholder="Description" {...feild} />}
      />

>>>>>>> 4749fc8f94a47414d41e23f9d5b175fe23a71a78
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
