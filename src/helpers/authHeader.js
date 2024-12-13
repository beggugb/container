export default function authHeader() {

    let user  = JSON.parse(localStorage.getItem('@usuarioFitt'));
    let token = JSON.parse(localStorage.getItem('@tokenFitt'));

if (user && token){
    return { 'x-access-token': token };
}else{
    return { };
}

}