FROM node:8.16.0-alpine
ENV LANG C.UTF-8
ENV EDITOR vim

WORKDIR /app/which-is-true

RUN npm install -g npx
RUN yarn global add nuxt

CMD [ "yarn", "run", "dev" ]
