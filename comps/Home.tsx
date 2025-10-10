"use client";
import { useState } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

const Home = ({ products, bannerData }: HomeProps) => {
  const [sort, setSort] = useState<"low" | "high" | "">("");

  const displayedProducts = (() => {
    if (!sort) return products;
    const copy = [...products];
    if (sort === "low") return copy.sort((a, b) => a.price - b.price);
    if (sort === "high") return copy.sort((a, b) => b.price - a.price);
    return copy;
  })();

  return (
    <main>
      {/* === MAIN BANNER  */}
      <MainBanner banner={bannerData[0]} />

      <section className="  mb-4 flex items-center flex-col">
        <h1
          className=" headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary
         font-sans font-extrabold sm:rounded-t-3xl"
        >
          Best Selling Headphones
        </h1>
        {/* <p className=" text-base text-secondary">Best in the Market</p> */}
      </section>

      {/* === SORT CONTROLS */}
      <section className="w-full flex justify-end px-4 sm:px-8 lg:px-20">
        <label className="text-sm text-secondary mr-2 self-center" htmlFor="sortSelect">
          Sort by price:
        </label>
        <select
          id="sortSelect"
          aria-label="Sort products by price"
          title="Sort products by price"
          value={sort}
          onChange={(e) => setSort(e.target.value as "low" | "high" | "")}
          className="mb-2 mt-1 border border-lightGray rounded px-2 py-1 text-sm focus:outline-none"
        >
          <option value="" disabled hidden>
            Select price order
          </option>
          <option value="low">low to high</option>
          <option value="high">high to low</option>
        </select>
      </section>

      {/* === SHOW PRODUCTS  */}
      <section
        className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3
       lg:mx-20 overflow-hidden
      "
      >
        {/* === MAP PRODUCTS  */}
        {displayedProducts?.map((products: ProductsTypes) => {
          return <Products key={products._id} products={products} />;
        })}
      </section>

      {/* ==== FOOTER BANNER  */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
