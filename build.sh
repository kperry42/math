#!/bin/sh

cat src/*.js src/functions/*.js src/calculus/*.js src/matrices/*.js src/package/exports.js > build/math.js

mkdir -p build/{functions,calculus,matrices}

cd src
for file in *.js functions/*.js calculus/*.js matrices/*.js
do
    cat $file package/$file > ../build/$file
done

