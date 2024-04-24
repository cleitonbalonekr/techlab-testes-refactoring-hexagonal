import mysql from "promise-mysql";

export interface DatabaseConnection{
    query(statement:string,params:any):Promise<any>;
    close():Promise<any>
}

export class MysqlDatabaseConnection implements DatabaseConnection {
    private connection:any
    constructor() {
        this.connect().then()
    }

    private async connect():Promise<any>{
       if(this.connection){ return this.connection; }
       const connection =  await mysql.createConnection({
            user: 'root',
            password: 'root',
            database: 'app'
        })
       this.connection = connection
    }

    async query(statement:string,params:any):Promise<any>{
        await this.connect()
       return this.connection.query(statement, params);
    }

    async close():Promise<any>{
        this.connection.end()
    }
}