let Utils={LIBRARY:{fuse:{lib:["./js/fuse_6.4.6.js"],instance:"Fuse",attr:{async:!0}}},loadScripts:function(e,t,n={},i=document.head){let s=[];for(let t in e)s[t]=document.createElement("script"),s[t].setAttribute("type","text/javascript"),s[t].setAttribute("src",e[t]),Object.keys(n).forEach((function(e){s[t].setAttribute(e,n[e])}));let a=function(){let e=s.shift(),n=!1;i.appendChild(e),e.onload=e.onreadystatechange=function(){let e=this.readyState;e&&"complete"!==e&&"loaded"!==e||n||(n=!0,s.length?a():t())}};a()},externalLibrary(e){return new Promise((t=>{null==window[e.instance]?this.loadScripts(e.lib,(function(){t(window[e.instance])}),e.attr,e.container):t(window[e.instance])}))}};window.addEventListener("load",(()=>{if(!document.documentElement.classList.contains("dark")){let e=document.querySelector("#darkMode > i").classList;e.toggle("icon-light"),e.toggle("icon-dark")}function e(){let e=window.location.hash,t=document.querySelector(`a[class="h-anchor"][href="${e}"]`);if(null!=t){let e=t.parentElement.parentElement;document.querySelectorAll(".boxed").forEach((e=>{e.classList.remove("boxed")}));let n=setTimeout((function(){e.classList.add("boxed"),clearTimeout(n)}),100)}}document.querySelector("#darkMode").addEventListener("click",(function(){let e=document.documentElement.classList;e.toggle("dark");let t=document.querySelector("#darkMode > i").classList;t.toggle("icon-light"),t.toggle("icon-dark");let n=e.contains("dark");localStorage.theme=n?"dark":""})),document.querySelectorAll("ul.collapsible > li > strong").forEach((function(e){let t=e.parentElement;t.classList.add("active"),e.classList.toggle("arrow-down"),e.addEventListener("click",(function(){t.classList.toggle("active"),this.classList.toggle("arrow-down")}))})),document.querySelectorAll(".h3-wrap ul").forEach((function(e,t){let n=e.querySelectorAll("li").length,i=e.className.match("cols-([0-9]+)"),s=null===i?1:parseInt(i[1]),a=1===n||n%s==0?s:n%s;for(let t=1;t<=a;t++){let n=e.querySelector(`li:nth-last-child(${t})`);null!=n&&(n.style.borderBottom="none")}})),e(),window.addEventListener("popstate",e);const t=function(e){let t=e||{},n={trigger:"#mysearch-trigger",container:"#mysearch",dbPath:"https://agentmero.github.io/ref-public/search.json?v=1.0"};this.container=void 0!==t.container?t.container:n.container,this.trigger=void 0!==t.trigger?t.trigger:n.trigger,this.dbPath=void 0!==t.dbPath?t.dbPath:n.dbPath,this.lastSearch={},window.search=this};t.prototype={start:function(){const e=this;e.fetchData(),this.search=document.querySelector(this.container),this.box=document.querySelector("#mysearch-box"),this.input=document.querySelector("#mysearch-input"),this.result=document.querySelector("#mysearch-list"),this.lastSearch.query=this.input.value,this.detectModal();document.querySelector(".cancel").addEventListener("click",(function(t){e.closeModal(!0)}));document.querySelector("#mysearch-clear").addEventListener("click",(function(t){e.doSearch("",!0).then()}));const t=document.querySelector(e.trigger);t.addEventListener("click",(function(t){e.openModal(!0)})),document.body.addEventListener("click",(function(n){e.isOpened()&&(e.box.contains(n.target)||t.contains(n.target)||e.closeModal())})),this.input.addEventListener("keyup",(function(t){let n=e.input.value;n!==e.lastSearch.query&&e.doSearch(n,!0).then()})),document.body.addEventListener("keydown",(function(t){if("ArrowDown"===t.key)e.isOpened()&&(e.moveItem(!1),t.preventDefault(),t.stopPropagation());else if("ArrowUp"===t.key)e.isOpened()&&(e.moveItem(!0),t.preventDefault(),t.stopPropagation());else if("Enter"===t.key){if(e.isOpened()){let t=e.result.querySelector("li.active > a");null!=t&&(window.location.href=t.getAttribute("href"))}t.preventDefault(),t.stopPropagation()}else"Escape"===t.key?(e.closeModal(),t.preventDefault(),t.stopPropagation()):(t.ctrlKey||t.metaKey)&&"k"===t.key&&(e.toggleModal(),t.preventDefault(),t.stopPropagation())}))},moveItem:function(e){let t=this.result.querySelector("li.active"),n=e?t.previousElementSibling:t.nextElementSibling;null!==n&&(t.classList.remove("active"),t.classList.add("inactive"),n.classList.remove("inactive"),n.classList.add("active"),this.renderPreview())},detectModal:function(){const e=window.location.href,t=new URL(e).searchParams.get("q");null!=t&&(this.input.value=t,this.openModal(!1))},isOpened:function(){return this.search.classList.contains("block")},toggleModal:function(){this.isOpened()?this.closeModal():this.openModal()},openModal:function(e){this.search.classList.remove("hidden"),this.search.classList.add("block"),e&&(this.input.value=""),document.body.classList.add("overflow-hidden"),this.doSearch(this.input.value,!1),this.input.focus()},closeModal:function(e){this.search.classList.remove("block"),this.search.classList.add("hidden"),e&&(this.input.value=""),document.body.classList.remove("overflow-hidden"),this.input.blur()},changeUrl:function(e){let t=`${location.protocol}//${location.host}${location.pathname}`,n=t;""!==e&&null!=e&&(n=`${t}?${e}`),history.pushState({},null,n)},fetchData:async function(){const e=this;if(void 0===e.index)return await fetch(e.dbPath).then((e=>e.text())).then((t=>(e.db=JSON.parse(t),e.index=new Fuse(e.db,{includeScore:!1,shouldSort:!0,includeMatches:!0,matchEmptyQuery:!0,threshold:.1,keys:[{name:"title",weight:12},{name:"tags",weight:6},{name:"categories",weight:6},{name:"sections.h3.title",weight:5},{name:"sections.h2.title",weight:1},{name:"intro",weight:1}]}),e.lastSearch.whole=e.db.map(((e,t)=>({item:e,score:1,refIndex:t}))),t)))},doSearch:async function(e,t){const n=this;await n.fetchData().then((()=>{if(this.lastSearch.query===e&&void 0!==this.lastSearch.resp)this.renderResult(this.lastSearch.resp),this.renderPreview();else{let i=""!==e?n.index.search(`${e}`):n.lastSearch.whole;t&&this.changeUrl(""===e?null:`q=${e}`),this.lastSearch.query=e,this.lastSearch.resp=i,this.renderResult(i),this.renderPreview()}}))},addEventToResult:function(){const e=this;this.result.querySelectorAll("li").forEach((function(t){t.addEventListener("mouseover",(function(t){e.isOpened()&&(e.result.querySelectorAll("li").forEach((function(e){e.classList.remove("active"),e.classList.add("inactive")})),this.classList.remove("inactive"),this.classList.add("active"),e.renderPreview())}))}))},mark:function(e,t){let n=[],i=t.shift();for(let s=0;s<e.length;s++){let a=e.charAt(s);i&&s===i[0]&&n.push("<mark>"),n.push(a),i&&s===i[1]&&(n.push("</mark>"),i=t.shift())}return n.join("")},highlightMatches:function(e){if(void 0===e.matches||0===e.item.length)return;const t=this;e.item=JSON.parse(JSON.stringify(t.db[e.refIndex])),e.matches.forEach((n=>{switch(n.key){case"tags":case"categories":e.item[n.key][n.refIndex]=t.mark(n.value,n.indices);break;case"sections.h2.title":e.item.sections[n.refIndex].h2.title=t.mark(n.value,n.indices);break;case"sections.h3.title":let i=0,s=0;for(let a=0;a<e.item.sections.length;a++){let l=e.item.sections[a].h3;if(i+=l.length,n.refIndex>=s&&n.refIndex<i){e.item.sections[a].h3[n.refIndex-s].title=t.mark(n.value,n.indices);break}s+=l.length}break;default:e.item[n.key]=t.mark(n.value,n.indices)}}))},renderResult:function(e){const t=this;let n="",i=0;e.forEach((function(e,s){let a="inactive";0===i&&(a="active"),t.highlightMatches(e);let l=e.item,r=l.tags||[],o=l.categories||[],c=r.join("<span class='text-slate-300 px-1'>•</span>"),d="";""!==c&&(d=`<div class="w-px h-3 bg-slate-300 mr-2"></div><span class="mr-2">${c}</span>`),n+=`<li class="group ${a} m-3 fadeIn" data-index="${s}">\n                                <a href="${l.path}" class="flex justify-between items-center rounded-lg py-1 px-4 transition-colors duration-100 ease-in-out overflow-hidden">\n                                    <div class="flex items-start">\n                                        <div class="flex justify-center items-center w-5 mr-5 mt-2 flex-none">\n                                            <i class="icon text-2xl">${l.icon}</i>\n                                        </div>\n                                        <div class="flex flex-col truncate">\n                                            <span class="font-semibold dark:text-slate-300 dark:group-hover:text-white">${l.title}</span>\n                                            <div class="sub-intro flex items-center text-sm leading-tight mt-4 xl:mt-2 mb-2">\n                                                <span class="mr-2">${o[0]}</span>\n                                                ${d}\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <i class="w-6 ml-8 p-2 icon icon-enter"></i>\n                                </a>\n                            </li>`,i++})),this.result.innerHTML=n,this.addEventToResult()},renderPreview(){const e=this.search.querySelector("li.active");if(null==e)return;let t=e.getAttribute("data-index"),n=this.lastSearch.resp[parseInt(t)].item,i="";n.sections.forEach((function(e,t,s){let a="";e.h3.forEach((function(e){let t=n.path+e.anchor;a+=`<a href="${t}" class="inline-block mr-1 px-2 p-0.5 transition duration-200 ease-in-out rounded-full hover:bg-emerald-500 text-slate-500 dark:text-slate-300 hover:text-slate-50">${e.title.toLowerCase()}</a>`}));let l=n.path+e.h2.anchor;i+=`<li class="text-slate-700 dark:text-slate-300 hover:underline hover:text-slate-900 mt-3 mb-2">\n                                <a href="${l}"> ${e.h2.title}</a>\n                            </li>\n                            <span>${a}</span>`})),document.querySelector(".preview-panel").innerHTML=`<section class="w-full py-3 px-5">\n                <div class="flex justify-center pt-1 pb-4">\n                    <div class="flex justify-center items-center w-8 h-8 rounded ${void 0===n.background?"bg-emerald-500":n.background} shadow-lg">\n                        <i class="text-2xl text-slate-100">${n.icon}</i>\n                    </div>\n                </div>\n                <div class="flex justify-center items-center font-medium flex-wrap dark:text-slate-200">${n.title}</div>\n                <ol class="list-inside mt-4 pt-2 text-sm list-decimal">${i}</ol>\n            </section>`}},Utils.externalLibrary(Utils.LIBRARY.fuse).then((()=>(new t).start()))}));