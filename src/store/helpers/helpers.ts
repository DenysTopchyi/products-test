import type { Filters, SortField, SortOrder } from "@/store/products";
import type { GetProductsParams } from "@/lib/products-api";

type MapToQueryArgs = {
    page: number;
    pageSize: number;
    filters: Filters;
    sortBy: SortField | "";
    sortOrder: SortOrder;
};

export function mapToQuery({
    page,
    pageSize,
    filters,
    sortBy,
    sortOrder,
}: MapToQueryArgs): GetProductsParams {
    return {
        _page: page,
        _limit: pageSize,
        _sort: sortBy || undefined,
        _order: sortBy ? sortOrder : undefined,
        q: filters.q || undefined,
        tags_like: filters.tagQuery || undefined,

        price_gte: typeof filters.priceMin === "number" ? filters.priceMin : undefined,
        price_lte: typeof filters.priceMax === "number" ? filters.priceMax : undefined,

        subscription:
            filters.subscription === "Yes"
                ? true
                : filters.subscription === "No"
                ? false
                : undefined,
        published: filters.publishedOnly ? true : undefined,
    };
}
