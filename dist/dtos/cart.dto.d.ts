import { Product } from "src/schemas";
export declare class CartDTO {
    productId: string;
    userId: string;
    sizes: string[];
    quantity: string[];
    instructions: string;
    amount: number;
    productDetails?: Product;
}
