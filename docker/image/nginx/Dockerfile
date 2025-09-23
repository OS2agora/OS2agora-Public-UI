FROM nginx:alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy config files
# *.conf files in "conf.d/" dir get included in main config
COPY ./default.conf /etc/nginx/templates/default.conf.template

# Expose the listening port
EXPOSE 4001

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]