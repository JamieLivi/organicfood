/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVeggie = /* GraphQL */ `
  mutation CreateVeggie(
    $input: CreateVeggieInput!
    $condition: ModelVeggieConditionInput
  ) {
    createVeggie(input: $input, condition: $condition) {
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
export const updateVeggie = /* GraphQL */ `
  mutation UpdateVeggie(
    $input: UpdateVeggieInput!
    $condition: ModelVeggieConditionInput
  ) {
    updateVeggie(input: $input, condition: $condition) {
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
export const deleteVeggie = /* GraphQL */ `
  mutation DeleteVeggie(
    $input: DeleteVeggieInput!
    $condition: ModelVeggieConditionInput
  ) {
    deleteVeggie(input: $input, condition: $condition) {
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
