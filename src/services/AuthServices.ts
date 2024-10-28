export const LoginAuth = (payload: string) => {
  const URL = "https://localhost:7139/Auth/login";

  return fetch(URL, {
    method: "POST",
    body: payload,
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};
