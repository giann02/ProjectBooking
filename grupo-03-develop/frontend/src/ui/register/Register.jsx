import styles from './register.module.css'
import Swal from "sweetalert2";

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import { urlBase } from '../../apiUrl.json'
import { defaultValuesRegisterForm } from '../../utils/registerForm';

const Register = () => {

    const { defaultValues, validation } = defaultValuesRegisterForm()

    const navigate = useNavigate();

    const { register, handleSubmit, getValues, reset, formState: { errors } } = useForm({

        resolver: yupResolver(validation),
        defaultValues: defaultValues

    })

    const onSubmit = data => {

        const user = {
            first_name: data.name,
            last_name: data.surname,
            email: data.email,
            password: data.password
        }

        fetch(`${urlBase}/api/v1/auth/register`, {
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
                        text: "Usuario ya registrado",
                        icon: 'error',
                        timer: '2500',
                        confirmButtonColor: "#F0572D"
                    })
                } else if (res.status === 200 || res.status === 201 || res.status === 202) {
                    Swal.fire({
                        title: "Exito",
                        text: "Usuario Creado con exito",
                        icon: 'success',
                        timer: '2500',
                        confirmButtonColor: "#F0572D"
                    }).then(() => {
                        reset(defaultValues)
                    })
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "Intente mas tarde",
                        icon: 'error',
                        timer: '2500',
                        confirmButtonColor: "#F0572D"
                    })
                }
            })
    };


    return (
        <div className={styles.register}>
            <h2 className={styles.title}>Crear cuenta</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formRegister}>
                <div className={styles.nameContainer}>

                    <div className={styles.nameInputContainer}>
                        <label htmlFor="name">Nombre</label>
                        <input className={styles.nameInput} style={errors.name && { border: "solid 1px red" }}
                            id='name'
                            name='name'
                            autoComplete='off'
                            {...register("name")} />
                        {errors.name && <span className={styles.formError}>{errors.name.message}</span>}
                    </div>

                    <div className={styles.nameInputContainer}>
                        <label htmlFor="surname">Apellido</label>
                        <input className={styles.nameInput}
                            style={errors.surname && { border: "solid 1px red" }}
                            id='surname'
                            name='surname'
                            autoComplete='off'
                            {...register("surname")} />
                        {errors.surname && <span className={styles.formError}>{errors.surname.message}</span>}
                    </div>

                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="email">Correo electronico</label>
                    <input className={styles.input}
                        style={errors.email && { border: "solid 1px red" }}
                        id='email'
                        name='email'
                        type="email"
                        autoComplete='off'
                        {...register("email")} />
                    {errors.email && <span className={styles.formError}>{errors.email.message}</span>}
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="password">Contraseña</label>
                    <input className={styles.input}
                        style={errors.password && { border: "solid 1px red" }}
                        id='password'
                        name='password'
                        type="password"
                        autoComplete='off'
                        {...register("password")} />
                    {errors.password && <span className={styles.formError}>{errors.password.message}</span>}
                </div>

                <div className={styles.inputContainer}>
                    <label htmlFor="confirmPassword">Confirmar contraseña</label>
                    <input className={styles.input}
                        style={errors.confirmPassword && { border: "solid 1px red" }}
                        id='confirmPassword'
                        name='confirmPassword'
                        type="password"
                        autoComplete='off'
                        {...register("confirmPassword")} />
                    {errors.confirmPassword && <span className={styles.formError}>{errors.confirmPassword.message}</span>}
                </div>

                <div className={styles.submitContainer}>
                    <button type='submit' className={styles.btn}>Crear cuenta</button>
                    <div>
                        <span>¿Ya tenes una cuenta?</span>
                        <button className={styles.navigationLink} onClick={() => navigate("/login")}>Iniciar sesion</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register