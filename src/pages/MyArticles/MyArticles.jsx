import React, { Suspense, use } from 'react';
import MyLists from './MyLists';
import { AuthContext } from '../../provider/AuthContext';
import { myArticlesPromise } from './../../api/ArticleApi';
import Loader from '../../components/Loader/Loader';





const MyArticles = () => {



  const {user} = use(AuthContext);

  return (

  
    <div>

      <Suspense fallback={<Loader></Loader>}>
      <MyLists myArticlesPromise={myArticlesPromise(user?.email)}></MyLists>

      </Suspense>

      
    </div>
  );
};

export default MyArticles;