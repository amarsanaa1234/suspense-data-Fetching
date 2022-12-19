import axios from "axios";


export const ferchData = () =>{
    const userPromise = ferchUser();
    const postsPromise = ferchPosts()
    return{
        user: wrapPromise(userPromise),
        posts: wrapPromise(postsPromise)
    }
}

const wrapPromise= (promise) => {
    let status = 'pending'
    let result;
    let suspender = promise.then(
        res => {
            status = 'success'
            result = res;
        },
        err => {
            status = 'error'
            result = err
        }
    );
    return{
        read(){
            if(status === 'pending'){
                throw suspender
            }else if(status === 'error'){
                throw result
            }else if(status === 'success'){
                return result
            }
        }
    }
}

const ferchUser = () =>{
    console.log('ferching user....');
    return axios.get('https://jsonplaceholder.typicode.com/users/1')
    .then(res => res.data)
    .catch(err => console.log(err))   
}

const ferchPosts = () =>{
    console.log('ferching Posts....');
    return axios.get('https://jsonplaceholder.typicode.com/posts?_limit=50')
    .then(res => res.data)
    .catch(err => console.log(err))   
}