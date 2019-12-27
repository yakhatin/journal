import React, { useState } from 'react';
import { DataGrid, TextBox, DropDownBox, TreeView } from 'devextreme-react';
import { getGroups } from '../Groups/helper';

export default (props) => {
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

    return (
        <React.Fragment>
            <div className="dx-field">
                <div className="dx-field-label">Наименование предмета</div>
                <div className="dx-field-value">
                    <TextBox
                        value={''}
                        showClearButton={true}
                        onInput={() => { }} />
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
                    />
                </div>
            </div>
        </React.Fragment>
    );
};