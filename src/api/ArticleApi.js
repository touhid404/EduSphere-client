export const myArticlesPromise = (email,token) => {
    return fetch(`http://localhost:3000/articles?email=${email}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then(res => res.json());
}