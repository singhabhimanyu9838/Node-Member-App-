FROM node:v20.17.0
WORKDIR /app
COPY package*.jason ./
RUN npm install
COPY . .
ENV PORT 8080
EXPOSE 3000
CMD ["node", "index.js"]