export const catchAsync = (routeHandler) => {
    return async (req, res, next) => {
        try {
            routeHandler(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};
