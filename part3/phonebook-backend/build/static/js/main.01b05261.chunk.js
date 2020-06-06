(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{18:function(e,n,t){e.exports=t(41)},40:function(e,n,t){},41:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),c=t(16),r=t.n(c),u=t(17),i=t(6),l=t(2),s=function(e){var n=e.person,t=e.personDeleteOnClick;return o.a.createElement("div",null,n.name," ",n.number," ",o.a.createElement("button",{onClick:function(){return t(n)}},"delete"))},m=function(e){var n=e.persons,t=e.filterName,a=e.personDeleteOnClick;return o.a.createElement("div",null,n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return o.a.createElement(s,{key:e.id,person:e,personDeleteOnClick:a})})))},f=function(e){var n=e.filterName,t=e.filterOnChange;return o.a.createElement("div",null,"filter shown with: ",o.a.createElement("input",{value:n,onChange:t}))},d=function(e){var n=e.newName,t=e.newNumber,a=e.personOnSubmit,c=e.nameOnChange,r=e.numberOnChange;return o.a.createElement("form",{onSubmit:a},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:n,onChange:c})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{value:t,onChange:r})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},b=t(4),p=t.n(b),h="/api/persons",v=function(){return p.a.get(h)},g=function(e){return p.a.post(h,e)},O=function(e){return p.a.delete("".concat(h,"/").concat(e))},E=function(e){return console.log(e),p.a.put("".concat(h,"/").concat(e.id),e)},C=function(e){var n=e.errorMessage;return n&&n.message?o.a.createElement("div",{className:"notification ".concat(n.isPositive?"success":"error")},n.message):null},w=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],c=n[1],r=Object(a.useState)(""),s=Object(l.a)(r,2),b=s[0],p=s[1],h=Object(a.useState)(""),w=Object(l.a)(h,2),j=w[0],k=w[1],S=Object(a.useState)(""),N=Object(l.a)(S,2),P=N[0],y=N[1],D=Object(a.useState)(null),J=Object(l.a)(D,2),L=J[0],M=J[1];Object(a.useEffect)((function(){v().then((function(e){c(e.data)})).catch((function(e){x({message:"Could not fetch persons",isPositive:!1}),console.log("Could not fetch persons",e)}))}),[]);var x=function(e){M(e),setTimeout((function(){M(null)}),5e3)};return o.a.createElement("div",null,o.a.createElement("h1",null,"Phonebook"),o.a.createElement(C,{errorMessage:L}),o.a.createElement(f,{filterName:P,filterOnChange:function(e){y(e.target.value)}}),o.a.createElement("h2",null,"Add a new person"),o.a.createElement(d,{newName:b,newNumber:j,personOnSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name===b}));if(n){if(window.confirm("".concat(b," is already added to phonebook, \n      replace the old number with a new one?"))){var a=Object(i.a)(Object(i.a)({},n),{},{number:j});E(a).then((function(){c(t.map((function(e){return e.id===n.id?a:e}))),x({message:"Successfully updated ".concat(a.name,"'s number"),isPositive:!0}),p(""),k("")})).catch((function(e){x({message:"Could not update ".concat(n.name,"'s number"),isPositive:!1}),console.log("Could not update ".concat(n.name,"'s number"),e)}))}}else g({name:b,number:j}).then((function(e){c([].concat(Object(u.a)(t),[e.data])),x({message:"Successfully create ".concat(b,"'s number"),isPositive:!0}),p(""),k("")})).catch((function(e){x({message:"Could not add ".concat(b),isPositive:!1}),console.log("Could not add ".concat(b),e)}))},nameOnChange:function(e){p(e.target.value)},numberOnChange:function(e){k(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(m,{persons:t,filterName:P,personDeleteOnClick:function(e){window.confirm("Delete ".concat(e.name))&&O(e.id).then((function(){c(t.filter((function(n){return n.id!==e.id}))),x({message:"Successfully deleted ".concat(e.name),isPositive:!0})})).catch((function(n){x({message:"Could not delete ".concat(e.name),isPositive:!1}),console.log("Could not delete ".concat(e.name),n)}))}}))};t(40);r.a.render(o.a.createElement(w,null),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.01b05261.chunk.js.map