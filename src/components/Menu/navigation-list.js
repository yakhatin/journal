import React from 'react';
import { List } from 'devextreme-react';
import './styles.css';

export default () => {
    return (
        <div className="list h-100" style={{ width: '200px' }}>
            <List
                dataSource={[
                    { id: 1, text: 'Products', icon: 'product' },
                    { id: 2, text: 'Sales', icon: 'money' },
                    { id: 3, text: 'Customers', icon: 'group' },
                    { id: 4, text: 'Employees', icon: 'card' },
                    { id: 5, text: 'Reports', icon: 'chart' }
                ]}
                hoverStateEnabled={false}
                activeStateEnabled={false}
                focusStateEnabled={false}
                elementAttr={{ class: 'panel-list dx-theme-accent-as-background-color' }} />
        </div>
    );
};