# Query & Mutation examples

```
query Me {
  me {
    birthDate
    createdAt
    deletedAt
    email
    gender
    id
    name
    updatedAt
  }
}
```

```
mutation Register {
  register(registerDto: {
    email: "email@gmail.com",
    password: "password1234"
  }) {
    birthDate
    createdAt
    deletedAt
    email
    gender
    id
    name
    token
    updatedAt
  }
}
```

```
mutation Login {
  login(loginDto: {email: "email@gmail.com", password:"password1234"}) {
    token
    name
    id
    gender
    email
    deletedAt
    createdAt
    birthDate
    updatedAt
  }
}
```

```
mutation Mutation {
  logout
}
```

# Tasks

### Priority, Color & Category need to be inserted into the db

```
mutation {
  addConstTask(CreateConstTaskInput: {
    categoryId: 1,
    chillTime: "00:00:02",
    duration: "05:00:00",
    name: "Walk a dog",
    start: "2017-08-19 12:17:55 -0400",
    repeat:{
      repeatEvery: 1,
      repeatType:DAYS,
      startFrom: "2017-06-01"
    },
  }){
       category {
      color {
        hexCode
        id
      }
      id
      name
    }
    chillTime
    chunkInfo {
      id
      maxChunkDuration
      minChunkDuration
      minTimeBetweenChunks
    }
    deadline
    estimation
    id
    isDone
    isFloat
    name
    notifications {
      timeBefore
    }
    priority {
      id
      name
    }
    shouldAutoResolve
    taskBreakdowns {
      duration
      isDone
      repeat {
        repeatEvery
        repeatType
        startFrom
      }
      start
    }
  }
}
```
