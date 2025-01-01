import { useHistory } from 'react-router-dom';

export const useNavigation = () => {
    const history = useHistory();

    const navigateTo = (path) => {
        history.push(path);
    };

    const navigateBack = () => {
        history.goBack();
    };

    return { navigateTo, navigateBack };
};
