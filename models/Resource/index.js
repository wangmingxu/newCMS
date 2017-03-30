module.exports = {
  name:"Resource",
  props:{
      id: {type:'serial', unique:true, key: true},
      resourceName: String,
      interface: String,
      remark: String
  },
  opts:{
      collection: 'cms_resource',
      timestamp: true
  }
};
