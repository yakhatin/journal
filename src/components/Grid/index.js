import React, { useRef } from 'react';
import { DataGrid } from 'devextreme-react';
import { getHeaderHeight, getCurrentDate, getColumns, updateColumns } from '../../helpers';
import './styles.css';

export default (props) => {
    let gridRef = useRef(null);

    const addNewColumnWithCurrDate = () => {
        const currDate = getCurrentDate();
        const columns = getColumns();
        const dataField = currDate.replace(/\./g, '');

        if (columns.findIndex(el => el.dataField === dataField) < 0) {
            columns.push({ dataField: dataField, caption: currDate, alignment: 'center', width: 120, dataType: 'boolean' });
            updateColumns(columns);
            props.getGridData();
        }
    };

    const onToolbarItemClick = e => {
        if (e.itemData) {
            switch (e.itemData.id) {
                case 1: {
                    addNewColumnWithCurrDate();
                    break;
                }
                case 2: {
                    gridRef.instance.addRow();
                    break;
                }
            }
        }
    };

    const onToolbarPreparing = e => {
        if (e.toolbarOptions && e.toolbarOptions.items) {
            const toolbarItems = e.toolbarOptions.items;
            toolbarItems.unshift({
                location: 'after',
                widget: 'dxDropDownButton',
                options: {
                    icon: 'add',
                    text: 'Добавить',
                    displayExpr: 'name',
                    keyExpr: 'id',
                    onItemClick: onToolbarItemClick,
                    items: [
                        {
                            id: 1,
                            name: 'Дату'
                        },
                        {
                            id: 2,
                            name: 'Студента'
                        }
                    ]
                }
            });
            toolbarItems.unshift({
                location: 'before',
                text: `${props.title || 'Информатика - Лекция'}`
            });
            toolbarItems.find(el => el.name === 'addRowButton').visible = false;
        }
    };

    const headerHeight = getHeaderHeight();

    return (
        <DataGrid
            ref={ref => gridRef = ref}
            height={`calc(100vh - ${headerHeight}px)`}
            width={'calc(100vw - 20px)'}
            className={'grid-container'}
            columns={props.columns}
            dataSource={props.dataSource}
            searchPanel={{ visible: true }}
            onToolbarPreparing={onToolbarPreparing}
            scrolling={{ mode: 'virtual', showScrollbar: 'always' }}
            allowColumnResizing={true}
            columnAutoWidth={true}
            editing={{
                mode: 'batch',
                allowAdding: true,
                allowDeleting: true,
                allowUpdating: true,
                useIcons: true
            }}
        />
    )
};