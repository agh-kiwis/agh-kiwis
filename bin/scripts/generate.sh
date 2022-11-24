#!/bin/bash
cd $(dirname $0)
cd ../../

get-graphql-schema http://localhost:3333/graphql > libs/data-access/src/lib/graphql/schema.graphql
gqlg --schemaFilePath libs/data-access/src/lib/graphql/schema.graphql --destDirPath libs/data-access/src/lib/graphql --depthLimit 5

cd libs/data-access/src/lib/graphql/queries/
for file in *.gql; do 
    mv -- "$file" "${file%.gql}.graphql"
done
rm index.js
npx prettier --write .

cd ../mutations
for file in *.gql; do 
    mv -- "$file" "${file%.gql}.graphql"
done
rm index.js
npx prettier --write .

cd ../
rm index.js

cd ../generated
nx run data-access:generate
npx prettier --write .
