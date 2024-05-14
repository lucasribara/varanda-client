import { useSelector } from "react-redux";
import logo from "../../assets/varanda-logov3.png"
import { Button } from "@mui/material";
import { Person, ShoppingBag } from '@mui/icons-material';
import { setLogout } from "../../state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./header.css"

const Header = (props) => {
  const isAuth = Boolean(useSelector((state) => state.token));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userSection = () => {
    return (
      <div className="loggedin-user">
        <div>
          <Button onClick={() => dispatch(setLogout())}> Sair </Button>
        </div>
        <div>
          <Person fontSize="large" onClick={() => { navigate("/usuario") }} sx={{ "&:hover": { cursor: "pointer" }, pr: "1.5rem" }} />
          <ShoppingBag fontSize="large" onClick={() => { console.log("Bag") }} sx={{ "&:hover": { cursor: "pointer" } }} />
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
    </>
  );
}

export default Header;