import { useSelector } from "react-redux";
import { deleteMenuItem } from "../../actions/menu";
import { Button } from "@mui/material";
import "./menuItem.css"

const MenuItem = ({ item, addToBag }) => {
  const currentUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isAuth = Boolean(useSelector((state) => state.token));
  const isAdmin = currentUser && currentUser.role ==="admin";

  const handleDelete = async () => {
    const response = await deleteMenuItem(item._id, token);
    if(response.status === 200) {
      window.location.reload();
    }
  }

  const image = `${import.meta.env.VITE_BASE_URL}/assets/${item.picturePath}`
  return (
    <div className="menu-item" key={item._id}>
      <img className="item-image" alt="foodImage" src={image} />
      <div className="text-area">
        <div>
          <div className="title"> {item.name} </div>
          <div> {item.description} </div>
        </div>
        <div className="price"> R${item.price} </div>
        {isAdmin && <Button onClick={handleDelete}> Deletar item </Button>}
        {/* {isAuth && !isAdmin && <Button onClick={addToBag(item)}> Adicionar a sacola</Button>} */}
        {isAuth && <Button onClick={() => addToBag(item)}> Adicionar a sacola</Button>}
      </div>
    </div>
  );
};

export default MenuItem;