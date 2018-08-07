import React from 'react';
import {
    Route,
    Redirect,
  } from "react-router-dom";
import { Path } from './';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('userData') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: Path.root,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );

  