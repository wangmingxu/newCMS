/**
 * 基本工具类
 */
"use strict";

class Utils {
    constructor() {
      //
    }
    static delEmptyProps(obj) {
        let param = {};
        if ( obj === null || obj === undefined || obj === "" ) return param;
        for ( var key in obj ){
            if ( typeof(obj[key]) === "object" && obj[key] !== null){
                param[key] = this.delEmptyProps(obj[key]);
            }else if(  obj[key] !== null && obj[key] !== undefined && obj[key] !== ""  ){
                param[key] = obj[key];
            }
        }
        return param;
    }
}
module.exports = Utils;
