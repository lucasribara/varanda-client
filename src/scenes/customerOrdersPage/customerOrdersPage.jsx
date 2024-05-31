import { useEffect } from "react";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import OrderItem from "../../components/orderItem/orderItem";
import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getUserOrder } from "../../actions/order";
import { setUserOrders } from "../../state";

const CustomerOrdersPage = () => {
  const currentUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const orders = useSelector((state) => state.userOrders)
  const dispatch = useDispatch();

  const fetchCustomerOrders = async () => {
    const data = await getUserOrder(currentUser._id, token);
    // console.log(data);
    dispatch(
      setUserOrders({
        userOrders: data
      })
    );
  }

  useEffect(() => {
    fetchCustomerOrders();
  }, []);

  return (
    <>
      <Header />
      <Button onClick={fetchCustomerOrders}> Atualizar </Button>
      <div>
        {
          orders.map((order) =>     
            <OrderItem order={order} user={currentUser}/>
          )
        }
      </div>
      <Footer />
    </>
  );
};

export default CustomerOrdersPage;