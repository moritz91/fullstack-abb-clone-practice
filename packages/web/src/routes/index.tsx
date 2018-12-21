import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthRoute } from "@abb/controller";

import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";
import { ForgotPasswordConnector } from "../modules/forgotPassword/ForgotPasswordConnector";
import { ChangePasswordConnector } from "../modules/changePassword/ChangePasswordConnector";
import { TextPage } from "../modules/TextPage";
import { CreateListingConnector } from "../modules/listing/create/CreateListingConnector";
import { FindListingsConnector } from "../modules/listing/find/FindListingsConnector";
import { Logout } from "../modules/logout";
import { TestSub } from "../modules/TestSub";
import { ViewListingConnector } from "../modules/listing/view/ViewListingConnector";
import { MessageConnector } from "../modules/listing/messages/MessageConnector";
import { EditListingConnector } from "../modules/listing/edit/EditListingConnector";
import { DeleteListingConnector } from "../modules/listing/delete/DeleteListingConnector";
import { Header } from "../modules/shared/Header";

import { Layout, Breadcrumb } from "antd";

const { Content, Footer } = Layout;

export const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact={true} path="/register" component={RegisterConnector} />
      <Route exact={true} path="/login" component={LoginConnector} />
      <Route
        path="/"
        component={() => (
          <React.Fragment>
            <Layout style={{ minHeight: "100vh" }}>
              <Header />
              <Layout>
                <Content style={{ margin: "0 16px" }}>
                  <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>User</Breadcrumb.Item>
                    <Breadcrumb.Item>Bill</Breadcrumb.Item>
                  </Breadcrumb>
                  <div
                    style={{ padding: 24, background: "#fff", minHeight: 360 }}
                  >
                    <div>
                      <Route exact={true} path="/logout" component={Logout} />
                      <Route
                        exact={true}
                        path="/test-sub"
                        component={TestSub}
                      />
                      <Route
                        exact={true}
                        path="/listing/:listingId"
                        component={ViewListingConnector}
                      />
                      <AuthRoute
                        exact={true}
                        path="/listing/:listingId/edit"
                        component={EditListingConnector}
                      />
                      <Route
                        exact={true}
                        path="/listing/:listingId/delete"
                        component={DeleteListingConnector}
                      />
                      <Route
                        exact={true}
                        path="/listing/:listingId/chat"
                        component={MessageConnector}
                      />
                      <Route
                        exact={true}
                        path="/forgot-password"
                        component={ForgotPasswordConnector}
                      />
                      <Route
                        exact={true}
                        path="/change-password/:key"
                        component={ChangePasswordConnector}
                      />
                      <Route path="/m" component={TextPage} />
                      <Route
                        path="/listings"
                        component={FindListingsConnector}
                      />
                      <AuthRoute
                        path="/create-listing"
                        component={CreateListingConnector}
                      />
                    </div>
                  </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>© 2018</Footer>
              </Layout>
            </Layout>
          </React.Fragment>
        )}
      />
    </Switch>
  </BrowserRouter>
);
