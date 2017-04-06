'use strict';

module.exports = {
    name: "Material",
    props: {
        id: { type: 'serial', unique: true, key: true },
        materialName: String,
        materialType: ['image', 'text'],
        content: { type: 'text' }
    },
    opts: {
        collection: 'cms_material',
        timestamp: true
    }
};