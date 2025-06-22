import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./common/Home.jsx";
import AdvocateList from "./common/searchpage/AdvocateList.jsx";
import Navbar from "./common/navbar/Navbar.jsx";
import Footer from "./common/footer/Footer.jsx";
import ClientWelcome from "./clientSection/pages/ClientWelcome.jsx";
import ClientLogin from "./clientSection/components/ClientLogin.jsx";
import ClientSignup from "./clientSection/components/ClientSignup.jsx";
import ClientDashboard from "./clientSection/pages/ClientDashboard.jsx";
import AdvocateWelcome from "./advocateSection/pages/AdvocateWelcome.jsx";
import AdvocateLogin from "./advocateSection/components/AdvocateLogin.jsx";
import AdvocateSignup from "./advocateSection/components/AdvocateSignup.jsx";
import AdvocateDashboard from "./advocateSection/pages/AdvocateDashboard.jsx";
import Admin from "./adminSection/Admin.jsx";
import AdminLogin from "./adminSection/AdminLogin.jsx";
import AdminDashboard from "./adminSection/AdminDashboard.jsx";
import AdvocateCard from "./common/searchpage/AdvocateCard.jsx";
import AdvocateInfo from "./adminSection/AdvocateInfo.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
        <Footer />
      </div>
    ),
  },
  {
    path: "/advocate-list",
    element: (
      <div>
        <Navbar />
        <AdvocateList />
        <Footer />
      </div>
    ),
    children: [
      {
        path: "details",
        element: <AdvocateCard />,
      },
    ],
  },
  {
    path: "/client",
    element: (
      <div>
        <Navbar />
        <ClientWelcome />
        <Footer />
      </div>
    ),
    children: [
      {
        path: "signup",
        element: <ClientSignup />,
      },
      {
        path: "login",
        element: <ClientLogin />,
      },
      {
        path: "dashboard",
        element: <ClientDashboard />,
      },
    ],
  },
  {
    path: "/advocate",
    element: (
      <div>
        <Navbar />
        <AdvocateWelcome />
        <Footer />
      </div>
    ),
    children: [
      {
        path: "signup",
        element: <AdvocateSignup />,
      },
      {
        path: "login",
        element: <AdvocateLogin />,
      },
      {
        path: "dashboard",
        element: <AdvocateDashboard />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <div>
        <Navbar />
        <Admin />
      </div>
    ),
    children: [
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
        // children: [
        //   {
        //     path: "info",
        //     element: <AdvocateInfo />
        //   },
        // ]
      },
      {
        path: "info",
        element: <AdvocateInfo />
      }
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
