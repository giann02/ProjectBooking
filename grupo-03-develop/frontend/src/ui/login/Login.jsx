import { GlobalContext } from '../../components/utils/global.context';

import styles from './login.module.css'

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import Swal from 'sweetalert2';

import { urlBase } from '../../apiUrl.json'
import { defaultValuesLoginForm } from '../../utils/loginForm';

const Login = () => {

    const navigate = useNavigate();
    const { setters } = useContext(GlobalContext)

    const { defaultValues, validation } = defaultValuesLoginForm()

    const { register, handleSubmit, formState: { errors } } = useForm({

        resolver: yupResolver(validation),
        defaultValues: defaultValues

    })

    const onSubmit = data => {

        const user = {
            email: data.email,
            password: data.password
        }

        fetch(`${urlBase}/api/v1/auth/authenticate`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).catch(error => console.error('Error:', error))
            .then(res => {
                if (res.status === 403) {
                    Swal.fire({
                        title: "Error",
                        text: "Contraseña o email incorrectos",
                        icon: 'error',
                        timer: '2500',
                        confirmButtonColor: "#F0572D"
                    })
                } else if (res.status === 200) {
                    return res.json()
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Contraseña o email incorrectos",
                        icon: 'error',
                        timer: '2500',
                        confirmButtonColor: "#F0572D"
                    })
                }
            }).then(response => {
                if (response) {
                    navigate("/home", { replace: true })

                    const userRoles = []

                    response.roles.map((role) => userRoles.push(role.id))

                    const user = {
                        userId: response.id,
                        userFirstName: response.first_name,
                        userLastName: response.last_name,
                        userEmail: response.email,
                        userToken: response.token,
                        userRoles: userRoles

                    }

                    sessionStorage.setItem("user", JSON.stringify(user))
                    setters.setUser(user)
                    setters.setIsLogged(true)
                }
            })

    }

    return (
        <div className={styles.login}>
            <h2 className={styles.title}>Iniciar sesion</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formLogin} action="">
                <div className={styles.inputContainer}>
                    <label className={styles.labelForm} htmlFor="email">Correo electrónico</label>
                    <input className={styles.input} style={errors.email && { border: "solid 1px red" }}
                        id='email'
                        name='email'
                        type="email"
                        autoComplete='off'
                        {...register("email")} />
                    {errors.email && <span className={styles.formError}>{errors.email.message}</span>}
                </div>

                <div className={styles.inputContainer}>
                    <label className={styles.labelForm} htmlFor="password">Contraseña</label>
                    <input className={styles.input} style={errors.password && { border: "solid 1px red" }}
                        id='password'
                        name='password'
                        type="password"
                        autoComplete='off'
                        {...register("password")} />
                    {errors.password && <span className={styles.formError}>{errors.password.message}</span>}
                </div>
                <div className={styles.submitContainer}>
                    <button type='submit' className={styles.btn}>Ingresar</button>
                    <div>
                        <span>¿Aun no tenes cuenta?</span>
                        <button className={styles.navigationLink} onClick={() => navigate("/register")}>Registrarse</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login