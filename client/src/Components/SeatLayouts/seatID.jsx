function SeatID({ seatData }) {
    const getColumnID = (col) => {
        return String.fromCharCode(65 + col);
    };

    if (
        !seatData ||
        typeof seatData.row !== "number" ||
        typeof seatData.col !== "number"
    ) {
        return <span>Invalid seat data</span>;
    }

    const columnID = getColumnID(seatData.col);
    const seatID = `${columnID}${seatData.row}`;

    return <span>{seatID}</span>;
}

export default SeatID;
