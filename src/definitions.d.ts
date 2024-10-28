type Status = "idle" | "loading" | "successfull" | "rejected";

interface dataContent<T> {
  content: T;
}

interface userAuth {
  username: string;
  password: string;
}

interface Product {
  name: string;
  code: string;
  size: string;
  color: string;
  active: boolean;
}

type OrderType = "SOLICITADA";

interface purchaseOrder {
  idPurchaseOrder: number;
  state: OrderType;
  observations: string;
  requestDate: string;
  items: ItemOrder[];
}

interface ProductCatalog {
  active: boolean;
  code: string;
  color: string;
  name: string;
  photo: string;
  size: string;
}

interface Catalog {
  id: number;
  name: string;
  products: ProductCatalog[];
}

interface ItemOrder {
  code: string;
  color: string;
  size: string;
  quantity: number;
}

interface OrderForm {
  store_id: string;
  items: ItemOrder[];
}

interface listQuantity {
  code_item: string;
  quantity: number;
}
