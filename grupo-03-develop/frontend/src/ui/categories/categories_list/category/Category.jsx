import { HomeContext } from '../../../../components/utils/home.context';

import styles from './category.module.css';

import { useContext } from 'react';

import { urlBase } from '../../../../apiUrl.json'

const Category = ({ id, name, image, categoryQuantity }) => {

    const { recomendationsSetters } = useContext(HomeContext)

    const handleFilterCategory = () => {
        const abortController = new AbortController()
        recomendationsSetters.setIsLoading(true)
        fetch(`${urlBase}/productos/categoria/${id}`)
            .then((response) => response.json())
            .then((data) => {
                recomendationsSetters.setRecomendationsData(data)
                recomendationsSetters.setIsLoading(false)
            })
            .catch((error) => console.log(error));

        return () => abortController.abort()
    }

    return (
        <div onClick={handleFilterCategory} className={styles.category}>
            <div className={styles.categoryImage} style={{ backgroundColor: "red", backgroundImage: `url(${image})` }} />
            <div className={styles.categoryDescription}>
                <h2>{name}</h2>
                <span>{categoryQuantity} Disponibles</span>
            </div>
        </div>
    )

}

export default Category;