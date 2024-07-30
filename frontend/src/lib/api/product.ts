"use server";

import { revalidatePath } from "next/cache";
import { redirect, RedirectType } from "next/navigation";
import { ApiEndpoint } from "../constants";
import { getSession } from "./auth";
import {
  ProductApiStatus,
  TProduct,
  TProductApiResponse,
} from "./product-type";

export async function listProducts() {
  const session = await getSession();

  if (session === null) redirect("/auth/login", RedirectType.replace);

  try {
    const res = await fetch(ApiEndpoint.Product.List, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access}`,
      },
    });

    const response: TProduct[] = await res.json();

    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createProduct(
  formData: FormData,
): Promise<TProductApiResponse> {
  const session = await getSession();

  if (session === null) redirect("/auth/login", RedirectType.replace);

  try {
    const res = await fetch(ApiEndpoint.Product.Create, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
      body: formData,
    });

    const response = await res.json();
    if (res.status === 201) {
      revalidatePath("/", "page");
      return {
        message: "Berhasil menambahkan produk baru.",
        product: response.product,
        status: ProductApiStatus.Success,
      };
    } else {
      return {
        message: "Terjadi kesalahan ketika menambahkan produk.",
        product: null,
        status: ProductApiStatus.Failed,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Terjadi kesalahan ketika menambahkan produk.",
      product: null,
      status: ProductApiStatus.Failed,
    };
  }
}

export async function deleteProduct(productId: number) {
  const session = await getSession();

  if (session === null) redirect("/auth/login", RedirectType.replace);

  try {
    const res = await fetch(ApiEndpoint.Product.Delete + productId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.access}`,
      },
    });

    if (res.status === 204) {
      revalidatePath("/", "page");
      return {
        message: "Berhasil menghapus produk.",
        status: ProductApiStatus.Success,
      };
    } else {
      return {
        message: "Terjadi kesalahan ketika menghapus data produk.",
        status: ProductApiStatus.Failed,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Terjadi kesalahan ketika menghapus data produk.",
      status: ProductApiStatus.Failed,
    };
  }
}

export async function listAllProducts() {
  try {
    const res = await fetch(ApiEndpoint.Product.All);
    const response: TProduct[] = await res.json();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
}
