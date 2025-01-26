const isImageURL = (url) => {
    try {
        new URL(url);
        return /\.(jpg|jpeg|png|gif)$/i.test(url);
    } catch (e) {
        return false;
    }
};

module.exports = isImageURL;
