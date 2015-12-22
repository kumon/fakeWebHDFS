#!/bin/bash

npm install \
&& ./node_modules/.bin/tsd install \
&& ./node_modules/.bin/tsc --module commonjs app.ts \
&& node app
