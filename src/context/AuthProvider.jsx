// libraries
import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({});

    useEffect(() => {
        const autenticarUsuario = async () => {
            const apvToken = localStorage.getItem("apv_token");

            if (!apvToken) {
                setCargando(false);
                return; //<-- si no hay token
            }
            // Comprobrar que haya un usuario antes de enviar el request
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apvToken}`,
                },
            };

            try {
                const { data } = await clienteAxios(
                    "/veterinarios/perfil",
                    config
                );
                // Por defecto el axios es .get, no hace falta especificar

                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                setAuth({});
            }
            setCargando(false);
        };
        autenticarUsuario();
    }, []);

    const cerrarSesion = () => {
        localStorage.removeItem("apv_token");
        setAuth({});
    };

    const actualizarPerfil = async datos => {
        const apvToken = localStorage.getItem("apv_token");

        if (!apvToken) {
            setCargando(false);
            return; //<-- si no hay token
        }
        // Comprobrar que haya un usuario antes de enviar el request
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apvToken}`,
            },
        };

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const {data} = await clienteAxios.put(url, datos, config)
            
            return {
                msg: 'Almacenado correctamente'
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async (datos) => {
        const apvToken = localStorage.getItem("apv_token");

        if (!apvToken) {
            setCargando(false);
            return; //<-- si no hay token
        }
        // Comprobrar que haya un usuario antes de enviar el request
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apvToken}`,
            },
        };

        try {
            const url = '/veterinarios/actualizar-password'
            const {data} = await clienteAxios.put(url, datos, config)
            
            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{ auth, setAuth, cargando, setCargando, cerrarSesion, actualizarPerfil, guardarPassword }}
        >
            {/* el value es para poner a disposicion el state y hacerlo global */}
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };

export default AuthContext;
