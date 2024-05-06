import "./menuItem.css"
import { deleteMenuItem } from "../../actions/menu";
import { Button } from "@mui/material";

const MenuItem = ({ item }) => {
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
        {/* <Button onClick={handleDelete}> Deletar item </Button> */}
      </div>
    </div>
  );
};

export default MenuItem;