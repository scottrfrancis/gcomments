#!/usr/bin/env bash

apt-get update
# apt-get upgrade -y

# dev tools
apt-get install -y git htop

apt-get install -y nginx

# node and ecosystem
## easy way
# curl -sL https://deb.nodesource.com/setup | bash -
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
apt-get install -y nodejs

# ln -s /usr/bin/nodejs /usr/bin/node
apt-get install -y build-essential libssl-dev

apt-get install -y libkrb5-dev

npm install -g npm
# npm modules
npm install -g bower
npm install -g grunt-cli
npm install -g yo
# npm install -g generator-meanjs@0.1.12
npm install -g generator-meanjs
npm install -g esprima

npm install -g express-generator

npm install -g jsonwebtoken

npm install -g passport passport-local
npm install -g kerberos@0.0

npm install -g express-jwt

npm install -g serve-favicon
npm install -g angular-ui-router

npm install -g connect-multiparty
npm install -g ng-file-upload
npm install -g mv
