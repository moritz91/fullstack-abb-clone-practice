import * as React from "react";
import { DeleteMessage } from "@abb/controller";

interface Props {
  listingId: string;
  text: string;
  idx: string;
}

export class DeleteButton extends React.PureComponent<Props> {
  render() {
    const { listingId, text, idx } = this.props;
    return (
      <DeleteMessage>
        {({ deleteMessage }) => (
          <button
            key={idx}
            // tslint:disable-next-line
            onSubmit={async () => {
              await deleteMessage({
                variables: {
                  message: {
                    text,
                    listingId
                  }
                }
              });
            }}
          >
            x
          </button>
        )}
      </DeleteMessage>
    );
  }
}
