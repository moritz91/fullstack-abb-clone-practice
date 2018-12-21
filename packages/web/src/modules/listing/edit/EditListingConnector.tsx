import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  ViewListing,
  withUpdateListing,
  WithUpdateListing
} from "@abb/controller";
import {
  ListingForm,
  defaultListingFormValues,
  ListingFormValues
} from "../shared/ListingForm";
import { FormikActions } from "formik";

export class C extends React.PureComponent<
  RouteComponentProps<{
    listingId: string;
  }> &
    WithUpdateListing
> {
  submit = async (
    data: ListingFormValues,
    { setSubmitting }: FormikActions<ListingFormValues>,
    listingId: string
  ) => {
    await this.props.updateListing({ listingId, ...data });
    setSubmitting(false);
    this.props.history.push("/listings");
  };

  render() {
    const {
      match: {
        params: { listingId }
      }
    } = this.props;
    return (
      <ViewListing listingId={listingId}>
        {data => {
          console.log(data);
          if (!data.listing) {
            return <div>...loading</div>;
          }

          const { id: _, owner: __, ...listing } = data.listing;

          return (
            <ListingForm
              submit={this.submit}
              initialValues={{
                ...defaultListingFormValues,
                ...listing,
                listingId
              }}
            />
          );
        }}
      </ViewListing>
    );
  }
}

export const EditListingConnector = withUpdateListing(C);
