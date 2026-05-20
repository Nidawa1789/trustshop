import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Title from "@/components/Title";
import { getDealProducts } from "@/sanity/queries";
import React from "react";

const DealPage = async () => {
  const products = await getDealProducts();

  return (
    <div className="bg-deal-bg py-10">
      <Container>
        <Title className="mb-5 text-base tracking-wide uppercase underline decoration-[1px] underline-offset-4">
          Offres chaudes de la semaine
        </Title>

        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-5">
          {products?.map((product) => (
            <ProductCard key={product?._id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
