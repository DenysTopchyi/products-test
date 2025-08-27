import { useEffect, useState } from "react";

const DEFAULT_DEBOUNCE_VALUE = 300;

export function useDebouncedValue<T>(value: T, delay: number = DEFAULT_DEBOUNCE_VALUE): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
}
