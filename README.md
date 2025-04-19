# MedMap

Aplicação de agendamento e gestão médica desenvolvida com **Spring Boot (Backend)** e **React (Frontend)**.

## 🧪 Tecnologias

- **Backend:** Java 17, Spring Boot, Spring Data JPA, PostgreSQL  
- **Frontend:** React, Chakra UI, FullCalendar  
- **Banco de Dados:** PostgreSQL

---

## 🚀 Como rodar o projeto

## Pré-requisitos

- Java 17+
- Node.js 18+
- PostgreSQL
- IDEs recomendadas: IntelliJ IDEA (backend) e VSCode (frontend)

### Backend (Spring Boot)

1. Clone o repositório.
2. Configure o PostgreSQL com as credenciais:
   - **Database name:** `pos`
   - **Usuário:** `postgres`
   - **Senha:** `postgres`
3. O banco será automaticamente criado e populado ao iniciar (`spring.jpa.hibernate.ddl-auto=create-drop`).
4. Execute a aplicação com sua IDE ou via terminal:

```bash
./mvnw spring-boot:run
```

##  Frontend (React)

1. Navegue até a pasta do frontend.
2. Instale as dependências:

```bash
npm install
```

3. Inicie a aplicação:
```bash
npm inpm run dev
```

> Por padrão, o frontend roda em http://localhost:5173 e o backend em http://localhost:8080.

---

## 👥 Usuários pré-cadastrados

O sistema já vem com três usuários, um de cada tipo:

| Nome      | Tipo    | Email               | Senha   |
|-----------|---------|---------------------|---------|
| Vinicius  | ADMIN   | `admin`             | `admin` |
| Lucas     | USER    | `user@user`         | `123`   |
| Paciente  | PATIENT | `paciente@paciente` | `123`   |

---

## 📌 Dados pré-cadastrados

Ao iniciar o sistema, os seguintes dados são automaticamente inseridos:

### Tipos de Despesa

- Tipo Despesa 1 (Frequência: Diária)
- Tipo Despesa 2 (Frequência: Anual)
- Tipo Despesa 3 (Frequência: Mensal)

### Tipos de Atendimento

- Tipo de Serviço 1 (Duração: 30min, Preço: R$10,00)
- Tipo de Serviço 2 (Duração: 30min, Preço: R$10,00)

---

## ✅ Funcionalidades principais

- Autenticação de usuários com controle de permissões (ADMIN, USER, PATIENT)
- Visualização e criação de atendimentos via calendário
- Cadastro e listagem de tipos de despesa e atendimento
- Busca de endereço automática via CEP
- Interface moderna com Chakra UI + FullCalendar

---

## 🧠 Observações

- O modo de desenvolvimento do React está com Strict Mode ativado, o que pode duplicar chamadas de API em `useEffect`. Isso **não acontece em produção**.
- O banco de dados é reiniciado a cada vez que a aplicação backend é reiniciada (`create-drop`).
