export interface login{
    phone_number: string,
    password: string
}   

export interface SignUp{
    first_name: string,
    last_name: string,
    phone_number: string,
    email:string,
    password:string
}


export interface Request {
    login: (data:login) => any
    sign_up: (data:SignUp) => any
}