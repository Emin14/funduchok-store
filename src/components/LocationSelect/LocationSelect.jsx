import React, { useEffect, useRef, useState } from "react";
import styles from './locationSelect.module.css';
import { CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { writingCity } from "../../Redux/slices/citySlice";

export default function LocationSelect() {
   // const [city, setCity] = useState("Москва");
   const [isOpen, setIsOpen] = useState(false);
   const city = useSelector((state) => state.city.city);
   const dispatch = useDispatch();

   const handleCityChange = (e) => {
      e.stopPropagation()
      const city = e.target.textContent
      // setCity(city)
      setIsOpen(false); // Закрытие списка после выбора
      dispatch(writingCity(city))
    };

   return (
     <div className={styles.citySelector}
     onClick={() => setIsOpen(prevState => !prevState)}

      >
       <CiLocationOn className={styles.icon} />
       <div
         className={`${styles.selectBox} ${isOpen ? styles.open : ""}`}


       >
         <span className={styles.selectedCity}>{city}</span>
         {/* <i className={`${styles.arrow} ${isOpen ? styles.opened : ""}`}>&#x25BC;</i> */}
       </div>
 
       {isOpen && (
         <ul className={styles.dropdown}>
           <li className={styles.dropdownItem} onClick={handleCityChange}>Москва</li>
           <li className={styles.dropdownItem} onClick={handleCityChange}>Казань</li>
         </ul>
       )}
     </div>
   );
 };