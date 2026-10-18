import { Product, Category } from "@/types/product";

// api base urls (primary and backup url)
const BASE_URL_1 = "https://api.api-store.workers.dev/api/bazardor";
const BASE_URL_2 = "https://api.abcz.workers.dev/api/bazardor";

// helper function to fetch data from api with backup url fallback
async function fetchWithFallback<T>(endpoint: string): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL_1}${endpoint}`, {
      next: { revalidate: 60 },
    });
    if (res.ok) {
      const data = await res.json();
      return data as T;
    }
    throw new Error(`Primary API failed with status ${res.status}`);
  } catch (err) {
    console.log(`Primary API failed for ${endpoint}, now trying backup API...`, err);
    try {
      const backupRes = await fetch(`${BASE_URL_2}${endpoint}`, {
        next: { revalidate: 60 },
      });
      if (backupRes.ok) {
        const backupData = await backupRes.json();
        return backupData as T;
      }
      throw new Error(`Backup API failed with status ${backupRes.status}`);
    } catch (backupErr) {
      console.log(`Both APIs failed for endpoint: ${endpoint}`, backupErr);
      throw backupErr;
    }
  }
}

// get all products from api
export async function getAllProducts(): Promise<Product[]> {
  try {
    const products = await fetchWithFallback<Product[]>("/products");
    if (Array.isArray(products)) {
      return products;
    }
    return [];
  } catch (error) {
    console.log("Error getting products:", error);
    return [];
  }
}

// get all categories from api
export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await fetchWithFallback<Category[]>("/categories");
    if (Array.isArray(categories)) {
      return categories;
    }
    return [];
  } catch (error) {
    console.log("Error getting categories:", error);
    return [];
  }
}

// get single category by slug
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const category = await fetchWithFallback<Category>(`/categories/${slug}`);
    if (category && category.slug) {
      return category;
    }
  } catch (err) {
    console.log(`Could not get category directly from /categories/${slug}:`, err);
  }

  // if endpoint fails, search in all categories list
  const allCategories = await getCategories();
  const matched = allCategories.find((c) => c.slug === slug || c.id === slug);
  return matched || null;
}

// get products filtered by category slug
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    const products = await fetchWithFallback<Product[]>(`/products?category=${categorySlug}`);
    if (Array.isArray(products) && products.length > 0) {
      return products;
    }
  } catch (err) {
    console.log("Filtered products query error, filtering from all products:", err);
  }

  // fallback: get all products and filter manually
  const allProducts = await getAllProducts();
  return allProducts.filter(
    (p) => p.category === categorySlug || p.category.toLowerCase() === categorySlug.toLowerCase()
  );
}

// get single product by slug or id
export async function getProductByIdOrSlug(idOrSlug: string | number): Promise<Product | null> {
  const isNumber = !isNaN(Number(idOrSlug));

  // if numeric id, try direct endpoint first
  if (isNumber) {
    try {
      const product = await fetchWithFallback<Product>(`/products/${idOrSlug}`);
      if (product && product.id) {
        return product;
      }
    } catch (err) {
      console.log(`Could not fetch /products/${idOrSlug} directly:`, err);
    }
  }

  // find product from all products list by slug or id
  const allProducts = await getAllProducts();
  const found = allProducts.find(
    (p) =>
      p.slug === idOrSlug ||
      String(p.id) === String(idOrSlug) ||
      p.slug.toLowerCase() === String(idOrSlug).toLowerCase()
  );

  return found || null;
}
