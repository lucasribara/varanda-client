
export  const getMenu = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/menu`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
};

export const deleteMenuItem = async (itemId, token) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/menu/${itemId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

export const addNewMenuItem = async (formData, token) => {
  const savedAddedItemResponse = await fetch(
    `${import.meta.env.VITE_BASE_URL}/menu/add`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    }
  );  
  return savedAddedItemResponse;
}