import { React, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Modal,
  Button
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material"
import MenuItem from "../../components/menuItem/menuItem";
import AddMenuItem from "../../components/addMenuItem/addMenuItem";


const MenuPage = () => {
  const [menu, setMenu] = useState(null);
  const [menuByCategory, setMenuByCategory] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false);
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

  const getMenu = async () => {
    //action
    const response = await fetch(`http://localhost:3001/menu`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    setMenu(data);
  }

  useEffect(() => {
    getMenu();

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
        <AddMenuItem></AddMenuItem>
      </Modal>
    )
  }


  if (!menu || !menuByCategory) {
    return null;
  }
  return (
    <div>
      <Button onClick={handleOpen}> Adicionar item ao cardapio </Button>
      {menuByCategory.map((category) => 
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          id="panel1-header"
          sx={{
            height: "100px",
            fontSize: "30px"
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
      {addMenuItemModal()}
    </div>
  );
};

export default MenuPage;