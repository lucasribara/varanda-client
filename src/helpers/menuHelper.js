export const getItemsByCategory = (itens) => {
    return Object.entries(itens.reduce((agrupado, item) => {
      const category = item.category;
      if (!agrupado[category]) {
        agrupado[category] = [];
      }
      agrupado[category].push(item);
      return agrupado;
    }, {})).map(([category, itens]) => ({
      title: category,
      items: itens,
    }));
  };

  export const getMenuItemFromId = (menu, id) => {
    const item = menu.find((menuItem) => menuItem._id === id);
    return item;
};