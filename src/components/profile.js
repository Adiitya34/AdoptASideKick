import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (auth.currentUser) {
        const userDoc = doc(db, "Users", auth.currentUser.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          setUserDetails(userSnapshot.data());
        } else {
          console.log("No user details found in Firestore.");
        }
      }
    };

    fetchUserDetails();
  }, []);

  if (!userDetails) {
    return <h2>Loading user details...</h2>;
  }

  return (
    <div className="profile">
      <h1>Welcome, {userDetails.firstName} {userDetails.lastName}</h1>
      <p><strong>Email:</strong> {userDetails.email}</p>
      {userDetails.photo ? (
        <img
          src={userDetails.photo}
          alt="Profile"
          style={{ width: "150px", borderRadius: "50%" }}
        />
      ) : (
        <img
          src="https://via.placeholder.com/150"
          alt="Default Profile"
          style={{ width: "150px", borderRadius: "50%" }}
        />
      )}
    </div>
  );
}

export default Profile;
