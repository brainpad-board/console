var e=Object.defineProperty,t=(t,i,s)=>(((t,i,s)=>{i in t?e(t,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[i]=s})(t,"symbol"!=typeof i?i+"":i,s),s);import{E as i,b as s,c as r,C as a,r as o,a as n,d as l,o as c,e as d,f as h,g as u,h as f,F as m,w as p,v as g,i as w,t as b,n as y,j as v,k as E,l as O}from"./vendor.e2bf060b.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const i of e)if("childList"===i.type)for(const e of i.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();var x={};
/**
 * Instantiate by `var xmodem = require('xmodem');`
 * @class
 * @classdesc XMODEM Protocol in JavaScript
 * @name Xmodem
 * @license BSD-2-Clause
 */
class C extends i{constructor(){super(...arguments),t(this,"log",{info:e=>{},warn:e=>{},error:e=>{},debug:e=>{}}),t(this,"SOH",1),t(this,"STX",2),t(this,"EOT",4),t(this,"ACK",6),t(this,"NAK",21),t(this,"CAN",24),t(this,"FILLER",26),t(this,"CRC_MODE",67),t(this,"receive_interval_timer",!1),t(this,"XMODEM_MAX_TIMEOUTS",5),t(this,"XMODEM_MAX_ERRORS",10),t(this,"XMODEM_CRC_ATTEMPTS",3),t(this,"XMODEM_OP_MODE","crc"),t(this,"XMODEM_START_BLOCK",1),t(this,"timeout_seconds",10),t(this,"block_size",1024)}static get VERSION(){return require("../../../package.json").version}async send(e,t,i,s){this.log.info("Bytes to send : "+i.length),await this.sendLoop(e,t,new Uint8Array(i),s)}async sendLoop(e,t,i,r){for(var a=this.XMODEM_START_BLOCK,o=[],n=s.Buffer.alloc(this.block_size),l=!1,c=0;c<this.XMODEM_START_BLOCK;c++)o.push("");for(;i.length>0;){for(c=0;c<this.block_size;c++)n[c]=void 0===i[c]?this.FILLER:i[c];i=i.slice(this.block_size),o.push(n),n=s.Buffer.alloc(this.block_size)}for(this.emit("ready",o.length-1);!l;)try{r&&r(a,o.length);const{value:i,done:n}=await e.read();if(i){var d=[...i],h=" ";do{h=d.shift()}while(h===this.CRC_MODE&&d.length>0);if(h===this.CRC_MODE&&a!==this.XMODEM_START_BLOCK)continue;h===this.CRC_MODE&&a===this.XMODEM_START_BLOCK?(this.log.info("[SEND] - received C byte for CRC transfer!"),this.XMODEM_OP_MODE="crc",o.length>a&&(this.emit("start",this.XMODEM_OP_MODE),this.sendBlock(t,a,o[a],this.XMODEM_OP_MODE),this.emit("status",{action:"send",signal:"STX",block:a}),a++)):h===this.NAK&&a===this.XMODEM_START_BLOCK?(this.log.info("[SEND] - received NAK byte for standard checksum transfer!"),this.XMODEM_OP_MODE="normal",o.length>a&&(this.emit("start",this.XMODEM_OP_MODE),this.sendBlock(t,a,o[a],this.XMODEM_OP_MODE),this.emit("status",{action:"send",signal:"STX",block:a}),a++)):h===this.ACK&&a>this.XMODEM_START_BLOCK?(this.log.info("ACK RECEIVED"),this.emit("status",{action:"recv",signal:"ACK"}),o.length>a?(this.sendBlock(t,a,o[a],this.XMODEM_OP_MODE),this.emit("status",{action:"send",signal:"STX",block:a}),a++):o.length===a&&(!1===l?(l=!0,this.log.info("WE HAVE RUN OUT OF STUFF TO SEND, EOT EOT!"),this.emit("status",{action:"send",signal:"EOT"}),t.write(s.Buffer.from([this.EOT]))):(this.log.info("[SEND] - Finished!"),this.emit("stop",0)))):h===this.NAK&&a>this.XMODEM_START_BLOCK?a===o.length&&l?(this.log.info("[SEND] - Resending EOT, because receiver responded with NAK."),this.emit("status",{action:"send",signal:"EOT"}),t.write(s.Buffer.from[this.EOT])):(this.log.info("[SEND] - Packet corruption detected, resending previous block."),this.emit("status",{action:"recv",signal:"NAK"}),a--,o.length>a&&(this.sendBlock(t,a,o[a],this.XMODEM_OP_MODE),this.emit("status",{action:"send",signal:"STX",block:a}),a++)):(this.log.warn("GOT SOME UNEXPECTED DATA which was not handled properly!"),this.log.warn("===>"),this.log.warn("command : "+h),this.log.warn("value : "+d),this.log.warn("<==="),this.log.warn("blockNumber: "+a))}if(n||l)break}catch(u){}}setIntervalX(e,t,i){var s=0,r=setInterval((function(){++s===i&&(clearInterval(r),this.receive_interval_timer=!1),e()}),t);return r}sendBlock(e,t,i,a){var o=0,n=s.Buffer.concat([s.Buffer.from([this.STX]),s.Buffer.from([t]),s.Buffer.from([255-t]),i]);if(this.log.info("SENDBLOCK! Data length: "+i.length),this.log.info(n),"crc"===a){var l=r.crc16xmodem(i).toString(16);l.length%2==1&&(l="0".concat(l)),2===l.length&&(l="00".concat(l)),n=s.Buffer.concat([n,s.Buffer.from(l,"hex")])}else{for(var c=3;c<n.length;c++)o+=n.readUInt8(c);(o=(o%=256).toString(16)).length%2!=0&&(o="0"+o),n=s.Buffer.concat([n,s.Buffer.from(o,"hex")])}this.log.info("Sending buffer with total length: "+n.length),e.write(n)}receiveBlock(e,t,i,r,a,o){var n,l=i[0],c=parseInt(i[1]),d=parseInt(i[2]),h="crc"===a?2:1;if(l===this.STX){if(c+d!==255)return this.log.error("ERROR: Block integrity check failed!"),void e.write(s.Buffer.from([this.NAK]));if(c===t%256)return(n=i.slice(3,i.length-h)).length!==r?(this.log.error("ERROR: Received block size did not match the expected size. Received: "+n.length+" | Expected: "+r),void e.write(s.Buffer.from([this.NAK]))):(e.write(s.Buffer.from([this.ACK])),void o(n));this.log.error("ERROR: Synch issue! Received: "+c+" Expected: "+t)}else this.log.error("ERROR!")}writeFile(e,t,i){this.log.info("writeFile called");var s=x.createWriteStream(t);s.once("open",(function(t){this.log.info("File stream opened, buffer length: "+e.length);for(var r=0;r<e.length;r++)s.write(e[r]);s.end(),this.log.info("File written"),i()}))}}class M{constructor(){this.port=null,this.writer=null,this.reader=null,this.encoder=new TextEncoder,this.decoder=new TextDecoder,this.inputStream=null,this.outputStream=null,this.respq=new a,this.xmodem=new C,this.readLoopPromise=null,this.enableReadLoop=!1}async open(e){try{this.port=e,await this.attach(),this.startReadLoop()}catch(t){throw alert(t),this.port=null,t}}async readLoop(){let e="",t=0;for(this.enableReadLoop=!0;this.enableReadLoop;)try{const{value:i,done:s}=await this.reader.read();if(i){const s=this.decoder.decode(i);e+=s;let r=e.indexOf("\n");for(;r>=0;){let i=e.substr(0,r).replace("\r","");t<2&&(t=i.includes("Bootloader")?0:i.includes("------")?1:i.includes("OK.")?2:3),3===t&&this.respq.push(i),e=e.substr(r+1),r=e.indexOf("\n"),2===t&&(t=3)}}s&&(this.enableReadLoop=!1)}catch(i){break}}async attach(){var e,t;if(await this.port.open({baudRate:115200,dataBits:8,parity:"none",stopBits:1,flowControl:"none",baudrate:115200,databits:8,stopbits:1,rtscts:!1}),null==(null==(e=this.port)?void 0:e.writable))throw new Error("This is not a writable port");if(null==(null==(t=this.port)?void 0:t.readable))throw new Error("This is not a readable port");this.reader=this.port.readable.getReader(),this.writer=this.port.writable.getWriter()}startReadLoop(){this.readLoopPromise=this.readLoop()}async stopReadLoop(){this.enableReadLoop=!1,this.readLoopPromise&&(await this.reader.cancel(),await this.readLoopPromise,this.readLoopPromise=null)}async detach(){await this.stopReadLoop(),await this.writer.releaseLock(),await this.reader.releaseLock(),await this.port.close()}async close(){await this.detach()}ensureOpen(){if(!this.port)throw new Error("port not opened")}async readUntil(e){const t=[];let i="";do{i=await this.respq.pop(),t.push(i)}while(i!==e);return t}async readUntilEmpty(){const e=[];let t="";do{t=await this.respq.tryPop(),t&&e.push(t)}while(t);return e}async sendCommand(e){await this.readUntilEmpty(),this.writer.write(this.encoder.encode(e+"\n"))}async sendAndExpect(e,t){return await this.sendCommand(e),await this.readUntil(t)}async sendConfirmAndExpect(e,t){await this.sendCommand(e),(await this.respq.pop()).endsWith("?")&&await this.sendAndExpect("Y",t)}async loaderVersion(){this.ensureOpen();return(await this.sendAndExpect("v","OK."))[0]}async erase(){this.ensureOpen(),await this.sendConfirmAndExpect("E","OK.")}async flash(e,t,i){this.ensureOpen(),t?await this.sendConfirmAndExpect("U","Waiting..."):await this.sendConfirmAndExpect("X","Waiting..."),await this.detach(),await this.attach();try{await this.xmodem.send(this.reader,this.writer,e,i)}catch(s){}this.startReadLoop()}}const k={components:{XCircleIcon:o,XIcon:n},data:()=>({availableFirmware:{microPython_0_2_3:{title:"Python (MicroPython v0.2.3)",url:"firmware/SITCore-SC13-MP-Firmware-v0.2.3.glb",isGlb:!0,image:null},TinyCLR_2_1_0_6200:{title:".NET C# (TinyCLR OS v2.1.0.6200)",url:"firmware/SITCore-SC13-Firmware-v2.1.0.6200.ghi",isGlb:!1,image:null}},error:null,firmware:void 0,ghiLoader:new M,isConnected:!1,operation:void 0,percent:0,port:void 0,socials:[{name:"Facebook",href:"https://www.facebook.com/brainpadboard/",icon:"fa-facebook"},{name:"YouTube",href:"https://www.youtube.com/channel/UCBOWfhv7bPF3tevjmGQMa7A",icon:"fa-youtube"},{name:"Twitter",href:"https://www.twitter.com/brainpadboard",icon:"fa-twitter"}],state:"idle"}),created(){navigator.serial.addEventListener("disconnect",(()=>{"complete"===this.state&&(this.state="idle",this.firmware=void 0,this.isConnected=!1)}))},methods:{async doConnect(){this.error=null;try{if(this.isConnected)return await this.ghiLoader.close(),this.isConnected=!1,this.port=void 0,void(this.state="idle");this.port=await navigator.serial.requestPort({}),await this.ghiLoader.open(this.port),this.isConnected=!0}catch(e){if(e.indexOf("No port selected by the user.")>-1)return;this.error=e,this.isConnected=!1,this.port=void 0}},progress(e,t){this.operation=e<3?"Erasing":"Loading",this.percent=Math.round(e/t*100),this.percent>=100&&(this.state="complete")},async saveFirmwareImage(e,t){const i=new FileReader;i.onload=function(t){try{localStorage.setItem(e,t.target.result)}catch(i){this.error="Failed to store firmware image."}},i.readAsDataURL(t)},async sha256(e){const t=(new TextEncoder).encode(e),i=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(i)).map((e=>e.toString(16).padStart(2,"0"))).join("")},async writeFirmware(){this.error=null,this.percent=0,this.availableFirmware[this.firmware].image||(this.error="Failed to load firmware from the server &mdash; cannot program the device."),this.state="erasing",await this.ghiLoader.erase(),this.state="writing",await this.ghiLoader.flash(this.availableFirmware[this.firmware].image,this.availableFirmware[this.firmware].isGlb,((e,t)=>this.progress(e,t)))}},watch:{async firmware(e){const t=this.availableFirmware[e].url,i=`download_${await this.sha256(t)}`;let s=null;const r=await fetch(t);if(r.ok){s=await r.blob();const t=await s.arrayBuffer();await this.saveFirmwareImage(i,s),this.availableFirmware[e].image=t}else this.error=`Unable to download the firmware (${r.status}).`,this.availableFirmware[e].image=null}}},_={class:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"},T=h("div",{class:"py-8"},[h("img",{class:"mx-auto",src:"assets/BrainPad.807a2293.png",alt:""})],-1),L={class:"max-w-3xl mx-auto space-y-8"},R=v('<h1 class="text-2xl font-bold">Steps to load new firmware.</h1><ol class="ol-reset space-y-4 leading-loose"><li>Connect your board to the computer.</li><li> On your board, hold down the <kbd>A</kbd> button while pressing and releasing the <kbd>RESET</kbd> button once. <span class="font-semibold">Keep holding the <kbd>A</kbd> button down,</span> wait for a second, and then release it. <ul class="mt-2 ul-reset text-[#f08000]"><li>This will put restart your board in bootloader mode.</li></ul></li><li>Click the connect button below and select the <em>GHI Bootloader Interface</em>.</li><li> Select the desired firmware and click <em>Load</em>. <ul class="mt-2 ul-reset text-[#f08000]"><li>This will completely erase your board.</li></ul></li><li>Once <span class="font-semibold">Loading is complete</span>, press and release the <kbd>RESET</kbd> button.</li><li>You may now begin using the board.</li></ol>',2),S={key:1,class:"rounded-md bg-red-50 p-4"},D={class:"flex"},A={class:"flex-shrink-0"},B={class:"ml-3"},X=h("h3",{class:"text-sm font-medium text-red-800"}," An error has occurred ",-1),F={class:"mt-2 text-sm text-red-700"},P={role:"list",class:"list-disc pl-5 space-y-1"},K=["innerHTML"],N={class:"ml-auto pl-3"},I={class:"-mx-1.5 -my-1.5"},U=h("span",{class:"sr-only"},"Dismiss",-1),j={key:2,class:"bg-gray-100 rounded-lg p-8"},q={class:"mb-4"},z=h("label",{for:"firmware",class:"block text-sm font-medium text-gray-700"},"Firmware",-1),W=["value"],G={class:"space-x-4"},H=["disabled"],V={key:1},Y=[h("div",{class:"mb-2"},"Erasing...",-1),h("div",{class:"w-full h-2"},null,-1)],$={key:2},Q={class:"mb-2"},J={class:"w-full h-2 bg-[#f08000] bg-opacity-25"},Z={key:3},ee=h("div",{class:"mb-2"},"Loading is complete.",-1),te=h("div",{class:"mb-4 w-full h-2 bg-[#f08000]"},null,-1),ie={class:"space-x-4"},se={class:"bg-white"},re={class:"max-w-7xl mx-auto py-12 md:flex md:items-center md:justify-between"},ae={class:"flex justify-center space-x-6 md:order-2"},oe=["href"],ne={class:"sr-only"},le={class:"mt-8 md:mt-0 md:order-1"},ce={class:"text-center text-base text-gray-400"};k.render=function(e,t,i,s,r,a){const o=l("XCircleIcon"),n=l("XIcon");return c(),d("div",null,[h("div",_,[T,h("div",L,[R,r.isConnected?u("",!0):(c(),d("button",{key:0,onClick:t[0]||(t[0]=(...e)=>a.doConnect&&a.doConnect(...e)),type:"button",class:"inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"}," Connect ")),r.error?(c(),d("div",S,[h("div",D,[h("div",A,[f(o,{class:"h-5 w-5 text-red-400","aria-hidden":"true"})]),h("div",B,[X,h("div",F,[h("ul",P,[h("li",{innerHTML:r.error},null,8,K)])])]),h("div",N,[h("div",I,[h("button",{onClick:t[1]||(t[1]=e=>r.error=null),type:"button",class:"inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"},[U,f(n,{class:"h-5 w-5","aria-hidden":"true"})])])])])])):u("",!0),r.isConnected?(c(),d("div",j,["idle"===r.state?(c(),d(m,{key:0},[h("div",q,[z,p(h("select",{"onUpdate:modelValue":t[2]||(t[2]=e=>r.firmware=e),id:"firmware",name:"firmware",class:"mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"},[(c(!0),d(m,null,w(r.availableFirmware,((e,t)=>(c(),d("option",{key:t,value:t},b(e.title),9,W)))),128))],512),[[g,r.firmware]])]),h("div",G,[h("button",{onClick:t[3]||(t[3]=(...e)=>a.writeFirmware&&a.writeFirmware(...e)),disabled:!r.firmware||!r.availableFirmware[r.firmware].image,type:"button",class:"inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 select-none disabled:opacity-25 disabled:pointer-events-none"}," Load ",8,H),h("button",{onClick:t[4]||(t[4]=(...e)=>a.doConnect&&a.doConnect(...e)),type:"button",class:"inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"}," Disconnect ")])],64)):"erasing"===r.state?(c(),d("div",V,Y)):"writing"===r.state?(c(),d("div",$,[h("div",Q,"Loading... "+b(r.percent)+"%",1),h("div",J,[h("div",{class:"h-2 bg-[#f08000]",style:y(`width:${r.percent}%`)},null,4)])])):"complete"===r.state?(c(),d("div",Z,[ee,te,h("div",ie,[h("button",{onClick:t[5]||(t[5]=e=>r.state="idle"),type:"button",class:"inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"}," Start Over "),h("button",{onClick:t[6]||(t[6]=(...e)=>a.doConnect&&a.doConnect(...e)),type:"button",class:"inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"}," Disconnect ")])])):u("",!0)])):u("",!0),h("footer",se,[h("div",re,[h("div",ae,[(c(!0),d(m,null,w(r.socials,(e=>(c(),d("a",{key:e.name,href:e.href,target:"_blank",class:"text-gray-400 hover:text-gray-500"},[h("span",ne,b(e.name),1),h("i",{class:E([e.icon,"fab fa-fw fa-2x"]),"aria-hidden":"true"},null,2)],8,oe)))),128))]),h("div",le,[h("p",ce," © "+b((new Date).getFullYear())+" BrainPad, LLC. All rights reserved. ",1)])])])])])])},O(k).mount("#app");
