import React, { createContext, useEffect, useState } from 'react'

export const GlobalContext = createContext()

const GlobalContextProvider = ({ children }) => {

    const [isLogged, setIsLogged] = useState(false)

    const [user, setUser] = useState(() => {
        if (sessionStorage.getItem("user")) {
            const user = sessionStorage.getItem("user")
            const parsedUser = JSON.parse(user)

            return {
                userId: parsedUser.userId,
                userFirstName: parsedUser.userFirstName,
                userLastName: parsedUser.userLastName,
                userEmail: parsedUser.userEmail,
                userToken: parsedUser.userToken,
                userRoles: parsedUser.userRoles
            }
        } else {
            return {}
        }
    })

    const [cities, setCities] = useState(null);
    const [time, setTime] = useState(null)

    const store = {
        isLogged,
        cities,
        time,
        user,
        setters: {
            setIsLogged,
            setUser,
            setCities,
            setTime,
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem("user")) {
            setIsLogged(true)
        }
    }, [])

    return (
        <GlobalContext.Provider value={store}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContextProvider