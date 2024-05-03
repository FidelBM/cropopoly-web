import { Navigate } from "react-router-dom";
import { AuthProvider } from "../context/authContext";
import { Registro } from "../page/Registro";

export const RegisterAuth = () => <AuthProvider> <Registro/></AuthProvider>;