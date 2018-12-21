// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Mutation, MutationFn } from "react-apollo";
import {
  DeleteListingMutationVariables,
  DeleteListingMutation
} from "../../schemaTypes";

const deleteListingMutation = gql`
  mutation DeleteListingMutation($id: String!) {
    deleteListing(id: $id)
  }
`;

export interface WithDeleteListing {
  deleteListing: MutationFn<
    DeleteListingMutation,
    DeleteListingMutationVariables
  >;
}

interface Props {
  children: (data: WithDeleteListing) => JSX.Element | null;
}

export class DeleteListing extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <Mutation<DeleteListingMutation, DeleteListingMutationVariables>
        mutation={deleteListingMutation}
      >
        {mutate => {
          return children({
            deleteListing: mutate
          });
        }}
      </Mutation>
    );
  }
}
