### Main points:

- We use only query builder from now
- When implementing pagination on scroll we will just request another chunk when needed if it's present, if not we will display end of data to user. (Just end line or smth like that).

# Queries

```gql
query tasks {
	tasks(taskFilterOptions, paginateOptions, orderOptions) {

    chunks(orderOptions) {
      # This needs its own resolver
      # Also we need to consider batching the requests to that resolver (maybe later on)
      id
      # ...
    }

    chunkInfo{
      id
      # This can be without own resolver just fetched with a task
      # ...
    }

  }

}
```

If any of the filtered fields is null -> we don't consider filtering

```gql
taskFilterOptions {
  ids # If null then all tasks are returned
  isDone
  isFloat
  category
  priority
  repeat # Only Repeated or not tasks (this can be null/true/false)
}
```

There needs to be a clear filters button

---

This should be similar interface for pagination appended to the end result.

Later on this can be reimplemented to coursor-based pagination.

```gql
paginateOptions {
  offset
  limit # Limits and orderings should be the same for different offsets, front needs to control that.
}
```

This is also shared between all the resources

```gql
orderOptions {
  field # defaults to id
  desc # boolean to determine if we're sorting ascending, defaults to desc
}
```

For calendar view we can fetch chunks for given user for a month and then re-fetch if needed

```gql
query chunks {
  chunks(chunkFilterOptions: { chunkStartAfter: "2022-12-24" }) {
    id
    task {
      name
      chunkInfo {
        id
        start
        estimation
      }
    }
  }
}
```

---

Adding tasks can be split into two methods, but backend should share the most of the logic.

---

Get task details can be split into another request, for example for float tasks we won't need to fetch chunks then.

---

# Mutations

Each task mutation needs replanning algorithm to re-run with the new data. So we need to standartize the entry point for each update

```gql
mutation updateTask() {
    updateTask(updateCommonFields, ) {

    }
}
```

updateTaskInput is just a subset of Task
if chunks are present in update subset, we're updating all fields that are present with new info for given id (id should be present!)

---

me query can also fetch only needed fields for now

---
