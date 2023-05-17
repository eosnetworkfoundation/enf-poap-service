#!/usr/bin/env bash

# Intended for MacOSx
if [[ "$(uname)" == "Darwin" ]]; then
    echo "Proceeding: You are running macOS."
else
    echo "You are not on macOS exiting. Only macOS is supported"
    exit 1
fi

# our directory structure
NGINX_ROOT=/usr/local/etc/nginx/
LOGROOT=/Library/Logs/nginx/
WEBROOT=/Library/WebServer/nginx

# default and site config
DEFAULT_CONF=${1:-./nginx-default.conf}
IMAGE_SERVICE_CONF="./nginx-image-service.conf"

# exit if config does not exist
if [ ! -f "$DEFAULT_CONF" ]; then
  echo "Could not find file $DEFAULT_CONF exiting"
  exit 1
fi
if [ ! -f "$IMAGE_SERVICE_CONF" ]; then
  echo "Could not find file $IMAGE_SERVICE_CONF exiting"
  exit 1
fi

# make the directories we need
mkdir -p "$NGINX_ROOT"/sites-{enabled,available} || { echo "failed to create directory under $NGINX_ROOT"; exit 1; }
echo "Enter Password to sudo mkidr $LOGROOT and $WEBROOT"
sudo mkdir -m777 -p "$LOGROOT" || { echo "failed to create directory $LOGROOT"; exit 1; }
sudo mkdir -m777 -p "$WEBROOT" || { echo "failed to create root dir $WEBROOT"; exit 1; }
mkdir -m777 "$WEBROOT"/images || { echo "failed to create root dir $WEBROOT/images"; exit 1; }
# Backup original config
mv "$NGINX_ROOT"/nginx.conf  "$NGINX_ROOT"/sites-available/nginx-original.conf
# update root config
cp "$DEFAULT_CONF" "$NGINX_ROOT"/nginx.conf || { echo "failed to copy in nginx default config"; exit 1; }
# add our service
cp "$IMAGE_SERVICE_CONF" "$NGINX_ROOT"/sites-available/image-service.conf || { echo "failed to copy in nginx image-service.conf"; exit 1; }
# any *.conf in sites-enabled will be used
ln -s "$NGINX_ROOT"/sites-available/image-service.conf "$NGINX_ROOT"/sites-enabled/image-service.conf
# create a welcome file
cat > "$WEBROOT"/index.html << EOF
<!DOCTYPE html>
<html>
    <head>
        <title>Image Service::Home</title>
        <style>
          body {background-color: lightblue;}
        </style>
    </head>
    <body>
        <h1>Hello, to Image Service!</h1>
    </body>
</html>
EOF

# Check configs
nginx -t || { echo "ngix configs are messed up"; exit 1; }

# cleanup
# rm -rf /usr/local/etc/nginx/sites-{enabled,available}
# sudo rm -rf /Library/Logs/nginx/
# sudo rm -rf /Library/WebServer/nginx
# cp /usr/local/etc/nginx/nginx.conf.default /usr/local/etc/nginx/nginx.conf
