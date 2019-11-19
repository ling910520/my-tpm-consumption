FROM nginx:alpine
# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/nginx.conf
ADD nginx.conf /etc/nginx/
ADD web /usr/share/nginx/html/
ADD web /var/www/html/

# COPY prod.conf /etc/nginx/prod.conf
