import { useState, useEffect } from 'react'
import Alerta from './Alerta'
import usePacientes from '../hooks/usePacientes'

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fecha, setFecha] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [alerta, setAlerta] = useState({})
    const [id, setId] = useState(null)

    const { guardarPaciente, paciente } = usePacientes()


    useEffect(() => {
        if (paciente?.nombre) {
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

        //validar el formulario
        if ([nombre, propietario, email, fecha, sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorio',
                error: true
            })
            return
        }

        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id })
        setAlerta({
            msg: "Guardado Correctamente"
        })
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
        setId('')
    }

    const { msg } = alerta

    return (
        <>
            <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>
            <p className='text-xl mt-5 text-center mb-10'>
                Añade tus pacientes y {''}
                <span className='text-indigo-600 font-bold'>Administralos</span>
            </p>

            {msg && <Alerta alerta={alerta} />}

            <form action="" className='bg-white py-10 px-5 mb-10 lg:mb-0 shadow-md rounded-md' onSubmit={handleSubmit}>
                <div className='mb-5'>
                    <label className='text-gray-700 uppercase font-bold' htmlFor="nombre">Nombre Mascota</label>
                    <input type="text" id='nombre' placeholder='Nombre de la mascota' value={nombre} onChange={e => setNombre(e.target.value)} className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
                </div>

                <div className='mb-5'>
                    <label className='text-gray-700 uppercase font-bold' htmlFor="propietario">Nombre Propietario</label>
                    <input type="text" id='propietario' placeholder='Nombre del Propietario' value={propietario} onChange={e => setPropietario(e.target.value)} className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
                </div>

                <div className='mb-5'>
                    <label className='text-gray-700 uppercase font-bold' htmlFor="email">Email Propietario</label>
                    <input type="email" id='email' placeholder='Email del Propietario' value={email} onChange={e => setEmail(e.target.value)} className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
                </div>

                <div className='mb-5'>
                    <label className='text-gray-700 uppercase font-bold' htmlFor="fecha">Fecha Alta</label>
                    <input type="date" id='fecha' value={fecha} onChange={e => setFecha(e.target.value)} className='border-2 w-full p-2 mt-2' />
                </div>

                <div className='mb-5'>
                    <label className='text-gray-700 uppercase font-bold' htmlFor="sintomas">Sintomas</label>
                    <textarea id='sintomas' placeholder='Describe los sintomas' value={sintomas} onChange={e => setSintomas(e.target.value)} className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' />
                </div>
                <input type="submit" className='bg-indigo-600 w-full p-3 text-white hover:bg-indigo-700 cursor-pointer uppercase font-bold transition-colors' value={id ? 'Guadar Cambios' : 'Agregar Paciente'} />
            </form>
        </>
    )
}

export default Formulario
