import React, { useState, useEffect } from 'react';
import { DataGrid } from 'devextreme-react';
import produce from "immer";
import getDataSource from '../../meta/grid/dataSource';
import { post } from '../../meta/meta';
import './styles.css';
import AddExerciseForm from './addExerciseForm';

export default (props) => {
    const {
        selectedSubject,
        selectedGroup,
        selectedSubjectType,
        journalParams,
        visible
    } = props;

    const [newExerciseDialogVisible, setNewExerciseDialogVisible] = useState(false);
    const [selectedScoreType, setSelectedScoreType] = useState(null);
    const [columns, setColumns] = useState([]);

    const params = {
        ...journalParams,
        isExercise: true,
        scoreType: selectedScoreType
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
    const addNewColumnWithExercise = (scoreData, dataField) => {
        if (columns.findIndex(el => el.dataField === dataField) < 0) {
            const nextColumns = produce(columns, draft => {
                draft.push({ dataField: dataField, caption: dataField, alignment: 'center', width: 100, dataType: scoreData.name });
            })
            setColumns(nextColumns);
            setSelectedScoreType(scoreData.id);
        }
    };

    const onAddClick = (scoreType, exerciseName) => {
        setNewExerciseDialogVisible(false);
        addNewColumnWithExercise(scoreType, exerciseName);
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

    return (
        <React.Fragment>
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
            <AddExerciseForm
                visible={newExerciseDialogVisible}
                setVisible={setNewExerciseDialogVisible}
                onAddClick={onAddClick} />
        </React.Fragment>
    )
};