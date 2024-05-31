import { useSelector } from "react-redux";
import { getMenuItemFromId } from "../../helpers/menuHelper";
import { Button } from "@mui/material";
import "./orderItem.css"

const OrderItem = ({ order, user, isAdmin, updateOrder }) => {
  const menu = useSelector((state) => state.menu);

  const showMenuItem = (id) => {
    const menuItem = getMenuItemFromId(menu, id);

    return (
      <div className="item">
        {`${menuItem.name} - R$${menuItem.price}`}
      </div>
    );
  };
  
  function formatarDataHora(data) {
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(data).toLocaleString('pt-BR', options);
}

  const statusStyle = order.state.code === 4 ? "completed" : "warning";
  return (
    <div className="order-item">
      <div className="title">
        Pedido Casa/Apto {`${user.homeNumber} -- ${formatarDataHora(order.createdAt)}`}
      </div>

      <div className="body">
        <div className="info">
          <div className="info-title">Informações do Cliente:</div>
          <div> {`${user.firstName} ${user.lastName}`} </div>
          <div> {user.phoneNumber} </div>
        </div>

        <div className="info">
          <div className="info-title">Itens do Pedido:</div>
          {order.items.map((itemId) => showMenuItem(itemId))}
        </div>

        <div className="info">
          <div className="info-title">Comentário:</div>
          <div> {order.comment} </div>
        </div>

        <div className="final-info">
          <div className={statusStyle}>{order.state.text}</div>
          <div>R${order.price}</div>
        </div>

      </div>
      {isAdmin && <Button onClick={() => updateOrder(order)}>Atualizar status</Button>}
    </div>
  );
}

export default OrderItem;