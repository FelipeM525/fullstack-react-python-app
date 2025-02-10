# Instruções de Inicialização do Projeto

 Instruções para configurar e executar o projeto localmente.

## Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- Docker
- Python 3.8 ou superior
- PostgreSQL (caso não utilize Docker para o banco de dados)
- Node.js e npm

## Passo a Passo para Iniciar o Projeto

### 1. **Backend**

#### 1.1 Criar o arquivo `.env` no Backend

Na raiz do projeto, crie um arquivo `.env` com as seguintes variáveis de ambiente:

```env
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="sua-senha"
POSTGRES_DB="nome"
DATABASE_URL="postgresql://{POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}"
```

**Atenção**: A URL do banco de dados deve conter os valores  (não as variáveis). A URL correta deve ficar assim:

```env
DATABASE_URL="postgresql://postgres:sua-senha@localhost:5432/nome"
```

#### 1.2 Subir o banco de dados utilizando Docker

Acesse a pasta `api` e execute o comando abaixo para iniciar o banco de dados com o Docker:

```bash
docker-compose up -d
```

Isso iniciará o container do banco de dados PostgreSQL.

#### 1.3 Criar a primeira versão do banco de dados com Alembic

Após o banco de dados ter sido iniciado, você precisa criar a primeira versão do banco de dados:

```bash
alembic revision --autogenerate -m "create tables"
```

#### 1.4 Aplicar as migrações no banco de dados

Execute o comando abaixo para aplicar as migrações e criar as tabelas no banco de dados:

```bash
alembic upgrade head
```

#### 1.5 Alimentar o banco de dados

Para popular o banco de dados com dados iniciais, execute o seguinte comando:

```bash
python -m dbfeeder
```

#### 1.6 Iniciar o servidor FastAPI em ambiente de desenvolvimento

Por fim, inicie o servidor de desenvolvimento utilizando o Uvicorn:

```bash
uvicorn main:app --reload
```

Ou, se preferir, utilize o comando abaixo:

```bash
fastapi dev main.py
```

Isso irá iniciar a aplicação localmente e você poderá acessar a API no endereço `http://localhost:8000`.

### 1.7 Ao inicializar o serviço a documentação da api ficará disponível no link

`http://localhost:8000/docs`


### 2. **Frontend**

#### 2.1 Criar o arquivo `.env` no Frontend

Na raiz da pasta do frontend, crie um arquivo `.env` com a seguinte variável de ambiente:

```env
VITE_BASE_URL=http://localhost:8000
```

#### 2.2 iniciar o frontend react em ambiente de desenvolvimento

Com a variável de ambiente configurada, execute o comando abaixo para rodar o frontend:

```bash
npm run dev
```

Isso irá iniciar o servidor de desenvolvimento do frontend, e você poderá acessar a aplicação no navegador no endereço `http://localhost:5173` (ou outra porta conforme configurado).
