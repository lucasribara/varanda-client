import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Modal,
  Button
} from "@mui/material";
import { getMenu } from "../../actions/menu";
import { ExpandMore } from "@mui/icons-material"
import MenuItem from "../../components/menuItem/menuItem";
import AddMenuItem from "../../components/addMenuItem/addMenuItem";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import "./menuPage.css"

const MenuPage = () => {
  const [menu, setMenu] = useState(null);
  const [menuByCategory, setMenuByCategory] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false);
  const currentUser = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.role ==="admin";

  const handleOpen = () => {
    setShowAddModal(true);
  };
  const handleClose = () => {
    setShowAddModal(false);
  };


  const getItemsByCategory = (itens) => {
    return Object.entries(itens.reduce((agrupado, item) => {
      const category = item.category;
      if (!agrupado[category]) {
        agrupado[category] = [];
      }
      agrupado[category].push(item);
      return agrupado;
    }, {})).map(([category, itens]) => ({
      title: category,
      items: itens,
    }));
  }

  const updateMenu = async () => {
    const data = await getMenu();
    setMenu(data);
  }

  useEffect(() => {
    updateMenu();
  }, []);

  useEffect(() => {
    if (menu) {
      setMenuByCategory(getItemsByCategory(menu));
    }
  }, [menu]);

  const addMenuItemModal = () => {
    return (
      <Modal
        open={showAddModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddMenuItem />
      </Modal>
    )
  }

  if (!menu || !menuByCategory) {
    return null;
  }
  return (
    <div className="menu-page">
      <Header />
      <div className="menu-page-content">
      {isAdmin && <Button onClick={handleOpen}> Adicionar item ao cardapio </Button>}
        {menuByCategory.map((category) =>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              id="panel1-header"
              sx={{
                height: "100px",
                fontSize: "30px",
                fontFamily: ["Yeseva One", "serif"].join(","),
              }}
            >
              {category.title}
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {
                  category.items.map((item) =>
                    <MenuItem
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      picture={item.picturePath}
                      item={item}
                    />
                  )
                }
              </div>
            </AccordionDetails>
          </Accordion>
        )}
      </div>
      <Footer />
      {addMenuItemModal()}
    </div>
  );
};

export default MenuPage;