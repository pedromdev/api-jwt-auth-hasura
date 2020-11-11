FROM node:12-alpine

RUN apk add tzdata \
  && mkdir /app

WORKDIR /app

CMD ["yarn", "start:prod"]
