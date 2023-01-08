# AghKiwis

We need to:

FRONT

1. Use data loader
2. Cleanup backend

BACKEND 3. Cleanup filters to be persistent through the session (store them in redux states) 4. Cleanup caching to not refetch the queries but to update the cache according to the performed operation

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

```

# Libraries

## To create new library run:

```
nx g @nrwl/workspace:lib <library-name>
```

# More info in [docs](docs/Docs.md)

# Tests

To run single test:

```
nx test --testFile apps/server/tests/tasks/addTask.e2e-spec.ts
```
