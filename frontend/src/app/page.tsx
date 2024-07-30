import ProductCardSkeleton from "@/components/cards/ProductCardSkeleton";
import { listAllProducts } from "@/lib/api/product";
import { lazy, Suspense } from "react";

const ProductCard = lazy(() => import("@/components/cards/ProductCard"));

export default async function Homepage() {
  const products = await listAllProducts();
  return (
    <div className="flex min-h-svh w-full flex-col gap-4 px-4 py-2 md:px-8">
      <div className="flex w-full flex-col gap-2">
        <b className="text-base md:text-lg">Produk produk yang tersedia</b>
      </div>
      <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <Suspense fallback={<ProductCardSkeleton />} key={product.id}>
              <ProductCard key={product.id} product={product} />
            </Suspense>
          ))
        ) : (
          <i className="col-span-2 text-center text-xs md:col-span-3 md:text-sm lg:col-span-4">
            Saat ini tidak ada produk yang tersedia...
          </i>
        )}
      </div>
    </div>
  );
}
