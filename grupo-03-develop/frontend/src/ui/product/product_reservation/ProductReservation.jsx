import styles from "./productReservation.module.css";
import "./productCalendar.css"

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Calendar } from "react-multi-date-picker";

const ProductReservation = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [value, setValue] = useState([]);

  const weekDays = ["D", "L", "M", "M", "J", "V", "S"];
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const handleChange = (value) => {
    setValue(value);
  }

  const redirect = () => {
    const user = sessionStorage.getItem("user");
    const parsedUser = JSON.parse(user);
    if (parsedUser == null) {
      navigate("/login");
    } else {
      navigate(`/product/${id}/booking`);
    }
  }

  return (
    <div className={styles.containerProductCalendar}>
      <div className={styles.title}>
        <div className="container">
          <div className="row">
            <h2>Fechas disponibles</h2>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className={styles.productCalendarPcContainer}>
            <div className="productCalendar">
              <Calendar
                value={value}
                onChange={handleChange}
                weekDays={weekDays}
                months={months}
                numberOfMonths={2}
                range
                disableMonthPicker
                disableYearPicker
                minDate={new Date()}
              />
            </div>
            <div className={styles.productReserve}>
              <p style={{ color: "black", fontWeight: "600" }}>
                Agrega tus fechas de viaje para obtener precios exactos
              </p>
              <button onClick={redirect} className={styles.btnProduct}>
                Iniciar reserva
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className={styles.productCalendarMobileContainer}>
            <div className="productCalendarMobile">
              <Calendar
                zIndex={1}
                value={value}
                onChange={handleChange}
                weekDays={weekDays}
                months={months}
                numberOfMonths={1}
                range
                disableMonthPicker
                disableYearPicker
                minDate={new Date()}
              />
            </div>
            <div className={styles.productReserve}>
              <p style={{ color: "black", fontWeight: "600" }}>
                Agrega tus fechas de viaje para obtener precios exactos
              </p>
              <button onClick={redirect} className={styles.btnProduct}>
                Iniciar reserva
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReservation;
