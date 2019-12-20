import React from 'react';
import { DataGrid } from 'devextreme-react';
import './styles.css';

export default (props) => {
    const onToolbarPreparing = e => {
        if (e.toolbarOptions && e.toolbarOptions.items) {
            const toolbarItems = e.toolbarOptions.items;
            toolbarItems.unshift({
                location: 'before',
                text: `${props.title || 'Title'}`
            })
        }
    }

    return (
        <DataGrid
            className={'grid-container'}
            columns={[{ dataField: 'name', caption: 'ФИО' }, { dataField: 'name', caption: 'ФИО' }]}
            dataSource={[{ name: 'Ivan' }, { name: 'Petr' }]}
            searchPanel={{ visible: true }}
            onToolbarPreparing={onToolbarPreparing}
        />
    )
};