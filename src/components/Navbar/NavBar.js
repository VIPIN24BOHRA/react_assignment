import { ReactComponent as Logo } from "../../utilities/people.svg";
import { signOut } from "firebase/auth";
import { authentication } from "../../firebase/firebase";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const Navigate = useNavigate();
  const signOutUser = () => {
    signOut(authentication)
      .then(() => {
        console.log("signout succesfully");
        Navigate("/", { replace: true });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="nav">
      <Logo className="logo" />
      <div className="nav_box">
        <Link to="/people" className="nav_link">
          <button className="nav_button"> People</button>
        </Link>

        <Link to="/mypeople" className="nav_link">
          <button className="nav_button">MyPeople</button>
        </Link>

        <button
          className="nav_button"
          onClick={() => {
            signOutUser();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
