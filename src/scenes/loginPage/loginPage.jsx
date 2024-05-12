import { Box, Typography, useMediaQuery } from "@mui/material";
import Header from "../../components/header/header"; 
import UserForm from "../../components/userForm/userForm";
import "./loginPage.css";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <div className="login-page">
      <Header />
      <div className="body">
        <div className="title">
          Bem vindo ao Varanda Bistrô
        </div>
        <UserForm />
      </div>
    </div>
  )
};

export default LoginPage;