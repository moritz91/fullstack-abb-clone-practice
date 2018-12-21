import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { DeleteListing } from "@abb/controller";

export class DeleteListingConnector extends React.PureComponent<
  RouteComponentProps<{
    listingId: string;
  }>
> {
  render() {
    const {
      match: {
        params: { listingId }
      }
    } = this.props;
    return (
      <DeleteListing>
        {({ deleteListing }) => (
          <button
            // tslint:disable-next-line
            onClick={async () => {
              await deleteListing({
                variables: {
                  id: listingId
                }
              });
            }}
          >
            delete listing
          </button>
        )}
      </DeleteListing>
    );
  }
}
