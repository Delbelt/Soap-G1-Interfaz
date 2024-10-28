export const GetAllStock = () => {
  const URL = "https://localhost:7139/Stock/all";

  return fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};
