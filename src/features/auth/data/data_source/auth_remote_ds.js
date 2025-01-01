// src/features/auth/data/data_source/auth_remote_ds.js

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // For Firestore operations
import { UserModel } from '../models/user_model'; // Import the UserModel
import AuthRepo from '../../domain/repo/auth_repo'; // Import the abstract class

class AuthRemoteDS extends AuthRepo {
    constructor() {
        super();
        this.auth = getAuth(); // Firebase auth instance
        this.firestore = getFirestore(); // Firebase Firestore instance
    }

    // Implementing the abstract method from AuthRepo
    async signInWithGoogle() {
        const provider = new GoogleAuthProvider();

        try {
            // Sign in with a popup using Google as a provider
            const result = await signInWithPopup(this.auth, provider);
            const user = result.user;

            // Check if the user is new (comparing creationTime with lastSignInTime)
            if (user.metadata.creationTime === user.metadata.lastSignInTime) {
                // New user, create user in Firestore immediately
                await this.addNewUser(user);
            }

            // Return the signed-in user data
            return new UserModel({
                id: user.uid,
                name: user.displayName,
                phoneNumber: user.phoneNumber,
                location: {}, // You can get location from other services if needed
                image: user.photoURL,
                gender: user.gender, // Gender will need to be retrieved if available in your system
                creationTD: user.metadata.creationTime,
                createdBy: user.uid,
                deactivate: false,
            });
        } catch (error) {
            console.error('Error during Google sign-in:', error.message);
            throw new Error('Google sign-in failed');
        }
    }

    // Implementing the abstract method to add a new user to Firestore using UserModel
    async addNewUser(user) {
        try {
            const userModel = new UserModel({
                id: user.uid,
                name: user.displayName,
                phoneNumber: user.phoneNumber,
                location: {}, // You may need to populate this from another service or input
                image: user.photoURL,
                gender: user.gender,
                creationTD: user.metadata.creationTime,
                createdBy: user.uid,
                deactivate: false,
            });

            // Create a user object to save to Firestore
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
