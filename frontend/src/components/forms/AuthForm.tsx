"use client";

import { authHandler } from "@/lib/api/auth";
import {
  AuthRedirectType,
  AuthStatus,
  AuthType,
  TAuthResponse,
} from "@/lib/api/auth-type";
import { capitalize } from "@/lib/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";
import SubmitButton from "./SubmitButton";

interface AuthFormProps {
  action: AuthType;
}

const initialAuthState: TAuthResponse = {
  status: AuthStatus.Idle,
  redirect: null,
  message: "",
};

const authSchema = z.object({
  username: z.string().min(2, "Username harus lebih dari 2 karakter.").max(50),
  password: z.string().min(8, "Password harus lebih dari 8 karakter."),
});

export default function AuthForm({ action }: AuthFormProps) {
  const title = capitalize(action);
  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [state, formAction] = useFormState(
    authHandler.bind(null, action),
    initialAuthState
  );

  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    if (state.status === AuthStatus.Success) {
      if (state.redirect === AuthRedirectType.Dashboard) {
        toast({
          title: "Welcome back!",
          description: state.message,
        });
        router.refresh();
        router.replace("/seller");
      } else if (state.redirect === AuthRedirectType.Login) {
        toast({
          description: state.message,
        });
        router.replace("/auth/login");
      }
    }
    if (state.status === AuthStatus.Failed) {
      toast({
        title: "Oops...",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, router]);

  return (
    <Form {...form}>
      <form
        className="w-full md:max-w-md md:w-2/3 p-4 flex flex-col gap-4 rounded-md border border-input"
        action={formAction}
      >
        <h3 className="font-bold text-2xl">{title}</h3>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-px">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Isi username anda disini" {...field} />
              </FormControl>
              <FormDescription>
                Username minimal harus sebanyak 2 karakter.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-px">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Isi password anda disini"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Password minimal harus sebanyak 8 karakter.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton>{title}</SubmitButton>
      </form>
    </Form>
  );
}
