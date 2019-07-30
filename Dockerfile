FROM node:alpine

RUN apk add --no-cache git

COPY crontab.txt /crontab.txt
COPY entry.sh /entry.sh
RUN /usr/bin/crontab /crontab.txt
RUN chmod 755 /entry.sh

WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm ci
COPY . /app
RUN chmod 755 script.js

CMD ["/entry.sh"]
