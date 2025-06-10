import React, { useState, useEffect } from "react";
import "../styles/Sale.css";
import { auth } from "../Firebase/Firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineFullscreenExit } from "react-icons/ai";
import { AiOutlineFullscreen } from "react-icons/ai";


function Sale() {
  const navigate = useNavigate();
  const [tableNumber, setTableNumber] = useState("");
  const [confirmedTable, setConfirmedTable] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("selectedItems")) || [];
    setSelectedItems(storedItems);

    // Fullscreen o'zgarishini kuzatish
    const onFullScreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", onFullScreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullScreenChange);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleConfirmTable = (e) => {
    e.preventDefault();
    setConfirmedTable(tableNumber);
  };

  const removeItem = (index) => {
    const updatedItems = [...selectedItems];
    updatedItems.splice(index, 1);
    setSelectedItems(updatedItems);
    localStorage.setItem("selectedItems", JSON.stringify(updatedItems));
  };

  const totalPrice = selectedItems.reduce((acc, item) => acc + item.price, 0);

  const totalPreparationTime = selectedItems.reduce((total, item) => {
    const match = item.time.match(/\d+/g);
    if (!match) return total;
    const nums = match.map(Number);
    const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
    return total + Math.round(avg);
  }, 0);

  // Fullscreen toggle funksiyasi
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Fullscreenga o'tishda xatolik: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="Sale">
      <div className="saleHeader">
        <div className="saleTop">
          <div className="logo">
            <h2>Restaran Nomi</h2>
          </div>

          <div className="stolRaqami">
            <form onSubmit={handleConfirmTable}>
              <div className="raqamTop">
                <label>Stolingizning Raqamini Kiriting</label>
              </div>
              <div className="raqamBottom">
                <input
                  type="number"
                  min={1}
                  max={100}
                  required
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                />
                <button type="submit">Tasdiqlash</button>
              </div>
            </form>
          </div>

          <div className="saleChiqish">
            <button className="logoutBtn" onClick={handleSignOut}>
              Chiqish
            </button>
          </div>

          {/* Fullscreen toggle tugmasi */}
          <div className="fullscreenToggle">
            <button onClick={toggleFullscreen}>
              {isFullscreen ? (<AiOutlineFullscreenExit />) : (<AiOutlineFullscreen />)}
            </button>
          </div>
        </div>
        <div className="saleHeaderLine"></div>
      </div>

      <div className="saleBody">
        <div className="bolimlar">
          <div className="bolim">
            <h3>
              <Link to={"/fastfood"}>FastFood</Link>
            </h3>
          </div>
          <div className="bolim">
            <h3>
              <Link to={"/suyuqovqatlar"}>Birinchi Taom</Link>
            </h3>
          </div>
          <div className="bolim">
            <h3>
              <Link to={"/quyuqovqatlar"}>Ikkinchi Taom</Link>
            </h3>
          </div>
          <div className="bolim">
            <h3>
              <Link to={"/yozgiovqatlar"}>Yozgi Ovqatlar</Link>
            </h3>
          </div>
          <div className="bolim">
            <h3>
              <Link to={"/ichimliklar"}>Ichimliklar</Link>
            </h3>
          </div>
          <div className="bolim">
            <h3>
              <Link to={"/muzqaymoqlar"}>Muzqaymoqlar</Link>
            </h3>
          </div>
        </div>

        <div className="tanlanganMahsulotlar">
          <h3>🛒 Tanlangan Mahsulotlar :</h3>
          {selectedItems.map((item, index) => (
            <div key={index} className="mahsulotItem">
              <span>
                {index + 1}. {item.name} ({item.price.toLocaleString()} so'm)
              </span>
              <button onClick={() => removeItem(index)}>❌</button>
            </div>
          ))}

          {selectedItems.length > 0 && (
            <>
              <div className="totalPrice">
                <strong>Jami: {totalPrice.toLocaleString()} so'm</strong>
              </div>
              <div className="prepTime">
                <strong>
                  Tayyorlanish Jarayoni Taxminan ({Math.round(totalPreparationTime / 4)} daq.) davom etadi
                </strong>
              </div>
              {confirmedTable && (
                <div className="tasdiqlanganRaqam">
                  <strong>Stol: {confirmedTable}</strong>
                </div>
              )}
              <button className="tasdiqlashBtn">Tasdiqlandi va To‘landi</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sale;
