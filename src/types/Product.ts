export interface Product {
    id: number;
    slug: string;
    title: string;
    vendor: string;
    tags: string[];
    published: boolean;
    url: string;
    image_src: string;
    option_value: string;
    sku: string;
    price: number;
    subscription_discount: number | "";
    subscription: boolean;
}
