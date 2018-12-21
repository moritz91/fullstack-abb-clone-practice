import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { ViewListing, ViewMessages } from "@abb/controller";
import { InputBar } from "../messages/InputBar";
import { Spin } from "antd";

export class ViewListingConnector extends React.PureComponent<
  RouteComponentProps<{
    listingId: string;
  }>
> {
  unsubscribe: () => void;

  render() {
    const {
      match: {
        params: { listingId }
      }
    } = this.props;
    return (
      <div>
        <ViewListing listingId={listingId}>
          {data => {
            console.log(data);
            if (!data.listing) {
              return <Spin />;
            }

            return (
              <div
                style={{
                  textAlign: "center",
                  borderRadius: 4,
                  marginBottom: 20,
                  padding: 30,
                  margin: 20
                }}
              >
                <h1>{data.listing.name}</h1>
                <img src={data.listing.pictureUrl} />
                <div>{data.listing.price} Euros</div>
                <div>{data.listing.description}</div>
                <div>{data.listing.category}</div>
                <div>{data.listing.guests} Guest/s</div>
                <div>{data.listing.beds} Bed/s</div>
                <div>
                  <Link to={`/listing/${data.listing.id}/chat`}>Chat</Link>
                </div>
                <div>
                  <Link to={`/listing/${data.listing.id}/edit`}>edit</Link>
                </div>
                <div>
                  <Link to={`/listing/${data.listing.id}/delete`}>delete</Link>
                </div>
                <div />
              </div>
            );
          }}
        </ViewListing>
        <ViewMessages listingId={listingId}>
          {({ loading, messages, subscribe }) => {
            if (loading) {
              return <Spin />;
            }

            if (!this.unsubscribe) {
              this.unsubscribe = subscribe() as any;
            }

            return (
              <div>
                {messages.map((m, i) => (
                  <div key={`${i}-lm`}>{m.text}</div>
                ))}
                <InputBar listingId={listingId} />
              </div>
            );
          }}
        </ViewMessages>
      </div>
    );
  }
}
