"use client";

import { createProduct } from "@/lib/api/product";
import {
  ProductApiStatus,
  TProductApiResponse,
  TProductDto,
} from "@/lib/api/product-type";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import SubmitButton from "./SubmitButton";

interface IProductFormProps {
  firstTime?: boolean;
}

const initialProductState: TProductApiResponse = {
  message: "",
  product: null,
  status: ProductApiStatus.Idle,
};

export default function ProductForm({ firstTime = false }: IProductFormProps) {
  const form = useForm<TProductDto>({
    defaultValues: {
      archived: false,
      description: "",
      slug: "",
      title: "",
    },
  });

  const [state, formAction] = useFormState(createProduct, initialProductState);
  const { toast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    if (state.status !== ProductApiStatus.Idle) {
      if (state.status === ProductApiStatus.Success) {
        toast({
          description: state.message,
        });
        router.refresh();
      } else {
        toast({
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, router, toast]);

  return (
    <Form {...form}>
      <form
        action={formAction}
        className="max-w-md md:w-2/3 rounded-md border border-input flex flex-col gap-4 p-4"
      >
        {firstTime && (
          <div className="w-full text-left flex flex-col gap-px">
            <h3 className="text-lg font-medium">Unggah produk pertama anda!</h3>
            <p className="text-xs">
              Silakan isi formulir dibawah untuk mulai mengunggah produk pertama
              anda.
            </p>
          </div>
        )}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-px">
              <FormLabel>Nama Produk</FormLabel>
              <FormControl>
                <Input placeholder="Nama produk anda" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-px">
              <FormLabel>URL Produk</FormLabel>
              <FormControl>
                <Input placeholder="url-produk-anda" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full flex flex-col gap-px">
              <FormLabel>Deskripsi Produk Anda</FormLabel>
              <FormControl>
                <Textarea placeholder="Deskripsi produk" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <SubmitButton>Tambahkan Produk</SubmitButton>
      </form>
    </Form>
  );
}
