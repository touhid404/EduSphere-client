
import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Error/ErrorPage";
import Loader from "../components/Loader/Loader";
import Register from "../pages/Register/Register";
import LogIn from "../pages/Login/LogIn";
import AddArticle from "../pages/AddArticle/AddArticle";


export const router = createBrowserRouter([
    
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component: Home,
                hydrateFallbackElement: <Loader></Loader>
                
            },
            {
                 path: 'add-article',
                 Component: AddArticle,

            },


            {
                path: 'auth/register',
                Component: Register
            },
            {
                path: 'auth/login',
                Component: LogIn
            }
            


            
           
        ]
    },
    {
        path: '*',
        Component: ErrorPage
    }
]);
