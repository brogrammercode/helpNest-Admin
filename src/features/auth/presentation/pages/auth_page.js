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
        <div className="flex justify-center items-center h-screen">
            <div className="content flex-col items-center justify-center text-center">
                <h1 className="title text-xl">helpNest</h1>

                <div className="animated-text text-2xl font-semibold mt-1 mb-5">
                    <h2>{onboarding[headingIndex][0]}</h2>
                </div>

                <div className="carousel">
                    {/* Implement carousel logic here */}
                </div>

                <p className='mb-20'>{onboarding[headingIndex][1]}</p>

                <div className="flex justify-center mt-5"> 
                    <button 
                        className="text-center px-7 py-3 bg-blue-500 text-white rounded"
                        onClick={handleSignIn}
                        disabled={status === 'loading'}>
                        {status === 'loading' ? "Loading ..." : "Continue with Google"}
                    </button>
                </div>

                {status === 'failure' && error && (
                    <div className="error-message text-center mt-3">
                        {error.message}
                    </div>
                )}
            </div>
        </div>

    );
};


export default AuthPage;
