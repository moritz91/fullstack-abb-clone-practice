import * as React from "react";
import { ForgotPasswordController } from "@abb/controller";
import { ForgotPasswordView } from "./ui/ForgotPasswordView";
import { RouteComponentProps } from "react-router-dom";

export class ForgotPasswordConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  onFinish = () => {
    this.props.history.push("/m/reset-password", {
      message: "check your email to reset your password"
    });
  };

  render() {
    return (
      <ForgotPasswordController>
        {({ submit }) => (
          <ForgotPasswordView submit={submit} onFinish={this.onFinish} />
        )}
      </ForgotPasswordController>
    );
  }
}
