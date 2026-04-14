# Assignment-07 - GraphQL (Apollo/GraphQL Yoga) + Prisma + Neon

## Endpoint público GraphQL
`https://arquitectura-sistemasii.onrender.com/graphql`

## Esquema (Modelos y campos)
El esquema completo en SDL está adjunto aquí:
- [`schema.graphql`](./schema.graphql)

### Modelos

#### Author
- `id: ID!`
- `name: String!`
- `bio: String`
- `books: [Book!]!`

#### Book
- `id: ID!`
- `title: String!`
- `genre: String!`
- `publishedYear: Int`
- `authorId: ID!`
- `author: Author!`

## Ejemplos de uso

### Queries: 1. pedir solo campos necesarios, 2. pedir más campos
```graphql
query {
  authors {
    id
    name
    books { title }
  }
}


```graphql
query {
  books {
    id
    title
    genre
    publishedYear
    author {
      id
      name
      bio
    }
  }
}