"use client";

import { createProduct } from "@/lib/api/product";
import {
  ProductApiStatus,
  TProductApiResponse,
  TProductDto,
} from "@/lib/api/product-type";
import { CameraIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
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
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const form = useForm<TProductDto>({
    defaultValues: {
      title: "",
      archived: false,
      description: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const imageInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageInputClick = () => {
    if (imageInputRef.current === null) return;
    imageInputRef.current.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImagePreview(null);
    const files = event.target.files;
    if (files === null) return;
    if (files.length < 0) return;

    const file = files[0];
    const preview = URL.createObjectURL(file);
    form.setValue("image", file);
    setImagePreview(preview);
  };

  const handleFormSubmit = async (values: TProductDto) => {
    setIsLoading(true);
    setError(null);
    const formData = new FormData();

    const { image, ...restValues } = values;

    if (!image) {
      setError("Foto produk tidak boleh kosong");
      setIsLoading(false);
      return;
    }

    formData.append("image", image);

    for (const value in restValues) {
      const key = value as keyof typeof restValues;

      formData.append(key, restValues[key].toString());
    }

    const response = await createProduct(formData);

    if (response.status === ProductApiStatus.Success) {
      toast({
        description: response.message,
      });
      router.refresh();
      if (firstTime === false) {
        router.push("/seller");
      }
    } else {
      toast({
        description: response.message,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  React.useEffect(() => {
    if (error !== null) {
      toast({
        description: "Gambar produk tidak boleh kosong!",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="flex max-w-md flex-col gap-4 rounded-md border border-input p-4 md:w-2/3"
      >
        {firstTime && (
          <div className="flex w-full flex-col gap-px text-left">
            <h3 className="text-lg font-medium">Unggah produk pertama anda!</h3>
            <p className="text-xs">
              Silakan isi formulir dibawah untuk mulai mengunggah produk pertama
              anda.
            </p>
          </div>
        )}

        <div
          className="group relative mx-auto h-40 w-40 overflow-hidden rounded-md bg-gray-50"
          onClick={handleImageInputClick}
        >
          <div className="absolute left-0 top-0 z-40 flex h-full w-full cursor-pointer items-center justify-center bg-gray-50/15 transition-all group-hover:bg-gray-50/35 group-hover:backdrop-blur-sm">
            <CameraIcon className="h-8 w-8" />
          </div>

          {imagePreview && (
            <Image
              src={imagePreview}
              className="z-10 object-cover"
              fill
              alt="Product image preview"
            />
          )}

          <input
            ref={imageInputRef}
            hidden
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            name="image"
            onChange={handleImageChange}
          />
        </div>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-px">
              <FormLabel>Nama Produk</FormLabel>
              <FormControl>
                <Input placeholder="Nama produk anda" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-px">
              <FormLabel>Deskripsi Produk Anda</FormLabel>
              <FormControl>
                <Textarea placeholder="Deskripsi produk" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <SubmitButton disabled={isLoading}>Tambahkan Produk</SubmitButton>
      </form>
    </Form>
  );
}
