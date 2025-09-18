# Como Configurar a URL para a Atualização Automática de Preços

Este guia explica como montar a URL correta que você usará em serviços como `cron-job.org` para automatizar a atualização de preços dos seus produtos.

A URL completa será criada **APÓS** você publicar (fazer o deploy) do seu site.

---

## Formato da URL

A URL que você precisa seguirá este formato:

`[URL DO SEU SITE PUBLICADO]` + `/api/cron?secret=` + `[SUA CHAVE SECRETA]`

---

### Passo 1: Encontre a URL do seu Site Publicado

Quando você fizer o deploy do seu projeto no Firebase App Hosting (ou em qualquer outro serviço), ele lhe dará uma URL pública.

*   Ela será parecida com: `https://seu-projeto-12345.firebaseapp.com`
*   Ou, se você usar um domínio customizado: `https://www.seusite.com`

**Esta é a primeira parte da sua URL.**

### Passo 2: Encontre sua Chave Secreta

A sua chave secreta está no arquivo `.env` do seu projeto. É o valor que está depois de `CRON_SECRET=`.

Por exemplo, se o seu arquivo `.env` contém:
```
CRON_SECRET="jonathan.daiane23102022"
```
Então, `minhachavesupersegura123` é a **sua chave secreta**.

### Passo 3: Monte a URL Final

Agora, junte as partes.

**Exemplo:**

*   Se a URL do seu site publicado for: `https://djshop-alpha.firebaseapp.com`
*   E sua chave secreta for: `minhachavesupersegura123`

A URL completa que você deve colar no `cron-job.org` é:

**`https://djshop-alpha.firebaseapp.com/api/cron?secret=minhachavesupersegura123`**

---

Use este arquivo como referência quando for configurar o serviço de agendamento.
