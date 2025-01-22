import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "./firebase";
import { toast } from "react-toastify";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SignInwithGoogle() {
  const navigate = useNavigate();

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const userDocRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          // Add user to Firestore if they don't already exist
          await setDoc(userDocRef, {
            email: user.email,
            firstName: user.displayName || "",
            lastName: "",
            photo: user.photoURL || "",
          });
        }

        toast.success("User logged in successfully!", {
          position: "top-center",
        });
        navigate("/profile"); // React-friendly navigation
      }
    } catch (error) {
      console.error("Google Login Error:", error.message);
      toast.error("Google sign-in failed. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div>
      <p className="continue-p">-- Or continue with --</p>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={googleLogin}
      >
        <img
          src={require("../google.png")}
          width={"60%"}
          alt="Google Sign-In"
        />
      </div>
    </div>
  );
}

export default SignInwithGoogle;
