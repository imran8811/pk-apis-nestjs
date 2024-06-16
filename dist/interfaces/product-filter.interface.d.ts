import { Document } from "mongoose";
export interface IProductFilters extends Document {
    readonly color: string[];
    readonly fitting: string[];
    readonly washType: string[];
    readonly category: string[];
    readonly dept: string[];
}
