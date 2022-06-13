import { useAppSelector } from './redux-hooks';

export function useAuth() {
    const {email} = useAppSelector(state => state.user);

    return {
        isAuth: !!email,
        email,
    };
}