import React, { useState } from 'react';
import Menu from './components/Menu';
import Header from './components/Header';
import Grid from './components/Grid';
import Groups from './components/Groups';
import './App.css';

function App() {
  const [opened, setOpened] = useState(false);
  const [headerRendered, setHeaderRendered] = useState(false);
  const [groupsDialogVisible, setGroupsDialogVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const setOpenedCallBack = () => {
    setOpened(opened => !opened);
  };

  const onGroupsListClick = () => {
    setGroupsDialogVisible(true);
  }

  return (
    <React.Fragment>
      <Header
        setOpenedCallBack={setOpenedCallBack}
        setHeaderRendered={setHeaderRendered}
        onGroupsListClick={onGroupsListClick} />
      <Menu
        opened={opened}
        setSelectedSubject={setSelectedSubject}
        selectedSubject={selectedSubject}
        setOpenedCallBack={setOpenedCallBack}>
        <div className="d-flex flex-grow-1 flex-column">
          {headerRendered && selectedSubject &&
            <Grid selectedSubject={selectedSubject} groupsDialogVisible={groupsDialogVisible} />
          }
          {!selectedSubject &&
            <div className="d-flex flex-grow-1 justify-content-center align-items-center">
              <h2>Выберите предмет в "Меню"</h2>
            </div>
          }
        </div>
      </Menu>
      <Groups visible={groupsDialogVisible} setGroupsDialogVisible={setGroupsDialogVisible} />
    </React.Fragment>
  );
}

export default App;
