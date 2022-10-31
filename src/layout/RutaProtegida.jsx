// Libraries
import { Outlet, Navigate } from "react-router-dom";
// Hooks
import useAuth from "../hooks/useAuth";
// Components
import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegida = () => {

    const {auth, cargando} = useAuth()

    if(cargando) return 'Cargando...'

    return (
        <>
            <Header/>
                {auth?._id ? ( 
                    <main className="container mx-auto mt-10">
                        <Outlet/> 
                    </main>
                ): <Navigate to="/"/>}
            <Footer/>
        </>
    );
};

export default RutaProtegida;
