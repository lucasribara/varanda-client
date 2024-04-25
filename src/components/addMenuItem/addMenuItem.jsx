import {
  Typography,
  useMediaQuery,
  TextField,
  Box,
  Button
} from "@mui/material";
import EditOutlineIcon from "@mui/icons-material/EditOutlined";
import { useState } from "react";
import { Formik } from "formik";
import Dropzone from "react-dropzone";
import * as yup from "yup";
import "./addMenuItem.css";

const menuItemSchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup.string().required("required"),
  picturePath: yup.string().required("required"),
  price: yup.number().required("required"),
  category: yup.string().required("required"),
});

const initialValuesMenuItem = {
  name: "",
  description: "",
  picturePath: "",
  price: "",
  category: "",
}

const AddMenuItem = () => {
  const [image, setImage] = useState(null);
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  const addItemOnMenu = async (values, onSubmitProps) => {
    // action
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value])
    }
    formData.append('picturePath', values.picture.name);

    const savedAddedItemResponse = await fetch(
      "http://localhost:3001/menu/add",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedAddedItem = await savedUserResponse.json();
    console.log(savedAddedItem);
    onSubmitProps.resetForm();
  }

  const handleFormSubmit = async (values, onSubmitProps) => {
    await addItemOnMenu(values, onSubmitProps)
  };

  return (
    <div className="add-menu-item-modal">
      <div className="modal-content">
        <Typography id="add-menu-modal-title" variant="h6" component="h2">
          Adicionar item ao cardápio
        </Typography>
        <div className="input-section">
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesMenuItem}
            validatinSchema={menuItemSchema}
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

                  <TextField
                    label="Titulo do prato"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={Boolean(touched.name) && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Descrição do prato"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    name="description"
                    error={Boolean(touched.description) && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Preço do prato"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.price}
                    name="price"
                    error={Boolean(touched.price) && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Categoria do prato"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.category}
                    name="category"
                    error={Boolean(touched.category) && Boolean(errors.category)}
                    helperText={touched.category && errors.category}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid #A3A3A3`}
                    borderRadius="5px"
                    p="1rm"
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={(acceptedFiles) => {
                        setFieldValue("picture", acceptedFiles[0])
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed #A3A3A3`}
                          p="1rm"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!values.picture ? (
                            <p>Adicione aqui a imagem do prato</p>
                          ) : (
                            <div>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlineIcon />
                            </div>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
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
                    Adicionar
                  </Button>                  
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

export default AddMenuItem;