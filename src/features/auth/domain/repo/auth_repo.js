// src/features/auth/domain/repo/auth_repo.js

class AuthRepo {
    // Abstract method to sign in with Google
    async signInWithGoogle() {
        throw new Error('signInWithGoogle method not implemented');
    }

    // Abstract method to add a new user
    async addNewUser(userData) {
        throw new Error('addNewUser method not implemented');
    }
}

export default AuthRepo;
