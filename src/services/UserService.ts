export const GetAllUser = () => {
  const URL = "https://localhost:7139/GetAll";

  return fetch(URL, {
    method: "GET",
    headers: { "Content-Type": "application/json", charset: "utf-8" },
  });
};

export const AddUsers = (payload: FormData) => {
  const URL = `https://localhost:7128/User/insertUserFile`;

  return fetch(URL, {
    method: "POST",
    body: payload,
  });
};
