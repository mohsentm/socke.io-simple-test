FROM node:12

ENV INSTALL_DIR /usr/src/app

# Create app directory
RUN mkdir -p $INSTALL_DIR
WORKDIR $INSTALL_DIR

# Bundle app source
COPY ./ $INSTALL_DIR

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production