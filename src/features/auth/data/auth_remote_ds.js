// src/features/auth/data/data_source/auth_remote_ds.js

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // For Firestore operations
import { UserModel } from './user_model'; // Import the UserModel

class AuthRemoteDS {
    constructor() {
        this.auth = getAuth();
        this.firestore = getFirestore();
    }

    async signInWithGoogle() {
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(this.auth, provider);
            const user = result.user;

            if (user.metadata.creationTime === user.metadata.lastSignInTime) {
                await this.addNewUser(user);
            }

            return new UserModel({
                id: user.uid,
                name: user.displayName,
                phoneNumber: user.phoneNumber,
                location: {}, // Can be populated from another service
                image: user.photoURL,
                gender: user.gender, // Gender may need to be retrieved
                creationTD: user.metadata.creationTime,
                createdBy: user.uid,
                deactivate: false,
            });
        } catch (error) {
            console.error('Error during Google sign-in:', error.message);
            throw new Error('Google sign-in failed');
        }
    }

    async addNewUser(user) {
        try {
            const userModel = new UserModel({
                id: user.uid,
                name: user.displayName,
                phoneNumber: user.phoneNumber,
                location: {},
                image: user.photoURL,
                gender: user.gender,
                creationTD: user.metadata.creationTime,
                createdBy: user.uid,
                deactivate: false,
            });

            const userRef = doc(this.firestore, 'users', user.uid);
            await setDoc(userRef, userModel.toJson());
            console.log('New user added to Firestore:', user.uid);
        } catch (error) {
            console.error('Error adding new user:', error.message);
            throw new Error('Failed to add new user');
        }
    }
}

export default AuthRemoteDS;
