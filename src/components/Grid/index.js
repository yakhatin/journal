import React, { useState, useEffect } from 'react';
import { DataGrid } from 'devextreme-react';
import produce from "immer";
import Dialog from '../Popup';
import Exercises from './exercises';
import { getHeaderHeight, getCurrentDate } from './helpers';
import getDataSource from '../../meta/grid/dataSource';
import './styles.css';
import { post } from '../../meta/meta';
import JournalSettings from './setting';

export default (props) => {
    const { groupsDialogVisible } = props;
    const [columns, setColumns] = useState([]);
    const [selectedScoreType, setSelectedScoreType] = useState(null);
    const [exercisesDialogVisible, setExercisesDialogVisible] = useState(false);
    const [settingsDialogVisible, setSettingsDialogVisible] = useState(false);

    const [selectedSubject, setSelectedSubject] = useState({
        id: 1,
        name: 'Математика',
        typeName: 'Лекция'
    });
    const [selectedGroup, setSelectedGroup] = useState({
        id: 2,
        name: 'КТ-41-13'
    });

    const subjectId = selectedSubject.id;
    const groupId = selectedGroup.id;

    const params = {
        groupId,
        subjectId,
        scoreType: selectedScoreType
    };

    /**
     * Загрузка колонок
     */
    useEffect(() => {
        post('journal/columns', params)
            .then(result => {
                setColumns(result);
            });
    }, []);

    /**
     * Добавление текущей даты в журнал
     */
    const addNewColumnWithCurrDate = ({ item }) => {
        const currDate = getCurrentDate();
        if (columns.findIndex(el => el.dataField === currDate) < 0) {
            const nextColumns = produce(columns, draft => {
                draft.push({ dataField: currDate, caption: currDate, alignment: 'center', width: 100, dataType: item.value });
            })
            setColumns(nextColumns);
            setSelectedScoreType(item.id);
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
                    onClick: setExercisesDialogVisible.bind(this, true)
                }
            });
            toolbarItems.unshift({
                location: 'after',
                widget: 'dxDropDownButton',
                options: {
                    keyExpr: "id",
                    displayExpr: "name",
                    text: 'Добавить дату',
                    icon: 'add',
                    onSelectionChanged: addNewColumnWithCurrDate,
                    items: [{
                        id: 1,
                        name: 'Посещаемость',
                        value: 'boolean'
                    }, {
                        id: 2,
                        name: 'Баллы',
                        value: 'number'
                    }]
                }
            });
            toolbarItems.unshift({
                location: 'before',
                template: `<div class="journal-grid-title">${selectedSubject.name} - ${selectedSubject.typeName} (${selectedGroup.name})</div>`
            });
            toolbarItems.unshift({
                location: 'before',
                widget: 'dxButton',
                options: {
                    icon: 'preferences',
                    onClick: setSettingsDialogVisible.bind(this, true)
                }
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
                height={`calc(100vh - ${headerHeight}px)`}
                width={'calc(100vw - 20px)'}
                className={'grid-container'}
                columns={columns}
                dataSource={getDataSource('journal', 'id', params)}
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
                hoverStateEnabled={true}
                export={{
                    enabled: true,
                    fileName: new Date().valueOf()
                }}
            />
            <Dialog
                title="Задания"
                visible={exercisesDialogVisible}
                onHiding={setExercisesDialogVisible.bind(this, false)}
                width={800}
                height={750}>
                <Exercises
                    groupsDialogVisible={groupsDialogVisible}
                    selectedSubject={selectedSubject}
                    selectedGroup={selectedGroup} />
            </Dialog>
            <Dialog
                title="Настройки"
                visible={settingsDialogVisible}
                onHiding={setSettingsDialogVisible.bind(this, false)}
                width={800}
                height={750}>
                <JournalSettings />
            </Dialog>
        </React.Fragment>
    )
};