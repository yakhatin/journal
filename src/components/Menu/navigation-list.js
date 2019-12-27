import React from 'react';
import { TreeView } from 'devextreme-react';
import './styles.css';

export default () => {
    return (
        <div className="list h-100" style={{ width: '200px' }}>
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
                elementAttr={{ class: 'panel-list dx-theme-accent-as-background-color ph-10' }} />
        </div>
    );
};