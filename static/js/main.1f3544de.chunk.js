(this["webpackJsonptic-tac-toe"]=this["webpackJsonptic-tac-toe"]||[]).push([[0],[,,function(e,t,n){},,,function(e,t,n){e.exports=n(11)},,,,,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(4),o=n.n(c),s=(n(10),n(1));n(2);var l=function(e){var t=e.squareStyle,n=e.click,a=e.value,c=t?t+" square":"square";return r.a.createElement("button",{className:c,onClick:n},a)};var u=function(e){var t=Object(a.useState)(e.squares),n=Object(s.a)(t,2),c=n[0],o=n[1],u=Object(a.useState)(e.step%2),i=Object(s.a)(u,2),m=i[0],f=i[1],d=Object(a.useState)(-1),v=Object(s.a)(d,2),p=v[0],b=v[1],g=e.size,h=e.save;Object(a.useEffect)((function(){console.log("Sqqqq"),o(e.squares),f(e.step%2===0)}),[e.restart,e.squares,e.step]);var E,y=function(e,t,n,a){for(var r=n,c=[],o=Math.floor(t/r),s=Math.floor(t%r),l=[],u=0;u<e.length;u+=n)l.push(e.slice(u,n+u));for(var i=0;i<r;i++)if(e[t]&&l[o][i]===e[t])c.push(r*o+i);else if(0!==c.length)break;if(c.length>=a)return{msg:e[t],line:c};c=[];for(var m=0;m<r;m++)if(e[t]&&l[m][s]===e[t])c.push(r*m+s);else if(0!==c.length)break;if(c.length>=a)return{msg:e[t],line:c};c=[];var f=0,d=0;o>s?f=o-s:d=s-o;for(var v=0;v<n&&(f+v<n&&d+v<n);v++)if(e[t]&&l[f+v][d+v]===e[t])c.push((f+v)*r+d+v);else if(0!==c.length)break;if(c.length>=a)return{msg:e[t],line:c};c=[],d=0,f=0,o+s>n-1?(d=n-1,f=o+s-(n-1)):d=o+s;for(var p=0;p<n&&(f+p<n&&d-p>=0);p++)if(e[t]&&l[f+p][d-p]===e[t])c.push((f+p)*n+d-p);else if(0!==c.length)break;if(c.length>=a)return{msg:e[t],line:c};if(function(e){return e.every((function(e){return null!==e}))}(e)){return{msg:"===== Draw ====="}}return null},k=Array.from(c),O=y(k,p,g,3);return O?O.msg.length>2?E=O.msg:(E="Winner: "+O.msg,console.log(O.line)):E="Next player: "+(m?"X":"O"),r.a.createElement("div",null,r.a.createElement("div",{className:"status"},E),r.a.createElement("div",{style:function(e){return{justifyContent:"center",display:"grid",gridTemplateColumns:"repeat(".concat(e,",4em)"),gridTemplateRows:"repeat(".concat(e,",4em)")}}(g)},c.map((function(e,t){return r.a.createElement(l,{key:t,value:e,click:function(){return function(e){var t=Array.from(c).slice();y(t,p,g,3)||t[e]||(t[e]=m?"X":"O",o(t),f(!m),b(e),h({squares:t,pos:e}))}(t)},squareStyle:O&&O.line&&O.line.includes(t)?"active":null})}))))};var i=function(){var e=Object(a.useState)(3),t=Object(s.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(!1),l=Object(s.a)(o,2),i=l[0],m=l[1],f=Object(a.useState)(0),d=Object(s.a)(f,2),v=d[0],p=d[1],b=Object(a.useState)([{squares:Array(9).fill(null),pos:-1}]),g=Object(s.a)(b,2),h=g[0],E=g[1],y=function(e){c(e),m(i),E([{squares:Array(e*e).fill(null),pos:-1}]),p(0)},k=h[v].squares;return k.every((function(e){return null===e}))&&(k=h[0].squares),r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("h2",null," TIC - TAC - TOE GAME "),r.a.createElement("div",null,r.a.createElement("button",{className:"restart-btn",onClick:function(){y(n)}}," Restart "),r.a.createElement("div",{className:"dropdown"},r.a.createElement("button",{className:"dropbtn"},"Board Size"),r.a.createElement("div",{className:"dropdown-content"},r.a.createElement("button",{onClick:function(){y(3)}},"3x3"),r.a.createElement("button",{onClick:function(){y(4)}},"4x4"),r.a.createElement("button",{onClick:function(){y(5)}},"5x5"))),r.a.createElement("div",{className:"dropdown"},r.a.createElement("button",{className:"dropbtn"},"History"),r.a.createElement("div",{className:"dropdown-content"},h.map((function(e,t){var a=e.pos,c="";return-1!==a&&(c+=" (".concat(Math.floor(a/n),", ").concat(a%n,")")),r.a.createElement("button",{key:t,onClick:function(){!function(e){p(e),m(!i)}(t)}},v===t?r.a.createElement("b",null,"Go to move #",t," ",c):"Go to move #".concat(t," ").concat(c))})))),r.a.createElement("select",{id:"sort",onChange:function(e){return function(e){var t=Array.from(h),n=[];n="Ascend"===e.target.value?t.sort((function(e,t){return e.pos-t.pos})):"Descend"===e.target.value?t.sort((function(e,t){return t.pos-e.pos})):t,E(n)}(e)}},r.a.createElement("option",{name:"none",defaultValue:"None"},"None"),r.a.createElement("option",{name:"Ascend",value:"Ascend"},"Ascend"),r.a.createElement("option",{ame:"Descend",value:"Descend"},"Descend")))),r.a.createElement("div",{className:"game"},r.a.createElement("div",{className:"game-board"},r.a.createElement(u,{squares:k,size:n,restart:i,save:function(e){var t=Array.from(h).slice(0,v+1);t.push(e),E(t),p(t.length-1)},step:v}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(i,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[5,1,2]]]);
//# sourceMappingURL=main.1f3544de.chunk.js.map