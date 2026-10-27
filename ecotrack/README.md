# EcoTrack

Dashboard web para monitoramento e simulação de consumo residencial.

## Objetivo

O EcoTrack permite simular o consumo mensal de água e energia de uma residência e acompanhar indicadores calculados com base no número de moradores.

O sistema foi desenvolvido como projeto acadêmico para demonstrar:

- desenvolvimento web
- organização de código
- Git e Gitflow
- testes automatizados
- integração contínua
- GitHub Actions

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Node.js
- Git
- GitHub
- GitHub Actions

## Funcionalidades

- Simulação do consumo de água
- Simulação do consumo de energia
- Configuração do número de moradores
- Cálculo do consumo por pessoa
- Estimativa de custo mensal
- Índice de eficiência
- Recomendações baseadas nos valores informados
- Persistência da simulação utilizando LocalStorage
- Alternância entre tema claro e escuro
- Interface responsiva

## Estrutura

```
ecotrack/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── tests/
│   └── metrics.test.js
│
├── app.js
├── metrics.js
├── index.html
├── styles.css
├── package.json
├── .gitignore
└── README.md
```

## Execução

Abra o arquivo `index.html` diretamente no navegador ou utilize o Live Server do Visual Studio Code.

Para executar os testes, é necessário possuir Node.js instalado:

```bash
npm test
```

Para verificar a sintaxe dos arquivos JavaScript:

```bash
npm run check
```

## GitHub Actions

A pipeline está localizada em:

```
.github/workflows/ci.yml
```

A execução ocorre quando:

- há um push para branches monitoradas
- é aberto ou atualizado um Pull Request para `main`
- é aberto ou atualizado um Pull Request para `develop`

A pipeline executa:

1. Checkout do código
2. Configuração do Node.js
3. Verificação da sintaxe JavaScript
4. Execução dos testes automatizados

## Gitflow

O projeto utiliza a seguinte organização:

```
main
 |
 +-- release
 |
develop
 |
 +-- feature
 |
 +-- feature
 |
 +-- hotfix
```

### Feature

Utilizada para desenvolver uma nova funcionalidade.

```bash
git switch develop
git switch -c feature/nova-funcionalidade
```

Depois das alterações:

```bash
git add .
git commit -m "feat: adicionar nova funcionalidade"
git push -u origin feature/nova-funcionalidade
```

A branch pode então ser enviada para revisão por meio de um Pull Request.

### Release

Utilizada para preparar uma versão estável.

```bash
git switch develop
git switch -c release/1.0.0
```

Depois:

```bash
git push -u origin release/1.0.0
```

Após a validação, a release pode ser integrada à `main`.

### Hotfix

Utilizada para corrigir problemas encontrados na versão de produção.

```bash
git switch main
git switch -c hotfix/correcao
```

Depois da correção:

```bash
git add .
git commit -m "fix: corrigir problema"
git push -u origin hotfix/correcao
```

## Observação

Os valores utilizados para cálculo de custos são exclusivamente demonstrativos e não representam tarifas oficiais.
