(this["webpackJsonplomakkeet_2.6-2.10"]=this["webpackJsonplomakkeet_2.6-2.10"]||[]).push([[0],{41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(0),o=t(2),a=t(16),r=t.n(a),i=t(17),u=t(3),s=t(5),l=t.n(s),d="/api/persons",f=function(){return l.a.get(d).then((function(e){return e.data}))},j=function(e){return l.a.post(d,e).then((function(e){return e.data}))},b=function(e,n){return console.log("useri: ",e,"useriID: ",n),l.a.put("".concat(d,"/").concat(n),e).then((function(e){return e.data}))},m=function(e){return l.a.delete("".concat(d,"/").concat(e)).then((function(e){return e.data}))},h=function(e){var n=e.message,t=e.messageType;return null===n?null:(console.log("Notification component called with message: ",n),console.log("Message type is: ",t),"success"===t?Object(c.jsx)("div",{className:"successNotification",children:n}):"failure"===t?Object(c.jsx)("div",{className:"failureNotification",children:n}):"neutral"===t?Object(c.jsx)("div",{}):void 0)},O=function(e){var n=e.newFilter,t=e.handleFilterChange;return Object(c.jsxs)("div",{children:["filter shown with ",Object(c.jsx)("input",{value:n,onChange:t})]})},g=function(e){var n=e.newName,t=e.handleNameChange,o=e.newNumber,a=e.handleNumberChange,r=e.addPerson;return Object(c.jsxs)("form",{children:[Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:n,onChange:t})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{value:o,onChange:a})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{onClick:r,type:"submit",children:"add"})})]})},v=function(e){var n=e.persons.filter((function(n){return n.name.toLowerCase().includes(e.filter.toLowerCase())}));return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)("div",{children:n.map((function(n){return Object(c.jsx)("p",{children:Object(c.jsxs)("p",{children:[n.name," ",n.number,Object(c.jsx)("button",{onClick:function(){return e.onDeleteButton(n.name)},children:"delete"})]})},n.name)}))})]})},p=function(){var e=Object(o.useState)([]),n=Object(u.a)(e,2),t=n[0],a=n[1],r=Object(o.useState)(""),s=Object(u.a)(r,2),l=s[0],d=s[1],p=Object(o.useState)(""),x=Object(u.a)(p,2),w=x[0],C=x[1],N=Object(o.useState)(""),k=Object(u.a)(N,2),y=k[0],T=k[1],D=Object(o.useState)(""),S=Object(u.a)(D,2),F=S[0],B=S[1],E=Object(o.useState)("neutral"),I=Object(u.a)(E,2),P=I[0],J=I[1];Object(o.useEffect)((function(){f().then((function(e){a(e)}))}),[]);return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(h,{message:F,messageType:P}),Object(c.jsx)(O,{newFilter:y,handleFilterChange:function(e){T(e.target.value)}}),Object(c.jsx)("h3",{children:"add a new"}),Object(c.jsx)(g,{newName:l,handleNameChange:function(e){d(e.target.value)},newNumber:w,handleNumberChange:function(e){C(e.target.value)},addPerson:function(e){e.preventDefault();var n={name:l,number:w},c=t.map((function(e){return e})),o=c.find((function(e){return e.name===l})),r=c.find((function(e){return e.number===w}));o&&o.number!==n.number&&(window.confirm("".concat(l," is already added to phonebook, replace the old number with a new one?"))?b(n,o.id).then((function(e){console.log("response : ",e);var c=Object(i.a)(t);c[t.indexOf(o)].number=w,a(c),d(""),C(""),B("Changed number of ".concat(n.name)),J("success"),setTimeout((function(){J("neutral")}),3e3),console.log("message: ",F)})).catch((function(e){console.log("catched error: ",e),a(t.filter((function(e){return e.id!==o.id}))),B("Information of ".concat(n.name," has already been removed from server")),J("failure"),setTimeout((function(){J("neutral")}),3e3),d(""),C("")})):(d(""),C("")));r&&window.alert("".concat(w," is already added to phonebook")),o||j(n).then((function(e){a(t.concat(e)),d(""),C(""),B("Added ".concat(n.name)),J("success"),setTimeout((function(){J("neutral")}),3e3),console.log("message: ",F)})).catch((function(e){console.log("frontti errori mongooselta: ",e.response.data),B("Errori: ".concat(e)),J("failure"),setTimeout((function(){J("neutral")}),3e3)}))}}),Object(c.jsx)(v,{persons:t,onDeleteButton:function(e){if(window.confirm("Delete ".concat(e," ?"))){var n=t.find((function(n){return n.name===e}));if(n){var c=t.filter((function(e){return e!==n}));console.log("new arr: ",c),m(n.id).then((function(e){B("Deleted ".concat(n.name)),J("success"),setTimeout((function(){J("neutral")}),3e3),console.log("message: ",F),console.log(e)})),a(c)}}},filter:y})]})};t(41);r.a.render(Object(c.jsx)(p,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.2717c912.chunk.js.map