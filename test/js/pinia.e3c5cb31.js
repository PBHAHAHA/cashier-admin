import{i as r}from"./vue-demi.0e4c1019.js";import{am as p,b as l,al as u}from"./@vue.261fc3d1.js";/*!
  * pinia v2.0.28
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */const f=Symbol("pinia");var n;(function(t){t.direct="direct",t.patchObject="patch object",t.patchFunction="patch function"})(n||(n={}));function b(){const t=p(!0),o=t.run(()=>l({}));let i=[],c=[];const a=u({install(e){a._a=e,e.provide(f,a),e.config.globalProperties.$pinia=a,c.forEach(s=>i.push(s)),c=[]},use(e){return!this._a&&!r?c.push(e):i.push(e),this},_p:i,_a:null,_e:t,_s:new Map,state:o});return a}export{b as c};
