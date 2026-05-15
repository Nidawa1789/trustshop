import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  const n = Number(amount ?? 0);
  const formatted = n.toLocaleString("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return (
    <span className={twMerge("text-darkColor text-sm font-semibold", className)}>
      {formatted}
      {"\u00a0"}
      FCFA
    </span>
  );
};

export default PriceFormatter;
