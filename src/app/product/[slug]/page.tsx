import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import { getProductByIdOrSlug, getCategories, getAllProducts } from "@/lib/api";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// generate dynamic title and description for this product
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductByIdOrSlug(slug);
  const title = product ? `${product.nameBn} - বাজার দর` : "পণ্য বিবরণ - বাজার দর";
  return {
    title: `${title} | আজকের বাজার দর`,
    description: product
      ? `${product.nameBn}-এর আজকের বাজার দর ${product.today} টাকা।`
      : "বাজার দরে পণ্যের বিস্তারিত তথ্য দেখুন।",
  };
}

// single product page component
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  // fetch categories, products, and target product
  const [categories, allProducts, product] = await Promise.all([
    getCategories(),
    getAllProducts(),
    getProductByIdOrSlug(slug),
  ]);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <Navbar categories={categories} />
      <PriceTicker products={allProducts} />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full">
        <ProductDetailsClient product={product} slug={slug} />
      </main>

      <Footer />
    </div>
  );
}
