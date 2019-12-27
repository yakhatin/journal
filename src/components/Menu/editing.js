import React, { useState } from 'react';
import { DataGrid, TextBox, DropDownBox, TreeView, Button } from 'devextreme-react';
import { getGroups } from '../Groups/helper';

export default (props) => {
    const [subjectName, setSubjectName] = useState(null);
    const [gridBoxValue, setGridBoxValue] = useState([]);
    const [typesValue, setTypesViewValue] = useState([]);
    const dataSource = getGroups();
    const typesDataSource = [
        { type: 'lectures', text: 'Лекции' },
        { type: 'laboratory', text: 'Лабораторные' },
        { type: 'practice', text: 'Практика' }
    ];

    const onSelectionChanged = ({ selectedRowKeys }) => {
        setGridBoxValue(selectedRowKeys);
    };

    const onTypesSelectionChanged = ({ selectedRowKeys }) => {
        setTypesViewValue(selectedRowKeys);
    };

    const onGroupsValueChanged = () => {
        setGridBoxValue([]);
    };

    const onTypesValueChanged = () => {
        setTypesViewValue([]);
    };

    const dataGridRender = () => {
        return (
            <DataGrid
                dataSource={dataSource}
                columns={[{ caption: 'Наименование группы', dataField: 'name' }]}
                hoverStateEnabled={true}
                selectedRowKeys={gridBoxValue}
                selection={{ mode: 'multiple' }}
                onSelectionChanged={onSelectionChanged} />
        );
    };

    const typesGridRender = () => {
        return (
            <DataGrid
                dataSource={typesDataSource}
                columns={[{ caption: 'Наименование', dataField: 'text' }]}
                hoverStateEnabled={true}
                selectedRowKeys={typesValue}
                selection={{ mode: 'multiple' }}
                onSelectionChanged={onTypesSelectionChanged} />
        );
    };

    const onSaveClick = () => {
        console.log(subjectName, gridBoxValue, typesValue);
    };

    const onSubjectInput = ({ event }) => {
        if (event.target) {
            setSubjectName(event.target.value);
        }
    };

    return (
        <React.Fragment>
            <div className="d-flex flex-grow-1 flex-column h-100">
                <div className="d-flex flex-grow-1 flex-column">
                    <div className="dx-field">
                        <div className="dx-field-label">Наименование предмета</div>
                        <div className="dx-field-value">
                            <TextBox
                                value={subjectName}
                                showClearButton={true}
                                onInput={onSubjectInput} />
                        </div>
                    </div>
                    <div className="dx-field">
                        <div className="dx-field-label">Применить к группам</div>
                        <div className="dx-field-value">
                            <DropDownBox
                                value={gridBoxValue.length > 0 ? gridBoxValue.map(el => el.id) : gridBoxValue}
                                valueExpr="id"
                                deferRendering={false}
                                displayExpr="name"
                                placeholder="Выберите..."
                                showClearButton={true}
                                dataSource={dataSource}
                                contentRender={dataGridRender}
                                onValueChanged={onGroupsValueChanged}
                            />
                        </div>
                    </div>
                    <div className="dx-field">
                        <div className="dx-field-label">Тип занятий</div>
                        <div className="dx-field-value">
                            <DropDownBox
                                value={typesValue.length > 0 ? typesValue.map(el => el.type) : typesValue}
                                valueExpr="type"
                                deferRendering={false}
                                displayExpr="text"
                                placeholder="Выберите..."
                                showClearButton={true}
                                dataSource={typesDataSource}
                                contentRender={typesGridRender}
                                onValueChanged={onTypesValueChanged}
                            />
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
                        onClick={props.toogleDialog} />
                </div>
            </div>
        </React.Fragment>
    );
};