#!/bin/bash

sed -i 's/127.0.0.1/0.0.0.0/g' ./web/vue/UIconfig.js
sed -i 's/localhost/gekko-crypto.192.168.64.2.nip.io/g' ./web/vue/UIconfig.js
sed -i 's/3000/'${PORT}'/g' ./web/vue/UIconfig.js
exec "$@"
