import { GlobalContext } from '../../components/utils/global.context'
import { ProductContext } from '../../components/utils/product.context'

import { Fragment, useContext, useEffect, useState } from 'react'

import AdministrationHeader from './administrationHeader/AdministrationHeader'
import AdministrationForm from './administrationForm/AdministrationForm'
import LoadingScreen from '../template/loading/LoadingScreen'

import { urlBase } from '../../apiUrl.json'

const Administration = () => {

  const { user } = useContext(GlobalContext)
  const { productData, categories, cities, atributes, productSetters } = useContext(ProductContext)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    if (!categories) {
      fetch(`${urlBase}/categorias`)
        .then((response) => response.json())
        .catch((error) => console.log(error))
        .then((data) => {

          const customCategories = data.map((categorie) => (
            {
              id: categorie.id,
              name: categorie.titulo
            }
          ))

          sessionStorage.setItem("categories", JSON.stringify(customCategories))
          productSetters.setCategories(customCategories)
        })
    }

    if (!cities) {
      fetch(`${urlBase}/ciudades`)
        .then((response) => response.json())
        .catch((error) => console.log(error))
        .then((data) => {

          const customCities = data.map((citie) => (
            {
              id: citie.id,
              name: citie.nombre_ciudad
            }
          ))

          sessionStorage.setItem("cities", JSON.stringify(customCities))
          productSetters.setCities(customCities)
        })
    }

    if (!atributes) {
      fetch(`${urlBase}/caracteristicas`)
        .then((response) => response.json())
        .catch((error) => console.log(error))
        .then((data) => {
          sessionStorage.setItem("atributes", JSON.stringify(data))
          productSetters.setAtributes(data)
          setLoading(false)
        })
    }

    if (categories && cities && atributes) {
      setLoading(false)
    }

  }, [])

  return (
    <div className='administration'>
      {loading ? <LoadingScreen /> : (
        <Fragment>
          <AdministrationHeader />
          <AdministrationForm data={productData} categories={categories} cities={cities} atributes={atributes} user={user} />
        </Fragment>
      )}
    </div>
  )
}

export default Administration