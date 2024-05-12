import {
  Typography,
  useMediaQuery,
  TextField,
  Box,
  Button
} from "@mui/material";
import { register, login } from "../../actions/user"
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import "./userForm.css";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  homeNumber: yup.number().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  homeNumber: "",
}

const initialValuesLogin = {
  email: "",
  password: "",
}

const UserForm = () => {
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const registerUser = async (values, onSubmitProps) => {
    const response = await register(JSON.stringify(values));
    console.log(response);
    console.log("Registered User");
    onSubmitProps.resetForm();

    setPageType("login");
  }

  const loginUser = async (values, onSubmitProps) => {
    const response = await login(JSON.stringify(values));
    console.log(response);
    console.log("Loggined User");
    onSubmitProps.resetForm();
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await loginUser(values, onSubmitProps);
    if (isRegister) await registerUser(values, onSubmitProps)
  };

  return (
    <div className="user-form">
      <div className="form-content">
        <Typography id="form-title" variant="h6" component="h2">
          {isLogin ? "Login" : "Registro"}
        </Typography>
        <div className="input-section">
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validatinSchema={isLogin ? loginSchema : registerSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap="30px"
                  padding="30px"
                  sx={{
                    "& > div": { gridColumn: undefined },
                  }}>
                  {isRegister && (
                    <>
                      <TextField
                        label="Nome"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        name="firstName"
                        error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                        helperText={touched.firstName && errors.firstName}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        label="Sobrenome"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        name="lastName"
                        error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                        helperText={touched.lastName && errors.lastName}
                        sx={{ gridColumn: "span 2" }}
                      />
                      <TextField
                        label="Numero da casa ou apartamento"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.homeNumber}
                        name="homeNumber"
                        error={Boolean(touched.homeNumber) && Boolean(errors.homeNumber)}
                        helperText={touched.homeNumber && errors.homeNumber}
                        sx={{ gridColumn: "span 2" }}
                      />
                    </>
                  )}
                  <TextField
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Senha"
                    type="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={Boolean(touched.password) && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 2" }}
                  />
                </Box>
                <Box>
                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      m: "2rem 0",
                      p: "1rem",
                    }}
                  >
                    {isLogin ? "Login" : "Concluir cadastro"}
                  </Button>
                  <div className="change-register-login">
                  <Typography
                    onClick={() => {
                      setPageType(isLogin ? "register" : "login");
                      resetForm();
                    }}
                    sx={{
                      textDecoration: "underline",
                      color: "#1976d2",
                      "&:hover": {
                        cursor: "pointer",
                        color: "#93CCEA",
                      },
                    }}
                  >
                    {isLogin
                      ? "Não tem uma conta? Se registre aqui"
                      : "Já tem uma conta? Faça login aqui"}
                  </Typography>
                  </div>                  
                </Box>
              </form>
            )
            }
          </Formik>
        </div>
      </div>
    </div>
  );

};

export default UserForm;