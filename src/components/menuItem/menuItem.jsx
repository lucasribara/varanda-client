import { useSelector } from "react-redux";
import { deleteMenuItem } from "../../actions/menu";
import { Button } from "@mui/material";
import "./menuItem.css"

const MenuItem = ({ item }) => {
  const currentUser = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.role ==="admin";

  const handleDelete = async () => {
    const response = await deleteMenuItem(item._id);
    if(response.status === 200) {
      window.location.reload();
    }
  }

  const image = `${import.meta.env.VITE_BASE_URL}/assets/${item.picturePath}`
  return (
    <div className="menu-item" key={item.name}>
      <img className="item-image" alt="foodImage" src={image} />
      <div className="text-area">
        <div>
          <div className="title"> {item.name} </div>
          <div> {item.description} </div>
        </div>
        <div className="price"> R${item.price} </div>
        {isAdmin && <Button onClick={handleDelete}> Deletar item </Button>}
      </div>
    </div>
  );
};

export default MenuItem;