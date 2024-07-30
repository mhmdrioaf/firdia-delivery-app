"use client";

import { TProduct } from "@/lib/api/product-type";
import SessionProvider, { useSession } from "@/lib/context/session/provider";
import { SessionStatus } from "@/lib/context/session/type";
import Image from "next/image";
import Link from "next/link";
import ProductDeleteForm from "../forms/ProductDeleteForm";

interface IProductCardProps {
  product: TProduct;
}

function Card({ product }: IProductCardProps) {
  const session = useSession();
  const userId = session.data?.user_id;
  return (
    <div className="relative">
      <Link
        href="#"
        className="relative z-0 flex w-full flex-col items-center gap-2 overflow-hidden rounded-md border border-input p-2"
      >
        <div className="relative aspect-square h-auto w-full overflow-hidden rounded-md">
          <Image
            src={product.image}
            alt={`${product.title} thumbnail`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <b className="text-sm md:text-base">{product.title}</b>
          <p className="truncate text-xs md:text-sm">{product.description}</p>
        </div>
      </Link>

      {session.status === SessionStatus.Authenticated &&
        userId === product.seller && (
          <div className="pointer-events-auto absolute right-0 top-0 z-30">
            <ProductDeleteForm productId={product.id} />
          </div>
        )}
    </div>
  );
}

export default function ProductCard({ product }: IProductCardProps) {
  return (
    <SessionProvider>
      <Card product={product} />
    </SessionProvider>
  );
}
