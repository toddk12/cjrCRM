exports.get404 = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: '404 Error',
        path: '/404'
    });
};

exports.get500 = (req, res, next) => {
    res.status(500).render('500', {
        pageTitle: 'Error!',
        path: '/500'
    });
};