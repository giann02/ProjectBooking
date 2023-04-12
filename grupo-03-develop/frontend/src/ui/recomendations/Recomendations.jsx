import styles from './recomendations.module.css';

import HotelsList from '../hotels_list/HotelsList';
import LoadingScreen from '../template/loading/LoadingScreen';

import { urlBase } from '../../apiUrl.json'

import { useContext, useEffect } from 'react';
import { HomeContext } from '../../components/utils/home.context';



const Recomendations = () => {

    const { recomendationsData, isLoading, recomendationsSetters } = useContext(HomeContext)

    useEffect(() => {
        const abortController = new AbortController()
        recomendationsSetters.setIsLoading(true)
        fetch(`${urlBase}/productos/random`)
            .then((response) => response.json())
            .then((data) => {
                recomendationsSetters.setRecomendationsData(data)
                recomendationsSetters.setIsLoading(false)
            })
            .catch((error) => console.log(error))

        return () => abortController.abort()
    }, [])

    return (
        <div className={styles.recomendations}>
            {isLoading ? <LoadingScreen /> : (
                <div className='container'>
                    <div className={`row ${styles.contentContainer}`}>
                        <h2 className={styles.title}>Recomendaciones</h2>
                        {recomendationsData ? <HotelsList data={recomendationsData} /> : (

                            <div>
                                No hay productos disponibles para estos filtros
                            </div>

                        )}
                    </div>
                </div>
            )}
        </div>
    );

}

export default Recomendations;