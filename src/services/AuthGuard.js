import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../features/userSlice";

export default function AuthGuard({ children }) {
    const isAuth = useSelector(selectIsAuth);
    let location = useLocation();

    if (!isAuth) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
}