export const myCommentsPromise = (email,token)=>{
    return fetch(`http://localhost:3000/comments?email=${email}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
    }).then(res=> res.json());
}