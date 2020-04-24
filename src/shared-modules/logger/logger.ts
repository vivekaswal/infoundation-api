import loggerFactory from './logger.factory';
class Logger {

    context: any;

    constructor(context: string) {
        this.context = context;
    }

    constructMessage(message: string) {
        message = `${this.context} - ${message}`;
        return message;
    }

    debug(message: string) {
        loggerFactory.debug(this.constructMessage(message));
    }

    info(message: string) {
        loggerFactory.info(this.constructMessage(message));
    }

    error(message: string, error: any) {
        let stringifiedErrorMessage = "";
        try {
            stringifiedErrorMessage = `${!!error ? JSON.stringify(error) : "error undefined"}`;
        } catch (err) {
            stringifiedErrorMessage = `Error occured while stringfing`;
            loggerFactory.error(`${err.message}, ${err.stack}`);
        }
        let errorMessage = `${message}, ErrorStringfied: ${stringifiedErrorMessage}, Error: ${!!error ? error : "error undefined"}, ErrorMessage: ${
            !!error && !!error.message ? error.message : "ErrorMessage undefined"
            }, ErrorStack: ${!!error && !!error.stack ? error.stack : "ErrorStack undefined"}`;
        loggerFactory.error(this.constructMessage(errorMessage));
    }

    warn(message: string) {
        loggerFactory.warn(this.constructMessage(message));
    }
}

const getLogger = (context?: any) => {
    return new Logger(context);
}

export = getLogger;
