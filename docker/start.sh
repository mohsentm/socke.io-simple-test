#!/bin/bash

cd ${INSTALL_DIR:=/usr/src/app}

# Check node_modules
if [[ ! -d node_modules ]]; then
  npm install
fi

npm run start:dev