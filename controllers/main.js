exports.getHome = (req, res, next) => {
    res.render('home', {
        pageTitle: 'Home Page',
        path: '/home',
    });
};