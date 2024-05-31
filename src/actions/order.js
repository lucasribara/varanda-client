export const createOrder = async (values, token) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/order/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: values,
    });
    
    if(response.status != 201) return null;
    const data = await response.json();
    return data;
};

export const getUserOrder = async (id, token) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/order/all/${id}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if(response.status != 200) return null;
  const data = await response.json();
  return data;
};

export const getOrders = async (token) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/order/all`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if(response.status != 200) return null;
  const data = await response.json();
  return data;
};

export const updateOrderStatus = async (id, state, token) => {  
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/order/status/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: state,
  });
  console.log(response);
  if(response.status != 200) return null;
  const data = await response.json();
  return data;
};

