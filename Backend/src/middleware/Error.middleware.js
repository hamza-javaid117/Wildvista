const errorHandler = (err, req, res, next) => {

    let error = err;

    const statusCode = error.statusCode || 500;

    const message = error.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        message: message,
        errors: error.errors || [],
        stack: process.env.NODE_ENV === "development" 
            ? error.stack   
            : undefined
    });
};


export { errorHandler };