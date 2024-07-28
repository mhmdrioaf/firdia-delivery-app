"use client";

import { deleteProduct } from "@/lib/api/product";
import {
  ProductApiStatus,
  TProductDeleteResponse,
} from "@/lib/api/product-type";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormState } from "react-dom";
import { useToast } from "../ui/use-toast";
import ProductDeleteButton from "./ProductDeleteButton";

const initialFormState: TProductDeleteResponse = {
  message: "",
  status: ProductApiStatus.Idle,
};

export default function ProductDeleteForm({
  productId,
}: {
  productId: number;
}) {
  const [state, formAction] = useFormState(
    deleteProduct.bind(null, productId),
    initialFormState
  );

  const router = useRouter();
  const { toast } = useToast();

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
  }, [state, toast, router]);

  return (
    <form action={formAction}>
      <ProductDeleteButton />
    </form>
  );
}
