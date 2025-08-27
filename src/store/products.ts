import { create } from "zustand";
import { mapToQuery } from "./helpers/helpers";
import { getProducts } from "@/lib/products-api";

export interface Product {
    id: number;
    slug: string;
    title: string;
    vendor: string;
    tags: string[];
    published: boolean;
    url: string;
    image_src: string;
    option_value: string;
    sku: string;
    price: number;
    subscription_discount: number | "";
    subscription: boolean;
}

export type SortField = "title" | "price" | "vendor";
export type SortOrder = "ASC" | "DESC";

export interface Filters {
    q: string;
    tagQuery: string;
    price: number | null;
    subscription: "" | "Yes" | "No";
    publishedOnly: boolean;
}

interface ProductsState {
    products: Product[];
    total: number;
    page: number;
    pageSize: number;
    sortBy: SortField | "";
    sortOrder: SortOrder;

    loading: boolean;
    error: string | null;
    filters: Filters;

    setPage: (p: number) => void;
    setFilter: <K extends keyof Filters>(k: K, v: Filters[K]) => void;
    resetFilters: () => void;
    setSort: (field: SortField) => void;

    fetchProducts: () => Promise<void>;
}

const PAGE_SIZE = 12;

let abortCtrl: AbortController | null = null;
let reqSeq = 0;

export const useProductsStore = create<ProductsState>((set, get) => ({
    products: [],
    total: 0,
    page: 1,
    pageSize: PAGE_SIZE,
    sortBy: "",
    sortOrder: "ASC",

    loading: false,
    error: null,
    filters: {
        q: "",
        tagQuery: "",
        price: null,
        subscription: "",
        publishedOnly: false,
    },

    setPage: (page) => set({ page }),

    setFilter: (key, value) => {
        set((s) => ({
            filters: { ...s.filters, [key]: value },
            page: 1,
        }));
    },

    resetFilters: () =>
        set({
            filters: { q: "", tagQuery: "", price: null, subscription: "", publishedOnly: false },
            page: 1,
            sortBy: "",
            sortOrder: "ASC",
        }),

    setSort: (field) => {
        const { sortBy, sortOrder } = get();
        const nextOrder: SortOrder =
            sortBy === field ? (sortOrder === "ASC" ? "DESC" : "ASC") : "ASC";
        set({ sortBy: field, sortOrder: nextOrder, page: 1 });
    },

    fetchProducts: async () => {
        const { page, pageSize, filters, sortBy, sortOrder } = get();

        if (abortCtrl) abortCtrl.abort();
        abortCtrl = new AbortController();
        const signal = abortCtrl.signal;
        const mySeq = ++reqSeq;

        set({ loading: true, error: null });

        try {
            const params = mapToQuery({
                page,
                pageSize,
                filters,
                sortBy,
                sortOrder,
            });
            const { data, total } = await getProducts(params, signal);

            if (mySeq !== reqSeq) return;

            set({ products: data, total, loading: false });
        } catch (e: any) {
            if (e?.name === "CanceledError" || e?.name === "AbortError") {
                return;
            }

            set({ error: e?.message ?? "Failed to load", loading: false });
        }
    },
}));
