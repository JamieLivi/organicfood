/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVeg = /* GraphQL */ `
  mutation CreateVeg(
    $input: CreateVegInput!
    $condition: ModelVegConditionInput
  ) {
    createVeg(input: $input, condition: $condition) {
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
export const updateVeg = /* GraphQL */ `
  mutation UpdateVeg(
    $input: UpdateVegInput!
    $condition: ModelVegConditionInput
  ) {
    updateVeg(input: $input, condition: $condition) {
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
export const deleteVeg = /* GraphQL */ `
  mutation DeleteVeg(
    $input: DeleteVegInput!
    $condition: ModelVegConditionInput
  ) {
    deleteVeg(input: $input, condition: $condition) {
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
