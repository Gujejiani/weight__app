(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{cRhG:function(t,e,i){"use strict";i.r(e),i.d(e,"ProfileModule",function(){return W});var a=i("ofXK"),s=i("3Pt+"),r=i("tyNb"),n=i("WrFU"),o=i("fXoL"),d=i("CcaC");let c=(()=>{class t{generateMessage(t,e,i,a,s,r){let n;return e>t&&i&&(n=`${e-t} ${s} left to your desired ${r}, continue good\n            Work!`),t>e&&i&&(n=`${a} congratulation You have reached your desired ${r} + ${Math.abs(e-t)} ${s}`),t>e&&!i&&(n=` you need to lose ${t-e} ${s} for your desired ${r}, continue good\n            Work!`),t<e&&!i&&(n=`${a} congratulation Your desired daily ${r} are lower than your daily ${r}  - ${Math.abs(e-t)} ${s}`),n}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=o.Fb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var b=i("kcr0"),l=i("OiZJ"),h=i("l7P3");const _=function(t){return{color:t}};function g(t,e){if(1&t&&(o.Mb(0,"ul",5),o.Mb(1,"li",6),o.ic(2),o.Lb(),o.Mb(3,"li",7),o.ic(4),o.Lb(),o.Mb(5,"li",7),o.ic(6),o.Lb(),o.Mb(7,"li",7),o.ic(8),o.Lb(),o.Lb()),2&t){const t=e.$implicit,i=o.Xb();o.zb(2),o.jc(t.date),o.zb(1),o.Yb("ngStyle",o.ac(7,_,i.styleDataOnGainOrLoseWeight(t.weight,i.desiredWeight))),o.zb(1),o.kc(" ",t.weight," "),o.zb(1),o.Yb("ngStyle",o.ac(9,_,i.styleDataOnGainOrLoseWeight(t.meals,i.desiredMeal))),o.zb(1),o.kc(" ",t.meals?t.meals:0," "),o.zb(1),o.Yb("ngStyle",o.ac(11,_,i.styleDataOnGainOrLoseWeight(t.activity,i.desiredActivity))),o.zb(1),o.kc(" ",t.activity?t.activity:0," ")}}const u=function(t){return{"history-wrapper--show":t}};let p=(()=>{class t{constructor(t,e,i){this.userService=t,this.mealService=e,this.store=i,this.dates=[],this.histories=[],this.history={}}ngOnInit(){this.store.select("auth").subscribe(t=>{this.user=t.user,console.log(this.user),this.getDates(this.user.activities),this.getDates(this.user.weights),this.getDates(this.user.meals),this.addDatesToHistory(),this.getDesiredInputs(),this.addDataToHistory()})}getDates(t){t.forEach(t=>{this.dates.includes(t.date)||this.dates.push(t.date)})}addDatesToHistory(){this.dates.forEach(t=>{this.history.date=t,this.histories.push(Object.assign({},this.history))})}addDataToHistory(){this.histories.forEach(t=>{const e=this.user.weights.find(e=>String(e.date)===t.date);t.weight=+(null==e?void 0:e.weight)||0}),console.log(this.histories),this.histories.forEach(t=>{this.getHistoryDataForMealAndActivity(t,this.user.meals,"meal"),this.getHistoryDataForMealAndActivity(t,this.user.activities,"activity")})}getHistoryDataForMealAndActivity(t,e,i){const a=e.find(e=>String(e.date)===t.date),s=e.filter(t=>(null==t?void 0:t.date)===(null==a?void 0:a.date));let r=0;s.forEach(t=>{r+=+t.calories;const e=this.histories.find(t=>String(t.date)===String(null==a?void 0:a.date));"activity"===i&&(e.activity=r),"meal"===i&&(e.meals=r)})}styleDataOnGainOrLoseWeight(t,e){if(this.wantsToGainWeight){if(0===t)return"#fff";if(t>=e&&t>0)return"#16df0f";if(t<e&&t>0)return"#d3290b"}if(!this.wantsToGainWeight){if(0===t)return"#fff";if(t<=e&&t>0)return"#16df0f";if(t>e&&t>0)return"#d3290b"}}getDesiredInputs(){var t,e,i;this.desiredWeight=(null===(t=this.user.desired)||void 0===t?void 0:t.weight)||0,this.desiredActivity=(null===(e=this.user.desired)||void 0===e?void 0:e.activity)||0,this.desiredMeal=(null===(i=this.user.desired)||void 0===i?void 0:i.meal)||0,this.wantsToGainWeight="gain"===this.user.purpose}}return t.\u0275fac=function(e){return new(e||t)(o.Jb(d.a),o.Jb(b.a),o.Jb(h.h))},t.\u0275cmp=o.Db({type:t,selectors:[["app-history"]],inputs:{showHistory:"showHistory"},decls:13,vars:4,consts:[[1,"history-wrapper",3,"ngClass"],[1,"history"],[1,"history__titles"],[1,"history__titles__title"],["class","history__items",4,"ngFor","ngForOf"],[1,"history__items"],[1,"history__items__item"],[1,"history__items__item",3,"ngStyle"]],template:function(t,e){1&t&&(o.Mb(0,"div",0),o.Mb(1,"div",1),o.Mb(2,"ul",2),o.Mb(3,"li",3),o.ic(4,"Date"),o.Lb(),o.Mb(5,"li",3),o.ic(6,"Weight"),o.Lb(),o.Mb(7,"li",3),o.ic(8,"Meals"),o.Lb(),o.Mb(9,"li",3),o.ic(10,"Activities"),o.Lb(),o.Lb(),o.Mb(11,"div"),o.gc(12,g,9,13,"ul",4),o.Lb(),o.Lb(),o.Lb()),2&t&&(o.Yb("ngClass",o.ac(2,u,e.showHistory)),o.zb(12),o.Yb("ngForOf",e.histories))},directives:[a.h,a.i,a.k],styles:[".history-wrapper[_ngcontent-%COMP%]{position:absolute;left:0;top:0;height:100%;width:100%;opacity:0;visibility:hidden;transition:opacity .5s ease-in-out}.history-wrapper--show[_ngcontent-%COMP%]{visibility:visible;opacity:1}.history[_ngcontent-%COMP%]{background-color:#272020;display:flex;flex-direction:column;position:relative;z-index:25;max-height:500px;overflow:auto}.history__titles[_ngcontent-%COMP%]{display:flex;border-bottom:1px solid #fff}.history__titles__title[_ngcontent-%COMP%]{padding:10px 0;flex:1;text-align:center;border-left:1px solid #fff}.history__items[_ngcontent-%COMP%]{display:flex;border-bottom:1px solid #fff}.history__items[_ngcontent-%COMP%]:hover{background-color:#433737}.history__items__item[_ngcontent-%COMP%]{flex:1;padding:10px 0;text-align:center;border-left:1px solid #fff}@media (max-width:530px){.history__items__item[_ngcontent-%COMP%]{font-size:13px}}"]}),t})();function y(t,e){if(1&t&&(o.Mb(0,"label",36),o.ic(1),o.Mb(2,"span",20),o.ic(3,"kg"),o.Lb(),o.Lb()),2&t){const t=o.Xb();o.Yb("ngClass",t.currentWeight>=t.desiredWeight?"dashboard__card__content__unit--greater":"dashboard__card__content__unit--lower"),o.zb(1),o.kc("",t.currentWeight," ")}}function f(t,e){if(1&t&&(o.Mb(0,"label",36),o.ic(1),o.Mb(2,"span",20),o.ic(3,"kg"),o.Lb(),o.Lb()),2&t){const t=o.Xb();o.Yb("ngClass",t.currentWeight>t.desiredWeight?"dashboard__card__content__unit--lower":"dashboard__card__content__unit--greater"),o.zb(1),o.kc("",t.currentWeight," ")}}function M(t,e){if(1&t&&(o.Mb(0,"label",36),o.ic(1),o.Mb(2,"span",20),o.ic(3,"cl"),o.Lb(),o.Lb()),2&t){const t=o.Xb();o.Yb("ngClass",t.todayTotalMeal>=t.desiredMeal?"dashboard__card__content__unit--greater":"dashboard__card__content__unit--lower"),o.zb(1),o.kc("",t.todayTotalMeal," ")}}function v(t,e){if(1&t&&(o.Mb(0,"label",36),o.ic(1),o.Mb(2,"span",20),o.ic(3,"cl"),o.Lb(),o.Lb()),2&t){const t=o.Xb();o.Yb("ngClass",t.todayTotalMeal<=t.desiredMeal?"dashboard__card__content__unit--greater":"dashboard__card__content__unit--lower"),o.zb(1),o.kc("",t.todayTotalMeal," ")}}function w(t,e){if(1&t&&(o.Mb(0,"label",36),o.ic(1),o.Mb(2,"span",20),o.ic(3," cl"),o.Lb(),o.Lb()),2&t){const t=o.Xb();o.Yb("ngClass",t.todayTotalActivity<t.desiredActivity?"dashboard__card__content__unit--lower":"dashboard__card__content__unit--greater"),o.zb(1),o.jc(t.todayTotalActivity)}}function L(t,e){if(1&t&&(o.Mb(0,"label",36),o.ic(1),o.Mb(2,"span",20),o.ic(3," cl"),o.Lb(),o.Lb()),2&t){const t=o.Xb();o.Yb("ngClass",t.todayTotalActivity>t.desiredActivity?"dashboard__card__content__unit--lower":"dashboard__card__content__unit--greater"),o.zb(1),o.kc("",t.todayTotalActivity," ")}}const m=function(t){return{"history-overlay--show":t}},x=function(t){return{"wrapper--show":t}},C=function(t){return["weight",t]},O=function(){return{desiredMode:!0}};let k=(()=>{class t{constructor(t,e,i,a,s){this.userService=t,this.weightService=e,this.mealService=i,this.activityService=a,this.store=s,this.user=null,this.loggedIn=!1,this.dashboard=!1,this.currentWeight=0,this.desiredWeight=0,this.wantsToGainWeight=!1,this.todayTotalMeal=0,this.desiredMeal=0,this.todayTotalActivity=0,this.desiredActivity=0,this.showUserHistory=!1}ngOnInit(){console.log("dashboard"),this.store.select("data").subscribe(t=>{this.user=t.user}),this.user&&(this.mealService.meals=this.user.meals,this.activityService.activities=this.user.activities,this.todayTotalMeal=this.mealService.getTodayTotalMealCalories(),this.todayTotalActivity=this.activityService.getTodayTotalActivityCalories(),this.date=this.userService.getCurrentDate()),this.generateMessages(),this.addDesiredWeight()}ngAfterViewInit(){setTimeout(()=>{this.loggedIn=!0},0)}generateMessages(){var t,e,i,a;(null===(t=this.user.desired)||void 0===t?void 0:t.weight)?(this.desiredWeight=null===(e=this.user.desired)||void 0===e?void 0:e.weight,this.generateWeightMessage()):this.weightMessage=" please enter your desired weight",(null===(i=this.user.desired)||void 0===i?void 0:i.meal)?(this.desiredMeal=this.user.desired.meal,this.generateMealMessage()):this.mealMessage="please enter your desired activity calories",(null===(a=this.userService.user)||void 0===a?void 0:a.desired.activity)?(this.desiredActivity=this.user.desired.activity,this.generateActivityMessage()):this.activityMessage="please enter your desired activity calories"}addDesiredWeight(){if(!this.user)return;const t=this.user.weights.find(t=>this.userService.getCurrentDate()===String(t.date));this.currentWeight=t?+t.weight:0,this.wantsToGainWeight="gain"===this.user.purpose}onHistoryToggle(){this.showUserHistory=!this.showUserHistory,this.loggedIn=!0}generateMealMessage(){this.mealMessage=this.weightService.generateMessage(+this.todayTotalMeal,+this.desiredMeal,this.wantsToGainWeight,this.user,"cl","calories")}generateActivityMessage(){this.activityMessage=this.weightService.generateMessage(+this.todayTotalActivity,+this.desiredActivity,this.wantsToGainWeight,this.user,"cl","calories")}generateWeightMessage(){this.weightMessage=this.weightService.generateMessage(this.currentWeight,this.desiredWeight,this.wantsToGainWeight,this.user,"kg","weight")}}return t.\u0275fac=function(e){return new(e||t)(o.Jb(d.a),o.Jb(c),o.Jb(b.a),o.Jb(l.a),o.Jb(h.h))},t.\u0275cmp=o.Db({type:t,selectors:[["app-dashboard"]],decls:93,vars:32,consts:[[1,"history-overlay",3,"ngClass","click"],[1,"wrapper",3,"ngClass"],["wrapper",""],[1,"dashboard__title"],[1,"dashboard__table",3,"click"],[1,"dashboard"],[3,"showHistory"],[1,"dashboard__card","dashboard__card__1"],[1,"dashboard__date"],["aria-hidden","true","focusable","false","data-prefix","fas","data-icon","weight","role","img","xmlns","http://www.w3.org/2000/svg","viewBox","0 0 512 512","width","30px",1,"svg-inline--fa","fa-weight","fa-w-16"],["fill","currentColor","d","M448 64h-25.98C438.44 92.28 448 125.01 448 160c0 105.87-86.13 192-192 192S64 265.87 64 160c0-34.99 9.56-67.72 25.98-96H64C28.71 64 0 92.71 0 128v320c0 35.29 28.71 64 64 64h384c35.29 0 64-28.71 64-64V128c0-35.29-28.71-64-64-64zM256 320c88.37 0 160-71.63 160-160S344.37 0 256 0 96 71.63 96 160s71.63 160 160 160zm-.3-151.94l33.58-78.36c3.5-8.17 12.94-11.92 21.03-8.41 8.12 3.48 11.88 12.89 8.41 21l-33.67 78.55C291.73 188 296 197.45 296 208c0 22.09-17.91 40-40 40s-40-17.91-40-40c0-21.98 17.76-39.77 39.7-39.94z"],[1,"dashboard__card__title"],[1,"dashboard__card__content"],[1,"dashboard__card__content__left"],["class","dashboard__card__content__unit",3,"ngClass",4,"ngIf"],[1,"dashboard__card__content__current"],[3,"routerLink"],[1,"dashboard__card__content__button"],[1,"dashboard__card__content__right"],[1,"dashboard__card__content__unit"],[1,"dashboard__card__content__type"],["routerLink","weight",3,"queryParams"],[1,"dashboard__card__content__button","dashboard__card__content__button--weight"],[1,"dashboard__card__description"],[1,"dashboard__card","dashboard__card--meal"],["width","30px","aria-hidden","true","focusable","false","data-prefix","fas","data-icon","utensils","role","img","xmlns","http://www.w3.org/2000/svg","viewBox","0 0 416 512",1,"svg-inline--fa","fa-utensils","fa-w-13"],["fill","currentColor","d","M207.9 15.2c.8 4.7 16.1 94.5 16.1 128.8 0 52.3-27.8 89.6-68.9 104.6L168 486.7c.7 13.7-10.2 25.3-24 25.3H80c-13.7 0-24.7-11.5-24-25.3l12.9-238.1C27.7 233.6 0 196.2 0 144 0 109.6 15.3 19.9 16.1 15.2 19.3-5.1 61.4-5.4 64 16.3v141.2c1.3 3.4 15.1 3.2 16 0 1.4-25.3 7.9-139.2 8-141.8 3.3-20.8 44.7-20.8 47.9 0 .2 2.7 6.6 116.5 8 141.8.9 3.2 14.8 3.4 16 0V16.3c2.6-21.6 44.8-21.4 48-1.1zm119.2 285.7l-15 185.1c-1.2 14 9.9 26 23.9 26h56c13.3 0 24-10.7 24-24V24c0-13.2-10.7-24-24-24-82.5 0-221.4 178.5-64.9 300.9z"],["routerLink","meal"],[1,"dashboard__card__content__button","dashboard__card__content__button--meal"],["routerLink","meal",3,"queryParams"],[1,"dashboard__card","dashboard__card--activity"],["width","30px","aria-hidden","true","focusable","false","data-prefix","fas","data-icon","running","role","img","xmlns","http://www.w3.org/2000/svg","viewBox","0 0 416 512",1,"svg-inline--fa","fa-running","fa-w-13"],["fill","currentColor","d","M272 96c26.51 0 48-21.49 48-48S298.51 0 272 0s-48 21.49-48 48 21.49 48 48 48zM113.69 317.47l-14.8 34.52H32c-17.67 0-32 14.33-32 32s14.33 32 32 32h77.45c19.25 0 36.58-11.44 44.11-29.09l8.79-20.52-10.67-6.3c-17.32-10.23-30.06-25.37-37.99-42.61zM384 223.99h-44.03l-26.06-53.25c-12.5-25.55-35.45-44.23-61.78-50.94l-71.08-21.14c-28.3-6.8-57.77-.55-80.84 17.14l-39.67 30.41c-14.03 10.75-16.69 30.83-5.92 44.86s30.84 16.66 44.86 5.92l39.69-30.41c7.67-5.89 17.44-8 25.27-6.14l14.7 4.37-37.46 87.39c-12.62 29.48-1.31 64.01 26.3 80.31l84.98 50.17-27.47 87.73c-5.28 16.86 4.11 34.81 20.97 40.09 3.19 1 6.41 1.48 9.58 1.48 13.61 0 26.23-8.77 30.52-22.45l31.64-101.06c5.91-20.77-2.89-43.08-21.64-54.39l-61.24-36.14 31.31-78.28 20.27 41.43c8 16.34 24.92 26.89 43.11 26.89H384c17.67 0 32-14.33 32-32s-14.33-31.99-32-31.99z"],["routerLink","activity"],[1,"dashboard__card__content__button","dashboard__card__content__button--activity"],["routerLink","activity",3,"queryParams"],[1,"dashboard__card__content__unit",3,"ngClass"]],template:function(t,e){1&t&&(o.Mb(0,"div",0),o.Tb("click",function(){return e.onHistoryToggle()}),o.Lb(),o.Mb(1,"div",1,2),o.Mb(3,"h3",3),o.ic(4),o.Lb(),o.Mb(5,"button",4),o.Tb("click",function(){return e.onHistoryToggle()}),o.ic(6,"HISTORY"),o.Lb(),o.Mb(7,"div",5),o.Kb(8,"app-history",6),o.Mb(9,"div",7),o.Mb(10,"label",8),o.ic(11),o.Lb(),o.Wb(),o.Mb(12,"svg",9),o.Kb(13,"path",10),o.Lb(),o.Vb(),o.Mb(14,"h4",11),o.ic(15,"Your Weight"),o.Lb(),o.Mb(16,"div",12),o.Mb(17,"div",13),o.gc(18,y,4,2,"label",14),o.gc(19,f,4,2,"label",14),o.Mb(20,"label",15),o.ic(21,"today"),o.Lb(),o.Mb(22,"a",16),o.Mb(23,"button",17),o.ic(24,"add"),o.Lb(),o.Lb(),o.Lb(),o.Mb(25,"div",18),o.Mb(26,"label",19),o.ic(27),o.Mb(28,"span",20),o.ic(29," kg"),o.Lb(),o.Lb(),o.Mb(30,"label",15),o.ic(31,"desired"),o.Lb(),o.Mb(32,"a",21),o.Mb(33,"button",22),o.ic(34," change "),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Mb(35,"p",23),o.ic(36),o.Lb(),o.Lb(),o.Mb(37,"div",24),o.Mb(38,"label",8),o.ic(39),o.Lb(),o.Wb(),o.Mb(40,"svg",25),o.Kb(41,"path",26),o.Lb(),o.Vb(),o.Mb(42,"h4",11),o.ic(43,"daily meal calories"),o.Lb(),o.Mb(44,"div",12),o.Mb(45,"div",13),o.gc(46,M,4,2,"label",14),o.gc(47,v,4,2,"label",14),o.Mb(48,"label",15),o.ic(49,"today"),o.Lb(),o.Mb(50,"a",27),o.Mb(51,"button",28),o.ic(52," add "),o.Lb(),o.Lb(),o.Lb(),o.Mb(53,"div",18),o.Mb(54,"label",19),o.ic(55),o.Mb(56,"span",20),o.ic(57,"cl"),o.Lb(),o.Lb(),o.Mb(58,"label",15),o.ic(59,"desired"),o.Lb(),o.Mb(60,"a",29),o.Mb(61,"button",22),o.ic(62," change "),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Mb(63,"p",23),o.ic(64),o.Lb(),o.Lb(),o.Mb(65,"div",30),o.Mb(66,"label",8),o.ic(67),o.Lb(),o.Wb(),o.Mb(68,"svg",31),o.Kb(69,"path",32),o.Lb(),o.Vb(),o.Mb(70,"h4",11),o.ic(71,"daily activity calories"),o.Lb(),o.Mb(72,"div",12),o.Mb(73,"div",13),o.gc(74,w,4,2,"label",14),o.gc(75,L,4,2,"label",14),o.Mb(76,"label",15),o.ic(77,"today"),o.Lb(),o.Mb(78,"a",33),o.Mb(79,"button",34),o.ic(80," add "),o.Lb(),o.Lb(),o.Lb(),o.Mb(81,"div",18),o.Mb(82,"label",19),o.ic(83),o.Mb(84,"span",20),o.ic(85,"cl"),o.Lb(),o.Lb(),o.Mb(86,"label",15),o.ic(87,"desired"),o.Lb(),o.Mb(88,"a",35),o.Mb(89,"button",17),o.ic(90,"change"),o.Lb(),o.Lb(),o.Lb(),o.Lb(),o.Mb(91,"p",23),o.ic(92),o.Lb(),o.Lb(),o.Lb(),o.Lb()),2&t&&(o.Yb("ngClass",o.ac(23,m,e.showUserHistory)),o.zb(1),o.Yb("ngClass",o.ac(25,x,e.loggedIn)),o.zb(3),o.kc("Welcome Back ",null==e.user?null:e.user.name,""),o.zb(4),o.Yb("showHistory",e.showUserHistory),o.zb(3),o.jc(e.date),o.zb(7),o.Yb("ngIf",e.wantsToGainWeight),o.zb(1),o.Yb("ngIf",!e.wantsToGainWeight),o.zb(3),o.Yb("routerLink",o.ac(27,C,e.currentWeight)),o.zb(5),o.jc(e.desiredWeight),o.zb(5),o.Yb("queryParams",o.Zb(29,O)),o.zb(4),o.kc(" ",e.weightMessage," "),o.zb(3),o.jc(e.date),o.zb(7),o.Yb("ngIf",e.wantsToGainWeight),o.zb(1),o.Yb("ngIf",!e.wantsToGainWeight),o.zb(8),o.kc("",e.desiredMeal," "),o.zb(5),o.Yb("queryParams",o.Zb(30,O)),o.zb(4),o.kc(" ",e.mealMessage," "),o.zb(3),o.jc(e.date),o.zb(7),o.Yb("ngIf",e.wantsToGainWeight),o.zb(1),o.Yb("ngIf",!e.wantsToGainWeight),o.zb(8),o.kc(" ",e.desiredActivity," "),o.zb(5),o.Yb("queryParams",o.Zb(31,O)),o.zb(4),o.kc(" ",e.activityMessage," "))},directives:[a.h,p,a.j,r.e],styles:[".wrapper[_ngcontent-%COMP%]{padding-top:100px;height:100%;color:#fff;width:100%;transition:all .5s ease-in-out;opacity:0;position:relative}.wrapper--show[_ngcontent-%COMP%]{opacity:1;visibility:visible}.dashboard[_ngcontent-%COMP%]{width:100%;display:flex;margin-top:50px;justify-content:space-between;flex-wrap:wrap;position:relative}.dashboard--show[_ngcontent-%COMP%]{opacity:1}@media (max-width:695px){.dashboard[_ngcontent-%COMP%]{justify-content:center}}.dashboard__title[_ngcontent-%COMP%]{color:#000}.dashboard__table[_ngcontent-%COMP%]{position:absolute;right:0;padding:5px;border-radius:3px;background-color:#187584;color:#fff;cursor:pointer;border:1px solid #3d5278;top:100px}.dashboard__date[_ngcontent-%COMP%]{display:block;text-align:right;font-size:15px;font-weight:700}.dashboard__card[_ngcontent-%COMP%]{background-image:linear-gradient(#53b8cf,#2f7889);border-radius:16px;padding:10px 20px;max-width:300px;min-width:300px;min-height:400px;margin-bottom:30px}.dashboard__card--meal[_ngcontent-%COMP%]{background-image:linear-gradient(#a26fba,#392542)}.dashboard__card--activity[_ngcontent-%COMP%]{background-image:linear-gradient(#d07365,#7f4238)}.dashboard__card__title[_ngcontent-%COMP%]{margin:5px 0 15px}.dashboard__card__content[_ngcontent-%COMP%]{display:flex;justify-content:space-between;min-width:200px}.dashboard__card__content__left[_ngcontent-%COMP%]{flex:1;border-right:2px solid #fff;padding:10px 15px}.dashboard__card__content__right[_ngcontent-%COMP%]{flex:1;padding:10px 15px}.dashboard__card__content__unit[_ngcontent-%COMP%]{font-size:30px;text-align:center;display:inline-block;width:100%;font-weight:700}.dashboard__card__content__unit--greater[_ngcontent-%COMP%]{color:#16df0f}.dashboard__card__content__unit--lower[_ngcontent-%COMP%]{color:#d3290b}.dashboard__card__content__type[_ngcontent-%COMP%]{font-size:13px;color:#fff}.dashboard__card__content__current[_ngcontent-%COMP%]{text-align:center;margin-top:10px;margin-bottom:10px;display:block}.dashboard__card__content__button[_ngcontent-%COMP%]{border-radius:10px;padding:5px 0;margin-top:10px;width:90%;color:#fff;background-color:#0d2f68;border:1px solid transparent;outline:none;cursor:pointer}.dashboard__card__content__button--meal[_ngcontent-%COMP%]{background-color:#fa68d8}.dashboard__card__content__button--weight[_ngcontent-%COMP%]{background-color:#21a1c2}.dashboard__card__content__button--activity[_ngcontent-%COMP%]{background-color:#c79d12}.dashboard__card__description[_ngcontent-%COMP%]{margin:70px 0 20px;font-size:12px}.history-overlay[_ngcontent-%COMP%]{position:fixed;left:0;top:0;width:100%;z-index:20;opacity:.4;height:100vh;background-color:#0e0a0a;opacity:0;visibility:hidden;transition:opacity .5s ease-in-out}.history-overlay--show[_ngcontent-%COMP%]{visibility:visible;opacity:.5}"]}),t})();const z=[{path:"",canActivate:[n.a],component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Db({type:t,selectors:[["app-profile"]],decls:1,vars:0,template:function(t,e){1&t&&o.Kb(0,"app-dashboard")},directives:[k],styles:[""]}),t})()}];let W=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.Hb({type:t}),t.\u0275inj=o.Gb({imports:[[r.f.forChild(z),a.b,s.c]]}),t})()}}]);