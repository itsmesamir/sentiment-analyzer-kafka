FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# Build TypeScript files
RUN yarn build

CMD ["yarn", "start"]

