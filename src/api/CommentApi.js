export const myCommentsPromise = (email,token)=>{
    return fetch(`https://edusphere-server.vercel.app/comments?email=${email}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then(res=> res.json());
}