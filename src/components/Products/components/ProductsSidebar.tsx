import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type { Filters } from "@/store/products";

type Props = {
    qLocal: string;
    setQLocal: (v: string) => void;
    tagLocal: string;
    setTagLocal: (v: string) => void;
    priceMinLocal: string;
    setPriceMinLocal: (v: string) => void;
    priceMaxLocal: string;
    setPriceMaxLocal: (v: string) => void;
    filters: Filters;
    setFilter: <K extends keyof Filters>(k: K, v: Filters[K]) => void;
    onReset: () => void;
};

export default function ProductsSidebar({
    qLocal,
    setQLocal,
    tagLocal,
    setTagLocal,
    priceMinLocal,
    setPriceMinLocal,
    priceMaxLocal,
    setPriceMaxLocal,
    filters,
    setFilter,
    onReset,
}: Props) {
    const inputs = [
        {
            id: "q",
            label: "Search (title/vendor)",
            placeholder: "Type to search...",
            type: "text",
            value: qLocal,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setQLocal(e.target.value),
        },
        {
            id: "tag",
            label: "Tags search",
            placeholder: "Dog / Cat / Chews ...",
            type: "text",
            value: tagLocal,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setTagLocal(e.target.value),
        },
        // {
        //     id: "price",
        //     label: "Price (exact)",
        //     placeholder: "e.g. 30",
        //     type: "number",
        //     inputMode: "decimal" as const,
        //     value: priceLocal,
        //     onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPriceLocal(e.target.value),
        // },
        {
            id: "priceMin",
            label: "Price from",
            placeholder: "e.g. 30",
            type: "number",
            inputMode: "decimal" as const,
            value: priceMinLocal,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPriceMinLocal(e.target.value),
        },
        {
            id: "priceMax",
            label: "Price to",
            placeholder: "e.g. 100",
            type: "number",
            inputMode: "decimal" as const,
            value: priceMaxLocal,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPriceMaxLocal(e.target.value),
        },
    ];

    return (
        <Card className="max-h-fit lgx:sticky lgx:top-0 lgx:left-0">
            <CardHeader>
                <CardTitle>Filters</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {inputs.map((field) => (
                    <div key={field.id} className="space-y-2">
                        <Label htmlFor={field.id}>{field.label}</Label>
                        <Input
                            id={field.id}
                            type={field.type}
                            placeholder={field.placeholder}
                            value={field.value}
                            inputMode={field.inputMode}
                            onChange={field.onChange}
                        />
                    </div>
                ))}

                <div className="space-y-2">
                    <Label htmlFor="sub-yes">Subscription (Yes)</Label>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="sub-yes"
                            checked={filters.subscription === "Yes"}
                            onCheckedChange={(checked) =>
                                setFilter("subscription", checked ? "Yes" : "")
                            }
                        />
                        <Label htmlFor="sub-yes" className="font-normal">
                            Only products with subscription
                        </Label>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="pub-only">Published only</Label>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="pub-only"
                            checked={filters.publishedOnly}
                            onCheckedChange={(checked) => setFilter("publishedOnly", !!checked)}
                        />
                        <Label htmlFor="pub-only" className="font-normal">
                            Only published
                        </Label>
                    </div>
                </div>

                <div className="pt-2">
                    <Button variant="outline" onClick={onReset}>
                        Reset
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
