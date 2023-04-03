export interface BankAccount {
    id_bank_account?: number;
    agency: string;
    account_number: string;
    account_checker: string;
    balance: number;
    cod_user: number;
    date_created?: Date;
    date_updated?: Date;
}