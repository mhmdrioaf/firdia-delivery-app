"use client";

import { Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface ISubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function SubmitButton({
  children,
  ...props
}: ISubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending || props.disabled}
      className="w-full bg-neutral-950 text-neutral-50 disabled:bg-neutral-100 disabled:text-neutral-800"
    >
      {(pending || props.disabled) && (
        <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
      )}
      {children}
    </Button>
  );
}
