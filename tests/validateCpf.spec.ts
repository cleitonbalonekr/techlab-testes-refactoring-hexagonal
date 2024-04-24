import {validateCpf} from "../src/validateCpf";

it.each(["97456321558","71428793860","87748248800"])('Deve validar um cpf', () => {
    const cpf = "97456321558"

    const response = validateCpf(cpf)

    expect(response).toBe(true)
})

it.each(["11111111111","111111111",null,undefined])('Deve retornar false para um cpf invalido', (cpf) => {
    const response = validateCpf(cpf)
    expect(response).toBe(false)
})