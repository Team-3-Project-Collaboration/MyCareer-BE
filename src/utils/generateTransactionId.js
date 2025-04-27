function generateTransactionId(userId, moduleId) {
    const now = new Date();
    const formattedDateTime = now.getFullYear().toString()
        + ("0" + (now.getMonth() + 1)).slice(-2)
        + ("0" + now.getDate()).slice(-2)
        + ("0" + now.getHours()).slice(-2)
        + ("0" + now.getMinutes()).slice(-2)
        + ("0" + now.getSeconds()).slice(-2);

    return `${userId}${formattedDateTime}${moduleId}`;
}

module.exports = generateTransactionId;
