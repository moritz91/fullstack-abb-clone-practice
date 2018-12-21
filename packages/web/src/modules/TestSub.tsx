import * as React from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const SUB = gql`
  subscription {
    newMessage(listingId: "495c76ba-3c4a-49e7-8392-8d0a80775b15") {
      text
      listingId
      user {
        id
        email
      }
    }
  }
`;

export class TestSub extends React.PureComponent {
  render() {
    return (
      <Subscription subscription={SUB}>
        {data => {
          console.log(data);
          return null;
        }}
      </Subscription>
    );
  }
}
