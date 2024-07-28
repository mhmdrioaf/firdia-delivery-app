import ProductDeleteForm from "@/components/forms/ProductDeleteForm";
import ProductForm from "@/components/forms/ProductForm";
import { listProducts } from "@/lib/api/product";

export default async function SellerPage() {
  const products = await listProducts();

  if (products.length < 1) {
    return (
      <div className="w-full min-h-svh flex flex-col gap-2 items-center justify-center px-2 md:px-8 py-2">
        <ProductForm firstTime />
      </div>
    );
  }

  return (
    <div className="w-full min-h-svh grid grid-cols-2 md:grid-cols-3 gap-4 px-2 md:px-8 py-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-full h-full flex flex-col gap-2 rounded-md overflow-hidden border border-input relative"
        >
          <div className="absolute top-4 right-4">
            <ProductDeleteForm productId={product.id} />
          </div>
          <b>{product.title}</b>
          <p className="text-xs truncate">{product.description}</p>
        </div>
      ))}
    </div>
  );
}
