import * as React from "react";
import { LoginController } from "@abb/controller";
import { LoginView } from "./ui/LoginView";
import { RouteComponentProps } from "react-router";
// import { SecureStore } from "expo";
// import { SID_KEY } from "../shared/constants";

export class LoginConnector extends React.PureComponent<
  RouteComponentProps<{}>
> {
  // saveSessionId = (sid: string) => {
  //   SecureStore.setItemAsync(SID_KEY, sid);
  // };

  onFinish = () => {
    this.props.history.push("/Me");
  };

  render() {
    return (
      <LoginController>
        {({ submit }) => <LoginView onFinish={this.onFinish} submit={submit} />}
      </LoginController>
    );
  }
}
