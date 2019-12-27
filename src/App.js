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

  return (
    <React.Fragment>
      <Header
        setOpenedCallBack={setOpenedCallBack}
        setHeaderRendered={setHeaderRendered}
        onGroupsListClick={onGroupsListClick} />
      {headerRendered && dataSource && columns &&
        <Menu opened={opened} >
          <Grid
            dataSource={dataSource}
            columns={columns}
            getGridData={getGridData} />
        </Menu>
      }
      <Groups visible={groupsDialogVisible} setGroupsDialogVisible={setGroupsDialogVisible} />
    </React.Fragment>
  );
}

export default App;
