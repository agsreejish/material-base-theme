import { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Login from "../pages/auth/Login";

export default function AuthGuard({ children }) {
    const { pathname } = useLocation();
    const [ reqUrl, setReqUrl ] = useState(null);

    const userToken = useSelector((state) => state.user.userToken);
    if (!userToken) {
        if (pathname !== reqUrl) {
            setReqUrl(pathname);
        }
        return <Login />;
    }
    if (pathname === '/login') {
        return <Navigate to={'/user/login'} />
    }

    if(reqUrl && pathname!==reqUrl){
        setReqUrl(null);
        return <Navigate to={reqUrl} />
    }

    return <>{children}</>;
}
