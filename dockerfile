FROM node:14

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . /app

EXPOSE 4000

ENV PORT=7070
ENV JWTKEY='LonginusSecrecy'
ENV HOST=http://localhost:
ENV DB_CLIENT="postgresql"
ENV DB_USER='vc'
ENV DB_HOST=127.0.0.1
ENV DB_PORT=5432
ENV DB_PASSWORD=password
ENV DB_NAME=blog
ENV INTERNAL_ERROR='internal server error'
ENV USER_EXIST="Username already exists"
ENV EMAIL_EXIST="Email already exists"
ENV USER_NOT_FOUND="User not found"
ENV INVALID_CREDENTIALS="Invalid credentails"
ENV UNATHORIZED=" Unauthorized Access"
ENV BLOG_NOT_FOUND="Blog not found"
ENV SUCCESS_MSG="Successful"

CMD ["yarn", "start"]
