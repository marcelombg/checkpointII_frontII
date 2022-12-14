import { useState } from "react"
import { createContext, useContext } from "react"

// Ciração do Contexto
const ThemeContext = createContext()

// Criação do Provedor para o Contexto
export function ThemeProvider(props) {

    const themeLocalStorage = localStorage.getItem('theme')
    const [theme, setTheme] = useState(themeLocalStorage === null ? 'light' : themeLocalStorage)

    function changeTheme(themeRecieved) {

        if(themeRecieved !== theme) {

            setTheme(themeRecieved)
            localStorage.setItem('theme', themeRecieved)

        } else {

            setTheme(themeRecieved)
            localStorage.setItem('theme', themeRecieved)

        }

    }

    return(

        <ThemeContext.Provider value={{theme, changeTheme}}>
            { props.children }
        </ThemeContext.Provider>

    )

}

export function useTheme() {

    const context = useContext(ThemeContext)

    return context

}