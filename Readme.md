# 🎬 CasaFilmes

O **CasaFilmes** é um aplicativo completo para explorar, favoritar e gerenciar filmes.  
Cada usuário pode criar sua conta, editar seu perfil (com foto e biografia), favoritar filmes e visualizar tudo de forma organizada e bonita.

---

## 🧠 Visão geral do projeto

O projeto é dividido em **duas partes principais**:

1. **Backend (Node.js + Express + Prisma + PostgreSQL)**  
   Responsável por autenticação, gerenciamento de usuários, upload de imagens e controle dos filmes favoritados.

2. **Frontend (React + Vite)**  
   Onde o usuário interage com o sistema — faz login, vê os filmes, adiciona favoritos e gerencia o perfil.

Os dados dos filmes vêm diretamente da **API do TMDB (The Movie Database)**.

---

## 🧩 Tecnologias usadas

### **Frontend**
- React + Vite  
- React Router DOM  
- React Slick (carrossel)  
- React Icons  
- Tailwind CSS e CSS personalizado  

### **Backend**
- Node.js + Express  
- Prisma ORM  
- PostgreSQL  
- Multer (upload de imagens)  
- JWT (autenticação)  
- Bcrypt.js (hash de senha)  
- Dotenv (variáveis de ambiente)

---

## ⚙️ Passo a passo para rodar o projeto

### 🗂️ 1. Clonar o repositório

```bash
git clone https://github.com/GabrielCMattos/project-verzel.git
cd project-verzel
```

### 🗂️ 2. Criar o banco e configurar o back-end

```
É necessário ter o PostgreSQL e Docker Desktop para essa parte

cd back-end
npm install

Crie um arquivo .env dentro da pasta back-end com este conteúdo:

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tmdb_teste?schema=public"
TMDB_API_KEY=Sua chave de API do TMDB database
TMDB_BASE_URL=https://api.themoviedb.org/3
PORT=3301
JWT_SECRET=jwttoken

Rode as migrations do prisma com: 
npx prisma migrate dev
docker compose up -d

E inicie o servidor back-end com:
npm run dev
```

### 🗂️ 3. Configurar o front-end

```
cd ../frontend
npm install

Crie o arquivo .env dentro da pasta front-end com este conteúdo: 

VITE_API_URL=http://localhost:3301/api
VITE_IMG=https://image.tmdb.org/t/p/w500/

Depois rode o front-end com:

npm run dev
```

É necessário que o Front-end e o Back-end estejam rodando juntos para funcionar!
