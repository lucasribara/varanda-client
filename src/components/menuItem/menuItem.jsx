import "./menuItem.css"
import { Button } from "@mui/material";

const MenuItem = ({ item }) => {
  const handleDelete = async () => {
    console.log(item, "item <<<<<<<<<<");
    //action
    const response = await fetch(`http://localhost:3001/menu/${item._id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    window.location.reload();
  }

  const image = `http://localhost:3001/assets/${item.picturePath}`
  return (
    <div className="menu-item" key={item.name}>
      <img className="item-image" alt="foodImage" src={image} />
      <div className="text-area">
        <div>
          <div className="title"> {item.name} </div>
          <div> {item.description} </div>
        </div>
        <div> R${item.price} </div>
        <Button onClick={handleDelete}> Deletar item </Button>
      </div>
    </div>
  );
};

export default MenuItem;