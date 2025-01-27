const isImageURL = (url) => {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (urlPattern.test(url)) {
        return /\.(jpg|jpeg|png|gif)$/i.test(url);
    } else {
        return false;
    }
};

module.exports = isImageURL;
