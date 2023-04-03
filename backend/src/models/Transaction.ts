export interface Transaction {
    id_transaction?: number;
    amount: number;
    operation: number;
    cod_bank_account: number;
    date_created?: Date;
}