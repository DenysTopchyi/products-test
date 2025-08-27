import { useEffect, useState } from "react";
import { useProductsStore } from "@/store/products";

import { useDebouncedValue } from "@/lib/useDebounceValue";
import ProductsSidebar from "./components/ProductsSidebar";
import ProductsCard from "./components/ProductsCard";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";

const DEBOUNCE_VALUE = 350;

export default function Products() {
    const {
        products,
        total,
        page,
        pageSize,
        loading,
        error,
        filters,
        setPage,
        setFilter,
        resetFilters,
        fetchProducts,
    } = useProductsStore();

    const [qLocal, setQLocal] = useState(filters.q);
    const [tagLocal, setTagLocal] = useState(filters.tagQuery);
    const [priceLocal, setPriceLocal] = useState(
        filters.price === null ? "" : String(filters.price)
    );

    const [showFilters, setShowFilters] = useState(false);

    const q = useDebouncedValue(qLocal, DEBOUNCE_VALUE);
    const tagQuery = useDebouncedValue(tagLocal, DEBOUNCE_VALUE);
    const priceDebounced = useDebouncedValue(priceLocal, DEBOUNCE_VALUE);

    useEffect(() => {
        if (q !== filters.q) {
            setFilter("q", q);
        }
    }, [q]);

    useEffect(() => {
        if (tagQuery !== filters.tagQuery) {
            setFilter("tagQuery", tagQuery);
        }
    }, [tagQuery]);

    useEffect(() => {
        const parsed = priceDebounced.trim() === "" ? null : Number(priceDebounced);
        if (parsed !== filters.price) {
            setFilter("price", parsed);
        }
    }, [priceDebounced]);

    useEffect(() => {
        fetchProducts();
    }, [
        fetchProducts,
        filters.q,
        filters.tagQuery,
        filters.publishedOnly,
        filters.price,
        filters.subscription,
        page,
        pageSize,
    ]);

    const handleReset = () => {
        resetFilters();
        setQLocal("");
        setTagLocal("");
        setPriceLocal("");
    };

    useEffect(() => {
        const onResize = () => {
            if (window.matchMedia("(min-width: 968px)").matches) {
                setShowFilters(false);
            }
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <div className="w-full max-w-6xl grid grid-cols-1 gap-6 lgx:grid-cols-[280px,1fr] relative">
            <div className="hidden min-[968px]:block">
                <ProductsSidebar
                    qLocal={qLocal}
                    setQLocal={setQLocal}
                    tagLocal={tagLocal}
                    setTagLocal={setTagLocal}
                    priceLocal={priceLocal}
                    setPriceLocal={setPriceLocal}
                    filters={filters}
                    setFilter={setFilter}
                    onReset={handleReset}
                />
            </div>

            <ProductsCard
                products={products}
                loading={loading}
                error={error}
                total={total}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                onToggleSidebar={() => setShowFilters((prev) => !prev)}
            />

            <Sheet open={showFilters} onOpenChange={setShowFilters}>
                <SheetContent side="left" className="w-96 p-0">
                    <ProductsSidebar
                        qLocal={qLocal}
                        setQLocal={setQLocal}
                        tagLocal={tagLocal}
                        setTagLocal={setTagLocal}
                        priceLocal={priceLocal}
                        setPriceLocal={setPriceLocal}
                        filters={filters}
                        setFilter={setFilter}
                        onReset={() => {
                            handleReset();
                        }}
                    />
                </SheetContent>
            </Sheet>
        </div>
    );
}
