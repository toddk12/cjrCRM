const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const moment = require('moment');

const fs = require('fs');
const path = require('path');

const PDFDocument = require('pdfkit');

const Project = require('../models/project');
const Subcontractor = require('../models/subcontractor');
const WorkOrder = require('../models/workOrder');

exports.getCal = async(req, res, next) => {
    const dowDate = new Date();
    const dow = dowDate.getDay();
    let sDate = moment(dowDate).subtract(dow, "days");
    let sun = moment(sDate).format("MM/DD/YY");
    let mon = moment(sun).add(1, "days").format("MM/DD/YY");
    let tue = moment(mon).add(1, "days").format("MM/DD/YY");
    let wed = moment(tue).add(1, "days").format("MM/DD/YY");
    let thu = moment(wed).add(1, "days").format("MM/DD/YY");
    let fri = moment(thu).add(1, "days").format("MM/DD/YY");
    let sat = moment(fri).add(1, "days").format("MM/DD/YY");
    let sun2 = moment(sat).add(1, "days").format("MM/DD/YY");
    let mon2 = moment(sun2).add(1, "days").format("MM/DD/YY");
    let tue2 = moment(mon2).add(1, "days").format("MM/DD/YY");
    let wed2 = moment(tue2).add(1, "days").format("MM/DD/YY");
    let thu2 = moment(wed2).add(1, "days").format("MM/DD/YY");
    let fri2 = moment(thu2).add(1, "days").format("MM/DD/YY");
    let sat2 = moment(fri2).add(1, "days").format("MM/DD/YY");
    try {
        let sunDA = [];
        let monDA = [];
        let tueDA = [];
        let wedDA = [];
        let thuDA = [];
        let friDA = [];
        let satDA = [];
        let sunDA2 = [];
        let monDA2 = [];
        let tueDA2 = [];
        let wedDA2 = [];
        let thuDA2 = [];
        let friDA2 = [];
        let satDA2 = [];
        const sCal = await WorkOrder.findAll({ where: { startDate: sun, complete: 0 }, include: [{ model: Project }, { model: Subcontractor }] })
        const mCal = await WorkOrder.findAll({ where: { startDate: mon, complete: 0 }, include: [{ model: Project }, { model: Subcontractor }] })
        const tCal = await WorkOrder.findAll({ where: { startDate: tue, complete: 0 }, include: [{ model: Project }, { model: Subcontractor }] })
        const wCal = await WorkOrder.findAll({ where: { startDate: wed, complete: 0 }, include: [{ model: Project }, { model: Subcontractor }] })
        const thCal = await WorkOrder.findAll({ where: { startDate: thu, complete: 0 }, include: [{ model: Project }, { model: Subcontractor }] })
        const fCal = await WorkOrder.findAll({ where: { startDate: fri, complete: 0 }, include: [{ model: Project }, { model: Subcontractor }] })
        const saCal = await WorkOrder.findAll({ where: { startDate: sat, complete: 0 }, include: [{ model: Project }, { model: Subcontractor }] })
        const sCal2 = await WorkOrder.findAll({ where: { startDate: sun2, complete: 0 }, include: [{ model: Project }, { model: Subcontractor }] })
        const mCal2 = await WorkOrder.findAll({ where: { startDate: mon2, complete: 0 }, include: [{ model: Project }, { model: Subcontractor }] })
        const tCal2 = await WorkOrder.findAll({ where: { startDate: tue2, complete: 0 }, include: [{ model: Project }, { model: Subcontractor }] })
        const wCal2 = await WorkOrder.findAll({ where: { startDate: wed2, complete: 0 }, include: [{ model: Project }, { model: Subcontractor }] })
        const thCal2 = await WorkOrder.findAll({ where: { startDate: thu2, complete: 0 }, include: [{ model: Project }, { model: Subcontractor }] })
        const fCal2 = await WorkOrder.findAll({ where: { startDate: fri2, complete: 0 }, include: [{ model: Project }, { model: Subcontractor }] })
        const saCal2 = await WorkOrder.findAll({ where: { startDate: sat2, complete: 0 }, include: [{ model: Project }, { model: Subcontractor }] })
        for (sc of sCal) {
            sunDA.push(sc.project.owner1Ln + " - " + sc.project.address + " - " + sc.subcontractor.coName + " - " + sc.trade1)
            if (sc.numDays > 1) {
                monDA.push(sc.project.owner1Ln + " - " + sc.project.address + " - " + sc.subcontractor.coName + " - " + sc.trade1)
                if (sc.numDays > 2) {
                    tueDA.push(sc.project.owner1Ln + " - " + sc.project.address + " - " + sc.subcontractor.coName + " - " + sc.trade1)
                    if (sc.numDays > 3) {
                        wedDA.push(sc.project.owner1Ln + " - " + sc.project.address + " - " + sc.subcontractor.coName + " - " + sc.trade1)
                        if (sc.numDays > 4) {
                            thuDA.push(sc.project.owner1Ln + " - " + sc.project.address + " - " + sc.subcontractor.coName + " - " + sc.trade1)
                            if (sc.numDays > 5) {
                                friDA.push(sc.project.owner1Ln + " - " + sc.project.address + " - " + sc.subcontractor.coName + " - " + sc.trade1)
                                if (sc.numDays > 6) {
                                    satDA.push(sc.project.owner1Ln + " - " + sc.project.address + " - " + sc.subcontractor.coName + " - " + sc.trade1)
                                    if (sc.numDays > 7) {
                                        sunDA2.push(sc.project.owner1Ln + " - " + sc.project.address + " - " + sc.subcontractor.coName + " - " + sc.trade1)
                                        if (sc.numDays > 8) {
                                            monDA2.push(sc.project.owner1Ln + " - " + sc.project.address + " - " + sc.subcontractor.coName + " - " + sc.trade1)
                                            if (sc.numDays > 9) {
                                                tueDA2.push(sc.project.owner1Ln + " - " + sc.project.address + " - " + sc.subcontractor.coName + " - " + sc.trade1)
                                                if (sc.numDays > 10) {
                                                    wedDA2.push(sc.project.owner1Ln + " - " + sc.project.address + " - " + sc.subcontractor.coName + " - " + sc.trade1)
                                                    if (sc.numDays > 11) {
                                                        thuDA2.push(sc.project.owner1Ln + " - " + sc.project.address + " - " + sc.subcontractor.coName + " - " + sc.trade1)
                                                        if (sc.numDays > 12) {
                                                            friDA2.push(sc.project.owner1Ln + " - " + sc.project.address + " - " + sc.subcontractor.coName + " - " + sc.trade1)
                                                            if (sc.numDays > 13) {
                                                                satDA2.push(sc.project.owner1Ln + " - " + sc.project.address + " - " + sc.subcontractor.coName + " - " + sc.trade1)
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        for (mc of mCal) {
            monDA.push(mc.project.owner1Ln + " - " + mc.project.address + " - " + mc.subcontractor.coName + " - " + mc.trade1)
            if (mc.numDays > 1) {
                tueDA.push(mc.project.owner1Ln + " - " + mc.project.address + " - " + mc.subcontractor.coName + " - " + mc.trade1)
                if (mc.numDays > 2) {
                    wedDA.push(mc.project.owner1Ln + " - " + mc.project.address + " - " + mc.subcontractor.coName + " - " + mc.trade1)
                    if (mc.numDays > 3) {
                        thuDA.push(mc.project.owner1Ln + " - " + mc.project.address + " - " + mc.subcontractor.coName + " - " + mc.trade1)
                        if (mc.numDays > 4) {
                            friDA.push(mc.project.owner1Ln + " - " + mc.project.address + " - " + mc.subcontractor.coName + " - " + mc.trade1)
                            if (mc.numDays > 5) {
                                satDA.push(mc.project.owner1Ln + " - " + mc.project.address + " - " + mc.subcontractor.coName + " - " + mc.trade1)
                                if (mc.numDays > 6) {
                                    sunDA2.push(mc.project.owner1Ln + " - " + mc.project.address + " - " + mc.subcontractor.coName + " - " + mc.trade1)
                                    if (mc.numDays > 7) {
                                        monDA2.push(mc.project.owner1Ln + " - " + mc.project.address + " - " + mc.subcontractor.coName + " - " + mc.trade1)
                                        if (mc.numDays > 8) {
                                            tueDA2.push(mc.project.owner1Ln + " - " + mc.project.address + " - " + mc.subcontractor.coName + " - " + mc.trade1)
                                            if (mc.numDays > 9) {
                                                wedDA2.push(mc.project.owner1Ln + " - " + mc.project.address + " - " + mc.subcontractor.coName + " - " + mc.trade1)
                                                if (mc.numDays > 10) {
                                                    thuDA2.push(mc.project.owner1Ln + " - " + mc.project.address + " - " + mc.subcontractor.coName + " - " + mc.trade1)
                                                    if (mc.numDays > 11) {
                                                        friDA2.push(mc.project.owner1Ln + " - " + mc.project.address + " - " + mc.subcontractor.coName + " - " + mc.trade1)
                                                        if (mc.numDays > 12) {
                                                            satDA2.push(mc.project.owner1Ln + " - " + mc.project.address + " - " + mc.subcontractor.coName + " - " + mc.trade1)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        for (tc of tCal) {
            tueDA.push(tc.project.owner1Ln + " - " + tc.project.address + " - " + tc.subcontractor.coName + " - " + tc.rade1)
            if (tc.numDays > 1) {
                wedDA.push(tc.project.owner1Ln + " - " + tc.project.address + " - " + tc.subcontractor.coName + " - " + tc.rade1)
                if (tc.numDays > 2) {
                    thuDA.push(tc.project.owner1Ln + " - " + tc.project.address + " - " + tc.subcontractor.coName + " - " + tc.rade1)
                    if (tc.numDays > 3) {
                        friDA.push(tc.project.owner1Ln + " - " + tc.project.address + " - " + tc.subcontractor.coName + " - " + tc.rade1)
                        if (tc.numDays > 4) {
                            satDA.push(tc.project.owner1Ln + " - " + tc.project.address + " - " + tc.subcontractor.coName + " - " + tc.rade1)
                            if (tc.numDays > 5) {
                                sunDA2.push(tc.project.owner1Ln + " - " + tc.project.address + " - " + tc.subcontractor.coName + " - " + tc.rade1)
                                if (tc.numDays > 6) {
                                    monDA2.push(tc.project.owner1Ln + " - " + tc.project.address + " - " + tc.subcontractor.coName + " - " + tc.rade1)
                                    if (tc.numDays > 7) {
                                        tueDA2.push(tc.project.owner1Ln + " - " + tc.project.address + " - " + tc.subcontractor.coName + " - " + tc.rade1)
                                        if (tc.numDays > 8) {
                                            wedDA2.push(tc.project.owner1Ln + " - " + tc.project.address + " - " + tc.subcontractor.coName + " - " + tc.rade1)
                                            if (tc.numDays > 9) {
                                                thuDA2.push(tc.project.owner1Ln + " - " + tc.project.address + " - " + tc.subcontractor.coName + " - " + tc.rade1)
                                                if (tc.numDays > 10) {
                                                    friDA2.push(tc.project.owner1Ln + " - " + tc.project.address + " - " + tc.subcontractor.coName + " - " + tc.rade1)
                                                    if (tc.numDays > 11) {
                                                        satDA2.push(tc.project.owner1Ln + " - " + tc.project.address + " - " + tc.subcontractor.coName + " - " + tc.rade1)
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        for (wc of wCal) {
            wedDA.push(wc.project.owner1Ln + " - " + wc.project.address + " - " + wc.subcontractor.coName + " - " + wc.trade1)
            if (wc.numDays > 1) {
                thuDA.push(wc.project.owner1Ln + " - " + wc.project.address + " - " + wc.subcontractor.coName + " - " + wc.trade1)
                if (wc.numDays > 2) {
                    friDA.push(wc.project.owner1Ln + " - " + wc.project.address + " - " + wc.subcontractor.coName + " - " + wc.trade1)
                    if (wc.numDays > 3) {
                        satDA.push(wc.project.owner1Ln + " - " + wc.project.address + " - " + wc.subcontractor.coName + " - " + wc.trade1)
                        if (wc.numDays > 4) {
                            sunDA2.push(wc.project.owner1Ln + " - " + wc.project.address + " - " + wc.subcontractor.coName + " - " + wc.trade1)
                            if (wc.numDays > 5) {
                                monDA2.push(wc.project.owner1Ln + " - " + wc.project.address + " - " + wc.subcontractor.coName + " - " + wc.trade1)
                                if (wc.numDays > 6) {
                                    tueDA2.push(wc.project.owner1Ln + " - " + wc.project.address + " - " + wc.subcontractor.coName + " - " + wc.trade1)
                                    if (wc.numDays > 7) {
                                        wedDA2.push(wc.project.owner1Ln + " - " + wc.project.address + " - " + wc.subcontractor.coName + " - " + wc.trade1)
                                        if (wc.numDays > 8) {
                                            thuDA2.push(wc.project.owner1Ln + " - " + wc.project.address + " - " + wc.subcontractor.coName + " - " + wc.trade1)
                                            if (wc.numDays > 9) {
                                                friDA2.push(wc.project.owner1Ln + " - " + wc.project.address + " - " + wc.subcontractor.coName + " - " + wc.trade1)
                                                if (wc.numDays > 10) {
                                                    satDA2.push(wc.project.owner1Ln + " - " + wc.project.address + " - " + wc.subcontractor.coName + " - " + wc.trade1)
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        for (thc of thCal) {
            thuDA.push(thc.project.owner1Ln + " - " + thc.project.address + " - " + thc.subcontractor.coName + " - " + thc.trade1)
            if (thc.numDays > 1) {
                friDA.push(thc.project.owner1Ln + " - " + thc.project.address + " - " + thc.subcontractor.coName + " - " + thc.trade1)
                if (thc.numDays > 2) {
                    satDA.push(thc.project.owner1Ln + " - " + thc.project.address + " - " + thc.subcontractor.coName + " - " + thc.trade1)
                    if (thc.numDays > 3) {
                        sunDA2.push(thc.project.owner1Ln + " - " + thc.project.address + " - " + thc.subcontractor.coName + " - " + thc.trade1)
                        if (thc.numDays > 4) {
                            monDA2.push(thc.project.owner1Ln + " - " + thc.project.address + " - " + thc.subcontractor.coName + " - " + thc.trade1)
                            if (thc.numDays > 5) {
                                tueDA2.push(thc.project.owner1Ln + " - " + thc.project.address + " - " + thc.subcontractor.coName + " - " + thc.trade1)
                                if (thc.numDays > 6) {
                                    wedDA2.push(thc.project.owner1Ln + " - " + thc.project.address + " - " + thc.subcontractor.coName + " - " + thc.trade1)
                                    if (thc.numDays > 7) {
                                        thuDA2.push(thc.project.owner1Ln + " - " + thc.project.address + " - " + thc.subcontractor.coName + " - " + thc.trade1)
                                        if (thc.numDays > 8) {
                                            friDA2.push(thc.project.owner1Ln + " - " + thc.project.address + " - " + thc.subcontractor.coName + " - " + thc.trade1)
                                            if (thc.numDays > 9) {
                                                satDA2.push(thc.project.owner1Ln + " - " + thc.project.address + " - " + thc.subcontractor.coName + " - " + thc.trade1)
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        for (fc of fCal) {
            friDA.push(fc.project.owner1Ln + " - " + fc.project.address + " - " + fc.subcontractor.coName + " - " + fc.trade1)
            if (fc.numDays > 1) {
                satDA.push(fc.project.owner1Ln + " - " + fc.project.address + " - " + fc.subcontractor.coName + " - " + fc.trade1)
                if (fc.numDays > 2) {
                    sunDA2.push(fc.project.owner1Ln + " - " + fc.project.address + " - " + fc.subcontractor.coName + " - " + fc.trade1)
                    if (fc.numDays > 3) {
                        monDA2.push(fc.project.owner1Ln + " - " + fc.project.address + " - " + fc.subcontractor.coName + " - " + fc.trade1)
                        if (fc.numDays > 4) {
                            tueDA2.push(fc.project.owner1Ln + " - " + fc.project.address + " - " + fc.subcontractor.coName + " - " + fc.trade1)
                            if (fc.numDays > 5) {
                                wedDA2.push(fc.project.owner1Ln + " - " + fc.project.address + " - " + fc.subcontractor.coName + " - " + fc.trade1)
                                if (fc.numDays > 6) {
                                    thuDA2.push(fc.project.owner1Ln + " - " + fc.project.address + " - " + fc.subcontractor.coName + " - " + fc.trade1)
                                    if (fc.numDays > 7) {
                                        friDA2.push(fc.project.owner1Ln + " - " + fc.project.address + " - " + fc.subcontractor.coName + " - " + fc.trade1)
                                        if (fc.numDays > 8) {
                                            satDA2.push(fc.project.owner1Ln + " - " + fc.project.address + " - " + fc.subcontractor.coName + " - " + fc.trade1)
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        for (sac of saCal) {
            satDA.push(sac.project.owner1Ln + " - " + sac.project.address + " - " + sac.subcontractor.coName + " - " + sac.trade1)
            if (fc.numDays > 1) {
                sunDA2.push(sac.project.owner1Ln + " - " + sac.project.address + " - " + fc.subcontractor.coName + " - " + sac.trade1)
                if (fc.numDays > 2) {
                    monDA2.push(sac.project.owner1Ln + " - " + sac.project.address + " - " + fc.subcontractor.coName + " - " + sac.trade1)
                    if (fc.numDays > 3) {
                        tueDA2.push(sac.project.owner1Ln + " - " + sac.project.address + " - " + fc.subcontractor.coName + " - " + sac.trade1)
                        if (fc.numDays > 4) {
                            wedDA2.push(sac.project.owner1Ln + " - " + sac.project.address + " - " + fc.subcontractor.coName + " - " + sac.trade1)
                            if (fc.numDays > 5) {
                                thuDA2.push(sac.project.owner1Ln + " - " + sac.project.address + " - " + fc.subcontractor.coName + " - " + sac.trade1)
                                if (fc.numDays > 6) {
                                    friDA2.push(sac.project.owner1Ln + " - " + sac.project.address + " - " + fc.subcontractor.coName + " - " + sac.trade1)
                                    if (fc.numDays > 7) {
                                        satDA2.push(sac.project.owner1Ln + " - " + sac.project.address + " - " + fc.subcontractor.coName + " - " + sac.trade1)
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        for (sc2 of sCal2) {
            sunDA2.push(sc2.project.owner1Ln + " - " + sc2.project.address + " - " + sc2.subcontractor.coName + " - " + sc2.trade1)
            if (sc2.numDays > 1) {
                monDA2.push(sc2.project.owner1Ln + " - " + sc2.poject.address + " - " + sc2.subcontractor.coName + " - " + sc2.trade1)
                if (sc2.numDays > 2) {
                    tueDA2.push(sc2.project.owner1Ln + " - " + sc2.poject.address + " - " + sc2.subcontractor.coName + " - " + sc2.trade1)
                    if (sc2.numDays > 3) {
                        wedDA2.push(sc2.project.owner1Ln + " - " + sc2.poject.address + " - " + sc2.subcontractor.coName + " - " + sc2.trade1)
                        if (sc2.numDays > 4) {
                            thuDA2.push(sc2.project.owner1Ln + " - " + sc2.poject.address + " - " + sc2.subcontractor.coName + " - " + sc2.trade1)
                            if (sc2.numDays > 5) {
                                friDA2.push(sc2.project.owner1Ln + " - " + sc2.poject.address + " - " + sc2.subcontractor.coName + " - " + sc2.trade1)
                                if (sc2.numDays > 6) {
                                    satDA2.push(sc2.project.owner1Ln + " - " + sc2.poject.address + " - " + sc2.subcontractor.coName + " - " + sc2.trade1)
                                }
                            }
                        }
                    }
                }
            }
        }
        for (mc2 of mCal2) {
            monDA2.push(mc2.project.owner1Ln + " - " + mc2.project.address + " - " + mc2.subcontractor.coName + " - " + mc2.trade1)
            if (mc2.numDays > 1) {
                tueDA2.push(mc2.project.owner1Ln + " - " + mc2.project.address + " - " + mc2.subcontractor.coName + " - " + mc2.trade1)
                if (mc2.numDays > 2) {
                    wedDA2.push(mc2.project.owner1Ln + " - " + mc2.project.address + " - " + mc2.subcontractor.coName + " - " + mc2.trade1)
                    if (mc2.numDays > 3) {
                        thuDA2.push(mc2.project.owner1Ln + " - " + mc2.project.address + " - " + mc2.subcontractor.coName + " - " + mc2.trade1)
                        if (mc2.numDays > 4) {
                            friDA2.push(mc2.project.owner1Ln + " - " + mc2.project.address + " - " + mc2.subcontractor.coName + " - " + mc2.trade1)
                            if (mc2.numDays > 5) {
                                satDA2.push(mc2.project.owner1Ln + " - " + mc2.project.address + " - " + mc2.subcontractor.coName + " - " + mc2.trade1)
                            }
                        }
                    }
                }
            }
        }
        for (tc2 of tCal2) {
            tueDA2.push(tc2.project.owner1Ln + " - " + tc2.project.address + " - " + tc2.subcontractor.coName + " - " + tc2.trade1)
            if (tc2.numDays > 1) {
                wedDA2.push(tc2.project.owner1Ln + " - " + tc2.project.address + " - " + tc2.subcontractor.coName + " - " + tc2.trade1)
                if (tc2.numDays > 2) {
                    thuDA2.push(tc2.project.owner1Ln + " - " + tc2.project.address + " - " + tc2.subcontractor.coName + " - " + tc2.trade1)
                    if (tc2.numDays > 3) {
                        friDA2.push(tc2.project.owner1Ln + " - " + tc2.project.address + " - " + tc2.subcontractor.coName + " - " + tc2.trade1)
                        if (tc2.numDays > 4) {
                            satDA2.push(tc2.project.owner1Ln + " - " + tc2.project.address + " - " + tc2.subcontractor.coName + " - " + tc2.trade1)
                        }
                    }
                }
            }
        }
        for (wc2 of wCal2) {
            wedDA2.push(wc2.project.owner1Ln + " - " + wc2.project.address + " - " + wc2.subcontractor.coName + " - " + wc2.trade1)
            if (wc2.numDays > 1) {
                thuDA2.push(wc2.project.owner1Ln + " - " + wc2.project.address + " - " + wc2.subcontractor.coName + " - " + wc2.trade1)
                if (wc2.numDays > 2) {
                    friDA2.push(wc2.project.owner1Ln + " - " + wc2.project.address + " - " + wc2.subcontractor.coName + " - " + wc2.trade1)
                    if (wc2.numDays > 3) {
                        satDA2.push(wc2.project.owner1Ln + " - " + wc2.project.address + " - " + wc2.subcontractor.coName + " - " + wc2.trade1)
                    }
                }
            }
        }
        for (thc2 of thCal2) {
            thuDA2.push(thc2.project.owner1Ln + " - " + thc2.project.address + " - " + thc2.subcontractor.coName + " - " + thc2trade1)
            if (thc2.numDays > 1) {
                friDA2.push(thc2.project.owner1Ln + " - " + thc2.project.address + " - " + thc2.subcontractor.coName + " - " + thc2trade1)
                if (thc2.numDays > 2) {
                    satDA2.push(thc2.project.owner1Ln + " - " + thc2.project.address + " - " + thc2.subcontractor.coName + " - " + thc2trade1)
                }
            }
        }
        for (fc2 of fCal2) {
            friDA2.push(fc2.project.owner1Ln + " - " + fc2.project.address + " - " + fc2.subcontractor.coName + " - " + fc2.rade1)
            if (fc2.numDays > 1) {
                satDA.push(fc2.project.owner1Ln + " - " + fc2.project.address + " - " + fc2.subcontractor.coName + " - " + fc2.rade1)
            }
        }
        for (sac2 of saCal2) {
            satDA2.push(sacc2.project.owner1Ln + " - " + sac2.project.address + " - " + sac2.subcontractor.coName + " - " + sac2.trade1)
        }

        res.render('calendar/calendar', {
            pageTitle: 'Work Calendar',
            path: '/calendar',
            dowDate: dowDate,
            sun: sun,
            mon: mon,
            tue: tue,
            wed: wed,
            thu: thu,
            fri: fri,
            sat: sat,
            sun2: sun2,
            mon2: mon2,
            tue2: tue2,
            wed2: wed2,
            thu2: thu2,
            fri2: fri2,
            sat2: sat2,
            sund: sunDA,
            mond: monDA,
            tues: tueDA,
            wedn: wedDA,
            thur: thuDA,
            frid: friDA,
            satu: satDA,
            sund2: sunDA2,
            mond2: monDA2,
            tues2: tueDA2,
            wedn2: wedDA2,
            thur2: thuDA2,
            frid2: friDA2,
            satu2: satDA2
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};