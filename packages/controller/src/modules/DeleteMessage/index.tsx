// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Mutation, MutationFn } from "react-apollo";
import {
  DeleteMessageMutation,
  DeleteMessageMutationVariables
} from "../../schemaTypes";

export const deleteMessageMutation = gql`
  mutation DeleteMessageMutation($message: MessageInput!) {
    deleteMessage(message: $message)
  }
`;

export interface WithDeleteMessage {
  deleteMessage: MutationFn<
    DeleteMessageMutation,
    DeleteMessageMutationVariables
  >;
}

interface Props {
  children: (data: WithDeleteMessage) => JSX.Element | null;
}

export class DeleteMessage extends React.PureComponent<Props> {
  render() {
    const { children } = this.props;
    return (
      <Mutation<DeleteMessageMutation, DeleteMessageMutationVariables>
        mutation={deleteMessageMutation}
      >
        {mutate => {
          return children({
            deleteMessage: mutate
          });
        }}
      </Mutation>
    );
  }
}
