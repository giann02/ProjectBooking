import Hotel from './hotel/Hotel';


import styles from "./hotels_list.module.css";

const HotelsList = ({ data }) => {

    return (
        <div className={styles.hotelsList}>
            {data?.map(hotel => <Hotel key={hotel.id} data={hotel} isReserve={false}/>)}
        </div>
    );

}

export default HotelsList;