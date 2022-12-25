import React, { Fragment, ReactElement } from "react";

import MainNavigation from "./main-navigation";

interface LayoutProps {
  children: ReactElement;
  currentUser?: any;
}

function Layout({ currentUser, children }: LayoutProps) {
  return (
    <Fragment>
      <MainNavigation currentUser={currentUser} />
      <main>{children}</main>
    </Fragment>
  );
}

export default Layout;
