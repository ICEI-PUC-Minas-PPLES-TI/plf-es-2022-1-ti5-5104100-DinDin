# Termo de Abertura de Projeto (TAP) no.: 9699

**DinDin Enterprises LTDA. :**

**Data: 18/02/2022**

**Integrantes:**

Guilherme Gabriel Silva Pereira, ggspereira@sga.pucminas.br

Henrique Penna Forte Monteiro, henrique.forte@sga.pucminas.br

Lucas Ângelo Oliveira Martins Rocha, laomrocha@sga.pucminas.br

Victor Boaventura Góes Campos, vbgcampos@sga.pucminas.br

Vinícius Marini Costa e Oliveira, vinicius.marini@sga.pucminas.br

---

**Professores:**

Prof. Cleiton Silva Tavares

Prof. Pedro Alves De Oliveira

---

_Curso de Engenharia de Software, Unidade Praça da Liberdade_

_Instituto de Informática e Ciências Exatas – Pontifícia Universidade de Minas Gerais (PUC MINAS), Belo Horizonte – MG – Brasil_

---

## 1. IDENTIFICAÇÃO DO PROJETO

**1.1 Nome do Projeto:** DinDin

**1.2 Gerente do Projeto:** Lucas Ângelo Oliveira Martins Rocha

**1.3 Cliente do Projeto:** Pessoas físicas que necessitam de melhor controle financeiro.

**1.4 Tipo de Projeto:**

[ ] Manutenção em produto existente

[X] Desenvolvimento de novo produto

[ ] Outro: \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**1.5 Objetivo do projeto:**

Desenvolver uma aplicação distribuída de controle de finanças pessoais, que possibilite aos seus usuários uma forma mais prática de regularem seus custos.

**1.6 Benefícios que justificam o projeto:**

Controle e planejamento financeiro proporcionam:
- Uma vida mais equilibrada;
- Ajuda na conquista de sonhos e objetivos;
- Ajuda no corte de gastos desnecessários;
- Evitar juros e dívidas;
- Menos estresse causado pelo descontrole financeiro.
- Ajudará uma grande parcela da população que não possui controledos próprios gastos.

**1.7 Qualidade esperada do produto final (requisitos de qualidade):**

- O sistema deve ser aprovado nos testes unitários de requisições HTTP e autenticação.
- O sistema deve possuir uma interface web que seja objetiva para o usuário, com no máximo três funcionalidades por página.
- O sistema deve ser compatível com sistema operacional Linux, com o objetivo de proporcionar a disponibilidade em nuvem de pelo menos 98% do
tempo de atividade (uptime).
- O sistema deve ser dimensionado para suportar no mínimo 20 usuários conectados ao mesmo tempo.
- As telas da aplicação web devem ser responsivas para proporcionar o uso de todas as funcionalidades providas pelos requisitos funcionais em resoluções
de 576px até 1080px.
- A aplicação deve garantir a segurança das senhas dos usuários,criptografando-as em sha256 ao serem inseridas no banco de dados.
- Todos os logins na aplicação devem ser autenticados e autorizados os acessos a cada rota, por meio de JWT Bearer com expiração do token em 7 dias.
- Seguir boas práticas de interface mobile.
- O sistema deve processar requisições do usuário em no máximo 3 segundos.

## **2. ESCOPO PRELIMINAR E PREMISSAS** |

**2.1 O que será feito (escopo do projeto)**

- Um sistema para lançamento de receitas e despesas financeiras;
- Aplicação mobile e web;
- Permitir lançamentos compartilhados (Renda familiar - Despesas de casa);
- Entregar opções de investimentos baseadas no perfil do usuário;

**2.2 O que não será feito no projeto (contra-escopo)**

- Integração com instituições financeiras.
- Transações financeiras.
- Guardar credenciais de instituições financeiras do usuário.
- Indicação de investimentos.
- Não rastreia investimentos no CEI (Canal eletrônico do investidor)

**2.3 Resultados / serviços / produtos a serem entregues**

| **1.** |  Ferramenta de gerenciar o capital. |
| --- | --- |
| **2.** | Funcionalidade para gerenciar capital compartilhado. |
| **3.** | Receber informações sobre investimentos. |

**2.4 Condições para início do projeto**

Modelar a aplicação utilizando diagramas UML.
Definir as tecnologias a serem utilizadas no desenvolvimento da aplicação.


## 3. ESTIMATIVA DE PRAZO


**3.1 Prazo previsto (horas):** 1110

**3.2 Data prevista de início:** 01/03/2022

**3.3 Data prevista de término:** 09/06/2022

## 4. ESTIMATIVA DE CUSTO

| Item de custo | Qtd. horas | Valor / hora  | Valor total |
| --- | --- | --- | --- |
| **4.1 Recursos Humanos** **(especifique):** | 0 | 0 | 0 | 0
| **4.2 Hardware (especifique):** | 0 | 0 | 0 | 0
| **4.3 Rede e serviços de hospedagem:** | 2880 | $0.023 | $66,24 |
| **4.4 Software de terceiros:** | 0 | 0 | 0 |
| **4.5 Serviços e treinamento:** | 80 | 0 | $30,00 |
| **4.6 Total Geral:** | 2960 | $0.023 | $96,24 |

## 5. PARTES INTERESSADAS

| Nome | Papel no projeto | Assinatura |
| --- | --- | --- |
| Guilherme Gabriel Silva Pereira | Desenvolvedor Mobile | Guilherme Gabriel |
| Henrique Penna Forte Monteiro | Desenvolvedor Frontend | Henrique Penna |
| Lucas Ângelo Oliveira Martins Rocha | Desenvolvedor Backend | Lucas Ângelo |
| Victor Boaventura Góes Campos | Product Owner | Victor Boaventura |
| Vinícius Marini Costa e Oliveira | QA | Vinícius Marini |

**Observações:**

- As estimativas de prazo e custo são aproximadas e podem variar ao longo do projeto, devendo ser revistas após o detalhamento dos requisitos.

- Este documento, após ser completamente preenchido, deve ser assinado pelos responsáveis do projeto (gestores envolvidos).

- Este documento, se aprovado na **reunião de** _**[kickoff](../Atas/ATA-2022-02-10.md)**_, autoriza o início do projeto de acordo com a especificação supra e as normas da empresa.

