import { useState, useEffect } from "react";
import { post } from '../../meta/meta';

export const useSettingsData = (readyToLoad = false) => {
    const [groups, setGroups] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [subjectTypes, setSubjectTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            const groupsData = await post('groups');
            const subjectsData = await post('subjects');
            const subjectTypesData = await post('subject_types');
            setGroups(groupsData);
            setSubjects(subjectsData);
            setSubjectTypes(subjectTypesData);
            setLoading(false);
        } catch (err) {
            setError(err.toString());
            setLoading(false);
        }
    };

    useEffect(() => {
        if (readyToLoad === true) {
            loadData();
        }
    }, [readyToLoad]);

    return {
        error,
        loading,
        groups,
        subjects,
        subjectTypes
    };
};