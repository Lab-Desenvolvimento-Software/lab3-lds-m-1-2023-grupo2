# Mapeamento do diagrama de classe para o MER

| Caractére | Legenda |
| --- | --- |
| # | Primary Key |
| @ | Foreign Key |

* Usuario(**#id**, login, senha)

* Aluno(**#id**, *@id_usuario*, nome, email, cpf, rg, logradouro, cidade, bairro, numero, instituicao, curso, moedas)

* Professor(**#id**, *@id_usuario*, nome, cpf, departamente, instituicao, moedas)

* Empresa(**#id**, *@id_usuario*, cnpj, nome)

* Transacao(**#id**, *@id_aluno*, *@id_professor*, quantidade, entrada, saida)

* Vantagem(**#id**, *@id_empresa*, nome, descricao, foto)
