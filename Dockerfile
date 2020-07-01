FROM node:10
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm install
ENV MONGODB_URI="mongodb://heroku_tvzq5bld:mpukmuetjj1fiqfp26sm3u0u2s@ds013966.mlab.com:13966/heroku_tvzq5bld"
ENV DATABASE_NAME="heroku_tvzq5bld"
ENV FIREBASE_CREDENTIALS="./chotuve-android-app-firebase-adminsdk-2ry62-8af953dc1c.json"
ENV FIREBASE_DATABASE_URL="https://chotuve-android-app.firebaseio.com"
ENV FIREBASE_BUCKET_NAME="chotuve-android-app.appspot.com"
ENV FIREBASE_FOLDER_NAME="upload_test"
ENV TOKEN_SECRET="secret"
EXPOSE 3000
CMD ["npm", "run", "start"]