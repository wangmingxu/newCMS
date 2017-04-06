/**
 * 定义模型之间的关联
 */
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ModelLink = function () {
    function ModelLink(models) {
        _classCallCheck(this, ModelLink);

        Object.assign(this, { models: models });
        this.initialize();
    }

    _createClass(ModelLink, [{
        key: "initialize",
        value: function initialize() {
            this.PlanLinkResource();
        }

        //计划和资源位进行关联

    }, {
        key: "PlanLinkResource",
        value: function PlanLinkResource() {
            this.models.Plan.hasOne("resource", this.models.Resource, {
                reverse: "plans", //反向关联
                mergeTable: 'cms_resource', //自定义的表名
                autoFetch: true });
        }
    }]);

    return ModelLink;
}();

module.exports = ModelLink;