import React, { useState } from 'react';
import { useSettingsData } from './hooks';
import { LoadPanel, SelectBox, Button } from 'devextreme-react';

const JournalSettings = (props) => {
    const {
        visible,
        selectedGroupData,
        selectedSubjectData,
        setSelectedData
    } = props;

    const [selectedGroup, setSelectedGroup] = useState(selectedGroupData);
    const [selectedSubject, setSelectedSubject] = useState(selectedSubjectData);

    const { error, loading, groups, subjects } = useSettingsData(visible);

    const onApplyClick = () => {
        setSelectedData(selectedGroup, selectedSubject);
    }

    const onSelectionChanged = (type, { selectedItem }) => {
        switch (type) {
            case 'group': {
                setSelectedGroup(selectedItem);
                break;
            }
            case 'subject': {
                setSelectedSubject(selectedItem);
                break;
            }
            default: break;
        }
    }

    return (
        <React.Fragment>
            <div>
                {loading && <LoadPanel visible={loading} />}
                {!loading && !error &&
                    <div>
                        <div className="dx-field">
                            <div className="dx-field-label">Группа</div>
                            <div className="dx-field-value">
                                <SelectBox dataSource={groups}
                                    valueExpr="id"
                                    displayExpr="name"
                                    searchEnabled={true}
                                    searchMode="contains"
                                    searchExpr="name"
                                    searchTimeout={200}
                                    minSearchLength={0}
                                    showDataBeforeSearch={false}
                                    onSelectionChanged={onSelectionChanged.bind(this, 'group')} />
                            </div>
                        </div>
                        <div className="dx-field">
                            <div className="dx-field-label">Предмет</div>
                            <div className="dx-field-value">
                                <SelectBox dataSource={subjects}
                                    valueExpr="id"
                                    displayExpr="title"
                                    searchEnabled={true}
                                    searchMode="contains"
                                    searchExpr="title"
                                    searchTimeout={200}
                                    minSearchLength={0}
                                    showDataBeforeSearch={false}
                                    onSelectionChanged={onSelectionChanged.bind(this, 'subject')} />
                            </div>
                        </div>
                        <Button
                            width={120}
                            text="Применить"
                            type="normal"
                            stylingMode="contained"
                            onClick={onApplyClick}
                        />
                    </div>
                }
            </div>
        </React.Fragment>
    )
};

export default JournalSettings;