import React, { useState } from 'react';
import { DataGrid, Button, SelectBox, LoadPanel } from 'devextreme-react';
import Dialog from '../Popup';
import getDataSource from '../../meta/grid/dataSource';
import { useSettingsData } from './hooks';

const AddExerciseForm = (props) => {
    const { visible, setVisible, onAddClick } = props;

    const [type, setType] = useState(null);
    const [exerciseName, setExerciseName] = useState(null);
    const { loading, scoreTypes } = useSettingsData(visible, { scoreTypes: true });

    const onAddClicked = () => {
        onAddClick(type, exerciseName);
    };

    const onExerciseChanged = ({ selectedRowsData }) => {
        const [selectedRow] = selectedRowsData;
        if (selectedRow) {
            setExerciseName(selectedRow.name);
        }
    };

    const onTypeChanged = ({ selectedItem }) => {
        if (selectedItem) {
            setType(selectedItem);
        }
    }

    return (
        <div>
            <LoadPanel visible={visible && loading} />
            <Dialog
                title="Новое задание"
                visible={visible}
                onHiding={setVisible.bind(this, false)}
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
                                    onSelectionChanged={onTypeChanged} />
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
                                mode: 'row',
                                useIcons: true
                            }}
                            onSelectionChanged={onExerciseChanged}
                        />
                    </div>
                    <div className="mt-10">
                        <Button
                            text="Добавить"
                            icon="add"
                            onClick={onAddClicked} />
                        <Button
                            className="ml-10"
                            text="Отмена"
                            icon="close"
                            onClick={setVisible.bind(this, false)} />
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default AddExerciseForm;