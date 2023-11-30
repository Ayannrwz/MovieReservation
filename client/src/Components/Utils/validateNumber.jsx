const validateNumber = (numSeats, number) => {
    if (numSeats >= number) {
        return {
            validateStatus: "success",
            errorMsg: null,
        };
    }

    if (!number) {
        return {
            validateStatus: "success",
            errorMsg: null,
        };
    }

    return {
        validateStatus: "error",
        errorMsg: `number of seniors exceeds the number of seats (${numSeats})`,
    };
};

export default validateNumber ;
