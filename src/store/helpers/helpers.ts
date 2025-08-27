import type { Filters, SortField, SortOrder } from "@/store/products";
import type { GetProductsParams } from "@/lib/products-api";

export function mapToQuery(
    page: number,
    pageSize: number,
    filters: Filters,
    sortBy: SortField | "",
    sortOrder: SortOrder
): GetProductsParams {
    return {
        _page: page,
        _limit: pageSize,
        _sort: sortBy || undefined,
        _order: sortBy ? sortOrder : undefined,
        q: filters.q || undefined,
        tags_like: filters.tagQuery || undefined,
        price: typeof filters.price === "number" ? filters.price : undefined,
        subscription:
            filters.subscription === "Yes"
                ? true
                : filters.subscription === "No"
                ? false
                : undefined,
        published: filters.publishedOnly ? true : undefined,
    };
}
