export const register = async (values) => {
  console.log(values);
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: values,
  });
  const data = await response.json();
  return data;
};

export const login = async (values) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: values,
  });
  const data = await response.json();
  return data;
};

export const updateUser = async (values, id, token) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: values,
  });
  const data = await response.json();
  return data;
};