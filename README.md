# RestCountries

## Pré-Requisitos

  - Angular - version 16.2.15 
  - Node - version 18.20.4
  - Docker (Opcional)
  - Docker-Compose (Opcional)

## Instalação no Windows

### Instalar Node.js 18 no Windows

1. **Baixar o Node.js 18**
   - Acesse o site oficial do Node.js: [Node.js Downloads](https://nodejs.org/en/download/)
   - Escolha a versão 18.20.4 LTS e siga as intruções de instalação via PowerShell
  
### Instalar Angular 16 no Windows

1. **Instalar o Angular CLI**
   - Execute o seguinte comando para instalar o Angular CLI globalmente:

     ```bash
     npm install -g @angular/cli@16
     ```

2. **Verificar a Instalação do Angular CLI**
   - Verifique se o Angular CLI foi instalado corretamente:

     ```bash
     ng version
     ```

## Instalação no Linux

### Instalar Node.js 18 no Linux

1. **Instalar o Node**

  ```bash
      curl -fsSl https://deb.nodesource.com/setup_18.x | sudo -E bash -
      sudo apt-get install -y nodejs
  ```

2. **Verificar a instalação**

  ```bash
      node -v
      npm -v
  ```

### Instalar Angular CLI 16 no Linux

1. **Instalar o Node**

  ```bash
      npm install -g @angular/cli@16
  ```

2. **Verificar a instalação**

  ```bash
      ng version
  ```

## Uso do Docker-Compose (Opcional):

Caso você não queira instalar o Node e Angular no seu PC, você pode utilizar o Docker-Compose para criar um container contendo o Node e Angular nas versões necessárias para o funcionamento do projeto.

### Instalar o Docker e Docker-Compose

  Siga as instruções da documentação do Docker:

 - https://docs.docker.com/compose/install/

### Usando o Docker-Compose

  O Docker-Compose já está configurado, para utilizado basta utilizar o comando:

  ```bash
      docker-compose up angular-dev
  ```
  Ou pode utilizar o Make (Caso você use Linux ou Mac...)
  
 ```bash
      make start
 ```

  Se caso opte por esta opção, não será necessário passar para próxima etapa. Isto porque o Docker-Compose foi configurado    para executar o projeto.

----

## Executando o projeto:

  Basta utilizar o comando no terminal:

```bash
    ng serve
```

