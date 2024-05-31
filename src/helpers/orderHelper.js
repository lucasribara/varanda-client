export const getIdsFromOrder = (bag) => {
    const bagIds = bag.map(item => item._id);
    return bagIds;
};

export const getOrdersByStatus = (orders) => {
    const stateMap = new Map();

    // Agrupa as orders pelo campo "state"
    for (const order of orders) {
        const stateCode = order.state.code;
        if (!stateMap.has(stateCode)) {
            stateMap.set(stateCode, []);
        }
        stateMap.get(stateCode).push(order);
    }

    //return stateMap;
    // Cria o objeto de resultado
    const resultado = {};
    for (const [stateCode, stateOrders] of stateMap) {
        resultado[`state_${stateCode}`] = stateOrders;
    }

    return resultado;
};