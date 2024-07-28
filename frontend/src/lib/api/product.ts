"use server";

import { redirect, RedirectType } from "next/navigation";
import { ApiEndpoint } from "../constants";
import { getSession } from "./auth";
import {
  ProductApiStatus,
  TProduct,
  TProductApiResponse,
  TProductDeleteResponse,
  TProductDto,
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
  prevState: TProductApiResponse,
  formData: FormData
) {
  const session = await getSession();

  const productDto: TProductDto = {
    archived: formData.get("archived") === "true",
    description: formData.get("description") as string,
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
  };

  if (session === null) redirect("/auth/login", RedirectType.replace);

  try {
    const res = await fetch(ApiEndpoint.Product.Create, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access}`,
      },
      body: JSON.stringify(productDto),
    });

    const response = await res.json();
    if (res.status === 201) {
      prevState.message = "Berhasil menambahkan produk baru.";
      prevState.product = response.product;
      prevState.status = ProductApiStatus.Success;
    } else {
      prevState.message = "Terjadi kesalahan ketika menambahkan produk.";
      prevState.product = null;
      prevState.status = ProductApiStatus.Failed;
    }
  } catch (error) {
    console.error(error);
    prevState.message = "Terjadi kesalahan ketika menambahkan produk.";
    prevState.product = null;
    prevState.status = ProductApiStatus.Failed;
  } finally {
    return prevState;
  }
}

export async function deleteProduct(
  productId: number,
  prevState: TProductDeleteResponse
) {
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
      prevState.message = "Berhasil menghapus produk.";
      prevState.status = ProductApiStatus.Success;
    } else {
      prevState.message = "Terjadi kesalahan ketika menghapus data produk.";
      prevState.status = ProductApiStatus.Failed;
    }
  } catch (error) {
    console.error(error);
    prevState.message = "Terjadi kesalahan ketika menghapus data produk.";
    prevState.status = ProductApiStatus.Failed;
  } finally {
    return prevState;
  }
}
