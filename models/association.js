/**
 * 定义模型之间的关联
 */
"use strict";
const Association = function(models){
  this.models = models;
  this.initialize();
};
Association.prototype.initialize = function(){
  this.PlanJoinResource();
};
//计划和资源位进行关联
Association.prototype.PlanJoinResource = function(){
  this.models.Plan.hasOne("resource", this.models.Resource, {
      reverse: "plans",//反向关联
      mergeTable: 'cms_resource',//自定义的表名
      autoFetch: true,//自动关联
  });
};
module.exports = Association;
