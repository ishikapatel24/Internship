import logo from "../image/logo.png";

export default function Navbar(props) {
  return (
    <>
      <nav>
        <div className="navbar">
          <img className="logo" src={logo} alt="headerlogo" />
          {props.userLogo === true ?
          <div className="userNameLogo">U</div> : ""}
        </div>
      </nav>
    </>
  );
}

