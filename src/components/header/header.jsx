import "./header.css"
import logo from "../../assets/varanda-logov3.png"

const Header = () => {
    return (
        <div className="header">
            <img className="logo" alt="varanda-logo" src={logo} />
        </div>
    );
}

export default Header;