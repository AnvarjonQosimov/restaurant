import { FaPlus, FaAngleLeft } from "react-icons/fa";
import "../styles/FastFood.css";
import { Link } from "react-router-dom";

function FastFood() {
  const addToOrder = (item) => {
    const existing = JSON.parse(localStorage.getItem("selectedItems")) || [];
    existing.push(item);
    localStorage.setItem("selectedItems", JSON.stringify(existing));
  };

  const foods = [
    { name: "Lavash", price: 20000, time: "5-7 min." },
    { name: "Burger", price: 25000, time: "5-7 min." },
    { name: "Donar", price: 30000, time: "8-10 min." },
    { name: "Sendvich", price: 15000, time: "4-6 min." },
    { name: "Shourma", price: 40000, time: "13-15 min." },
    { name: "HotDog", price: 10000, time: "4-6 min." },
    { name: "Pitsa", price: 50000, time: "18-20 min." },
  ];

  return (
    <div className="FastFood">
      <div className="orqaga">
        <i><Link to={"/sale"}><FaAngleLeft /> Orqaga</Link></i>
      </div>
      <div className="fastFoodBolimlar">
        {foods.map((item, index) => (
          <div className="fastFoodBolim" key={index}>
            <div className="fastFoodText">
              <h1>{item.name}</h1>
              <h3>Narxi: {item.price.toLocaleString()} so'm</h3>
              <p>Tayyorlanish Jarayoni: {item.time}</p>
            </div>
            <div className="fastFoodIcon" onClick={() => addToOrder(item)}>
              <i><FaPlus /></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FastFood;