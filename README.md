# AghKiwis

## First run

- Install postgres
- Create database and add user

```bash
cp env-example .env
yarn
yarn nx serve
```

## Types in postgres (typeorm)

[column-types-for-postgres](https://orkhan.gitbook.io/typeorm/docs/entities#column-types-for-postgres)

## To generate graphql schema (for frontend)

```bash
nx run data-access:generate
```

## To be able to use Postgres interval, you need to add this to psql console (or console in datagrip)

```
SET intervalstyle = 'iso_8601';
```

# Generators

## To generate schema, run:

[get-graphql-schema](https://github.com/prisma-labs/get-graphql-schema)

```
npm install -g get-graphql-schema

get-graphql-schema http://localhost:3333/graphql > schema.graphql

```

## To generate queries / mutations and so on, run:

```
npm install gql-generator -g

gqlg --schemaFilePath libs/data-access/src/lib/graphql/schema.graphql --destDirPath libs/data-access/src/lib/graphql --depthLimit 5
```

## Then:

You need to rename .gql files to .graphql files.

## And finally generate generated.tsx, run:

```
nx run data-access:generate
```

# Libraries

## To create new library run:

```
nx g @nrwl/workspace:lib <library-name>
```

# More info in [docs](docs/Docs.md)
