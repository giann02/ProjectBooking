import { GlobalContext } from '../../../components/utils/global.context';

import styles from './hotel.module.css';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';

import { extractNumbersFromString } from '../../../functions/extractNumbersFromString';
import { urlBase } from '../../../apiUrl.json'

import HotelRating from './hotel_rating/HotelRating';

const Hotel = ({ data, isReserve, reserve, completeData, setCompleteData }) => {

    const navigate = useNavigate()

    const { user } = useContext(GlobalContext)

    const handleDelete = () => {

        Swal.fire({
            title: 'Estas seguro?',
            text: "No se podra deshacer",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`${urlBase}/reservas/${reserve.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then(res => {
                    if (res.status === 200) {
                        Swal.fire(
                            'Cancelada!',
                            'La reserva se ha cancelado con exito',
                            'success'
                        ).then(() => {
                            const reserveId = reserve.id.toString()
                            const removeReserve = completeData.filter(({ id }) => !reserveId.includes(id))
                            setCompleteData(removeReserve)
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Algo ha fallado...',
                            text: 'Intentelo mas tarde',
                        })
                    }
                })
                    .catch(error => console.error(error))

            }
        })

    }

    return (
        <div className={styles.hotel}>
            <div className={styles.hotelImage} style={{ backgroundImage: `url(${data.listImagen[0]?.url})` }}>
                <img src="/icons/favourite_icon.svg" />
            </div>
            <div className={styles.hotelDetail}>
                <div>
                    <div className={styles.hotelHeader}>
                        <div>
                            <div className={styles.hotelCategory}>
                                <span>{data.categoria?.titulo}</span>
                                <HotelRating rating={data?.estrellas} />
                            </div>
                        </div>
                        <div className={styles.hotelReview}>
                            <span>{data?.puntuacion}</span>
                            <p>{data?.review}</p>
                        </div>
                    </div>
                    <h2 className={styles.title}>{data?.titulo}</h2>
                    <div className={`${styles.hotelLocation} ${styles.hotelLocationAlt}`}>
                        <img src="/icons/location_icon.svg" />
                        <span>{`A ${extractNumbersFromString(data?.distanciaCentro)}m del centro`}</span>
                    </div>
                    <div className={styles.hotelServices}>
                        {data.caracteristicas?.map((atribute, index) => <img src={atribute.icono} key={index} alt={atribute.titulo}></img>)}
                    </div>
                    {<div className={styles.hotelDescription}>
                        {isReserve ? (
                            <div className={styles.reserveContainer}>
                                <span>{`Desde: ${reserve.fechaInicio}`}</span>
                                <span>{`Hasta: ${reserve.fechaFinal}`}</span>
                            </div>
                        ) : <span>{data?.tituloDescripcion}</span>}
                    </div>}
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={() => navigate(`/product/${data?.id}`)} className={styles.hotelMoreButton}>
                        {isReserve ? "Ver" : "Ver más"}
                    </button>
                    {isReserve && <button onClick={handleDelete} className={`${styles.hotelMoreButton} ${styles.deleteButton}`}>Cancelar</button>}
                </div>
            </div>
        </div>
    )

}

export default Hotel;