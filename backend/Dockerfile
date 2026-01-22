# 1️⃣ Node ka ready image lo
FROM node:18

# 2️⃣ Container ke andar working folder
WORKDIR /app

# 3️⃣ package.json copy karo
COPY package*.json ./

# 4️⃣ npm install chalao
RUN npm install

# 5️⃣ Baaki code copy karo
COPY . .

# 6️⃣ App ka port
EXPOSE 4000

# 7️⃣ App start command
CMD ["npm", "start"]
