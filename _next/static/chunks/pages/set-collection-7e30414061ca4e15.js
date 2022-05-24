(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[729],{68518:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/set-collection",function(){return n(67258)}])},11200:function(e,t,n){"use strict";n.d(t,{Z:function(){return y}});var r=n(85893),a=n(34051),s=n.n(a),o=(n(86672),n(67294)),i=n(1799);function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){c(e,t,n[t])}))}return e}var u=function(){var e=(0,o.useContext)(i.I),t=e.settings,n=e.setSettings;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("label",{htmlFor:"settings-modal",className:"btn modal-button",children:{"mainnet-beta":"Mainnet Beta",testnet:"Testnet",devnet:"Devnet"}[t.cluster]}),(0,r.jsx)("input",{type:"checkbox",id:"settings-modal",className:"modal-toggle"}),(0,r.jsx)("div",{className:"modal text-zinc-900",children:(0,r.jsxs)("div",{className:"modal-box",children:[(0,r.jsxs)("div",{className:"form-control",children:[(0,r.jsx)("label",{className:"label",children:(0,r.jsx)("span",{className:"label-text",children:"RPC Url"})}),(0,r.jsx)("input",{onChange:function(e){n(l({},t,{rpcUrl:e.target.value}))},type:"text",placeholder:"https://...",className:"input input-bordered w-full",value:t.rpcUrl})]}),(0,r.jsxs)("div",{className:"form-control",children:[(0,r.jsx)("label",{className:"label",children:(0,r.jsx)("span",{className:"label-text",children:"Cluster"})}),(0,r.jsxs)("select",{onChange:function(e){n(l({},t,{cluster:e.target.value}))},className:"w-full select select-bordered",value:t.cluster,children:[(0,r.jsx)("option",{value:"mainnet-beta",children:"Mainnet Beta"}),(0,r.jsx)("option",{value:"testnet",children:"Testnet"}),(0,r.jsx)("option",{value:"devnet",children:"Devnet"})]})]}),(0,r.jsx)("div",{className:"modal-action",children:(0,r.jsx)("label",{htmlFor:"settings-modal",className:"btn btn-outline",children:"Close"})})]})})]})},d=n(18348),f=n(96938),m=n(68155),p=n(93879),h=n(92814),x=n(51436);function v(e,t,n,r,a,s,o){try{var i=e[s](o),c=i.value}catch(l){return void n(l)}i.done?t(c):Promise.resolve(c).then(r,a)}var b=function(){var e=(0,f.zs)(),t=(0,o.useContext)(i.I),n=t.notify,a=t.settings,c=(t.setSettings,(0,o.useMemo)((function(){return new m.Connection(a.rpcUrl)}),[a])),l=(0,o.useState)(!1),b=l[0],y=l[1];return(0,o.useEffect)((function(){document.getElementById("current-page").value=window.location.pathname}),[]),(0,r.jsxs)("nav",{className:"px-8 py-2 flex flex-row flex-nowrap gap-4 w-full items-center text-slate-100 bg-slate-800",children:[(0,r.jsxs)("h1",{className:"text-2xl",children:[(0,r.jsx)(h.G,{className:"pr-[1ch]",icon:x.AlB}),"Candy Machine V2 Toolkit"]}),(0,r.jsxs)("select",{id:"current-page",className:"ml-4 select select-ghost",onChange:function(e){window.location.pathname=e.target.value},children:[(0,r.jsx)("option",{value:"/",children:"Home"}),p.h.map((function(e,t){return(0,r.jsx)("option",{value:e.link,children:e.name},t)}))]}),(0,r.jsx)("div",{className:"flex-grow"}),e&&"mainnet-beta"!=a.cluster&&(0,r.jsx)("button",{className:"btn glass ".concat(b?"btn-disabled loading":""),onClick:function(){var t;y(!0),(t=s().mark((function t(){var r,o;return s().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r={"mainnet-beta":0,devnet:1,testnet:1}[a.cluster],o=n.notification({message:"Requesting ".concat(r," SOL airdrop..."),type:"pending"}),t.next=4,c.requestAirdrop(e.publicKey,r*m.LAMPORTS_PER_SOL);case 4:o.update({message:"Successfully requested ".concat(r," SOL!"),type:"success",autoDismiss:5e3});case 5:case"end":return t.stop()}}),t)})),function(){var e=this,n=arguments;return new Promise((function(r,a){var s=t.apply(e,n);function o(e){v(s,r,a,o,i,"next",e)}function i(e){v(s,r,a,o,i,"throw",e)}o(void 0)}))})().finally((function(){y(!1)}))},disabled:b,children:b?"Requesting...":"Request Airdrop"}),(0,r.jsx)(u,{}),(0,r.jsx)(d.aD,{})]})};function y(e){return(0,r.jsxs)("div",{className:"w-full flex flex-col min-h-screen",children:[(0,r.jsx)(b,{}),(0,r.jsx)("main",{className:"m-8 flex-grow",children:e.children}),(0,r.jsx)("footer",{className:"text-center mx-8 mt-12",children:(0,r.jsx)("div",{className:"divider text-xs",children:"Candy Machine V2 Toolkit"})})]})}},93879:function(e,t,n){"use strict";n.d(t,{h:function(){return r}});var r=[{name:"Set Collection",link:"/set-collection",description:"Create collection metedata NFT and set collection for Candy Machine"}]},67258:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return pe}});var r=n(85893),a=n(9008),s=n.n(a),o=n(67294),i=n(68155),c=n(11200),l=n(1799);function u(e){return(0,r.jsxs)("section",{id:e.id,children:[(0,r.jsx)("h1",{className:"text-3xl",children:e.title}),e.description&&(0,r.jsx)("h3",{className:"pt-2 text-zinc-500",children:e.description}),(0,r.jsx)("article",{className:"pt-8 flex flex-row gap-12",children:e.children})]})}var d=n(34051),f=n.n(d),m=n(92814),p=n(51436),h=n(95827),x=n(8696),v=n(8490),b=n(96938);function y(e){return new Promise((function(t){return setTimeout(t,e)}))}function g(e){return"string"===typeof e||(t=e,null!=(n=String)&&"undefined"!==typeof Symbol&&n[Symbol.hasInstance]?!!n[Symbol.hasInstance](t):t instanceof n);var t,n}function j(e,t,n,r,a,s,o){try{var i=e[s](o),c=i.value}catch(l){return void n(l)}i.done?t(c):Promise.resolve(c).then(r,a)}function w(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var s=e.apply(t,n);function o(e){j(s,r,a,o,i,"next",e)}function i(e){j(s,r,a,o,i,"throw",e)}o(void 0)}))}}function k(e){try{return i.PublicKey.isOnCurve(e)}catch(t){return!1}}function N(e,t){return"mainnet-beta"===t?"https://explorer.solana.com/tx/"+e:"https://explorer.solana.com/tx/".concat(e,"?cluster=").concat(t)}var M=function(){var e=w(f().mark((function e(t,n){var r,a,s,o=arguments;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=o.length>2&&void 0!==o[2]?o[2]:12e4,a=!1,s=3e3,e.next=5,Promise.race([w(f().mark((function e(){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,y(r);case 2:throw a=!0,new Error("Timeout exceeded");case 4:case"end":return e.stop()}}),e)})))(),w(f().mark((function e(){var r,o;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a){e.next=23;break}return e.next=3,n.getSignatureStatus(t);case 3:if((r=e.sent).value){e.next=9;break}return e.next=7,y(s);case 7:return console.debug("Transaction ".concat(t," is not seen yet")),e.abrupt("continue",0);case 9:if(console.debug("Transaction ".concat(t),r.value),!r.value.err){e.next=17;break}if(!g(r.value.err)){e.next=13;break}throw new Error(r.value.err);case 13:if(!(o=r.value.err.InstructionError)){e.next=16;break}throw new Error("Instruction ".concat(o[0]," throws custom error ").concat(o[1].Custom));case 16:throw new Error(JSON.stringify(r.value.err));case 17:if("finalized"!==r.value.confirmationStatus){e.next=19;break}return e.abrupt("return");case 19:return e.next=21,y(s);case 21:e.next=0;break;case 23:case"end":return e.stop()}}),e)})))()]);case 5:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),S=n(48764).Buffer;function P(e,t,n,r,a,s,o){try{var i=e[s](o),c=i.value}catch(l){return void n(l)}i.done?t(c):Promise.resolve(c).then(r,a)}function C(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var s=e.apply(t,n);function o(e){P(s,r,a,o,i,"next",e)}function i(e){P(s,r,a,o,i,"throw",e)}o(void 0)}))}}var E=new i.PublicKey("cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ"),A=new i.PublicKey(h.PROGRAM_ADDRESS),T=S.from("metadata"),K=S.from("edition"),O=S.from("collection"),I=S.from("collection_authority");function L(e){return R.apply(this,arguments)}function R(){return(R=C(f().mark((function e(t){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.PublicKey.findProgramAddress([T,A.toBuffer(),t.toBuffer()],A);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function B(e){return _.apply(this,arguments)}function _(){return(_=C(f().mark((function e(t){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.PublicKey.findProgramAddress([T,A.toBuffer(),t.toBuffer(),K],A);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function F(e){return U.apply(this,arguments)}function U(){return(U=C(f().mark((function e(t){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.PublicKey.findProgramAddress([O,t.toBuffer()],E);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function V(e,t){return q.apply(this,arguments)}function q(){return(q=C(f().mark((function e(t,n){return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.PublicKey.findProgramAddress([T,A.toBuffer(),t.toBuffer(),I,n.toBuffer()],A);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function D(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function z(e,t,n){return(z=D()?Reflect.construct:function(e,t,n){var r=[null];r.push.apply(r,t);var a=new(Function.bind.apply(e,r));return n&&W(a,n.prototype),a}).apply(null,arguments)}function G(e){return(G=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function Z(e,t){return!t||"object"!==Y(t)&&"function"!==typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function W(e,t){return(W=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var Y=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function H(e){var t="function"===typeof Map?new Map:void 0;return H=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!==typeof e)throw new TypeError("Super expression must either be null or a function");if("undefined"!==typeof t){if(t.has(e))return t.get(e);t.set(e,r)}function r(){return z(e,arguments,G(this).constructor)}return r.prototype=Object.create(e.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),W(r,e)},H(e)}function J(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=G(e);if(t){var a=G(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return Z(this,n)}}var X,$=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&W(e,t)}(n,e);var t=J(n);function n(e,r){var a;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),r){var s=(r=r.toString()).indexOf("://"),o=r.substring(0,s);switch(o){case"https":case"http":break;default:return(a=t.call(this,e,"http"+r.substring(s))).protocol=o,Z(a)}}return Z(a=t.call(this,e,r))}return n}(H(URL));function Q(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ee(e,t,n,r,a,s,o){try{var i=e[s](o),c=i.value}catch(l){return void n(l)}i.done?t(c):Promise.resolve(c).then(r,a)}function te(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var s=e.apply(t,n);function o(e){ee(s,r,a,o,i,"next",e)}function i(e){ee(s,r,a,o,i,"throw",e)}o(void 0)}))}}function ne(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function re(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){ne(e,t,n[t])}))}return e}function ae(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,s=[],o=!0,i=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(s.push(r.value),!t||s.length!==t);o=!0);}catch(c){i=!0,a=c}finally{try{o||null==n.return||n.return()}finally{if(i)throw a}}return s}}(e,t)||oe(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function se(e){return function(e){if(Array.isArray(e))return Q(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||oe(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function oe(e,t){if(e){if("string"===typeof e)return Q(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Q(e,t):void 0}}function ie(e){var t,n,a=e.connection,s=e.onCreated,c=(0,o.useContext)(l.I).settings,u=(0,b.Os)(),d=(0,o.useState)(),y=d[0],g=d[1],j=(0,o.useState)(),w=j[0],S=j[1],P=(0,o.useState)(),C=P[0],E=P[1],A=(0,o.useState)(),T=A[0],K=A[1],O=(0,o.useState)(),I=O[0],R=O[1],_=(0,o.useState)(!1),F=_[0],U=_[1],V=(0,o.useState)(),q=V[0],D=V[1],z=(0,o.useState)([]),G=z[0],Z=z[1],W=function(){var e=te(f().mark((function e(t){var n,r,a,s,o,c,l,d,m,p,h,x,v,b,y,g,j;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=parseFloat(null!==(r=document.querySelector("input#collection-fee").value)&&void 0!==r?r:""),!isNaN(a)){e.next=5;break}return e.abrupt("return",{error:"Invalid royalty fee ratio"});case 5:if(a=Math.trunc(100*a),o=(null!==(s=document.querySelector("input#collection-name").value)&&void 0!==s?s:"").trim()){e.next=10;break}return e.abrupt("return",{error:"Name is blank"});case 10:if(l=(null!==(c=document.querySelector("input#collection-symbol").value)&&void 0!==c?c:"").trim()){e.next=14;break}return e.abrupt("return",{error:"Symbol is blank"});case 14:if(m=(null!==(d=document.querySelector("textarea#collection-description").value)&&void 0!==d?d:"").trim(),h=[parseInt(null!==(p=document.querySelector("input#collection-default-share").value)&&void 0!==p?p:"")].concat(se(G.map((function(e){var t=e.share;return parseInt(t)})))),-1===(x=h.findIndex((function(e){return isNaN(e)||e<0})))){e.next=21;break}return e.abrupt("return",{error:"Invalid share for Creator ".concat(x+1)});case 21:if(100===h.reduce((function(e,t){return e+t}),0)){e.next=23;break}return e.abrupt("return",{error:"Shares doesn't add up to 100"});case 23:if(b=[null!==(v=null===u||void 0===u||null===(n=u.publicKey)||void 0===n?void 0:n.toBase58())&&void 0!==v?v:""].concat(se(G.map((function(e){return e.address})))),-1===(y=b.findIndex((function(e){return!k(e)})))){e.next=28;break}return e.abrupt("return",{error:"Invalid address for Creator ".concat(y+1)});case 28:return e.next=30,fetch(q.dataURL);case 30:return e.next=32,e.sent.blob();case 32:return g=e.sent,j=new File([g],t.toBase58(),{type:q.mimeType,lastModified:+new Date}),e.abrupt("return",{name:o,symbol:l,description:m,royaltyFeeRatio:a,logo:j,creators:b.map((function(e,t){return{address:new i.PublicKey(e),share:h[t]}}))});case 35:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("article",{className:"flex flex-col gap-4 w-96 flex-shrink-0",children:[(0,r.jsxs)("div",{className:"form-control w-full",children:[(0,r.jsx)("label",{className:"label label-text",children:"Collection Name"}),(0,r.jsx)("input",{id:"collection-name",className:"input input-bordered w-full max-w-md",disabled:F,type:"text",placeholder:"Please input the name of the collection"})]}),(0,r.jsxs)("div",{className:"form-control w-full flex flex-row gap-4",children:[(0,r.jsxs)("div",{className:"flex-grow",children:[(0,r.jsx)("label",{className:"label label-text",children:"Symbol"}),(0,r.jsx)("input",{id:"collection-symbol",className:"input input-bordered w-full max-w-md",disabled:F,type:"text",placeholder:"Please input the symbol of the collection"}),(0,r.jsx)("label",{className:"label label-text",children:"Royalty Ratio (%)"}),(0,r.jsxs)("label",{className:"input-group",children:[(0,r.jsx)("input",{id:"collection-fee",className:"input input-bordered w-full max-w-md",disabled:F,type:"number",max:100,min:0,placeholder:"0 to 100",defaultValue:5}),(0,r.jsx)("span",{children:"%"})]})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{className:"label label-text",children:"Icon"}),(0,r.jsx)("div",{className:"flex flex-row gap-2",children:(0,r.jsx)("div",{className:"border border-zinc-300 h-32 w-32 aspect-square flex justify-center items-center rounded-md ".concat(F?"":" cursor-pointer"),onClick:F?void 0:function(){var e=document.createElement("input");e.type="file",e.accept="image/*",e.click(),e.addEventListener("change",(function(){var t,n;((null===(t=e.files)||void 0===t?void 0:t.length)||0)<=0||((n=e.files[0],new Promise((function(e,t){var r=new FileReader;r.onerror=function(e){return t(e.target.error)},r.onload=function(t){return e({mimeType:n.type,dataURL:t.target.result})},r.readAsDataURL(n)}))).then(D),e.remove())}),{once:!0})},children:q?(0,r.jsx)("img",{className:"h-full w-full object-contain",src:q.dataURL,alt:"icon"}):(0,r.jsx)("span",{children:"Upload Logo"})})})]})]}),(0,r.jsxs)("div",{className:"form-control w-full",children:[(0,r.jsx)("label",{className:"label",children:(0,r.jsx)("span",{className:"label-text",children:"Description"})}),(0,r.jsx)("textarea",{id:"collection-description",disabled:F,className:"textarea textarea-bordered leading-relaxed",rows:3,placeholder:"Please input your description to the collection"})]}),(0,r.jsxs)("div",{className:"form-control w-full",children:[(0,r.jsx)("label",{className:"label label-text",children:"Creators"}),(0,r.jsxs)("div",{className:"flex flex-col gap-1 w-full",children:[(0,r.jsxs)("div",{className:"flex flex-row gap-3 items-center",children:[(0,r.jsx)("input",{disabled:!0,className:"block flex-grow input input-bordered input-sm w-full max-w-md",type:"text",defaultValue:null!==(n=null===u||void 0===u||null===(t=u.publicKey)||void 0===t?void 0:t.toBase58())&&void 0!==n?n:""}),(0,r.jsx)("input",{id:"collection-default-share",className:"block w-3/12 input input-bordered input-sm w-full max-w-md appearance-none",type:"number",disabled:F,max:100,min:0,placeholder:"Shares",defaultValue:100}),(0,r.jsx)("button",{className:"btn btn-circle btn-xs",disabled:F,onClick:function(){Z(se(G).concat([{share:"0",address:""}]))},children:(0,r.jsx)(m.G,{icon:p.r8p})})]}),G.map((function(e,t){return(0,r.jsxs)("div",{className:"flex flex-row gap-3 items-center",children:[(0,r.jsx)("input",{className:"block flex-grow input input-bordered input-sm w-full max-w-md",disabled:F,type:"text",onChange:function(e){return function(e,t){var n=se(G);n[e].address=t,Z(n)}(t,e.target.value)},placeholder:"Creator ".concat(t+1," Address")}),(0,r.jsx)("input",{className:"block w-3/12 input input-bordered input-sm w-full max-w-md appearance-none",disabled:F,type:"number",max:100,min:0,onChange:function(e){return function(e,t){var n=se(G);n[e].share=t,Z(n)}(t,e.target.value)},placeholder:"Shares",defaultValue:e.share}),(0,r.jsx)("button",{className:"btn btn-circle btn-xs btn-error",disabled:F,onClick:function(){return function(e){var t=se(G);t.splice(e,1),Z(t)}(t)},children:(0,r.jsx)(m.G,{icon:p.g82,color:"white"})})]},t)}))]})]}),(0,r.jsx)("button",{className:"btn ".concat(F?"loading":""," mt-4 px-8 w-fit"),disabled:F||!u,onClick:function(){var e=u.publicKey;g({}),S({}),E({}),K({}),R({}),U(!0),g({status:X.Loading}),te(f().mark((function t(){var n,r,o,l,d,m,p,b,y,j,w,k,P,C,A;return f().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=i.Keypair.generate(),console.debug("Collection Token:",n.publicKey.toBase58()),t.next=4,W(n.publicKey);case 4:if(!(r=t.sent).error){t.next=8;break}return g({status:X.Error,errorMessage:r.error}),t.abrupt("return");case 8:return g({status:X.Success}),S({status:X.Loading}),o={name:r.name,symbol:r.symbol,description:r.description,seller_fee_basis_points:r.royaltyFeeRatio,image:"",properties:{files:[{uri:n.publicKey.toBase58(),type:q.mimeType}],category:"image",creators:r.creators.map((function(e){return{address:e.address.toBase58(),share:e.share}}))}},l=window.URL,window.URL=$,t.next=15,(0,x.tW)(o,r.logo);case 15:return d=t.sent,window.URL=l,t.prev=18,t.next=21,x.Oc.withSigner(u.signMessage,u.publicKey.toBytes(),{solanaCluster:c.cluster,mintingAgent:"thagki9/candy-machine-toolkit"});case 21:return p=t.sent,t.next=24,p.storePreparedNFT(d);case 24:m=t.sent,t.next=32;break;case 27:return t.prev=27,t.t0=t.catch(18),console.error("Fail to sign:",t.t0),S({status:X.Error,errorMessage:"".concat(t.t0)}),t.abrupt("return");case 32:return console.debug("Metadata Upload:",m),S({status:X.Success,metadataUri:m.metadataGatewayURL,metadataIpfsUri:m.metadataURI}),E({status:X.Loading}),t.t1=ae,t.next=38,Promise.all([B(n.publicKey),L(n.publicKey),(0,v.Am)(n.publicKey,e)]);case 38:return t.t2=t.sent,b=(0,t.t1)(t.t2,3),y=b[0],j=b[1],w=b[2],t.t3=new i.Transaction,t.t4=i.SystemProgram,t.t5=e,t.t6=n.publicKey,t.t7=v.qT.span,t.next=50,a.getMinimumBalanceForRentExemption(v.qT.span);case 50:return t.t8=t.sent,t.t9=v.H_,t.t10={fromPubkey:t.t5,newAccountPubkey:t.t6,space:t.t7,lamports:t.t8,programId:t.t9},t.t11=t.t4.createAccount.call(t.t4,t.t10),t.t12=(0,v.I0)(n.publicKey,0,e,e),t.t13=(0,v.Ek)(e,w,e,n.publicKey),t.t14=(0,v.G7)(n.publicKey,w,e,1,[]),t.t15=(0,h.createCreateMetadataAccountV2Instruction)({metadata:j[0],mint:n.publicKey,mintAuthority:e,payer:e,updateAuthority:e},{createMetadataAccountArgsV2:{data:{symbol:o.symbol,name:o.name,uri:m.metadataGatewayURL,sellerFeeBasisPoints:o.seller_fee_basis_points,creators:r.creators.map((function(e,t){return re({},e,{verified:0===t})})),collection:null,uses:null},isMutable:!0}}),t.t16=(0,h.createCreateMasterEditionV3Instruction)({edition:y[0],metadata:j[0],mint:n.publicKey,mintAuthority:e,updateAuthority:e,payer:e},{createMasterEditionArgs:{maxSupply:0}}),k=t.t3.add.call(t.t3,t.t11,t.t12,t.t13,t.t14,t.t15,t.t16),t.prev=60,t.next=63,a.getLatestBlockhash();case 63:return P=t.sent,k.recentBlockhash=P.blockhash,k.feePayer=e,k.partialSign(n),t.next=69,u.signTransaction(k);case 69:k=t.sent,t.next=76;break;case 72:return t.prev=72,t.t17=t.catch(60),E({status:X.Error,errorMessage:"".concat(t.t17)}),t.abrupt("return");case 76:return E({status:X.Success,collectionNFTLink:(f=n.publicKey.toBase58(),T=c.cluster,"mainnet-beta"===T?"https://explorer.solana.com/address/"+f:"https://explorer.solana.com/address/".concat(f,"?cluster=").concat(T))}),K({status:X.Loading}),t.prev=79,t.next=82,a.sendRawTransaction(k.serialize());case 82:C=t.sent,t.next=89;break;case 85:return t.prev=85,t.t18=t.catch(79),K({status:X.Error,errorMessage:t.t18.message}),t.abrupt("return");case 89:return A=N(C,c.cluster),K({status:X.Loading,txLink:A}),t.prev=91,t.next=94,M(C,a);case 94:t.next=100;break;case 96:return t.prev=96,t.t19=t.catch(91),K({status:X.Error,errorMessage:t.t19.message,txLink:A}),t.abrupt("return");case 100:K({status:X.Success,txLink:A}),R({status:X.Finish}),s(n.publicKey);case 103:case"end":return t.stop()}var f,T}),t,null,[[18,27],[60,72],[79,85],[91,96]])})))().finally((function(){U(!1)}))},children:F?"Creating...":"Create"})]}),(null===y||void 0===y?void 0:y.status)&&(0,r.jsx)("div",{className:"divider divider-horizontal"}),(null===y||void 0===y?void 0:y.status)&&(0,r.jsxs)("ul",{className:"tasks w-fit",children:[(0,r.jsxs)("li",{className:"task","data-status":null===y||void 0===y?void 0:y.status,children:[(0,r.jsx)("div",{children:"Pack collection NFT metadata"}),y.errorMessage&&(0,r.jsx)("div",{className:"error-message",children:y.errorMessage})]}),(0,r.jsxs)("li",{className:"task","data-status":null===w||void 0===w?void 0:w.status,children:[(0,r.jsx)("div",{children:"Sign and uploading collection metadata"}),(null===w||void 0===w?void 0:w.errorMessage)&&(0,r.jsx)("div",{className:"error-message",children:w.errorMessage}),(null===w||void 0===w?void 0:w.metadataUri)&&(0,r.jsx)("a",{className:"block underline",href:w.metadataUri,target:"_blank",rel:"noreferrer",children:"Metadata"}),(null===w||void 0===w?void 0:w.metadataIpfsUri)&&(0,r.jsx)("a",{className:"block underline",href:w.metadataIpfsUri,target:"_blank",rel:"noreferrer",children:"Metadata (IPFS)"})]}),(0,r.jsxs)("li",{className:"task","data-status":null===C||void 0===C?void 0:C.status,children:[(0,r.jsx)("div",{children:"Sign for minting of collection NFT"}),(null===C||void 0===C?void 0:C.errorMessage)&&(0,r.jsx)("div",{className:"error-message",children:C.errorMessage}),(null===C||void 0===C?void 0:C.collectionNFTLink)&&(0,r.jsx)("a",{className:"block underline",href:C.collectionNFTLink,target:"_blank",rel:"noreferrer",children:"Collection NFT"})]}),(0,r.jsxs)("li",{className:"task","data-status":null===T||void 0===T?void 0:T.status,children:[(0,r.jsx)("div",{children:"Waiting for transaction confirmation"}),(null===T||void 0===T?void 0:T.errorMessage)&&(0,r.jsx)("div",{className:"error-message",children:T.errorMessage}),(null===T||void 0===T?void 0:T.txLink)&&(0,r.jsx)("a",{className:"block underline",href:T.txLink,target:"_blank",rel:"noreferrer",children:"Transaction"})]}),(0,r.jsxs)("li",{className:"task","data-status":null===I||void 0===I?void 0:I.status,children:[(0,r.jsx)("div",{children:"Finish"}),(null===I||void 0===I?void 0:I.errorMessage)&&(0,r.jsx)("div",{className:"error-message",children:I.errorMessage})]})]})]})}!function(e){e.Loading="loading",e.Success="success",e.Error="error",e.Finish="finish"}(X||(X={}));var ce=n(56337);function le(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ue(e,t,n,r,a,s,o){try{var i=e[s](o),c=i.value}catch(l){return void n(l)}i.done?t(c):Promise.resolve(c).then(r,a)}function de(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var s=e.apply(t,n);function o(e){ue(s,r,a,o,i,"next",e)}function i(e){ue(s,r,a,o,i,"throw",e)}o(void 0)}))}}function fe(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,s=[],o=!0,i=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(s.push(r.value),!t||s.length!==t);o=!0);}catch(c){i=!0,a=c}finally{try{o||null==n.return||n.return()}finally{if(i)throw a}}return s}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return le(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return le(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function me(e){var t=e.connection,n=(e.id,(0,o.useContext)(l.I).settings),a=e.collectionTokenPublicKey,s=(0,b.Os)(),c=(0,o.useState)(!1),u=c[0],d=c[1],m=(0,o.useState)(),p=m[0],x=m[1],v=(0,o.useState)(),y=v[0],g=v[1],j=(0,o.useState)(),w=j[0],S=j[1],P=(0,o.useState)(),C=P[0],E=P[1],T=function(){var e=de(f().mark((function e(){var t,n,r,a,s,o;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=(null!==(r=null===(t=document.getElementById("collection-token-address"))||void 0===t?void 0:t.value)&&void 0!==r?r:"").trim(),o=(null!==(s=null===(n=document.getElementById("candy-machine-address"))||void 0===n?void 0:n.value)&&void 0!==s?s:"").trim(),k(a)){e.next=7;break}return e.abrupt("return",{error:"Invalid collection token address"});case 7:if(k(o)){e.next=9;break}return e.abrupt("return",{error:"Invalid candy machine address"});case 9:return e.abrupt("return",{collectionTokenPublicKey:new i.PublicKey(a),candyMachinePublicKey:new i.PublicKey(o)});case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,o.useEffect)((function(){var e=document.getElementById("collection-token-address");e&&a&&(e.value=a.toBase58())}),[a]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("article",{className:"flex flex-col gap-4 w-96 flex-shrink-0",children:[(0,r.jsxs)("div",{className:"form-control w-full",children:[(0,r.jsxs)("div",{className:"form-control w-full",children:[(0,r.jsx)("label",{className:"label label-text",children:"Collection Token Address"}),(0,r.jsx)("input",{id:"collection-token-address",disabled:u,type:"text",placeholder:"The token that contains your collection's metadata",className:"input input-bordered w-full max-w-md"})]}),(0,r.jsx)("label",{className:"label label-text",children:"Candy Machine Address"}),(0,r.jsx)("input",{id:"candy-machine-address",disabled:u,type:"text",placeholder:"The address to your Candy Machine V2",className:"input input-bordered w-full max-w-md"})]}),(0,r.jsx)("button",{className:"btn ".concat(u?"loading":""," mt-4 px-8 w-fit"),disabled:u||!s,onClick:function(){var e=s.publicKey;x({status:X.Loading}),g({}),S({}),E({}),d(!0),de(f().mark((function r(){var a,o,c,l,u,d,m,p,v,b,y,j,w,k,P;return f().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,T();case 2:if(!(a=r.sent).error){r.next=6;break}return x({status:X.Error,errorMessage:a.error}),r.abrupt("return");case 6:return r.t0=fe,r.next=9,Promise.all([B(a.collectionTokenPublicKey),L(a.collectionTokenPublicKey),F(a.candyMachinePublicKey)]);case 9:return r.t1=r.sent,o=(0,r.t0)(r.t1,3),c=o[0],l=o[1],u=o[2],r.next=16,V(a.collectionTokenPublicKey,u[0]);case 16:return d=r.sent,r.prev=18,r.t2=fe,r.next=23,Promise.all([h.Metadata.fromAccountAddress(t,l[0]),h.Edition.fromAccountAddress(t,c[0]),ce.CandyMachine.fromAccountAddress(t,a.candyMachinePublicKey),ce.CollectionPDA.fromAccountAddress(t,u[0])]);case 23:r.t3=r.sent,y=(0,r.t2)(r.t3,4),m=y[0],p=y[1],v=y[2],b=y[3],console.debug("Candy Machine:",v),console.debug("Metadata:",m),console.debug("Edition:",p),console.debug("Collection:",b),r.next=40;break;case 36:return r.prev=36,r.t4=r.catch(18),x({status:X.Error,errorMessage:"".concat(r.t4)}),r.abrupt("return");case 40:if(v.authority.equals(e)){r.next=43;break}return x({status:X.Error,errorMessage:"You aren't allowed to update this Candy Machine",candyMachine:v,candyMachineCollection:b,metadata:m,edition:p}),r.abrupt("return");case 43:if(m.updateAuthority.equals(e)){r.next=46;break}return x({status:X.Error,errorMessage:"You aren't allowed to use this collection metadata NFT",candyMachine:v,candyMachineCollection:b,metadata:m,edition:p}),r.abrupt("return");case 46:if(p.key===h.Key.MasterEditionV1||p.key===h.Key.MasterEditionV2){r.next=49;break}return x({status:X.Error,errorMessage:"This token is not the MasterEdition",candyMachine:v,candyMachineCollection:b,metadata:m,edition:p}),r.abrupt("return");case 49:return x({status:X.Success,candyMachine:v,candyMachineCollection:b,metadata:m,edition:p}),g({status:X.Loading}),j=(new i.Transaction).add((0,ce.createSetCollectionInstruction)({candyMachine:a.candyMachinePublicKey,authority:e,collectionPda:u[0],payer:e,metadata:l[0],mint:a.collectionTokenPublicKey,edition:c[0],collectionAuthorityRecord:d[0],tokenMetadataProgram:A})),r.prev=52,r.next=55,t.getLatestBlockhash();case 55:return w=r.sent,j.recentBlockhash=w.blockhash,j.feePayer=e,r.next=60,s.signTransaction(j);case 60:j=r.sent,r.next=67;break;case 63:return r.prev=63,r.t5=r.catch(52),g({status:X.Error,errorMessage:"".concat(r.t5)}),r.abrupt("return");case 67:return g({status:X.Success}),S({status:X.Loading}),r.prev=70,r.next=73,t.sendRawTransaction(j.serialize(),{skipPreflight:!0});case 73:k=r.sent,r.next=80;break;case 76:return r.prev=76,r.t6=r.catch(70),S({status:X.Error,errorMessage:r.t6.message}),r.abrupt("return");case 80:return P=N(k,n.cluster),S({status:X.Loading,txLink:P}),r.prev=82,r.next=85,M(k,t);case 85:r.next=91;break;case 87:return r.prev=87,r.t7=r.catch(82),S({status:X.Error,errorMessage:r.t7.message,txLink:P}),r.abrupt("return");case 91:S({status:X.Success,txLink:P}),E({status:X.Finish});case 93:case"end":return r.stop()}}),r,null,[[18,36],[52,63],[70,76],[82,87]])})))().finally((function(){return d(!1)}))},children:u?"Executing...":"Execute"})]}),(null===p||void 0===p?void 0:p.status)&&(0,r.jsx)("div",{className:"divider divider-horizontal"}),(null===p||void 0===p?void 0:p.status)&&(0,r.jsxs)("ul",{className:"tasks",children:[(0,r.jsxs)("li",{className:"task","data-status":null===p||void 0===p?void 0:p.status,children:[(0,r.jsx)("div",{children:"Getting Collection Token Metadata & Edition"}),(null===p||void 0===p?void 0:p.errorMessage)&&(0,r.jsx)("div",{className:"error-message",children:p.errorMessage}),(null===p||void 0===p?void 0:p.candyMachine)&&(null===p||void 0===p?void 0:p.candyMachineCollection)&&(0,r.jsxs)("div",{className:"mt-2 grid grid-cols-[auto_1fr] grid-rows-4 gap-1 text-sm align-middle",children:[(0,r.jsx)("header",{className:"place-self-center font-bold col-span-2 text-base",children:"Candy Machine"}),(0,r.jsx)("header",{className:"text-right font-bold",children:"Symbol:"}),(0,r.jsx)("article",{children:p.candyMachine.data.symbol}),(0,r.jsx)("header",{className:"text-right font-bold",children:"Authority:"}),(0,r.jsx)("article",{children:p.candyMachine.authority.toBase58()}),(0,r.jsx)("header",{className:"text-right font-bold",children:"Collection:"}),(0,r.jsx)("article",{children:p.candyMachineCollection.mint.toBase58()})]}),(null===p||void 0===p?void 0:p.candyMachine)&&(null===p||void 0===p?void 0:p.metadata)&&(null===p||void 0===p?void 0:p.edition)&&(0,r.jsx)("div",{className:"divider my-0"}),(null===p||void 0===p?void 0:p.metadata)&&(null===p||void 0===p?void 0:p.edition)&&(0,r.jsxs)("div",{className:"grid grid-cols-[auto_1fr] grid-rows-5 gap-1 text-sm align-middle",children:[(0,r.jsx)("header",{className:"place-self-center font-bold col-span-2 text-base",children:"Collection Metadata"}),(0,r.jsx)("header",{className:"text-right font-bold",children:"Name:"}),(0,r.jsx)("article",{children:p.metadata.data.name}),(0,r.jsx)("header",{className:"text-right font-bold",children:"Update Authority:"}),(0,r.jsx)("article",{children:p.metadata.updateAuthority.toBase58()}),(0,r.jsx)("header",{className:"text-right font-bold",children:"Master Edition:"}),(0,r.jsx)("article",{children:p.edition.key===h.Key.MasterEditionV1||p.edition.key===h.Key.MasterEditionV2?"V1":"N/A"})]})]}),(0,r.jsxs)("li",{className:"task","data-status":null===y||void 0===y?void 0:y.status,children:[(0,r.jsx)("div",{children:"Sign for minting of collection NFT"}),(null===y||void 0===y?void 0:y.errorMessage)&&(0,r.jsx)("div",{className:"error-message",children:y.errorMessage})]}),(0,r.jsxs)("li",{className:"task","data-status":null===w||void 0===w?void 0:w.status,children:[(0,r.jsx)("div",{children:"Waiting for transaction confirmation"}),(null===w||void 0===w?void 0:w.errorMessage)&&(0,r.jsx)("div",{className:"error-message",children:w.errorMessage}),(null===w||void 0===w?void 0:w.txLink)&&(0,r.jsx)("a",{className:"block underline",href:w.txLink,target:"_blank",rel:"noreferrer",children:"Transaction"})]}),(0,r.jsxs)("li",{className:"task","data-status":null===C||void 0===C?void 0:C.status,children:[(0,r.jsx)("div",{children:"Finish"}),(null===C||void 0===C?void 0:C.errorMessage)&&(0,r.jsx)("div",{className:"error-message",children:C.errorMessage})]})]})]})}var pe=function(){var e=(0,o.useContext)(l.I).settings,t=(0,o.useMemo)((function(){return new i.Connection(e.rpcUrl)}),[e]),n=(0,o.useState)(),a=n[0],d=n[1];return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s(),{children:(0,r.jsx)("title",{children:"Set Collection - Candy Machine V2 Toolkit"})}),(0,r.jsxs)(c.Z,{children:[(0,r.jsx)(u,{id:"step-1-create-collection",title:"Step 1. Create collection metadata NFT",description:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{children:"Before setting a collection for a candy machine, you need to mint an NFT which will be used as the candy machine's collection."}),(0,r.jsx)("div",{children:"Skip this step if you already have one."})]}),children:(0,r.jsx)(ie,{connection:t,onCreated:function(e){var t;null===(t=document.getElementById("#step-2-create-collection"))||void 0===t||t.scrollIntoView(),d(e)}})}),(0,r.jsx)("div",{className:"divider"}),(0,r.jsx)(u,{id:"step-2-create-collection",title:"Step 2: Set Collection",description:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{children:"Add a collection to the candy machine. You need to be the authority of both collection token and candy machine."}),(0,r.jsxs)("div",{children:["This only works for tokens that are not yet minted. For minted tokens, ",(0,r.jsx)("span",{className:"italic font-semibold",children:"Set And Verify Collection"})," ","should be used."]})]}),children:(0,r.jsx)(me,{connection:t,collectionTokenPublicKey:a})})]})]})}}},function(e){e.O(0,[523,572,17,695,669,774,888,179],(function(){return t=68518,e(e.s=t);var t}));var t=e.O();_N_E=t}]);