module.exports = {
  name:"Resource",
  props:{
      id: {type:'serial', unique:true, key: true},
      resourceName: String,
      interface: String,
      createTime: { type: "date", time: true }
  },
  opts:{
      collection: 'cms_resource'
  }
};
