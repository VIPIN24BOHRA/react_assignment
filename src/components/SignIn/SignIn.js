import logo from "../../utilities/google.png";
import "./signIn.css";
import { authentication } from "../../firebase/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
export default function SignIn() {
  const signInUser = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="signin_page">
      <h1>Welcome To MyPeople's App</h1>
      <div className="signin_block">
        <img src={logo} className="google_logo" />
        <h3>Sign In</h3>
        <span
          className="signin"
          onClick={() => {
            signInUser();
          }}
        >
          <img src={logo} />
          <p>Sign In With Google</p>
        </span>
      </div>
    </div>
  );
}
