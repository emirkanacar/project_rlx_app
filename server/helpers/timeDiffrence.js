module.exports = (firstTimestamp, secondTimestamp) => {
    return (firstTimestamp - secondTimestamp) / (60*60);
};