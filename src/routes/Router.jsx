
import { createBrowserRouter } from "react-router";
import Root from "../root/Root";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/Error/ErrorPage";
import Register from "../pages/Register/Register";
import LogIn from "../pages/Login/LogIn";
import AddArticle from "../pages/AddArticle/AddArticle";
import Loader from "../components/Loader/Loader";
import AllArticles from "../pages/AllArticles/AllArticles";
import PrivateRoute from "../private/PrivateRoute";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";
import MyArticles from "../pages/MyArticles/MyArticles";


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
                 path: 'addArticle',
                 element: <PrivateRoute>
                    <AddArticle></AddArticle>
                 </PrivateRoute>

            },
            {
                path:'allArticles',
                 loader: ()=> fetch('http://localhost:3000/articles'),
                Component: AllArticles,
                hydrateFallbackElement: <Loader></Loader>
            },
            {
               path: 'articleDetail/:id',
               loader: async ({ params }) => {
                const articlePromise = fetch(`http://localhost:3000/articles/${params.id}`);
               const commentPromise = fetch(`http://localhost:3000/comments/${params.id}`);

               const [articleRes, commentRes] = await Promise.all([articlePromise, commentPromise]);

               if (!articleRes.ok || !commentRes.ok) {
                   throw new Error("Failed to load article or comments");
                  }

           const [article, comments] = await Promise.all([articleRes.json(), commentRes.json()]);

    return { article, comments };
  },
  element: <PrivateRoute>
    <ArticleDetails></ArticleDetails>

      </PrivateRoute>,
  hydrateFallbackElement: <Loader />
            },

            {
                path:'myArticles',
                Component: MyArticles,
                hydrateFallbackElement: <Loader></Loader>
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
