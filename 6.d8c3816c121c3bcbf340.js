(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"3mtJ":function(e,i,n){"use strict";n.r(i),n.d(i,"registrationModule",function(){return M});var o=n("3Pt+"),r=n("tyNb"),t=n("PCNd"),a=n("JdRi"),s=n("fXoL"),d=n("1uD4"),l=n("qXBG"),p=n("0GiD"),b=n("f3yp"),m=n("ofXK");const c=["form"],u=["password"];function g(e,i){if(1&e&&(s.Mb(0,"span",27),s.ic(1),s.Lb()),2&e){const e=s.Xb();s.zb(1),s.kc("User with email ",e.userEmail," is already exits")}}const f=function(e){return{visibility:e}},_=function(e){return{"border-color":e}},h=function(e){return{"form__button--invalid":e}},w=[{path:"",component:(()=>{class e{constructor(e,i,n,o){this.registrationService=e,this.router=i,this.auth=n,this.database=o,this.userEmail="sa",this.purpose="gain",this.passwordConfirmed=!1,this.userAlreadyRegistered=!1,this.loading=!1}confirmingPassword(e){this.passwordConfirmed=e.target.value===this.ngForm.value.formData.password}ngOnInit(){}onSubmit(){this.loading=!0,console.log(this.ngForm.value.formData);const e=this.ngForm.value.formData;e.password===e.confirmPassword&&(this.user=new a.a(e.username,e.email,e.password,[],[],[],{weight:0,meal:0,activity:0},e.purpose,!1),this.auth.signUp(this.user).subscribe(e=>{this.userAlreadyRegistered=!1,this.router.navigate(["/login"]),this.loading=!1,this.database.saveDataToFirebase(this.user,e.idToken)},i=>{this.userAlreadyRegistered=!0,this.userEmail=e.email,this.loading=!1}))}}return e.\u0275fac=function(i){return new(i||e)(s.Jb(d.a),s.Jb(r.b),s.Jb(l.a),s.Jb(p.a))},e.\u0275cmp=s.Db({type:e,selectors:[["app-registration"]],viewQuery:function(e,i){if(1&e&&(s.lc(c,1),s.lc(u,1)),2&e){let e;s.bc(e=s.Ub())&&(i.ngForm=e.first),s.bc(e=s.Ub())&&(i.password=e.first)}},decls:48,vars:22,consts:[[1,"wrapper"],[1,"form",3,"ngSubmit"],["form","ngForm"],[1,"form__title"],["ngModelGroup","formData",1,"form-wrapper"],["formData","ngModelGroup"],[1,"form__spinner"],[3,"showLoading"],["class","form__user-exits",4,"ngIf"],[1,"form__group"],["for","name"],["type","text","placeholder","Enter Name","id","name","ngModel","","name","username","required","","minlength","4","maxlength","10",1,"form__group__input"],["name","ngModel"],[1,"form-help",3,"ngStyle"],["for","email"],["type","email","placeholder","Enter Email","id","email","ngModel","","name","email","required","","email","",1,"form__group__input"],["email","ngModel"],["for","password"],["type","password","placeholder","Enter Password","id","password","ngModel","","name","password","required","","minlength","6","maxlength","16",1,"form__group__input"],["password","ngModel"],["for","confirmPassword"],["type","password","placeholder","Enter confirmPassword","id","confirmPassword","ngModel","","name","confirmPassword","required","","minlength","6","maxlength","16",1,"form__group__input",3,"ngStyle","input"],["confirmPassword","ngModel"],["name","purpose",1,"form__group__input",3,"ngModel"],["value","gain"],["value","lose"],["type","submit",1,"form__button","form__button--primary",3,"ngClass","disabled"],[1,"form__user-exits"]],template:function(e,i){if(1&e&&(s.Mb(0,"div",0),s.Mb(1,"form",1,2),s.Tb("ngSubmit",function(){return i.onSubmit()}),s.Mb(3,"h2",3),s.ic(4,"PLEASE REGISTER TO JOIN"),s.Lb(),s.Mb(5,"div",4,5),s.Mb(7,"div",6),s.Kb(8,"app-spinner",7),s.Lb(),s.gc(9,g,2,1,"span",8),s.Mb(10,"div",9),s.Mb(11,"label",10),s.ic(12,"Enter Name"),s.Lb(),s.Kb(13,"input",11,12),s.Mb(15,"span",13),s.ic(16,"username should contain min 4 and max 10 characters"),s.Lb(),s.Lb(),s.Mb(17,"div",9),s.Mb(18,"label",14),s.ic(19,"Enter Email"),s.Lb(),s.Kb(20,"input",15,16),s.Mb(22,"span",13),s.ic(23,"email is not valid "),s.Lb(),s.Lb(),s.Mb(24,"div",9),s.Mb(25,"label",17),s.ic(26,"Enter Password"),s.Lb(),s.Kb(27,"input",18,19),s.Mb(29,"span",13),s.ic(30,"password should contain min 6 and max 16 letters "),s.Lb(),s.Lb(),s.Mb(31,"div",9),s.Mb(32,"label",20),s.ic(33,"ConfirmPassword"),s.Lb(),s.Mb(34,"input",21,22),s.Tb("input",function(e){return i.confirmingPassword(e)}),s.Lb(),s.Mb(36,"span",13),s.ic(37,"passwords doesn't match "),s.Lb(),s.Lb(),s.Mb(38,"div",9),s.Mb(39,"label",20),s.ic(40,"Do you want to gain weight or lose weight?"),s.Lb(),s.Mb(41,"select",23),s.Mb(42,"option",24),s.ic(43,"gain"),s.Lb(),s.Mb(44,"option",25),s.ic(45,"lose"),s.Lb(),s.Lb(),s.Lb(),s.Mb(46,"button",26),s.ic(47," SUBMIT "),s.Lb(),s.Lb(),s.Lb(),s.Lb()),2&e){const e=s.cc(2),n=s.cc(14),o=s.cc(21),r=s.cc(28),t=s.cc(35);s.zb(8),s.Yb("showLoading",i.loading),s.zb(1),s.Yb("ngIf",i.userAlreadyRegistered),s.zb(6),s.Yb("ngStyle",s.ac(10,f,!n.valid&&n.dirty&&n.viewModel?"visible":"hidden")),s.zb(7),s.Yb("ngStyle",s.ac(12,f,!o.valid&&o.dirty&&o.viewModel?"visible":"hidden")),s.zb(7),s.Yb("ngStyle",s.ac(14,f,!r.valid&&r.dirty&&r.viewModel?"visible":"hidden")),s.zb(5),s.Yb("ngStyle",s.ac(16,_,t.touched&&!i.passwordConfirmed?"red":"green")),s.zb(2),s.Yb("ngStyle",s.ac(18,f,!t.valid&&t.dirty&&t.viewModel?"visible":"hidden")),s.zb(5),s.Yb("ngModel",i.purpose),s.zb(5),s.Yb("ngClass",s.ac(20,h,!e.valid||!i.passwordConfirmed))("disabled",!e.valid)}},directives:[o.o,o.g,o.h,o.j,b.a,m.j,o.a,o.f,o.i,o.m,o.e,o.d,m.k,o.b,o.n,o.k,o.p,m.h],styles:[".wrapper[_ngcontent-%COMP%]{max-width:500px;margin:0 auto;padding-top:100px}@media (max-width:725px){.wrapper[_ngcontent-%COMP%]{padding-top:80px}}.form-wrapper[_ngcontent-%COMP%]{background-color:#093447;border-radius:10px;padding:20px;position:relative}.form__user-exits[_ngcontent-%COMP%]{color:#e47b7b}.form__spinner[_ngcontent-%COMP%]{position:absolute;right:20px;top:-40px}.form__group[_ngcontent-%COMP%]{display:flex;flex-direction:column;margin-top:5px;position:relative}.form__group[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{padding:5px 0;font-weight:700;opacity:.8;margin-bottom:5px}.form__group__input[_ngcontent-%COMP%]{padding:8px;border:1px solid #bda9a9;outline:none;border-radius:3px;margin-bottom:5px}.form__group__input[_ngcontent-%COMP%]:focus{border-color:#80fff4;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(11,161,149,.5)}.form__title[_ngcontent-%COMP%]{margin-bottom:30px;text-align:center;color:#000;opacity:.7}@media (max-width:725px){.form__title[_ngcontent-%COMP%]{font-size:18px}}"]}),e})()}];let M=(()=>{class e{}return e.\u0275fac=function(i){return new(i||e)},e.\u0275mod=s.Hb({type:e}),e.\u0275inj=s.Gb({imports:[[r.f.forChild(w),o.c,t.a]]}),e})()}}]);