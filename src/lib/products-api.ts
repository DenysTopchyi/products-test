import { api } from "@/lib/api";
import type { Product } from "@/store/products";

export type GetProductsParams = {
    _page?: number;
    _limit?: number;
    _sort?: string;
    _order?: "ASC" | "DESC";
    q?: string;
    tags_like?: string;
    price_gte?: number;
    price_lte?: number;
    subscription?: boolean;
    published?: boolean;
};

export async function getProducts(
    params: GetProductsParams,
    signal?: AbortSignal
): Promise<{ data: Product[]; total: number }> {
    const res = await api.get<Product[]>("/products", { params, signal });
    const totalHeader = res.headers["x-total-count"];
    const total = totalHeader ? parseInt(totalHeader, 10) : res.data.length;
    return { data: res.data, total };
}
