#!/bin/bash

sed -i 's/127.0.0.1/0.0.0.0/g' ./app/web/vue/UIconfig.js
sed -i 's/localhost/'${IP}'/g' ./app/web/vue/UIconfig.js
sed -i 's/3000/'${PORT}'/g' ./app/web/vue/UIconfig.js
exec "$@"
