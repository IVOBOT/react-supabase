import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
    redirectPath: string;
}

const ProtectedRoute = ({ redirectPath }: Props) => {
    
    const { auth } = useAuth();

    return auth ? (
        <Outlet />
    ) : (
        <Navigate to={redirectPath} replace />
    );
};

export default ProtectedRoute;