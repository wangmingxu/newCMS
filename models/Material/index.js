module.exports = {
  name:"Material",
  props:{
      id: {type:'serial', unique:true, key: true},
      materialName: String,
      materialType: ['image','text'],
      content: String,
      materialSize: Number,
      createTime: { type: "date", time: true }
  },
  opts:{
      collection: 'cms_material'
  }
};
