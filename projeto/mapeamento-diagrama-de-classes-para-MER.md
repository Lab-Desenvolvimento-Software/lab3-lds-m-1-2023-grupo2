# Mapeamento do diagrama de classe para o MER

| Caractére | Legenda |
| --- | --- |
| # | Primary Key |
| @ | Foreign Key |

* Usuario(**#id**, login, senha, tipo, nome)

* Aluno(**#id**, *@id_usuario*, email, cpf, rg, logradouro, cidade, bairro, numero, instituicao, curso, moedas)

* Professor(**#id**, *@id_usuario*, cpf, departamente, instituicao, moedas)

* Empresa(**#id**, *@id_usuario*, cnpj, nome, email)

* Transacao(**#id**, *@id_destinatario*, *@id_remetente*, quantidade)

* Vantagem(**#id**, *@id_empresa*, nome, descricao, valor, img)
