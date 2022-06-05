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
