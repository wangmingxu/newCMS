'use strict';

module.exports = {
    name: "Material",
    props: {
        id: { type: 'serial', unique: true, key: true },
        materialName: String,
        materialType: ['image', 'text'],
        content: { type: 'text', big: true }
    },
    opts: {
        collection: 'cms_material',
        timestamp: true
    }
};