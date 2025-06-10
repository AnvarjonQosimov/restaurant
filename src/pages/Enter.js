import "../styles/Enter.css";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";
import { auth, provider, db } from '../Firebase/Firebase.js';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

function Enter() {
  const [isUser, setIsUser] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const adminEmail = "anvarqosimov153@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsUser(true);
        // Автоматический редирект сразу при загрузке
        if (currentUser.email === adminEmail) {
          navigate("/sale");
        } else {
          navigate("/dontAdmin");
        }
        // Можно проверить/добавить пользователя в БД, если нужно
        await checkAndAddUserToFirestore(currentUser);
      } else {
        setUser(null);
        setIsUser(false);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const currentUser = result.user;
      setUser(currentUser);
      setIsUser(true);
      await checkAndAddUserToFirestore(currentUser);

      if (currentUser.email === adminEmail) {
        navigate("/sale");
      } else {
        navigate("/dontAdmin");
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const checkAndAddUserToFirestore = async (user) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", user.email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      await addDoc(usersRef, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      });
    }
  };

  return (
    <div className="Enter">
      {!isUser ? (
        <div className="googleIcon">
          <h1>Google Orqali Ro'yxatdan O'tish</h1>
          <i onClick={googleSignIn}><FcGoogle size={40} /></i>
        </div>
      ) : (
        <div className="welcomeMessage">
          <h2>Hush kelibsiz, {user?.displayName} !</h2>
          <p>Siz yo'naltirilmoqdasiz...</p>
        </div>
      )}
    </div>
  );
}

export default Enter;