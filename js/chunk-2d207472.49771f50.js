(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d207472"],{a09f:function(t,e,o){"use strict";o.r(e);var a=o("7a23"),c=o("4b50"),i=o.n(c),s=Object(a["h"])("div",{class:"rotationLoading"},[Object(a["h"])("img",{src:i.a,alt:"loading",class:"img-fluid"})],-1),n={class:"favorite containerTop mb-5","data-aos":"zoom-in"},r=Object(a["h"])("h1",{class:"pageTitle position-relative text-center mb-5 p-2"},[Object(a["h"])("span",{class:"fs-2"},"Favorites List"),Object(a["h"])("br"),Object(a["h"])("span",{class:"fs-4"},"收藏清單")],-1),d={key:1,class:"notFavorite text-center"},u=Object(a["h"])("p",{class:"notFavoriteText fs-5"},"收藏清單並無任何商品，請點選下方按鈕收藏商品",-1);function p(t,e,o,c,i,p){var b=this,f=Object(a["K"])("Loading"),h=Object(a["K"])("ProductsCard");return Object(a["A"])(),Object(a["g"])(a["a"],null,[Object(a["k"])(f,{active:i.isLoading,"onUpdate:active":e[0]||(e[0]=function(t){return i.isLoading=t}),"z-index":9999},{default:Object(a["Y"])((function(){return[s]})),_:1},8,["active"]),Object(a["h"])("div",n,[r,0!==i.favoriteList.length?(Object(a["A"])(),Object(a["e"])(h,{key:0,tempProducts:i.tempProducts,favoriteList:i.favoriteList,page:"favorite"},null,8,["tempProducts","favoriteList"])):(Object(a["A"])(),Object(a["g"])("div",d,[u,Object(a["h"])("button",{type:"button",class:"notFavoriteBtn btn btn-primary fw-bold fs-5",onClick:e[1]||(e[1]=function(t){return b.$router.push("/products")})},"前往收藏商品")]))])],64)}o("99af"),o("d3b7"),o("159b"),o("c740");var b=o("acca"),f={components:{ProductsCard:b["a"]},data:function(){return{products:[],tempProducts:[],favoriteList:[],isLoading:!1,btnLoading:""}},inject:["emitter"],created:function(){this.getProducts()},methods:{getProducts:function(){var t=this;this.favoriteList=JSON.parse(localStorage.getItem("favorite"))||[],this.isLoading=!0;var e="".concat("https://vue3-course-api.hexschool.io/","api/").concat("ch-api","/products/all");this.$http.get(e).then((function(e){e.data.success&&(t.products=e.data.products,t.isLoading=!1,t.favoriteList.forEach((function(e){var o=t.products.findIndex((function(t){return t.id===e}));t.products[o].favorite=!0,t.tempProducts.push(t.products[o])})))}))}}},h=o("6b0d"),v=o.n(h);const l=v()(f,[["render",p]]);e["default"]=l}}]);
//# sourceMappingURL=chunk-2d207472.49771f50.js.map