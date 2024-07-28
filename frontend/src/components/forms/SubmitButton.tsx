"use client";

import { Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function SubmitButton({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full disabled:bg-neutral-100 disabled:text-neutral-800 bg-neutral-950 text-neutral-50"
    >
      {pending && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </Button>
  );
}
