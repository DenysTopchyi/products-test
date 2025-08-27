export function buildQuery(params: Record<string, unknown>) {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => {
        if (v === undefined || v === null || v === "") {
            return;
        }

        if (Array.isArray(v)) {
            v.forEach((item) => qs.append(k, String(item)));
        } else {
            qs.set(k, String(v));
        }
    });
    return qs.toString();
}
