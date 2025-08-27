import * as React from "react";
import {
    Pagination as UiPagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
    page: number;
    pageSize: number;
    total: number;
    onChange: (page: number) => void;
    siblingCount?: number;
};

function getPageRange(current: number, totalPages: number, siblingCount = 1) {
    const totalNumbers = siblingCount * 2 + 5;
    if (totalPages <= totalNumbers) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(current - siblingCount, 1);
    const rightSibling = Math.min(current + siblingCount, totalPages);

    const showLeftEllipsis = leftSibling > 2;
    const showRightEllipsis = rightSibling < totalPages - 1;

    const pages: Array<number | "ellipsis"> = [];

    pages.push(1);

    if (showLeftEllipsis) {
        pages.push("ellipsis");
    }

    const start = showLeftEllipsis ? leftSibling : 2;
    const end = showRightEllipsis ? rightSibling : totalPages - 1;

    for (let p = start; p <= end; p++) {
        pages.push(p);
    }

    if (showRightEllipsis) {
        pages.push("ellipsis");
    }

    pages.push(totalPages);

    return pages;
}

export default function AppPagination({
    page,
    pageSize,
    total,
    onChange,
    siblingCount = 1,
}: Props) {
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const canPrev = page > 1;
    const canNext = page < totalPages;
    const range = React.useMemo(
        () => getPageRange(page, totalPages, siblingCount),
        [page, totalPages, siblingCount]
    );

    const goto = (p: number) => {
        const next = Math.min(Math.max(1, p), totalPages);
        if (next !== page) onChange(next);
    };

    const onLink = (e: React.MouseEvent, p: number) => {
        e.preventDefault();
        goto(p);
    };

    return (
        <UiPagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(e) => onLink(e, page - 1)}
                        aria-disabled={!canPrev}
                        className={!canPrev ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {range.map((item, idx) =>
                    item === "ellipsis" ? (
                        <PaginationItem key={`e-${idx}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={item}>
                            <PaginationLink
                                href="#"
                                isActive={item === page}
                                onClick={(e) => onLink(e, item)}
                            >
                                {item}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(e) => onLink(e, page + 1)}
                        aria-disabled={!canNext}
                        className={!canNext ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </UiPagination>
    );
}
