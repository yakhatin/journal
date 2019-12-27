import React, { useState, useEffect } from 'react';
import { DataGrid, TextBox } from 'devextreme-react';
import { updateGroupData, getGroudData } from './helper';

export default (props) => {
    const [groupId, setGroupId] = useState(null);
    const [groupName, setGroupName] = useState(null);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (props.visible) {
            setGroupId(props.selectedGroupData ? props.selectedGroupData.id : `group_${new Date().valueOf()}`);
            if (props.selectedGroupData) {
                setGroupName(props.selectedGroupData.name);
                setDataSource(getGroudData(props.selectedGroupData.id));
            }
        } else {
            setGroupId(null);
            setGroupName(null);
            setDataSource([]);
        }
    }, [props.visible]);

    const onNameInput = ({ event }) => {
        if (event.target) {
            setGroupName(event.target.value);
        };
    };

    /**
     * Обработчик события создания новой записи
     * @param {*} e - данные из DxDataGrid
     */
    const onRowInserted = (e) => {
        updateGroupData(e.data, groupId, groupName, 'insert')
    };

    /**
     * Обработчик события удаления записи
     * @param {*} e - данные из DxDataGrid
     */
    const onRowRemoved = (e) => {
        updateGroupData(e.data, groupId, groupName, 'delete');
    };

    /**
     * Обработчик события изменения записи
     * @param {*} e - данные из DxDataGrid
     */
    const onRowUpdated = (e) => {
        updateGroupData(e.data, groupId, groupName, 'update');
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
                text: groupName
            });
        }
    };

    return (
        <React.Fragment>
            <div className="dx-field">
                <div className="dx-field-label">Наименование группы</div>
                <div className="dx-field-value">
                    <TextBox
                        value={groupName}
                        showClearButton={true}
                        onInput={onNameInput} />
                </div>
            </div>
            <DataGrid
                onToolbarPreparing={onToolbarPreparing}
                columns={[{ dataField: 'name', caption: 'ФИО' }]}
                dataSource={dataSource}
                editing={{
                    mode: 'batch',
                    useIcons: true,
                    allowAdding: true,
                    allowUpdating: true,
                    allowDeleting: true
                }}
                onRowInserted={onRowInserted}
                onRowRemoved={onRowRemoved}
                onRowUpdated={onRowUpdated}
            />
        </React.Fragment>
    )
}