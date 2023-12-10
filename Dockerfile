# Use a imagem oficial do Node.js como base
FROM node:21.3

# Configuração do diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia os arquivos do projeto para o contêiner
COPY . .

# Compila o projeto Next.js para produção
RUN npm run build

# Exponha a porta em que o Next.js irá rodar
EXPOSE 3000

# Comando para iniciar o servidor Next.js
CMD ["npm", "start"]
