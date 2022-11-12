import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom"

import LoadingScreen from "../components/LoadingScreen";
import AuthGuard from "../guard/AuthGuard";
import GuestGuard from "../guard/GuestGuard";

const Loadable = (Component) => (props) => {
  //const  pathname  =  window.location.href;

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            top: 0,
            left: 0,
            width: 1,
            zIndex: 9999,
            position: 'fixed'
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

function AllRoutes() {

  return useRoutes([
    {
      path: "user",
      children: [
        {
          path: "login",
          element: <GuestGuard><Login /></GuestGuard>,
        },
        {
          path: "sign-up",
          element: <GuestGuard><SignUp /></GuestGuard>,
        },
        {
          path: "forgot-password",
          element: <GuestGuard><ForgotPassword /></GuestGuard>,
        }
      ]
    },
    {
      path: "/",
      element: <AuthGuard>
        <DashboardLayout />
      </AuthGuard>,
      children: [
        {
          path: "/",
          //element: <LandingPage />,
          element: <Navigate to="/dashboard" replace />,
        },
        {
          path: "/login",
          element: <Navigate to="/user/login" replace />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        }
      ]
    },
  ]);

}

export default AllRoutes;

//const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const SignUp = Loadable(lazy(() => import('../pages/auth/SignUp')));
const ForgotPassword = Loadable(lazy(() => import('../pages/auth/ForgotPassword')));

const DashboardLayout = Loadable(lazy(() => import('../layouts/dashboard')));
const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
