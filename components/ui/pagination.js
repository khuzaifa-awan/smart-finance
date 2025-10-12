import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "./utils";
import { buttonVariants } from "./button";

export function Pagination({ className, children, ...props }) {
    return (
        <nav
            role="navigation"
            aria-label="pagination"
            data-slot="pagination"
            className={cn("mx-auto flex w-full justify-center", className)}
            {...props}
        >
            {children}
        </nav>
    );
}

export function PaginationContent({ className, children, ...props }) {
    return (
        <ul
            data-slot="pagination-content"
            className={cn("flex flex-row items-center gap-1", className)}
            {...props}
        >
            {children}
        </ul>
    );
}

export function PaginationItem({ children, ...props }) {
    return (
        <li data-slot="pagination-item" {...props}>
            {children}
        </li>
    );
}

export function PaginationLink({ className, isActive, size = "icon", children, ...props }) {
    const classes = buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
    });

    return (
        <a
            aria-current={isActive ? "page" : undefined}
            data-slot="pagination-link"
            data-active={isActive}
            className={cn(classes, className)}
            {...props}
        >
            {children}
        </a>
    );
}

export function PaginationPrevious({ className, children, ...props }) {
    return (
        <PaginationLink
            aria-label="Go to previous page"
            size="default"
            className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
            {...props}
        >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:block">{children ?? "Previous"}</span>
        </PaginationLink>
    );
}

export function PaginationNext({ className, children, ...props }) {
    return (
        <PaginationLink
            aria-label="Go to next page"
            size="default"
            className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
            {...props}
        >
            <span className="hidden sm:block">{children ?? "Next"}</span>
            <ChevronRight className="w-4 h-4" />
        </PaginationLink>
    );
}

export function PaginationEllipsis({ className, ...props }) {
    return (
        <span
            aria-hidden={true}
            data-slot="pagination-ellipsis"
            className={cn("flex h-9 w-9 items-center justify-center", className)}
            {...props}
        >
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">More pages</span>
        </span>
    );
}
