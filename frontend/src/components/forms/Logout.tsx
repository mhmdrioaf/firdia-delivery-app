"use client";

import { Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const { pending } = useFormStatus();
  return (
    <Button variant="destructive" disabled={pending}>
      {pending && <Loader2Icon className="w-4 h-4 animate-spin mr-2" />}
      Logout
    </Button>
  );
}
