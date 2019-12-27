import React, { useState } from 'react';
import { DataGrid } from 'devextreme-react';
import Dialog from '../Popup';
import Editing from './editing';
import { getGroups } from './helper';

export default (props) => {
    const [addGroupDialogVisible, setAddGroupDialogVisible] = useState(false);
    const [selectedGroupData, setSelectedGroupData] = useState(null);

    const onAddClick = () => {
        setSelectedGroupData(null);
        setAddGroupDialogVisible(true);
    }

    const onRowDblClick = ({ data }) => {
        setSelectedGroupData(data);
        setAddGroupDialogVisible(true);
    };

    /**
     * Обработчик события инициализации тулбара
     * @param {*} e - данные из DxDataGrid
     */
    const onToolbarPreparing = e => {
        if (e.toolbarOptions && e.toolbarOptions.items) {
            const toolbarItems = e.toolbarOptions.items;
            toolbarItems.push({
                location: 'before',
                widget: 'dxButton',
                options: {
                    icon: 'add',
                    text: 'Добавить группу',
                    onClick: onAddClick
                }
            });
        }
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
                    dataSource={getGroups()}
                    onToolbarPreparing={onToolbarPreparing}
                    onRowDblClick={onRowDblClick}
                    hoverStateEnabled={true}
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