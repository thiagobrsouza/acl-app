# OBJETIVO DO PROJETO
Sistema simples de controle de acesso. Iremos criar usuários com diferentes tipos de permissão e criar algumas páginas estáticas para testar os acessos conforme permissão.

# Escopo do Projeto
- Usuário com permissões acessa o sistema e cadastra um novo usuário
- Usuário autentica no sistema e verifica apenas rotas atribuídas a ele

# Permissões e níveis
- Administrador
  - Pode visualizar todas as rotas
  - Pode fazer tudo com todos os usuários
- Gerente
  - Pode visualizar algumas rotas do sistema
  - Pode editar usuários com exceção de troca de perfil
  - Pode trocar apenas a sua senha
- Funcionário
  - Pode visualizar as rotas atribuídas a ele
  - Não pode visualizar nenhuma rota de usuário
  - Pode trocar apenas a sua senha