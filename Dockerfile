FROM node:16-alpine
RUN apk update && apk add bash

RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

#ARG USER
#RUN adduser -D $USER
WORKDIR /puppeteer-server
#RUN chown -R $USER:$USER .

#USER $USER

COPY ./ /puppeteer-server/

#RUN addgroup -S node && adduser -S -G node node \
 #   && mkdir -p /home/node/Downloads \
  #  && chown -R node:node /home/node \
   # && chown -R node:node /puppeteer-server

RUN mkdir -p /home/node/Downloads \
    && chown -R node:node /home/node \
    && chown -R node:node /puppeteer-server

RUN npm install

USER node

ENTRYPOINT ["npm"]
CMD ["start"]
# Run the app when the container launches
#CMD ["npm", "start"]

