import { useEffect, useState } from "react";
import { colRef } from "../../firebase/firebase";
import { addDoc, collection } from "@firebase/firestore";
import { ReactComponent as Addresslogo } from "../../utilities/address.svg";
import { ReactComponent as Phonelogo } from "../../utilities/phone.svg";
import { ReactComponent as Emaillogo } from "../../utilities/email.svg";
import "./people.css";
export default function People(props) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch(
      "https://randomuser.me/api/?results=50&inc=gender,name,location,dob,email,picture,phone"
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data.results);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const addUser = (u) => {
    // fetch the uid of user.

    const user = { ...u, uid: props.user.uid };
    addDoc(colRef, user)
      .then((data) => {
        const newUsers = users.filter((user) => {
          return user.email != u.email;
        });
        setUsers(newUsers);
      })
      .catch((e) => {
        console.log(e);
      });
  };
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
              <button
                className="card_btn"
                onClick={() => {
                  addUser(user);
                }}
              >
                save me
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
