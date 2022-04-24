/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVeg = /* GraphQL */ `
  query GetVeg($id: ID!, $updatedAt: String!) {
    getVeg(id: $id, updatedAt: $updatedAt) {
      id
      name
      subtitle
      info
      image
      fact
      updatedAt
      createdAt
    }
  }
`;
export const listVegs = /* GraphQL */ `
  query ListVegs(
    $id: ID
    $updatedAt: ModelStringKeyConditionInput
    $filter: ModelVegFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listVegs(
      id: $id
      updatedAt: $updatedAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        subtitle
        info
        image
        fact
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
