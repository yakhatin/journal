import { useState, useEffect } from "react";
import { post } from '../../meta/meta';

export const useSettingsData = (
    readyToLoad = false,
    requiredData = {
        groups: true,
        subjects: true,
        subjectTypes: true,
        scoreTypes: false
    }
) => {
    const [groups, setGroups] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [subjectTypes, setSubjectTypes] = useState([]);
    const [scoreTypes, setScoreTypes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            if (requiredData.groups) {
                const groupsData = await post('groups');
                setGroups(groupsData);
            }
            if (requiredData.subjects) {
                const subjectsData = await post('subjects');
                setSubjects(subjectsData);
            }
            if (requiredData.subjectTypes) {
                const subjectTypesData = await post('subject_types');
                setSubjectTypes(subjectTypesData);
            }
            if (requiredData.scoreTypes) {
                const scoreTypesData = await post('score_types');
                setScoreTypes(scoreTypesData);
            }
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
        subjectTypes,
        scoreTypes
    };
};