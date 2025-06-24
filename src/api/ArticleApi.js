export const myArticlesPromise = (email,token) => {
    return fetch(`https://edusphere-server.vercel.app/articles?email=${email}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then(res => res.json());
}