import {DatabaseConnection} from "./DatabaseConnection";

export interface AccountDao {
    getByEmail(email: string): Promise<any>;
    save(account: any): Promise<any>;
}

export class AccountDatabaseDao implements AccountDao {
    constructor(readonly databaseConnection:DatabaseConnection) {
    }
    async getByEmail(email:string){
        const [acc] = await this.databaseConnection.query("select * from app.account where email = ?", [email]);
        return acc
    }
    async save(account:any){
        await this.databaseConnection.query("insert into app.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver) values (?, ?, ?, ?, ?, ?, ?)", [account.id, account.name, account.email, account.cpf, account.carPlate, !!account.isPassenger, !!account.isDriver]);
    }
}

export class AccountDaoInMemory implements AccountDao {
    accounts:any = []
    async getByEmail(email:string){
        return this.accounts.find((account:any) => account.email === email)
    }
    async save(account:any){
        this.accounts.push(account)
    }
}
