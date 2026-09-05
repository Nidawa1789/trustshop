import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}
const PriceView = ({ price, discount, className }: Props) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
        <PriceFormatter amount={price} className={cn("text-shop_dark_green", className)} />
        {price && discount ? (
          <PriceFormatter
            amount={price + (discount * price) / 100}
            className={twMerge("text-xs font-normal text-zinc-500 line-through", className)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default PriceView;
