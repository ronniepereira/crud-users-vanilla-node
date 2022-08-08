export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean
}

export type UserCreate = {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean
}

export type UserLogin = {
    email: string;
    password: string;
}

export type UserSession = {
    id: string,
    name: string;
    email: string;
    isAdmin: boolean;
}