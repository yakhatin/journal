import React, { useState, useEffect } from 'react';
import { DataGrid, Button, SelectBox, LoadPanel } from 'devextreme-react';
import Dialog from '../Popup';
import getDataSource from '../../meta/grid/dataSource';
import { post } from '../../meta/meta';
import './styles.css';
import { useSettingsData } from './hooks';

export default (props) => {
    const {
        selectedSubject,
        selectedGroup,
        selectedSubjectType,
        journalParams,
        visible
    } = props;

    const [newExerciseDialogVisible, setNewExerciseDialogVisible] = useState(false);
    const [exerciseName, setExerciseName] = useState(null);
    const [columns, setColumns] = useState([]);

    const { loading, scoreTypes } = useSettingsData(newExerciseDialogVisible, { scoreTypes: true });

    const params = {
        ...journalParams,
        isExercise: true
    };

    const getColumns = () => {
        if (visible) {
            post('journal/columns', params)
                .then(result => {
                    setColumns(result);
                });
        }
    }

    /**
     * Загрузка колонок
     */
    useEffect(() => {
        getColumns();
    }, [
        visible,
        selectedGroup,
        selectedSubject,
        selectedSubjectType
    ]);

    useEffect(() => {
        if (!visible) {
            setColumns([]);
        }
    }, [visible]);

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
                text: `${selectedSubject.title} - ${selectedSubjectType.name} - Задания (${selectedGroup.name})`
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

    return (
        <React.Fragment>
            <LoadPanel visible={newExerciseDialogVisible && loading} />
            <DataGrid
                columns={columns}
                dataSource={(visible && columns.length > 0) ? getDataSource('journal', null, params) : []}
                onToolbarPreparing={onToolbarPreparing}
                allowColumnResizing={true}
                columnAutoWidth={true}
                editing={{
                    mode: 'batch',
                    allowUpdating: true,
                    useIcons: true
                }}
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
                width={700}
                height={700}>
                <div className="d-flex flex-grow-1 flex-column">
                    <div className="d-flex flex-grow-1 flex-column">
                        <div className="dx-field">
                            <div className="dx-field-label">Тип задания</div>
                            <div className="dx-field-value">
                                <SelectBox
                                    dataSource={scoreTypes}
                                    valueExpr="id"
                                    displayExpr="description"
                                    searchEnabled={true}
                                    searchMode="contains"
                                    searchExpr="description"
                                    searchTimeout={200}
                                    minSearchLength={0}
                                    showDataBeforeSearch={false}
                                    onSelectionChanged={e => console.log(e)} />
                            </div>
                        </div>
                        <DataGrid
                            columns={[{ dataField: 'name', caption: 'Наименование задания' }]}
                            dataSource={visible ? getDataSource('exercises') : []}
                            height={520}
                            selection={{
                                mode: 'single',
                                showCheckBoxesMode: true
                            }}
                            editing={{
                                allowAdding: true,
                                allowUpdating: true,
                                allowDeleting: true,
                                mode: 'batch',
                                useIcons: true
                            }}
                        />
                    </div>
                    <div className="mt-10">
                        <Button
                            text="Добавить"
                            icon="add"
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