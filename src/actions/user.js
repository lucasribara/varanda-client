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