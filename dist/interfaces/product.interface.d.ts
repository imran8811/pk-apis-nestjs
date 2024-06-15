import { Document } from "mongoose";
export interface IProduct extends Document {
    _id: string;
    articleNo: string;
    sizes: string;
    color: string;
    fitting: string;
    fabric: string;
    fabricWeight: string;
    washType: string;
    moq: string;
    price: string;
    category: string;
    dept: string;
    slug: string;
    length: string;
    productImages: string[];
}
