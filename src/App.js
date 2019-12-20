import React, { useState } from 'react';
import Menu from './components/Menu';
import Header from './components/Header';
import Grid from './components/Grid';
import './App.css';

function App() {
  const [opened, setOpened] = useState(false);

  const setOpenedCallBack = () => {
    setOpened(opened => !opened);
  };

  return (
    <React.Fragment>
      <Header setOpenedCallBack={setOpenedCallBack} />
      <Menu opened={opened}>
        <Grid />
      </Menu>
    </React.Fragment>
  );
}

export default App;
