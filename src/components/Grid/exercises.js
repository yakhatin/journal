import React, { useRef, useState, useEffect } from 'react';
import { DataGrid, TextBox, Button } from 'devextreme-react';
import Dialog from '../Popup';
import { getDataSource, getHeaderHeight, getCurrentDate, getColumns, updateColumns, updateDataSource } from './helpers';
import { createId } from '../Menu/helper';
import './styles.css';

export default (props) => {
    const { selectedSubject } = props;
    const dataSourceId = `exercises_${selectedSubject.id}`;
    const { group } = selectedSubject.data;

    const [dataSource, setDataSource] = useState({});
    const [newExerciseDialogVisible, setNewExerciseDialogVisible] = useState(false);
    const [exerciseName, setExerciseName] = useState(null);

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
    const addNewColumnWithExercise = () => {
        // const dataField = createId();
        // const { columns } = getDataSource(dataSourceId);

        // if (columns.findIndex(el => el.dataField === dataField) < 0) {
        //     columns.push({ dataField: dataField, caption: exerciseName, alignment: 'center', width: 250, dataType: 'boolean' });
        //     updateColumns(columns, dataSourceId);
        // }

        // refreshDataSource();
    };

    const refreshDataSource = () => {
        // const { dataSource: storedDataSource } = getDataSource(dataSourceId, group);
        // setDataSource(storedDataSource);
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
                    text: 'Добавить задание',
                    icon: 'add',
                    onClick: setNewExerciseDialogVisible.bind(this, true)
                }
            });
            toolbarItems.unshift({
                location: 'before',
                text: `${selectedSubject.data.subjectName} - Задания (${selectedSubject.data.groupName})`
            });
        }
    };

    const onExerciseNameChanged = ({ event }) => {
        if (event.target) {
            setExerciseName(event.target.value);
        }
    }

    const onSaveClick = () => {
        addNewColumnWithExercise();
        setNewExerciseDialogVisible(false);
    };

    /**
     * Вычисление высоты верхнего меню 
     */
    const headerHeight = getHeaderHeight();

    return (
        <React.Fragment>
            <DataGrid
                ref={ref => gridRef = ref}
                dataSource={dataSource}
                onToolbarPreparing={onToolbarPreparing}
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
                title="Новое задание"
                visible={newExerciseDialogVisible}
                onHiding={setNewExerciseDialogVisible.bind(this, false)}
                width={500}
                height={300}>
                <div className="d-flex flex-grow-1 flex-column h-100">
                    <div className="d-flex flex-grow-1 flex-column">
                        <div className="dx-field">
                            <div className="dx-field-label">Наименование предмета</div>
                            <div className="dx-field-value">
                                <TextBox
                                    value={exerciseName}
                                    showClearButton={true}
                                    onValueChanged={onExerciseNameChanged} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button
                            text="Сохранить"
                            icon="save"
                            onClick={onSaveClick} />
                        <Button
                            className="ml-10"
                            text="Отмена"
                            icon="close"
                            onClick={setNewExerciseDialogVisible.bind(this, false)} />
                    </div>
                </div>
            </Dialog>
        </React.Fragment>
    )
};