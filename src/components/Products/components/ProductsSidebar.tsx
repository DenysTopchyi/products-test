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
    priceLocal: string;
    setPriceLocal: (v: string) => void;
    filters: Filters;
    setFilter: <K extends keyof Filters>(k: K, v: Filters[K]) => void;
    onReset: () => void;
};

export default function ProductsSidebar({
    qLocal,
    setQLocal,
    tagLocal,
    setTagLocal,
    priceLocal,
    setPriceLocal,
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
        {
            id: "price",
            label: "Price (exact)",
            placeholder: "e.g. 30",
            type: "number",
            inputMode: "decimal" as const,
            value: priceLocal,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPriceLocal(e.target.value),
        },
    ];

    return (
        <Card className="min-h-[780px]">
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
