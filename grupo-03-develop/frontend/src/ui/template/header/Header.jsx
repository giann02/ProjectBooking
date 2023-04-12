import styles from "./header.module.css"

import { Fragment, useContext, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { GlobalContext } from '../../../components/utils/global.context';
import { HomeContext } from '../../../components/utils/home.context';

import { urlBase } from "../../../apiUrl.json"
import { admin } from "../../../rolesId.json"

import UserMenu from '../../userMenu/UserMenu';

const Header = () => {

    const { user, isLogged, setters } = useContext(GlobalContext)
    const { recomendationsSetters } = useContext(HomeContext)

    const [showUserMenu, setShowUserMenu] = useState(false)

    const location = useLocation()

    const { id } = useParams()

    const navigate = useNavigate();

    const closeSession = () => {
        sessionStorage.clear()
        setters.setUser({})
        setters.setIsLogged(false)
    }

    const adminRedirect = () => {
        if (location.pathname === "/" || location.pathname === "/home") {
            navigate("/home/administration")
        } else {
            navigate(`/product/${id}/administration`)
        }
    }

    const goToHome = () => {

        if (location.pathname === "/" || location.pathname === "/home") {

            recomendationsSetters.setSelectedCity(null)
            recomendationsSetters.setStartDate(null)
            recomendationsSetters.setEndDate(null)
            recomendationsSetters.setCompleteStartDate(null)
            recomendationsSetters.setCompleteEndDate(null)

            const abortController = new AbortController()
            recomendationsSetters.setIsLoading(true)
            fetch(`${urlBase}/productos/random`)
                .then((response) => response.json())
                .then((data) => {
                    recomendationsSetters.setRecomendationsData(data)
                    recomendationsSetters.setIsLoading(false)
                })
                .catch((error) => console.log(error));

            navigate("/home")
            return () => abortController.abort()

        } else {
            navigate("/home")
        }

    }

    const handleOpenUserMenu = () => {
        setShowUserMenu(true)
        document.body.style.overflow = "hidden"
    }

    return (
        <div className={styles.header}>
            <div className='container'>
                <div className='row'>
                    <div className={styles.headerContent}>
                        <button className={styles.logoContainer} onClick={() => goToHome()}>
                            <img src="/logo.svg" alt="Logo" />
                            <h2 className={styles.title}>Sentite como en tu hogar</h2>
                        </button>
                        <img onClick={handleOpenUserMenu} className={styles.menuCel} src="/menuCel.svg" alt="Menu cel" />
                        <div className={styles.btnContainer}>
                            {isLogged ?
                                <Fragment>
                                    {user.userRoles.indexOf(admin) != -1 && <span className={styles.administration} onClick={adminRedirect}>Administración</span>}
                                    <div className={styles.userContainer} style={user.userRoles.indexOf(admin) != -1 ? { borderLeft: "solid #F0572D 3px", paddingLeft: "10px" } : {}}>
                                        <button className={`${styles.userIcon} ${styles.btn}`} onClick={() => navigate("/myReserves")}>{`${user.userFirstName.charAt(0).toUpperCase()}${user.userLastName.charAt(0).toUpperCase()}`}</button>
                                        <div className={styles.welcomeContainer}>
                                            <p>Hola,</p>
                                            <p className={styles.userName}>{user.userFirstName} {user.userLastName}</p>
                                        </div>
                                    </div>
                                </Fragment>
                                :
                                <button onClick={() => navigate("/register")} style={location.pathname === "/register" ? { display: 'none' } : { display: 'block' }} className={styles.btn}>Crear cuenta</button>
                            }

                            {isLogged ?
                                <img onClick={closeSession} className={styles.closeSessionIcon} src="/icons/closeSession_icon.svg" alt="Close session icon" />
                                :
                                <button onClick={() => navigate("/login")} style={location.pathname === "/login" ? { display: 'none' } : { display: 'block' }} className={styles.btn}>Iniciar sesión</button>}
                        </div>
                    </div>
                </div>
            </div>
            {showUserMenu && <UserMenu show={showUserMenu} setShowUserMenu={setShowUserMenu} />}
        </div>
    )
}

export default Header