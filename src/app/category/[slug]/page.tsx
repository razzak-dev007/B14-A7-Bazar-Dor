import React from "react";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import CategoryView from "@/components/CategoryView";
import { getCategories, getCategoryBySlug, getProductsByCategory, getAllProducts } from "@/lib/api";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// generate dynamic title for category page
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  const title = category ? `${category.nameBn} - বাজার দর` : "ক্যাটাগরি - বাজার দর";
  return {
    title: `${title} | নিত্যপণ্যের বাজারদর`,
    description: `${category?.nameBn || slug} ক্যাটাগরির আজকের বাজার দর।`,
  };
}

// category products page component
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // fetch categories, current category, products, and all products
  const [categories, category, products, allProducts] = await Promise.all([
    getCategories(),
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
    getAllProducts(),
  ]);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-slate-50">
      <Navbar categories={categories} />
      <PriceTicker products={allProducts} />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full">
        <CategoryView
          category={category}
          initialProducts={products}
          slug={slug}
        />
      </main>

      <Footer />
    </div>
  );
}
