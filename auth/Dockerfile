# a base image
FROM node:19-alpine

# set working directory
WORKDIR /app
COPY package.json .
RUN npm install --only=prod
COPY . .

# start app
CMD ["npm", "start"]
