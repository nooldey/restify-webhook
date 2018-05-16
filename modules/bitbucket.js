export default (req, next) => {
    console.log(req);
    return next()
}