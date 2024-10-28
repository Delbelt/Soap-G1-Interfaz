export const GetCatalogById = (id = 2) => {
  const URL = `https://localhost:7128/Catalog/${id}`;

  return fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};

export const ExportCatalogById = (id = 2) => {
  const URL = `https://localhost:7128/Catalog/export/${id}`;

  return fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};

export const AddProductByCode = (productCode: string) => {
  const URL = `https://localhost:7128/Catalog/addProduct?productCode=${productCode}`;

  const payload = 2;

  return fetch(URL, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};
