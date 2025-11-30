import { AddProductPayload } from "./addProductPayload";
export interface CartItem extends AddProductPayload {
  quantity: number;
}