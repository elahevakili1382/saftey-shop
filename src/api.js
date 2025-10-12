// src/api.js
export const BASE_URL = 'https://dummyjson.com'; // وقتی API واقعی آمد، این را عوض کن

async function safeFetch(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchCarts() {
  try {
    const data = await safeFetch(`${BASE_URL}/carts`);
    return data.carts || [];
  } catch (e) {
    console.error('fetchCarts error', e);
    return [];
  }
}

export async function fetchProducts() {
  try {
    const data = await safeFetch(`${BASE_URL}/products?limit=0`);
    return data.products || [];
  } catch (e) {
    console.error('fetchProducts error', e);
    return [];
  }
}

export async function fetchUsers() {
  try {
    const data = await safeFetch(`${BASE_URL}/users`);
    return data.users || [];
  } catch (e) {
    console.error('fetchUsers error', e);
    return [];
  }
}
