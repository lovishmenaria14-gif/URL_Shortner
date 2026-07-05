import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import AppLayout from "./layouts/AppLayout";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import Link from "./pages/Link";
import Redirect from "./pages/redirect";
import RequireAuth from "./components/RequireAuth";
import UrlProvider from "./Context";
import CreateLink from "./pages/CreateLink";
import About from "./pages/About";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
  path: "/about",
  element: <About />,
},
      {
        path: "/Dashboard",
        element: <RequireAuth>
        
        <Dashboard />
        </RequireAuth>
      },
      {
        path: "/Auth",
        element: <Auth />,
      },
      {
        path: "/Link/:id",
       
        element: <RequireAuth>
         <Link />
         </RequireAuth>
      },
       {
  path: "/create-link",
  element: (
    <RequireAuth>
      <CreateLink />
    </RequireAuth>
  ),
},
      {
        path: "/:id",
        element: <Redirect />,
      },
     
    ],
  },
]);

function App() {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
}

export default App;