import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/varanda-logov3.png"
import { Button, Modal, Badge } from "@mui/material";
import { Person, ShoppingBag } from '@mui/icons-material';
import OrderBag from "../ordeBag/orderBag";
import { setLogout } from "../../state";

import "./header.css"

const Header = (props) => {
  const isAuth = Boolean(useSelector((state) => state.token));
  const currentUser = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.role === "admin";
  const bag = useSelector((state) => state.bag);
  const [showBagModal, setShowBagModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpen = () => {
    setShowBagModal(true);
  };
  const handleClose = () => {
    setShowBagModal(false);
  };
  const orderBagModal = () => {
    return (
      <Modal
        open={showBagModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <OrderBag />
      </Modal>
    )
  }

  const userSection = () => {
    return (
      <div className="loggedin-user">
        <div>
          <Button onClick={() => dispatch(setLogout())}> Sair </Button>
        </div>
        <div className="actions">
          {isAdmin && <Button onClick={() => { navigate("/admin/pedidos") }} variant="outlined">Pedidos</Button>}
          {!isAdmin && <Button onClick={() => { navigate("/usuario/pedidos") }} variant="outlined">Meus Pedidos</Button>}
          <Person fontSize="large" onClick={() => { navigate("/usuario") }} sx={{ "&:hover": { cursor: "pointer" }, pr: "1.5rem", pl: "1.5rem" }} />
          {
            !isAdmin &&
            <Badge badgeContent={bag.length} color="secondary" overlap="circular">
              <ShoppingBag fontSize="large" onClick={handleOpen} sx={{ "&:hover": { cursor: "pointer" } }} />
            </Badge>
          }
        </div>
      </div>
    );
  }
  const loginButton = () => {
    return (
      <div className="loggedout">
        <Button onClick={() => navigate("/login")} size="medium">
          Login
        </Button>
      </div>
    )
  }

  return (
    <>
      {!props.inLogin &&
        <div className="user-bar">
          {isAuth && userSection()}
          {!isAuth && loginButton()}
        </div>
      }
      <div className="header">
        <img className="logo" alt="varanda-logo" src={logo} onClick={() => navigate("/")} />
      </div>
      {orderBagModal()}
    </>
  );
}

export default Header;