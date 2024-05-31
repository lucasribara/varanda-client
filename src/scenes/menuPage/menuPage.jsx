import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBag, setMenu } from "../../state";
import { getMenu } from "../../actions/menu";
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
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import { getItemsByCategory } from "../../helpers/menuHelper";
import "./menuPage.css"

const MenuPage = () => {
  const menu = useSelector((state) => state.menu);
  const [menuByCategory, setMenuByCategory] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false);
  const currentUser = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.role === "admin";
  const dispatch = useDispatch();
  const bag = useSelector((state) => state.bag);
  const bagPrice = useSelector((state) => state.bagPrice);

  const handleOpen = () => {
    setShowAddModal(true);
  };
  const handleClose = () => {
    setShowAddModal(false);
  };

  const addItemToBag = (item) => {
    let addedBag = bag ? [...bag] : [];
    addedBag.push(item)
    const newBagPrice = bagPrice + item.price;

    dispatch(
      setBag({
        bag: addedBag,
        bagPrice: newBagPrice
      })
    );
  };

  const updateMenu = async () => {
    const data = await getMenu();
    // setMenu(data);
    dispatch(
      setMenu({
        menu: data
      })
    );
  }

  useEffect(() => {
    updateMenu();
  }, []);

  useEffect(() => {
    if (menu.length > 0) {
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
        {menuByCategory.map((category, index) =>
          <div key={index}>
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
                        item={item}
                        addToBag={addItemToBag}
                      />
                    )
                  }
                </div>
              </AccordionDetails>
            </Accordion>
          </div>

        )}
      </div>
      <Footer />
      {addMenuItemModal()}
    </div>
  );
};

export default MenuPage;