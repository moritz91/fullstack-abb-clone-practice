// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import {
  createListingMutation,
  createListingMutationVariables
} from "../../schemaTypes";

const createListingMutation = gql`
  mutation createListingMutation(
    $picture: Upload
    $name: String!
    $category: String!
    $description: String!
    $price: Int!
    $beds: Int!
    $guests: Int!
    $latitude: Float!
    $longitude: Float!
    $amenities: [String!]!
  ) {
    createListing(
      input: {
        picture: $picture
        name: $name
        category: $category
        description: $description
        price: $price
        beds: $beds
        guests: $guests
        latitude: $latitude
        longitude: $longitude
        amenities: $amenities
      }
    )
  }
`;

export interface WithCreateListing {
  createListing: (variables: createListingMutationVariables) => void;
}

export const withCreateListing = graphql<
  any,
  createListingMutation,
  createListingMutationVariables,
  WithCreateListing
>(createListingMutation, {
  props: ({ mutate }) => ({
    createListing: async variables => {
      if (!mutate) {
        return;
      }

      const response = await mutate({
        variables
      });

      console.log(response);
    }
  })
});
