const chgStat1 = (btnsm1) => {
    let projId = btnsm1.parentNode.querySelector('[name=projectId]').value;
    let csrf = btnsm1.parentNode.querySelector('[name=_csrf]').value;
    fetch('/project/' + projId, {
            method: 'POST',
            body: JSON.stringify({ newStat: 1 }),
            headers: {
                'csrf-token': csrf,
                "Content-Type": "application/json"
            }
        })
        .then(result => {
            console.log(result);
            window.location.reload();
        })
        .catch(err => {
            console.log('Something went wrong');
            console.log(err);
        });
};

const chgStat2 = (btnsm1) => {
    let projId = btnsm1.parentNode.querySelector('[name=projectId]').value;
    let csrf = btnsm1.parentNode.querySelector('[name=_csrf]').value;
    fetch('/project/' + projId, {
            method: 'POST',
            body: JSON.stringify({ newStat: 2 }),
            headers: {
                'csrf-token': csrf,
                "Content-Type": "application/json"
            }
        })
        .then(result => {
            console.log(result);
            window.location.reload();
        })
        .catch(err => {
            console.log('Something went wrong');
            console.log(err);
        });
};

const chgStat3 = (btnsm1) => {
    let projId = btnsm1.parentNode.querySelector('[name=projectId]').value;
    let csrf = btnsm1.parentNode.querySelector('[name=_csrf]').value;
    fetch('/project/' + projId, {
            method: 'POST',
            body: JSON.stringify({ newStat: 3 }),
            headers: {
                'csrf-token': csrf,
                "Content-Type": "application/json"
            }
        })
        .then(result => {
            console.log(result);
            window.location.reload();
        })
        .catch(err => {
            console.log('Something went wrong');
            console.log(err);
        });
};

const chgStat4 = (btnsm1) => {
    let projId = btnsm1.parentNode.querySelector('[name=projectId]').value;
    let csrf = btnsm1.parentNode.querySelector('[name=_csrf]').value;
    fetch('/project/' + projId, {
            method: 'POST',
            body: JSON.stringify({ newStat: 4 }),
            headers: {
                'csrf-token': csrf,
                "Content-Type": "application/json"
            }
        })
        .then(result => {
            console.log(result);
            window.location.reload();
        })
        .catch(err => {
            console.log('Something went wrong');
            console.log(err);
        });
};

const chgStat5 = (btnsm1) => {
    let projId = btnsm1.parentNode.querySelector('[name=projectId]').value;
    let csrf = btnsm1.parentNode.querySelector('[name=_csrf]').value;
    fetch('/project/' + projId, {
            method: 'POST',
            body: JSON.stringify({ newStat: 5 }),
            headers: {
                'csrf-token': csrf,
                "Content-Type": "application/json"
            }
        })
        .then(result => {
            console.log(result);
            window.location.reload();
        })
        .catch(err => {
            console.log('Something went wrong');
            console.log(err);
        });
};

const chgStat6 = (btnsm1) => {
    let projId = btnsm1.parentNode.querySelector('[name=projectId]').value;
    let csrf = btnsm1.parentNode.querySelector('[name=_csrf]').value;
    fetch('/project/' + projId, {
            method: 'POST',
            body: JSON.stringify({ newStat: 6 }),
            headers: {
                'csrf-token': csrf,
                "Content-Type": "application/json"
            }
        })
        .then(result => {
            console.log(result);
            window.location.reload();
        })
        .catch(err => {
            console.log('Something went wrong');
            console.log(err);
        });
};

const chgStat7 = (btnsm1) => {
    let projId = btnsm1.parentNode.querySelector('[name=projectId]').value;
    let csrf = btnsm1.parentNode.querySelector('[name=_csrf]').value;
    fetch('/project/' + projId, {
            method: 'POST',
            body: JSON.stringify({ newStat: 7 }),
            headers: {
                'csrf-token': csrf,
                "Content-Type": "application/json"
            }
        })
        .then(result => {
            console.log(result);
            window.location.reload();
        })
        .catch(err => {
            console.log('Something went wrong');
            console.log(err);
        });
};

const chgStat8 = (btnsm1) => {
    let projId = btnsm1.parentNode.querySelector('[name=projectId]').value;
    let csrf = btnsm1.parentNode.querySelector('[name=_csrf]').value;
    fetch('/project/' + projId, {
            method: 'POST',
            body: JSON.stringify({ newStat: 8 }),
            headers: {
                'csrf-token': csrf,
                "Content-Type": "application/json"
            }
        })
        .then(result => {
            console.log(result);
            window.location.reload();
        })
        .catch(err => {
            console.log('Something went wrong');
            console.log(err);
        });
};

const chgStat9 = (btnsm1) => {
    let projId = btnsm1.parentNode.querySelector('[name=projectId]').value;
    let csrf = btnsm1.parentNode.querySelector('[name=_csrf]').value;
    fetch('/project/' + projId, {
            method: 'POST',
            body: JSON.stringify({ newStat: 9 }),
            headers: {
                'csrf-token': csrf,
                "Content-Type": "application/json"
            }
        })
        .then(result => {
            console.log(result);
            window.location.reload();
        })
        .catch(err => {
            console.log('Something went wrong');
            console.log(err);
        });
};

const chgStat10 = (btnsm1) => {
    let projId = btnsm1.parentNode.querySelector('[name=projectId]').value;
    let csrf = btnsm1.parentNode.querySelector('[name=_csrf]').value;
    fetch('/project/' + projId, {
            method: 'POST',
            body: JSON.stringify({ newStat: 10 }),
            headers: {
                'csrf-token': csrf,
                "Content-Type": "application/json"
            }
        })
        .then(result => {
            console.log(result);
            window.location.reload();
        })
        .catch(err => {
            console.log('Something went wrong');
            console.log(err);
        });
};