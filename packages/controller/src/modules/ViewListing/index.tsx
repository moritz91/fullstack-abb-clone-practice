// @ts-ignore
import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import {
  ViewListingQuery,
  ViewListingQuery_viewListing,
  ViewListingQueryVariables
} from "../../schemaTypes";

const viewListingQuery = gql`
  query ViewListingQuery($id: String!) {
    viewListing(id: $id) {
      id
      name
      description
      category
      pictureUrl
      longitude
      latitude
      price
      beds
      guests
      amenities
      owner {
        id
        email
      }
    }
  }
`;

export interface WithViewListing {
  listing: ViewListingQuery_viewListing | null;
  loading: boolean;
}

interface Props {
  listingId: string;
  children: (data: WithViewListing) => JSX.Element | null;
}

export class ViewListing extends React.PureComponent<Props> {
  render() {
    const { children, listingId } = this.props;
    return (
      <Query<ViewListingQuery, ViewListingQueryVariables>
        query={viewListingQuery}
        variables={{ id: listingId }}
      >
        {({ data, loading }) => {
          let listing: ViewListingQuery_viewListing | null = null;

          if (data && data.viewListing) {
            listing = data.viewListing;
          }

          return children({
            listing,
            loading
          });
        }}
      </Query>
    );
  }
}
