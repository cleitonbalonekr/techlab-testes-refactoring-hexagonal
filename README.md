### Signup
- Pode ser motorista e passageiro ao mesmo tempo
- Se for motorista precisa informar a placa do carro
  - A placa do carro precisa ser válida ex. ABCD1234
- CPF precisa ser válido
- Nome deve conter duas palavras
- Email precisa ser um email válido ex. teste@teste.com
- Se já existir uma conta cadastrada com o email informado, retorna erro

### Get Account
Input: account_id
Output: todas as informações da conta

### Solicitar Corrida
UC3 - Solicitar corrida
Ator: Passageiro
Input: passenger_id (account_id), from (lat, long), to (lat, long)
Output: ride_id

Regras:
* deve verificar se o account_id tem is_passenger true
* deve verificar se já não existe uma corrida do passageiro em status diferente de "completed", se existir lançar um erro
* deve gerar o ride_id (uuid)
* deve definir o status como "requested"
* deve definir date com a data atual

### Code Smells
- Nomes ruins
- Linhas em branco
- Código morto
- Comentários
- Condição alinhada
- Tratamento inadequado de erro e exceções
- Variáveis declaradas em conjunto ou longo do local de utilização