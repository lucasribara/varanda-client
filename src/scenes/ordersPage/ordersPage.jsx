import { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import OrderItem from "../../components/orderItem/orderItem";
import { useSelector, useDispatch } from "react-redux";
import { getOrders, updateOrderStatus } from "../../actions/order";
import { setOrders } from "../../state";
import { getOrdersByStatus } from "../../helpers/orderHelper";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import "./ordersPage.css"


const OrdersPage = () => {
  const currentUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const [ordersByState, setOrdersByState] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchOrders = async () => {
    const data = await getOrders(token);
    console.log(data);
    dispatch(
      setOrders({
        orders: data
      })
    );
  }

  const updateStatus = async (order) => {
    const newStatus = { code: order.state.code+1 }
    console.log(newStatus);
    const data = await updateOrderStatus(order._id, JSON.stringify(newStatus), token);
    fetchOrders();
    console.log("Atualizando o Status")
  }

  const renderOrdersList = (sectionOrders) => {
    if(!sectionOrders) {
      return (<div>Sem pedidos nessa sessão</div>);
    }
    return (
      <div>
        {
          sectionOrders.map((order) =>
            <OrderItem order={order} user={order.user} isAdmin={true} updateOrder={updateStatus}/>
          )
        }
      </div>

    );
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders && orders.length > 0) {
      setOrdersByState(getOrdersByStatus(orders));
    }
  }, [orders]);

  if( !orders || !ordersByState ) { return <Header /> }
  return (
    <>
      <Header />
      <div className="orders">
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Aguardando Confirmação" value="1" />
          <Tab label="Em preparo" value="2" />
          <Tab label="Pronto para retirada" value="3" />
          <Tab label="Concluído" value="4" />
        </Tabs>
        {value === "1" && <div> {renderOrdersList(ordersByState.state_1)} </div>}
        {value === "2" && <div> {renderOrdersList(ordersByState.state_2)}</div>}
        {value === "3" && <div> {renderOrdersList(ordersByState.state_3)}</div>}
        {value === "4" && <div> {renderOrdersList(ordersByState.state_4)}</div>}
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;