import React, { useRef, useState, useEffect } from 'react';
import { DataGrid } from 'devextreme-react';
import produce from "immer";
import Dialog from '../Popup';
import Exercises from './exercises';
import { getHeaderHeight, getCurrentDate, getColumns, updateColumns, updateDataSource } from './helpers';
import getDataSource from '../../meta/grid/dataSource';
import './styles.css';
import { post } from '../../meta/meta';

export default (props) => {
    const { selectedSubject } = props;
    const dataSourceId = selectedSubject.id;
    const { group } = selectedSubject.data;

    const [columns, setColumns] = useState([]);
    const [exercisesDialogVisible, setExercisesDialogVisible] = useState(false);

    useEffect(() => {
        post('journal/columns')
            .then(result => {
                setColumns(result);
            });
    }, []);

    useEffect(() => {
        if (!props.groupsDialogVisible) {
            // refreshDataSource();
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

        if (columns.findIndex(el => el.dataField === currDate) < 0) {
            const nextColumns = produce(columns, draft => {
                draft.push({ dataField: currDate, caption: currDate, alignment: 'center', width: 100, dataType: 'boolean' });
            })
            setColumns(nextColumns);
        }
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

    const params = {
        subjectId: 1
    };

    return (
        <React.Fragment>
            <DataGrid
                ref={ref => gridRef = ref}
                height={`calc(100vh - ${headerHeight}px)`}
                width={'calc(100vw - 20px)'}
                className={'grid-container'}
                columns={columns}
                dataSource={getDataSource('journal', 'student_id', params)}
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
            {/* <Dialog
                title="Задания"
                visible={exercisesDialogVisible}
                onHiding={setExercisesDialogVisible.bind(this, false)}
                width={800}
                height={750}>
                <Exercises {...props} />
            </Dialog> */}
        </React.Fragment>
    )
};