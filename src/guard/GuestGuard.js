import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GuestGuard({ children }) {
    const userToken = useSelector((state) => state.user.userToken);
    if (userToken) {
      return <Navigate to={'/'} />;
    }
  
    return <>{children}</>;
  }
  