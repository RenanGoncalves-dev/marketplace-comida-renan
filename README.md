# 🍔 Marketplace de Comida - RennMarketPlace

Trabalho 2 desenvolvido para a disciplina de **Programação para Dispositivos Móveis (2026/1)**.

O aplicativo é um marketplace virtual onde usuários podem se cadastrar, fazer login, anunciar refeições/alimentos para venda e visualizar anúncios de outros usuários com um sistema de filtro dinâmico.

## 🚀 Tecnologias Utilizadas
* **React Native** (com Expo CLI)
* **Google Firebase** (Authentication para controle de acesso)
* **Cloud Firestore** (Banco de dados NoSQL para os anúncios)
* **Expo Vector Icons** (Interface visual)

## 🛠️ Funcionalidades Implementadas
* **Autenticação Completa:** Cadastro e Login integrados ao Firebase com tratamento de erros nativo em português na tela.
* **Persistência de Sessão:** O usuário permanece logado mesmo fechando o app.
* **Criação de Anúncios:** Tela para cadastrar alimentos com título, descrição e preço salvando direto no Firestore.
* **Tela Inicial Dinâmica:** Lista os anúncios do mais novo ao mais antigo com limite de 3 linhas na descrição.
* **Desafio do Filtro:** Filtro no topo da página que permite isolar os anúncios por vendedor ou listar "Todos".
