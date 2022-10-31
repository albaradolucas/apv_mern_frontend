// Libraries
import { useState, useEffect } from "react";
// Components
import Alerta from "./Alerta";
// Hooks
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
    // states
    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})

    const {guardarPaciente, paciente} = usePacientes()

    useEffect(() => {
        if(paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }
    }, [paciente])

    const handleSubmit = e => {
        e.preventDefault()

        // validar formulario
        if([nombre, propietario, email, fecha, sintomas].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return
        }

        setAlerta({})

        guardarPaciente({nombre, propietario, email, fecha, sintomas, id})
        setAlerta({
            msg: 'Guardado correctamente'
        })

        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId(null)
    }

    const { msg } = alerta
    return (
        <>
            <h2 className="font-black text-3xl text-center">
                Administrador de Pacientes
            </h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade tus pacientes y{" "}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>
            

            <form className="bg-white py-10 px-5 mb-10 lg:mb-5 shadow-md rounded-md" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label
                        htmlFor="mascota"
                        className="text-gray-700 font-bold"
                    >
                        Nombre de la Mascota
                    </label>
                    <input
                        type="text"
                        id="mascota"
                        placeholder="Nombre de tu mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="text-gray-700 font-bold"
                    >
                        Nombre de Dueñx
                    </label>
                    <input
                        type="text"
                        id="propietario"
                        placeholder="Nombre del propietario o propietaria"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={e => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="text-gray-700 font-bold">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Ingresa tu email"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="fecha" className="text-gray-700 font-bold">
                        Fecha de alta
                    </label>
                    <input
                        type="date"
                        id="fecha"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="text-gray-700 font-bold"
                    >
                        Síntomas
                    </label>
                    <textarea
                        id="sintomas"
                        placeholder="Ingresa los síntomas de tu mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    value={id ? 'Modificar Cita' : 'Agregar Paciente'}
                    className="bg-indigo-600 text-white font-bold p-3 rounded w-full hover:bg-indigo-800 cursor-pointer transition-colors"
                />
            </form>
            {msg && <Alerta alerta={alerta}/>}

        </>
    );
};

export default Formulario;
