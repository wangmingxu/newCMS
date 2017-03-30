module.exports = {
  name:"Material",
  props:{
      id: {type:'serial', unique:true, key: true},
      materialName: String,
      materialType: ['image','text'],
      content: String,
      // materialSize: Number,
  },
  opts:{
      collection: 'cms_material',
      timestamp: true
  }
};
