FROM node:10
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
ENV MONGODB_URI="mongodb://heroku_tvzq5bld:mpukmuetjj1fiqfp26sm3u0u2s@ds013966.mlab.com:13966/heroku_tvzq5bld"
EXPOSE 3000
CMD ["npm", "run", "start"]