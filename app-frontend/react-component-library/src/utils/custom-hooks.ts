import { useEffect, useRef } from 'react';

// custom hook to skip applying effect upon first render
// https://stackoverflow.com/questions/53179075/with-useeffect-how-can-i-skip-applying-an-effect-upon-the-initial-render
// eslint-disable-next-line import/prefer-default-export
export const useDidMount = (): boolean => {
    const isMountRef = useRef(true);
    useEffect(() => {
        isMountRef.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return isMountRef.current;
};
