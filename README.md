# API de Gerenciamento de Contatos de Clientes

Este é um projeto de API REST desenvolvido em Node.js com TypeScript, focado no gerenciamento de contatos de clientes. O projeto segue princípios modernos de desenvolvimento de software e boas práticas de engenharia.

## Conceitos de Engenharia de Software Aplicados

### Arquitetura e Padrões de Projeto
- **Arquitetura em Camadas**: Implementação clara de separação de responsabilidades (Controllers, Services, Repositories)
- **Clean Architecture**: Estrutura organizada em camadas independentes
- **SOLID Principles**: Aplicação dos princípios de responsabilidade única, aberto/fechado, substituição de Liskov, segregação de interface e inversão de dependência
- **Repository Pattern**: Abstração da camada de acesso a dados
- **Dependency Injection**: Injeção de dependências para melhor testabilidade e manutenibilidade

### Qualidade de Software
- **TypeScript**: Tipagem estática para maior segurança e manutenibilidade
- **Validação de Dados**: Uso do Zod para validação de schemas
- **Tratamento de Erros**: Implementação de tratamento de erros centralizado
- **Testes Automatizados**: Implementação de testes unitários e de integração com Jest
- **Cobertura de Código**: Monitoramento de cobertura de testes

### DevOps e Infraestrutura
- **Containerização**: Docker e Docker Compose para ambiente de desenvolvimento e produção
- **Ambiente de Desenvolvimento**: Configuração de ambiente de desenvolvimento padronizado

### Documentação e API
- **Swagger**: Documentação da API
- **README**: Documentação do projeto

### Segurança
- **Autenticação**: Implementação de JWT (JSON Web Tokens)
- **CORS**: Configuração de segurança para requisições cross-origin
- **Variáveis de Ambiente**: Gerenciamento seguro de configurações

### Performance e Escalabilidade
- **Caching**: Implementação de cache com Redis
- **Logging**: Sistema de logs com Winston
- **Monitoramento**: Estrutura para monitoramento de performance

## Tecnologias Principais
- Node.js
- TypeScript
- Express
- Prisma (ORM)
- Redis
- Jest
- Docker
- Swagger

## Como Executar

### Pré-requisitos
- Node.js
- Docker e Docker Compose
- Yarn ou NPM

### Instalação
```bash
# Instalar dependências
yarn

# Configurar variáveis de ambiente
cp .env.example .env

# Iniciar containers
docker-compose up -d

# Executar migrações do banco de dados
yarn prisma migrate dev
```

### Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
yarn dev

# Executar testes
yarn test

# Verificar cobertura de testes
yarn test:coverage
```

### Produção
```bash
# Build do projeto
yarn build

# Iniciar servidor
yarn start
```

## Estrutura do Projeto
```
src/
├── controllers/   # Controladores da API
├── use-cases/     # Casos de uso da aplicação
├── repositories/  # Camada de acesso a dados
├── middlewares/   # Middlewares do Express
├── routes/        # Definição de rotas
├── schemas/       # Schemas de validação
├── interfaces/    # Interfaces TypeScript
├── errors/        # Tratamento de erros
├── constants/     # Constantes da aplicação
└── libs/          # Bibliotecas e utilitários
```
