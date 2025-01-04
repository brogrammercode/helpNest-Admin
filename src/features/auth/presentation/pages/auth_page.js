import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setError, setUser } from '../../presentation/redux/reducer';
import { StateError } from '../../../../core/error';
import AuthRemoteDS from '../../data/auth_remote_ds';
import { RouteNames } from '../../../../core/routes';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
    const [headingIndex, setHeadingIndex] = useState(0);
    const { status, error } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onboarding = [
        ['Find Services\nwith Ease', 'Browse and connect with trusted service providers tailored to your needs.'],
        ['Seamless\nCommunication', 'Chat directly with service providers to discuss and finalize your requirements.'],
        ['Quality\nYou Can Trust', 'Experience verified professionals delivering top-notch service, every time.'],
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setHeadingIndex(prevIndex => (prevIndex + 1) % onboarding.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleSignIn = async () => {
        try {
            dispatch(setLoading());
            const authRemoteDS = new AuthRemoteDS();
            const user = await authRemoteDS.signInWithGoogle();
            dispatch(setUser(user));
            navigate(RouteNames.HOME_PAGE);
        } catch (error) {
            const errorInstance = new StateError({
                message: error.message,
                consoleMessage: 'Google sign-in failed',
                code: error.code || 'UNKNOWN_ERROR',
            });
            dispatch(setError(errorInstance));
        }
    };

    return (
        <div className="onboarding-page">
            <div className="app-bar"></div>
            <div className="content">
                <h1 className="title">helpNest</h1>

                <div className="animated-text">
                    <h2>{onboarding[headingIndex][0]}</h2>
                </div>

                <div className="carousel">
                    {/* Implement carousel logic here */}
                </div>

                <p>{onboarding[headingIndex][1]}</p>

                <button
                    onClick={handleSignIn}
                    disabled={status === 'loading'}>
                    Continue with Google
                    {status === 'loading' && <span>Loading...</span>}
                </button>

                {status === 'failure' && error && (
                    <div className="error-message">
                        {error.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
