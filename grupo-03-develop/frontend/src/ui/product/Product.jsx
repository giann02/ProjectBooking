import { GlobalContext } from '../../components/utils/global.context';
import { ProductContext } from '../../components/utils/product.context';

import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { urlBase } from '../../apiUrl.json'

import LoadingScreen from '../template/loading/LoadingScreen';
import ProductHeader from './product_header/ProductHeader';
import ProductImages from './product_images/ProductImages';
import ProductDescription from './product_description/ProductDescription';
import ProductServices from './product_services/ProductServices';
import ProductReservation from './product_reservation/ProductReservation';
import ProductMap from './product_map/ProductMap';
import RulesAndConvenience from './product_rulesAndConvenience/RulesAndConvenience';


const Product = () => {

    const { id } = useParams();

    const { productSetters } = useContext(ProductContext)
    const { isLogged } = useContext(GlobalContext)

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    // Conseguir los datos del producto por el id (conexion a la API)

    useEffect(() => {
        const abortController = new AbortController()
        setLoading(true)
        fetch(`${urlBase}/productos/${id}`)
            .then((response) => response.json())
            .then((data) => {

                setData(data)

                if (isLogged) {

                    const atributesId = []
                    data.caracteristicas.map((atribute) => atributesId.push(atribute.id))

                    const product = {
                        name: data.titulo,
                        category: {
                            id: data.categoria.id,
                            name: data.categoria.titulo
                        },
                        location: {
                            latitude: data.latitud,
                            longitude: data.longitud,
                            altitude: data.altura,
                            centerDistance: data.distanciaCentro
                        },
                        city: {
                            id: data.ciudad.id,
                            name: data.ciudad.nombre_ciudad,
                            country: data.ciudad.nombre_pais
                        },
                        centerDistance: data.distanciaCentro,
                        description: {
                            title: data.tituloDescripcion,
                            text: data.descripcion
                        },
                        atributes: atributesId,
                        stars: data.estrellas,
                        points: data.puntuacion,
                        quality: data.review,
                        houseRules: data.politicaLugar,
                        healthAndSecurity: data.politicaSaludSeguridad,
                        cancelPolitics: data.politicaCancelacion,
                        images: data.listImagen
                    }

                    productSetters.setProductData(product)
                    sessionStorage.setItem("product", JSON.stringify(product))

                }

                setLoading(false)

            })
            .catch((error) => console.log(error))


        return () => abortController.abort()
    }, [])

    return (
        <div>
            {loading ? <LoadingScreen /> : (
                <Fragment>
                    <ProductHeader data={data} />
                    <ProductImages images={data.listImagen.map((image) => image.url)} />
                    <ProductDescription dataDescription={data.descripcion} dataTitle={data.tituloDescripcion} />
                    <ProductServices data={data} />
                    <ProductReservation data={data} />
                    <ProductMap data={data} />
                    <RulesAndConvenience dataHouseRules={data.politicaLugar} dataHealthAndSecurity={data.politicaSaludSeguridad} dataCancelPolitics={data.politicaCancelacion} />
                </Fragment>
            )}
        </div>
    )
}

export default Product;