module.exports = {
  name:"Plan",
  props:{
      id: {type:'serial', unique:true, key: true},
      effective: Boolean,
      planName: String,
      interface: String,
      startTime: { type: "date", time: true },
      endTime: { type: "date", time: true },
  },
  opts:{
      collection: 'cms_plan',
      timestamp: true
  }
};
