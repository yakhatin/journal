import React, { useState } from 'react';
import { DataGrid } from 'devextreme-react';
import Dialog from '../Popup';
import Editing from './editing';
import getDataSource from '../../meta/grid/dataSource';

export default (props) => {
    const [addGroupDialogVisible, setAddGroupDialogVisible] = useState(false);
    const [selectedGroupData, setSelectedGroupData] = useState(null);

    const onRowDblClick = ({ data }) => {
        setSelectedGroupData(data);
        setAddGroupDialogVisible(true);
    };

    return (
        <Dialog
            visible={props.visible}
            onHiding={props.setGroupsDialogVisible.bind(this, false)}
            title="Список групп"
            width={800}
            height={750} >
            <React.Fragment>
                <DataGrid
                    columns={[{ caption: 'Наименование группы', dataField: 'name' }]}
                    dataSource={props.visible ? getDataSource('groups') : []}
                    onRowDblClick={onRowDblClick}
                    hoverStateEnabled={true}
                    editing={{
                        useIcons: true,
                        allowAdding: true,
                        allowDeleting: true,
                        allowUpdating: true
                    }}
                />
                <Dialog
                    visible={addGroupDialogVisible}
                    onHiding={setAddGroupDialogVisible.bind(this, false)}
                    title={selectedGroupData ? selectedGroupData.name : 'Новая группа'}
                    width={800}
                    height={750}
                >
                    <Editing
                        visible={addGroupDialogVisible}
                        selectedGroupData={selectedGroupData} />
                </Dialog>
            </React.Fragment>
        </Dialog>
    );
};