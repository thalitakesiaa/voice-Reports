function isMalformed(type, token) {
    if (!type || !token) {
        return true;
    }

    if (type !== 'Bearer') {
        return true;
    }

    return false;
}

export default isMalformed;
