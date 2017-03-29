"use strict";
const RouterBase = require('../../../common/routerbase');

class countAll extends RouterBase {
    handle() {
        const PlanCount = new Promise((resolve, reject) => {
            this.req.models.Plan.count({}, (err, countNum) => {
                resolve(countNum);
            });
        });
        const ResourceCount = new Promise((resolve, reject) => {
            this.req.models.Resource.count({}, (err, countNum) => {
                resolve(countNum);
            });
        });
        const MaterialCount = new Promise((resolve, reject) => {
            this.req.models.Material.count({}, (err, countNum) => {
                resolve(countNum);
            });
        });
        Promise.all([MaterialCount, ResourceCount, PlanCount]).then(values => {
            console.log(values);
            this.res.json(values);
        });
    }
}

module.exports = countAll.makeRouteHandler();
