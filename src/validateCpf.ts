
export function validateCpf(raw: string) {
    if (!raw) {
        return false
    }
    const cpf = cleaningCpf(raw);
    if (cpf.length < 11) {
        return false
    }
    if (isAllDigitsEqual(cpf)) {
        return false
    }
    const digit1 = calculateDigit(cpf, 10)
    const digit2 = calculateDigit(cpf, 11)
    return extractDigits(cpf) == `${digit1}${digit2}`;
}

function cleaningCpf(str: string) {
    return str
        .replace('.', '')
        .replace('.', '')
        .replace('-', '')
        .replace(" ", "");
}

function isAllDigitsEqual(str: string) {
    return str.split("").every(c => c === str[0]);
}

function extractDigits(str: string) {
    return str.substring(str.length - 2, str.length);
}


function calculateDigit(cpf: string, factor: number) {
    let total = 0
    for (const digit of cpf) {
        if (factor > 1) {
            total += parseInt(digit) * factor--
        }
    }
    const rest = total % 11
    return rest < 2 ? 0 : 11 - rest
}