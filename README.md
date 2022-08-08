# :hammer_and_wrench: Resumo

Projeto simples com objetivo de ser breve e colocar a mão na massa
Foi utilizado as seguintes tecnologias:
## Backend:
- [Node.js][nodejs] + [Express Framework][express], com [Typescript][ts].
- [PrismaORM](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)


## Frontend:
- HTML5/CSS3/JS
- [jQuery](https://jquery.com/)

# :information_source: Requisitos

- NodeJS
- MySQL
- NPM

# :information_source: Como executar

## Clone o repositório
```bash
# Clone this repository
$ git clone https://github.com/ronniepereira/crud-users-vanilla-node

# Go into the repository
$ cd crud-users-vanilla-node

```

## Gere a Private KEY
 
### Instale openssl caso não tenha na sua máquina [Download](https://code.google.com/archive/p/openssl-for-windows/downloads)

 ```bash
 # Gere a chave
 $ openssl genrsa -des3 -out private.pem 2048

 # Copie para pasta credentials
 $ mv private.pem ./credentials
 ```

## Configure o Backend

```bash
# Entre na pasta backend
$ cd backend

# Instale as dependências do projeto
$ npm install

$ cp .env.example .env

# Modifique as variáveis do arquivo .env

# Execute o migration para criar as tabelas no banco de dados
$ npx prisma migrate dev

# Inicie a aplicação
$ npm run start

```

## Acesse o frontend

```bash
$ cd frontend
```
## Abra o arquivo index.html no navegador

## Faça o login com os dados abaixo
```
Email: ronnie.pereira@example.com
Senha: P@$$admin
```

---

Feito por [Ronnie Pereira](https://www.linkedin.com/in/ronniepereira/)

[nodejs]: https://nodejs.org/
[express]: https://expressjs.com/
[ts]: https://www.typescriptlang.org/