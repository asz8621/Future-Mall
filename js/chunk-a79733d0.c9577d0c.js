(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a79733d0"],{"159b":function(e,t,r){var n=r("da84"),o=r("fdbc"),c=r("785a"),a=r("17c2"),s=r("9112"),i=function(e){if(e&&e.forEach!==a)try{s(e,"forEach",a)}catch(t){e.forEach=a}};for(var l in o)o[l]&&i(n[l]&&n[l].prototype);i(c)},"17c2":function(e,t,r){"use strict";var n=r("b727").forEach,o=r("a640"),c=o("forEach");e.exports=c?[].forEach:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}},"290f":function(e,t,r){},"4b50":function(e,t,r){e.exports=r.p+"img/loading.470fd1db.png"},"574d":function(e,t,r){"use strict";r.r(t);r("b0c0");var n=r("7a23"),o=r("4b50"),c=r.n(o),a=function(e){return Object(n["D"])("data-v-370de9ae"),e=e(),Object(n["B"])(),e},s=a((function(){return Object(n["h"])("div",{class:"rotationLoading"},[Object(n["h"])("img",{src:c.a,alt:"loading",class:"img-fluid"})],-1)})),i={class:"return containerTop g-1","data-aos":"zoom-in"},l=a((function(){return Object(n["h"])("h1",{class:"pageTitle position-relative text-center mb-5 p-2"},[Object(n["h"])("span",{class:"fs-2"},"Return Request Form"),Object(n["h"])("br"),Object(n["h"])("span",{class:"fs-4"},"退貨申請表")],-1)})),d={class:"returnContent"},u={class:"mb-3"},f={class:"row g-3"},m={class:"col-md-6 position-relative"},b=a((function(){return Object(n["h"])("small",{class:"link-secondary"},"查詢訂單編號",-1)})),h=a((function(){return Object(n["h"])("label",{for:"orderId",class:"form-label"},"訂單編號",-1)})),O={class:"col-md-6"},j=a((function(){return Object(n["h"])("label",{for:"username",class:"form-label"},"姓名",-1)})),p={class:"col-md-6"},v=a((function(){return Object(n["h"])("label",{for:"phone",class:"form-label"},"電話",-1)})),g={class:"col-md-6"},k=a((function(){return Object(n["h"])("label",{for:"email",class:"form-label"},"信箱",-1)})),x={class:"col-12"},y=a((function(){return Object(n["h"])("label",{for:"message",class:"form-label"},"退貨原因",-1)})),I=a((function(){return Object(n["h"])("div",{class:"col-6 mx-auto"},[Object(n["h"])("button",{type:"submit",class:"btn btn-primary fw-bold fs-5 w-100 mt-3"}," 送出申請表 ")],-1)})),V={key:1,class:"fs-4 p-3"};function w(e,t,r,o,c,a){var w=Object(n["K"])("Loading"),A=Object(n["K"])("router-link"),E=Object(n["K"])("Field"),S=Object(n["K"])("error-message"),T=Object(n["K"])("Form");return Object(n["A"])(),Object(n["g"])(n["a"],null,[Object(n["k"])(w,{active:c.isLoading,"onUpdate:active":t[0]||(t[0]=function(e){return c.isLoading=e}),"z-index":9999},{default:Object(n["Y"])((function(){return[s]})),_:1},8,["active"]),Object(n["h"])("div",i,[l,Object(n["h"])("div",d,[Object(n["k"])(n["b"],{name:"zoom-in",mode:"out-in"},{default:Object(n["Y"])((function(){return[c.isSuccess?(Object(n["A"])(),Object(n["g"])("p",V," 退貨申請表已送出，請等待 1 ~ 3 個工作天(不含假日)會有專人聯絡您處理退貨退款相關事宜， 感謝您對 Future Mall 的支持。 ")):(Object(n["A"])(),Object(n["e"])(T,{key:0,onSubmit:a.sendReturn,ref:"returnForm"},{default:Object(n["Y"])((function(e){var r=e.errors;return[Object(n["h"])("div",u,[Object(n["h"])("div",f,[Object(n["h"])("div",m,[Object(n["k"])(A,{to:"/checkingOrder",target:"_blank",class:"position-absolute top-0 end-0 me-2"},{default:Object(n["Y"])((function(){return[b]})),_:1}),h,Object(n["k"])(E,{id:"orderId",name:"orderId",type:"text",class:Object(n["s"])(["form-control focusNone",{"is-invalid":r["orderId"]}]),placeholder:"請輸入訂單編號",rules:a.checkOrderId,modelValue:c.form.orderId,"onUpdate:modelValue":t[1]||(t[1]=function(e){return c.form.orderId=e}),modelModifiers:{trim:!0}},null,8,["class","rules","modelValue"]),r?(Object(n["A"])(),Object(n["e"])(S,{key:0,name:"orderId",class:"invalid-feedback errorText text-persimmon"})):Object(n["f"])("",!0)]),Object(n["h"])("div",O,[j,Object(n["k"])(E,{id:"username",name:"username",type:"text",class:Object(n["s"])(["form-control focusNone",{"is-invalid":r["username"]}]),placeholder:"請輸入姓名",rules:"required",modelValue:c.form.name,"onUpdate:modelValue":t[2]||(t[2]=function(e){return c.form.name=e}),modelModifiers:{trim:!0}},null,8,["class","modelValue"]),r?(Object(n["A"])(),Object(n["e"])(S,{key:0,name:"username",class:"invalid-feedback errorText text-persimmon"})):Object(n["f"])("",!0)]),Object(n["h"])("div",p,[v,Object(n["k"])(E,{id:"phone",name:"phone",type:"tel",class:Object(n["s"])(["form-control focusNone",{"is-invalid":r["phone"]}]),placeholder:"請輸入電話",rules:"numeric|required",modelValue:c.form.tel,"onUpdate:modelValue":t[3]||(t[3]=function(e){return c.form.tel=e}),modelModifiers:{trim:!0}},null,8,["class","modelValue"]),r?(Object(n["A"])(),Object(n["e"])(S,{key:0,name:"phone",class:"invalid-feedback errorText text-persimmon"})):Object(n["f"])("",!0)]),Object(n["h"])("div",g,[k,Object(n["k"])(E,{id:"email",name:"email",type:"email",class:Object(n["s"])(["form-control focusNone",{"is-invalid":r["email"]}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:c.form.email,"onUpdate:modelValue":t[4]||(t[4]=function(e){return c.form.email=e}),modelModifiers:{trim:!0}},null,8,["class","modelValue"]),r?(Object(n["A"])(),Object(n["e"])(S,{key:0,name:"email",class:"invalid-feedback errorText text-persimmon"})):Object(n["f"])("",!0)]),Object(n["h"])("div",x,[y,Object(n["k"])(E,{id:"message",name:"message",as:"textarea",class:Object(n["s"])(["form-control focusNone",{"is-invalid":r["message"]}]),placeholder:"請輸入退貨原因",rows:"5",rules:"required",modelValue:c.form.message,"onUpdate:modelValue":t[5]||(t[5]=function(e){return c.form.message=e}),modelModifiers:{trim:!0}},null,8,["class","modelValue"]),r?(Object(n["A"])(),Object(n["e"])(S,{key:0,name:"message",class:"invalid-feedback errorText text-persimmon"})):Object(n["f"])("",!0)]),I])])]})),_:1},8,["onSubmit"]))]})),_:1})])])],64)}r("7db0"),r("d3b7"),r("99af"),r("159b");var A={data:function(){return{orders:[],ordersId:[],isLoading:!1,isSuccess:!1,form:{orderId:"",name:"",email:"",tel:"",message:""}}},computed:{},created:function(){this.getOrders()},methods:{sendReturn:function(){var e=this;this.$refs.returnForm.validate().then((function(t){t.valid&&(e.isSuccess=!0,e.form={orderId:"",name:"",email:"",tel:"",message:""})}))},checkOrderId:function(){var e=this,t=this.ordersId.find((function(t){return t===e.form.orderId}));return!!t||"請確認您的訂單編號"},getOrders:function(){var e=this;this.isLoading=!0;var t="".concat("https://vue3-course-api.hexschool.io/","api/").concat("ch-api","/orders");this.$http.get(t).then((function(t){t.data.success&&(e.orders=t.data.orders,e.orders.forEach((function(t){e.ordersId.push(t.id)})),e.isLoading=!1,e.isSuccess=!1)}))}}},E=(r("c965"),r("6b0d")),S=r.n(E);const T=S()(A,[["render",w],["__scopeId","data-v-370de9ae"]]);t["default"]=T},"7db0":function(e,t,r){"use strict";var n=r("23e7"),o=r("b727").find,c=r("44d2"),a="find",s=!0;a in[]&&Array(1)[a]((function(){s=!1})),n({target:"Array",proto:!0,forced:s},{find:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}}),c(a)},a640:function(e,t,r){"use strict";var n=r("d039");e.exports=function(e,t){var r=[][e];return!!r&&n((function(){r.call(null,t||function(){throw 1},1)}))}},b0c0:function(e,t,r){var n=r("83ab"),o=r("5e77").EXISTS,c=r("e330"),a=r("9bf2").f,s=Function.prototype,i=c(s.toString),l=/function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/,d=c(l.exec),u="name";n&&!o&&a(s,u,{configurable:!0,get:function(){try{return d(l,i(this))[1]}catch(e){return""}}})},b727:function(e,t,r){var n=r("0366"),o=r("e330"),c=r("44ad"),a=r("7b0b"),s=r("07fa"),i=r("65f0"),l=o([].push),d=function(e){var t=1==e,r=2==e,o=3==e,d=4==e,u=6==e,f=7==e,m=5==e||u;return function(b,h,O,j){for(var p,v,g=a(b),k=c(g),x=n(h,O),y=s(k),I=0,V=j||i,w=t?V(b,y):r||f?V(b,0):void 0;y>I;I++)if((m||I in k)&&(p=k[I],v=x(p,I,g),e))if(t)w[I]=v;else if(v)switch(e){case 3:return!0;case 5:return p;case 6:return I;case 2:l(w,p)}else switch(e){case 4:return!1;case 7:l(w,p)}return u?-1:o||d?d:w}};e.exports={forEach:d(0),map:d(1),filter:d(2),some:d(3),every:d(4),find:d(5),findIndex:d(6),filterReject:d(7)}},c965:function(e,t,r){"use strict";r("290f")}}]);
//# sourceMappingURL=chunk-a79733d0.c9577d0c.js.map