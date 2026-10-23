(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const CATS = ["Infrastructure","Administration","Monitoring","Networking","Media","Storage & Files","Backup","Knowledge","Utilities","Business Tools","Productivity","Other"];
  const CAT_ICONS = {"Infrastructure":"▤","Administration":"⚙","Monitoring":"◉","Networking":"◈","Media":"▶","Storage & Files":"▧","Backup":"◷","Knowledge":"✎","Utilities":"✚","Business Tools":"▦","Productivity":"✎","Other":"＋"};
  const CAT_COLORS = {"Monitoring":"violet","Backup":"green","Storage & Files":"green","Media":"amber","Business Tools":"violet","Productivity":"violet"};
  const STORE = "hlc-config-v1";
  let config = loadConfig(), activeView = "overview", activeCategory = "All", searchTerm = "", toastTimer;
  function clone(x){return JSON.parse(JSON.stringify(x));}
  function loadConfig(){
    try { const raw=localStorage.getItem(STORE); if(raw){const c=JSON.parse(raw); if(c&&Array.isArray(c.apps)) return normalize(c);} } catch(e){}
    return normalize(clone(window.HLC_DEFAULTS));
  }
  function normalize(c){
    c.workspaceName = String(c.workspaceName || "Home Lab Companion").slice(0,40);
    c.apps = c.apps.filter(a=>a&&a.name).map((a,i)=>({
      id:String(a.id||("app-"+Date.now()+"-"+i)),name:String(a.name).slice(0,60),
      category:CATS.includes(a.category)?a.category:"Other",url:safeUrl(a.url||"",true),
      icon:String(a.icon||"▦").slice(0,8),description:String(a.description||"").slice(0,160),favorite:!!a.favorite
    }));
    return c;
  }
  function save(){localStorage.setItem(STORE,JSON.stringify(config));}
  function esc(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function safeUrl(value,allowBlank=false){
    const s=String(value||"").trim(); if(!s&&allowBlank)return "";
    try {const u=new URL(s); if(["http:","https:"].includes(u.protocol)) return u.href;}catch(e){}
    return "";
  }
  function toast(message){const el=$("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),3000);}
  function categories(){return [...new Set(config.apps.map(a=>a.category))].sort((a,b)=>a.localeCompare(b));}
  function setView(view){
    activeView=view; document.querySelectorAll(".view").forEach(v=>v.classList.add("hidden"));
    const target=$(view+"View");if(target)target.classList.remove("hidden");
    document.querySelectorAll("[data-view]").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
    $("breadcrumb").textContent=({overview:"Overview",applications:"Applications",infrastructure:"Infrastructure",settings:"Settings & Import"})[view]||view;
    $("sidebar").classList.remove("open"); render();
    window.scrollTo({top:0,behavior:"smooth"});
  }
  function card(a){
    const color=CAT_COLORS[a.category]||"cyan";
    const url=safeUrl(a.url);
    return `<article class="app-card"><div class="app-card-top"><div class="app-symbol ${color}">${esc(a.icon)}</div><div class="card-actions"><button class="mini-btn ${a.favorite?"favorited":""}" data-favorite="${esc(a.id)}" title="${a.favorite?"Remove favorite":"Add favorite"}" aria-label="${a.favorite?"Remove favorite":"Add favorite"}">${a.favorite?"★":"☆"}</button><button class="mini-btn" data-edit="${esc(a.id)}" title="Edit application" aria-label="Edit ${esc(a.name)}">⋯</button></div></div><h3>${esc(a.name)}</h3><p>${esc(a.description||"No description added yet.")}</p><div class="card-footer"><span class="category-pill">${esc(a.category)}</span>${url?`<a class="open-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Open app ↗</a>`:`<button class="open-link disabled" data-edit="${esc(a.id)}">Set URL ↗</button>`}</div></article>`;
  }
  function bindCardButtons(root){
    root.querySelectorAll("[data-favorite]").forEach(b=>b.addEventListener("click",()=>{const a=config.apps.find(x=>x.id===b.dataset.favorite);if(a){a.favorite=!a.favorite;save();render();}}));
    root.querySelectorAll("[data-edit]").forEach(b=>b.addEventListener("click",()=>openModal(b.dataset.edit)));
  }
  function renderCategoryNav(){
    const nav=$("categoryNav");
    nav.innerHTML=categories().map(c=>`<button class="nav-item" data-category="${esc(c)}"><span class="nav-icon">${esc(CAT_ICONS[c]||"＋")}</span>${esc(c)}</button>`).join("");
    nav.querySelectorAll("[data-category]").forEach(b=>b.addEventListener("click",()=>{activeCategory=b.dataset.category;searchTerm="";$("globalSearch").value="";setView("applications");renderApplications();}));
    $("appCount").textContent=config.apps.length;
  }
  function renderStats(){
    $("statApps").textContent=config.apps.length;
    $("statCategories").textContent=categories().length;
    $("statFavorites").textContent=config.apps.filter(a=>a.favorite).length;
    $("statLinks").textContent=config.apps.filter(a=>safeUrl(a.url)).length;
    $("lastUpdated").textContent="Local directory · "+new Date().toLocaleDateString(undefined,{month:"short",day:"numeric"});
  }
  function renderOverview(){
    const fav=config.apps.filter(a=>a.favorite).slice(0,6);
    $("favoriteGrid").innerHTML=fav.length?fav.map(card).join(""):`<div class="empty-state"><h3>No favorites pinned</h3><p>Use the star on an application card to pin it here.</p></div>`;
    bindCardButtons($("favoriteGrid"));
    $("categoryCards").innerHTML=categories().map(c=>`<button class="category-card" data-catcard="${esc(c)}"><span class="cat-icon">${esc(CAT_ICONS[c]||"＋")}</span><span><strong>${esc(c)}</strong><small>${config.apps.filter(a=>a.category===c).length} applications</small></span></button>`).join("");
    $("categoryCards").querySelectorAll("[data-catcard]").forEach(b=>b.addEventListener("click",()=>{activeCategory=b.dataset.catcard;setView("applications");renderApplications();}));
  }
  function renderApplications(){
    const chips=$("filterChips");
    chips.innerHTML=["All",...categories()].map(c=>`<button class="filter-chip ${activeCategory===c?"active":""}" data-filter="${esc(c)}">${esc(c)}</button>`).join("");
    chips.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{activeCategory=b.dataset.filter;renderApplications();}));
    let apps=config.apps.filter(a=>(activeCategory==="All"||a.category===activeCategory)&&(`${a.name} ${a.category} ${a.description}`.toLowerCase().includes(searchTerm.toLowerCase())));
    const sort=$("sortSelect").value;
    apps.sort((a,b)=>sort==="category"?a.category.localeCompare(b.category)||a.name.localeCompare(b.name):sort==="favorites"?(Number(b.favorite)-Number(a.favorite)||a.name.localeCompare(b.name)):a.name.localeCompare(b.name));
    $("applicationGrid").innerHTML=apps.map(card).join("");
    $("emptyApps").classList.toggle("hidden",apps.length>0);$("applicationGrid").classList.toggle("hidden",apps.length===0);
    $("appsTitle").textContent=searchTerm?`Search results`:(activeCategory==="All"?"Applications":activeCategory);
    bindCardButtons($("applicationGrid"));
  }
  function renderInfrastructure(){
    const apps=config.apps.filter(a=>a.category==="Infrastructure"||a.category==="Administration"||a.category==="Networking");
    $("infrastructureGrid").innerHTML=apps.length?apps.map(card).join(""):`<div class="empty-state"><h3>No infrastructure entries</h3><p>Add a NAS, server, or administration tool.</p></div>`;
    bindCardButtons($("infrastructureGrid"));
  }
  function renderSettings(){$("workspaceName").value=config.workspaceName;}
  function render(){
    document.title=config.workspaceName;
    document.querySelector(".brand strong").textContent=config.workspaceName.toUpperCase().slice(0,20);
    document.querySelector(".brand small").textContent="COMPANION";
    renderCategoryNav();renderStats();renderOverview();renderApplications();renderInfrastructure();renderSettings();
  }
  function openModal(id){
    const a=id?config.apps.find(x=>x.id===id):null;
    $("appForm").reset();$("appId").value=a?a.id:"";$("modalTitle").textContent=a?"Edit application":"Add application";
    $("appName").value=a?a.name:"";$("appUrl").value=a?a.url:"";$("appDescription").value=a?a.description:"";
    $("appFavorite").checked=a?!!a.favorite:false;$("appIcon").value=a?a.icon:"▦";
    const current=a?a.category:"Other";const cats=[...new Set([...CATS,...categories()])];
    $("appCategory").innerHTML=cats.map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join("");$("appCategory").value=current;
    $("deleteAppBtn").classList.toggle("hidden",!a);$("appModal").classList.remove("hidden");$("appName").focus();
  }
  function closeModal(){$("appModal").classList.add("hidden");}
  function saveApp(e){
    e.preventDefault();const name=$("appName").value.trim();if(!name){toast("Application name is required.");return;}
    const rawUrl=$("appUrl").value.trim();if(rawUrl&&!safeUrl(rawUrl)){toast("Enter a valid http:// or https:// URL, or leave it blank.");return;}
    const id=$("appId").value||("app-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,7));
    const item={id,name,category:$("appCategory").value,url:safeUrl(rawUrl,true),icon:$("appIcon").value,description:$("appDescription").value.trim(),favorite:$("appFavorite").checked};
    const index=config.apps.findIndex(a=>a.id===id);if(index>=0)config.apps[index]=item;else config.apps.push(item);
    save();closeModal();render();toast(index>=0?"Application updated.":"Application added.");
  }
  function exportConfig(){
    const blob=new Blob([JSON.stringify(config,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="home-lab-companion-config.json";a.click();URL.revokeObjectURL(url);toast("Configuration export created.");
  }
  async function importConfig(file){
    try{const data=JSON.parse(await file.text());if(!data||!Array.isArray(data.apps))throw new Error("Expected an object with an apps array.");
      const valid=data.apps.every(a=>a&&typeof a.name==="string");if(!valid)throw new Error("One or more app entries are invalid.");
      if(!confirm("Import this configuration and replace the current application directory?"))return;
      config=normalize(data);save();render();toast("Configuration imported.");
    }catch(e){toast("Import failed: "+e.message);}
    finally{$("importFile").value="";}
  }
  document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>setView(b.dataset.view)));
  $("browseApps").addEventListener("click",()=>{activeCategory="All";setView("applications");});
  $("allFavorites").addEventListener("click",()=>{activeCategory="All";setView("applications");});
  $("addAppBtn").addEventListener("click",()=>openModal());$("infraAddBtn").addEventListener("click",()=>openModal());$("settingsAddBtn").addEventListener("click",()=>openModal());$("emptyAddBtn").addEventListener("click",()=>openModal());
  $("closeModal").addEventListener("click",closeModal);$("cancelModal").addEventListener("click",closeModal);$("appForm").addEventListener("submit",saveApp);
  $("appModal").addEventListener("click",e=>{if(e.target===$("appModal"))closeModal();});
  $("deleteAppBtn").addEventListener("click",()=>{const id=$("appId").value;const a=config.apps.find(x=>x.id===id);if(a&&confirm(`Delete "${a.name}" from this directory?`)){config.apps=config.apps.filter(x=>x.id!==id);save();closeModal();render();toast("Application deleted.");}});
  $("globalSearch").addEventListener("input",e=>{searchTerm=e.target.value;activeCategory="All";setView("applications");$("globalSearch").focus();$("globalSearch").setSelectionRange(searchTerm.length,searchTerm.length);});
  $("sortSelect").addEventListener("change",renderApplications);
  $("saveWorkspace").addEventListener("click",()=>{config.workspaceName=$("workspaceName").value.trim()||"Home Lab Companion";save();render();toast("Workspace name saved.");});
  $("exportBtn").addEventListener("click",exportConfig);$("importFile").addEventListener("change",e=>{if(e.target.files[0])importConfig(e.target.files[0]);});
  $("resetBtn").addEventListener("click",()=>{if(confirm("Restore the original sample directory? This replaces your current directory.")){config=normalize(clone(window.HLC_DEFAULTS));save();render();toast("Sample directory restored.");}});
  $("themeBtn").addEventListener("click",()=>{document.body.classList.toggle("light-mode");localStorage.setItem("hlc-light-mode",document.body.classList.contains("light-mode")?"1":"0");});
  $("menuBtn").addEventListener("click",()=>$("sidebar").classList.toggle("open"));
  document.addEventListener("keydown",e=>{if(e.key==="/"&&!["INPUT","TEXTAREA"].includes(document.activeElement.tagName)){e.preventDefault();$("globalSearch").focus();}if(e.key==="Escape")closeModal();});
  if(localStorage.getItem("hlc-light-mode")==="1")document.body.classList.add("light-mode");
  if("serviceWorker" in navigator && (location.protocol==="https:"||location.hostname==="localhost"||location.hostname==="127.0.0.1"))navigator.serviceWorker.register("./service-worker.js").catch(()=>{});
  render();
})();