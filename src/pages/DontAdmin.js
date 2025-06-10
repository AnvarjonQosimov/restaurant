import "../styles/DontAdmin.css";
import { auth } from "../Firebase/Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function DontAdmin() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className='DontAdmin'>
      <h1>Siz Admin Emassiz !</h1>
      <button className="logoutBtn" onClick={handleSignOut}>Chiqish</button>
    </div>
  );
}

export default DontAdmin;
