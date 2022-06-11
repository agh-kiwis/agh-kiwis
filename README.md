# AghKiwis

## First run

- Install postgres
- Create database and add user

```bash
cp env-example .env
yarn
yarn nx serve
```

## Needed endpoints

### New task:

(This can be not accurate)

- createCategory(name, color)
- findCategory(prefix)
- addConstTask
  - categoryName
  - taskName
  - startTime
  - Duration
  - ChillTime
  - Repeat (Just repeat object)
  - Notifications Object
  - shouldAutoResolve (boolean)
- addFloatTask
  - The same as in addConstTask and
  - ChunksInfo

## Types in postgres (typeorm)

[column-types-for-postgres](https://orkhan.gitbook.io/typeorm/docs/entities#column-types-for-postgres)

## To generate graphql schema (for frontend)

```bash
nx run data-access:generate
```
