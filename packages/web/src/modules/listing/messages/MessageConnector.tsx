import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ViewMessages } from "@abb/controller";
import { InputBar } from "./InputBar";

export class MessageConnector extends React.PureComponent<
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
      <ViewMessages listingId={listingId}>
        {({ loading, messages, subscribe }) => {
          if (loading) {
            return <div>...loading</div>;
          }

          if (!this.unsubscribe) {
            this.unsubscribe = subscribe() as any;
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
              {messages.map((m, i) => (
                <div key={`${i}-lm`}>{m.text}</div>
              ))}
              <InputBar listingId={listingId} />
            </div>
          );
        }}
      </ViewMessages>
    );
  }
}
