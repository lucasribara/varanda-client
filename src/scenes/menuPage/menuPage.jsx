import { useEffect, useState } from "react";
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
    const [showAddModal, setShowAddModal] = useState(false);
    const handleOpen = () => {
      setShowAddModal(true);
    };
    const handleClose = () => {
      setShowAddModal(false);
    };

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


    if (!menu) {
        return null;
    }
    return (
        <div>
            <Button onClick={handleOpen}> Adicionar item ao cardapio </Button>
            <Accordion>
                <AccordionSummary 
                    expandIcon={<ExpandMore />} 
                    id="panel1-header"
                    sx={{    
                        height: "100px",
                        fontSize: "30px"
                    }}
                >
                    Carnes
                </AccordionSummary>
                <AccordionDetails>
                    <div>
                        {
                            menu.map((item) =>
                                <MenuItem
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    picture={item.picturePath}
                                />
                            )
                        }
                    </div>
                </AccordionDetails>
            </Accordion>
            {addMenuItemModal()}
        </div>
    );
};

export default MenuPage;