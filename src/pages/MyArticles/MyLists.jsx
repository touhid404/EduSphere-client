import React, { use } from 'react';

const MyLists = ({myArticlesPromise}) => {

    const myArticles = use(myArticlesPromise);


    console.log(myArticles);
    return (
        <div>

            <h1>,Mys lsif</h1>

            {myArticles.length }
            
        </div>
    );
};

export default MyLists;