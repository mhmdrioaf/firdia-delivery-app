"use client";

import { deleteProduct } from "@/lib/api/product";
import { ProductApiStatus } from "@/lib/api/product-type";
import { useRouter } from "next/navigation";
import React from "react";
import { useToast } from "../ui/use-toast";
import ProductDeleteButton from "./ProductDeleteButton";

export default function ProductDeleteForm({
  productId,
}: {
  productId: number;
}) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const response = await deleteProduct(productId);

    if (response.status === ProductApiStatus.Success) {
      toast({
        description: response.message,
      });
      router.refresh();
    } else {
      toast({
        description: response.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ProductDeleteButton disabled={isLoading} />
    </form>
  );
}
