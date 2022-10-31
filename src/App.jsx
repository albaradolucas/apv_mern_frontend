// Libraries
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";

// Provider
import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";

// Páginas Públicas
import Login from "./paginas/publicas/Login";
import Registrar from "./paginas/publicas/Registrar";
import ConfirmarCuenta from "./paginas/publicas/ConfirmarCuenta";
import OlvidePassword from "./paginas/publicas/OlvidePassword";
import NuevoPassword from "./paginas/publicas/NuevoPassword";

// Páginas Privadas
import RutaProtegida from "./layout/RutaProtegida";
import AdministrarPacientes from "./paginas/privadas/AdministrarPacientes";
import EditarPerfil from "./paginas/privadas/EditarPerfil";
import CambiarPassword from "./paginas/privadas/CambiarPassword";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <PacientesProvider>
                    <Routes>
                        {/* área pública */}
                        <Route path="/" element={<AuthLayout />}>
                            <Route index element={<Login />} />
                            <Route path="registrar" element={<Registrar />} />
                            <Route
                                path="confirmar/:id"
                                element={<ConfirmarCuenta />}
                            />
                            <Route
                                path="olvide-password"
                                element={<OlvidePassword />}
                            />
                            <Route
                                path="olvide-password/:token"
                                element={<NuevoPassword />}
                            />
                        </Route>

                        {/* área privdada */}
                        <Route path="/admin" element={<RutaProtegida />}>
                            <Route index element={<AdministrarPacientes />} />
                            <Route path="perfil" element={<EditarPerfil/>} />
                            <Route path="cambiar-password" element={<CambiarPassword/>} />
                        </Route>
                    </Routes>
                </PacientesProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
