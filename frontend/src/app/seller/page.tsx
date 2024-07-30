import ProductCard from "@/components/cards/ProductCard";
import ProductForm from "@/components/forms/ProductForm";
import { Button } from "@/components/ui/button";
import { listProducts } from "@/lib/api/product";
import Link from "next/link";

export default async function SellerPage() {
  const products = await listProducts();

  if (products.length < 1) {
    return (
      <div className="flex min-h-svh w-full flex-col items-center justify-center gap-2 px-2 py-2 md:px-8">
        <ProductForm firstTime />
      </div>
    );
  }

  return (
    <div className="flex min-h-svh w-full flex-col gap-4 px-4 py-2 md:px-8">
      <div className="inline-flex w-full items-center justify-between">
        <h3 className="text-2xl font-bold">Produk Anda</h3>
        <Button asChild>
          <Link href="/seller/products/create">Tambahkan Produk</Link>
        </Button>
      </div>
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
