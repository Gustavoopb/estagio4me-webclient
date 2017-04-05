FROM nginx
COPY ./dist /usr/share/nginx/html
EXPOSE 80
EXPOSE /usr/share/nginx/html