# Dates handling

- In postgres we store `Duration` (or just Interval)
  This is for easy queries and inner comparisons.
- To client we send string in `ISO8601` format.
- In client we use `${library}` library to convert the string to js Date object and helpers from `${library}` to operate with dates.
- Client sends to server Interval scalar which is string under the hood but it is converted to `Duration` in the server immediately.
  To operate on dates on the server side, we need to convert `Duration` to string and then parse it with `${library}`.

##### `${library}` = moment
