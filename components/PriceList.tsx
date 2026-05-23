import React from "react";
import Title from "@/components/Title";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const priceArray = [
  { title: "Moins de 50 000 FCFA", value: "0-50000" },
  { title: "50 000 - 100 000 FCFA", value: "50000-100000" },
  { title: "100 000 - 200 000 FCFA", value: "100000-200000" },
  { title: "200 000 - 500 000 FCFA", value: "200000-500000" },
  { title: "Plus de 500 000 FCFA", value: "500000-10000000" },
];

interface Props {
  selectedPrice?: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}
const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="w-full bg-white p-5">
      <Title className="text-base font-black">Prix</Title>
      <RadioGroup className="mt-2 space-y-1" value={selectedPrice || ""}>
        {priceArray?.map((price, index) => (
          <div
            key={index}
            onClick={() => setSelectedPrice(price?.value)}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem value={price?.value} id={price?.value} className="rounded-sm" />
            <Label
              htmlFor={price.value}
              className={`${selectedPrice === price?.value ? "text-shop_dark_green font-semibold" : "font-normal"}`}
            >
              {price?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {selectedPrice && (
        <button
          onClick={() => setSelectedPrice(null)}
          className="hover:text-shop_dark_green hoverEffect mt-2 text-sm font-medium underline decoration-1 underline-offset-2"
        >
          Réinitialiser la sélection
        </button>
      )}
    </div>
  );
};

export default PriceList;
