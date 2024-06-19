const parseValue = (key: string) =>
  key
    .split(":")
    .filter((e, i) => i !== 0)
    .join(":")

export default parseValue
