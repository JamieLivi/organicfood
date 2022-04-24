/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateVeggieInput = {
  id?: string | null,
  name: string,
  dateAdded?: string | null,
  subtitle?: string | null,
  info?: string | null,
  image?: string | null,
  fact?: string | null,
};

export type ModelVeggieConditionInput = {
  name?: ModelStringInput | null,
  dateAdded?: ModelStringInput | null,
  subtitle?: ModelStringInput | null,
  info?: ModelStringInput | null,
  image?: ModelStringInput | null,
  fact?: ModelStringInput | null,
  and?: Array< ModelVeggieConditionInput | null > | null,
  or?: Array< ModelVeggieConditionInput | null > | null,
  not?: ModelVeggieConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Veggie = {
  __typename: "Veggie",
  id?: string,
  name?: string,
  dateAdded?: string | null,
  subtitle?: string | null,
  info?: string | null,
  image?: string | null,
  fact?: string | null,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateVeggieInput = {
  id: string,
  name?: string | null,
  dateAdded?: string | null,
  subtitle?: string | null,
  info?: string | null,
  image?: string | null,
  fact?: string | null,
};

export type DeleteVeggieInput = {
  id: string,
};

export type ModelVeggieFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  dateAdded?: ModelStringInput | null,
  subtitle?: ModelStringInput | null,
  info?: ModelStringInput | null,
  image?: ModelStringInput | null,
  fact?: ModelStringInput | null,
  and?: Array< ModelVeggieFilterInput | null > | null,
  or?: Array< ModelVeggieFilterInput | null > | null,
  not?: ModelVeggieFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelVeggieConnection = {
  __typename: "ModelVeggieConnection",
  items?:  Array<Veggie | null >,
  nextToken?: string | null,
};

export type CreateVeggieMutationVariables = {
  input?: CreateVeggieInput,
  condition?: ModelVeggieConditionInput | null,
};

export type CreateVeggieMutation = {
  createVeggie?:  {
    __typename: "Veggie",
    id: string,
    name: string,
    dateAdded?: string | null,
    subtitle?: string | null,
    info?: string | null,
    image?: string | null,
    fact?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateVeggieMutationVariables = {
  input?: UpdateVeggieInput,
  condition?: ModelVeggieConditionInput | null,
};

export type UpdateVeggieMutation = {
  updateVeggie?:  {
    __typename: "Veggie",
    id: string,
    name: string,
    dateAdded?: string | null,
    subtitle?: string | null,
    info?: string | null,
    image?: string | null,
    fact?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteVeggieMutationVariables = {
  input?: DeleteVeggieInput,
  condition?: ModelVeggieConditionInput | null,
};

export type DeleteVeggieMutation = {
  deleteVeggie?:  {
    __typename: "Veggie",
    id: string,
    name: string,
    dateAdded?: string | null,
    subtitle?: string | null,
    info?: string | null,
    image?: string | null,
    fact?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetVeggieQueryVariables = {
  id?: string,
};

export type GetVeggieQuery = {
  getVeggie?:  {
    __typename: "Veggie",
    id: string,
    name: string,
    dateAdded?: string | null,
    subtitle?: string | null,
    info?: string | null,
    image?: string | null,
    fact?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListVeggiesQueryVariables = {
  filter?: ModelVeggieFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVeggiesQuery = {
  listVeggies?:  {
    __typename: "ModelVeggieConnection",
    items:  Array< {
      __typename: "Veggie",
      id: string,
      name: string,
      dateAdded?: string | null,
      subtitle?: string | null,
      info?: string | null,
      image?: string | null,
      fact?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateVeggieSubscription = {
  onCreateVeggie?:  {
    __typename: "Veggie",
    id: string,
    name: string,
    dateAdded?: string | null,
    subtitle?: string | null,
    info?: string | null,
    image?: string | null,
    fact?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateVeggieSubscription = {
  onUpdateVeggie?:  {
    __typename: "Veggie",
    id: string,
    name: string,
    dateAdded?: string | null,
    subtitle?: string | null,
    info?: string | null,
    image?: string | null,
    fact?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteVeggieSubscription = {
  onDeleteVeggie?:  {
    __typename: "Veggie",
    id: string,
    name: string,
    dateAdded?: string | null,
    subtitle?: string | null,
    info?: string | null,
    image?: string | null,
    fact?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
