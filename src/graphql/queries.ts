/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVeggie = /* GraphQL */ `
  query GetVeggie($id: ID!) {
    getVeggie(id: $id) {
      id
      name
      dateAdded
      subtitle
      info
      image
      fact
      createdAt
      updatedAt
    }
  }
`;
export const listVeggies = /* GraphQL */ `
  query ListVeggies(
    $filter: ModelVeggieFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVeggies(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        dateAdded
        subtitle
        info
        image
        fact
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
