export const GetAllStoreByActive = () => {
  const URL = "https://localhost:7139/api/Store/state/true";

  return fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};
