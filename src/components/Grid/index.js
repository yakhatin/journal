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

    const dataSource = [{ name: 'Ivan' }, { name: 'Petr' }];

    const headerHeight = document.querySelector('.header-container') ? document.querySelector('.header-container').offsetHeight + 20 : 0;

    return (
        <DataGrid
            height={`calc(100vh - ${headerHeight}px)`}
            className={'grid-container'}
            columns={[{ dataField: 'name', caption: 'ФИО' }, { dataField: 'name', caption: 'ФИО' }]}
            dataSource={dataSource}
            searchPanel={{ visible: true }}
            onToolbarPreparing={onToolbarPreparing}
            scrolling={{ mode: 'virtual', showScrollbar: 'always' }}
        />
    )
};