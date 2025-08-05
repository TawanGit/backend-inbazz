## 📄 Configuração do Ambiente

Crie um arquivo chamado `.env` na raiz do projeto e defina as seguintes variáveis de ambiente:

```env
DATABASE_URL="sua_url_do_banco_de_dados"
SECRET_KEY="sua_chave_secreta_jwt"
```

Instale as dependencias utilizando:
```cmd
 npm install
```

Gere o prisma client utilizando 
```cmd
npx prisma generate
```


✅ Dica:
Se você quiser usar o banco de dados SQLite para desenvolvimento local, utilize:
```
DATABASE_URL="file:./todoList.db"
```

Crie as tabelas com:
```cmd
npx prisma migrate dev
```

Rode o projeto utilizando
```cmd
npm run start:dev
```

## 🔐 Autenticação com Token
Todas as rotas de categoria e tarefas estão protegidas via token JWT, mas não se preocupe!

Um seeder foi criado para facilitar o uso. Após iniciar o projeto com:
```
npm run start:dev
```
Terá um usuário com as seguintes credenciais:
```
email: inbazz@hire.com
password: 123
```

## ➡️ Como obter o token
Acesse a rota:
```
POST /auth/login
```
Envie as credenciais acima em formato JSON.
Você receberá um access_token, que deverá ser utilizado no header Authorization das requisições protegidas

Um seeder também foi criado para adicionar uma categoria padrão, chamada de "General", caso o usuario não selecione uma categoria, essa categoria será selecionada por padrão.


## 🧩 Arquitetura do Projeto
O projeto segue os princípios do SOLID, com foco especial no Princípio da Responsabilidade Única, garantindo um código mais organizado, escalável e de fácil manutenção.

## ✅ Funcionalidade de Listagem de Tarefas – Filtros por Query
A rota de listagem de tarefas (GET /todos) permite o uso de filtros opcionais via query params, como solicitado. Por exemplo:

GET /todos?categoryId=2&status=PENDING

Filtros disponíveis:
categoryId: filtra tarefas pela categoria (ID numérico).
status: filtra tarefas pelo status (PENDING ou DONE).
