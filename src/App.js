import React, { useState } from 'react';
import Menu from './components/Menu';
import Header from './components/Header';
import Grid from './components/Grid';
import './App.css';

function App() {
  const [opened, setOpened] = useState(false);
  const [headerRendered, setHeaderRendered] = useState(false);

  const setOpenedCallBack = () => {
    setOpened(opened => !opened);
  };

  return (
    <React.Fragment>
      <Header
        setOpenedCallBack={setOpenedCallBack}
        setHeaderRendered={setHeaderRendered} />
      {headerRendered &&
        <Menu opened={opened} >
          <Grid />
        </Menu>
      }
    </React.Fragment>
  );
}

export default App;
