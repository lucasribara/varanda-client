import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBag, setUserOrders } from "../../state";
import { createOrder, getUserOrder } from "../../actions/order";
import { getIdsFromOrder } from "../../helpers/orderHelper";
import { Button, TextField } from "@mui/material";
import "./orderBag.css"

const OrderBag = () => {
  const [comment, setComment] = useState("");
  const currentUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const bag = useSelector((state) => state.bag);
  const bagPrice = useSelector((state) => state.bagPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const removeItemToBag = (index, item) => {
    let removeBag = bag ? [...bag] : [];
    removeBag.splice(index, 1);
    const newBagPrice = bagPrice - item.price;

    console.log(removeBag);
    dispatch(
      setBag({
        bag: removeBag,
        bagPrice: newBagPrice
      })
    );
  };

  const handleFinishOrder = async () => {
    const itemsIds = getIdsFromOrder(bag);
    let orderBody = {
      user: currentUser._id,
      comment: comment,
      items: itemsIds
    }
    const response = await createOrder(JSON.stringify(orderBody), token);
    if (response) {
      setComment("");
      dispatch(
        setBag({
          bag: [],
          bagPrice: 0
        })
      );
      const userOrders = await getUserOrder(currentUser._id, token);
      if(userOrders) {
        dispatch(
          setUserOrders({
            userOrders: userOrders
          })
        );
        navigate("/usuario/pedidos");
      }
    }
  }

  return (
    <div className="order-bag-modal">
      <div className="body">
        {bag.length === 0 && <div className="title"> Sacola vazia </div>}
        {bag.length > 0 &&
          <>
            <div className="title"> Detalhes do seu Pedido</div>
            {bag.map((item, index) =>
              <div className="item" key={index}>
                <div>{item.name}</div>
                <div>
                  {`R$${item.price}`}
                  <Button onClick={() => removeItemToBag(index, item)}>Remover</Button>
                </div>
              </div>
            )}
            <TextField
              label="Adicione um comentário ou instrução"
              onChange={(e) => { setComment(e.target.value) }}
              value={comment}
              name="comment"
              sx={{ width: "100%", mb: "30px" }}
            />
            <div className="total">
              Total do Pedido: R${bagPrice}
            </div>
            <div className="button-area">
              <Button variant="contained" onClick={handleFinishOrder}>Concluir Pedido</Button>
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default OrderBag;