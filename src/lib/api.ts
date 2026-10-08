import { Product, Category } from "@/types/product";

const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

// Generic fetch with automatic fallback to secondary API
async function fetchWithFallback<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL_1}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      return (await res.json()) as T;
    }
    throw new Error(`Primary API failed with status ${res.status}`);
  } catch (primaryError) {
    console.warn(`Primary API error on ${endpoint}, trying backup API...`, primaryError);
    try {
      const backupRes = await fetch(`${BASE_URL_2}${endpoint}`, {
        next: { revalidate: 60 },
      });
      if (backupRes.ok) {
        return (await backupRes.json()) as T;
      }
      throw new Error(`Backup API failed with status ${backupRes.status}`);
    } catch (backupError) {
      console.error(`Both APIs failed for endpoint ${endpoint}`, backupError);
      throw backupError;
    }
  }
}

/**
 * Fetch all products
 */
export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await fetchWithFallback<Product[]>("/products");
    return Array.isArray(products) ? products : [];
  } catch (error) {
    console.error("Error fetching all products:", error);
    return [];
  }
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await fetchWithFallback<Category[]>("/categories");
    return Array.isArray(categories) ? categories : [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

/**
 * Fetch single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const category = await fetchWithFallback<Category>(`/categories/${slug}`);
    if (category && category.slug) {
      return category;
    }
  } catch (err) {
    // If endpoint errors, fallback to matching from all categories
    console.warn(`Category endpoint /categories/${slug} error, searching category list...`, err);
  }

  const allCategories = await getCategories();
  return allCategories.find((c) => c.slug === slug || c.id === slug) || null;
}

/**
 * Fetch products filtered by category
 */
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const products = await fetchWithFallback<Product[]>(`/products?category=${categorySlug}`);
    if (Array.isArray(products) && products.length > 0) {
      return products;
    }
  } catch (err) {
    console.warn(`Filtered products query failed, filtering from all products...`, err);
  }

  // Fallback filter from all products
  const allProducts = await getAllProducts();
  return allProducts.filter(
    (p) => p.category === categorySlug || p.category.toLowerCase() === categorySlug.toLowerCase()
  );
}

/**
 * Fetch single product by ID or Slug (e.g. 1 or miniket-chal)
 */
export async function getProductByIdOrSlug(idOrSlug: string | number): Promise<Product | null> {
  const isNumeric = !isNaN(Number(idOrSlug));

  // If numeric ID, try direct endpoint first
  if (isNumeric) {
    try {
      const product = await fetchWithFallback<Product>(`/products/${idOrSlug}`);
      if (product && product.id) {
        return product;
      }
    } catch (err) {
      console.warn(`Direct fetch /products/${idOrSlug} failed, searching all products...`, err);
    }
  }

  // Find product by slug or id from all products
  const allProducts = await getAllProducts();
  const found = allProducts.find(
    (p) =>
      p.slug === idOrSlug ||
      String(p.id) === String(idOrSlug) ||
      p.slug.toLowerCase() === String(idOrSlug).toLowerCase()
  );

  return found || null;
}
