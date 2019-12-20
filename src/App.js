import React, { useState } from 'react';
import Menu from './components/Menu';
import Header from './components/Header';
import Grid from './components/Grid';
import './App.css';
import { getDataSource, getColumns } from './helpers';

function App() {
  const [opened, setOpened] = useState(false);
  const [headerRendered, setHeaderRendered] = useState(false);
  const [columns, setColumns] = useState(undefined);
  const [dataSource, setDataSource] = useState(undefined);
  const [refreshData, setRefreshData] = useState(false);

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

  return (
    <React.Fragment>
      <Header
        setOpenedCallBack={setOpenedCallBack}
        setHeaderRendered={setHeaderRendered} />
      {headerRendered && dataSource && columns &&
        <Menu opened={opened} >
          <Grid
            dataSource={dataSource}
            columns={columns}
            getGridData={getGridData} />
        </Menu>
      }
    </React.Fragment>
  );
}

export default App;
