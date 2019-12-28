import React, { useRef, useState, useEffect } from 'react';
import { DataGrid } from 'devextreme-react';
import { getDataSource, getHeaderHeight, getCurrentDate, getColumns, updateColumns, updateDataSource } from './helpers';
import './styles.css';

export default (props) => {
    const { selectedSubject } = props;
    const dataSourceId = selectedSubject.id;
    const { group } = selectedSubject.data;
    const { dataSource: storedDataSource, columns } = getDataSource(dataSourceId, group);

    const [dataSource, setDataSource] = useState(storedDataSource);

    useEffect(() => {
        if (!props.groupsDialogVisible) {
            refreshDataSource();
        }
    }, [selectedSubject.id, props.groupsDialogVisible]);

    /**
     * Ссылка на свойства компонента DxDataGrid
     */
    let gridRef = useRef(null);

    /**
     * Добавление текущей даты в журнал
     */
    const addNewColumnWithCurrDate = () => {
        const currDate = getCurrentDate();
        const dataField = currDate.replace(/\./g, '');
        const { columns } = getDataSource(dataSourceId);

        if (columns.findIndex(el => el.dataField === dataField) < 0) {
            columns.push({ dataField: dataField, caption: currDate, alignment: 'center', width: 100, dataType: 'boolean' });
            updateColumns(columns, dataSourceId);
        }

        refreshDataSource();
    };

    const refreshDataSource = () => {
        const { dataSource: storedDataSource } = getDataSource(dataSourceId, group);
        setDataSource(storedDataSource);
    };

    /**
     * Обработчик события создания новой записи
     * @param {*} e - данные из DxDataGrid
     */
    const onRowInserted = (e) => {
        updateDataSource(e.data, dataSourceId, 'insert');
    };

    /**
     * Обработчик события удаления записи
     * @param {*} e - данные из DxDataGrid
     */
    const onRowRemoved = (e) => {
        updateDataSource(e.data, dataSourceId, 'delete');
    };

    /**
     * Обработчик события изменения записи
     * @param {*} e - данные из DxDataGrid
     */
    const onRowUpdated = (e) => {
        updateDataSource(e.data, dataSourceId);
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
                    console.log('NEW EXERCISE');
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
            const toolbarItems = e.toolbarOptions.items;
            toolbarItems.unshift({
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: 'Задания',
                    onClick: () => console.log(321)
                }
            });
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
                            name: 'Задание',
                            visible: selectedSubject.data.type === 'laboratory' || selectedSubject.data.type === 'practice'
                        }
                    ]
                }
            });
            toolbarItems.unshift({
                location: 'before',
                text: `${selectedSubject.data.subjectName} - ${selectedSubject.data.typeText} (${selectedSubject.data.groupName})`
            });
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
            columns={columns}
            dataSource={dataSource}
            searchPanel={{ visible: true }}
            onToolbarPreparing={onToolbarPreparing}
            scrolling={{ mode: 'virtual', showScrollbar: 'always' }}
            allowColumnResizing={true}
            columnAutoWidth={true}
            editing={{
                mode: 'batch',
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