import useAuth from '../../hooks/useAuth'
import { useState } from "react";
import Alerta from "../../components/Alerta";
import AdminNav from "../../components/AdminNav";

const CambiarPassword = () => {

    const {guardarPassword} = useAuth()

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState({
        pwd: '',
        newpwd: ''
    })

    const handleSubmit = async e => {
        e.preventDefault()

        if(Object.values(password).some(campo => campo === '')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        if(password.newpwd.length < 6) {
            setAlerta({
                msg: 'La contraseña debe tener mínimo 6 caracteres',
                error: true
            })
            return
        }

        const respuesta = await guardarPassword(password)

        setAlerta(respuesta)
    }

    const {msg} = alerta

    return (
        <>
            <AdminNav />
            <h2 className="font-black text-3xl text-center mt-10">
                Cambiar Contraseña
            </h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Modifica tu{" "}
                <span className="text-indigo-600 font-bold">
                    Contraseña aquí
                </span>
            </p>

            <div className="flex justify-center">
                <div className="w-full md:w-1/2 bg-white rounded-lg p-5 shadow">
                    <form onSubmit={handleSubmit} className="mb-10">
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">
                                Contraseña Actual
                            </label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="pwd"
                                placeholder="Escribe tu contraseña actual"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">
                                Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                                name="newpwd"
                                placeholder="Escribe tu nueva contraseña"
                                onChange={e => setPassword({
                                    ...password,
                                    [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <input
                            type="submit"
                            value="Actualizar Contraseña"
                            className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-lg w-full mt-5 hover:bg-indigo-800"
                        />
                    </form>

                    {msg && <Alerta alerta={alerta} />}
                </div>
            </div>
        </>
    );
};

export default CambiarPassword;
