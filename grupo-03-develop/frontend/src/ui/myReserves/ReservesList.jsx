import { GlobalContext } from '../../components/utils/global.context';

import styles from './reservesList.module.css'
import "./reserves.css"

import { useContext, useEffect, useState, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import Swal from "sweetalert2";

import { urlBase } from '../../apiUrl.json';

import LoadingScreen from '../template/loading/LoadingScreen'
import Hotel from '../hotels_list/hotel/Hotel'

const Reserves = () => {
    const { user } = useContext(GlobalContext)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {

        const abortController = new AbortController()
        setLoading(true)
        fetch(`${urlBase}/reservas/user/${user.userId}`)
            .then((res) => {

                if (res.status === 200) {
                    return res.json()
                } else {

                    Swal.fire({
                        title: "RESERVAS VACIAS",
                        text: "Realice una reserva para verla aqui",
                        icon: 'warning',
                        timer: '25000',
                        confirmButtonColor: "#F0572D"
                    }).then(() => {
                        navigate("/home")
                    })

                }

            })
            .catch((error) => console.log(error))
            .then((data) => {

                setData(data)
                setLoading(false)

            })

        return () => abortController.abort()

    }, [])

    return (
        <div>
            {loading ? <LoadingScreen /> : (
                <Fragment>
                    <div className="container">
                        <div className="row">
                            <h1 className='centro'>Mis reservas</h1>
                            <div className={styles.reservesList}>
                                {data?.map((reserve, index) => <Hotel key={index} data={reserve.producto} isReserve={true} reserve={reserve} completeData={data} setCompleteData={setData}/>)}
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default Reserves


