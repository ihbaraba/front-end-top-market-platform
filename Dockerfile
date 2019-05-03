FROM node:chakracore-10.13 AS builder

WORKDIR /app

COPY package.json   /app/
RUN cd /app && npm set progress=false && npm install
# Run build
COPY .  /app
ENV PUBLIC_URL /
RUN cd /app && npm run build


# Prepare nginx server
FROM nginx:alpine
COPY .docker/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
