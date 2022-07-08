#!/bin/sh

ROOT_DIR=/app

LIFF_ID="${LIFF_ID:-abcdefg}"

echo "LIFF_ID=" $LIFF_ID 

# Replace env vars in JavaScript files
echo "Replacing env constants in JS"
for file in $ROOT_DIR/static/js/*.js $ROOT_DIR/index.html;
do
  echo "Processing $file ...";

  sed -i 's|LIFF_ID_PLACEHOLDER|'${LIFF_ID}'|g' $file

done

echo "Starting Nginx"
exec nginx -g 'daemon off;'

