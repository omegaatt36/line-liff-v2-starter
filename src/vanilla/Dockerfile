FROM node:16-buster AS builder

# Create app directory
WORKDIR /app

COPY package*.json /app/
RUN npm install

COPY . /app

RUN npm install
RUN npx browserslist@latest --update-db
RUN npm run build

FROM nginx AS runner

RUN mkdir /app
COPY --from=builder /app/dist /app
COPY entrypoint.sh /entrypoint.sh
COPY nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["/entrypoint.sh"]
