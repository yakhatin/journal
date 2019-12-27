import React, { useState } from 'react';
import Menu from './components/Menu';
import Header from './components/Header';
import Grid from './components/Grid';
import Groups from './components/Groups';
import './App.css';
import { getDataSource, getColumns } from './helpers';

function App() {
  const [opened, setOpened] = useState(false);
  const [headerRendered, setHeaderRendered] = useState(false);
  const [columns, setColumns] = useState(undefined);
  const [dataSource, setDataSource] = useState(undefined);
  const [groupsDialogVisible, setGroupsDialogVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const getGridData = () => {
    const columns = getColumns();
    const data = getDataSource();
    setColumns(columns);
    setDataSource(data);
  }

  useState(() => {
    getGridData();
  }, []);

  const setOpenedCallBack = () => {
    setOpened(opened => !opened);
  };

  const onGroupsListClick = () => {
    setGroupsDialogVisible(true);
  }
  console.log(selectedSubject);
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
          {headerRendered && dataSource && columns && selectedSubject &&
            <Grid
              selectedSubject={selectedSubject}
              dataSource={dataSource}
              columns={columns}
              getGridData={getGridData} />
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
