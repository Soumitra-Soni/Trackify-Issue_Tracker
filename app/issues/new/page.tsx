"use client";
import React from "react";
import { TextField } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-10">
      <TextField.Root>
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextField.Input placeholder="Description" className="h-10" />

      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
