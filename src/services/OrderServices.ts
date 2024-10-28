//https://localhost:7139/GetAllPurchaseOrders/SOLICITADA

export const GetAllOrderByState = (state: OrderType) => {
  const URL = `https://localhost:7139/GetAllPurchaseOrders/${state}`;

  return fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};

export const GetAllOrder = () => {
  const URL = `https://localhost:7139/GetAllPurchaseOrders`;

  return fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};

export const GetAllOrderFilter = () => {
  const URL = `https://localhost:7128/PurchaseOrder/search`;

  return fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};

export const GetFilterByUser = (id = 1) => {
  const URL = `https://localhost:7128/api/Filter/${id}`;

  return fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};

export const PostFilterOrder = (payload: string) => {
  const URL = "https://localhost:7128/api/Filter";

  return fetch(URL, {
    method: "POST",
    body: payload,
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};

export const GetOrderById = (id: number) => {
  const URL = `https://localhost:7139/PurchaseOrder/${id}`;

  return fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};

export const PostOrder = (payload: string) => {
  const URL = "https://localhost:7139/PurchaseOrder";

  return fetch(URL, {
    method: "POST",
    body: payload,
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};

//
export const OrderProcessing = () => {
  const URL = `https://localhost:7139/OrderProcessing/run`;

  return fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};
