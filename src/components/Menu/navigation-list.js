import React from 'react';
import { TreeView, Button } from 'devextreme-react';
import { getMenuData } from './helper';
import './styles.css';

export default (props) => {
    const menuDataSource = getMenuData();

    return (
        <div className="list h-100 dx-theme-accent-as-background-color ph-10" style={{ width: '200px' }}>
            <Button
                width={'100%'}
                text="Добавить"
                type="normal"
                stylingMode="outlined"
                className="mt-10"
                icon="add"
                onClick={props.showSubjectDialog}
            />
            <TreeView
                dataSource={[
                    {
                        id: 1,
                        text: 'Математика',
                        expanded: false,
                        items: [
                            {
                                id: '1_1',
                                text: 'КТМ-01-18',
                                items: [
                                    { id: '1_1_1', text: 'Лекция' },
                                    { id: '1_1_2', text: 'Лабораторная' }
                                ]
                            }]
                    },
                    {
                        id: 2,
                        text: 'Информатика',
                        expanded: false,
                        items: [
                            {
                                id: '2_1',
                                text: 'КТМ-01-18',
                                items: [
                                    { id: '2_1_1', text: 'Лекция' },
                                    { id: '2_1_2', text: 'Лабораторная' }
                                ]
                            }]
                    }
                ]}
                hoverStateEnabled={false}
                activeStateEnabled={false}
                focusStateEnabled={false}
                elementAttr={{ class: 'panel-list' }} />
        </div>
    );
};