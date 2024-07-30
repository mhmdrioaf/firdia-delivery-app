export default function ProductCardSkeleton() {
  return (
    <div className="relative z-0 flex w-full flex-col items-center gap-2 overflow-hidden rounded-md border border-transparent p-2">
      <div className="relative aspect-square h-auto w-full animate-pulse overflow-hidden rounded-md bg-gray-100"></div>
      <div className="flex w-full flex-col gap-1">
        <b className="animate-pulse rounded-sm bg-gray-100 text-sm text-gray-100 md:text-base">
          Product title
        </b>
        <p className="animate-pulse truncate rounded-sm bg-gray-100 text-xs text-gray-100 md:text-sm">
          Description
        </p>
      </div>
    </div>
  );
}
