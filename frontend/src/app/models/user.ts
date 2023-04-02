export interface User {
    id_user?: number;
    name: string;
    email: string;
    password: string;
    cpf: string;
    birth: Date;
    date_created?: Date;
    date_updated?: Date;
}