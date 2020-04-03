exports.getIndex = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.render('index', {
            pageTitle: 'CJ Restoration',
            path: '/',
        });
    })
};

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

exports.getNotAuth = (req, res, next) => {
    res.render('notAuth', {
        pageTitle: 'Not Authorized for this Page',
        path: '/notAuth',
    });
};