(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"3mtJ":function(o,n,e){"use strict";e.r(n),e.d(n,"registrationModule",function(){return M});var r=e("3Pt+"),t=e("tyNb"),i=e("PCNd");class s{constructor(o,n,e,r,t,i,s,a,c){this.name=o,this.email=n,this.password=e,this.weights=r,this.meals=t,this.activities=i,this.desired=s,this.purpose=a,this.token=c}}var a=e("/WaZ"),c=e("fXoL"),d=e("l7P3"),l=e("f3yp"),p=e("ofXK");const b=["form"],m=["password"];function u(o,n){if(1&o&&(c.Nb(0,"span",29),c.jc(1),c.Mb()),2&o){const o=c.Yb();c.Ab(1),c.kc(o.errorMessage)}}const g=function(o){return{visibility:o}},f=function(o){return{"border-color":o}},h=function(o){return{"form__button--invalid":o}},_=[{path:"",component:(()=>{class o{constructor(o){this.store=o,this.userEmail="",this.purpose="gain",this.passwordConfirmed=!1,this.errorMessage="",this.loading=!1}confirmingPassword(o){this.passwordConfirmed=o.target.value===this.ngForm.value.formData.password}ngOnInit(){this.storeSubscription=this.store.select("auth").subscribe(o=>{this.errorMessage=o.errorMessage,this.loading=o.loading})}onSubmit(){this.loading=!0,console.log(this.ngForm.value.formData);const o=this.ngForm.value.formData;o.password===o.confirmPassword&&(this.user=new s(o.username,o.email,o.password,[],[],[],{weight:0,meal:0,activity:0},o.purpose,!1),this.store.dispatch(new a.q(this.user)))}checkError(){this.errorMessage&&this.store.dispatch(new a.o)}ngOnDestroy(){this.storeSubscription.unsubscribe()}}return o.\u0275fac=function(n){return new(n||o)(c.Kb(d.h))},o.\u0275cmp=c.Eb({type:o,selectors:[["app-registration"]],viewQuery:function(o,n){if(1&o&&(c.mc(b,1),c.mc(m,1)),2&o){let o;c.cc(o=c.Vb())&&(n.ngForm=o.first),c.cc(o=c.Vb())&&(n.password=o.first)}},decls:52,vars:22,consts:[[1,"wrapper"],[1,"form",3,"ngSubmit"],["form","ngForm"],[1,"form__title"],["ngModelGroup","formData",1,"form-wrapper"],["formData","ngModelGroup"],[1,"form__spinner"],[3,"showLoading"],["class","form__user-exits",4,"ngIf"],[1,"form__group"],["for","name"],["type","text","placeholder","Enter Name","id","name","ngModel","","name","username","required","","minlength","4","maxlength","10",1,"form__group__input",3,"click"],["name","ngModel"],[1,"form-help",3,"ngStyle"],["for","email"],["type","email","placeholder","Enter Email","id","email","ngModel","","name","email","required","","email","",1,"form__group__input",3,"click"],["email","ngModel"],["for","password"],["type","password","placeholder","Enter Password","id","password","ngModel","","name","password","required","","minlength","6","maxlength","16",1,"form__group__input",3,"click"],["password","ngModel"],["for","confirmPassword"],["type","password","placeholder","Enter confirmPassword","id","confirmPassword","ngModel","","name","confirmPassword","required","","minlength","6","maxlength","16",1,"form__group__input",3,"ngStyle","click","input"],["confirmPassword","ngModel"],["name","purpose",1,"form__group__input",3,"ngModel","click"],["value","gain"],["value","lose"],["type","submit",1,"form__button","form__button--primary",3,"ngClass","disabled"],[1,"form__login"],["routerLink","/login",1,"form__login__color"],[1,"form__user-exits"]],template:function(o,n){if(1&o&&(c.Nb(0,"div",0),c.Nb(1,"form",1,2),c.Ub("ngSubmit",function(){return n.onSubmit()}),c.Nb(3,"h2",3),c.jc(4,"PLEASE REGISTER TO JOIN"),c.Mb(),c.Nb(5,"div",4,5),c.Nb(7,"div",6),c.Lb(8,"app-spinner",7),c.Mb(),c.hc(9,u,2,1,"span",8),c.Nb(10,"div",9),c.Nb(11,"label",10),c.jc(12,"Enter Name"),c.Mb(),c.Nb(13,"input",11,12),c.Ub("click",function(){return n.checkError()}),c.Mb(),c.Nb(15,"span",13),c.jc(16,"username should contain min 4 and max 10 characters"),c.Mb(),c.Mb(),c.Nb(17,"div",9),c.Nb(18,"label",14),c.jc(19,"Enter Email"),c.Mb(),c.Nb(20,"input",15,16),c.Ub("click",function(){return n.checkError()}),c.Mb(),c.Nb(22,"span",13),c.jc(23,"email is not valid "),c.Mb(),c.Mb(),c.Nb(24,"div",9),c.Nb(25,"label",17),c.jc(26,"Enter Password"),c.Mb(),c.Nb(27,"input",18,19),c.Ub("click",function(){return n.checkError()}),c.Mb(),c.Nb(29,"span",13),c.jc(30,"password should contain min 6 and max 16 letters "),c.Mb(),c.Mb(),c.Nb(31,"div",9),c.Nb(32,"label",20),c.jc(33,"ConfirmPassword"),c.Mb(),c.Nb(34,"input",21,22),c.Ub("click",function(){return n.checkError()})("input",function(o){return n.confirmingPassword(o)}),c.Mb(),c.Nb(36,"span",13),c.jc(37,"passwords doesn't match "),c.Mb(),c.Mb(),c.Nb(38,"div",9),c.Nb(39,"label",20),c.jc(40,"Do you want to gain weight or lose weight?"),c.Mb(),c.Nb(41,"select",23),c.Ub("click",function(){return n.checkError()}),c.Nb(42,"option",24),c.jc(43,"gain"),c.Mb(),c.Nb(44,"option",25),c.jc(45,"lose"),c.Mb(),c.Mb(),c.Mb(),c.Nb(46,"button",26),c.jc(47," SUBMIT "),c.Mb(),c.Nb(48,"span",27),c.jc(49,"or "),c.Nb(50,"a",28),c.jc(51," Login"),c.Mb(),c.Mb(),c.Mb(),c.Mb(),c.Mb()),2&o){const o=c.dc(2),e=c.dc(14),r=c.dc(21),t=c.dc(28),i=c.dc(35);c.Ab(8),c.Zb("showLoading",n.loading),c.Ab(1),c.Zb("ngIf",n.errorMessage),c.Ab(6),c.Zb("ngStyle",c.bc(10,g,!e.valid&&e.touched&&e.viewModel?"visible":"hidden")),c.Ab(7),c.Zb("ngStyle",c.bc(12,g,!r.valid&&r.touched&&r.viewModel?"visible":"hidden")),c.Ab(7),c.Zb("ngStyle",c.bc(14,g,!t.valid&&t.touched&&t.viewModel?"visible":"hidden")),c.Ab(5),c.Zb("ngStyle",c.bc(16,f,i.touched&&!n.passwordConfirmed?"red":"green")),c.Ab(2),c.Zb("ngStyle",c.bc(18,g,!i.valid&&i.touched&&i.viewModel?"visible":"hidden")),c.Ab(5),c.Zb("ngModel",n.purpose),c.Ab(5),c.Zb("ngClass",c.bc(20,h,!o.valid||!n.passwordConfirmed))("disabled",!o.valid)}},directives:[r.o,r.g,r.h,r.j,l.a,p.j,r.a,r.f,r.i,r.m,r.e,r.d,p.k,r.b,r.n,r.k,r.p,p.h,t.e],styles:[".wrapper[_ngcontent-%COMP%]{max-width:500px;margin:0 auto;padding-bottom:50px}@media (max-width:725px){.wrapper[_ngcontent-%COMP%]{padding-top:80px}}.form-wrapper[_ngcontent-%COMP%]{background-color:#093447;border-radius:10px;padding:20px;position:relative}.form__user-exits[_ngcontent-%COMP%]{color:#e47b7b}.form__spinner[_ngcontent-%COMP%]{position:absolute;right:20px;top:-40px}.form__login[_ngcontent-%COMP%]{display:flex;padding-top:10px;justify-content:center}.form__login__color[_ngcontent-%COMP%]{color:#10a410;margin-left:5px;font-weight:700;cursor:pointer}.form__group[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-top:5px;position:relative}.form__group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{padding:5px 0;font-weight:700;opacity:.8;margin-bottom:5px;font-size:15px}.form__group__input[_ngcontent-%COMP%]{padding:8px;border:1px solid #bda9a9;outline:none;border-radius:3px;margin-bottom:5px}.form__group__input[_ngcontent-%COMP%]:focus{border-color:#80fff4;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(11,161,149,.5)}.form__title[_ngcontent-%COMP%]{margin-bottom:30px;text-align:center;color:#000;opacity:.7}@media (max-width:725px){.form__title[_ngcontent-%COMP%]{font-size:18px}}"]}),o})()}];let M=(()=>{class o{}return o.\u0275fac=function(n){return new(n||o)},o.\u0275mod=c.Ib({type:o}),o.\u0275inj=c.Hb({imports:[[t.f.forChild(_),r.c,i.a]]}),o})()}}]);