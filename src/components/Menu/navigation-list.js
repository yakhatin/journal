import React from 'react';
import { TreeView, Button } from 'devextreme-react';
import { getMenuData } from './helper';
import './styles.css';

export default (props) => {
    const menuDataSource = getMenuData(props.selectedSubject ? props.selectedSubject.id : null);

    const onItemClick = (e) => {
        const { itemData, node } = e;
        if (itemData.link) {
            props.setSelectedSubject({
                id: itemData.id,
                data: itemData.data
            });
        }
    };

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
                dataSource={menuDataSource}
                hoverStateEnabled={true}
                elementAttr={{ class: 'panel-list' }}
                onItemClick={onItemClick} />
        </div>
    );
};