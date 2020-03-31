import React, { useState, useEffect } from 'react';
import { DataGrid, TextBox } from 'devextreme-react';
import { updateGroupData } from './helper';
import getDataSource from '../../meta/grid/dataSource';

export default (props) => {
    const [groupId, setGroupId] = useState(null);
    const [groupName, setGroupName] = useState(null);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        if (props.visible) {
            setGroupId(props.selectedGroupData ? props.selectedGroupData.id : `group_${new Date().valueOf()}`);
            if (props.selectedGroupData) {
                setGroupName(props.selectedGroupData.name);
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

    const params = {
        'group_id': props.selectedGroupData ? props.selectedGroupData.id : null
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
                dataSource={props.visible ? getDataSource('students', 'id', params) : []}
                editing={{
                    mode: 'batch',
                    useIcons: true,
                    allowAdding: true,
                    allowUpdating: true,
                    allowDeleting: true
                }}
            />
        </React.Fragment>
    )
}