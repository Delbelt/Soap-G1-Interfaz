export const GetAllProduct = () => {
  const URL = "https://localhost:7139/GetAllProducts";

  return fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};

export const GetAllProductByState = (state: boolean) => {
  const URL = `https://localhost:7139/GetAllProductsState/state/${state}`;

  return fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};

//https://localhost:7139/GetAllProductsState/state/false
