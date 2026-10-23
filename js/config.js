/* Sample directory inspired by a real multi-service homelab.
   URLs not known at build time are intentionally blank for safe customization. */
window.HLC_DEFAULTS = {
  workspaceName: "Home Lab Companion",
  apps: [
    {id:"nas-primary",name:"UGREEN DX4700",category:"Infrastructure",url:"",icon:"▤",description:"Primary NAS and homelab host.",favorite:true},
    {id:"nas-secondary",name:"Synology DS918+",category:"Infrastructure",url:"",icon:"▤",description:"Secondary NAS and storage system.",favorite:false},
    {id:"dockhand",name:"Dockhand",category:"Administration",url:"",icon:"⚙",description:"Docker application and stack management.",favorite:true},
    {id:"npm",name:"Nginx Proxy Manager",category:"Networking",url:"",icon:"◈",description:"Reverse proxy and host routing.",favorite:true},
    {id:"netbird",name:"NetBird",category:"Networking",url:"",icon:"◈",description:"Private network and remote access.",favorite:false},
    {id:"cloudflare",name:"Cloudflare Tunnel",category:"Networking",url:"",icon:"◈",description:"Remote access without directly exposing services.",favorite:false},
    {id:"plex",name:"Plex",category:"Media",url:"",icon:"▶",description:"Personal media streaming library.",favorite:true},
    {id:"beszel",name:"Beszel",category:"Monitoring",url:"",icon:"◉",description:"Lightweight host and container monitoring.",favorite:false},
    {id:"scrutiny",name:"Scrutiny",category:"Monitoring",url:"",icon:"◉",description:"Storage device health monitoring.",favorite:false},
    {id:"dozzle",name:"Dozzle",category:"Monitoring",url:"",icon:"◉",description:"Real-time Docker log viewer.",favorite:false},
    {id:"uptime-kuma",name:"Uptime Kuma",category:"Monitoring",url:"",icon:"◉",description:"Service availability monitoring.",favorite:false},
    {id:"grafana",name:"Grafana",category:"Monitoring",url:"",icon:"◉",description:"Dashboards and observability.",favorite:false},
    {id:"prometheus",name:"Prometheus",category:"Monitoring",url:"",icon:"◉",description:"Metrics collection and querying.",favorite:false},
    {id:"alloy",name:"Grafana Alloy",category:"Monitoring",url:"",icon:"◉",description:"Telemetry collection and forwarding.",favorite:false},
    {id:"nextcloud",name:"Nextcloud",category:"Storage & Files",url:"",icon:"☁",description:"File access and collaboration.",favorite:false},
    {id:"filestash",name:"Filestash",category:"Storage & Files",url:"",icon:"▧",description:"Web-based file browser.",favorite:false},
    {id:"syncthing",name:"Syncthing",category:"Storage & Files",url:"",icon:"▧",description:"File synchronization across devices.",favorite:false},
    {id:"kopia",name:"Kopia",category:"Backup",url:"",icon:"◷",description:"Encrypted backup and snapshot management.",favorite:false},
    {id:"leafwiki",name:"LeafWiki",category:"Knowledge",url:"",icon:"✎",description:"Homelab documentation and knowledge base.",favorite:true},
    {id:"searxng",name:"SearXNG",category:"Utilities",url:"",icon:"⌕",description:"Privacy-focused metasearch.",favorite:false},
    {id:"ntfy",name:"ntfy",category:"Utilities",url:"",icon:"✚",description:"Push notifications for services and workflows.",favorite:false},
    {id:"netbootxyz",name:"netboot.xyz",category:"Administration",url:"",icon:"✚",description:"Network boot and installation utilities.",favorite:false},
    {id:"homepage",name:"Homepage",category:"Administration",url:"",icon:"▦",description:"Existing homelab dashboard.",favorite:false},
    {id:"itflow",name:"ITFlow",category:"Business Tools",url:"",icon:"▦",description:"IT service documentation and asset inventory.",favorite:false}
  ]
};
