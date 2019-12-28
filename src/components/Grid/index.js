import React, { useRef, useState, useEffect } from 'react';
import { DataGrid } from 'devextreme-react';
import Dialog from '../Popup';
import { getDataSource, getHeaderHeight, getCurrentDate, getColumns, updateColumns, updateDataSource } from './helpers';
import './styles.css';

export default (props) => {
    const { selectedSubject } = props;
    const dataSourceId = selectedSubject.id;
    const { group } = selectedSubject.data;
    const { dataSource: storedDataSource, columns } = getDataSource(dataSourceId, group);

    const [dataSource, setDataSource] = useState(storedDataSource);
    const [exercisesDialogVisible, setExercisesDialogVisible] = useState(false);

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

    const onDateAdd = e => {
        addNewColumnWithCurrDate();
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
                    onClick: setExercisesDialogVisible.bind(this, true)
                }
            });
            toolbarItems.unshift({
                location: 'after',
                widget: 'dxButton',
                options: {
                    text: 'Добавить дату',
                    icon: 'add',
                    onClick: onDateAdd
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
        <React.Fragment>
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
            <Dialog
                visible={exercisesDialogVisible}
                onHiding={setExercisesDialogVisible.bind(this, false)}
                width={800}
                height={750}>
                <div>
                    321
                </div>
            </Dialog>
        </React.Fragment>
    )
};