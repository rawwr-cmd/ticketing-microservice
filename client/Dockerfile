# a base image
FROM node:19-alpine

# setting working directory
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]