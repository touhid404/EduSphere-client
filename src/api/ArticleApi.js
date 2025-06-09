export const myArticlesPromise = (email)=>{
    return fetch(`http://localhost:3000/articles?email=${email}`).then(res=> res.json());
}