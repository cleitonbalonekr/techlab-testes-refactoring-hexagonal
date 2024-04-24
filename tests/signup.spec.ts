import {afterAll, beforeAll, expect} from "vitest";
import {Signup} from "../src/Signup";
import {AccountDatabaseDao} from "../src/AccountDao";
import {DatabaseConnection, MysqlDatabaseConnection} from "../src/DatabaseConnection";


let signup:Signup
let databaseConnection:DatabaseConnection
beforeAll(()=>{
    databaseConnection =  new MysqlDatabaseConnection()
    const accountDao = new AccountDatabaseDao(databaseConnection);
    signup = new Signup(accountDao)
})

afterAll(async()=>{
    await databaseConnection.close()
})


it('Deve cadastrar um passageiro',async ()=>{
    const payload = {
        cpf:"97456321558",
        email:`test${Math.random()}@test.com`,
        name:"teste teste",
        isDriver:false,
        isPassenger:true
    }
    const response = await signup.execute(payload)
    expect(response?.accountId).toBeDefined()
})

it('Deve cadastrar um motorista',async ()=>{
    const payload = {
        cpf:"97456321558",
        email:`test${Math.random()}@test.com`,
        name:"teste teste",
        carPlate: 'ABCD1234',
        isDriver:true,
        isPassenger:false
    }
    const response = await signup.execute(payload)
    expect(response?.accountId).toBeDefined()
})
it('Deve retornar erro quando placa inválida',async ()=>{
    const payload = {
        cpf:"97456321558",
        email:`test${Math.random()}@test.com`,
        name:"teste teste",
        carPlate: '1234',
        isDriver:true,
        isPassenger:false
    }
    const response = await signup.execute(payload)
    expect(response).toBe(-5)
})
it('Deve retornar erro quando cpf inválido',async ()=>{
    const payload = {
        cpf:"974563215",
        email:`test${Math.random()}@test.com`,
        name:"teste teste",
        carPlate: '1234',
        isDriver:false,
        isPassenger:true
    }
    const response = await signup.execute(payload)
    expect(response).toBe(-1)
})
it('Deve retornar erro quando email inválido',async ()=>{
    const payload = {
        cpf:"974563215",
        email:`testtest.com`,
        name:"teste teste",
        carPlate: '1234',
        isDriver:false,
        isPassenger:true
    }
    const response = await signup.execute(payload)
    expect(response).toBe(-2)
})

it('Deve retornar erro quando nome inválido',async ()=>{
    const payload = {
        cpf:"97456321558",
        email:`test${Math.random()}@test.com`,
        name:"teste",
        carPlate: '1234',
        isDriver:false,
        isPassenger:true
    }
    const response = await signup.execute(payload)
    expect(response).toBe(-3)
})
it('Deve retornar erro usuário já cadastrado',async ()=>{
    const email = `test${Math.random()}@test.com`
    const payload = {
        cpf:"97456321558",
        email,
        name:"teste teste",
        isDriver:false,
        isPassenger:true
    }
    await signup.execute(payload)
    const response = await signup.execute(payload)
    expect(response).toBe(-4)
})