
export  const getMenu = async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/menu`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
};

export const deleteMenuItem = async (itemId) => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/menu/${itemId}`, {
    method: "DELETE",
  });
  return response;
};

export const addNewMenuItem = async (formData) => {
  const savedAddedItemResponse = await fetch(
    `${import.meta.env.VITE_BASE_URL}/menu/add`,
    {
      method: "POST",
      body: formData,
    }
  );  
  return savedAddedItemResponse;
}