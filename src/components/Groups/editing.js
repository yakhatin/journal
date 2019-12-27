import React, { useState, useEffect } from 'react';
import { DataGrid, TextBox } from 'devextreme-react';
import { createGroup } from './helper';

export default (props) => {
    const [groupId, setGroupId] = useState(null);
    const [groupName, setGroupName] = useState(null);

    useEffect(() => {
        if (props.visible) {
            setGroupId(new Date().valueOf());
        } else {
            setGroupId(null);
            setGroupName(null);
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
        createGroup(e.data, groupId, groupName)
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
                dataSource={[]}
                editing={{
                    mode: 'batch',
                    useIcons: true,
                    allowAdding: true,
                    allowUpdating: true,
                    allowDeleting: true
                }}
                onRowInserted={onRowInserted}
            />
        </React.Fragment>
    )
}