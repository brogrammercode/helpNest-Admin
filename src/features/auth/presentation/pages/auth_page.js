import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInWithGoogle } from '../redux/actions';

const AuthPage = () => {
    const onboarding = [
        ['Find Services\nwith Ease', 'Browse and connect with trusted service providers tailored to your needs.'],
        ['Seamless\nCommunication', 'Chat directly with service providers to discuss and finalize your requirements.'],
        ['Quality\nYou Can Trust', 'Experience verified professionals delivering top-notch service, every time.'],
    ];

    const [headingIndex, setHeadingIndex] = useState(0);
    const { status, error } = useSelector((state) => state.auth); // Accessing the Redux state
    const dispatch = useDispatch();

    const handleSignIn = () => {
        dispatch(signInWithGoogle());
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
                    {/* Assuming you have implemented a carousel component or library */}
                </div>

                <p>{onboarding[headingIndex][1]}</p>

                <button
                    onClick={handleSignIn}
                    disabled={status === 'loading'}>
                    Continue with Google
                    {status === 'loading' && <span>Loading...</span>}
                </button>

                {status === 'failure' && error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default AuthPage;
