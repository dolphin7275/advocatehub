import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './common/Home.jsx';
import AdvocateList from './common/searchpage/AdvocateList.jsx';
import Navbar from './common/navbar/Navbar.jsx';
import Footer from './common/footer/Footer.jsx';
import ClientWelcome from './clientSection/pages/ClientWelcome.jsx';
import ClientLogin from './clientSection/components/ClientLogin.jsx';
import ClientSignup from './clientSection/components/ClientSignup.jsx';
import ClientDashboard from './clientSection/pages/ClientDashboard.jsx';
import AdvocateWelcome from './advocateSection/pages/AdvocateWelcome.jsx';
import AdvocateLogin from './advocateSection/components/AdvocateLogin.jsx';
import AdvocateSignup from './advocateSection/components/AdvocateSignup.jsx';
import AdvocateDashboard from './advocateSection/pages/AdvocateDashboard.jsx';


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: 
        <div>
          <Navbar />
          <Home />
          <Footer />
        </div>
    },
    {
      path: "/advocate-list",
      element: 
        <div>
          <Navbar />
          <AdvocateList />
          <Footer />
        </div>
    },
    {
      path: "/client",
      element: <ClientWelcome /> ,
      children: [
        {
          path: "/client/signup",
          element: <ClientSignup />
        },
        {
          path: "/client/login",
          element: <ClientLogin />
        },
        {
          path: "/client/dashboard",
          element: <ClientDashboard />
        }
      ]
    }, 
    {
      path: "/advocate",
      element: <AdvocateWelcome />,
      children: [
        {
          path: "/advocate/signup",
          element: <AdvocateSignup />
        },
        {
          path: "/advocate/login",
          element: <AdvocateLogin />
        },
        {
          path: "/advocate/dashboard",
          element: <AdvocateDashboard />
        }
      ]
    }
  ]
)


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
