import React, { useRef } from 'react';
import { DataGrid } from 'devextreme-react';
import { getDataSource, getHeaderHeight, getCurrentDate, getColumns, updateColumns, updateDataSource } from './helpers';
import './styles.css';

export default (props) => {
    const dataSource = getDataSource();

    /**
     * Ссылка на свойства компонента DxDataGrid
     */
    let gridRef = useRef(null);

    /**
     * Добавление текущей даты в журнал
     */
    const addNewColumnWithCurrDate = () => {
        const currDate = getCurrentDate();
        const columns = getColumns();
        const dataField = currDate.replace(/\./g, '');

        if (columns.findIndex(el => el.dataField === dataField) < 0) {
            columns.push({ dataField: dataField, caption: currDate, alignment: 'center', width: 100, dataType: 'boolean' });
            updateColumns(columns);
            props.getGridData();
        }
    };

    /**
     * Обработчик события создания новой записи
     * @param {*} e - данные из DxDataGrid
     */
    const onRowInserted = (e) => {
        updateDataSource(e.data, 'insert');
    };

    /**
     * Обработчик события удаления записи
     * @param {*} e - данные из DxDataGrid
     */
    const onRowRemoved = (e) => {
        updateDataSource(e.data, 'delete');
    };

    /**
     * Обработчик события изменения записи
     * @param {*} e - данные из DxDataGrid
     */
    const onRowUpdated = (e) => {
        updateDataSource(e.data);
    };

    /**
     * Обработчик события нажатия на кнопку в тулбаре
     * @param {*} e - данные из DxDataGrid
     */
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

    /**
     * Обработчик события инициализации тулбара
     * @param {*} e - данные из DxDataGrid
     */
    const onToolbarPreparing = e => {
        if (e.toolbarOptions && e.toolbarOptions.items) {
            const { selectedSubject } = props;
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
                text: `${selectedSubject.data.subjectName} - ${selectedSubject.data.typeText} (${selectedSubject.data.groupName})`
            });
            toolbarItems.find(el => el.name === 'addRowButton').visible = false;
        }
    };

    /**
     * Вычисление высоты верхнего меню 
     */
    const headerHeight = getHeaderHeight();

    return (
        <DataGrid
            ref={ref => gridRef = ref}
            height={`calc(100vh - ${headerHeight}px)`}
            width={'calc(100vw - 20px)'}
            className={'grid-container'}
            columns={props.columns}
            dataSource={dataSource}
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
            onRowInserted={onRowInserted}
            onRowUpdated={onRowUpdated}
            onRowRemoved={onRowRemoved}
            hoverStateEnabled={true}
            export={{
                enabled: true,
                fileName: new Date().valueOf()
            }}
        />
    )
};