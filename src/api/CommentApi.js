export const myCommentsPromise = (email)=>{
    return fetch(`http://localhost:3000/comments?email=${email}`).then(res=> res.json());
}