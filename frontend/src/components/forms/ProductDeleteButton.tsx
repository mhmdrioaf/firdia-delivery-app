"use client";

import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function ProductDeleteButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending} variant="destructive">
      {pending ? (
        <Loader2Icon className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2Icon className="w-4 h-4" />
      )}
    </Button>
  );
}
