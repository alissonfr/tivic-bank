export interface Transaction {
    id_transaction?: number;
    amount: number;
    operation: number;
    cod_bank_account: number;
    date_created?: Date;
}

export interface ResGetTransactions {
    transactions: Transaction[];
}

export interface ResSetTransaction {
    transaction: Transaction;
}

export interface ParamsGetTransactions {
    cod_bank_account: number;
}