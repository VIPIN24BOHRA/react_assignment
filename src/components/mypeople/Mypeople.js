import { getDocs, query, where } from "@firebase/firestore";
import { colRef } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { ReactComponent as Addresslogo } from "../../utilities/address.svg";
import { ReactComponent as Phonelogo } from "../../utilities/phone.svg";
import { ReactComponent as Emaillogo } from "../../utilities/email.svg";
import Loader from "react-loader-spinner";
import "../people/people.css";
export default function Mypeople(props) {
  const q = query(colRef, where("uid", "==", props.user.uid));
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(async () => {
    setLoading(true);
    try {
      const getSnapShot = await getDocs(q);
      let allUser = [];
      getSnapShot.docs.forEach((doc) => {
        allUser.push({ ...doc.data() });
      });
      setUsers(allUser);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className="people_page">
      <div className="card_box">
        {users.map((user) => (
          <div className="card">
            <div className="card_img_box">
              <img
                src={user.picture.medium}
                alt="profile pic"
                className="card_img"
              />

              <p className="card_img_caption">
                {/* <Userlogo className="card_logo" /> */}
                {`${user.name.title} ${user.name.first} ${user.name.last}`}
              </p>
            </div>
            <div className="card_text_box">
              <p className="card_text">
                <Emaillogo className="card_logo" />
                {user.email}
              </p>
              <p className="card_text">
                <Phonelogo className="card_logo" />
                {user.phone}
              </p>
              <p className="card_text">
                <Addresslogo className="card_logo" />
                {`${user.location.city}, ${user.location.state}, ${user.location.country}, ${user.location.postcode}`}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        {loading && (
          <Loader
            type="ThreeDots"
            color="blue"
            height={200}
            width={200}
            className="loading"
          />
        )}
      </div>
    </div>
  );
}
