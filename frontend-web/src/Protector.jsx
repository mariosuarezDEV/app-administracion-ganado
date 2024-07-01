import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "./Auth";

export const Protector = () => {
    const { autenticate } = useContext(AuthContext);
    if (autenticate === null) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
}