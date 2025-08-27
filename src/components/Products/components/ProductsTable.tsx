import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import type { Product } from "@/store/products";
import noImage from "@/assets/no_image.svg";

type Props = {
    products: Product[];
};

export default function ProductsTable({ products }: Props) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Subscription</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {products.map((p) => (
                    <TableRow key={p.id}>
                        <TableCell>
                            <div className="flex items-center gap-3">
                                <img
                                    src={p.image_src || noImage}
                                    alt={p.title}
                                    className="w-12 h-12 rounded object-cover"
                                    loading="lazy"
                                    onError={(e) => {
                                        const img = e.currentTarget;
                                        img.onerror = null;
                                        img.src = noImage;
                                    }}
                                />
                                <div>
                                    <div className="font-medium">{p.title}</div>
                                    <div className="text-xs text-gray-500">
                                        {p.vendor} • {p.option_value}
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>{p.tags.join(", ")}</TableCell>
                        <TableCell>${p.price}</TableCell>
                        <TableCell>{p.subscription ? "Yes" : "No"}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
