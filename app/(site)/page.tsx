import React from "react";
import Container from "@/components/Container";
import HomeBanner from "@/components/HomeBanner";
import ProductGrid from "@/components/ProductGrid";
import { getCategories } from "@/sanity/queries";
import HomeCategories from "@/components/HomeCategories";
import ShopByBrands from "@/components/ShopByBrands";
import LatestBlog from "@/components/LatestBlog";
const Home = async () => {
  const categories = await getCategories(6);
  return (
    <Container className=" ">
      <HomeBanner />
      <div className="py-10">
        <ProductGrid />
        <HomeCategories categories={categories} />
        <ShopByBrands />
        <LatestBlog />
      </div>
    </Container>
  );
};

export default Home;
