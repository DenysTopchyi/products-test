import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppPagination from "@/components/AppPagination/AppPagination";
import type { Product } from "@/store/products";
import ProductsTable from "./ProductsTable";
import ProductsLoading from "./ProductsLoading";
import { Menu } from "lucide-react";

type Props = {
    products: Product[];
    loading: boolean;
    error: string | null;
    total: number;
    page: number;
    pageSize: number;
    setPage: (p: number) => void;
    onToggleSidebar?: () => void;
};

export default function ProductsCard({
    products,
    loading,
    error,
    total,
    page,
    pageSize,
    setPage,
    onToggleSidebar,
}: Props) {
    return (
        <Card className="min-h-[780px] flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
                {onToggleSidebar && (
                    <button
                        onClick={onToggleSidebar}
                        className="lgx:hidden p-2 rounded hover:bg-gray-100"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                )}
                <CardTitle>Products</CardTitle>
                <div className="text-sm text-gray-500">
                    {loading ? "Loading..." : `Total: ${total}`}
                    {error && <span className="ml-3 text-red-600">{error}</span>}
                </div>
            </CardHeader>

            <CardContent className="flex flex-col flex-1 overflow-hidden">
                <ProductsBody loading={loading} error={error} products={products} />

                <div className="mt-auto pt-4 border-t">
                    <AppPagination
                        page={page}
                        pageSize={pageSize}
                        total={total}
                        onChange={setPage}
                    />
                </div>
            </CardContent>
        </Card>
    );
}

type ProductsBodyProps = {
    loading: boolean;
    error: string | null;
    products: Product[];
};

function ProductsBody({ loading, error, products }: ProductsBodyProps) {
    if (loading) {
        return <ProductsLoading />;
    }

    if (error) {
        return <div className="flex-1 flex items-center justify-center text-red-600">{error}</div>;
    }

    if (!products.length) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-500">No products</div>
        );
    }

    return <ProductsTable products={products} />;
}
