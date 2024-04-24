import crypto from "crypto";
import {validateCpf as validate} from "./validateCpf";
import {AccountDao} from "./AccountDao";

export class Signup {

    constructor(readonly accountDao: AccountDao) {
    }

    async execute(body: any) {
        let result;
        const id = crypto.randomUUID();
        const acc = await this.accountDao.getByEmail(
            body.email
        )
        if (acc) {
            return -4
        }
        if (!body.name.match(/[a-zA-Z] [a-zA-Z]+/)) {
            return -3
        }
        if (!body.email.match(/^(.+)@(.+)$/)) {
            return -2
        }
        if (!validate(body.cpf)) {
            return -1
        }
        if (body.isDriver && !body.carPlate.match(/[A-Z]{3}[0-9]{4}/)) {
            return -5;
        }
        await this.accountDao.save({id,...body})
        const obj = {
            accountId: id
        };
        result = obj;
        if (typeof result === "number") {
            console.log('result', result)
            return result
        } else {
            return result
        }

    }

}

