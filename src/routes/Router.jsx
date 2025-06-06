
import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Error/ErrorPage";
import Loader from "../components/Loader/Loader";


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
            


            
           
        ]
    },
    {
        path: '*',
        Component: ErrorPage
    }
]);
