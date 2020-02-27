exports.getHome = (req, res, next) => {
    res.render('home', {
        pageTitle: 'Home Page',
        path: '/home',
    });
};

exports.getClosed = (req, res, next) => {
    res.render('closed', {
        pageTitle: 'Page not Available',
        path: '/closed',
    });
};