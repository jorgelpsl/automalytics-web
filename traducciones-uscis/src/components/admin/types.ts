import type { OrderStatus } from "@/lib/order-store";

// What the admin client components receive: plain, serializable data.
export interface AdminOrder {
  code: string;
  createdAt: string;
  amountTotal: number;
  name: string;
  documentType: string;
  pages: number;
  pagesPaid: number;
  deadline: string;
  notes: string;
  email: string;
  phone: string;
  status: OrderStatus;
  edited: boolean;
}

export interface AdminFile {
  pathname: string;
  name: string;
  size: number;
  pages: number;
}
