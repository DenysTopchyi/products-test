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

const FIRST_PAGE = 1;
const SINGLE_STEP = 1;
const BASE_CORE_BUTTONS = 5;
const LEFT_EDGE_GAP_AFTER = 2;
const RIGHT_EDGE_GAP_BEFORE = 1;
const ELLIPSIS = "ellipsis" as const;
type PageToken = number | typeof ELLIPSIS;

function getPageRange(current: number, totalPages: number, siblingCount = 1): PageToken[] {
    const totalNumbers = siblingCount * 2 + BASE_CORE_BUTTONS;

    if (totalPages <= totalNumbers) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(current - siblingCount, FIRST_PAGE);
    const rightSibling = Math.min(current + siblingCount, totalPages);

    const showLeftEllipsis = leftSibling > LEFT_EDGE_GAP_AFTER;
    const showRightEllipsis = rightSibling < totalPages - RIGHT_EDGE_GAP_BEFORE;

    const pages: PageToken[] = [];

    pages.push(FIRST_PAGE);

    if (showLeftEllipsis) {
        pages.push(ELLIPSIS);
    }

    const start = showLeftEllipsis ? leftSibling : FIRST_PAGE + SINGLE_STEP;
    const end = showRightEllipsis ? rightSibling : totalPages - SINGLE_STEP;

    for (let p = start; p <= end; p++) {
        pages.push(p);
    }

    if (showRightEllipsis) {
        pages.push(ELLIPSIS);
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
    const totalPages = Math.max(FIRST_PAGE, Math.ceil(total / pageSize));
    const canGoPrev = page > FIRST_PAGE;
    const canGoNext = page < totalPages;

    const range = React.useMemo(
        () => getPageRange(page, totalPages, siblingCount),
        [page, totalPages, siblingCount]
    );

    const goto = (p: number) => {
        const next = Math.min(Math.max(FIRST_PAGE, p), totalPages);
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
                        onClick={(e) => onLink(e, page - SINGLE_STEP)}
                        aria-disabled={!canGoPrev}
                        className={!canGoPrev ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>

                {range.map((item, idx) =>
                    item === ELLIPSIS ? (
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
                        onClick={(e) => onLink(e, page + SINGLE_STEP)}
                        aria-disabled={!canGoNext}
                        className={!canGoNext ? "pointer-events-none opacity-50" : ""}
                    />
                </PaginationItem>
            </PaginationContent>
        </UiPagination>
    );
}
