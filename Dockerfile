FROM node:20-alpine

RUN apk add --no-cache openssl

WORKDIR /app

# ===== DEPENDENCIA===== #
COPY api/package*.json api/
COPY client/package*.json client/

RUN npm install --prefix api
RUN npm install --prefix client

# ===== CODIGO ===== #
COPY . .

# ===== BUILD ===== #
RUN npm run build

# ===== PRODUCAO ===== #
EXPOSE 3000

CMD ["npm", "run", "server"]
