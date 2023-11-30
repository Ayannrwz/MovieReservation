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
        errorMsg: `Seniors exceed reservation: (${numSeats})`,
    };
};

export default validateNumber ;
