(()=>{"use strict";var e={4970:function(e,o,t){var n=this&&this.__awaiter||function(e,o,t,n){return new(t||(t=Promise))((function(r,a){function l(e){try{c(n.next(e))}catch(e){a(e)}}function s(e){try{c(n.throw(e))}catch(e){a(e)}}function c(e){var o;e.done?r(e.value):(o=e.value,o instanceof t?o:new t((function(e){e(o)}))).then(l,s)}c((n=n.apply(e,o||[])).next())}))};Object.defineProperty(o,"__esModule",{value:!0}),o.handler=void 0;const r=new(t(5990).DynamoDB),a=process.env.VOTING_TABLE,l=()=>{var e=new Date,o=new Date(e.getFullYear(),0,1),t=Math.floor((e-o)/864e5),n=Math.ceil((e.getDay()+1+t)/7);return console.log(e.getDay()),console.log(t),console.log(o),console.log(n),n};o.handler=e=>n(void 0,void 0,void 0,(function*(){const o=JSON.parse(e.body||"{}");let t=!1;var s;return s=o.programmer,[["even_p1","even_p2","even_p3","even_p4"],["odd_p1","odd_p2","odd_p3","odd_p4"]][l()%2].includes(s)&&(e=>{const o=(new Date).getUTCDay();return o>=1&&o<=5})()&&(t=!0),t?(yield((e,o)=>n(void 0,void 0,void 0,(function*(){console.log("here");const t=l().toString(),n=(console.log((new Date).getFullYear()),(new Date).getFullYear()).toString(),s=`INSERT INTO "${a}" value \n      {'user' : '${e}#${t}#${n}',\n       'rec_type' : 'Vote',\n       'year' : ${n},\n       'weekNumber': ${t},\n      'programmer': '${o}'\n    }`;console.log(s),yield r.executeStatement({Statement:s}).promise().catch((e=>{console.log(e)}))})))(o.email,o.programmer),{statusCode:200,headers:{"Content-Type":"application/json"},body:""}):{statusCode:200,headers:{"Content-Type":"application/json"},body:""}}))},5990:e=>{e.exports=require("aws-sdk")}},o={},t=function t(n){var r=o[n];if(void 0!==r)return r.exports;var a=o[n]={exports:{}};return e[n].call(a.exports,a,a.exports,t),a.exports}(4970);module.exports=t})();
//# sourceMappingURL=vote.js.map