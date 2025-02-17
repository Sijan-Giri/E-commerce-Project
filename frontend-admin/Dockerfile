FROM node:20
WORKDIR /frontend-admin
COPY ./package*.json ./
RUN npm install 
COPY . .

CMD ["npm","start"]