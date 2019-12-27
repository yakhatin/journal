import React, { useState } from 'react';
import { DataGrid } from 'devextreme-react';
import Dialog from '../Popup';
import Editing from './editing';
import { getGroups } from './helper';

export default (props) => {
    const [addGroupDialogVisible, setAddGroupDialogVisible] = useState(false);

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
                    onClick: setAddGroupDialogVisible.bind(this, true)
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
                    dataSource={getGroups()}
                    onToolbarPreparing={onToolbarPreparing}
                />
                <Dialog
                    visible={addGroupDialogVisible}
                    onHiding={setAddGroupDialogVisible.bind(this, false)}
                    title="Новая группа"
                    width={800}
                    height={750}
                >
                    <Editing />
                </Dialog>
            </React.Fragment>
        </Dialog>
    );
};