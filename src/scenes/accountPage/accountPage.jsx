import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import {
  Typography,
  TextField,
  Box,
  useMediaQuery,
  Button
} from "@mui/material";
import { Formik } from "formik";
import { updateUser } from "../../actions/user";
import * as yup from "yup";
import { setUser } from "../../state";
import { useSelector, useDispatch } from "react-redux";
import "./accountPage.css"

const schema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  phoneNumber: yup.string().required("required"),
  homeNumber: yup.number().required("required"),
});

const AccountPage = () => {
  const currentUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 500px)");

  const initialValuesEdit = {
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
    homeNumber: currentUser.homeNumber,
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    const edditedUser = await updateUser(JSON.stringify(values), currentUser._id, token);
    console.log(edditedUser);
    if(edditedUser) {
      dispatch(
        setUser({
          user: edditedUser,
        })
      );
    }
  };

  return (
    <>
      <Header />
      <div className="user-info">
        <div> Bem Vindo {`${currentUser.firstName} ${currentUser.lastName}`} </div>
        <div className="form-body">
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesEdit}
            validatinSchema={schema}
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
                  padding={isMobile ? "30px 0" : "30px"}
                  sx={{
                    "& > div": { gridColumn: undefined },
                  }}>

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
                    type="number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.homeNumber}
                    name="homeNumber"
                    error={Boolean(touched.homeNumber) && Boolean(errors.homeNumber)}
                    helperText={touched.homeNumber && errors.homeNumber}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Numero de Telefone"
                    type="phoneNumber"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    name="phoneNumber"
                    error={Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Email"
                    type="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={Boolean(touched.email) && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
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
                    Concluir alterações
                  </Button>                  
                </Box>
              </form>
            )
            }
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  )
};

export default AccountPage;