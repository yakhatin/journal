import React, { useState } from 'react';
import { DataGrid, TextBox } from 'devextreme-react';
import { createGroup } from './helper';

const newGroupId = new Date().valueOf();

export default (props) => {
    const [groupName, setGroupName] = useState(null);

    const onNameInput = ({ event }) => {
        if (event.target) {
            setGroupName(event.target.value)
        };
    };

    /**
     * Обработчик события создания новой записи
     * @param {*} e - данные из DxDataGrid
     */
    const onRowInserted = (e) => {
        createGroup(e.data, newGroupId, groupName)
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
                        defaultValue={null}
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