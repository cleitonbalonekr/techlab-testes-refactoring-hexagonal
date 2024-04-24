import axios from "axios";
import {expect} from "vitest";


it('Deve cadastrar um passageiro',async ()=>{
    const payload = {
        cpf:"97456321558",
        email:`test${Math.random()}@test.com`,
        name:"teste teste",
        isDriver:false,
        isPassenger:true
    }
    const response = await axios.post('http://localhost:3001/signup',payload)
    const output = response.data;
    expect(output.accountId).toBeDefined()
})

// it('Deve cadastrar um motorista',async ()=>{
//     const payload = {
//         cpf:"97456321558",
//         email:`test${Math.random()}@test.com`,
//         name:"teste teste",
//         isDriver:true,
//         carPlate:"ABCD1234",
//         isPassenger:false
//     }
//     const response = await axios.post('http://localhost:3001/signup',payload)
//     const output = response.data;
//     expect(output.accountId).toBeDefined()
// })

// it('Deve retornar erro quando placa invalida',async ()=>{
//     const payload = {
//         cpf:"97456321558",
//         email:`test${Math.random()}@test.com`,
//         name:"teste teste",
//         isDriver:true,
//         carPlate:"1234",
//         isPassenger:false
//     }
//     const response = await axios.post('http://localhost:3001/signup',payload)
//     const output = response.data;
//     expect(output).toBe(-5)
// })