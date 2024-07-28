export type TProductResponse = {
  products: TProduct[];
};

export type TProduct = {
  id: number;
  slug: string;
  title: string;
  archived: boolean;
  description: string;
  created_at: Date;
  seller: number;
};

export type TProductDto = Omit<TProduct, "id" | "created_at" | "seller">;

export type TProductApiResponse = {
  status: ProductApiStatus;
  message: string;
  product: TProduct | null;
};

export enum ProductApiStatus {
  Failed = "failed",
  Success = "success",
  Idle = "idle",
}

export type TProductDeleteResponse = Pick<
  TProductApiResponse,
  "status" | "message"
>;
