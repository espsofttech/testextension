// import * as React from 'react';
import * as ReactDOM from 'react-dom';
import React, { useEffect, useState } from 'react';
import Test from './Components/test'
import Sample from './Components/sample'

import {
  goBack,
  goTo,
  popToTop,
  Link,
  Router,
  getCurrent,
  getComponentStack,
} from 'react-chrome-extension-router';

const Three = ({ message }) => (
  <div onClick={() => popToTop()}>
    <h1>{message}</h1>
    <p>Click me to pop to the top</p>
  </div>
);

const Two = ({ message }) => (
  <div>
    This is component Two. I was passed a message:
    <p>{message}</p>
    <button onClick={() => goBack()}>
      Click me to go back to component One
    </button>
    <button onClick={() => goTo(Test, { message })}>
 test page
    </button>

    <button onClick={() => goTo(Sample, { message })}>
sample page    </button>
  </div>
);

const One = () => {
  return (
    <Link component={Two} props={{ message: 'I came from component one!' }}>
      This is component One. Click me to route to component Two
    </Link>
  );
};

const App = () => {
  useEffect(() => {
      const { component, props } = getCurrent();
      console.log(
        component
          ? `There is a component on the stack! ${component} with ${props}`
          : `The current stack is empty so Router's direct children will be rendered`
      );
      const components = getComponentStack();
      console.log(`The stack has ${components.length} components on the stack`);
  });
  return (
    <Router>
      <One />
    </Router>
  );
};

export default App;
