export class StateError {
    constructor(message = "Something went wrong, Please try again later", code = "", consoleMessage = "") {
        this.message = message;
        this.code = code;
        this.consoleMessage = consoleMessage;
    }

    static initial() {
        return new StateError();
    }
}

export const StateStatus = {
    INITIAL: 'initial',
    LOADING: 'loading',
    FAILURE: 'failure',
    SUCCESS: 'success',
};
