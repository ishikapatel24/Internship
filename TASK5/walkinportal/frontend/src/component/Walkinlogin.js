import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import headerlogo from "../image/headerlogo.png";
import preview from "../image/preview.png";
import style from "../css/login.module.scss";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../mutation/mutation";

export default function Walkinlogin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const goPersonalDetail = () => {
    navigate(`/register/${id}`);
  };

  const [loginUser] = useMutation(LOGIN_USER, {
    onCompleted: (result) => {
      localStorage.setItem("authToken", result.login.token);
      localStorage.setItem("username", result.login.user.email);
      localStorage.setItem("tokenExpiration", result.login.expirationTime);
      navigate(`/jobopeningdetails/${id}/${loginData.username}`);
    },
    onError: (error) => {
      alert("Login unsuccessful. Please check your email and password.");
    },
  });

  const goJobOpening = (event) => {
    event.preventDefault();
    loginUser({
      variables: {
        email: loginData.username,
        password: loginData.password,
        isRemember: loginData.remeber
      },
    });
  };

  function hide() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  const userdata = { username: "", password: "", remeber: false };
  const [loginData, setloginData] = useState(userdata);
  const [flag, setflag] = useState(false);

  function handleData(e) {
    const { name, value, type, checked } = e.target;
    setloginData({
      ...loginData,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  // console.log(loginData.remeber);
  // const { data, error, loading} = useQuery(query, {
  //   variables: {userName:loginData.username},
  // });
  // if (loading) return <h1>Loading...</h1>;
  // if (error) console.log(error);

  return (
    <>
      <nav>
        <div className={style.navbar}>
          <img className={style.logo} src={headerlogo} alt="hey" />
        </div>
      </nav>
      <form onSubmit={goJobOpening}>
        <div className={style.container}>
          <div className={style.main}>
            <div className={style.title1}>Log in</div>
            <input
              type="text"
              className={style.usernameDetail}
              name="username"
              placeholder="Email ID*"
              value={loginData.username}
              onChange={handleData}
            ></input>
            <div className={style.forgotDetail}>forgot email id?</div>
            <div className={style.passwordDetail}>
              <input
                type="password"
                className={style.userdetail}
                name="password"
                id="myInput"
                placeholder="Password*"
                value={loginData.password}
                onChange={handleData}
              ></input>
              <img src={preview} onClick={hide} />
            </div>
            <div className={style.forgotDetail}>forgot password?</div>

            <div className={style.checkbox}>
              <input
                type="checkbox"
                name="remeber"
                checked={loginData.remeber}
                onChange={handleData}
              ></input>
              <label htmlFor="">Remember Me</label>
            </div>

            <div className={style.logInButton}>
              <button>Log In</button>
            </div>

            <div className={style.notRegister}>Not registered yet?</div>
            <div className={style.createAccount}>
              <a href="" onClick={goPersonalDetail}>
                create an account
              </a>
            </div>
          </div>
        </div>
        <footer>
          <div className={style.contactDetail}>
            <a href="" className={style.footerdetails}>
              About
            </a>
            <span> | </span>
            <a href="" className={style.footerdetails}>
              Contact Us
            </a>
          </div>
        </footer>
      </form>
    </>
  );
}
