import { useState, useEffect } from "react";
import "../styles/TolanganSumma.css";
import {Link} from "react-router-dom"
import { FaAngleLeft } from "react-icons/fa";

function TolanganSumma() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [paidAmount, setPaidAmount] = useState("");
  const [change, setChange] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("totalPrice");
    if (stored) {
      setTotalPrice(parseFloat(stored));
    }
  }, []);

  const handlePaidAmountChange = (e) => {
    const value = e.target.value;
    setPaidAmount(value);

    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setChange(numValue - totalPrice);
    } else {
      setChange(null);
    }
  };

  return (
    <div className='TolanganSumma'>
      <div className="orqaga">
        <i><Link to={"/sale"}><FaAngleLeft /> Orqaga</Link></i>
      </div>
      <div className="summaBlock">
        <div className="tolanishiKerakBolganSumma">
          <h1>To'lanishi Kerak Bo'lgan Summa :</h1>
          <h1>{totalPrice.toLocaleString()} so'm</h1>
        </div>

        <div className="tolanganSumma">
          <h1>To'langan Summa :</h1>
          <input
            type="number"
            min="0"
            placeholder="To‘langan summani kiriting"
            value={paidAmount}
            onChange={handlePaidAmountChange}
          />
          <h1>{paidAmount && !isNaN(change) ? parseFloat(paidAmount).toLocaleString() + " so'm" : ""}</h1>
        </div>

        <div className="berilishiKerakBolganQaytim">
          <h1>Berilishi Kerak Bo'lgan Qaytim:</h1>
          <h1>
            {change !== null && !isNaN(change)
              ? (change >= 0 ? change.toLocaleString() + " so'm" : "To'lov yetarli emas")
              : ""}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default TolanganSumma;
