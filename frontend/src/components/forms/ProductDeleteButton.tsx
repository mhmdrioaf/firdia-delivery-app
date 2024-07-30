"use client";

import { Loader2Icon, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";

interface IProductDeleteButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export default function ProductDeleteButton({
  children,
  ...props
}: IProductDeleteButtonProps) {
  return (
    <Button type="submit" size="icon" variant="destructive" {...props}>
      {props.disabled ? (
        <Loader2Icon className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2Icon className="h-4 w-4" />
      )}
    </Button>
  );
}
