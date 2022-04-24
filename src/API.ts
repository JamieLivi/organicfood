/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateVegInput = {
  id?: string | null;
  name: string;
  subtitle?: string | null;
  info?: string | null;
  image?: string | null;
  fact?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
};

export type ModelVegConditionInput = {
  name?: ModelStringInput | null;
  subtitle?: ModelStringInput | null;
  info?: ModelStringInput | null;
  image?: ModelStringInput | null;
  fact?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  and?: Array<ModelVegConditionInput | null> | null;
  or?: Array<ModelVegConditionInput | null> | null;
  not?: ModelVegConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null',
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type Veg = {
  __typename: 'Veg';
  id: string;
  name?: string;
  subtitle?: string | null;
  info?: string | null;
  image?: string | null;
  fact?: string | null;
  updatedAt?: string;
  createdAt?: string | null;
};

export type UpdateVegInput = {
  id: string;
  name?: string | null;
  subtitle?: string | null;
  info?: string | null;
  image?: string | null;
  fact?: string | null;
  updatedAt: string;
  createdAt?: string | null;
};

export type DeleteVegInput = {
  id: string;
  updatedAt: string;
};

export type ModelStringKeyConditionInput = {
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelVegFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  subtitle?: ModelStringInput | null;
  info?: ModelStringInput | null;
  image?: ModelStringInput | null;
  fact?: ModelStringInput | null;
  updatedAt?: ModelStringInput | null;
  createdAt?: ModelStringInput | null;
  and?: Array<ModelVegFilterInput | null> | null;
  or?: Array<ModelVegFilterInput | null> | null;
  not?: ModelVegFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type ModelVegConnection = {
  __typename: 'ModelVegConnection';
  items?: Array<Veg | null>;
  nextToken?: string | null;
};

export type CreateVegMutationVariables = {
  input?: CreateVegInput;
  condition?: ModelVegConditionInput | null;
};

export type CreateVegMutation = {
  createVeg?: {
    __typename: 'Veg';
    id: string;
    name: string;
    subtitle?: string | null;
    info?: string | null;
    image?: string | null;
    fact?: string | null;
    updatedAt: string;
    createdAt?: string | null;
  } | null;
};

export type UpdateVegMutationVariables = {
  input?: UpdateVegInput;
  condition?: ModelVegConditionInput | null;
};

export type UpdateVegMutation = {
  updateVeg?: {
    __typename: 'Veg';
    id: string;
    name: string;
    subtitle?: string | null;
    info?: string | null;
    image?: string | null;
    fact?: string | null;
    updatedAt: string;
    createdAt?: string | null;
  } | null;
};

export type DeleteVegMutationVariables = {
  input?: DeleteVegInput;
  condition?: ModelVegConditionInput | null;
};

export type DeleteVegMutation = {
  deleteVeg?: {
    __typename: 'Veg';
    id: string;
    name: string;
    subtitle?: string | null;
    info?: string | null;
    image?: string | null;
    fact?: string | null;
    updatedAt: string;
    createdAt?: string | null;
  } | null;
};

export type GetVegQueryVariables = {
  id?: string;
  updatedAt?: string;
};

export type GetVegQuery = {
  getVeg?: {
    __typename: 'Veg';
    id: string;
    name: string;
    subtitle?: string | null;
    info?: string | null;
    image?: string | null;
    fact?: string | null;
    updatedAt: string;
    createdAt?: string | null;
  } | null;
};

export type ListVegsQueryVariables = {
  id?: string | null;
  updatedAt?: ModelStringKeyConditionInput | null;
  filter?: ModelVegFilterInput | null;
  limit?: number | null;
  nextToken?: string | null;
  sortDirection?: ModelSortDirection | null;
};

export type ListVegsQuery = {
  listVegs?: {
    __typename: 'ModelVegConnection';
    items: Array<{
      __typename: 'Veg';
      id: string;
      name: string;
      subtitle?: string | null;
      info?: string | null;
      image?: string | null;
      fact?: string | null;
      updatedAt: string;
      createdAt?: string | null;
    } | null>;
    nextToken?: string | null;
  } | null;
};

export type OnCreateVegSubscription = {
  onCreateVeg?: {
    __typename: 'Veg';
    id: string;
    name: string;
    subtitle?: string | null;
    info?: string | null;
    image?: string | null;
    fact?: string | null;
    updatedAt: string;
    createdAt?: string | null;
  } | null;
};

export type OnUpdateVegSubscription = {
  onUpdateVeg?: {
    __typename: 'Veg';
    id: string;
    name: string;
    subtitle?: string | null;
    info?: string | null;
    image?: string | null;
    fact?: string | null;
    updatedAt: string;
    createdAt?: string | null;
  } | null;
};

export type OnDeleteVegSubscription = {
  onDeleteVeg?: {
    __typename: 'Veg';
    id: string;
    name: string;
    subtitle?: string | null;
    info?: string | null;
    image?: string | null;
    fact?: string | null;
    updatedAt: string;
    createdAt?: string | null;
  } | null;
};
