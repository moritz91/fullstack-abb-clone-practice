import * as React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Text } from "react-native-elements";

const MeQuery = gql`
  {
    me {
      id
      email
    }
  }
`;

export class Me extends React.PureComponent {
  render() {
    return (
      <Query query={MeQuery}>
        {({ data }) => {
          return <Text>{JSON.stringify(data)}</Text>;
        }}
      </Query>
    );
  }
}
