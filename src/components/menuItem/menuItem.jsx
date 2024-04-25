import fileImage from "../menuItem/file.png"
import "./menuItem.css"

const MenuItem = (props) => {

    const image = `http://localhost:3001/assets/${props.picture}`
    console.log(image);
    return (
        <div className="menu-item" key={props.name}>
            <img className="item-image" alt="foodImage" src={image} />
            <div className="text-area">
                <div>
                    <div className="title"> {props.name} </div>
                    <div> {props.description} </div>
                </div>
                <div> R${props.price} </div>
            </div>
        </div>
    );
};

export default MenuItem;