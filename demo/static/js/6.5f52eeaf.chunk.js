(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{879:function(e,t,n){"use strict";n.d(t,"b",function(){return p}),n.d(t,"c",function(){return d}),n.d(t,"a",function(){return f});var a=n(9),r=n(8);function i(){var e=Object(a.a)(["\n  width: 25%;\n  max-width: 25%;\n  min-width: 25%;\n"]);return i=function(){return e},e}function l(){var e=Object(a.a)(["\n  width: 33.33%;\n  max-width: 33.33%;\n  min-width: 33.33%;\n"]);return l=function(){return e},e}function o(){var e=Object(a.a)(["\n  width: 50%;\n  max-width: 50%;\n  min-width: 50%;\n"]);return o=function(){return e},e}function c(){var e=Object(a.a)(["\n  width: 100%;\n  ",";\n"]);return c=function(){return e},e}function s(){var e=Object(a.a)(["\n  display: flex;\n  flex: 1 1 auto;\n  flex-direction: row;\n  min-width: 100%;\n  ",";\n  ",";\n  ",";\n"]);return s=function(){return e},e}function u(){var e=Object(a.a)(["\n  display: flex;\n  flex: 1 1 auto;\n  flex-direction: column;\n"]);return u=function(){return e},e}var p=r.c.section(u()),d=r.c.section(s(),function(e){return e.flat?"height: auto":"height: calc(50vh - 16px)"},function(e){return e.flat?"max-height: auto":"max-height: calc(50vh - 16px)"},function(e){return e.flat?"min-height: auto":"min-height: calc(50vh - 16px)"}),f=r.c.section(c(),function(e){return e.w?(t=e.w,"width: ".concat(t,"; min-width: ").concat(t,"; max-width: ").concat(t,";")):"";var t});r.c.section(o()),r.c.section(l()),r.c.section(i())},895:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(19),i=n(26),l=n(27),o=n(32),c=n(17),s=n(0),u=n.n(s),p=n(59),d=n(284),f=n.n(d),h=n(15),g=n(12),m=n(7),b=n(879),v=n(184),E=Object(h.d)({userSettings:{id:"kz.containers.SettingsPage.user",defaultMessage:"User Settings"},companySettings:{id:"kz.containers.SettingsPage.company",defaultMessage:"Company Settings"},ticketSettings:{id:"kz.containers.SettingsPage.ticket",defaultMessage:"Ticket Settings"},storageSettings:{id:"kz.containers.SettingsPage.storage",defaultMessage:"Storage Settings"},countryField:{id:"kz.containers.SettingsPage.countryField",defaultMessage:"Country"},langField:{id:"kz.containers.SettingsPage.langField",defaultMessage:"Language"},themeField:{id:"kz.containers.SettingsPage.themeField",defaultMessage:"Theme"},timezoneField:{id:"kz.containers.SettingsPage.timezoneField",defaultMessage:"Timezone"},nameField:{id:"kz.containers.SettingsPage.nameField",defaultMessage:"Name"},addressField:{id:"kz.containers.SettingsPage.addressField",defaultMessage:"Address"},emailField:{id:"kz.containers.SettingsPage.emailField",defaultMessage:"Email"},phoneField:{id:"kz.containers.SettingsPage.phoneField",defaultMessage:"Phone"},printerNameField:{id:"kz.containers.SettingsPage.printerNameField",defaultMessage:"Printer Name"},printerIPField:{id:"kz.containers.SettingsPage.printerIPField",defaultMessage:"Printer IP"},ticketTemplateField:{id:"kz.containers.SettingsPage.ticketTemplateField",defaultMessage:"Ticket Template"},backupPeriodField:{id:"kz.containers.SettingsPage.backupPeriodField",defaultMessage:"Backup Period"},backupLocationField:{id:"kz.containers.SettingsPage.backupLocationField",defaultMessage:"Backup Location"},analyticsServerField:{id:"kz.containers.SettingsPage.analyticsServerField",defaultMessage:"Analytics Server"}}),k=n(9),y=n(8);function w(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=Object(c.a)(e);if(t){var r=Object(c.a)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return Object(o.a)(this,n)}}function x(){var e=Object(k.a)(["\n  position: absolute;\n  pointer-events: none; // makes the input ot get focus having the label on top of it\n  left: 0;\n  top: 0;\n  cursor: text;\n  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu, Cantarell, Arial,\n    sans-serif;\n  font-weight: 100;\n  -webkit-font-smoothing: antialiased;\n  font-variant: all-petite-caps;\n  font-style: normal;\n  opacity: 1;\n  -webkit-transition: all 0.2s;\n  transition: all 0.2s;\n  margin-left: 10px;\n  font-size: 14px;\n  user-select: none;\n"]);return x=function(){return e},e}function j(){var e=Object(k.a)(["\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  margin-left: 10px;\n  padding-top: 10px;\n  padding-right: 20px;\n  font-size: 2em;\n  &::-webkit-input-placeholder {\n    opacity: 1;\n    -webkit-transition: all 0.2s;\n    transition: all 0.2s;\n  }\n  &::-moz-placeholder {\n    opacity: 1;\n    -webkit-transition: all 0.2s;\n    transition: all 0.2s;\n  }\n  &:-ms-input-placeholder {\n    opacity: 1;\n    -webkit-transition: all 0.2s;\n    transition: all 0.2s;\n  }\n  &::placeholder {\n    opacity: 1;\n    -webkit-transition: all 0.2s;\n    transition: all 0.2s;\n  }\n  &:placeholder-shown:not(:focus)::-webkit-input-placeholder {\n    opacity: 0;\n  }\n  &:placeholder-shown:not(:focus)::-moz-placeholder {\n    opacity: 0;\n  }\n  &:placeholder-shown:not(:focus):-ms-input-placeholder {\n    opacity: 0;\n  }\n  &:placeholder-shown:not(:focus)::placeholder {\n    opacity: 0;\n  }\n  &:placeholder-shown:not(:focus) + * {\n    font-size: 1.7em;\n    opacity: 0.5;\n    top: 0.35em;\n  }\n  &:focus {\n    outline: none;\n    border-color: rgba(0, 0, 0, 0.5);\n  }\n"]);return j=function(){return e},e}function O(){var e=Object(k.a)(["\n  width: 100%;\n  height: calc(100% - 20px);\n  margin: 0;\n  margin-left: 10px;\n  margin-top: 20px;\n  padding-right: 10px;\n  font-size: 1.4em;\n  resize: none;\n  &::-webkit-input-placeholder {\n    opacity: 1;\n    -webkit-transition: all 0.2s;\n    transition: all 0.2s;\n  }\n  &::-moz-placeholder {\n    opacity: 1;\n    -webkit-transition: all 0.2s;\n    transition: all 0.2s;\n  }\n  &:-ms-input-placeholder {\n    opacity: 1;\n    -webkit-transition: all 0.2s;\n    transition: all 0.2s;\n  }\n  &::placeholder {\n    opacity: 1;\n    -webkit-transition: all 0.2s;\n    transition: all 0.2s;\n  }\n  &:placeholder-shown:not(:focus)::-webkit-input-placeholder {\n    opacity: 0;\n  }\n  &:placeholder-shown:not(:focus)::-moz-placeholder {\n    opacity: 0;\n  }\n  &:placeholder-shown:not(:focus):-ms-input-placeholder {\n    opacity: 0;\n  }\n  &:placeholder-shown:not(:focus)::placeholder {\n    opacity: 0;\n  }\n  &:placeholder-shown:not(:focus) + * {\n    font-size: 1.7em;\n    opacity: 0.5;\n    top: 0.35em;\n  }\n  &:focus {\n    outline: none;\n    border-color: rgba(0, 0, 0, 0.5);\n  }\n"]);return O=function(){return e},e}function S(){var e=Object(k.a)(["\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n"]);return S=function(){return e},e}function F(){var e=Object(k.a)(["\n  outline: none;\n  font-size: 1.3em;\n  margin-left: 5px;\n  width: 150px;\n  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu, Cantarell, Arial,\n    sans-serif;\n  font-weight: 100;\n  -webkit-font-smoothing: antialiased;\n  font-variant: all-petite-caps;\n  font-style: normal;\n\n  &::-webkit-input-placeholder {\n    /* WebKit, Blink, Edge */\n    color: rgba(163, 168, 174, 0.9);\n  }\n  &:-moz-placeholder {\n    /* Mozilla Firefox 4 to 18 */\n    color: rgba(163, 168, 174, 0.9);\n    opacity: 1;\n  }\n  &::-moz-placeholder {\n    /* Mozilla Firefox 19+ */\n    color: rgba(163, 168, 174, 0.9);\n    opacity: 1;\n  }\n  &:-ms-input-placeholder {\n    /* Internet Explorer 10-11 */\n    color: rgba(163, 168, 174, 0.9);\n  }\n  &::-ms-input-placeholder {\n    /* Microsoft Edge */\n    color: rgba(163, 168, 174, 0.9);\n  }\n"]);return F=function(){return e},e}function z(){var e=Object(k.a)(["\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  border: 1px solid rgba(163, 168, 174, 0.1);\n  border-bottom: none;\n"]);return z=function(){return e},e}function M(){var e=Object(k.a)(["\n  width: 100%;\n  height: calc(100% - 44px);\n  display: flex;\n  flex: 0 1 auto;\n  flex-direction: row;\n"]);return M=function(){return e},e}function P(){var e=Object(k.a)(["\n  width: ",";\n  height: 44px;\n  display: flex;\n  flex: 0 1 auto;\n  flex-direction: row;\n  background-color: ",";\n  color: ",";\n"]);return P=function(){return e},e}function B(){var e=Object(k.a)(["\n  height: 100%;\n  padding: ",";\n"]);return B=function(){return e},e}function C(){var e=Object(k.a)(["\n  color: ",";\n  font-size: ","em;\n  font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu, Cantarell, Arial,\n    sans-serif;\n  letter-spacing: 0.15em;\n  font-weight: ",";\n  -webkit-font-smoothing: antialiased;\n  font-variant: all-petite-caps;\n  text-align: center;\n  padding: 15px;\n  margin: 0;\n"]);return C=function(){return e},e}function R(){var e=Object(k.a)(["\n  height: calc(100% - 60px);\n  display: grid;\n"]);return R=function(){return e},e}function L(){var e=Object(k.a)(["\n  width: calc(100% - 30px);\n  height: calc(100% - 30px);\n  background-color: ",";\n  margin: 15px;\n"]);return L=function(){return e},e}var I=y.c.section(L(),function(e){return e.theme&&e.theme.settings.panelBgColor?e.theme.settings.panelBgColor:"rgba(10, 10, 10, 0.2)"}),T=y.c.section(R()),U=y.c.h2(C(),function(e){return e.theme&&e.theme.sidebar.color?e.theme.sidebar.color:"rgba(163, 168, 174, 0.5)"},function(e){return e.small?"1.1":"1.8"},function(e){return e.highlight,"100"}),A=(y.c.section(B(),function(e){return e.theme&&e.theme.app.padding?e.theme.app.padding:"0px"}),y.c.div(P(),function(e){return e.content?"calc(100% - 5px)":"100%"},function(e){return e.even?"rgba(163,168,174,0.2)":"rgba(163, 168, 174, 0.1)"},function(e){return e.even?"white":"rgba(187, 183, 183, 1)"}),y.c.div(M()),y.c.div(z())),N=y.c.input(F()),D=y.c.div(S()),G=y.c.textarea(O()),V=N.extend(j()),K=y.c.label(x()),W=function(e){Object(l.a)(n,e);var t=w(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).state={value:e.value},a}return Object(i.a)(n,[{key:"componentWillReceiveProps",value:function(e){this.setState({value:e.value})}},{key:"render",value:function(){var e=this;return u.a.createElement(A,null,u.a.createElement(D,null,u.a.createElement(V,{placeholder:this.props.placeholder,onChange:function(t){var n=t.target;return e.setState({value:n.value})},value:this.state.value,onBlur:function(t){return e.props.onBlur?e.props.onBlur(t.target.value):null}}),u.a.createElement(K,null,this.props.placeholder)))}}]),n}(u.a.Component),J=function(e){Object(l.a)(n,e);var t=w(n);function n(e){var a;return Object(r.a)(this,n),(a=t.call(this,e)).state={value:e.value?e.value.trim():e.noValue},a}return Object(i.a)(n,[{key:"componentWillReceiveProps",value:function(e){this.setState({value:e.value||e.noValue})}},{key:"render",value:function(){var e=this;return u.a.createElement(A,null,u.a.createElement(D,null,u.a.createElement(G,{type:"text",placeholder:this.props.placeholder,onChange:function(t){var n=t.target;return e.setState({value:n.value||e.props.noValue})},value:this.state.value,onBlur:function(t){return e.props.onBlur?e.props.onBlur(t.target.value):null}}),u.a.createElement(K,null,this.props.placeholder)))}}]),n}(u.a.Component);function q(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var n,a=Object(c.a)(e);if(t){var r=Object(c.a)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return Object(o.a)(this,n)}}n.d(t,"SettingsPage",function(){return H});var H=function(e){Object(l.a)(n,e);var t=q(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){var e=this;return u.a.createElement(b.b,null,u.a.createElement(f.a,{title:"Kalzate Settings",meta:[{name:"description",content:"Settings"}]}),u.a.createElement(b.c,null,u.a.createElement(b.a,null,u.a.createElement(I,null,u.a.createElement(U,null,u.a.createElement(h.a,E.userSettings)),u.a.createElement(T,null,u.a.createElement(b.b,null,u.a.createElement(b.c,{flat:!0},u.a.createElement(b.a,null,this.props.settings&&u.a.createElement(W,{placeholder:this.props.intl.formatMessage(Object(a.a)({},E.countryField)),value:this.props.settings.country,onBlur:function(t){return e.props.update(m.f,t)}})),u.a.createElement(b.a,null,this.props.settings&&u.a.createElement(W,{placeholder:this.props.intl.formatMessage(Object(a.a)({},E.langField)),value:this.props.settings.lang,onBlur:function(t){return e.props.update(m.s,t.toLowerCase())}}))),u.a.createElement(b.c,{flat:!0},u.a.createElement(b.a,null,this.props.settings&&u.a.createElement(W,{placeholder:this.props.intl.formatMessage(Object(a.a)({},E.themeField)),value:this.props.settings.theme,onBlur:function(t){return e.props.update(m.G,t)}})),u.a.createElement(b.a,null,this.props.settings&&u.a.createElement(W,{placeholder:this.props.intl.formatMessage(Object(a.a)({},E.timezoneField)),value:this.props.settings.timezone,onBlur:function(t){return e.props.update(m.L,t)}}))))))),u.a.createElement(b.a,null,u.a.createElement(I,null,u.a.createElement(U,null,u.a.createElement(h.a,E.companySettings)),u.a.createElement(T,null,u.a.createElement(b.b,null,u.a.createElement(b.c,{flat:!0},u.a.createElement(b.a,null,this.props.settings&&u.a.createElement(W,{placeholder:this.props.intl.formatMessage(Object(a.a)({},E.nameField)),value:this.props.settings.name,onBlur:function(t){return e.props.update(m.t,t)}})),u.a.createElement(b.a,null,this.props.settings&&u.a.createElement(W,{placeholder:this.props.intl.formatMessage(Object(a.a)({},E.addressField)),value:this.props.settings.address,onBlur:function(t){return e.props.update(m.a,t)}}))),u.a.createElement(b.c,{flat:!0},u.a.createElement(b.a,null,this.props.settings&&u.a.createElement(W,{placeholder:this.props.intl.formatMessage(Object(a.a)({},E.emailField)),value:this.props.settings.email,onBlur:function(t){return e.props.update(m.r,t)}})),u.a.createElement(b.a,null,this.props.settings&&u.a.createElement(W,{placeholder:this.props.intl.formatMessage(Object(a.a)({},E.phoneField)),value:this.props.settings.phone,onBlur:function(t){return e.props.update(m.z,t)}})))))))),u.a.createElement(b.c,null,u.a.createElement(b.a,null,u.a.createElement(I,null,u.a.createElement(U,null,u.a.createElement(h.a,E.ticketSettings)),u.a.createElement(T,null,u.a.createElement(b.a,null,this.props.settings&&u.a.createElement(J,{placeholder:this.props.intl.formatMessage(Object(a.a)({},E.ticketTemplateField)),value:this.props.settings.ticketTemplate,onBlur:function(t){return e.props.update(m.K,t)},noValue:m.o}))))),u.a.createElement(b.a,null,u.a.createElement(I,null,u.a.createElement(U,null,u.a.createElement(h.a,E.storageSettings)),u.a.createElement(T,null,u.a.createElement(b.b,null,u.a.createElement(b.c,{flat:!0},u.a.createElement(b.a,null,this.props.settings&&u.a.createElement(W,{placeholder:this.props.intl.formatMessage(Object(a.a)({},E.backupPeriodField)),value:this.props.settings.backupFrecuency,onBlur:function(t){return e.props.update(m.d,t)}})),u.a.createElement(b.a,null,this.props.settings&&u.a.createElement(W,{placeholder:this.props.intl.formatMessage(Object(a.a)({},E.backupLocationField)),value:this.props.settings.backupLocation,onBlur:function(t){return e.props.update(m.e,t)}}))),u.a.createElement(b.c,{flat:!0},u.a.createElement(b.a,null,this.props.settings&&u.a.createElement(W,{placeholder:this.props.intl.formatMessage(Object(a.a)({},E.printerNameField)),value:this.props.settings.printerName,onBlur:function(t){return e.props.update(m.B,t)}})),u.a.createElement(b.a,null,this.props.settings&&u.a.createElement(W,{placeholder:this.props.intl.formatMessage(Object(a.a)({},E.printerIPField)),value:this.props.settings.printerIP,onBlur:function(t){return e.props.update(m.A,t)}})))))))))}}]),n}(u.a.Component),Q=Object(g.createStructuredSelector)({settings:function(e){return e.settings}});t.default=Object(p.connect)(Q,function(e){return{update:function(t,n){return e(Object(v.a)(t,n))}}})(Object(h.e)(H))}}]);
//# sourceMappingURL=6.5f52eeaf.chunk.js.map