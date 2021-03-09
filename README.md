DesafioApi
==========================

Api desenvolvida com Nodejs para o envio de cartas ao papai noel.

 - Para realizar o desenvolcimento da api, em sua base foi utilizado NodeJs junto ao Typescript.

 - A linguagem utilizada para a manipulação do banco de dados foi MongoDB,
 as instruções para a execução do mesmo estarão abaixo.

## Banco de Dados

 - Inserir o caminho do banco de dados MongoDB no arquivo .env: 

MONGODB_URI = "Caminho para o banco".

 - Foi utilizado essa estrutura para os models 

table - desafio: 
            collection - letter
            collection - user

table - desafio_test: 
            collection - letter
            collection - user

 - Os models farão a parte de definição da estrutura das tabelas, apenas manter essa estrutura de banco e tabelas.
 ## Executando o Projeto

 - Primeiramente execute:

```bash
npm install
```
 - Logo após instalar as depêndencias, execute o comando abaixo para realizar
 a compilação dinâmica do Typescript.

```bash
npm run webpack
```

 - Em seguida em outro terminal execute o comando para executar a aplicação:

```bash
npm run dev
```

 - Por default o sistema estará rodando em localhost:8080.

## Executando os Testes

 - Para a construção dos testes foi utilizado a ferramenta Jest, para executá-lo
 execute na raiz do projeto no terminal:

```bash
npm test
```
## Testando a API

 - Foi criado um usuário padrão para a autenticação JWT:
    
login: admin
password: desafioapi

 - Url com a documentação da API: https://apiletter.herokuapp.com/api/docs








