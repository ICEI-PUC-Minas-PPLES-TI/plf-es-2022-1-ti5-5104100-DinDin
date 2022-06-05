<hr>

<h3 align="center">
    <img width="300px" src="./Artefatos/Imagens/logo.svg">
    <br><br>
    <p align="center">
      <a href="#-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-alunos-integrantes-da-equipe">Alunos Integrantes da Equipe</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-professores-responsáveis">Professores responsáveis</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-instruções-de-utilização">Instruções de utilização</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <a href="#-licença">Licença</a>
  </p>
</h3>

<hr>

## 🔖 Sobre

A falta de controle de finanças é motivo de estresse em 58,4% das famílias brasileiras. Em um contexto de pandemia, esse problema tem se agravado consideravelmente. Nesse sentido, para não perder o controle financeiro pessoal ou familiar, é necessário alguma estratégia ou ferramenta para gerenciar finanças. Aliando o contexto tecnológico com o problema supracitado, a plataforma <strong style="color: lightgreen"> DinDin </strong> foi desenvolvida para fazer esse papel de ferramenta para acabar com ou atenuar o problema da perda de controle financeiro.

Os problemas financeiros estão presentes diariamente na vida dos brasileiros. Dívidas surgem todos os dias, sejam elas pequenas e repentinas como um lanche vespertino ou grandes e planejadas como uma conta de aluguel. Devido a isso, fica difícil manter o controle sobre quanto se tem, quanto se gastou, e quanto se pode gastar. Nesse contexto, a falta do gerenciamento do dinheiro causa endividamentos, estresse e ocasiona a não realização de sonhos e objetivos pessoais.

Esta é uma aplicação distribuída de controle de finanças pessoais, que possibilita aos seus usuários uma forma mais prática de controlar suas despesas e receitas.

As funcionalidades principais são:
- Permitir ao usuário dividir suas despesas em categorias;
- Permitir ao usuário lançar suas despesas e receitas diárias;
- Permitir ao usuário, junto de outros usuários, lançar despesas e receitas de modo compartilhado.
- Permitir que o usuário controle de onde o dinheiro está saindo ou entrando.

---

## 👨‍💻 Alunos integrantes da equipe

* [Guilherme Gabriel Silva Pereira](https://github.com/guizombas)
* [Henrique Penna Forte Monteiro](https://github.com/Henrikkee)
* [Lucas Ângelo Oliveira Martins Rocha](https://lucasangelo.com)
* [Victor Boaventura Goes Campos](https://github.com/777-victor)
* [Vinícius Marini Costa E Oliveira](https://github.com/marinisz)

---

## 👩‍🏫 Professores responsáveis

* Cleiton Silva Tavares
* Pedro Alves De Oliveira

---

## 🚀 Tecnologias

- Frontend:
  - [Chart.js](https://www.chartjs.org/)
  - [FontAwesome](https://fontawesome.com/)
  - [JavaScript](https://www.javascript.com/)
  - [NuxtJs](https://nuxtjs.org/)
  - [NuxtFirebase](https://firebase.nuxtjs.org/service-options/auth/)
  - [SweetAlerts2](https://sweetalert2.github.io/)
  - [VueJs](https://vuejs.org/)
  - [Vuetify](https://vuetifyjs.com/en/)
- Mobile
  - [ChartsFlutter ](https://pub.dev/packages/charts_flutter)
  - [Firebase](https://pub.dev/packages/firebase_auth)
  - [FontAwesome](https://fontawesome.com/)
  - [Flutter](https://flutter.dev/)
  - [Sqflite](https://pub.dev/packages/sqflite)
- Backend:
  - [NodeCron](https://www.npmjs.com/package/node-cron)
  - [ExpressJs](https://expressjs.com/)
  - [FirebaseAdmin](https://firebase.google.com/support/release-notes/admin/node)
  - [JavaScript](https://www.javascript.com/)
  - [JestJs](https://jestjs.io/)
  - [NodeJs](https://nodejs.org/)
  - [Sequelize](https://sequelize.org/)
  - [Yup](https://github.com/jquense/yup)
- Database:
  - [MySQL Server](https://www.mysql.com/)
- Devops:
  - [GitHub Actions (CI/CD)](https://github.com/features/actions)
  - [Docker](https://www.docker.com/)
  - [Docker Compose](https://docs.docker.com/compose/)
- Cloud:
  - [Azure](https://azure.microsoft.com/) 

### Modelo MySql
- [ModeloMySQL](./Documentacao/imagens/der.png)

---

## ⤵ Instruções de utilização

Essas instruções vão te levar a uma cópia do projeto rodando em sua máquina local para propósitos de testes e desenvolvimento.

### Passo a passo de: como instalar e iniciar a aplicação utilizando Docker-Compose:

Pré-requisitos:
- Ter instalado [Docker na versão >=20.10](https://docs.docker.com/engine/install/ubuntu/)
- Ter instalado [Flutter na versão 2.10.5](https://docs.flutter.dev/development/tools/sdk/releases?tab=linux)

<br>

- Passo 1: Clonar o repositório:
```bash
$ git clone https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2022-1-ti5-5104100-DinDin
```

<br>
- Passo 2: Configurar o API NodeJS (backend)

- Passo 2.1: Entrar na pasta do backend:
```bash
$ cd plf-es-2022-1-ti5-5104100-DinDin/Codigo/dindin-api/
```

- Passo 2.2: Criar o arquivo .env com as variáveis de ambiente do backend:
```bash
$ mv .env.sample .env
```

- Passo 2.3: Adicionar a sua chave (entre aspas) do Firebase na variável FB_PRIVATE_KEY dentro do arquivo .env:
```bash
$ vim .env
```

- Passo 2.4: Iniciar o Docker-Compose da API:
```bash
$ docker-compose up
```

- API estará rodando em http://localhost:3001/

<br>

- Passo 3: Configurar o Nuxt VueJS (Frontend web)

- Passo 3.1: Entrar na pasta do frontend web:
```bash
$ cd plf-es-2022-1-ti5-5104100-DinDin/Codigo/dindin-frontend/
```

- Passo 3.2: Criar o arquivo .env com as variáveis de ambiente do frontend web:
```bash
$ mv .env.sample .env
```

- Passo 3.3: Iniciar o Docker-Compose do Nuxt VueJS:
```bash
$ docker-compose up
```

- Frontend estará rodando em http://localhost:80/

<br>

- Passo 4: Configurar o Flutter (Frontend mobile)

- Passo 4.1: Entrar na pasta do frontend mobile:
```bash
$ cd plf-es-2022-1-ti5-5104100-DinDin/Codigo/dindin-mobile/dindin/
```

- Passo 4.2: Instalar as dependências do projeto Flutter:
```bash
$ flutter pub get
```

- Passo 4.3: Criar o arquivo .env com as variáveis de ambiente do frontend mobile:
```bash
$ mv .env-example .env
```

- Passo 4.4: Iniciar o Flutter no Navegador Chrome (Usando celular ou emulador necessita de trocar o API_BASE_URL da .env para o IPv4 da sua máquina na mesma rede, além disso dar permissão do seu SHA265 do Android na sua conta do Firebase):
```bash
$ flutter run -d chrome
```

- Aplicação mobile irá gerar a build e abrir no navegador chrome

---

## 🔗 Links do projeto

- [Artefatos](Artefatos)
- [Codigo](Codigo)
- [Divulgacao](Divulgacao)
- [Documentacao](Documentacao)

---

## 📝 Licença

Esse projeto está sob a licença Creative Commons Attribution 4.0 International. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
