import React, { useState } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import Groups from './components/Groups';
import './App.css';

function App() {
  const [headerRendered, setHeaderRendered] = useState(false);
  const [groupsDialogVisible, setGroupsDialogVisible] = useState(false);

  const onGroupsListClick = () => {
    setGroupsDialogVisible(true);
  }

  return (
    <React.Fragment>
      <Header
        setHeaderRendered={setHeaderRendered}
        onGroupsListClick={onGroupsListClick} />
      <div className="d-flex flex-grow-1 flex-column">
        {headerRendered &&
          <Grid groupsDialogVisible={groupsDialogVisible} />
        }
      </div>
      <Groups visible={groupsDialogVisible} setGroupsDialogVisible={setGroupsDialogVisible} />
    </React.Fragment>
  );
}

export default App;
