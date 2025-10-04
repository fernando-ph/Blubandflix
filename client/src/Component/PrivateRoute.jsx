import { Navigate, Outlet} from "react-router-dom"
import useAuthStore from "../Store/authStore";


export function PrivateRouteLogin() {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/auth" />
    }
    return <Outlet />
}

export function PrivateRouteUser() {
    const { user } = useAuthStore();

    if (user?.roles !== "ROLE_USER") {
        return <Navigate to="/" /> // Redirect to admin if not a user
    }

    return <Outlet />
}

export function PrivateRouteAdmin() {
    const { user } = useAuthStore();

    if (user?.roles !== "ROLE_ADMIN") {
        return <Navigate to= "/admin" /> // Redirect to home if not an admin
    }
    return <Outlet />

}
