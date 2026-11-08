import{u as gs,g as vs}from"./ComplexHologram-CMtLVzCD.js";import{f as lr,a as ws}from"./staticCdn-BkGZ_S8a.js";import{o as hr}from"./complexScene-utAOlDpX.js";import{f as cr}from"./frameSlice-DfuUCowt.js";import{p as ur,s as fr}from"./paintClient-Cxt6vLBl.js";import"./index-BkPOf1Dd.js";import"./CoffeeIcon-CTOkgV4O.js";import"./safeCompile-DPLJPbD1.js";import"./useMediaQuery-_XzXvcxw.js";import"./mapExport-C3PavZXW.js";import"./three.module-CvqoMEPB.js";import"./three.core-CPp7qtH9.js";import"./OrbitControls-KzURwYeY.js";import"./RoundedBoxGeometry-CX9M23gV.js";import"./vworldBuildings-Z7fG7Ypg.js";import"./UnrealBloomPass-501FKimO.js";import"./BufferGeometryUtils-k5-oe2fd.js";import"./instanceDirty-oVrrWNPz.js";import"./OutputPass-wd0gfhul.js";import"./pageCover-CL_fEIbQ.js";import"./sceneWorkerPool-BXD7BwG1.js";import"./droneTravel-7BfQKlCU.js";import"./threeCleanup-BIAvvWFR.js";const g={device:null,queue:null,adapter:null,context:null,canvas:null,format:"bgra8unorm",features:new Set,limits:null,hasTimestamp:!1,hasFloat32Filterable:!1,encoder:null,frame:0,samplers:null,_submitHooks:[],async init({canvas:h=null,requiredLimits:e={},headless:t=!1}={}){if(!navigator.gpu)throw new Error("WebGPU is not available in this browser.");let s=null;for(const c of[{powerPreference:"high-performance"},{},{forceFallbackAdapter:!0}])if(s=await navigator.gpu.requestAdapter(c).catch(()=>null),s)break;if(!s)throw new Error("No WebGPU adapter found.");this.adapter=s;const i=s.limits,r={maxSampledTexturesPerShaderStage:32,maxSamplersPerShaderStage:16,maxStorageBuffersPerShaderStage:10,maxStorageTexturesPerShaderStage:8,maxComputeWorkgroupStorageSize:32768,maxColorAttachmentBytesPerSample:64,maxStorageBuffersInVertexStage:4,maxStorageBuffersInFragmentStage:8,maxStorageTexturesInFragmentStage:4,maxBindingsPerBindGroup:1e3,maxBufferSize:1024*1024*1024,maxStorageBufferBindingSize:512*1024*1024,...e},a={};for(const c in r)i[c]!==void 0&&(a[c]=Math.min(r[c],i[c]));const o=["float32-filterable","timestamp-query","rg11b10ufloat-renderable","float32-blendable","shader-f16","clip-distances","texture-compression-bc","texture-compression-etc2"].filter(c=>s.features.has(c));this.features=new Set(o),this.hasTimestamp=this.features.has("timestamp-query"),this.hasFloat32Filterable=this.features.has("float32-filterable");const l=await s.requestDevice({requiredFeatures:o,requiredLimits:a});return this.device=l,this.queue=l.queue,this.limits=l.limits,l.lost.then(c=>console.error("WebGPU device lost:",c.message)),l.addEventListener&&l.addEventListener("uncapturederror",c=>console.error("WebGPU:",c.error.message.split(`
`).slice(0,6).join(`
`))),h&&!t&&(this.canvas=h,this.context=h.getContext("webgpu"),this.format=navigator.gpu.getPreferredCanvasFormat(),this.context.configure({device:l,format:this.format,alphaMode:"opaque",usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_DST})),this._createSamplers(),this},_createSamplers(){const h=this.device,e=s=>h.createSampler(s),t={magFilter:"linear",minFilter:"linear",mipmapFilter:"linear"};this.samplers={linearRepeat:e({...t,addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat"}),linearClamp:e({...t,addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),linearMirror:e({...t,addressModeU:"mirror-repeat",addressModeV:"mirror-repeat",addressModeW:"mirror-repeat"}),anisoRepeat:e({...t,addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat",maxAnisotropy:8}),aniso4Repeat:e({...t,addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat",maxAnisotropy:4}),anisoClamp:e({...t,addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",maxAnisotropy:8}),nearestClamp:e({magFilter:"nearest",minFilter:"nearest",mipmapFilter:"nearest",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge",addressModeW:"clamp-to-edge"}),nearestRepeat:e({magFilter:"nearest",minFilter:"nearest",mipmapFilter:"nearest",addressModeU:"repeat",addressModeV:"repeat",addressModeW:"repeat"}),shadow:e({magFilter:"linear",minFilter:"linear",compare:"less",addressModeU:"clamp-to-edge",addressModeV:"clamp-to-edge"})}},beginFrame(){return this.frame++,this.getEncoder()},getEncoder(){return this.encoder||(this.encoder=this.device.createCommandEncoder()),this.encoder},submit(){if(!this.encoder)return;const h=this._submitHooks;this._submitHooks=[];for(const e of h)e.before&&e.before(this.encoder);this.queue.submit([this.encoder.finish()]),this.encoder=null;for(const e of h)e.after&&e.after()},onSubmit(h,e){this._submitHooks.push({before:h,after:e})},_pending:new Set,syncCompiles:[],renderPipeline(h){return this._async(h,"render")},computePipeline(h){return this._async(h,"compute")},_async(h,e){const t={pipeline:null,label:h.label,desc:h,kind:e,failed:!1},s=Promise.resolve().then(()=>t.pipeline?void 0:(e==="render"?this.device.createRenderPipelineAsync:this.device.createComputePipelineAsync).call(this.device,h).then(r=>{t.pipeline||(t.pipeline=r),t.desc=null},r=>{t.failed=!0,console.error(`WebGPU: pipeline "${h.label}" failed: ${r.message.split(`
`).slice(0,6).join(`
`)}`)})).finally(()=>this._pending.delete(s));return this._pending.add(s),t},ready(h){return h.preparing?null:(h.pipeline||h.failed||(this.syncCompiles.push(h.label),h.pipeline=h.kind==="render"?this.device.createRenderPipeline(h.desc):this.device.createComputePipeline(h.desc)),h.pipeline)},deferredPipeline(h,e){let t=null,s=!1;const i={label:e,preparing:!0};for(const a of["pipeline","desc","kind"])Object.defineProperty(i,a,{get:()=>(t==null?void 0:t[a])??null,set:n=>{t&&(t[a]=n)}});Object.defineProperty(i,"failed",{get:()=>s||!!(t!=null&&t.failed)});const r=h.then(a=>{t=a},a=>{s=!0,console.error(`WebGPU: pipeline "${e}" preparation failed: ${a.message}`)}).finally(()=>{i.preparing=!1,this._pending.delete(r)});return this._pending.add(r),i},async pipelinesReady(){for(;this._pending.size;)await Promise.all([...this._pending])},computePass(h,e,t){const s=this.getEncoder().beginComputePass({label:h,timestampWrites:t});e(s),s.end()}},dr={r8unorm:{bytes:1,sample:"float"},rg8unorm:{bytes:2,sample:"float"},rgba8unorm:{bytes:4,sample:"float"},"rgba8unorm-srgb":{bytes:4,sample:"float"},bgra8unorm:{bytes:4,sample:"float"},r16float:{bytes:2,sample:"float"},rg16float:{bytes:4,sample:"float"},rgba16float:{bytes:8,sample:"float"},rg11b10ufloat:{bytes:4,sample:"float"},r32float:{bytes:4,sample:"unfilterable-float"},rg32float:{bytes:8,sample:"unfilterable-float"},rgba32float:{bytes:16,sample:"unfilterable-float"},r32uint:{bytes:4,sample:"uint"},rg32uint:{bytes:8,sample:"uint"},rgba32uint:{bytes:16,sample:"uint"},r32sint:{bytes:4,sample:"sint"},r8uint:{bytes:1,sample:"uint"},rgba8uint:{bytes:4,sample:"uint"},depth32float:{bytes:4,sample:"depth"},"bc7-rgba-unorm":{bytes:1,sample:"float",compressed:!0},"bc7-rgba-unorm-srgb":{bytes:1,sample:"float",compressed:!0},depth24plus:{bytes:4,sample:"depth"},"depth24plus-stencil8":{bytes:4,sample:"depth"}};function Ai(h){const e=dr[h];if(!e)throw new Error("Unknown texture format "+h);return e}function pr(h){const e=Ai(h).sample;return e==="unfilterable-float"&&g.hasFloat32Filterable?"float":e}typeof window<"u"&&(window.__tidewaterGPU=g);let mr=0;class G{constructor(e={}){this.id=mr++,this.label=e.label||e.name||"texture"+this.id,this.width=Math.max(1,e.width||1),this.height=Math.max(1,e.height||1),this.depth=Math.max(1,e.depth||(e.dimension==="cube"?6:1)),this.dimension=e.dimension||"2d",this.format=e.format||"rgba8unorm",this.mipsOption=e.mips??!1,this.sampleCount=e.sampleCount||1;const t=e.usage||["sample","copyDst"];this.usageList=t,this.sampler=e.sampler||"linearClamp",this.gpu=null,this.version=0,this._views=new Map,this.isTexture=!0,e.data&&(this.pendingData=e.data)}get mipLevelCount(){return this.mipsOption===!0?Math.floor(Math.log2(Math.max(this.width,this.height,this.dimension==="3d"?this.depth:1)))+1:typeof this.mipsOption=="number"?this.mipsOption:1}get usage(){let e=0;for(const t of this.usageList)e|={sample:GPUTextureUsage.TEXTURE_BINDING,render:GPUTextureUsage.RENDER_ATTACHMENT,storage:GPUTextureUsage.STORAGE_BINDING,copySrc:GPUTextureUsage.COPY_SRC,copyDst:GPUTextureUsage.COPY_DST}[t];return this.mipLevelCount>1&&!this.format.startsWith("bc")&&(e|=GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING),e}get isDepth(){return this.format.startsWith("depth")}get sampleType(){return pr(this.format)}wgslType(e=this.defaultViewDimension){const t=this.sampleType;if(t==="depth")return{"2d":"texture_depth_2d","2d-array":"texture_depth_2d_array",cube:"texture_depth_cube"}[e];const s=t==="uint"?"u32":t==="sint"?"i32":"f32";return`texture_${e.replace("-","_")}<${s}>`}get defaultViewDimension(){return this.dimension}getGPU(){return this.gpu||this._create(),this.gpu}_create(){const e=this.dimension==="3d"?"3d":"2d";if(this.gpu=g.device.createTexture({label:this.label,size:{width:this.width,height:this.height,depthOrArrayLayers:this.depth},dimension:e,format:this.format,mipLevelCount:this.mipLevelCount,sampleCount:this.sampleCount,usage:this.usage}),this._views.clear(),this.version++,this.pendingData){const t=this.pendingData;this.pendingData=null,this.upload(t)}}view(e=null){const t=this.getGPU(),s=e?JSON.stringify(e):"";let i=this._views.get(s);return i||(i=t.createView({label:this.label+s,dimension:(e==null?void 0:e.dimension)||this.defaultViewDimension,...e||{}}),this._views.set(s,i)),i}resize(e,t,s=this.depth){if(e=Math.max(1,Math.floor(e)),t=Math.max(1,Math.floor(t)),e===this.width&&t===this.height&&s===this.depth&&this.gpu)return!1;if(this.width=e,this.height=t,this.depth=s,this.gpu){const i=this.gpu;g.onSubmit(null,()=>i.destroy()),this.gpu=null}return this._create(),!0}upload(e,{mip:t=0,layer:s=0,layers:i=null,width:r=null,height:a=null,x:n=0,y:o=0}={}){if(!this.gpu){if(t===0&&s===0&&!r){this.pendingData=e,this.getGPU();return}this.getGPU()}const l=Ai(this.format).bytes,c=r||Math.max(1,this.width>>t),f=a||Math.max(1,this.height>>t),d=i||(this.dimension==="3d"?Math.max(1,this.depth>>t):this.depth-s),u=e instanceof ArrayBuffer?e:e.buffer,m=e instanceof ArrayBuffer?0:e.byteOffset;g.queue.writeTexture({texture:this.gpu,mipLevel:t,origin:{x:n,y:o,z:s}},u,{offset:m,bytesPerRow:c*l,rowsPerImage:f},{width:c,height:f,depthOrArrayLayers:d})}destroy(){this.gpu&&this.gpu.destroy(),this.gpu=null,this.version++}}class de{constructor(e,t,{colors:s=["rgba16float"],depth:i=null,label:r="rt",mips:a=!1,usage:n=["sample","render","copySrc","copyDst"],depthUsage:o=["sample","render","copySrc","copyDst"],scale:l=1}={}){this.label=r,this.width=Math.max(1,e|0),this.height=Math.max(1,t|0),this.scale=l,this.textures=s.map((c,f)=>{const d=typeof c=="string"?{format:c}:c;return new G({label:`${r}.${d.name||f}`,width:this.width,height:this.height,format:d.format,mips:d.mips??a,usage:d.usage||n})}),this.depthTexture=i?new G({label:r+".depth",width:this.width,height:this.height,format:i,usage:o}):null}get texture(){return this.textures[0]}get formats(){return this.textures.map(e=>e.format)}setSize(e,t){if(e=Math.max(1,e|0),t=Math.max(1,t|0),e===this.width&&t===this.height)return!1;this.width=e,this.height=t;for(const s of this.textures)s.resize(e,t);return this.depthTexture&&this.depthTexture.resize(e,t),!0}}const ht=new Map,pt=new Map;let mt=null;function ki(h){return mt||(mt=g.device.createShaderModule({label:"mipmap",code:`
		struct VSOut { @builtin( position ) pos: vec4f, @location( 0 ) uv: vec2f };
		@vertex fn vs( @builtin( vertex_index ) i: u32 ) -> VSOut {
			let p = vec2f( f32( ( i << 1u ) & 2u ), f32( i & 2u ) );
			var o: VSOut;
			o.pos = vec4f( p * 2.0 - 1.0, 0.0, 1.0 );
			o.uv = vec2f( p.x, 1.0 - p.y );
			return o;
		}
		@group( 0 ) @binding( 0 ) var src: texture_2d<f32>;
		@group( 0 ) @binding( 1 ) var smp: sampler;
		@fragment fn fs( in: VSOut ) -> @location( 0 ) vec4f {
			return textureSampleLevel( src, smp, in.uv, 0.0 );
		}
	`})),{label:"mipmap "+h,layout:"auto",vertex:{module:mt,entryPoint:"vs"},fragment:{module:mt,entryPoint:"fs",targets:[{format:h}]},primitive:{topology:"triangle-list"}}}function yr(h){let e=ht.get(h);return e||(e=g.device.createRenderPipeline(ki(h)),ht.set(h,e),e)}function xr(h){return Promise.all(h.map(e=>{if(!ht.has(e))return pt.has(e)||pt.set(e,g.device.createRenderPipelineAsync(ki(e)).then(t=>{ht.has(e)||ht.set(e,t)}).finally(()=>pt.delete(e))),pt.get(e)}))}const bs=new WeakMap;function gr(h,e,t){let s=bs.get(h);if(s&&s.gpu===e)return s;const i=h.mipLevelCount,r=h.dimension==="3d"?1:h.depth,a=[],n=t.getBindGroupLayout(0);for(let o=0;o<r;o++)for(let l=1;l<i;l++){const c=e.createView({dimension:"2d",baseMipLevel:l-1,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1}),f=e.createView({dimension:"2d",baseMipLevel:l,mipLevelCount:1,baseArrayLayer:o,arrayLayerCount:1}),d=g.device.createBindGroup({label:"mipmap "+h.label,layout:n,entries:[{binding:0,resource:c},{binding:1,resource:g.samplers.linearClamp}]});a.push({bg:d,desc:{label:"mipmap",colorAttachments:[{view:f,loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}]}})}return s={gpu:e,pipeline:t,steps:a},bs.set(h,s),s}function we(h,e=g.getEncoder()){if(h.mipLevelCount<2)return;const t=h.getGPU(),s=yr(h.format),{steps:i}=gr(h,t,s);for(let r=0;r<i.length;r++){const a=e.beginRenderPass(i[r].desc);a.setPipeline(s),a.setBindGroup(0,i[r].bg),a.draw(3),a.end()}}class Je extends Map{constructor(e=128,t=4*1024*1024){super(),this.maxEntries=e,this.maxBytes=t,this.bytes=0,this.costs=new Map}get(e){const t=super.get(e);return super.has(e)&&(super.delete(e),super.set(e,t)),t}set(e,t){this.delete(e);const s=(typeof e=="string"?e.length*2:32)+(typeof t=="string"?t.length*2:256);if(s>this.maxBytes)return this;for(super.set(e,t),this.costs.set(e,s),this.bytes+=s;this.size>this.maxEntries||this.bytes>this.maxBytes;)this.delete(this.keys().next().value);return this}delete(e){return this.bytes-=this.costs.get(e)??0,this.costs.delete(e),super.delete(e)}clear(){super.clear(),this.costs.clear(),this.bytes=0}}function Zt(h,e={}){const t=h.split(`
`),s=[],i=[],r=()=>i.length===0||i[i.length-1].active,a=n=>{n=n.trim();let o;if(o=/^!\s*(\w+)$/.exec(n))return!Ss(e[o[1]]);if(o=/^(\w+)\s*(==|!=|>=|<=|>|<)\s*([\w.'"-]+)$/.exec(n)){const l=e[o[1]];let c=o[3].replace(/^['"]|['"]$/g,"");switch(!isNaN(Number(c))&&typeof l=="number"&&(c=Number(c)),o[2]){case"==":return l==c;case"!=":return l!=c;case">=":return l>=c;case"<=":return l<=c;case">":return l>c;case"<":return l<c}}return/\|\|/.test(n)?n.split("||").some(l=>a(l)):/&&/.test(n)?n.split("&&").every(l=>a(l)):Ss(e[n])};for(const n of t){const o=n.trim();let l;if(l=/^#(if|ifdef|ifndef)\s+(.*)$/.exec(o)){const c=r();let f;l[1]==="ifdef"?f=e[l[2].trim()]!==void 0:l[1]==="ifndef"?f=e[l[2].trim()]===void 0:f=a(l[2]),i.push({active:c&&f,taken:f,parent:c});continue}if(l=/^#elif\s+(.*)$/.exec(o)){const c=i[i.length-1],f=!c.taken&&a(l[1]);c.active=c.parent&&f,c.taken=c.taken||f;continue}if(o==="#else"){const c=i[i.length-1];c.active=c.parent&&!c.taken,c.taken=!0;continue}if(o==="#endif"){i.pop();continue}r()&&s.push(n)}if(i.length)throw new Error("preprocess: unterminated #if");return s.join(`
`)}function Ss(h){return h!=null&&h!==!1&&h!==0&&h!=="0"}function Et(h,e){const t=new Map,s=/\bfn\s+([A-Za-z_]\w*)\s*\(/g;let i;for(;i=s.exec(h);){const o=h.indexOf("{",i.index);if(o<0)break;let l=0,c=o;for(;c<h.length;c++){const d=h[c];if(d==="{")l++;else if(d==="}"&&--l===0)break}(!/@(vertex|fragment|compute)[^;{}]*$/.test(h.slice(Math.max(0,i.index-80),i.index))||i[1]===e)&&t.set(i[1],h.slice(i.index,c+1)),s.lastIndex=c+1}const r=new Set,a=[e],n=new Set;for(;a.length;){const o=a.pop();if(!(n.has(o)||!t.has(o))){n.add(o);for(const l of t.get(o).match(/[A-Za-z_]\w*/g)||[])r.add(l),t.has(l)&&!n.has(l)&&a.push(l)}}return r}const De=new Je(128,2*1024*1024);function os(h){var m;const e=De.get(h);if(e!==void 0)return e;const t=h.replace(/\/\*[\s\S]*?\*\//g,"").replace(/\/\/[^\n]*/g,""),s=[];let i=0,r=0,a=0;for(let p=0;p<t.length;p++){const x=t[p];if(x==="(")a++;else if(x===")")a--;else if(x==="{")i++;else if(x==="}"){if(i--,i===0&&a===0){let y=p+1;for(;y<t.length&&/\s/.test(t[y]);)y++;t[y]===";"&&(p=y),s.push([r,p+1]),r=p+1}}else x===";"&&i===0&&a===0&&(s.push([r,p+1]),r=p+1)}if(i!==0)return De.set(h,h),h;const n=t.slice(r),o=new Map,l=[];for(const[p,x]of s){const y=t.slice(p,x),v=/\bfn\s+([A-Za-z_]\w*)\s*\(/.exec(y);if(v&&/^[\s\S]*?\bfn\b/.exec(y)[0].indexOf("{")<0)o.set(v[1],{text:y,entry:/@(vertex|fragment|compute)\b/.test(y.slice(0,v.index))});else{const w=/^\s*(?:@\w+(?:\([^)]*\))?\s*)*(?:struct|alias|const|override|var(?:\s*<[^>]*>)?)\s+([A-Za-z_]\w*)\b/.exec(y);w?o.set(w[1],{text:y,entry:!1}):l.push(y)}}if(!o.size)return De.set(h,h),h;const c=new Set,f=[],d=p=>{for(const x of p.match(/[A-Za-z_]\w*/g)||[])o.has(x)&&!c.has(x)&&(c.add(x),f.push(x))};for(const[p,x]of o)x.entry&&!c.has(p)&&(c.add(p),f.push(p));for(l.forEach(d),d(n);f.length;)d(o.get(f.pop()).text);let u="";for(const[p,x]of s){const y=t.slice(p,x),v=/\bfn\s+([A-Za-z_]\w*)\s*\(/.exec(y)||/^\s*(?:@\w+(?:\([^)]*\))?\s*)*(?:struct|alias|const|override|var(?:\s*<[^>]*>)?)\s+([A-Za-z_]\w*)\b/.exec(y);v&&((m=o.get(v[1]))==null?void 0:m.text)===y&&!c.has(v[1])||(u+=y)}return u+=n,De.set(h,u),De.size>256&&De.delete(De.keys().next().value),u}let xe,vr=0,Jt;const Ce=new Map,Fe=new Map,_s=new Je(64,2*1024*1024);function Ms(h){Ce.size||(Jt=setTimeout(()=>{xe===h&&!Ce.size&&(h.terminate(),xe=null)},5e3))}function zs(h,e,t){const s=JSON.stringify([h,t])+"\0"+e,i=_s.get(s);if(i!==void 0)return Promise.resolve(i);const r=Fe.get(s);if(r)return r;if(clearTimeout(Jt),!xe){const n=xe=new Worker(new URL(globalThis.location.origin+"/assets/ShaderTextWorker-CFJk9_ep.js",import.meta.url),{type:"module"});n.onmessage=({data:o})=>{if(xe!==n)return;const l=Ce.get(o.id);l&&(Ce.delete(o.id),o.error?l.reject(Error(o.error)):l.resolve(o.value),Ms(n))},n.onerror=o=>{if(xe===n){clearTimeout(Jt);for(const l of Ce.values())l.reject(Error(o.message||"Shader analysis worker could not load or execute"));Ce.clear(),n.terminate(),xe=null}}}const a=new Promise((n,o)=>{const l=++vr;Ce.set(l,{resolve:n,reject:o});try{xe.postMessage({id:l,op:h,code:e,defines:t})}catch(c){Ce.delete(l),Ms(xe),o(c)}});return Fe.set(s,a),a.then(n=>{Fe.get(s)===a&&Fe.delete(s),h==="finish"&&typeof n=="string"&&_s.set(s,n)},()=>{Fe.get(s)===a&&Fe.delete(s)}),a}const Ps={f32:{size:4,align:4,n:1},i32:{size:4,align:4,n:1,int:!0},u32:{size:4,align:4,n:1,uint:!0},vec2f:{size:8,align:8,n:2},vec3f:{size:12,align:16,n:3},vec4f:{size:16,align:16,n:4},vec2i:{size:8,align:8,n:2,int:!0},vec4i:{size:16,align:16,n:4,int:!0},vec2u:{size:8,align:8,n:2,uint:!0},vec4u:{size:16,align:16,n:4,uint:!0},mat3x3f:{size:48,align:16,n:12,mat3:!0},mat4x4f:{size:64,align:16,n:16}};function wr(h){const e=/^(\w+)(?:\[(\d+)\])?$/.exec(h);if(!e||!Ps[e[1]])throw new Error("Unsupported uniform type "+h);const t=Ps[e[1]],s=e[2]?Number(e[2]):0;if(s&&t.align<16)throw new Error(`uniform array ${h}: element must be 16-byte aligned (use vec4f)`);return{name:e[1],base:t,count:s}}function As(h,e,t,s,i,r){const{base:a}=i,n=a.int?t:a.uint?e:h;if(typeof r=="number"||typeof r=="boolean"){n[s]=Number(r);return}if(r!=null){if(r.isMatrix4||r.isMatrix3){const o=r.elements;if(a.mat3)if(o.length===9)for(let l=0;l<3;l++)for(let c=0;c<3;c++)h[s+l*4+c]=o[l*3+c];else for(let l=0;l<3;l++)for(let c=0;c<3;c++)h[s+l*4+c]=o[l*4+c];else for(let l=0;l<16;l++)h[s+l]=o[l];return}if(r.isColor){n[s]=r.r,n[s+1]=r.g,n[s+2]=r.b,a.n===4&&(n[s+3]=1);return}if(r.isVector2){n[s]=r.x,n[s+1]=r.y;return}if(r.isVector3){n[s]=r.x,n[s+1]=r.y,n[s+2]=r.z;return}if(r.isVector4||r.isQuaternion){n[s]=r.x,n[s+1]=r.y,n[s+2]=r.z,n[s+3]=r.w;return}if(ArrayBuffer.isView(r)||Array.isArray(r)){for(let o=0;o<Math.min(r.length,a.n);o++)n[s+o]=r[o];return}throw new Error("Cannot write uniform value "+r)}}let br=0;class Te{constructor(e,t,{label:s}={}){this.structName=e,this.label=s||e,this.id=br++,this.layout={},this.fields={},this.order=[];let i=0,r=16;for(const n in t){const o=t[n],l=Array.isArray(o)?o[0]:o,c=Array.isArray(o)?o[1]:void 0,f=wr(l),d=f.base.align;r=Math.max(r,d),i=Math.ceil(i/d)*d;const u=f.count?Math.ceil(f.base.size/16)*16:f.base.size,m=f.count?u*f.count:f.base.size;this.layout[n]={offset:i,type:f,typeStr:l,stride:u,size:m},this.order.push(n),this.fields[n]={value:c!==void 0?c:Sr(f)},i+=m}this.byteLength=Math.max(16,Math.ceil(i/r)*r),this.data=new ArrayBuffer(this.byteLength),this.f32=new Float32Array(this.data),this.u32=new Uint32Array(this.data),this.i32=new Int32Array(this.data),this.buffer=null,this.version=0;const a=this;this.values=new Proxy({},{get:(n,o)=>a.fields[o]&&a.fields[o].value,set:(n,o,l)=>(a.set(o,l),!0)})}get wgsl(){let e=`struct ${this.structName} {
`;for(const t of this.order){const{type:s}=this.layout[t];e+=s.count?`	${t}: array<${s.name}, ${s.count}>,
`:`	${t}: ${s.name},
`}return e+`};
`}set(e,t){const s=this.fields[e];if(!s)throw new Error(`${this.structName}: no uniform ${e}`);s.value&&typeof s.value=="object"&&!Array.isArray(s.value)&&s.value.copy&&t&&t.constructor===s.value.constructor?s.value.copy(t):s.value=t}get(e){return this.fields[e].value}_pack(){this.onBeforePack&&this.onBeforePack(this);const{f32:e,u32:t,i32:s,fields:i}=this,r=this._plan||this._makePlan();for(let a=0;a<r.length;a++){const{name:n,o,type:l,stride:c,count:f,n:d}=r[a],u=i[n].value;if(typeof u=="number"){(l.base.int?s:l.base.uint?t:e)[o]=u;continue}if(f){if(!u)continue;if(typeof u[0]=="number"){const m=l.base.int?s:l.base.uint?t:e,p=Math.min(f,u.length/d);for(let x=0;x<p;x++){const y=o+x*c,v=x*d,w=Math.min(d,u.length-v);for(let M=0;M<w;M++)m[y+M]=u[v+M]}}else{const m=Math.min(f,u.length);for(let p=0;p<m;p++)As(e,t,s,o+p*c,l,u[p])}}else As(e,t,s,o,l,u)}}_makePlan(){return this._plan=this.order.map(e=>{const{offset:t,type:s,stride:i}=this.layout[e];return{name:e,o:t/4,type:s,stride:i/4,count:s.count,n:s.base.n}}),this._plan}getBuffer(){return this.buffer||(this.buffer=g.device.createBuffer({label:this.label,size:this.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),this._last=new Uint32Array(this.byteLength/4),this._last.fill(4294967295)),this.buffer}upload(e){if(this.uploadEpoch!==void 0&&this._uploadedEpoch===this.uploadEpoch&&this.buffer)return this.buffer;if(this.uploadEpoch===void 0&&e!==void 0&&e===this._token&&this.buffer)return this.buffer;this._token=e;const t=this.getBuffer();this._pack(),this._uploadedEpoch=this.uploadEpoch;const s=this.u32,i=this._last;let r=!1;for(let a=0;a<s.length;a++)if(s[a]!==i[a]){r=!0;break}return r&&(i.set(s),g.queue.writeBuffer(t,0,this.data)),t}}function Sr(h){return h.count?null:h.base.n===1?0:new Array(h.base.n).fill(0)}const Ci=[["smpLinearRepeat","linearRepeat","filtering"],["smpLinearClamp","linearClamp","filtering"],["smpLinearMirror","linearMirror","filtering"],["smpAnisoRepeat","anisoRepeat","filtering"],["smpAnisoClamp","anisoClamp","filtering"],["smpAniso4Repeat","aniso4Repeat","filtering"],["smpNearestClamp","nearestClamp","non-filtering"],["smpNearestRepeat","nearestRepeat","non-filtering"],["smpShadow","shadow","comparison"]];let _r=0;class ae{constructor({name:e,deps:t=[],code:s="",bindings:i={},uniforms:r=null,uniformName:a=null}){this.id=_r++,this.name=e||"module"+this.id,this.deps=t.filter(Boolean),this.code=s,this.bindings={...i},r&&(this.bindings[a||Mr(r.structName)]={uniform:r}),this.isShaderModule=!0}}function Mr(h){return h[0].toLowerCase()+h.slice(1)}function It(h){const e=[],t=new Set,s=i=>{if(!(!i||t.has(i))){t.add(i);for(const r of i.deps)s(r);e.push(i)}};for(const i of h)s(i);return e}function ne(h){return typeof h=="function"?h():h}function zr(h,e,t){var r,a;const s=GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,i=t==="compute"?GPUShaderStage.COMPUTE:s;if(e.uniform){const n=e.uniform;return{layout:{visibility:i,buffer:{type:"uniform"}},decl:`var<uniform> ${h}: ${n.structName};`,struct:n}}if(e.uniformBuffer)return{layout:{visibility:i,buffer:{type:"uniform"}},decl:`var<uniform> ${h}: ${e.wgslType};`};if(e.storage){const n=ne(e.storage),o=e.access||"read",l=e.wgslType||`array<${e.type||n.type}>`;return{layout:{visibility:t==="compute"?i:o==="read"?s:GPUShaderStage.FRAGMENT,buffer:{type:o==="read"?"read-only-storage":"storage"}},decl:`var<storage, ${o==="read"?"read":"read_write"}> ${h}: ${l};`}}if(e.storageTexture){const n=ne(e.storageTexture),o=e.access||"write",l=e.viewDimension||((r=e.view)==null?void 0:r.dimension)||n.defaultViewDimension;return{layout:{visibility:t==="compute"?i:GPUShaderStage.FRAGMENT,storageTexture:{access:o==="write"?"write-only":o==="read"?"read-only":"read-write",format:n.format,viewDimension:l}},decl:`var ${h}: texture_storage_${l.replace("-","_")}<${n.format}, ${o}>;`}}if(e.texture){const n=ne(e.texture),o=e.viewDimension||((a=e.view)==null?void 0:a.dimension)||n.defaultViewDimension;let l=e.sampleType||n.sampleType,c=e.wgslType||n.wgslType(o);return e.sampleType==="unfilterable-float"&&n.isDepth&&(c=`texture_${o.replace("-","_")}<f32>`),{layout:{visibility:i,texture:{sampleType:l,viewDimension:o,multisampled:n.sampleCount>1}},decl:`var ${h}: ${c};`}}if(e.sampler)return{layout:{visibility:i,sampler:{type:e.samplerType||"filtering"}},decl:`var ${h}: ${e.samplerType==="comparison"?"sampler_comparison":"sampler"};`};throw new Error(`binding ${h}: unknown spec`)}function Pr(h){if(h.uniform)return{buffer:h.uniform.getBuffer()};if(h.uniformBuffer)return{buffer:ne(h.uniformBuffer)};if(h.storage){const e=ne(h.storage),t=e.getGPU?e.getGPU():e;return h.offset!==void 0?{buffer:t,offset:h.offset,size:h.size}:{buffer:t}}if(h.storageTexture)return ne(h.storageTexture).view(h.view||{dimension:h.viewDimension||ne(h.storageTexture).defaultViewDimension,mipLevelCount:1,baseMipLevel:h.mip||0});if(h.texture){const e=ne(h.texture);return h.view||h.viewDimension?e.view({...h.view||{},dimension:h.viewDimension||h.view.dimension}):e.view()}if(h.sampler)return typeof h.sampler=="string"?g.samplers[h.sampler]:h.sampler;throw new Error("unknown binding")}const Ti=0,Ri=1,Di=2,Bi=3,Ar=4;function kr(h){return h.uniform?Ti:h.uniformBuffer?Ri:h.storage?Di:h.storageTexture||h.texture?Bi:Ar}const Cr=4,ks=new Map;function Ei(h,e){const t=JSON.stringify(h);let s=ks.get(t);return s||(s=g.device.createBindGroupLayout({label:e,entries:h}),ks.set(t,s)),s}class ls{constructor(e,t,s="bindings",i=null,r=null){if(this.label=s,this.stage=t,this.names=Object.keys(e),this.specs=e,this.described=this.names.map(n=>zr(n,e[n],t)),i)for(let n=0;n<this.names.length;n++){const o=this.described[n].layout,l=i[this.names[n]];l==="fragment"&&o.visibility&GPUShaderStage.FRAGMENT&&(o.visibility=GPUShaderStage.FRAGMENT),l==="vertex"&&o.visibility&GPUShaderStage.VERTEX&&(o.visibility=GPUShaderStage.VERTEX)}if(r)for(let n=0;n<this.names.length;n++){const o=this.described[n];r.has(this.names[n])&&(o.layout.buffer={type:"read-only-storage"},o.decl=o.decl.replace(/^var<uniform>/,"var<storage, read>"))}this.layout=Ei(this.described.map((n,o)=>({binding:o,...n.layout})),s),this.group=null;const a=this.names.length;this._specs=this.names.map(n=>e[n]),this._kinds=this._specs.map(kr),this._blocks=this._specs.filter(n=>n.uniform).map(n=>n.uniform),this._objs=new Array(a).fill(null),this._vers=new Array(a).fill(0),this._entry=null,this._cache=[],this._token=null}declarations(e){return this.described.map((t,s)=>`@group(${e}) @binding(${s}) ${t.decl}`).join(`
`)}structs(){const e=[];for(const t of this.described)t.struct&&!e.includes(t.struct)&&e.push(t.struct);return e}getBindGroup(e){if(e!==void 0&&e===this._token&&this.group)return this.group;this._token=e;const t=this._specs,s=this._kinds,i=this._objs,r=this._vers,a=t.length;for(let c=0;c<a;c++){const f=t[c];let d=null,u=0;switch(s[c]){case Ti:d=f.uniform;break;case Ri:d=ne(f.uniformBuffer);break;case Di:d=ne(f.storage),d.getGPU&&(d.getGPU(),u=d.version);break;case Bi:d=ne(f.storageTexture||f.texture),d&&d.getGPU&&(d.getGPU(),u=d.version);break;default:d=f.sampler}i[c]=d,r[c]=u}const n=this._blocks;for(let c=0;c<n.length;c++)n[c].upload(e);if(this._entry&&this._matches(this._entry))return this.group;const o=this._cache;for(let c=0;c<o.length;c++){const f=o[c];if(!(f===this._entry||!this._matches(f)))return this._entry=f,this.group=f.group,this.group}const l=new Array(a);for(let c=0;c<a;c++)l[c]={binding:c,resource:Pr(t[c])};return this.group=g.device.createBindGroup({label:this.label,layout:this.layout,entries:l}),this._entry={objs:i.slice(),vers:r.slice(),group:this.group},o.unshift(this._entry),o.length>Cr&&o.pop(),this.group}_matches(e){const t=this._objs,s=this._vers,i=e.objs,r=e.vers;for(let a=0;a<t.length;a++)if(t[a]!==i[a]||s[a]!==r[a])return!1;return!0}}let hs=null,$e=null;function Tr(h){hs=h,$e=null}function Ii(h){if($e||($e={}),!$e[h]){const e={frame:{uniform:hs}};for(const[t,s,i]of Ci)e[t]={sampler:s,samplerType:i};$e[h]=new ls(e,h,"group0-"+h)}return $e[h]}const Cs=new WeakMap;function Li(h,e="render"){if(h===hs)return Ii(e);let t=Cs.get(h);if(t||Cs.set(h,t={}),!t[e]){const s={frame:{uniform:h}};for(const[i,r,a]of Ci)s[i]={sampler:r,samplerType:a};t[e]=new ls(s,e,"group0-"+h.label)}return t[e]}const Qt=new Je(128,2*1024*1024),Rr=new Je;function Ts(h,e,t){let s=h.get(e);return s===void 0&&(s=t(),h.set(e,s),h.size>256&&h.delete(h.keys().next().value)),s}function Lt({modules:h=[],bindings:e={},code:t="",defines:s={},stage:i="render",label:r="shader",header:a="",raw:n=!1}){const o=It(h),l={};for(const x of o)for(const y in x.bindings){if(l[y]&&l[y]!==x.bindings[y]&&!Dr(l[y],x.bindings[y]))throw new Error(`${r}: binding ${y} declared twice (${x.name})`);l[y]=x.bindings[y]}for(const x in e)l[x]=e[x];let c=null,f=null;if(i==="render"&&/@vertex\s+fn\s+vs\b/.test(t)){let x="";for(const _ of o)x+=_.code+`
`;const{usedV:y,usedF:v}=Ts(Qt,x+t+"\0"+JSON.stringify(s),()=>{const _=Zt(x+t,s);return{usedV:Et(_,"vs"),usedF:/@fragment\s+fn\s+fs\b/.test(_)?Et(_,"fs"):null}});c={};for(const _ in l){if(!y.has(_)&&(!v||!v.has(_))){delete l[_];continue}!y.has(_)&&(!v||v.has(_))?c[_]="fragment":v&&!v.has(_)&&y.has(_)&&(c[_]="vertex")}f=new Set;const w=g.limits||{},M=(w.maxUniformBuffersPerShaderStage||12)-2,k={vertex:w.maxStorageBuffersInVertexStage??4,fragment:w.maxStorageBuffersInFragmentStage??w.maxStorageBuffersPerShaderStage??8},z=(_,P)=>!c[_]||c[_]===P;for(const _ of["fragment","vertex"]){const P=Object.keys(l).filter(B=>l[B].uniform&&z(B,_)&&!f.has(B));let R=Object.keys(l).filter(B=>(l[B].storage||f.has(B))&&z(B,_)).length;P.sort((B,L)=>(c[B]===_?0:1)-(c[L]===_?0:1));let D=P.length;for(const B of P){if(D<=M||R>=k[_])break;f.add(B),R++,D--}}}const d=new ls(l,i,r+".g1",c,f),u=Ii(i),m=[...new Set([...u.structs(),...d.structs()])];let p="";g.features.has("shader-f16")&&s.F16&&(p+=`enable f16;
`),s.CLIP_DISTANCES&&(p+=`enable clip_distances;
`),/diagnostic\s*\(\s*off\s*,\s*derivative_uniformity/.test(a)||(p+=`diagnostic( off, derivative_uniformity );
`),p+=a,p+=m.map(x=>x.wgsl).join(`
`)+`
`,p+=u.declarations(0)+`
`,p+=d.declarations(1)+`
`;for(const x of o)p+=`// ---- ${x.name}
${x.code}
`;return p+=t,{code:n?p:Ts(Rr,p+"\0"+JSON.stringify(s),()=>Zt(p,s)),bindings:d,group0:u,modules:o}}async function Ni(h){const{modules:e=[],code:t="",defines:s={},stage:i="render"}=h;if(i==="render"&&/@vertex\s+fn\s+vs\b/.test(t)){const a=It(e).map(o=>o.code+`
`).join("")+t,n=a+"\0"+JSON.stringify(s);if(Qt.get(n)===void 0){const o=await zs("reach",a,s);if(g.verifyAsyncShaders){const l=Zt(a,s),c=(f,d)=>(f==null?void 0:f.size)===(d==null?void 0:d.size)&&(!f||[...f].every(u=>d.has(u)));if(!c(o.usedV,Et(l,"vs"))||!c(o.usedF,/@fragment\s+fn\s+fs\b/.test(l)?Et(l,"fs"):null))throw Error("Worker shader binding analysis differs")}Qt.set(n,o)}}const r=Lt({...h,raw:!0});if(r.code=await zs("finish",r.code,s),g.verifyAsyncShaders&&r.code!==os(Lt(h).code))throw Error("Worker shader output differs");return r}function Dr(h,e){const t=Object.keys(h),s=Object.keys(e);return t.length===s.length&&t.every(i=>h[i]===e[i])}const Qe=new Je(128,3*1024*1024);function Fi(h,e,t=!1){let s=Qe.get(h);if(s)return s;const i=t?h:os(h);return s=Qe.get(i),s?(Qe.set(h,s),s):(s=g.device.createShaderModule({label:e,code:i}),Qe.set(h,s),Qe.set(i,s),h=i,s.getCompilationInfo&&s.getCompilationInfo().then(r=>{const a=r.messages.filter(o=>o.type==="error");if(!a.length)return;const n=h.split(`
`);for(const o of a){const l=Math.max(0,o.lineNum-4),c=Math.min(n.length,o.lineNum+2),f=n.slice(l,c).map((d,u)=>`${l+u+1}${l+u+1===o.lineNum?">":" "} ${d}`).join(`
`);console.error(`WGSL error in ${e} (${o.lineNum}:${o.linePos}): ${o.message}
${f}`)}}),s)}const Le=new ae({name:"common",code:`
const PI: f32 = 3.141592653589793;
const TWO_PI: f32 = 6.283185307179586;
const INV_PI: f32 = 0.3183098861837907;
const EPS: f32 = 1e-5;

fn sat( x: f32 ) -> f32 { return clamp( x, 0.0, 1.0 ); }
fn sat3( x: vec3f ) -> vec3f { return clamp( x, vec3f( 0.0 ), vec3f( 1.0 ) ); }
fn pow2( x: f32 ) -> f32 { return x * x; }
fn pow4( x: f32 ) -> f32 { let y = x * x; return y * y; }
fn pow5( x: f32 ) -> f32 { let y = x * x; return y * y * x; }
fn luminance( c: vec3f ) -> f32 { return dot( c, vec3f( 0.2126, 0.7152, 0.0722 ) ); }
fn remap( x: f32, a: f32, b: f32, c: f32, d: f32 ) -> f32 { return c + ( x - a ) * ( d - c ) / ( b - a ); }
fn remapClamp( x: f32, a: f32, b: f32, c: f32, d: f32 ) -> f32 { return mix( c, d, sat( ( x - a ) / ( b - a ) ) ); }
fn rotate2( v: vec2f, a: f32 ) -> vec2f { let c = cos( a ); let s = sin( a ); return vec2f( c * v.x - s * v.y, s * v.x + c * v.y ); }

// ---- depth (reversed-Z: 1 at the near plane, 0 at far / infinity)

// positive view-space distance along the view axis from a depth-buffer value
fn viewDepth( d: f32 ) -> f32 {
	let v = frame.invProj * vec4f( 0.0, 0.0, d, 1.0 );
	return - v.z / v.w;
}

// uv (0..1, y down) + depth -> world / view position
fn ndcFromUv( uv: vec2f, d: f32 ) -> vec4f { return vec4f( uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, d, 1.0 ); }
fn worldFromDepth( uv: vec2f, d: f32 ) -> vec3f {
	let p = frame.invViewProj * ndcFromUv( uv, d );
	return p.xyz / p.w;
}
fn viewFromDepth( uv: vec2f, d: f32 ) -> vec3f {
	let p = frame.invProj * ndcFromUv( uv, d );
	return p.xyz / p.w;
}
// world direction of the camera ray through uv
fn viewRay( uv: vec2f ) -> vec3f {
	let p = frame.invViewProj * ndcFromUv( uv, 0.5 );
	return normalize( p.xyz / p.w - frame.cameraPos );
}
// world position -> uv (y down) and depth
fn projectToUv( P: vec3f ) -> vec3f {
	let c = frame.viewProjNoJitter * vec4f( P, 1.0 );
	let n = c.xyz / c.w;
	return vec3f( n.x * 0.5 + 0.5, 0.5 - n.y * 0.5, n.z );
}
fn isSky( d: f32 ) -> bool { return d <= 0.0; }

// ---- hashes

fn pcg( v: u32 ) -> u32 {
	let state = v * 747796405u + 2891336453u;
	let word = ( ( state >> ( ( state >> 28u ) + 4u ) ) ^ state ) * 277803737u;
	return ( word >> 22u ) ^ word;
}
fn pcg3( v0: vec3u ) -> vec3u {
	var v = v0 * 1664525u + 1013904223u;
	v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
	v ^= v >> vec3u( 16u );
	v.x += v.y * v.z; v.y += v.z * v.x; v.z += v.x * v.y;
	return v;
}
fn u32ToUnit( h: u32 ) -> f32 { return f32( h >> 8u ) * ( 1.0 / 16777216.0 ) + ( 0.5 / 16777216.0 ); }
// float hash in [0, 1) of a float seed (TSL hash())
fn hash11( p: f32 ) -> f32 { return u32ToUnit( pcg( bitcast<u32>( p ) ^ 0x9e3779b9u ) ); }
fn hash21( p: vec2f ) -> f32 { return u32ToUnit( pcg( bitcast<u32>( p.x ) ^ pcg( bitcast<u32>( p.y ) ) ) ); }
fn hash31( p: vec3f ) -> f32 { return u32ToUnit( pcg3( bitcast<vec3u>( p ) ).x ); }
fn hash22( p: vec2f ) -> vec2f {
	let h = pcg3( vec3u( bitcast<vec2u>( p ), 0x51ed270bu ) );
	return vec2f( u32ToUnit( h.x ), u32ToUnit( h.y ) );
}
fn hash33( p: vec3f ) -> vec3f {
	let h = pcg3( bitcast<vec3u>( p ) );
	return vec3f( u32ToUnit( h.x ), u32ToUnit( h.y ), u32ToUnit( h.z ) );
}
fn hashU( a: u32, b: u32 ) -> f32 { return u32ToUnit( pcg( a ^ pcg( b ) ) ); }
fn ihash3( p: vec3i ) -> vec3u { return pcg3( bitcast<vec3u>( p ) ); }

// Jimenez interleaved gradient noise at a pixel (0..1)
fn interleavedGradientNoise( px: vec2f ) -> f32 { return fract( 52.9829189 * fract( dot( px, vec2f( 0.06711056, 0.00583715 ) ) ) ); }

// i-th of n points of a Vogel disc (unit radius), rotated by phi
fn vogelDiskSample( i: i32, n: i32, phi: f32 ) -> vec2f {
	let r = sqrt( ( f32( i ) + 0.5 ) / f32( n ) );
	let theta = f32( i ) * 2.399963229728653 + phi;
	return vec2f( cos( theta ), sin( theta ) ) * r;
}

// ---- gradient noise: MaterialX (three's MaterialXNoise.js) bit for bit — the same Jenkins
// lookup3 hash, gradients, quintic fade and gradient scales (0.6616 in 2D, 0.982 in 3D), so the
// procedural patterns land where they did in the three.js version.

fn _mxRotl( x: u32, k: u32 ) -> u32 { return ( x << k ) | ( x >> ( 32u - k ) ); }
fn _mxFinal( a0: u32, b0: u32, c0: u32 ) -> u32 {
	var a = a0; var b = b0; var c = c0;
	c ^= b; c -= _mxRotl( b, 14u );
	a ^= c; a -= _mxRotl( c, 11u );
	b ^= a; b -= _mxRotl( a, 25u );
	c ^= b; c -= _mxRotl( b, 16u );
	a ^= c; a -= _mxRotl( c, 4u );
	b ^= a; b -= _mxRotl( a, 14u );
	c ^= b; c -= _mxRotl( b, 24u );
	return c;
}
fn mxHash2( x: i32, y: i32 ) -> u32 { let s = 0xdeadbeefu + ( 2u << 2u ) + 13u; return _mxFinal( s + u32( x ), s + u32( y ), s ); }
fn mxHash3( x: i32, y: i32, z: i32 ) -> u32 { let s = 0xdeadbeefu + ( 3u << 2u ) + 13u; return _mxFinal( s + u32( x ), s + u32( y ), s + u32( z ) ); }
fn _mxGrad2( hash: u32, x: f32, y: f32 ) -> f32 {
	let h = hash & 7u;
	let u = select( y, x, h < 4u );
	let v = 2.0 * select( x, y, h < 4u );
	return select( u, - u, ( h & 1u ) != 0u ) + select( v, - v, ( h & 2u ) != 0u );
}
fn _gradDot3( h: u32, p: vec3f ) -> f32 {
	let hh = h & 15u;
	let u = select( p.y, p.x, hh < 8u );
	let v = select( select( p.z, p.x, hh == 12u || hh == 14u ), p.y, hh < 4u );
	return select( u, - u, ( hh & 1u ) != 0u ) + select( v, - v, ( hh & 2u ) != 0u );
}
fn _fade3( t: vec3f ) -> vec3f { return t * t * t * ( t * ( t * 6.0 - 15.0 ) + 10.0 ); }
fn _h3( i: vec3i ) -> u32 { return mxHash3( i.x, i.y, i.z ); }

fn perlin3( p: vec3f ) -> f32 {
	let fl = floor( p );
	let i = vec3i( fl );
	let f = p - fl;
	let u = _fade3( f );
	let n000 = _gradDot3( _h3( i ), f );
	let n100 = _gradDot3( _h3( i + vec3i( 1, 0, 0 ) ), f - vec3f( 1.0, 0.0, 0.0 ) );
	let n010 = _gradDot3( _h3( i + vec3i( 0, 1, 0 ) ), f - vec3f( 0.0, 1.0, 0.0 ) );
	let n110 = _gradDot3( _h3( i + vec3i( 1, 1, 0 ) ), f - vec3f( 1.0, 1.0, 0.0 ) );
	let n001 = _gradDot3( _h3( i + vec3i( 0, 0, 1 ) ), f - vec3f( 0.0, 0.0, 1.0 ) );
	let n101 = _gradDot3( _h3( i + vec3i( 1, 0, 1 ) ), f - vec3f( 1.0, 0.0, 1.0 ) );
	let n011 = _gradDot3( _h3( i + vec3i( 0, 1, 1 ) ), f - vec3f( 0.0, 1.0, 1.0 ) );
	let n111 = _gradDot3( _h3( i + vec3i( 1, 1, 1 ) ), f - vec3f( 1.0, 1.0, 1.0 ) );
	let x0 = mix( mix( n000, n100, u.x ), mix( n010, n110, u.x ), u.y );
	let x1 = mix( mix( n001, n101, u.x ), mix( n011, n111, u.x ), u.y );
	return mix( x0, x1, u.z ) * 0.982;
}
fn perlin2( p: vec2f ) -> f32 {
	let fl = floor( p );
	let X = i32( fl.x ); let Y = i32( fl.y );
	let fx = p.x - fl.x; let fy = p.y - fl.y;
	let u = _fade3( vec3f( fx, fy, 0.0 ) );
	let v0 = _mxGrad2( mxHash2( X, Y ), fx, fy );
	let v1 = _mxGrad2( mxHash2( X + 1, Y ), fx - 1.0, fy );
	let v2 = _mxGrad2( mxHash2( X, Y + 1 ), fx, fy - 1.0 );
	let v3 = _mxGrad2( mxHash2( X + 1, Y + 1 ), fx - 1.0, fy - 1.0 );
	let s1 = 1.0 - u.x;
	return ( ( 1.0 - u.y ) * ( v0 * s1 + v1 * u.x ) + u.y * ( v2 * s1 + v3 * u.x ) ) * 0.6616;
}
fn mx_noise_float3( p: vec3f ) -> f32 { return perlin3( p ); }
fn mx_noise_float2( p: vec2f ) -> f32 { return perlin2( p ); }
// MaterialX vec3 noise: one hash per corner, its three low bytes pick the gradients
fn _mxGrad3v( h: u32, p: vec3f ) -> vec3f { return vec3f( _gradDot3( h & 0xffu, p ), _gradDot3( ( h >> 8u ) & 0xffu, p ), _gradDot3( ( h >> 16u ) & 0xffu, p ) ); }
fn mx_noise_vec3( p: vec3f ) -> vec3f {
	let fl = floor( p );
	let i = vec3i( fl );
	let f = p - fl;
	let u = _fade3( f );
	let n000 = _mxGrad3v( _h3( i ), f );
	let n100 = _mxGrad3v( _h3( i + vec3i( 1, 0, 0 ) ), f - vec3f( 1.0, 0.0, 0.0 ) );
	let n010 = _mxGrad3v( _h3( i + vec3i( 0, 1, 0 ) ), f - vec3f( 0.0, 1.0, 0.0 ) );
	let n110 = _mxGrad3v( _h3( i + vec3i( 1, 1, 0 ) ), f - vec3f( 1.0, 1.0, 0.0 ) );
	let n001 = _mxGrad3v( _h3( i + vec3i( 0, 0, 1 ) ), f - vec3f( 0.0, 0.0, 1.0 ) );
	let n101 = _mxGrad3v( _h3( i + vec3i( 1, 0, 1 ) ), f - vec3f( 1.0, 0.0, 1.0 ) );
	let n011 = _mxGrad3v( _h3( i + vec3i( 0, 1, 1 ) ), f - vec3f( 0.0, 1.0, 1.0 ) );
	let n111 = _mxGrad3v( _h3( i + vec3i( 1, 1, 1 ) ), f - vec3f( 1.0, 1.0, 1.0 ) );
	let x0 = mix( mix( n000, n100, u.x ), mix( n010, n110, u.x ), u.y );
	let x1 = mix( mix( n001, n101, u.x ), mix( n011, n111, u.x ), u.y );
	return mix( x0, x1, u.z ) * 0.982;
}
fn mx_fractal_noise_float3( p: vec3f, octaves: i32, lacunarity: f32, diminish: f32 ) -> f32 {
	var r = 0.0; var amp = 1.0; var q = p;
	for ( var i = 0; i < octaves; i++ ) { r += amp * perlin3( q ); amp *= diminish; q *= lacunarity; }
	return r;
}
fn mx_cell_noise_float3( p: vec3f ) -> f32 { let i = vec3i( floor( p ) ); return f32( mxHash3( i.x, i.y, i.z ) ) / f32( 0xffffffffu ); }
fn mx_cell_noise_float2( p: vec2f ) -> f32 { let i = vec2i( floor( p ) ); return f32( mxHash2( i.x, i.y ) ) / f32( 0xffffffffu ); }
// distances to the nearest two feature points (F1, F2), jitter 0..1
fn mx_worley_noise_vec2_3( p: vec3f, jitter: f32 ) -> vec2f {
	let i = vec3i( floor( p ) );
	let f = fract( p );
	var d1 = 1e9; var d2 = 1e9;
	for ( var z = -1; z <= 1; z++ ) { for ( var y = -1; y <= 1; y++ ) { for ( var x = -1; x <= 1; x++ ) {
		let c = vec3i( x, y, z );
		let h = ihash3( i + c );
		let o = vec3f( f32( c.x ), f32( c.y ), f32( c.z ) ) + ( vec3f( u32ToUnit( h.x ), u32ToUnit( h.y ), u32ToUnit( h.z ) ) - 0.5 ) * jitter + 0.5 - f;
		let d = dot( o, o );
		if ( d < d1 ) { d2 = d1; d1 = d; } else if ( d < d2 ) { d2 = d; }
	} } }
	return sqrt( vec2f( d1, d2 ) );
}
fn mx_worley_noise_vec2_2( p: vec2f, jitter: f32 ) -> vec2f {
	let i = vec2i( floor( p ) );
	let f = fract( p );
	var d1 = 1e9; var d2 = 1e9;
	for ( var y = -1; y <= 1; y++ ) { for ( var x = -1; x <= 1; x++ ) {
		let c = vec2i( x, y );
		let h = ihash3( vec3i( i + c, 0 ) );
		let o = vec2f( f32( c.x ), f32( c.y ) ) + ( vec2f( u32ToUnit( h.x ), u32ToUnit( h.y ) ) - 0.5 ) * jitter + 0.5 - f;
		let d = dot( o, o );
		if ( d < d1 ) { d2 = d1; d1 = d; } else if ( d < d2 ) { d2 = d; }
	} }
	return sqrt( vec2f( d1, d2 ) );
}

// ---- normals

// orthonormal basis around n (Frisvad / Duff et al.)
fn basis( n: vec3f ) -> mat3x3f {
	let s = select( -1.0, 1.0, n.z >= 0.0 );
	let a = -1.0 / ( s + n.z );
	let b = n.x * n.y * a;
	let t = vec3f( 1.0 + s * n.x * n.x * a, s * b, -s * n.x );
	let bt = vec3f( b, s + n.y * n.y * a, -n.y );
	return mat3x3f( t, bt, n );
}

// Perturb a world-space normal by a height field sampled with screen-space derivatives
// (Mikkelsen, "Bump Mapping Unparametrized Surfaces"; TSL perturbNormal equivalent).
// dhdx / dhdy: dpdx / dpdy of the height (in metres) at this pixel.
fn perturbNormalByHeight( P: vec3f, N: vec3f, dhdx: f32, dhdy: f32, strength: f32 ) -> vec3f {
	let dPdx = dpdx( P );
	let dPdy = dpdy( P );
	let r1 = cross( dPdy, N );
	let r2 = cross( N, dPdx );
	let det = dot( dPdx, r1 );
	let grad = sign( det ) * ( dhdx * r1 + dhdy * r2 ) * strength;
	return normalize( abs( det ) * N - grad );
}

// tangent-space normal map sample (xy in -1..1) applied with a derivative-based TBN
fn perturbNormalByMap( P: vec3f, N: vec3f, uv: vec2f, mapN: vec3f ) -> vec3f {
	let dp1 = dpdx( P ); let dp2 = dpdy( P );
	let duv1 = dpdx( uv ); let duv2 = dpdy( uv );
	let dp2perp = cross( dp2, N ); let dp1perp = cross( N, dp1 );
	let T = dp2perp * duv1.x + dp1perp * duv2.x;
	let B = dp2perp * duv1.y + dp1perp * duv2.y;
	let invmax = inverseSqrt( max( max( dot( T, T ), dot( B, B ) ), 1e-20 ) );
	return normalize( mat3x3f( T * invmax, B * invmax, N ) * mapN );
}

// ---- color

fn srgbToLinear( c: vec3f ) -> vec3f {
	return select( pow( ( c + 0.055 ) / 1.055, vec3f( 2.4 ) ), c / 12.92, c <= vec3f( 0.04045 ) );
}
fn linearToSrgb( c: vec3f ) -> vec3f {
	return select( 1.055 * pow( c, vec3f( 1.0 / 2.4 ) ) - 0.055, c * 12.92, c <= vec3f( 0.0031308 ) );
}
`}),Ot=Math.PI/180,Rs=180/Math.PI,H=[];for(let h=0;h<256;h++)H[h]=(h<16?"0":"")+h.toString(16);function cs(){const h=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(H[h&255]+H[h>>8&255]+H[h>>16&255]+H[h>>24&255]+"-"+H[e&255]+H[e>>8&255]+"-"+H[e>>16&15|64]+H[e>>24&255]+"-"+H[t&63|128]+H[t>>8&255]+"-"+H[t>>16&255]+H[t>>24&255]+H[s&255]+H[s>>8&255]+H[s>>16&255]+H[s>>24&255]).toLowerCase()}function Br(h,e){switch(e.constructor){case Float32Array:case Float64Array:return h;case Uint32Array:return h/4294967295;case Uint16Array:return h/65535;case Uint8Array:case Uint8ClampedArray:return h/255;case Int32Array:return Math.max(h/2147483647,-1);case Int16Array:return Math.max(h/32767,-1);case Int8Array:return Math.max(h/127,-1);default:return h}}function Er(h,e){switch(e.constructor){case Float32Array:case Float64Array:return h;case Uint32Array:return Math.round(h*4294967295);case Uint16Array:return Math.round(h*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(h*255);case Int32Array:return Math.round(h*2147483647);case Int16Array:return Math.round(h*32767);case Int8Array:return Math.round(h*127);default:return h}}class q{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){return e===0?this.x=t:this.y=t,this}getComponent(e){return e===0?this.x:this.y}clone(){return new q(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,s=this.y,i=e.elements;return this.x=i[0]*t+i[3]*s+i[6],this.y=i[1]*t+i[4]*s+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());return t===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(e)/t)))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y;return t*t+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const s=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*s-a*i+e.x,this.y=r*i+a*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}q.prototype.isVector2=!0;class ie{constructor(e=0,t=0,s=0,i=1){this._x=e,this._y=t,this._z=s,this._w=i,this._onChangeCallback=Ir}static slerpFlat(e,t,s,i,r,a,n){const o=new ie().fromArray(s,i),l=new ie().fromArray(r,a);o.slerp(l,n).toArray(e,t)}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,s,i){return this._x=e,this._y=t,this._z=s,this._w=i,this._onChangeCallback(),this}clone(){return new ie(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}identity(){return this.set(0,0,0,1)}setFromEuler(e,t=!0){const s=e._x,i=e._y,r=e._z,a=e._order,n=Math.cos(s/2),o=Math.cos(i/2),l=Math.cos(r/2),c=Math.sin(s/2),f=Math.sin(i/2),d=Math.sin(r/2);switch(a){case"XYZ":this._x=c*o*l+n*f*d,this._y=n*f*l-c*o*d,this._z=n*o*d+c*f*l,this._w=n*o*l-c*f*d;break;case"YXZ":this._x=c*o*l+n*f*d,this._y=n*f*l-c*o*d,this._z=n*o*d-c*f*l,this._w=n*o*l+c*f*d;break;case"ZXY":this._x=c*o*l-n*f*d,this._y=n*f*l+c*o*d,this._z=n*o*d+c*f*l,this._w=n*o*l-c*f*d;break;case"ZYX":this._x=c*o*l-n*f*d,this._y=n*f*l+c*o*d,this._z=n*o*d-c*f*l,this._w=n*o*l+c*f*d;break;case"YZX":this._x=c*o*l+n*f*d,this._y=n*f*l+c*o*d,this._z=n*o*d-c*f*l,this._w=n*o*l-c*f*d;break;case"XZY":this._x=c*o*l-n*f*d,this._y=n*f*l-c*o*d,this._z=n*o*d+c*f*l,this._w=n*o*l+c*f*d;break;default:throw new Error("Quaternion.setFromEuler: unknown order "+a)}return t&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const s=t/2,i=Math.sin(s);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,s=t[0],i=t[4],r=t[8],a=t[1],n=t[5],o=t[9],l=t[2],c=t[6],f=t[10],d=s+n+f;if(d>0){const u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(c-o)*u,this._y=(r-l)*u,this._z=(a-i)*u}else if(s>n&&s>f){const u=2*Math.sqrt(1+s-n-f);this._w=(c-o)/u,this._x=.25*u,this._y=(i+a)/u,this._z=(r+l)/u}else if(n>f){const u=2*Math.sqrt(1+n-s-f);this._w=(r-l)/u,this._x=(i+a)/u,this._y=.25*u,this._z=(o+c)/u}else{const u=2*Math.sqrt(1+f-s-n);this._w=(a-i)/u,this._x=(r+l)/u,this._y=(o+c)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let s=e.x*t.x+e.y*t.y+e.z*t.z+1;return s<Number.EPSILON?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Math.max(-1,Math.min(1,this.dot(e)))))}rotateTowards(e,t){const s=this.angleTo(e);return s===0?this:this.slerp(e,Math.min(1,t/s))}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this.lengthSq())}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const s=e._x,i=e._y,r=e._z,a=e._w,n=t._x,o=t._y,l=t._z,c=t._w;return this._x=s*c+a*n+i*l-r*o,this._y=i*c+a*o+r*n-s*l,this._z=r*c+a*l+s*o-i*n,this._w=a*c-s*n-i*o-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const s=this._x,i=this._y,r=this._z,a=this._w;let n=a*e._w+s*e._x+i*e._y+r*e._z,o=e._x,l=e._y,c=e._z,f=e._w;if(n<0&&(o=-o,l=-l,c=-c,f=-f,n=-n),n>=1)return this;const d=1-n*n;if(d<=Number.EPSILON){const y=1-t;return this._w=y*a+t*f,this._x=y*s+t*o,this._y=y*i+t*l,this._z=y*r+t*c,this.normalize()}const u=Math.sqrt(d),m=Math.atan2(u,n),p=Math.sin((1-t)*m)/u,x=Math.sin(t*m)/u;return this._w=a*p+f*x,this._x=s*p+o*x,this._y=i*p+l*x,this._z=r*p+c*x,this._onChangeCallback(),this}slerpQuaternions(e,t,s){return this.copy(e).slerp(t,s)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),s=Math.random(),i=Math.sqrt(1-s),r=Math.sqrt(s);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this.set(e.getX(t),e.getY(t),e.getZ(t),e.getW(t))}_onChange(e){return this._onChangeCallback=e,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}function Ir(){}ie.prototype.isQuaternion=!0;const Ds=new ie;class T{constructor(e=0,t=0,s=0){this.x=e,this.y=t,this.z=s}set(e,t,s){return s===void 0&&(s=this.z),this.x=e,this.y=t,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){return e===0?this.x=t:e===1?this.y=t:this.z=t,this}getComponent(e){return e===0?this.x:e===1?this.y:this.z}clone(){return new T(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}applyEuler(e){return this.applyQuaternion(Ds.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ds.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,s=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*s+r[6]*i,this.y=r[1]*t+r[4]*s+r[7]*i,this.z=r[2]*t+r[5]*s+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,s=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*s+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*s+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*s+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*s+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,s=this.y,i=this.z,r=e.x,a=e.y,n=e.z,o=e.w,l=2*(a*i-n*s),c=2*(n*t-r*i),f=2*(r*s-a*t);return this.x=t+o*l+a*f-n*c,this.y=s+o*c+n*l-r*f,this.z=i+o*f+r*c-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,s=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*s+r[8]*i,this.y=r[1]*t+r[5]*s+r[9]*i,this.z=r[2]*t+r[6]*s+r[10]*i,this.normalize()}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(t,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const s=e.x,i=e.y,r=e.z,a=t.x,n=t.y,o=t.z;return this.x=i*o-r*n,this.y=r*a-s*o,this.z=s*n-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const s=e.dot(this)/t;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){const t=this.dot(e)/(e.lengthSq()||1);return this.addScaledVector(e,-t)}reflect(e){return this.addScaledVector(e,-2*this.dot(e))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());return t===0?Math.PI/2:Math.acos(Math.max(-1,Math.min(1,this.dot(e)/t)))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,s=this.y-e.y,i=this.z-e.z;return t*t+s*s+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,s){const i=Math.sin(t)*e;return this.x=i*Math.sin(s),this.y=Math.cos(t)*e,this.z=i*Math.cos(s),this}setFromCylindricalCoords(e,t,s){return this.x=e*Math.sin(t),this.y=s,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.set(t,s,i)}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,s=Math.sqrt(1-t*t);return this.x=s*Math.cos(e),this.y=t,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}T.prototype.isVector3=!0;class X{constructor(e=0,t=0,s=0,i=1){this.x=e,this.y=t,this.z=s,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,s,i){return this.x=e,this.y=t,this.z=s,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){return this["xyzw"[e]]=t,this}getComponent(e){return this["xyzw"[e]]}clone(){return new X(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix4(e){const t=this.x,s=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*s+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*s+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*s+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*s+a[11]*i+a[15]*r,this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.dot(this)}length(){return Math.sqrt(this.dot(this))}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,s){return this.x=e.x+(t.x-e.x)*s,this.y=e.y+(t.y-e.y)*s,this.z=e.z+(t.z-e.z)*s,this.w=e.w+(t.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}X.prototype.isVector4=!0;const Lr=2e3,Ie=2001,Vt=new T,Pe=new T,yt=new T,Z=new T,Nr=new ie,Bs=new T(1,1,1),Es=new T;class E{constructor(e,t,s,i,r,a,n,o,l,c,f,d,u,m,p,x){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,s,i,r,a,n,o,l,c,f,d,u,m,p,x)}set(e,t,s,i,r,a,n,o,l,c,f,d,u,m,p,x){const y=this.elements;return y[0]=e,y[4]=t,y[8]=s,y[12]=i,y[1]=r,y[5]=a,y[9]=n,y[13]=o,y[2]=l,y[6]=c,y[10]=f,y[14]=d,y[3]=u,y[7]=m,y[11]=p,y[15]=x,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)}clone(){return new E().fromArray(this.elements)}copy(e){const t=this.elements,s=e.elements;for(let i=0;i<16;i++)t[i]=s[i];return this}copyPosition(e){const t=this.elements,s=e.elements;return t[12]=s[12],t[13]=s[13],t[14]=s[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1)}extractBasis(e,t,s){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,t,s){return this.set(e.x,t.x,s.x,0,e.y,t.y,s.y,0,e.z,t.z,s.z,0,0,0,0,1)}extractRotation(e){const t=this.elements,s=e.elements,i=1/Vt.setFromMatrixColumn(e,0).length(),r=1/Vt.setFromMatrixColumn(e,1).length(),a=1/Vt.setFromMatrixColumn(e,2).length();return t[0]=s[0]*i,t[1]=s[1]*i,t[2]=s[2]*i,t[3]=0,t[4]=s[4]*r,t[5]=s[5]*r,t[6]=s[6]*r,t[7]=0,t[8]=s[8]*a,t[9]=s[9]*a,t[10]=s[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){return this.compose(Es,Nr.setFromEuler(e,!1),Bs)}makeRotationFromQuaternion(e){return this.compose(Es,e,Bs)}lookAt(e,t,s){const i=this.elements;return Z.subVectors(e,t),Z.lengthSq()===0&&(Z.z=1),Z.normalize(),Pe.crossVectors(s,Z),Pe.lengthSq()===0&&(Math.abs(s.z)===1?Z.x+=1e-4:Z.z+=1e-4,Z.normalize(),Pe.crossVectors(s,Z)),Pe.normalize(),yt.crossVectors(Z,Pe),i[0]=Pe.x,i[4]=yt.x,i[8]=Z.x,i[1]=Pe.y,i[5]=yt.y,i[9]=Z.y,i[2]=Pe.z,i[6]=yt.z,i[10]=Z.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,i=t.elements,r=this.elements,a=s[0],n=s[4],o=s[8],l=s[12],c=s[1],f=s[5],d=s[9],u=s[13],m=s[2],p=s[6],x=s[10],y=s[14],v=s[3],w=s[7],M=s[11],k=s[15],z=i[0],_=i[4],P=i[8],R=i[12],D=i[1],B=i[5],L=i[9],C=i[13],F=i[2],A=i[6],N=i[10],$=i[14],Q=i[3],b=i[7],S=i[11],I=i[15];return r[0]=a*z+n*D+o*F+l*Q,r[4]=a*_+n*B+o*A+l*b,r[8]=a*P+n*L+o*N+l*S,r[12]=a*R+n*C+o*$+l*I,r[1]=c*z+f*D+d*F+u*Q,r[5]=c*_+f*B+d*A+u*b,r[9]=c*P+f*L+d*N+u*S,r[13]=c*R+f*C+d*$+u*I,r[2]=m*z+p*D+x*F+y*Q,r[6]=m*_+p*B+x*A+y*b,r[10]=m*P+p*L+x*N+y*S,r[14]=m*R+p*C+x*$+y*I,r[3]=v*z+w*D+M*F+k*Q,r[7]=v*_+w*B+M*A+k*b,r[11]=v*P+w*L+M*N+k*S,r[15]=v*R+w*C+M*$+k*I,this}multiplyScalar(e){const t=this.elements;for(let s=0;s<16;s++)t[s]*=e;return this}determinant(){const e=this.elements,t=e[0],s=e[4],i=e[8],r=e[12],a=e[1],n=e[5],o=e[9],l=e[13],c=e[2],f=e[6],d=e[10],u=e[14],m=e[3],p=e[7],x=e[11],y=e[15],v=d*y-u*x,w=f*y-u*p,M=f*x-d*p,k=c*y-u*m,z=c*x-d*m,_=c*p-f*m;return t*(n*v-o*w+l*M)-s*(a*v-o*k+l*z)+i*(a*w-n*k+l*_)-r*(a*M-n*z+o*_)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,s){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=s),this}invert(){const e=this.elements,t=e[0],s=e[1],i=e[2],r=e[3],a=e[4],n=e[5],o=e[6],l=e[7],c=e[8],f=e[9],d=e[10],u=e[11],m=e[12],p=e[13],x=e[14],y=e[15],v=t*n-s*a,w=t*o-i*a,M=t*l-r*a,k=s*o-i*n,z=s*l-r*n,_=i*l-r*o,P=c*p-f*m,R=c*x-d*m,D=c*y-u*m,B=f*x-d*p,L=f*y-u*p,C=d*y-u*x,F=v*C-w*L+M*B+k*D-z*R+_*P;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/F;return e[0]=(n*C-o*L+l*B)*A,e[1]=(i*L-s*C-r*B)*A,e[2]=(p*_-x*z+y*k)*A,e[3]=(d*z-f*_-u*k)*A,e[4]=(o*D-a*C-l*R)*A,e[5]=(t*C-i*D+r*R)*A,e[6]=(x*M-m*_-y*w)*A,e[7]=(c*_-d*M+u*w)*A,e[8]=(a*L-n*D+l*P)*A,e[9]=(s*D-t*L-r*P)*A,e[10]=(m*z-p*M+y*v)*A,e[11]=(f*M-c*z-u*v)*A,e[12]=(n*R-a*B-o*P)*A,e[13]=(t*B-s*R+i*P)*A,e[14]=(p*w-m*k-x*v)*A,e[15]=(c*k-f*w+d*v)*A,this}scale(e){const t=this.elements;return t[0]*=e.x,t[4]*=e.y,t[8]*=e.z,t[1]*=e.x,t[5]*=e.y,t[9]*=e.z,t[2]*=e.x,t[6]*=e.y,t[10]*=e.z,t[3]*=e.x,t[7]*=e.y,t[11]*=e.z,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,s,i))}makeTranslation(e,t,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,s,0,0,0,1)}makeRotationX(e){const t=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,t,-s,0,0,s,t,0,0,0,0,1)}makeRotationY(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,0,s,0,0,1,0,0,-s,0,t,0,0,0,0,1)}makeRotationZ(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,0,s,t,0,0,0,0,1,0,0,0,0,1)}makeRotationAxis(e,t){const s=Math.cos(t),i=Math.sin(t),r=1-s,a=e.x,n=e.y,o=e.z,l=r*a,c=r*n;return this.set(l*a+s,l*n-i*o,l*o+i*n,0,l*n+i*o,c*n+s,c*o-i*a,0,l*o-i*n,c*o+i*a,r*o*o+s,0,0,0,0,1)}makeScale(e,t,s){return this.set(e,0,0,0,0,t,0,0,0,0,s,0,0,0,0,1)}makeShear(e,t,s,i,r,a){return this.set(1,s,r,0,e,1,a,0,t,i,1,0,0,0,0,1)}compose(e,t,s){const i=this.elements,r=t._x,a=t._y,n=t._z,o=t._w,l=r+r,c=a+a,f=n+n,d=r*l,u=r*c,m=r*f,p=a*c,x=a*f,y=n*f,v=o*l,w=o*c,M=o*f,k=s.x,z=s.y,_=s.z;return i[0]=(1-(p+y))*k,i[1]=(u+M)*k,i[2]=(m-w)*k,i[3]=0,i[4]=(u-M)*z,i[5]=(1-(d+y))*z,i[6]=(x+v)*z,i[7]=0,i[8]=(m+w)*_,i[9]=(x-v)*_,i[10]=(1-(d+p))*_,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,s){const i=this.elements;let r=Math.hypot(i[0],i[1],i[2]);const a=Math.hypot(i[4],i[5],i[6]),n=Math.hypot(i[8],i[9],i[10]);this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14];const o=Fr.copy(this),l=o.elements,c=1/r,f=1/a,d=1/n;return l[0]*=c,l[1]*=c,l[2]*=c,l[4]*=f,l[5]*=f,l[6]*=f,l[8]*=d,l[9]*=d,l[10]*=d,t.setFromRotationMatrix(o),s.x=r,s.y=a,s.z=n,this}makePerspective(e,t,s,i,r,a,n=Ie,o=!0){const l=this.elements,c=2*r/(t-e),f=2*r/(s-i),d=(t+e)/(t-e),u=(s+i)/(s-i);let m,p;const x=a===1/0;if(o){if(n!==Ie)throw new Error("Matrix4.makePerspective: reversed depth requires WebGPU clip space");m=x?0:r/(a-r),p=x?r:a*r/(a-r)}else n===Ie?(m=x?-1:-a/(a-r),p=x?-r:-a*r/(a-r)):(m=x?-1:-(a+r)/(a-r),p=x?-2*r:-2*a*r/(a-r));return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,s,i,r,a,n=Ie,o=!0){const l=this.elements,c=1/(t-e),f=1/(s-i),d=1/(a-r),u=(t+e)*c,m=(s+i)*f;let p,x;return o?(p=a*d,x=d):n===Ie?(p=-r*d,x=-d):(p=-(a+r)*d,x=-2*d),l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*f,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=x,l[14]=p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){for(let t=0;t<16;t++)if(this.elements[t]!==e.elements[t])return!1;return!0}fromArray(e,t=0){for(let s=0;s<16;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){const s=this.elements;for(let i=0;i<16;i++)e[t+i]=s[i];return e}}E.prototype.isMatrix4=!0;const Fr=new E,Is=new E,Ls=new ie,Ue=h=>Math.max(-1,Math.min(1,h));class Re{constructor(e=0,t=0,s=0,i=Re.DEFAULT_ORDER){this._x=e,this._y=t,this._z=s,this._order=i,this._onChangeCallback=Ur}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,s,i=this._order){return this._x=e,this._y=t,this._z=s,this._order=i,this._onChangeCallback(),this}clone(){return new Re(this._x,this._y,this._z,this._order)}copy(e){return this.set(e._x,e._y,e._z,e._order)}setFromRotationMatrix(e,t=this._order,s=!0){const i=e.elements,r=i[0],a=i[4],n=i[8],o=i[1],l=i[5],c=i[9],f=i[2],d=i[6],u=i[10],m=.9999999;switch(t){case"XYZ":this._y=Math.asin(Ue(n)),Math.abs(n)<m?(this._x=Math.atan2(-c,u),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ue(c)),Math.abs(c)<m?(this._y=Math.atan2(n,u),this._z=Math.atan2(o,l)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ue(d)),Math.abs(d)<m?(this._y=Math.atan2(-f,u),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(o,r));break;case"ZYX":this._y=Math.asin(-Ue(f)),Math.abs(f)<m?(this._x=Math.atan2(d,u),this._z=Math.atan2(o,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ue(o)),Math.abs(o)<m?(this._x=Math.atan2(-c,l),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(n,u));break;case"XZY":this._z=Math.asin(-Ue(a)),Math.abs(a)<m?(this._x=Math.atan2(d,l),this._y=Math.atan2(n,r)):(this._x=Math.atan2(-c,u),this._y=0);break;default:throw new Error("Euler.setFromRotationMatrix: unknown order "+t)}return this._order=t,s&&this._onChangeCallback(),this}setFromQuaternion(e,t,s){return Is.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Is,t,s)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ls.setFromEuler(this),this.setFromQuaternion(Ls,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}function Ur(){}Re.DEFAULT_ORDER="XYZ";Re.prototype.isEuler=!0;class Ne{constructor(e,t,s,i,r,a,n,o,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,s,i,r,a,n,o,l)}set(e,t,s,i,r,a,n,o,l){const c=this.elements;return c[0]=e,c[1]=i,c[2]=n,c[3]=t,c[4]=r,c[5]=o,c[6]=s,c[7]=a,c[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1)}copy(e){const t=this.elements,s=e.elements;for(let i=0;i<9;i++)t[i]=s[i];return this}clone(){return new Ne().fromArray(this.elements)}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10])}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const s=e.elements,i=t.elements,r=this.elements,a=s[0],n=s[3],o=s[6],l=s[1],c=s[4],f=s[7],d=s[2],u=s[5],m=s[8],p=i[0],x=i[3],y=i[6],v=i[1],w=i[4],M=i[7],k=i[2],z=i[5],_=i[8];return r[0]=a*p+n*v+o*k,r[3]=a*x+n*w+o*z,r[6]=a*y+n*M+o*_,r[1]=l*p+c*v+f*k,r[4]=l*x+c*w+f*z,r[7]=l*y+c*M+f*_,r[2]=d*p+u*v+m*k,r[5]=d*x+u*w+m*z,r[8]=d*y+u*M+m*_,this}multiplyScalar(e){const t=this.elements;for(let s=0;s<9;s++)t[s]*=e;return this}determinant(){const e=this.elements,t=e[0],s=e[1],i=e[2],r=e[3],a=e[4],n=e[5],o=e[6],l=e[7],c=e[8];return t*a*c-t*n*l-s*r*c+s*n*o+i*r*l-i*a*o}invert(){const e=this.elements,t=e[0],s=e[1],i=e[2],r=e[3],a=e[4],n=e[5],o=e[6],l=e[7],c=e[8],f=c*a-n*l,d=n*o-c*r,u=l*r-a*o,m=t*f+s*d+i*u;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const p=1/m;return e[0]=f*p,e[1]=(i*l-c*s)*p,e[2]=(n*s-i*a)*p,e[3]=d*p,e[4]=(c*t-i*o)*p,e[5]=(i*r-n*t)*p,e[6]=u*p,e[7]=(s*o-l*t)*p,e[8]=(a*t-s*r)*p,this}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}makeTranslation(e,t){return e.isVector2&&(t=e.y,e=e.x),this.set(1,0,e,0,1,t,0,0,1)}makeRotation(e){const t=Math.cos(e),s=Math.sin(e);return this.set(t,-s,0,s,t,0,0,0,1)}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1)}setUvTransform(e,t,s,i,r,a,n){const o=Math.cos(r),l=Math.sin(r);return this.set(s*o,s*l,-s*(o*a+l*n)+a+e,-i*l,i*o,-i*(-l*a+o*n)+n+t,0,0,1)}scale(e,t){return this.premultiply(Wt.makeScale(e,t))}rotate(e){return this.premultiply(Wt.makeRotation(-e))}translate(e,t){return this.premultiply(Wt.makeTranslation(e,t))}equals(e){for(let t=0;t<9;t++)if(this.elements[t]!==e.elements[t])return!1;return!0}fromArray(e,t=0){for(let s=0;s<9;s++)this.elements[s]=e[s+t];return this}toArray(e=[],t=0){for(let s=0;s<9;s++)e[t+s]=this.elements[s];return e}}Ne.prototype.isMatrix3=!0;const Wt=new Ne,pe="srgb",xt="srgb-linear",Oe=h=>h<.04045?h*.0773993808:Math.pow(h*.9478672986+.0521327014,2.4),te=h=>h<.0031308?h*12.92:1.055*Math.pow(h,.41666)-.055,et=h=>Math.max(0,Math.min(1,h)),Or=(h,e)=>(h%e+e)%e;function Gt(h,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?h+(e-h)*6*t:t<1/2?e:t<2/3?h+(e-h)*6*(2/3-t):h}const gt={h:0,s:0,l:0};class be{constructor(e,t,s){this.r=1,this.g=1,this.b=1,this.set(e,t,s)}set(e,t,s){if(t===void 0&&s===void 0){if(e===void 0)return this;e&&e.isColor?this.copy(e):typeof e=="number"?this.setHex(e):typeof e=="string"&&this.setStyle(e)}else this.setRGB(e,t,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=pe){return e=Math.floor(e),this.setRGB((e>>16&255)/255,(e>>8&255)/255,(e&255)/255,t)}setRGB(e,t,s,i=xt){return i===pe&&(e=Oe(e),t=Oe(t),s=Oe(s)),this.r=e,this.g=t,this.b=s,this}setHSL(e,t,s,i=xt){if(e=Or(e,1),t=et(t),s=et(s),t===0)return this.setRGB(s,s,s,i);const r=s<=.5?s*(1+t):s+t-s*t,a=2*s-r;return this.setRGB(Gt(a,r,e+1/3),Gt(a,r,e),Gt(a,r,e-1/3),i)}setStyle(e,t=pe){let s;if(s=/^#([A-Fa-f\d]+)$/.exec(e)){const i=s[1];if(i.length===3)return this.setRGB(parseInt(i[0],16)/15,parseInt(i[1],16)/15,parseInt(i[2],16)/15,t);if(i.length===6)return this.setHex(parseInt(i,16),t)}else if(s=/^rgba?\(\s*([\d.]+)(%?)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*(?:,\s*[\d.]+\s*)?\)$/.exec(e)){const i=s[2]==="%"?100:255;return this.setRGB(Math.min(1,s[1]/i),Math.min(1,s[3]/i),Math.min(1,s[4]/i),t)}else{if(s=/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*[\d.]+\s*)?\)$/.exec(e))return this.setHSL(s[1]/360,s[2]/100,s[3]/100,t);if(es[e.toLowerCase()]!==void 0)return this.setHex(es[e.toLowerCase()],t)}return console.warn("Color: unknown color "+e),this}clone(){return new be(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Oe(e.r),this.g=Oe(e.g),this.b=Oe(e.b),this}copyLinearToSRGB(e){return this.r=te(e.r),this.g=te(e.g),this.b=te(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this)}convertLinearToSRGB(){return this.copyLinearToSRGB(this)}getHex(e=pe){let t=this.r,s=this.g,i=this.b;return e===pe&&(t=te(t),s=te(s),i=te(i)),Math.round(et(t)*255)*65536+Math.round(et(s)*255)*256+Math.round(et(i)*255)}getHexString(e=pe){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=xt){let s=this.r,i=this.g,r=this.b;t===pe&&(s=te(s),i=te(i),r=te(r));const a=Math.max(s,i,r),n=Math.min(s,i,r);let o=0,l=0;const c=(n+a)/2;if(n!==a){const f=a-n;l=c<=.5?f/(a+n):f/(2-a-n),a===s?o=(i-r)/f+(i<r?6:0):a===i?o=(r-s)/f+2:o=(s-i)/f+4,o/=6}return e.h=o,e.s=l,e.l=c,e}getRGB(e,t=xt){return e.r=this.r,e.g=this.g,e.b=this.b,t===pe&&(e.r=te(e.r),e.g=te(e.g),e.b=te(e.b)),e}getStyle(e=pe){const t=this.getRGB({},e);return`rgb(${Math.round(t.r*255)},${Math.round(t.g*255)},${Math.round(t.b*255)})`}offsetHSL(e,t,s){return this.getHSL(gt),this.setHSL(gt.h+e,gt.s+t,gt.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,s){return this.r=e.r+(t.r-e.r)*s,this.g=e.g+(t.g-e.g)*s,this.b=e.b+(t.b-e.b)*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}be.prototype.isColor=!0;const es={black:0,white:16777215,red:16711680,green:32768,lime:65280,blue:255,yellow:16776960,cyan:65535,magenta:16711935,gray:8421504,grey:8421504,orange:16753920};be.NAMES=es;const le=new T,me=Array.from({length:8},()=>new T);class Me{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0;t<e.length;t+=3)this.expandByPoint(le.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0;t<e.count;t++)this.expandByPoint(le.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(const t of e)this.expandByPoint(t);return this}setFromCenterAndSize(e,t){return le.copy(t).multiplyScalar(.5),this.min.copy(e).sub(le),this.max.copy(e).add(le),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new Me().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const i=s.getAttribute("position");if(t&&i!==void 0)for(let r=0;r<i.count;r++)this.expandByPoint(le.fromBufferAttribute(i,r).applyMatrix4(e.matrixWorld));else s.boundingBox===null&&s.computeBoundingBox(),Ns.copy(s.boundingBox).applyMatrix4(e.matrixWorld),this.union(Ns)}for(const i of e.children)this.expandByObject(i,t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,le),le.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,s;const i=e.normal;return i.x>0?(t=i.x*this.min.x,s=i.x*this.max.x):(t=i.x*this.max.x,s=i.x*this.min.x),i.y>0?(t+=i.y*this.min.y,s+=i.y*this.max.y):(t+=i.y*this.max.y,s+=i.y*this.min.y),i.z>0?(t+=i.z*this.min.z,s+=i.z*this.max.z):(t+=i.z*this.max.z,s+=i.z*this.min.z),t<=-e.constant&&s>=-e.constant}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,le).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?(e.makeEmpty(),e):(this.getCenter(e.center),e.radius=this.getSize(le).length()*.5,e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){if(this.isEmpty())return this;const t=this.min,s=this.max;return me[0].set(t.x,t.y,t.z).applyMatrix4(e),me[1].set(t.x,t.y,s.z).applyMatrix4(e),me[2].set(t.x,s.y,t.z).applyMatrix4(e),me[3].set(t.x,s.y,s.z).applyMatrix4(e),me[4].set(s.x,t.y,t.z).applyMatrix4(e),me[5].set(s.x,t.y,s.z).applyMatrix4(e),me[6].set(s.x,s.y,t.z).applyMatrix4(e),me[7].set(s.x,s.y,s.z).applyMatrix4(e),this.setFromPoints(me)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}Me.prototype.isBox3=!0;const Ns=new Me,Vr=new Me,qt=new T;class ze{constructor(e=new T,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){t!==void 0?this.center.copy(t):Vr.setFromPoints(e).getCenter(this.center);let s=0;for(const i of e)s=Math.max(s,this.center.distanceToSquared(i));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}clone(){return new ze().copy(this)}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const s=this.center.distanceToSquared(e);return t.copy(e),s>this.radius*this.radius&&t.sub(this.center).normalize().multiplyScalar(this.radius).add(this.center),t}getBoundingBox(e){return this.isEmpty()?e.makeEmpty():(e.set(this.center,this.center),e.expandByScalar(this.radius))}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;qt.subVectors(e,this.center);const t=qt.lengthSq();if(t>this.radius*this.radius){const s=Math.sqrt(t),i=(s-this.radius)*.5;this.center.addScaledVector(qt,i/s),this.radius+=i}return this}union(e){if(e.isEmpty())return this;if(this.isEmpty())return this.copy(e);const t=this.center.distanceTo(e.center);if(t+e.radius<=this.radius)return this;if(t+this.radius<=e.radius)return this.copy(e);const s=(t+this.radius+e.radius)*.5;return this.center.lerp(e.center,(s-this.radius)/t),this.radius=s,this}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}}ze.prototype.isSphere=!0;const Fs=new T,Wr=new T,Gr=new Ne;class ge{constructor(e=new T(1,0,0),t=0){this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,s,i){return this.normal.set(e,t,s),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(e),this}setFromCoplanarPoints(e,t,s){const i=Fs.subVectors(s,t).cross(Wr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e)}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}clone(){return new ge().copy(this)}normalize(){const e=this.normal.length();if(e===0)return this;const t=1/e;return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}applyMatrix4(e,t){const s=t||Gr.getNormalMatrix(e),i=this.coplanarPoint(Fs).applyMatrix4(e),r=this.normal.applyMatrix3(s).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}}ge.prototype.isPlane=!0;const Us=new ze,vt=new T;class Ft{constructor(e=new ge,t=new ge,s=new ge,i=new ge,r=new ge,a=new ge){this.planes=[e,t,s,i,r,a]}set(e,t,s,i,r,a){const n=this.planes;return n[0].copy(e),n[1].copy(t),n[2].copy(s),n[3].copy(i),n[4].copy(r),n[5].copy(a),this}copy(e){for(let t=0;t<6;t++)this.planes[t].copy(e.planes[t]);return this}clone(){return new Ft().copy(this)}setFromProjectionMatrix(e,t=Ie,s=!0){const i=this.planes,r=e.elements,a=r[0],n=r[4],o=r[8],l=r[12],c=r[1],f=r[5],d=r[9],u=r[13],m=r[2],p=r[6],x=r[10],y=r[14],v=r[3],w=r[7],M=r[11],k=r[15];return i[0].setComponents(v+a,w+n,M+o,k+l).normalize(),i[1].setComponents(v-a,w-n,M-o,k-l).normalize(),i[2].setComponents(v+c,w+f,M+d,k+u).normalize(),i[3].setComponents(v-c,w-f,M-d,k-u).normalize(),s?(i[4].setComponents(v-m,w-p,M-x,k-y).normalize(),i[5].setComponents(m,p,x,y).normalize()):t===Lr?(i[4].setComponents(v+m,w+p,M+x,k+y).normalize(),i[5].setComponents(v-m,w-p,M-x,k-y).normalize()):(i[4].setComponents(m,p,x,y).normalize(),i[5].setComponents(v-m,w-p,M-x,k-y).normalize()),this}intersectsObject(e){const t=e.geometry;return t.boundingSphere===null&&t.computeBoundingSphere(),Us.copy(t.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(Us)}intersectsSphere(e){const t=this.planes,s=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(s)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let s=0;s<6;s++){const i=t[s].normal;if(vt.x=i.x>0?e.max.x:e.min.x,vt.y=i.y>0?e.max.y:e.min.y,vt.z=i.z>0?e.max.z:e.min.z,t[s].distanceToPoint(vt)<0)return!1}return!0}containsPoint(e){for(let t=0;t<6;t++)if(this.planes[t].distanceToPoint(e)<0)return!1;return!0}}const qr=new Float32Array(1);new Uint32Array(qr.buffer);const ct={hooks:{},version:0,set(h,e){this.hooks[h]=e,this.version++},modules(){return Object.values(this.hooks).filter(Boolean)}},Ui={directModulation:"fn hookDirectModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }",ambientModulation:"fn hookAmbientModulation( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 1.0 ); }",shadowPosition:"fn hookShadowPosition( P: vec3f, N: vec3f, pixel: vec2f ) -> vec3f { return P; }",bounce:"fn hookBounce( P: vec3f, N: vec3f ) -> vec3f { return vec3f( 0.0 ); }",localLights:"fn hookLocalLights( s: Surface, P: vec3f, N: vec3f, V: vec3f, acc: ptr<function, LightAccum> ) {}",envSpecular:"fn hookEnvSpecular( R: vec3f, roughness: f32 ) -> vec3f { let t = sat( R.y * 0.5 + 0.5 ); return mix( frame.horizonColor * 0.6, frame.skyIrradiance * PI, t ) * frame.envIntensity; }",envDiffuse:"fn hookEnvDiffuse( N: vec3f ) -> vec3f { return mix( frame.horizonColor * 0.25, frame.skyIrradiance, N.y * 0.5 + 0.5 ) * frame.envIntensity; }"};function $r(){const h=[];for(const e in Ui){const t=ct.hooks[e];t?h.push(t):h.push(Hr(e))}return h}const Os={};function Hr(h){return Os[h]||(Os[h]=new ae({name:"hook-"+h+"-default",deps:[ut],code:Ui[h]}))}const ot=new Te("SunShadow",{matrices:["mat4x4f[4]",[new E,new E,new E,new E]],cascades:["vec4f[4]",[new X,new X,new X,new X]],count:["u32",0],mapSize:["f32",2048],bias:["f32",2e-5],fade:["f32",1],pcssCascades:["u32",1],sunAngularDiameter:["f32",.00925],enabled:["f32",0],pad:["f32",0],depthBiasScale:["vec4f",new X(1,1,1,1)],blend:["vec4f[4]",[new X,new X,new X,new X]]});let Oi=null;function Yr(h){Oi=h}const Vi=new ae({name:"sunShadow",deps:[Le],uniforms:ot,uniformName:"shadowParams",bindings:{sunShadowMap:{texture:()=>Oi,viewDimension:"2d-array"}},code:`
fn shadowCascadeOf( viewDist: f32 ) -> i32 {
	for ( var i = 0; i < i32( shadowParams.count ); i++ ) { if ( viewDist < shadowParams.cascades[ i ].x ) { return i; } }
	return -1;
}

fn _shadowTap( uv: vec2f, layer: i32, z: f32 ) -> f32 {
	return textureSampleCompareLevel( sunShadowMap, smpShadow, uv, layer, z );
}

// shadow map depth (0 near .. 1 far, standard Z) at uv
fn _shadowDepth( uv: vec2f, layer: i32 ) -> f32 {
	let dim = vec2f( textureDimensions( sunShadowMap ) );
	let px = vec2i( clamp( uv * dim, vec2f( 0.0 ), dim - 1.0 ) );
	return textureLoad( sunShadowMap, px, layer, 0 );
}

// Contact-hardening sun shadows (PCSS, the former SunShadowFilter) on the near cascades. The penumbra of a
// real sun shadow grows with the distance from the occluder to the receiver (the sun is a 0.53 deg disc):
// sharp where an object touches the ground, soft under a palm crown 10 m up. Per pixel:
//  1. blocker search: average depth of the occluders around the pixel (raw depth loads, no sampler)
//  2. penumbra width = occluder-receiver distance * sun diameter, converted to this cascade's texels
//  3. percentage-closer filtering over that width
// Both sample sets are Vogel disks rotated per pixel and per frame (interleaved gradient noise): the
// TAA resolves the noise into a smooth gradient. Farther cascades: three's PCFShadowFilter (5 Vogel taps
// of hardware comparisons over one texel, rotated per pixel).
const SHADOW_MAX_OCCLUDER_HEIGHT: f32 = 30.0; // m: search radius covers penumbrae of occluders up to this far above
const SHADOW_SEARCH_TAPS: i32 = 8;
const SHADOW_FILTER_TAPS: i32 = 12;

fn sunShadowCascade( P: vec3f, N: vec3f, c: i32, noise: f32, pcfNoise: f32 ) -> f32 {
	return _sunShadowCascade( P, N, c, noise, pcfNoise, true );
}

// pcss = false: the 5-tap PCF filter in every cascade (no blocker search)
fn _sunShadowCascade( P: vec3f, N: vec3f, c: i32, noise: f32, pcfNoise: f32, pcss: bool ) -> f32 {
	let info = shadowParams.cascades[ c ];
	let Pb = P + N * info.z;
	let sc = shadowParams.matrices[ c ] * vec4f( Pb, 1.0 );
	let uvz = vec3f( sc.x * 0.5 + 0.5, 0.5 - sc.y * 0.5, sc.z );
	if ( any( uvz.xy < vec2f( 0.0 ) ) || any( uvz.xy > vec2f( 1.0 ) ) || uvz.z > 1.0 ) { return 1.0; }
	let z = uvz.z - shadowParams.bias * shadowParams.depthBiasScale[ c ];
	let texel = 1.0 / shadowParams.mapSize;
	if ( pcss && u32( c ) < shadowParams.pcssCascades ) {
		// moved every frame (Jimenez 2014): a noise pattern fixed on screen would never average out
		let phi = noise * TWO_PI;
		let width = info.y * shadowParams.mapSize; // cascade width (m)
		let range = info.w; // depth range (m)
		let SD = shadowParams.sunAngularDiameter;
		// 1. blockers within the widest penumbra this cascade can show. The texel straight along the light
		// ray comes first: a thin occluder (a log, a rope, a rail) can fall between the disk taps, which
		// left lit dots inside its umbra.
		let searchUV = max( min( SHADOW_MAX_OCCLUDER_HEIGHT * SD / width, texel * 24.0 ), texel * 1.5 );
		let d0 = _shadowDepth( uvz.xy, c );
		var blockSum = select( 0.0, d0, d0 < z );
		var blockCount = select( 0.0, 1.0, d0 < z );
		for ( var i = 0; i < SHADOW_SEARCH_TAPS; i++ ) {
			let d = _shadowDepth( uvz.xy + vogelDiskSample( i, SHADOW_SEARCH_TAPS, phi ) * searchUV, c );
			// standard depth: an occluder is closer to the light = smaller depth
			if ( d < z ) { blockSum += d; blockCount += 1.0; }
		}
		if ( blockCount < 0.5 ) { return 1.0; }
		// 2. occluder-receiver distance (orthographic: depth is linear over the camera range)
		let dz = abs( blockSum / blockCount - z ) * range;
		let penumbraUV = clamp( dz * SD / width, texel * 1.2, texel * 32.0 );
		// 3. PCF over the penumbra
		var sum = 0.0;
		for ( var i = 0; i < SHADOW_FILTER_TAPS; i++ ) {
			let d = _shadowDepth( uvz.xy + vogelDiskSample( i, SHADOW_FILTER_TAPS, phi + 1.7 ) * penumbraUV, c );
			sum += select( 0.0, 1.0, z <= d );
		}
		return sum / f32( SHADOW_FILTER_TAPS );
	}
	// three's PCFShadowFilter: 5 samples on a Vogel disk of one texel, rotated per pixel
	let phiP = pcfNoise * TWO_PI;
	var sum = 0.0;
	for ( var i = 0; i < 5; i++ ) {
		sum += _shadowTap( uvz.xy + vogelDiskSample( i, 5, phiP ) * texel, c, z );
	}
	return sum / 5.0;
}

// visibility of the sun at P (1 = lit); pixel = fragment coordinate for the dither.
// Cascade seams blended over a band that grows with their distance (SoftCSMShadowNode: a quarter of it,
// 2.5 m at the 10 m seam, 15 m at 60 m, and the last cascade fades out over its final 100 m); each
// cascade's map is widened to cover its part of the overlap.
fn sunShadow( P: vec3f, N: vec3f, pixel: vec2f ) -> f32 {
	return _sunShadow( P, N, pixel, true );
}

// sunShadow with the plain 5-tap PCF filter everywhere (surfaces whose own detail hides penumbrae: water)
fn sunShadowPCF( P: vec3f, N: vec3f, pixel: vec2f ) -> f32 {
	return _sunShadow( P, N, pixel, false );
}

fn _sunShadow( P: vec3f, N: vec3f, pixel: vec2f, pcss: bool ) -> f32 {
	if ( shadowParams.enabled < 0.5 ) { return 1.0; }
	let dist = dot( P - frame.cameraPos, - vec3f( frame.view[ 0 ][ 2 ], frame.view[ 1 ][ 2 ], frame.view[ 2 ][ 2 ] ) );
	let noise = interleavedGradientNoise( pixel + f32( frame.frameIndex % 64u ) * 5.588238 );
	let pcfNoise = interleavedGradientNoise( pixel );
	if ( shadowParams.fade < 0.5 ) {
		let c = shadowCascadeOf( dist );
		if ( c < 0 ) { return 1.0; }
		return _sunShadowCascade( P, N, c, noise, pcfNoise, pcss );
	}
	var ret = 1.0;
	let last = i32( shadowParams.count ) - 1;
	for ( var i = 0; i <= last; i++ ) {
		let b = shadowParams.blend[ i ]; // x, y: cascade range, z / w: blend margin at its near / far seam
		let cascadeMid = ( b.x + b.y ) * 0.5;
		let margin = max( select( b.w, b.z, dist < cascadeMid ), 1e-5 );
		let csmX = b.x - margin * 0.5;
		let csmY = select( b.y + margin * 0.5, b.y, i == last );
		if ( dist >= csmX && dist <= csmY ) {
			var ratio = clamp( min( dist - csmX, csmY - dist ) / margin, 0.0, 1.0 );
			// no fade at the near edge of the first cascade
			if ( i == 0 && dist <= cascadeMid ) { ratio = 1.0; }
			ret -= ( 1.0 - _sunShadowCascade( P, N, i, noise, pcfNoise, pcss ) ) * ratio;
		}
	}
	return max( ret, 0.0 );
}

// one depth comparison in cascade c (1 = lit; outside the map: lit). For volumetric marches (haze shafts,
// motes) where the jitter and the temporal resolve do the filtering.
fn sunShadowCascadeHard( P: vec3f, c: i32 ) -> f32 {
	let sc = shadowParams.matrices[ c ] * vec4f( P, 1.0 );
	let uv = vec2f( sc.x * 0.5 + 0.5, 0.5 - sc.y * 0.5 );
	if ( any( uv <= vec2f( 0.0 ) ) || any( uv >= vec2f( 1.0 ) ) || sc.z > 1.0 ) { return 1.0; }
	return select( 0.0, 1.0, sc.z - 2e-5 * shadowParams.depthBiasScale[ c ] <= _shadowDepth( uv, c ) );
}
// same in the cascade covering P (by view distance), 1 beyond the last one or with shadows off
fn sunShadowHard( P: vec3f ) -> f32 {
	if ( shadowParams.enabled < 0.5 ) { return 1.0; }
	let dist = dot( P - frame.cameraPos, - vec3f( frame.view[ 0 ][ 2 ], frame.view[ 1 ][ 2 ], frame.view[ 2 ][ 2 ] ) );
	let c = shadowCascadeOf( dist );
	if ( c < 0 ) { return 1.0; }
	return sunShadowCascadeHard( P, c );
}
`}),ut=new ae({name:"surface",deps:[Le],code:`
struct Surface {
	albedo: vec3f,
	alpha: f32,
	normal: vec3f,      // world space, shading normal
	roughness: f32,
	emissive: vec3f,
	metalness: f32,
	translucency: vec3f, // fraction of the direct light transmitted through thin foliage (x lightColor)
	ao: f32,
	sheenColor: vec3f,
	specularIntensity: f32,
	clearcoat: f32,
	clearcoatRoughness: f32,
	sheenRoughness: f32,
	ior: f32,
	clearcoatNormal: vec3f,
	envIntensity: f32,
};

fn defaultSurface( N: vec3f ) -> Surface {
	var s: Surface;
	s.albedo = vec3f( 1.0 ); s.alpha = 1.0; s.normal = N; s.roughness = 1.0; s.metalness = 0.0;
	s.emissive = vec3f( 0.0 ); s.translucency = vec3f( 0.0 ); s.ao = 1.0; s.sheenColor = vec3f( 0.0 );
	s.specularIntensity = 1.0; s.clearcoat = 0.0; s.clearcoatRoughness = 0.0; s.sheenRoughness = 1.0;
	s.ior = 1.5; s.clearcoatNormal = N; s.envIntensity = 1.0;
	return s;
}

// screen derivatives of the lit position, taken at the top of shadeSurface (every lane of the quad
// is live there; the sun hooks run in a branch, where derivatives are undefined)
var<private> lightDPdx: vec3f = vec3f( 0.0 );
var<private> lightDPdy: vec3f = vec3f( 0.0 );

struct LightAccum {
	directDiffuse: vec3f,
	directSpecular: vec3f,
	indirectDiffuse: vec3f,
	indirectSpecular: vec3f,
};

fn F_Schlick( f0: vec3f, f90: f32, dotVH: f32 ) -> vec3f {
	let fresnel = exp2( ( -5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + f90 * fresnel;
}
fn V_GGX_SmithCorrelated( alpha: f32, dotNL: f32, dotNV: f32 ) -> f32 {
	let a2 = alpha * alpha;
	let gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * dotNV * dotNV );
	let gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * dotNL * dotNL );
	return 0.5 / max( gv + gl, EPS );
}
fn D_GGX( alpha: f32, dotNH: f32 ) -> f32 {
	let a2 = alpha * alpha;
	let d = dotNH * dotNH * ( a2 - 1.0 ) + 1.0;
	return INV_PI * a2 / ( d * d );
}
fn BRDF_GGX( L: vec3f, V: vec3f, N: vec3f, f0: vec3f, f90: f32, roughness: f32 ) -> vec3f {
	let alpha = roughness * roughness;
	let H = normalize( L + V );
	let dotNL = sat( dot( N, L ) ); let dotNV = sat( dot( N, V ) );
	let dotNH = sat( dot( N, H ) ); let dotVH = sat( dot( V, H ) );
	return F_Schlick( f0, f90, dotVH ) * V_GGX_SmithCorrelated( alpha, dotNL, dotNV ) * D_GGX( alpha, dotNH );
}
// Charlie sheen (Estevez & Kulla)
fn D_Charlie( roughness: f32, dotNH: f32 ) -> f32 {
	let a = roughness * roughness;
	let invA = 1.0 / a;
	let cos2h = dotNH * dotNH;
	let sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invA ) * pow( sin2h, invA * 0.5 ) / ( 2.0 * PI );
}
fn V_Neubelt( dotNV: f32, dotNL: f32 ) -> f32 { return sat( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) ); }
fn BRDF_Sheen( L: vec3f, V: vec3f, N: vec3f, color: vec3f, roughness: f32 ) -> vec3f {
	let H = normalize( L + V );
	return color * D_Charlie( roughness, sat( dot( N, H ) ) ) * V_Neubelt( sat( dot( N, V ) ), sat( dot( N, L ) ) );
}
// analytical approximation of the split-sum DFG term (Karis)
fn DFGApprox( dotNV: f32, roughness: f32 ) -> vec2f {
	let c0 = vec4f( -1.0, -0.0275, -0.572, 0.022 );
	let c1 = vec4f( 1.0, 0.0425, 1.04, -0.04 );
	let r = roughness * c0 + c1;
	let a004 = min( r.x * r.x, exp2( -9.28 * dotNV ) ) * r.x + r.y;
	return vec2f( -1.04, 1.04 ) * a004 + r.zw;
}
// multi-scattering specular energy compensation (Fdez-Aguera), as three's computeMultiscattering
fn multiscatter( N: vec3f, V: vec3f, specColor: vec3f, specF90: f32, roughness: f32, single: ptr<function, vec3f>, multi: ptr<function, vec3f> ) {
	let fab = DFGApprox( sat( dot( N, V ) ), roughness );
	let Fr = specColor;
	let FssEss = Fr * fab.x + specF90 * fab.y;
	let Ess = fab.x + fab.y;
	let Ems = 1.0 - Ess;
	let Favg = Fr + ( 1.0 - Fr ) * 0.047619;
	let Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	*single += FssEss;
	*multi += Fms * Ems;
}
`}),$t=new ae({name:"lighting",deps:[Le,ut,Vi],code:`
// STUDIO_LIGHTING (a pass define, e.g. the fish portraits of the catch card): the world hooks are
// skipped (no shadows, caustics, cloud / hill shadow, bounce, local lights, underwater tint) and the
// environment is a neutral photo studio: a grey sweep lit from above plus one large softbox whose
// azimuth is frame.debug.x (radians, animatable). The key light is frame.sunDir / frame.sunColor of
// the view's own frame block.
fn studioEnvSpecular( R: vec3f, roughness: f32 ) -> vec3f {
	let sweep = mix( vec3f( 0.035, 0.04, 0.045 ), vec3f( 0.55, 0.57, 0.6 ), smoothstep( -0.35, 0.85, R.y ) );
	let az = atan2( R.x, R.z ) - frame.debug.x;
	let w = 0.35 + roughness * 1.6;
	let box = exp( - az * az / ( w * w ) ) * smoothstep( -0.05, 0.3, R.y ) * smoothstep( 0.98, 0.55, R.y );
	return ( sweep + box * vec3f( 2.4, 2.35, 2.25 ) / ( 1.0 + roughness * 3.0 ) ) * frame.envIntensity;
}
fn studioEnvDiffuse( N: vec3f ) -> vec3f {
	return mix( vec3f( 0.05, 0.055, 0.06 ), vec3f( 0.3, 0.31, 0.33 ), N.y * 0.5 + 0.5 ) * frame.envIntensity;
}

fn shadeSurface( s: Surface, P: vec3f, V: vec3f, pixel: vec2f ) -> vec3f {
	let N = s.normal;
	let rough = clamp( s.roughness, 0.03, 1.0 );
	let diffuseColor = s.albedo * ( 1.0 - s.metalness );
	let specF0 = mix( vec3f( 0.04 ) * s.specularIntensity, s.albedo, s.metalness );
	let specF90 = mix( s.specularIntensity, 1.0, s.metalness );
	var acc: LightAccum;
	acc.directDiffuse = vec3f( 0.0 ); acc.directSpecular = vec3f( 0.0 );
	acc.indirectDiffuse = vec3f( 0.0 ); acc.indirectSpecular = vec3f( 0.0 );

	lightDPdx = dpdx( P );
	lightDPdy = dpdy( P );

	// ---- sun / moon
	let L = frame.sunDir;
	let dotNL = sat( dot( N, L ) );
#if STUDIO_LIGHTING
	let lightColor = frame.sunColor;
#else
	// Faces turned away from the sun with no transmission get nothing from it: the modulation hooks
	// (clouds, hill shadow, caustics) and the shadow filters only run for the rest, and the filters
	// only where the hooks left light (their derivatives are taken ahead: lightDPdx / lightDPdy)
	var lightColor = vec3f( 0.0 );
	if ( dotNL > 0.0 || any( s.translucency > vec3f( 0.0 ) ) ) {
		lightColor = frame.sunColor * hookDirectModulation( P, N );
#if MATERIAL_SUN_MODULATION
		// per-material key-light multiplier (the former TerrainLightingModel: heightfield hill shadow)
		lightColor *= materialSunModulation( P, N );
#endif
		let geomN = N;
		var shadow = 0.0;
		if ( any( lightColor > vec3f( 0.0 ) ) ) {
#if REFRACTION_CLIP
			// the water's refraction source (seen blurred through the water): one hard shadow tap
			shadow = sunShadowHard( hookShadowPosition( P, geomN, pixel ) );
#else
			shadow = sunShadow( hookShadowPosition( P, geomN, pixel ), geomN, pixel );
#endif
		}
		lightColor *= shadow;
	}
#endif
	let irradiance = dotNL * lightColor;
	acc.directDiffuse += irradiance * diffuseColor * INV_PI;
	acc.directSpecular += irradiance * BRDF_GGX( L, V, N, specF0, specF90, rough );
#if SHEEN
	acc.directSpecular += irradiance * BRDF_Sheen( L, V, N, s.sheenColor, max( s.sheenRoughness, 0.07 ) );
#endif
	// thin-surface transmission (foliage): lit from behind as well
	acc.directDiffuse += s.translucency * lightColor;
#if CLEARCOAT
	let ccN = s.clearcoatNormal;
	let ccNL = sat( dot( ccN, L ) );
	let ccSpec = ccNL * lightColor * BRDF_GGX( L, V, ccN, vec3f( 0.04 ), 1.0, clamp( s.clearcoatRoughness, 0.03, 1.0 ) );
#endif

	// ---- local lights (lanterns, windows, boat lights, flashlight)
#if !STUDIO_LIGHTING
	hookLocalLights( s, P, N, V, &acc );
#endif

	// ---- indirect: environment + ground bounce
	// (three's PhysicalLightingModel: env irradiance goes through the multiscatter-compensated
	// diffuse; the ground bounce is plain Lambert)
	let R = reflect( -V, N );
	let Rr = normalize( mix( R, N, rough * rough ) );
#if STUDIO_LIGHTING
	let envIrr = studioEnvDiffuse( N ) * PI * s.envIntensity;
	let radiance = studioEnvSpecular( Rr, rough ) * s.envIntensity;
#else
	let envIrr = hookEnvDiffuse( N ) * PI * s.envIntensity;
	let radiance = hookEnvSpecular( Rr, rough ) * s.envIntensity;
#endif
	var single = vec3f( 0.0 ); var multi = vec3f( 0.0 );
	multiscatter( N, V, specF0, specF90, rough, &single, &multi );
	let totalScatter = single + multi;
	let diffuseMS = diffuseColor * ( 1.0 - max( max( totalScatter.r, totalScatter.g ), totalScatter.b ) );
	acc.indirectSpecular += radiance * single + multi * envIrr * INV_PI;
#if STUDIO_LIGHTING
	acc.indirectDiffuse += diffuseMS * envIrr * INV_PI;
#else
	acc.indirectDiffuse += diffuseMS * envIrr * INV_PI + hookBounce( P, N ) * diffuseColor;
#endif

	// ambient occlusion (specular occlusion after Lagarde)
	let dotNV = sat( dot( N, V ) );
	// With unit material AO, the positive power is >= 1 and saturation
	// returns exactly 1. SSAO is applied later by the screen-space resolve.
	var specAO = 1.0;
	if ( s.ao != 1.0 ) { specAO = sat( pow( dotNV + s.ao, exp2( -16.0 * rough - 1.0 ) ) - 1.0 + s.ao ); }
	acc.indirectDiffuse *= s.ao;
	acc.indirectSpecular *= specAO;
#if STUDIO_LIGHTING
	let amb = vec3f( 1.0 );
#else
	let amb = hookAmbientModulation( P, N );
#endif
	acc.indirectDiffuse *= amb;
	acc.indirectSpecular *= amb;

	var color = acc.directDiffuse + acc.directSpecular + acc.indirectDiffuse + acc.indirectSpecular;
#if SHEEN
	color += s.sheenColor * envIrr * INV_PI * 0.5 * s.ao * amb;
#endif
#if CLEARCOAT
	let ccNV = sat( dot( ccN, V ) );
	let Fcc = F_Schlick( vec3f( 0.04 ), 1.0, ccNV ) * s.clearcoat;
#if STUDIO_LIGHTING
	let ccRad = studioEnvSpecular( reflect( -V, ccN ), clamp( s.clearcoatRoughness, 0.03, 1.0 ) ) * amb * specAO;
#else
	let ccRad = hookEnvSpecular( reflect( -V, ccN ), clamp( s.clearcoatRoughness, 0.03, 1.0 ) ) * amb * specAO;
#endif
	color = color * ( 1.0 - Fcc ) + ( ccSpec * s.clearcoat + ccRad * Fcc );
#endif
	return color + s.emissive;
}
`});function Wi(h,e){var t,s;return e.kind==="depth"&&!h.vertex.trim()&&h.alphaTest<=0&&!h.shadow&&!((t=h.defines)!=null&&t.REFRACTION_CLIP)&&!((s=e.defines)!=null&&s.REFRACTION_CLIP)&&h.topology==="triangle-list"}function jr(h){const e=h.attributes.position,t=e.array,s=h.index;if(!s||e.isInterleavedBufferAttribute||!(t instanceof Float32Array)||e.itemSize!==3)return null;const i=[],r=new Map,a=new Uint32Array(e.count);for(let l=0;l<e.count;l++){const c=l*3,f=t[c],d=t[c+1],u=t[c+2],m=`${f},${d},${u}`;let p=r.get(m);p===void 0&&(p=i.length/3,r.set(m,p),i.push(f,d,u)),a[l]=p}const n=new Float32Array(i),o=i.length/3<=65536?new Uint16Array(s.count):new Uint32Array(s.count);for(let l=0;l<s.count;l++)o[l]=a[s.array[l]];return{position:{array:n,itemSize:3,count:n.length/3,version:0},indices:o}}const Xr={position:"vec3f",normal:"vec3f",uv:"vec2f",color:"vec4f"},Kr={normal:"vec3f( 0.0, 1.0, 0.0 )",uv:"vec2f( 0.0 )",color:"vec4f( 1.0 )"},Zr=/^(u32|i32|vec[234][ui])$/;function Jr(h){return h==="f32"?"0.0":h==="u32"?"0u":h==="i32"?"0i":`${h}()`}function Qr(h,e,t){const s=t.kind,i=new Set(e.map(y=>y.name)),r=h.allDefines();if(r.PASS_MAIN=s==="main"?1:0,r.PASS_DEPTH=s==="depth"?1:0,r.PASS_COLOR=s==="color"?1:0,r.PASS_LATE=t.late?1:0,r.LIT=h.lit?1:0,r.INSTANCED=i.has("instanceMatrix0")?1:0,r.WORLD_INSTANCES=e.worldInstances?1:0,r.INSTANCE_COLOR=i.has("instanceColor")?1:0,Object.assign(r,t.defines||{}),r.CLIP_DISTANCES=r.REFRACTION_CLIP&&g.features.has("clip-distances")?1:0,i.has("position")&&Wi(h,t)&&!r.REFRACTION_CLIP)return{code:`
struct Draw {
	model: mat4x4f,
	prevModel: mat4x4f,
	params: vec4f,
	params2: vec4f,
};
@group( 2 ) @binding( 0 ) var<uniform> draw: Draw;
struct VertexIn {
${e.filter(y=>y.name==="position"||/^instanceMatrix[0-3]$/.test(y.name)).map(y=>`	@location( ${y.location} ) ${y.name}: ${y.wgsl},`).join(`
`)}
};
@vertex fn vs( i: VertexIn ) -> @builtin( position ) vec4f {
#if WORLD_INSTANCES
	let model = mat4x4f( i.instanceMatrix0, i.instanceMatrix1, i.instanceMatrix2, i.instanceMatrix3 );
#elif INSTANCED
	let model = draw.model * mat4x4f( i.instanceMatrix0, i.instanceMatrix1, i.instanceMatrix2, i.instanceMatrix3 );
#else
	let model = draw.model;
#endif
	let wp = ( model * vec4f( i.position, 1.0 ) ).xyz;
	return frame.viewProj * vec4f( wp, 1.0 );
}`,modules:[],defines:r,bindings:{},hasFragment:!1};let a=`struct VertexIn {
`;for(const y of e)a+=`	@location( ${y.location} ) ${y.name}: ${y.wgsl},
`;a+=`	@builtin( instance_index ) instance: u32,
	@builtin( vertex_index ) vertex: u32,
};
`;let n=`struct VertexData {
	position: vec3f,
	normal: vec3f,
	uv: vec2f,
	color: vec4f,
	model: mat4x4f,
	prevModel: mat4x4f,
	instance: u32,
	vertex: u32,
	worldOffset: vec3f,
	prevWorldOffset: vec3f,
	useWorld: bool,
	worldPos: vec3f,
	worldNormal: vec3f,
	prevWorldPos: vec3f,
`;for(const y in h.attributes)n+=`	${y}: ${h.attributes[y]},
`;n+=`};
`;const o=s==="main";let l=0,c=`struct VSOut {
	@builtin( position ) clip: vec4f,
`;c+=`	@location( ${l++} ) worldPos: vec3f,
`,c+=`	@location( ${l++} )${e.flatNormal?" @interpolate( flat )":""} normal: vec3f,
`,c+=`	@location( ${l++} ) uv: vec2f,
`,c+=`	@location( ${l++} ) color: vec4f,
`,o&&(c+=`	@location( ${l++} ) curClip: vec4f,
`,c+=`	@location( ${l++} ) prevClip: vec4f,
`);for(const y in h.varyings){const v=h.varyings[y];c+=`	@location( ${l++} )${Zr.test(v)?" @interpolate( flat )":""} ${y}: ${v},
`}if(c+=`};
`,r.CLIP_DISTANCES){const y=[...c.matchAll(/\s(\w+): [^,]+,\n/g)].map(v=>v[1]);c+=c.replace("struct VSOut {","struct VSOutClip {").replace(/};\n$/,`	@builtin( clip_distances ) clipDistances: array<f32, 1>,
};
`),c+=`fn vsClip( o: VSOut, d: f32 ) -> VSOutClip {
	var c: VSOutClip;
${y.map(v=>`	c.${v} = o.${v};
`).join("")}	c.clipDistances[ 0 ] = d;
	return c;
}
`}let f="";for(const y in Xr)if(i.has(y)){const v=e.find(w=>w.name===y);y==="color"&&v.wgsl==="vec3f"?f+=`	v.color = vec4f( i.color, 1.0 );
`:f+=`	v.${y} = i.${y};
`}else y!=="position"&&(f+=`	v.${y} = ${Kr[y]};
`);for(const y in h.attributes)f+=i.has(y)?`	v.${y} = i.${y};
`:`	v.${y} = ${Jr(h.attributes[y])};
`;const d=`
struct Draw {
	model: mat4x4f,
	prevModel: mat4x4f,
	params: vec4f,  // x: object id, y: user, z: user, w: user
	params2: vec4f,
};
@group( 2 ) @binding( 0 ) var<uniform> draw: Draw;

${a}
${n}
${c}

struct FragInput {
	vs: VSOut,
	P: vec3f,
	N: vec3f,
	V: vec3f,
	uv: vec2f,
	color: vec4f,
	front: bool,
	pixel: vec2f,
};

struct FragResult {
	color: vec4f,
	velocity: vec4f,
	mask: vec4f,
};

fn cofactor3( m: mat4x4f ) -> mat3x3f {
	let a = m[ 0 ].xyz; let b = m[ 1 ].xyz; let c = m[ 2 ].xyz;
	return mat3x3f( cross( b, c ), cross( c, a ), cross( a, b ) );
}

// Material code writes \`v.\`, \`o.\`, \`s.\`, \`r.\` fields. Those are pointer parameters;
// accessing a member straight through a pointer ("pointer composite access") is a newer
// WGSL feature some browsers' Tint rejects ("invalid member accessor expression"), so
// each hook works on a local copy and writes it back.
fn materialVertex( vp: ptr<function, VertexData>, op: ptr<function, VSOut> ) {
	var v = *vp;
	var o = *op;
${h.vertex}
	*vp = v;
	*op = o;
}

fn materialSurface( in: FragInput, sp: ptr<function, Surface> ) {
	var s = *sp;
${h.surface}
	*sp = s;
}

fn materialOutput( in: FragInput, s: Surface, rp: ptr<function, FragResult> ) {
	var r = *rp;
${h.output}
	*rp = r;
}

#if CLIP_DISTANCES
@vertex fn vs( i: VertexIn ) -> VSOutClip {
#else
@vertex fn vs( i: VertexIn ) -> VSOut {
#endif
	var v: VertexData;
${f}#if !HAS_POSITION
	v.position = vec3f( 0.0 );
#endif
	v.instance = i.instance;
	v.vertex = i.vertex;
#if INSTANCED
	let im = mat4x4f( i.instanceMatrix0, i.instanceMatrix1, i.instanceMatrix2, i.instanceMatrix3 );
#if WORLD_INSTANCES
	v.model = im;
#else
	v.model = draw.model * im;
#endif
	v.prevModel = draw.prevModel * im;
#else
	v.model = draw.model;
	v.prevModel = draw.prevModel;
#endif
#if INSTANCE_COLOR
	v.color = vec4f( v.color.rgb * i.instanceColor, v.color.a );
#endif
	v.worldOffset = vec3f( 0.0 );
	v.prevWorldOffset = vec3f( 1e30 );
	v.useWorld = false;
	v.prevWorldPos = vec3f( 1e30 );
	var o: VSOut;
	materialVertex( &v, &o );
	var wp: vec3f;
	var wn: vec3f;
	var pwp: vec3f;
	if ( v.useWorld ) {
		wp = v.worldPos;
		wn = v.worldNormal;
		pwp = select( v.prevWorldPos, wp, v.prevWorldPos.x > 1e29 );
	} else {
		let lp = vec4f( v.position, 1.0 );
		wp = ( v.model * lp ).xyz + v.worldOffset;
		wn = cofactor3( v.model ) * v.normal;
		pwp = ( v.prevModel * lp ).xyz + select( v.prevWorldOffset, v.worldOffset, v.prevWorldOffset.x > 1e29 );
	}
	o.worldPos = wp;
	o.normal = wn;
	o.uv = v.uv;
	o.color = v.color;
	o.clip = frame.viewProj * vec4f( wp, 1.0 );
#if PASS_MAIN
	o.curClip = frame.viewProjNoJitter * vec4f( wp, 1.0 );
	o.prevClip = frame.prevViewProjNoJitter * vec4f( pwp, 1.0 );
#endif
#if CLIP_DISTANCES
	return vsClip( o, frame.seaLevel + REFRACTION_CLIP_MARGIN - wp.y );
#else
	return o;
#endif
}

#if PASS_MAIN && !PASS_LATE && LIT && !IS_WATER && !ALPHA_TEST && !STUDIO_LIGHTING
// Deep under the water, seen from above it: the water drawn over this pixel shows the refraction
// pass (ocean/RefractionPass.js) at its refracted end point, never this pixel's own colour. The end
// point is predicted as the water shader traces it (flat surface, the seabed at P's depth, a margin
// for the wave slopes); where it would leave the screen the water takes the refraction pass' edge.
const SUBMERGED_DEPTH: f32 = 2.5; // m below sea level: below the deepest wave troughs
fn submergedHidden( P: vec3f ) -> bool {
	let sea = frame.seaLevel;
	if ( P.y > sea - SUBMERGED_DEPTH || frame.cameraPos.y < sea + 1.0 ) { return false; }
	let V = normalize( P - frame.cameraPos );
	let pos = frame.cameraPos + V * ( ( frame.cameraPos.y - sea ) / max( - V.y, 1e-4 ) );
	let Tr = refract( V, vec3f( 0.0, 1.0, 0.0 ), 1.0 / 1.333 );
	let Tv = normalize( vec3f( Tr.x, min( Tr.y, -0.08 ), Tr.z ) );
	let L = ( sea - P.y ) / max( - Tv.y, 0.04 );
	let c = frame.viewProj * vec4f( pos + Tv * min( L, 80.0 ), 1.0 );
	let uv = c.xy / max( c.w, 1e-4 ) * vec2f( 0.5, -0.5 ) + 0.5;
	return all( uv > vec2f( 0.1 ) ) && all( uv < vec2f( 0.9 ) ) && c.w > 0.0;
}
#endif

fn fragInput( vs: VSOut, front: bool ) -> FragInput {
	var in: FragInput;
	in.vs = vs;
	in.P = vs.worldPos;
	var N = normalize( vs.normal );
#if DOUBLE_SIDED
	N = select( -N, N, front );
#endif
#if BACK_SIDE
	N = -N;
#endif
	in.N = N;
	in.V = normalize( frame.cameraPos - vs.worldPos );
	in.uv = vs.uv;
	in.color = vs.color;
	in.front = front;
	in.pixel = vs.clip.xy;
	return in;
}

fn surfaceOf( in: FragInput ) -> Surface {
	var s = defaultSurface( in.N );
	s.albedo = mat.color * in.color.rgb;
	s.alpha = mat.opacity * in.color.a;
	s.roughness = mat.roughness;
	s.metalness = mat.metalness;
	s.emissive = mat.emissive;
	materialSurface( in, &s );
	return s;
}

#if PASS_DEPTH
#if NEEDS_DEPTH_FRAGMENT
@fragment fn fs( vs: VSOut, @builtin( front_facing ) front: bool ) {
	let in = fragInput( vs, front );
#if HAS_SHADOW_HOOK
	if ( ! materialShadow( in ) ) { discard; }
#else
	let s = surfaceOf( in );
	if ( s.alpha < mat.alphaTest ) { discard; }
#endif
}
#endif
#else

#if PASS_MAIN
struct FragOut {
	@location( 0 ) color: vec4f,
	@location( 1 ) velocity: vec4f,
	@location( 2 ) mask: vec4f,
};
#else
struct FragOut {
	@location( 0 ) color: vec4f,
};
#endif

@fragment fn fs( vs: VSOut, @builtin( front_facing ) front: bool ) -> FragOut {
	let in = fragInput( vs, front );
#if REFRACTION_CLIP
#if !CLIP_DISTANCES
	// the water's refraction source only holds what is under the water (pass.defines)
	if ( in.P.y > frame.seaLevel + REFRACTION_CLIP_MARGIN ) { discard; }
#endif
#endif
#if PASS_MAIN && !PASS_LATE && LIT && !IS_WATER && !ALPHA_TEST && !STUDIO_LIGHTING
	// hidden under the water (see submergedHidden): an ambient colour, keeping depth and motion
	if ( submergedHidden( in.P ) ) {
		var so: FragOut;
		so.color = vec4f( mat.color * in.color.rgb * hookEnvDiffuse( in.N ) * hookAmbientModulation( in.P, in.N ), 1.0 );
		let cur0 = vs.curClip.xy / vs.curClip.w;
		let prev0 = vs.prevClip.xy / vs.prevClip.w;
		so.velocity = vec4f( ( cur0 - prev0 ) * vec2f( 0.5, -0.5 ), 0.0, 1.0 );
		so.mask = vec4f( 0.0 );
		return so;
	}
#endif
	var s = surfaceOf( in );
#if ALPHA_TEST
	if ( s.alpha < mat.alphaTest ) { discard; }
#endif
	s.normal = normalize( s.normal );
	s.clearcoatNormal = normalize( s.clearcoatNormal );
	var r: FragResult;
#if LIT
	r.color = vec4f( shadeSurface( s, in.P, in.V, in.pixel ), s.alpha );
#else
	r.color = vec4f( s.albedo + s.emissive, s.alpha );
#endif
#if PASS_MAIN
	let cur = vs.curClip.xy / vs.curClip.w;
	let prev = vs.prevClip.xy / vs.prevClip.w;
	r.velocity = vec4f( ( cur - prev ) * vec2f( 0.5, -0.5 ), 0.0, 1.0 );
#else
	r.velocity = vec4f( 0.0 );
#endif
	r.mask = vec4f( 0.0 );
	materialOutput( in, s, &r );
	var out: FragOut;
	out.color = r.color;
#if PASS_MAIN
#if PASS_LATE
	// premultiplied: opaque outputs overwrite, blended ones weight their motion by coverage
#if VELOCITY_OPAQUE
	// the fragment owns the motion of its pixel even when its colour is blended (AirMotes specks)
	let a = VELOCITY_WEIGHT;
#else
	let a = select( 1.0, r.color.a, TRANSPARENT_F ) * VELOCITY_WEIGHT;
#endif
	out.velocity = vec4f( r.velocity.xy * a, 0.0, a );
#else
	out.velocity = r.velocity;
#endif
	out.mask = r.mask;
#endif
	return out;
}
#endif
`,u=h.shadow?`fn materialShadow( in: FragInput ) -> bool {
${h.shadow}
}
`:"";r.HAS_SHADOW_HOOK=h.shadow?1:0,r.NEEDS_DEPTH_FRAGMENT=s==="depth"&&(h.alphaTest>0||h.shadow)?1:0,r.HAS_POSITION=i.has("position")?1:0;const m=d.replace("fn fragInput(",u+"fn fragInput(").replace(/\bTRANSPARENT_F\b/g,h.transparent?"true":"false").replace(/\bVELOCITY_WEIGHT\b/g,Vs(h.velocityWeight)).replace(/\bREFRACTION_CLIP_MARGIN\b/g,Vs((t.defines&&t.defines.REFRACTION_CLIP_MARGIN)??0));let p=[Le,ut,...h.modules];return(s!=="depth"||It(h.modules).includes($t))&&(p=[Le,ut,...$r(),$t,...h.modules]),h.lightingHooks===!1&&!It(h.modules).includes($t)&&(p=[Le,ut,Vi,...h.modules]),{code:m,modules:p,defines:r,bindings:{mat:{uniform:h.uniformBlock},...h.bindings},hasFragment:s!=="depth"||r.NEEDS_DEPTH_FRAGMENT===1}}function Vs(h){const e=String(h);return e.includes(".")||e.includes("e")?e:e+".0"}function en(h){const e=h.attributes,t=h.index;if(!t||t.count%12||Object.keys(e).some(l=>!["position","normal","uv","color"].includes(l))||!e.position||!e.normal||!e.uv||!e.color)return null;const s=Object.entries(e),i={},r=Object.fromEntries(s.map(([l])=>[l,[]]));for(const[l,c]of s){if(c.isInterleavedBufferAttribute||!(c.array instanceof Float32Array))return null;i[l]=new Uint32Array(c.array.buffer,c.array.byteOffset,c.array.length)}if(e.position.itemSize!==3||e.normal.itemSize!==3||e.uv.itemSize!==2||![3,4].includes(e.color.itemSize))return null;const a=[],n=l=>s.filter(([c])=>c!=="normal").map(([c,f])=>Array.from(i[c].subarray(l*f.itemSize,(l+1)*f.itemSize)).join(",")).join("|");for(let l=0;l<t.count;l+=12){const c=[],f=[],d=new Map,u=new Set;for(let y=0;y<4;y++){const v=Array.from(t.array.subarray(l+y*3,l+y*3+3));if(v.some(k=>k<0||k>=e.position.count))return null;const w=v[0]*3;for(const k of v)for(let z=0;z<3;z++)if(i.normal[k*3+z]!==i.normal[w+z])return null;const M=v.map(k=>{const z=n(k);let _=d.get(z);return _===void 0&&(_=c.length,c.push(k),d.set(z,_)),_});if(new Set(M).size!==3)return null;u.add([...M].sort((k,z)=>k-z).join(",")),f.push({source:v,corners:M})}if(c.length!==4||u.size!==4)return null;const m=[],p=(y,v)=>{if(y===4)return!0;for(const w of f[y].corners)if(!(v&1<<w)&&(m[y]=w,p(y+1,v|1<<w)))return!0;return!1};if(!p(0,0))return null;const x=r.position.length/3;for(let y=0;y<4;y++){const v=m.indexOf(y);for(const[w,M]of s){const k=w==="normal"?f[v].source[0]:c[y];for(let z=0;z<M.itemSize;z++)r[w].push(M.array[k*M.itemSize+z])}}for(let y=0;y<4;y++){const v=f[y].corners,w=v.indexOf(m[y]);for(let M=0;M<3;M++)a.push(x+v[(w+M)%3])}}const o=Object.fromEntries(s.map(([l,c])=>[l,{array:Float32Array.from(r[l]),itemSize:c.itemSize,count:r[l].length/c.itemSize,version:0}]));return{attributes:o,indices:o.position.count<=65536?Uint16Array.from(a):Uint32Array.from(a)}}let Ws=0;const tn={color:["vec3f",null],opacity:["f32",1],emissive:["vec3f",null],roughness:["f32",1],metalness:["f32",0],alphaTest:["f32",0]};class Gi{constructor(e={}){this.id=Ws++,this.isMaterial=!0,this.name=e.name||"material"+this.id,this.version=0,this.modules=e.modules||[],this.varyings=e.varyings||{},this.attributes=e.attributes||{},this.vertex=e.vertex||"",this.surface=e.surface||"",this.output=e.output||"",this.shadow=e.shadow||"",this.defines={...e.defines||{}},this.lit=e.lit!==!1,this.side=e.side||"front",this.transparent=!!e.transparent,this.blending=e.blending||(this.transparent?"normal":"none"),this.depthWrite=e.depthWrite??!this.transparent,this.depthTest=e.depthTest??!0,this.depthCompare=e.depthCompare||null,this.depthBias=e.depthBias||0,this.depthBiasSlopeScale=e.depthBiasSlopeScale||0,this.colorWrite=e.colorWrite??!0,this.topology=e.topology||"triangle-list",this.visible=e.visible??!0,this.vertexColors=!!e.vertexColors,this.velocityWeight=e.velocityWeight??1,this.underwaterLighting=e.underwaterLighting||"full",this.appliesHillShadow=!!e.appliesHillShadow,this.localLightsCheap=!!e.localLightsCheap,this.receiveShadows=e.receiveShadows??!0,this.userData=e.userData||{};const t={...tn};for(const i in e.uniforms||{})t[i]=e.uniforms[i];this.uniformBlock=new Te("MaterialParams",t,{label:this.name}),this.uniforms=this.uniformBlock.fields;const s=this.uniforms;s.color.value=wt(e.color,new be(1,1,1)),s.emissive.value=wt(e.emissive,new be(0,0,0)),e.roughness!==void 0&&(s.roughness.value=e.roughness),e.metalness!==void 0&&(s.metalness.value=e.metalness),e.opacity!==void 0&&(s.opacity.value=e.opacity),e.alphaTest!==void 0&&(s.alphaTest.value=e.alphaTest),this.bindings={};for(const i in e.textures||{}){const r=e.textures[i];this.bindings[i]=r&&r.isTexture?{texture:r}:typeof r=="function"?{texture:r}:r}for(const i in e.storage||{}){const r=e.storage[i];this.bindings[i]=r&&r.isStorageBuffer?{storage:r,access:"read"}:r}Object.assign(this.bindings,e.bindings||{}),this._listeners=[]}get color(){return this.uniforms.color.value}set color(e){this.uniforms.color.value=wt(e,this.uniforms.color.value)}get emissive(){return this.uniforms.emissive.value}set emissive(e){this.uniforms.emissive.value=wt(e,this.uniforms.emissive.value)}get roughness(){return this.uniforms.roughness.value}set roughness(e){this.uniforms.roughness.value=e}get metalness(){return this.uniforms.metalness.value}set metalness(e){this.uniforms.metalness.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms.opacity.value=e}get alphaTest(){return this.uniforms.alphaTest.value}set alphaTest(e){e>0!=this.uniforms.alphaTest.value>0&&(this.needsUpdate=!0),this.uniforms.alphaTest.value=e}set(e,t){this.uniformBlock.set(e,t)}set needsUpdate(e){e&&this.version++}setDefine(e,t){this.defines[e]!==t&&(this.defines[e]=t,this.version++)}pipelineKey(){const e=typeof this.blending=="string"?this.blending:JSON.stringify(this.blending),t=this.alphaTest>0,s=this._pipelineState;if(s&&s.id===this.id&&s.version===this.version&&s.side===this.side&&s.transparent===this.transparent&&s.blend===e&&s.depthWrite===this.depthWrite&&s.depthTest===this.depthTest&&s.depthCompare===this.depthCompare&&s.colorWrite===this.colorWrite&&s.topology===this.topology&&s.alpha===t&&s.underwaterLighting===this.underwaterLighting&&s.appliesHillShadow===this.appliesHillShadow&&s.localLightsCheap===this.localLightsCheap&&s.receiveShadows===this.receiveShadows&&s.depthBias===this.depthBias&&s.depthBiasSlopeScale===this.depthBiasSlopeScale&&s.vertexColors===this.vertexColors)return s.key;const i=`${this.id}.${this.version}.${this.side}.${this.transparent}.${e}.${this.depthWrite}.${this.depthTest}.${this.depthCompare}.${this.colorWrite}.${this.topology}.${t}.${this.underwaterLighting}.${this.appliesHillShadow}.${this.localLightsCheap}.${this.receiveShadows}.${this.depthBias}.${this.depthBiasSlopeScale}.${this.vertexColors}`;return this._pipelineState={key:i,id:this.id,version:this.version,side:this.side,transparent:this.transparent,blend:e,depthWrite:this.depthWrite,depthTest:this.depthTest,depthCompare:this.depthCompare,colorWrite:this.colorWrite,topology:this.topology,alpha:t,underwaterLighting:this.underwaterLighting,appliesHillShadow:this.appliesHillShadow,localLightsCheap:this.localLightsCheap,receiveShadows:this.receiveShadows,depthBias:this.depthBias,depthBiasSlopeScale:this.depthBiasSlopeScale,vertexColors:this.vertexColors},i}allDefines(){return{...this.defines,UNDERWATER_LIGHTING:{none:0,lite:1,full:2}[this.underwaterLighting]??2,HILL_SHADOW_SELF:this.appliesHillShadow?1:0,LOCAL_LIGHTS_CHEAP:this.localLightsCheap?1:0,ALPHA_TEST:this.alphaTest>0?1:0,DOUBLE_SIDED:this.side==="double"?1:0,BACK_SIDE:this.side==="back"?1:0,TRANSPARENT:this.transparent?1:0,RECEIVE_SHADOWS:this.receiveShadows?1:0}}addEventListener(e,t){e==="dispose"&&this._listeners.push(t)}dispose(){for(const e of this._listeners)e({target:this})}clone(){const e=Object.create(Object.getPrototypeOf(this));return Object.assign(e,this),e.id=Ws++,e.version=0,e.defines={...this.defines},e.bindings={...this.bindings},e.uniformBlock=new Te("MaterialParams"+e.id,Object.fromEntries(this.uniformBlock.order.map(t=>[t,[this.uniformBlock.layout[t].typeStr,qi(this.uniforms[t].value)]])),{label:e.name}),e.uniforms=e.uniformBlock.fields,e._listeners=[],e}}function qi(h){return h&&typeof h=="object"&&h.clone?h.clone():Array.isArray(h)?h.map(qi):h}function wt(h,e){return h==null?e:h.isColor?e.copy?e.copy(h):h.clone():typeof h=="number"||typeof h=="string"?e.set(h):Array.isArray(h)?e.setRGB(h[0],h[1],h[2]):h.isVector3?e.setRGB(h.x,h.y,h.z):e}function Tt(h){if(!h||h==="none")return;if(typeof h=="object")return h;const e=(t,s,i="add")=>({srcFactor:t,dstFactor:s,operation:i});switch(h){case"normal":return{color:e("src-alpha","one-minus-src-alpha"),alpha:e("one","one-minus-src-alpha")};case"premultiplied":return{color:e("one","one-minus-src-alpha"),alpha:e("one","one-minus-src-alpha")};case"additive":return{color:e("src-alpha","one"),alpha:e("zero","one")};case"add":return{color:e("one","one"),alpha:e("one","one")};case"multiply":return{color:e("dst","zero"),alpha:e("zero","one")};case"min":return{color:e("one","one","min"),alpha:e("one","one","min")};case"max":return{color:e("one","one","max"),alpha:e("one","one","max")}}throw new Error("unknown blending "+h)}const $i={view:"mat4x4f",proj:"mat4x4f",viewProj:"mat4x4f",invView:"mat4x4f",invProj:"mat4x4f",invViewProj:"mat4x4f",viewProjNoJitter:"mat4x4f",prevViewProjNoJitter:"mat4x4f",cameraPos:["vec3f",new T],near:["f32",.1],prevCameraPos:["vec3f",new T],far:["f32",6e4],resolution:["vec2f",new q(1,1)],invResolution:["vec2f",new q(1,1)],outputResolution:["vec2f",new q(1,1)],jitter:["vec2f",new q],prevJitter:["vec2f",new q],frameIndex:["u32",0],time:["f32",0],dt:["f32",1/60],seaLevel:["f32",0],sunDir:["vec3f",new T(.3,.6,-.7).normalize()],night:["f32",0],sunColor:["vec3f",new be(1,1,1)],exposure:["f32",1],skyIrradiance:["vec3f",new be(.3,.4,.6)],cameraUnderwater:["f32",0],horizonColor:["vec3f",new be(.6,.7,.8)],cameraWaterHeight:["f32",0],waterAbsorption:["vec3f",new T(.42,.075,.035)],windSpeed:["f32",7],waterScattering:["vec3f",new T(.012,.018,.024)],envIntensity:["f32",1],windDir:["vec2f",new q(.35,.94).normalize()],reversedDepth:["f32",1],pad0:["f32",0],debug:["vec4f",new X]},sn=["view","proj","viewProj","invView","invProj","invViewProj","viewProjNoJitter","prevViewProjNoJitter","cameraPos","near","prevCameraPos","far","resolution","invResolution","jitter","prevJitter","reversedDepth"],_e=new Te("Frame",$i,{label:"frame"});Tr(_e);function Hi(h){const e=new Te("Frame",$i,{label:h});return e.onBeforePack=()=>{for(const t of _e.order)sn.includes(t)||(e.fields[t].value=_e.fields[t].value)},e}const Y=_e.fields;Y.time,Y.dt,Y.seaLevel,Y.sunDir,Y.sunColor,Y.skyIrradiance,Y.horizonColor,Y.waterAbsorption,Y.waterScattering,Y.cameraUnderwater,Y.cameraWaterHeight,Y.exposure,Y.windDir,Y.windSpeed,Y.night,Y.envIntensity;const Gs=new E;function ts(h,e,t,{jitterX:s=0,jitterY:i=0,prevViewProj:r=null,prevCameraPos:a=null,block:n=_e}={}){const o=n.fields;h.updateMatrixWorld(),h.matrixWorldInverse&&h.matrixWorldInverse.copy(h.matrixWorld).invert();const l=h.matrixWorldInverse,c=h.projectionMatrix;o.view.value=l.clone(),o.proj.value=c.clone();const f=new E().multiplyMatrices(c,l);o.viewProjNoJitter.value=f.clone();const d=2*s/e,u=2*i/t;Gs.makeTranslation(d,u,0);const m=new E().multiplyMatrices(Gs,f);o.viewProj.value=m,o.invView.value=h.matrixWorld.clone(),o.invProj.value=c.clone().invert(),o.invViewProj.value=m.clone().invert(),o.prevViewProjNoJitter.value=r?r.clone():f.clone(),o.cameraPos.value=new T().setFromMatrixPosition(h.matrixWorld),o.prevCameraPos.value=a?a.clone():o.cameraPos.value.clone(),o.near.value=h.near,o.far.value=h.far,o.resolution.value=new q(e,t),o.invResolution.value=new q(1/e,1/t),o.prevJitter.value=o.jitter.value?o.jitter.value.clone():new q,o.jitter.value=new q(d,u),o.reversedDepth.value=h.reversedDepth===!1?0:1}const qs=new Ft,$s=new E,Hs=new E,rn=new E,Be=new ze,nn=new T,Ys=new T;let js=0;const an=[],tt=new Je(128,3*1024*1024),Xs=new WeakMap;let on=1;function Ee(h){if(!h)return 0;let e=Xs.get(h);return e||Xs.set(h,e=on++),e}const Ht=new WeakMap;let ln=0;const bt=h=>(Ht.has(h)||Ht.set(h,++ln),Ht.get(h)),he=256,Ks=40;class hn{constructor(){this.pipelines=new Map,this.geometries=new Map,this.layouts=new WeakMap,this.capacity=8192,this.drawBuffer=null,this.drawData=null,this.drawCount=0,this.frame=-1,this.stats={draws:0,triangles:0,pipelines:0},this.drawLayout=null,this.drawBindGroup=null,this.syncPipelines=!0}_ensureDrawBuffer(){this.drawBuffer&&this.drawData.byteLength>=this.capacity*he||(this.drawBuffer&&this.drawBuffer.destroy(),this.drawBuffer=g.device.createBuffer({label:"draws",size:this.capacity*he,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.drawData=new Float32Array(this.capacity*he/4),this.drawLayout=Ei([{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform",hasDynamicOffset:!0,minBindingSize:Ks*4}}],"draw"),this.drawBindGroup=g.device.createBindGroup({label:"draws",layout:this.drawLayout,entries:[{binding:0,resource:{buffer:this.drawBuffer,size:Ks*4}}]}))}_beginFrame(){if(this.frame!==g.frame){if(this.frame=g.frame,this._ensureDrawBuffer(),this.bundles&&this._slotRecs&&g.frame%120===0)for(let e=0;e<this._slotRecs.length;e++){const t=this._slotRecs[e];t&&g.frame-t.frame>240&&(t.slot=-1,this._slotRecs[e]=null,this._freeSlots.push(e))}this._bundles&&g.frame%120===0&&this._sweepBundles(240),Math.max(this.drawCount,this._slotTop??0)>this.capacity*.75&&(this.capacity*=2,this._ensureDrawBuffer()),this.drawCount=0,this._dirtyDrawStart=1/0,this._dirtyDrawEnd=0,g.onSubmit(()=>{if(this.dirtyDrawUploads&&this.bundles){if(this._dirtyDrawEnd>this._dirtyDrawStart){const e=this._dirtyDrawStart*he;g.queue.writeBuffer(this.drawBuffer,e,this.drawData.buffer,e,(this._dirtyDrawEnd-this._dirtyDrawStart)*he)}}else this.drawCount&&g.queue.writeBuffer(this.drawBuffer,0,this.drawData.buffer,0,this.drawCount*he)}),this.stats.draws=0,this.stats.triangles=0,this.stats.bundleBuilds=this.stats.bundleEncodedDraws=0}}_slot(e){let t=e.__draw;if(t||(t=e.__draw={frame:-1,slot:-1,cur:new Float32Array(16),prev:new Float32Array(16),has:!1}),t.frame===g.frame)return t.slot;if(this.bundles){if(t.slot<0||t.owner!==this){if(this._freeSlots??(this._freeSlots=[]),this._slotRecs??(this._slotRecs=[]),this._slotTop??(this._slotTop=0),t.slot=this._freeSlots.length?this._freeSlots.pop():this._slotTop++,t.slot>=this.capacity)throw new Error("MeshRenderer: draw buffer full");t.owner=this,this._slotRecs[t.slot]=t}this.drawCount=Math.max(this.drawCount,t.slot+1)}else{if(this.drawCount>=this.capacity)throw new Error("MeshRenderer: draw buffer full");t.slot=this.drawCount++}t.frame=g.frame;const s=e.worldTransformVersion,i=e.drawParams;if(this.dirtyDrawUploads&&this.bundles&&s!==void 0&&t.data===this.drawData&&t.dataSlot===t.slot&&t.version===s&&t.prevVersion===s&&!e.resetVelocity&&t.staticVelocity===!!e.staticVelocity&&t.id===(e.id??0)&&t.paramHas===!!i&&t.tailHas===!!(i&&i.length>3)&&t.p0===(i?i[0]:0)&&t.p1===(i?i[1]:0)&&t.p2===(i?i[2]:0)&&t.p3===((i==null?void 0:i[3])??0)&&t.p4===((i==null?void 0:i[4])??0)&&t.p5===((i==null?void 0:i[5])??0)&&t.p6===((i==null?void 0:i[6])??0))return t.slot;t.prevVersion=t.has&&!e.resetVelocity?t.version:s,t.version=s;const r=e.matrixWorld.elements;t.has&&!e.resetVelocity?t.prev.set(t.cur):t.prev.set(r),t.cur.set(r),t.has=!0,e.resetVelocity=!1;const a=t.slot*he/4,n=this.drawData;if(n.set(t.cur,a),n.set(e.staticVelocity?t.cur:t.prev,a+16),n[a+32]=e.id??0,n[a+33]=i?i[0]:0,n[a+34]=i?i[1]:0,n[a+35]=i?i[2]:0,i&&i.length>3)for(let o=0;o<4;o++)n[a+36+o]=i[3+o]??0;return t.data=n,t.dataSlot=t.slot,t.staticVelocity=!!e.staticVelocity,t.id=e.id??0,t.paramHas=!!i,t.tailHas=!!(i&&i.length>3),t.p0=i?i[0]:0,t.p1=i?i[1]:0,t.p2=i?i[2]:0,t.p3=(i==null?void 0:i[3])??0,t.p4=(i==null?void 0:i[4])??0,t.p5=(i==null?void 0:i[5])??0,t.p6=(i==null?void 0:i[6])??0,this._dirtyDrawStart=Math.min(this._dirtyDrawStart,t.slot),this._dirtyDrawEnd=Math.max(this._dirtyDrawEnd,t.slot+1),t.slot}_geometryGPU(e){var s;let t=this.geometries.get(e);return t||(t={buffers:new Map,index:null,indexVersion:-1},this.geometries.set(e,t),t.onDispose=()=>{this.deferGeometryDisposal?t.disposeRequested=!0:this.releaseGeometry(e)},(s=e.addEventListener)==null||s.call(e,"dispose",t.onDispose)),t}retainGeometry(e){var s,i,r;const t=new Map;for(const a of e){let n=t.get(a.geometry);n||(n=new Set(Object.values(a.geometry.attributes).map(o=>o.isInterleavedBufferAttribute?o.data:o)),t.set(a.geometry,n)),a.isInstancedMesh&&(n.add(a.instanceMatrix),a.instanceColor&&n.add(a.instanceColor))}for(const[a,n]of this.geometries){const o=t.get(a);if(!o){this.releaseGeometry(a);continue}for(const[l,c]of n.buffers)!o.has(l)&&l!==((s=n.compactDepth)==null?void 0:s.position)&&!((r=(i=n.flatLeaf)==null?void 0:i.attributeSet)!=null&&r.has(l))&&(c.buffer.destroy(),n.buffers.delete(l),n.bufferEpoch=(n.bufferEpoch??0)+1)}}releaseGeometry(e){var s,i,r,a,n,o;const t=this.geometries.get(e);if(t){(s=e.removeEventListener)==null||s.call(e,"dispose",t.onDispose);for(const l of t.buffers.values())l.buffer.destroy();(i=t.index)==null||i.buffer.destroy(),(a=(r=t.compactDepth)==null?void 0:r.indexBuffer)==null||a.destroy(),(o=(n=t.flatLeaf)==null?void 0:n.indexBuffer)==null||o.destroy(),this.geometries.delete(e);for(const l of this._drawRows??[])l.geo===e&&(l.it=l.o=l.geo=l.pipeline=l.group=l.vbs=l.index=null);for(const l of this._collectPools??[])for(const c of l.items)c.geometry===e&&(c.object=c.geometry=c.material=null)}}dispose(){var e,t;this.disposed=!0,this._drawRows=[],this._collectPools=[],this._objectBundles=[],this._objectDrawState=null,(e=this._bundles)==null||e.clear();for(const s of this.geometries.keys())this.releaseGeometry(s);(t=this.drawBuffer)==null||t.destroy(),this.drawBuffer=null,this.drawData=null,this.layouts=new WeakMap,this.pipelines.clear()}_attributeBuffer(e,t){var o;const s=this._geometryGPU(e),i=t.isInterleavedBufferAttribute?t.data:t;if(i.gpuBuffer)return i.gpuBuffer.getGPU?i.gpuBuffer.getGPU():i.gpuBuffer;let r=s.buffers.get(i);const a=i.version??0;if(r&&r.version===a&&r.array===i.array)return r.buffer;const n=cn(t);if((!r||r.size<n.byteLength)&&(r&&r.buffer.destroy(),r={buffer:g.device.createBuffer({label:t.name||"attribute",size:Math.max(16,He(n.byteLength)),usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST}),size:n.byteLength,version:-1},s.buffers.set(i,r)),r.version!==a||r.array!==i.array){const l=i.updateRanges&&i.updateRanges.length&&r.version>=0&&r.array===i.array?i.updateRanges:null;if(l&&n===i.array){const c=i.array.BYTES_PER_ELEMENT;for(const f of l)g.queue.writeBuffer(r.buffer,f.start*c,i.array.buffer,i.array.byteOffset+f.start*c,He(f.count*c));i.clearUpdateRanges?i.clearUpdateRanges():i.updateRanges.length=0}else _t(r.buffer,n),(o=i.clearUpdateRanges)==null||o.call(i);r.version=a}return r.array=i.array,r.buffer}_indexBuffer(e){var r;const t=e.index;if(!t)return null;const s=this._geometryGPU(e);if(s.indexRef&&s.indexSrc===t.array&&s.indexVersion===(t.version??0))return s.indexRef;const i=t.array instanceof Uint16Array||t.array instanceof Uint32Array?t.array:new Uint32Array(t.array);if((!s.index||s.index.size<i.byteLength)&&(s.index&&s.index.buffer.destroy(),s.index={buffer:g.device.createBuffer({label:"index",size:Math.max(16,He(i.byteLength)),usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),size:i.byteLength},s.indexVersion=-1),s.indexVersion!==(t.version??0)||s.indexSrc!==t.array){const a=s.indexVersion>=0&&s.indexSrc===t.array&&i instanceof Uint32Array?t.updateRanges:null;if(a!=null&&a.length)for(const n of a)g.queue.writeBuffer(s.index.buffer,n.start*4,i.buffer,i.byteOffset+n.start*4,n.count*4);else _t(s.index.buffer,i);(r=t.clearUpdateRanges)==null||r.call(t),s.indexVersion=t.version??0}return s.indexSrc=t.array,s.indexRef={buffer:s.index.buffer,format:i instanceof Uint16Array?"uint16":"uint32"},s.indexRef}_cachedLayout(e,t,s){let i=this.layouts.get(e);i||this.layouts.set(e,i=new Map);const r=e.isInstancedMesh?e.instanceColor?2:1:0,a=r?s.id+":"+r:s.id;let n=i.get(a);if(n&&n.worldInstances===!!e.worldInstances&&n.geometry===t&&n.version===s.version&&n.attrsVersion===t.attributesVersion&&(!r||n.instanceMatrix===e.instanceMatrix&&n.instanceColor===e.instanceColor)){const c=n.refs,f=n.names,d=t.attributes;let u=!0;for(let m=0;m<f.length;m++)if(d[f[m]]!==c[m]){u=!1;break}if(u)return n.vl}const o=this._layout(e,t,s),l=["position","normal","uv","color",...Object.keys(s.attributes)];return n={geometry:t,version:s.version,attrsVersion:t.attributesVersion,instanceMatrix:e.instanceMatrix,instanceColor:e.instanceColor,worldInstances:!!e.worldInstances,names:l,refs:l.map(c=>t.attributes[c]),vl:o},o.sourceNames=l,o.sourceRefs=n.refs,o.pipelines=new Map,i.set(a,n),o}_layout(e,t,s,i=!1,r=!1){const a=[],n=i?["position"]:["position","normal","uv","color",...Object.keys(s.attributes)];for(const m of n){const p=t.attributes[m];p&&!(m==="color"&&!s.vertexColors&&!s.attributes.color)&&a.push({name:m,attr:p})}if(e.isInstancedMesh){for(let m=0;m<4;m++)a.push({name:"instanceMatrix"+m,attr:e.instanceMatrix,column:m});e.instanceColor&&!i&&a.push({name:"instanceColor",attr:e.instanceColor})}const o=[],l=[],c=new Map;let f=0;for(const m of a){const p=m.attr,x=p.isInterleavedBufferAttribute?p.data:p,y=!!(p.isInstancedBufferAttribute||x.isInstancedInterleavedBuffer||p.meshPerAttribute||x.meshPerAttribute)||m.name.startsWith("instance"),v=Yi(p);let w=c.get(x);if(w===void 0){w=o.length,c.set(x,w);const _=p.isInterleavedBufferAttribute?p.data.stride*v.bytesPerComponent:p.itemSize*v.bytesPerComponent;o.push({src:x,attr:p,layout:{arrayStride:v.converted?v.itemSize*4:_,stepMode:y?"instance":"vertex",attributes:[]}})}let M=p.isInterleavedBufferAttribute?p.offset*v.bytesPerComponent:0,k=v.format,z=v.wgsl;m.column!==void 0&&(M=m.column*16,k="float32x4",z="vec4f"),o[w].layout.attributes.push({shaderLocation:f,offset:M,format:k}),(m.name==="position"||m.name==="normal")&&(z="vec3f"),m.name==="uv"&&(z="vec2f"),m.name==="color"&&(z=p.itemSize===4?"vec4f":"vec3f"),m.name==="instanceColor"&&(z="vec3f"),s.attributes[m.name]&&(z=s.attributes[m.name]),l.push({name:m.name,wgsl:z,location:f,instanced:y}),f++}const d=!!(e.isInstancedMesh&&e.worldInstances);return l.worldInstances=d,l.flatNormal=r,{key:l.map(m=>`${m.name}:${m.wgsl}`).join(",")+"|"+o.map(m=>`${m.layout.arrayStride}/${m.layout.stepMode}/${m.layout.attributes.map(p=>p.format+"@"+p.offset).join(";")}`).join(",")+(d?"|worldInstances":"")+(r?"|flatNormal":""),layout:l,buffers:o,worldInstances:d}}_depthBuffers(e,t,s,i){var c,f,d,u;if(i.kind!=="depth"&&((c=t.userData)!=null&&c.flatLeaf)&&!this.noFlatLeaves)return this._flatLeafBuffers(e,t,s);if(!((f=t.userData)!=null&&f.compactDepth)||!Wi(s,i))return null;const r=this._geometryGPU(t),a=t.attributes.position,n=t.index;let o=r.compactDepth;if(!o||o.source!==a||o.array!==a.array||o.version!==a.version||o.index!==n||o.indexArray!==(n==null?void 0:n.array)||o.indexVersion!==(n==null?void 0:n.version)){o&&((d=r.buffers.get(o.position))==null||d.buffer.destroy(),r.buffers.delete(o.position),(u=o.indexBuffer)==null||u.destroy());const m=jr(t);if(!m)return r.compactDepth=null,null;o=r.compactDepth={...m,source:a,array:a.array,version:a.version,index:n,indexArray:n.array,indexVersion:n.version,rows:new WeakMap},o.indexBuffer=g.device.createBuffer({label:"compact shadow indices",size:Math.max(16,He(o.indices.byteLength)),usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),_t(o.indexBuffer,o.indices),o.indexBinding={buffer:o.indexBuffer,format:o.indices instanceof Uint16Array?"uint16":"uint32"}}let l=o.rows.get(e);(!l||l.instanceMatrix!==e.instanceMatrix||!!l.vl.worldInstances!=!!e.worldInstances)&&(l={vl:this._layout(e,{attributes:{position:o.position}},s,!0),vbs:[],index:o.indexBinding,instanceMatrix:e.instanceMatrix},l.vl.pipelines=new Map,o.rows.set(e,l));for(let m=0;m<l.vl.buffers.length;m++)l.vbs[m]=this._attributeBuffer(t,l.vl.buffers[m].attr);return l}_flatLeafBuffers(e,t,s){var c,f;if(s.vertex.trim()||Object.keys(s.attributes).length||s.topology!=="triangle-list")return null;const i=this._geometryGPU(t),r=Object.values(t.attributes),a=t.index;let n=i.flatLeaf;if(!(n&&n.index===a&&n.indexArray===(a==null?void 0:a.array)&&n.indexVersion===(a==null?void 0:a.version)&&r.length===n.sources.length&&r.every((d,u)=>d===n.sources[u]&&d.array===n.arrays[u]&&d.version===n.versions[u]&&d.itemSize===n.sizes[u]))){if(n){for(const u of n.attributeSet??[])(c=i.buffers.get(u))==null||c.buffer.destroy(),i.buffers.delete(u);(f=n.indexBuffer)==null||f.destroy()}const d=en(t);n=i.flatLeaf={...d,sources:r,arrays:r.map(u=>u.array),versions:r.map(u=>u.version),sizes:r.map(u=>u.itemSize),index:a,indexArray:a==null?void 0:a.array,indexVersion:a==null?void 0:a.version,failed:!d,rows:new WeakMap},d&&(n.attributeSet=new Set(Object.values(d.attributes)),n.indexBuffer=g.device.createBuffer({label:"exact flat leaf indices",size:Math.max(16,He(d.indices.byteLength)),usage:GPUBufferUsage.INDEX|GPUBufferUsage.COPY_DST}),_t(n.indexBuffer,d.indices),n.indexBinding={buffer:n.indexBuffer,format:d.indices instanceof Uint16Array?"uint16":"uint32"})}if(n.failed)return null;let l=n.rows.get(e);(!l||l.instanceMatrix!==e.instanceMatrix||l.instanceColor!==e.instanceColor||!!l.vl.worldInstances!=!!e.worldInstances)&&(l={vl:this._layout(e,{attributes:n.attributes},s,!1,!0),vbs:[],index:n.indexBinding,instanceMatrix:e.instanceMatrix,instanceColor:e.instanceColor},l.vl.pipelines=new Map,n.rows.set(e,l));for(let d=0;d<l.vl.buffers.length;d++)l.vbs[d]=this._attributeBuffer(t,l.vl.buffers[d].attr);return l}_frameBuffers(e,t,s){var l,c;const i=this._cachedLayout(e,t,s);let r=e.__frameRow;const a=this.geometries.get(t);if(((l=t.userData)==null?void 0:l.surveyMaterial)!==void 0&&a&&(r==null?void 0:r.owner)===this&&r.geo===t&&r.vl!==i){const f=new Set(Object.values(t.attributes).map(d=>d.isInterleavedBufferAttribute?d.data:d));for(const[d,u]of a.buffers)f.has(d)||(u.buffer.destroy(),a.buffers.delete(d),a.bufferEpoch=(a.bufferEpoch??0)+1)}const n=r&&r.material===s&&r.geo===t&&r.owner===this&&r.vl===i&&r.epoch===(this.geometryEpoch??0)&&r.gpuState===a&&r.bufferEpoch===((a==null?void 0:a.bufferEpoch)??0);n||(r={material:s,geo:t,owner:this,vl:i,vbs:[],refs:[],versions:[],arrays:[]}),r.vbs.length=i.buffers.length;for(let f=0;f<i.buffers.length;f++){const d=i.buffers[f].attr,u=d.isInterleavedBufferAttribute?d.data:d;(!n||u.gpuBuffer||r.refs[f]!==u||r.versions[f]!==(u.version??0)||r.arrays[f]!==u.array)&&(r.vbs[f]=this._attributeBuffer(t,d),r.refs[f]=u,r.versions[f]=u.version??0,r.arrays[f]=u.array)}const o=t.index;return(!n||r.indexSrc!==o||r.indexArray!==(o==null?void 0:o.array)||r.indexVersion!==((o==null?void 0:o.version)??0))&&(r.index=this._indexBuffer(t),r.indexSrc=o,r.indexArray=o==null?void 0:o.array,r.indexVersion=(o==null?void 0:o.version)??0),r.epoch=this.geometryEpoch??0,r.frame=g.frame,r.materialVersion=s.version,r.attrsVersion=t.attributesVersion,r.instanceMatrix=e.instanceMatrix,r.instanceColor=e.instanceColor,r.gpuState=this.geometries.get(t),r.bufferEpoch=((c=r.gpuState)==null?void 0:c.bufferEpoch)??0,e.__frameRow=r,r}_pipeline(e,t,s){var o;e.__pkFrame!==g.frame&&(e.__pk=e.pipelineKey()+"|"+ct.version,e.__pkFrame=g.frame);const i=s.passKey;let r=t.pipelines&&t.pipelines.get(i);if(r&&r.materialKey===e.__pk)return r.p;const a=`${e.__pk}|${t.key}|${i}`;let n=this.pipelines.get(a);if(!n){this._budgetFrame!==g.frame&&(this._budgetFrame=g.frame,this._created=0);const l=`${e.constructor.name}|${e.__pk.split(".").slice(2).join(".")}|${JSON.stringify(((o=e.allDefines)==null?void 0:o.call(e))??null)}|${["map","normalMap","roughnessMap","metalnessMap","emissiveMap","aoMap","alphaMap"].map(f=>e[f]?1:0).join("")}|${t.key}|${i}`,c=(this._shapes??(this._shapes=new Set)).has(l);if(c&&(this._createdKnown=this._budgetFrame===this._knownFrame?(this._createdKnown??0)+1:1,this._knownFrame=this._budgetFrame,this._createdKnown<=12))return n=this._createPipeline(e,t,s,a),t.pipelines&&t.pipelines.set(i,{materialKey:e.__pk,p:n}),n;if(c)return this._starve();if(this._shapes.add(l),this._created>=(this.pipelinesPerFrame??1/0))return this._shapes.delete(l),this._starve();if(this.pipelineGapMs){const f=performance.now();if(f-(this._lastCreated??-1/0)<this.pipelineGapMs)return this._shapes.delete(l),this._starve();this._lastCreated=f}this._created++,n=this._createPipeline(e,t,s,a)}return t.pipelines&&t.pipelines.set(i,{materialKey:e.__pk,p:n}),n}forgetMaterial(e){const t=e.id+".";for(const s of this.pipelines.keys())s.startsWith(t)&&this.pipelines.delete(s)}_createPipeline(e,t,s,i){const r=Qr(e,t.layout,s),a={modules:r.modules,bindings:r.bindings,code:r.code,defines:r.defines,stage:"render",label:e.name};if(g.asyncShaders&&typeof Worker<"u"){const o={bindings:null,label:e.name};return o.handle=g.deferredPipeline(Ni(a).then(l=>{if(this.disposed)return{pipeline:null,failed:!1};const c=this._finishPipeline(e,t,s,l,!0,r.hasFragment);return o.bindings=c.bindings,o.handle=c.handle,c.handle}),e.name),this.pipelines.set(i,o),this.stats.pipelines=this.pipelines.size,o}const n=this._finishPipeline(e,t,s,Lt(a),!1,r.hasFragment);return this.pipelines.set(i,n),this.stats.pipelines=this.pipelines.size,n}_finishPipeline(e,t,s,i,r,a){var y;this._ensureDrawBuffer();const n=g.device.createPipelineLayout({bindGroupLayouts:[i.group0.layout,i.bindings.layout,this.drawLayout]}),o=Tt(e.blending);let l=[];s.kind==="main"?l=[{format:s.colorFormats[0],blend:e.transparent||s.late?o:void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0},{format:s.colorFormats[1],blend:s.late?Tt("premultiplied"):void 0,writeMask:e.colorWrite?GPUColorWrite.ALL:0},{format:s.colorFormats[2],blend:Tt("normal"),writeMask:e.colorWrite?GPUColorWrite.ALL:0}]:s.kind==="color"&&(l=s.colorFormats.map(v=>({format:v,blend:o,writeMask:e.colorWrite?GPUColorWrite.ALL:0})));const c=e.side,f=s.cullOverride||(c==="double"?"none":c==="back"?"front":"back"),d=e.depthTest?e.depthCompare||s.depthCompare:"always",u={label:e.name+" "+s.kind,layout:n,vertex:{entryPoint:"vs",buffers:t.buffers.map(v=>v.layout)},primitive:{topology:e.topology,cullMode:f,frontFace:"ccw"}};a&&(u.fragment={entryPoint:"fs",targets:l}),s.depthFormat&&(u.depthStencil={format:s.depthFormat,depthWriteEnabled:e.depthWrite,depthCompare:d,depthBias:s.kind==="depth"?s.depthBias||0:e.depthBias,depthBiasSlopeScale:s.kind==="depth"?s.depthBiasSlopeScale||0:e.depthBiasSlopeScale});const m=(r?i.code:os(i.code))+JSON.stringify([bt(g.device),bt(i.group0.layout),bt(i.bindings.layout),bt(this.drawLayout),u.vertex.buffers,u.primitive,(y=u.fragment)==null?void 0:y.targets,u.depthStencil]);let p=tt.get(m);if(!p||p.failed){const v=Fi(i.code,e.name,r);u.vertex.module=v,u.fragment&&(u.fragment.module=v),p=g.renderPipeline(u),tt.set(m,p),tt.size>128&&tt.delete(tt.keys().next().value)}return{handle:p,bindings:i.bindings,label:u.label}}collect(e,{camera:t,layerMask:s=4294967295,filter:i=null,kind:r="main",cull:a=!0,objects:n=null}){let o;if(this.reuseDrawLists){this._collectFrame!==g.frame&&(this._collectFrame=g.frame,this._collectIndex=0);const u=this._collectIndex++,m=this._collectPools??(this._collectPools=[]);o=m[u]??(m[u]={opaque:[],transparent:[],items:[],count:0});for(let p=o.count;p<(o.used??0);p++){const x=o.items[p];x&&(x.object=x.geometry=x.material=null)}o.used=o.count,o.opaque.length=o.transparent.length=o.count=0}const l=(o==null?void 0:o.opaque)??[],c=(o==null?void 0:o.transparent)??[];t&&(t.updateMatrixWorld(),$s.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse.copy(t.matrixWorld).invert()),qs.setFromProjectionMatrix($s,t.reversedDepth!==!1),Ys.setFromMatrixPosition(t.matrixWorld));const f=this.precompiling,d=u=>{if(!u.visible&&!f)return;!(!f&&u.worldTransformVersion!==void 0&&u.isInstancedMesh&&u.count===0&&!Object.hasOwn(u,"onBeforeRender"))&&u.isMesh&&u.material&&u.geometry&&u.layers.mask&s&&(!i||i(u))&&(r!=="depth"||u.castShadow)&&(f||!a||!t||u.frustumCulled===!1||this._inFrustum(u))&&(u.onBeforeRender&&u.onBeforeRender(null,null,t,u.geometry,u.material,null),(u.visible||f)&&this._addItems(u,l,c,o));for(const p of u.children)d(p)};if((e.__mwFrame!==g.frame||this.precompiling)&&(e.updateMatrixWorld(),e.__mwFrame=g.frame),n)for(const u of n)d(u);else d(e);return l.sort((u,m)=>u.renderOrder-m.renderOrder||u.pipeKey-m.pipeKey||u.z-m.z),c.sort((u,m)=>u.renderOrder-m.renderOrder||m.z-u.z),{opaque:l,transparent:c}}_instanceRuns(e,t){var d;const s=e.instanceRanges;if(!s||this.precompiling||this.noRuns||!t.camera||s.total!==e.count)return null;let i=t.__runFrustum;if(!i||t.__runFrame!==g.frame){const u=t.camera;Hs.multiplyMatrices(u.projectionMatrix,rn.copy(u.matrixWorld).invert()),i=t.__runFrustum=(i??new Ft).setFromProjectionMatrix(Hs,u.reversedDepth!==!1),t.__runFrame=g.frame}const r=s.list,a=((d=s.halfExtents)==null?void 0:d.length)===r.length/2?s.halfExtents:null,n=e.__runs??(e.__runs=[]);n.length=0;const o=e.matrixWorld,l=o.getMaxScaleOnAxis(),c=e.instanceLod,f=c&&t.camera===this.lodCamera?this.lodCamera.matrixWorld.elements:null;if(c&&!f&&c.min>0)return n;for(let u=0;u<r.length;u+=6){if(Be.center.set(r[u+2],r[u+3],r[u+4]).applyMatrix4(o),f){const x=Math.hypot(Be.center.x-f[12],Be.center.y-f[13],Be.center.z-f[14]);if(x<c.min||x>=c.max)continue}if(Be.radius=r[u+5]*l+1,!i.intersectsSphere(Be))continue;if(a){const x=u/2,y=a[x],v=a[x+1],w=a[x+2],M=o.elements,k=Math.abs(M[0])*y+Math.abs(M[4])*v+Math.abs(M[8])*w+1,z=Math.abs(M[1])*y+Math.abs(M[5])*v+Math.abs(M[9])*w+1,_=Math.abs(M[2])*y+Math.abs(M[6])*v+Math.abs(M[10])*w+1;let P=!1;for(const R of i.planes){const D=R.normal;if(R.distanceToPoint(Be.center)+Math.abs(D.x)*k+Math.abs(D.y)*z+Math.abs(D.z)*_<0){P=!0;break}}if(P)continue}const m=r[u],p=r[u+1];n.length&&n[n.length-2]+n[n.length-1]===m?n[n.length-1]+=p:n.push(m,p)}return n}_inFrustum(e){let t=null;if(e.isInstancedMesh?(!e.boundingSphere&&e.computeBoundingSphere&&e.computeBoundingSphere(),t=e.boundingSphere):(e.geometry.boundingSphere||e.geometry.computeBoundingSphere(),t=e.geometry.boundingSphere),!t||t.radius<0||!Number.isFinite(t.radius))return!0;let s=e.__worldSphere;const i=e.worldTransformVersion,r=i!==void 0;return(!s||s.src!==t||(r?s.version!==i||s.x!==t.center.x||s.y!==t.center.y||s.z!==t.center.z||s.radius!==t.radius:s.frame!==g.frame))&&(s=e.__worldSphere??(e.__worldSphere={frame:-1,src:null,sphere:new ze}),s.sphere.copy(t).applyMatrix4(e.matrixWorld),s.frame=g.frame,s.src=t,s.version=i,s.x=t.center.x,s.y=t.center.y,s.z=t.center.z,s.radius=t.radius),qs.intersectsSphere(s.sphere)}_addItems(e,t,s,i){const r=e.geometry,a=Array.isArray(e.material)?e.material:null,n=nn.setFromMatrixPosition(e.matrixWorld).distanceToSquared(Ys),o=(c,f,d)=>{var m,p;if(!c||!c.visible&&!this.precompiling)return;const u=i?(m=i.items)[p=i.count++]??(m[p]={}):{};u.object=e,u.geometry=r,u.material=c,u.start=f,u.count=d,u.z=n,u.renderOrder=e.renderOrder||0,u.pipeKey=c.id,(c.transparent?s:t).push(u)},l=r.drawRange||{start:0,count:1/0};if(a&&r.groups&&r.groups.length)for(const c of r.groups){const f=Math.max(c.start,l.start),d=Math.min(c.start+c.count,l.start+l.count);d>f&&o(a[c.materialIndex],f,d-f)}else o(a?a[0]:e.material,l.start,l.count)}geometryReady(e,t,s=!1){var c,f;const i=e.geometry,r=this.geometries.get(i);if(!r)return!1;const a=e.__frameRow;let n;if(a&&!!a.vl.worldInstances==!!e.worldInstances&&a.owner===this&&a.geo===i&&a.material===t&&a.materialVersion===t.version&&a.attrsVersion===i.attributesVersion&&a.instanceMatrix===e.instanceMatrix&&a.instanceColor===e.instanceColor&&a.vl.sourceNames){let d=!0;for(let u=0;u<a.vl.sourceNames.length;u++)if(i.attributes[a.vl.sourceNames[u]]!==a.vl.sourceRefs[u]){d=!1;break}d&&(n=a.vl)}n??(n=this._cachedLayout(e,i,t));const o=a&&a.owner===this&&a.geo===i&&a.material===t&&a.vl===n&&a.gpuState===r&&a.epoch===(this.geometryEpoch??0)&&a.bufferEpoch===(r.bufferEpoch??0);let l=!!o;for(let d=0;d<n.buffers.length;d++){const u=n.buffers[d].attr,m=u.isInterleavedBufferAttribute?u.data:u;if(m.gpuBuffer){l=!1;continue}if(o&&a.refs[d]===m&&a.arrays[d]===m.array&&a.versions[d]===(m.version??0)||(l=!1,s&&(m.isInstancedBufferAttribute||m.isInstancedInterleavedBuffer||m.usage===35048||m.usage===35040)))continue;const p=r.buffers.get(m);if(!p||p.array!==m.array||p.version!==(m.version??0))return!1}return i.index&&(r.indexSrc!==i.index.array||r.indexVersion!==(i.index.version??0))?!1:(l&&a.indexSrc===i.index&&a.indexArray===((c=i.index)==null?void 0:c.array)&&a.indexVersion===(((f=i.index)==null?void 0:f.version)??0)&&(a.frame=g.frame),!0)}materialReady(e,t,s){const i=this._cachedLayout(e,e.geometry,t);let r=!0;for(const a of s){const n=a.passKey&&Object.isFrozen(a)?a:{kind:"main",late:!1,colorFormats:[],depthFormat:null,depthCompare:"greater-equal",...a};n!==a&&(n.passKey=`${n.kind}.${n.late?1:0}.${n.colorFormats.join(",")}.${n.depthFormat}.${n.depthCompare}.${n.cullOverride||""}.${n.defines?JSON.stringify(n.defines):""}`);const o=this._depthBuffers(e,e.geometry,t,n),l=this._pipeline(t,(o==null?void 0:o.vl)??i,n);if(l!=null&&l.handle.failed)throw new Error("Replacement pipeline failed: "+l.handle.label);l!=null&&l.handle.pipeline||(r=!1)}return r}render(e,t){this._beginFrame(),t={kind:"main",late:!1,colorFormats:[],depthFormat:null,depthCompare:"greater-equal",frameBlock:_e,layerMask:4294967295,...t},t.passKey=`${t.kind}.${t.late?1:0}.${t.colorFormats.join(",")}.${t.depthFormat}.${t.depthCompare}.${t.cullOverride||""}.${t.defines?JSON.stringify(t.defines):""}`;const s=t.items||this.collect(e,t),i=g.getEncoder(),r=(t.colorViews||[]).map((o,l)=>{const c=t.clearColors?t.clearColors[l]:null;return{view:o,loadOp:c?"clear":"load",storeOp:"store",clearValue:c||[0,0,0,0]}}),a={label:t.label||t.kind,colorAttachments:r};t.depthView&&(a.depthStencilAttachment={view:t.depthView,depthLoadOp:t.clearDepth===null||t.clearDepth===void 0?"load":"clear",depthStoreOp:"store",depthClearValue:t.clearDepth??0}),t.timestampWrites&&(a.timestampWrites=t.timestampWrites);const n=i.beginRenderPass(a);t.viewport&&n.setViewport(...t.viewport),t.group0=Li(t.frameBlock,"render").getBindGroup(),n.setBindGroup(0,t.group0),this.drawItems(n,s.opaque,t,"opaque"),t.betweenLists&&t.betweenLists(n),this.drawItems(n,s.transparent,t,"transparent"),t.after&&t.after(n),n.end()}_starve(){return this.starved=!0,null}drawItems(e,t,s,i=""){var k,z;if(!this.bundles||this.precompiling||!s.group0)return this._drawDirect(e,t,s);const r=++js,a=this._drawRows??(this._drawRows=[]);let n=0;for(const _ of t){const{object:P,geometry:R,material:D}=_;if(!R.attributes.position&&!R.vertexCount&&!R.indirect)continue;const B=P.isInstancedMesh?P.count:R.instanceCount??1;if(B===0)continue;const L=this._depthBuffers(P,R,D,s);let C=L??P.__frameRow;!L&&(!C||!!C.vl.worldInstances!=!!P.worldInstances||C.frame!==g.frame||C.material!==D||C.geo!==R||C.owner!==this||C.epoch!==(this.geometryEpoch??0)||C.gpuState!==this.geometries.get(R)||C.bufferEpoch!==(((k=C.gpuState)==null?void 0:k.bufferEpoch)??0))&&(C=this._frameBuffers(P,R,D));const F=C.vl,A=C.vbs,N=C.index,$=this._pipeline(D,F,s);if(!$)continue;const Q=$.handle.pipeline||(this.syncPipelines?g.ready($.handle):null);if(!Q)continue;const b=$.bindings.getBindGroup(r),S=this._slot(P)*he;(P.__bsI!==B||P.__bsS!==_.start||P.__bsC!==_.count)&&(P.__bsI=B,P.__bsS=_.start,P.__bsC=_.count,P.__bundleShapeAt=g.frame);const I=!R.indirect&&g.frame-P.__bundleShapeAt>(((z=R.userData)==null?void 0:z.surveyMaterial)!==void 0?1:60),O=P.isInstancedMesh?this._instanceRuns(P,s):null;if(O&&!O.length)continue;const V=a[n]??(a[n]={});if(V.it=_,V.o=P,V.geo=R,V.pipeline=Q,V.group=b,V.offset=S,V.vbs=A,V.instances=B,V.index=N,V.steady=I,O){const W=V.runs??(V.runs=[]);W.length=O.length;for(let ee=0;ee<O.length;ee++)W[ee]=O[ee]}else V.runs=null;n++}a.length=n,this._bundleFrame!==g.frame&&(this._bundleFrame=g.frame,(this._bundleCalls??(this._bundleCalls=new Map)).clear());const o=`${s.label||""}|${s.passKey}|${i}`,l=this._bundleCalls.get(o)??0;this._bundleCalls.set(o,l+1),this._bundles??(this._bundles=new Map);const c=this.bundleChunking,f=c&&this.bundleChunkSize===1,d=o+"|"+l+(c?f?"|objects":"|chunks":"");let u=this._bundles.get(d);if(u||this._bundles.set(d,u=c?new Map:[]),f)return this._replayObjects(e,a,s,u);const m={pipeline:null,group:null};let p=[],x=0,y=!1;const v=[],w=()=>{v.length&&(e.executeBundles(v),v.length=0,y=!0,m.pipeline=null,m.group=null)},M=()=>{var L;if(!p.length)return;const _=an;_.length=0,_.push(Ee(s.group0),Ee(this.drawBindGroup));for(const C of p){if(_.push(-1,Ee(C.pipeline),Ee(C.group),C.offset,C.instances,C.it.start,C.it.count,C.vbs.length),C.runs){_.push(-2,C.runs.length);for(const F of C.runs)_.push(F)}for(const F of C.vbs)_.push(Ee(F));C.index?_.push(Ee(C.index.buffer),C.index.format==="uint32"?2:1,C.geo.index?C.geo.index.count:-2):_.push(0,0,C.geo.attributes.position?C.geo.attributes.position.count:C.geo.vertexCount)}const P=p[p.length-1],R=c?`${P.offset}/${Ee(P.group)}/${P.it.start}`:x;let D=c?u.get(R):u[x],B=!!D&&D.key.length===_.length;if(B){for(let C=0;C<_.length;C++)if(D.key[C]!==_[C]){B=!1;break}}if(B)for(const C of p){const F=C.index?C.geo.index.count:((L=C.geo.attributes.position)==null?void 0:L.count)??C.geo.vertexCount;this.stats.draws++,this.stats.triangles+=Math.max(0,Math.min(C.it.count,F-C.it.start))/3*St(C)}else{const C=g.device.createRenderBundleEncoder({label:(s.label||s.kind)+" bundle",colorFormats:s.colorFormats,depthStencilFormat:s.depthFormat||void 0,sampleCount:s.sampleCount||1});C.setBindGroup(0,s.group0);const F={pipeline:null,group:null};for(const A of p)this._drawRow(C,A,F);D={key:_.slice(),bundle:C.finish(),at:g.frame},c?u.set(R,D):u[x]=D,this.stats.bundleBuilds++,this.stats.bundleEncodedDraws+=p.length}D.at=g.frame,v.push(D.bundle),x++,p.length=0};for(const _ of a){if(_.steady){p.push(_),c&&(!(_.offset/he&31)||p.length>=64)&&M();continue}M(),w(),y&&(e.setBindGroup(0,s.group0),y=!1),this._drawRow(e,_,m)}if(M(),w(),c){if(g.frame%120===0)for(const[_,P]of u)g.frame-P.at>240&&u.delete(_)}else u.length=x;y&&e.setBindGroup(0,s.group0)}_sweepBundles(e){for(const[t,s]of this._bundles)if(s instanceof Map){for(const[i,r]of s)g.frame-r.at>e&&s.delete(i);s.size||this._bundles.delete(t)}else s.some(i=>i&&g.frame-i.at<=e)||this._bundles.delete(t)}_replayObjects(e,t,s,i){var n,o,l,c,f,d,u;const r=this._objectBundles??(this._objectBundles=[]);r.length=0;const a=this._objectDrawState??(this._objectDrawState={pipeline:null,group:null});a.pipeline=a.group=null;for(const m of t){if(!m.steady){r.length&&(e.executeBundles(r),r.length=0,e.setBindGroup(0,s.group0),a.pipeline=a.group=null),this._drawRow(e,m,a);continue}const p=m.index?m.geo.index.count:((n=m.geo.attributes.position)==null?void 0:n.count)??m.geo.vertexCount;let x=i.get(m.o),y=!!x&&x.group0===s.group0&&x.drawGroup===this.drawBindGroup&&x.pipeline===m.pipeline&&x.group===m.group&&x.offset===m.offset&&x.instances===m.instances&&x.start===m.it.start&&x.count===m.it.count&&x.total===p&&x.indexBuffer===(((o=m.index)==null?void 0:o.buffer)??null)&&x.indexFormat===((l=m.index)==null?void 0:l.format)&&x.vbs.length===m.vbs.length;if(y){for(let v=0;v<m.vbs.length;v++)if(x.vbs[v]!==m.vbs[v]){y=!1;break}}if(y&&(((c=x.runs)==null?void 0:c.length)??-1)!==(((f=m.runs)==null?void 0:f.length)??-1)&&(y=!1),y&&m.runs){for(let v=0;v<m.runs.length;v++)if(x.runs[v]!==m.runs[v]){y=!1;break}}if(y)this.stats.draws++,this.stats.triangles+=Math.max(0,Math.min(m.it.count,p-m.it.start))/3*St(m);else{const v=g.device.createRenderBundleEncoder({label:(s.label||s.kind)+" bundle",colorFormats:s.colorFormats,depthStencilFormat:s.depthFormat||void 0,sampleCount:s.sampleCount||1});v.setBindGroup(0,s.group0),this._drawRow(v,m,{pipeline:null,group:null}),x={bundle:v.finish(),at:g.frame,group0:s.group0,drawGroup:this.drawBindGroup,pipeline:m.pipeline,group:m.group,offset:m.offset,instances:m.instances,start:m.it.start,count:m.it.count,total:p,indexBuffer:((d=m.index)==null?void 0:d.buffer)??null,indexFormat:(u=m.index)==null?void 0:u.format,vbs:m.vbs.slice(),runs:m.runs?m.runs.slice():null},i.set(m.o,x),this.stats.bundleBuilds++,this.stats.bundleEncodedDraws++}x.at=g.frame,r.push(x.bundle)}if(r.length&&(e.executeBundles(r),r.length=0,e.setBindGroup(0,s.group0)),g.frame%120===0)for(const[m,p]of i)g.frame-p.at>240&&i.delete(m)}_drawRow(e,t,s){const{it:i,geo:r}=t;t.pipeline!==s.pipeline&&(e.setPipeline(t.pipeline),s.pipeline=t.pipeline),t.group!==s.group&&(e.setBindGroup(1,t.group),s.group=t.group),e.setBindGroup(2,this.drawBindGroup,[t.offset]);for(let o=0;o<t.vbs.length;o++)e.setVertexBuffer(o,t.vbs[o]);const a=t.instances,n=t.index;if(r.indirect){const o=r.indirect.buffer.getGPU?r.indirect.buffer.getGPU():r.indirect.buffer,l=r.indirect.offsets||[r.indirect.offset||0];n&&e.setIndexBuffer(n.buffer,n.format);for(const c of l)n?e.drawIndexedIndirect(o,c):e.drawIndirect(o,c),this.stats.draws++;return}if(n){const o=Math.min(i.count,r.index.count-i.start);if(o<=0)return;if(e.setIndexBuffer(n.buffer,n.format),t.runs){for(let l=0;l<t.runs.length;l+=2)e.drawIndexed(o,t.runs[l+1],i.start,0,t.runs[l]);this.stats.triangles+=o/3*St(t)}else e.drawIndexed(o,a===1/0?1:a,i.start,0,0),this.stats.triangles+=o/3*a}else{const o=r.attributes.position?r.attributes.position.count:r.vertexCount,l=Math.min(i.count,o-i.start);if(l<=0)return;if(t.runs)for(let c=0;c<t.runs.length;c+=2)e.draw(l,t.runs[c+1],i.start,t.runs[c]);else e.draw(l,a,i.start,0);this.stats.triangles+=l/3*St(t)}this.stats.draws++}_drawDirect(e,t,s){let i=null,r=null;const a=++js;for(const n of t){const{object:o,geometry:l,material:c}=n;if(!l.attributes.position&&!l.vertexCount&&!l.indirect)continue;const f=this._depthBuffers(o,l,c,s);let d,u;if(this.precompiling){try{if(d=(f==null?void 0:f.vl)??this._cachedLayout(o,l,c),u=this._pipeline(c,d,s),!u)continue}catch{continue}continue}if(d=(f==null?void 0:f.vl)??this._cachedLayout(o,l,c),u=this._pipeline(c,d,s),!u)continue;const m=u.handle.pipeline||(this.syncPipelines?g.ready(u.handle):null);if(!m)continue;u!==i&&(e.setPipeline(m),i=u);const p=u.bindings.getBindGroup(a);p!==r&&(e.setBindGroup(1,p),r=p),e.setBindGroup(2,this.drawBindGroup,[this._slot(o)*he]);for(let w=0;w<d.buffers.length;w++)e.setVertexBuffer(w,f?f.vbs[w]:this._attributeBuffer(l,d.buffers[w].attr));const x=o.isInstancedMesh?o.count:l.instanceCount??1;if(x===0)continue;const y=o.isInstancedMesh?this._instanceRuns(o,s):null;if(y&&!y.length)continue;const v=(f==null?void 0:f.index)??this._indexBuffer(l);if(l.indirect){const w=l.indirect.buffer.getGPU?l.indirect.buffer.getGPU():l.indirect.buffer,M=l.indirect.offsets||[l.indirect.offset||0];v&&e.setIndexBuffer(v.buffer,v.format);for(const k of M)v?e.drawIndexedIndirect(w,k):e.drawIndirect(w,k),this.stats.draws++;continue}if(v){const w=Math.min(n.count,l.index.count-n.start);if(w<=0)continue;if(e.setIndexBuffer(v.buffer,v.format),y)for(let M=0;M<y.length;M+=2)e.drawIndexed(w,y[M+1],n.start,0,y[M]);else e.drawIndexed(w,x===1/0?1:x,n.start,0,0);this.stats.triangles+=w/3*x}else{const w=l.attributes.position?l.attributes.position.count:l.vertexCount,M=Math.min(n.count,w-n.start);if(M<=0)continue;if(y)for(let k=0;k<y.length;k+=2)e.draw(M,y[k+1],n.start,y[k]);else e.draw(M,x,n.start,0);this.stats.triangles+=M/3*x}this.stats.draws++}}}function St(h){if(!h.runs)return h.instances;let e=0;for(let t=1;t<h.runs.length;t+=2)e+=h.runs[t];return e}function He(h){return Math.ceil(h/4)*4}function _t(h,e){if(e.byteLength%4===0){g.queue.writeBuffer(h,0,e.buffer,e.byteOffset,e.byteLength);return}const t=new Uint8Array(He(e.byteLength));t.set(new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),g.queue.writeBuffer(h,0,t)}const Zs=new WeakMap;function cn(h){const e=h.isInterleavedBufferAttribute?h.data:h;if(!Yi(h).converted)return e.array;let s=Zs.get(e);if(s&&s.version===e.version)return s.array;const i=h.count,r=h.itemSize,a=new Float32Array(i*r),n=h.normalized?un(e.array):1;for(let o=0;o<i*r;o++)a[o]=e.array[o]/n;return Zs.set(e,{version:e.version,array:a}),a}function un(h){return h instanceof Uint8Array?255:h instanceof Int8Array?127:h instanceof Uint16Array?65535:h instanceof Int16Array?32767:1}function Yi(h){const t=(h.isInterleavedBufferAttribute?h.data:h).array,s=h.itemSize,i=h.normalized,r=n=>s===1?n:`vec${s}${n==="f32"?"f":n==="u32"?"u":"i"}`;if(t instanceof Float32Array)return{format:s===1?"float32":`float32x${s}`,wgsl:r("f32"),bytesPerComponent:4,itemSize:s};if(t instanceof Uint32Array)return{format:s===1?"uint32":`uint32x${s}`,wgsl:r("u32"),bytesPerComponent:4,itemSize:s};if(t instanceof Int32Array)return{format:s===1?"sint32":`sint32x${s}`,wgsl:r("i32"),bytesPerComponent:4,itemSize:s};const a={Uint8Array:["uint8","unorm8",1],Int8Array:["sint8","snorm8",1],Uint16Array:["uint16","unorm16",2],Int16Array:["sint16","snorm16",2]}[t.constructor.name];if(a&&(s===2||s===4)&&!h.isInterleavedBufferAttribute){const n=(i?a[1]:a[0])+"x"+s,o=r(i?"f32":t instanceof Uint8Array||t instanceof Uint16Array?"u32":"i32");return{format:n,wgsl:o,bytesPerComponent:a[2],itemSize:s}}return{format:s===1?"float32":`float32x${s}`,wgsl:r("f32"),bytesPerComponent:4,itemSize:s,converted:!0}}const fn=`
struct FSIn { @builtin( position ) pos: vec4f, @location( 0 ) uv: vec2f };
@vertex fn vs( @builtin( vertex_index ) i: u32 ) -> FSIn {
	let p = vec2f( f32( ( i << 1u ) & 2u ), f32( i & 2u ) );
	var o: FSIn;
	o.pos = vec4f( p * 2.0 - 1.0, FS_DEPTH, 1.0 );
	o.uv = vec2f( p.x, 1.0 - p.y );
	return o;
}
`;class re{constructor({label:e="fullscreen",modules:t=[],bindings:s={},code:i,colorFormats:r=["rgba16float"],blend:a="none",defines:n={},depthFormat:o=null,depthCompare:l="always",depthWrite:c=!1,depth:f=0,writeMasks:d=null,blends:u=null}){this.label=e,this.colorFormats=r;const m=i.includes("@fragment")?i:`${i}
@fragment fn fs( in: FSIn ) -> @location( 0 ) vec4f { return fragment( in ); }
`,p={modules:[Le,...t],bindings:s,code:fn.replace("FS_DEPTH",f.toFixed(6))+m,defines:n,stage:"render",label:e},x=(y,v)=>{this.source=y.code,this.bindings=y.bindings;const w=Fi(y.code,e,v),M={label:e,layout:g.device.createPipelineLayout({bindGroupLayouts:[y.group0.layout,y.bindings.layout]}),vertex:{module:w,entryPoint:"vs"},fragment:{module:w,entryPoint:"fs",targets:r.map((k,z)=>({format:k,blend:Tt(u?u[z]:z===0?a:"none"),writeMask:d?d[z]:GPUColorWrite.ALL}))},primitive:{topology:"triangle-list"}};return o&&(M.depthStencil={format:o,depthCompare:l,depthWriteEnabled:c}),g.renderPipeline(M)};this.handle=g.asyncShaders&&typeof Worker<"u"?g.deferredPipeline(Ni(p).then(y=>{const v=x(y,!0);return this.handle=v,v}),e):x(Lt(p),!1),this.timestampWrites=null}get pipeline(){return g.ready(this.handle)}draw(e,t=_e){const s=this.handle.pipeline||(g.deferCompiles?null:g.ready(this.handle));s&&(e.setPipeline(s),e.setBindGroup(0,Li(t,"render").getBindGroup()),e.setBindGroup(1,this.bindings.getBindGroup()),e.draw(3))}render({colorViews:e,clear:t=null,viewport:s=null,frameBlock:i=_e,depthView:r=null,encoder:a=g.getEncoder()}={}){const n=e.map(c=>c.isTexture?c.view({dimension:"2d",mipLevelCount:1}):c),o={label:this.label,colorAttachments:n.map(c=>({view:c,loadOp:t?"clear":"load",storeOp:"store",clearValue:t||[0,0,0,0]}))};r&&(o.depthStencilAttachment={view:r,depthLoadOp:"load",depthStoreOp:"store"}),this.timestampWrites&&(o.timestampWrites=this.timestampWrites);const l=a.beginRenderPass(o);s&&l.setViewport(...s),this.draw(l,i),l.end()}}const ss=[];for(let h=0;h<8;h++)ss.push(new T);const st=new T,dn=new T(0,1,0),Js=new E,pn=new T,mn=new X;class yn{constructor({size:e=2048,splits:t=[10,60,400],lightMargin:s=200,normalBias:i=[.015,.06,.3],bias:r=2e-5,pcssCascades:a=1,cacheGrid:n=0}={}){var l;this.baseSize=e,this.cacheGrid=Math.max(0,Math.min(Math.floor(n),Math.floor(((((l=g.device.limits)==null?void 0:l.maxTextureDimension2D)??e)-e)/2))),this.size=e+this.cacheGrid*2,this.splits=t,this.count=t.length,this.lightMargin=s,this.normalBias=i,this.periods=t.map((c,f)=>f===0?1:f===1?2:4),this.texture=new G({label:"sunShadowMap",width:this.size,height:this.size,depth:this.count,dimension:"2d-array",format:"depth32float",usage:["sample","render","copySrc","copyDst"]}),this.cache=null,this.cacheLayers=this.cacheGrid?this.count:Math.min(2,this.count),Yr(this.texture),this.cascades=t.map((c,f)=>({camera:{matrixWorld:new E,matrixWorldInverse:new E,projectionMatrix:new E,near:0,far:1,reversedDepth:!1,updateMatrixWorld(){},isCamera:!0,isShadowCamera:!0},block:Hi("shadowView"+f),viewProj:new E,radius:0,dirty:!0,lastFit:new E,cacheVP:new E,cached:!1,stillFits:0})),this.idleRenders=0,this.enabled=!0,this.layerMask=4294967295,this.frame=0,this.lastSun=new T(0,-2,0);const o=ot.fields;o.count.value=this.count,o.mapSize.value=this.size,o.bias.value=r,o.pcssCascades.value=a,o.enabled.value=1}_margin(e){const t=this.splits[this.count-1],s=e/t;return Math.max(.25*s*s,.25*s)*t}_fit(e,t,s){const i=this.cascades[e],r=e===0?0:this.splits[e-1],a=this.splits[e],n=this._margin(r),o=this._margin(a),l=Math.max(t.near,r-n*.5),c=e===this.count-1?a:a+o*.5;ot.fields.blend.value[e]=new X(r,a,n,o);const f=Math.tan(t.fov*Math.PI/360),d=f*t.aspect;let u=0;for(const C of[l,c])for(const F of[-1,1])for(const A of[-1,1])ss[u++].set(F*d*C,A*f*C,-C).applyMatrix4(t.matrixWorld);const m=Math.min(c,(l+c)/2*(1+d*d+f*f));st.set(0,0,-m).applyMatrix4(t.matrixWorld);let p=0;for(const C of ss)p=Math.max(p,C.distanceTo(st));p=Math.ceil(p*16)/16;const x=p,y=2*x/this.baseSize,v=this.cacheGrid*y;p+=v,i.radius=p;const w=i.camera,M=s,k=Math.abs(M.y)>.99?pn.set(1,0,0):dn;w.matrixWorld.lookAt(M,new T(0,0,0),k),w.matrixWorld.setPosition(0,0,0),Js.copy(w.matrixWorld).invert();const z=y*Math.max(1,this.cacheGrid),_=mn.set(st.x,st.y,st.z,1).applyMatrix4(Js);_.x=Math.round(_.x/z)*z,_.y=Math.round(_.y/z)*z,_.z=Math.round(_.z/z)*z;const P=x+this.lightMargin+v,R=new T(_.x,_.y,_.z+P).applyMatrix4(w.matrixWorld);w.matrixWorld.setPosition(R),w.matrixWorldInverse.copy(w.matrixWorld).invert();const D=.1,B=P+p;w.near=D,w.far=B,xn(w.projectionMatrix,-p,p,p,-p,D,B),i.viewProj.multiplyMatrices(w.projectionMatrix,w.matrixWorldInverse);const L=ot.fields;L.matrices.value[e]=i.viewProj.clone(),L.cascades.value[e]=new X(c,y,this.normalBias[e]??.05,B-D),L.depthBiasScale.value.setComponent(e,(2*x+this.lightMargin-D)/(B-D))}update(e,t){if(this.frame++,ot.fields.enabled.value=this.enabled&&t.y>-.05?1:0,!this.enabled)return[];e.updateMatrixWorld();const s=this.lastSun.angleTo(t)>1e-4;this.lastSun.copy(t);const i=[];for(let r=0;r<this.count;r++)(s||this.cascades[r].dirty||(this.frame+r)%this.periods[r]===0)&&(this._fit(r,e,t),this.cascades[r].dirty=!1,i.push(r));return i}invalidateCache(){for(const e of this.cascades)e.cached=!1}render(e,t,s,i=null,r=null,a=null){for(const n of s){const o=this.cascades[n];ts(o.camera,this.size,this.size,{block:o.block});const l=this.texture.view({dimension:"2d",baseArrayLayer:n,arrayLayerCount:1}),c=(u,m=a==null?void 0:a.all)=>t.render(e,{label:"shadow cascade "+n,kind:"depth",timestampWrites:i?i(n):void 0,camera:o.camera,frameBlock:o.block,depthView:l,depthFormat:"depth32float",clearDepth:1,depthCompare:"less-equal",layerMask:this.layerMask,depthBias:2,depthBiasSlopeScale:1.5,objects:m,...u}),f=o.lastFit.equals(o.viewProj);if(o.lastFit.copy(o.viewProj),o.stillFits=f?o.stillFits+1:0,!r||n>=this.cacheLayers){c();continue}!this.cascades.some(u=>u.cached)&&++this.idleRenders>900&&this.cache&&(this.cache.destroy(),this.cache=null);const d=u=>r(u);this.stats??(this.stats={hit:0,store:0,full:0}),o.cached&&o.cacheVP.equals(o.viewProj)?(this.stats.hit++,this.idleRenders=0,this._copy(this.cache,this.texture,n),c({filter:d,clearDepth:null},a==null?void 0:a.moving)):f&&o.stillFits>=(this.cacheGrid?1:24)?(this.stats.store++,c({filter:u=>!r(u)},a==null?void 0:a.still),this.cache??(this.cache=new G({label:"sunShadowCache",width:this.size,height:this.size,depth:this.cacheLayers,dimension:"2d-array",format:"depth32float",usage:["copySrc","copyDst"]})),this._copy(this.texture,this.cache,n),o.cached=!0,o.cacheVP.copy(o.viewProj),c({filter:d,clearDepth:null},a==null?void 0:a.moving)):(o.cached=!1,this.stats.full++,c())}}_copy(e,t,s){g.getEncoder().copyTextureToTexture({texture:e.getGPU(),origin:[0,0,s]},{texture:t.getGPU(),origin:[0,0,s]},[this.size,this.size,1])}dispose(){var e,t;this.texture.destroy(),(e=this.cache)==null||e.destroy(),this.cache=null;for(const s of this.cascades)(t=s.block.buffer)==null||t.destroy()}}function xn(h,e,t,s,i,r,a){const n=1/(t-e),o=1/(s-i),l=1/(a-r);return h.set(2*n,0,0,-(t+e)*n,0,2*o,0,-(s+i)*o,0,0,-l,-r*l,0,0,0,1),h}class Ut{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].includes(t)||s[e].push(t)}hasEventListener(e,t){const s=this._listeners;return s!==void 0&&s[e]!==void 0&&s[e].includes(t)}removeEventListener(e,t){const s=this._listeners&&this._listeners[e];if(s===void 0)return;const i=s.indexOf(t);i!==-1&&s.splice(i,1)}dispatchEvent(e){const t=this._listeners&&this._listeners[e.type];if(t!==void 0){e.target=this;for(const s of t.slice())s.call(this,e);e.target=null}}}class gn{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let vn=0;const Qs=new T,Ve=new ie,ye=new E,Mt=new T,it=new T,wn=new T,bn=new ie,ei=new T(1,0,0),ti=new T(0,1,0),si=new T(0,0,1),ii={type:"added"},Sn={type:"removed"},Yt={type:"childadded",child:null},jt={type:"childremoved",child:null};class J extends Ut{constructor(){super(),Object.defineProperty(this,"id",{value:vn++}),this.uuid=cs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=J.DEFAULT_UP.clone();const e=new T,t=new Re,s=new ie,i=new T(1,1,1);t._onChange(()=>s.setFromEuler(t,!1)),s._onChange(()=>t.setFromQuaternion(s,void 0,!1)),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new E},normalMatrix:{value:new Ne}}),this.matrix=new E,this.matrixWorld=new E,this.matrixAutoUpdate=J.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=J.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={}}onBeforeRender(){}onAfterRender(){}onBeforeShadow(){}onAfterShadow(){}dispose(){this.dispatchEvent({type:"dispose"})}applyMatrix4(e){return this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ve.setFromAxisAngle(e,t),this.quaternion.multiply(Ve),this}rotateOnWorldAxis(e,t){return Ve.setFromAxisAngle(e,t),this.quaternion.premultiply(Ve),this}rotateX(e){return this.rotateOnAxis(ei,e)}rotateY(e){return this.rotateOnAxis(ti,e)}rotateZ(e){return this.rotateOnAxis(si,e)}translateOnAxis(e,t){return Qs.copy(e).applyQuaternion(this.quaternion),this.position.add(Qs.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ei,e)}translateY(e){return this.translateOnAxis(ti,e)}translateZ(e){return this.translateOnAxis(si,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ye.copy(this.matrixWorld).invert())}lookAt(e,t,s){e.isVector3?Mt.copy(e):Mt.set(e,t,s);const i=this.parent;this.updateWorldMatrix(!0,!1),it.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ye.lookAt(it,Mt,this.up):ye.lookAt(Mt,it,this.up),this.quaternion.setFromRotationMatrix(ye),i&&(ye.extractRotation(i.matrixWorld),Ve.setFromRotationMatrix(ye),this.quaternion.premultiply(Ve.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?this:(e&&e.isObject3D&&(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ii),Yt.child=e,this.dispatchEvent(Yt),Yt.child=null),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Sn),jt.child=e,this.dispatchEvent(jt),jt.child=null),this}removeFromParent(){return this.parent!==null&&this.parent.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ye.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ye.multiply(e.parent.matrixWorld)),e.applyMatrix4(ye),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ii),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(const s of this.children){const i=s.getObjectByProperty(e,t);if(i!==void 0)return i}}getObjectsByProperty(e,t,s=[]){this[e]===t&&s.push(this);for(const i of this.children)i.getObjectsByProperty(e,t,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(it,e,wn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(it,bn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}traverse(e){e(this);const t=this.children;for(let s=0,i=t.length;s<i;s++)t[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let s=0,i=t.length;s<i;s++)t[s].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let s=0,i=t.length;s<i;s++){const r=t[s];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(s===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(s.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].matrixWorldAutoUpdate===!0&&i[r].updateWorldMatrix(!1,!0)}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,e.onBeforeRender!==J.prototype.onBeforeRender&&(this.onBeforeRender=e.onBeforeRender),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(const s of e.children)this.add(s.clone());return this}}J.DEFAULT_UP=new T(0,1,0);J.DEFAULT_MATRIX_AUTO_UPDATE=!0;J.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;J.prototype.isObject3D=!0;class _n extends J{constructor(){super(),this.type="Group"}}_n.prototype.isGroup=!0;class ji extends J{constructor(){super(),this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Re,this.environmentIntensity=1,this.environmentRotation=new Re,this.overrideMaterial=null}copy(e,t){return super.copy(e,t),this.background=e.background,this.environment=e.environment,this.fog=e.fog,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentRotation.copy(e.environmentRotation),this.environmentIntensity=e.environmentIntensity,this.overrideMaterial=e.overrideMaterial,this.matrixAutoUpdate=e.matrixAutoUpdate,this}}ji.prototype.isScene=!0;const Xi=35044,j=new T,Xt=new q,Ki={getComponent(h,e){const t=this.array[this._idx(h,e)];return this.normalized?Br(t,this.array):t},setComponent(h,e,t){return this.array[this._idx(h,e)]=this.normalized?Er(t,this.array):t,this},getX(h){return this.getComponent(h,0)},getY(h){return this.getComponent(h,1)},getZ(h){return this.getComponent(h,2)},getW(h){return this.getComponent(h,3)},setX(h,e){return this.setComponent(h,0,e)},setY(h,e){return this.setComponent(h,1,e)},setZ(h,e){return this.setComponent(h,2,e)},setW(h,e){return this.setComponent(h,3,e)},setXY(h,e,t){return this.setComponent(h,0,e),this.setComponent(h,1,t)},setXYZ(h,e,t,s){return this.setComponent(h,0,e),this.setComponent(h,1,t),this.setComponent(h,2,s)},setXYZW(h,e,t,s,i){return this.setComponent(h,0,e),this.setComponent(h,1,t),this.setComponent(h,2,s),this.setComponent(h,3,i)},applyMatrix3(h){if(this.itemSize===2)for(let e=0;e<this.count;e++)Xt.fromBufferAttribute(this,e).applyMatrix3(h),this.setXY(e,Xt.x,Xt.y);else if(this.itemSize===3)for(let e=0;e<this.count;e++)j.fromBufferAttribute(this,e).applyMatrix3(h),this.setXYZ(e,j.x,j.y,j.z);return this},applyMatrix4(h){for(let e=0;e<this.count;e++)j.fromBufferAttribute(this,e).applyMatrix4(h),this.setXYZ(e,j.x,j.y,j.z);return this},applyNormalMatrix(h){for(let e=0;e<this.count;e++)j.fromBufferAttribute(this,e).applyNormalMatrix(h),this.setXYZ(e,j.x,j.y,j.z);return this},transformDirection(h){for(let e=0;e<this.count;e++)j.fromBufferAttribute(this,e).transformDirection(h),this.setXYZ(e,j.x,j.y,j.z);return this}};class ue extends Ut{constructor(e,t,s=!1){if(super(),Array.isArray(e))throw new TypeError("BufferAttribute: array should be a Typed Array.");this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=s,this.usage=Xi,this.updateRanges=[],this.gpuType=1015,this.version=0,this.onUploadCallback=Zi}set needsUpdate(e){e===!0&&this.version++}_idx(e,t){return e*this.itemSize+t}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,s){const i=this.itemSize;e*=i,s*=t.itemSize;for(let r=0;r<i;r++)this.array[e+r]=t.array[s+r];return this}copyArray(e){return this.array.set(e),this}set(e,t=0){return this.array.set(e,t),this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}dispose(){this.dispatchEvent({type:"dispose"})}}Object.assign(ue.prototype,Ki);ue.prototype.isBufferAttribute=!0;function Zi(){}class Mn extends ue{constructor(e,t,s){super(new Uint16Array(e),t,s)}}class zn extends ue{constructor(e,t,s){super(new Uint32Array(e),t,s)}}class Pn extends ue{constructor(e,t,s){super(new Float32Array(e),t,s)}}class dt extends ue{constructor(e,t,s,i=1){super(e,t,s),this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new dt(this.array,this.itemSize).copy(this)}}dt.prototype.isInstancedBufferAttribute=!0;class Ji extends Ut{constructor(e,t){super(),this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Xi,this.updateRanges=[],this.version=0,this.uuid=cs(),this.onUploadCallback=Zi}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}set(e,t=0){return this.array.set(e,t),this}onUpload(e){return this.onUploadCallback=e,this}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,s){e*=this.stride,s*=t.stride;for(let i=0;i<this.stride;i++)this.array[e+i]=t.array[s+i];return this}clone(){return new this.constructor(new this.array.constructor(this.array),this.stride).copy(this)}dispose(){this.dispatchEvent({type:"dispose"})}}Ji.prototype.isInterleavedBuffer=!0;class us extends Ji{constructor(e,t,s=1){super(e,t),this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(){return new us(new this.array.constructor(this.array),this.stride,this.meshPerAttribute)}}us.prototype.isInstancedInterleavedBuffer=!0;class Qi{constructor(e,t,s,i=!1){this.name="",this.data=e,this.itemSize=t,this.offset=s,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}_idx(e,t){return e*this.data.stride+this.offset+t}clone(){const e=new this.array.constructor(this.count*this.itemSize);for(let t=0;t<this.count;t++)for(let s=0;s<this.itemSize;s++)e[t*this.itemSize+s]=this.array[this._idx(t,s)];return new ue(e,this.itemSize,this.normalized)}}Object.assign(Qi.prototype,Ki);Qi.prototype.isInterleavedBufferAttribute=!0;let An=0;const Ae=new E,kn=new Ne,ri=new ie,Cn=new Me,We=new T,zt=new T;function Tn(h){for(let e=h.length-1;e>=0;--e)if(h[e]>=65535)return!0;return!1}class Ze extends Ut{constructor(){super(),Object.defineProperty(this,"id",{value:An++}),this.uuid=cs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Tn(e)?zn:Mn)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this.attributesVersion=(this.attributesVersion||0)+1,this}deleteAttribute(e){return delete this.attributes[e],this.attributesVersion=(this.attributesVersion||0)+1,this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,s=0){this.groups.push({start:e,count:t,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const s=this.attributes.normal;s!==void 0&&(s.applyNormalMatrix(kn.getNormalMatrix(e)),s.needsUpdate=!0);const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return this.applyMatrix4(Ae.makeRotationFromQuaternion(e))}rotateX(e){return this.applyMatrix4(Ae.makeRotationX(e))}rotateY(e){return this.applyMatrix4(Ae.makeRotationY(e))}rotateZ(e){return this.applyMatrix4(Ae.makeRotationZ(e))}translate(e,t,s){return this.applyMatrix4(Ae.makeTranslation(e,t,s))}scale(e,t,s){return this.applyMatrix4(Ae.makeScale(e,t,s))}lookAt(e){return Ae.lookAt(e,We.set(0,0,0),new T(0,1,0)),ri.setFromRotationMatrix(Ae),this.applyQuaternion(ri)}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(zt).negate(),this.translate(zt.x,zt.y,zt.z)}setFromPoints(e){const t=[];for(const s of e)t.push(s.x,s.y,s.z||0);return this.setAttribute("position",new Pn(t,3))}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Me);const e=this.attributes.position;if(e===void 0){this.boundingBox.makeEmpty();return}this.boundingBox.setFromBufferAttribute(e)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ze);const e=this.attributes.position;if(e===void 0){this.boundingSphere.makeEmpty();return}const t=this.boundingSphere.center;Cn.setFromBufferAttribute(e).getCenter(t);let s=0;for(let i=0;i<e.count;i++)s=Math.max(s,t.distanceToSquared(We.fromBufferAttribute(e,i)));this.boundingSphere.radius=Math.sqrt(s)}computeTangents(){const e=this.index,t=this.attributes.position,s=this.attributes.normal,i=this.attributes.uv;if(e===null||t===void 0||s===void 0||i===void 0){console.error("BufferGeometry.computeTangents(): missing required attributes (index, position, normal or uv)");return}const r=t.count;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ue(new Float32Array(4*r),4));const a=this.getAttribute("tangent"),n=[],o=[];for(let P=0;P<r;P++)n[P]=new T,o[P]=new T;const l=new T,c=new T,f=new T,d=new q,u=new q,m=new q,p=new T,x=new T,y=(P,R,D)=>{l.fromBufferAttribute(t,P),c.fromBufferAttribute(t,R),f.fromBufferAttribute(t,D),d.fromBufferAttribute(i,P),u.fromBufferAttribute(i,R),m.fromBufferAttribute(i,D),c.sub(l),f.sub(l),u.sub(d),m.sub(d);const B=1/(u.x*m.y-m.x*u.y);isFinite(B)&&(p.copy(c).multiplyScalar(m.y).addScaledVector(f,-u.y).multiplyScalar(B),x.copy(f).multiplyScalar(u.x).addScaledVector(c,-m.x).multiplyScalar(B),n[P].add(p),n[R].add(p),n[D].add(p),o[P].add(x),o[R].add(x),o[D].add(x))},v=this.groups.length?this.groups:[{start:0,count:e.count}];for(const P of v)for(let R=P.start;R<P.start+P.count;R+=3)y(e.getX(R),e.getX(R+1),e.getX(R+2));const w=new T,M=new T,k=new T,z=new T,_=P=>{M.fromBufferAttribute(s,P),k.copy(M);const R=n[P];w.copy(R).sub(M.multiplyScalar(M.dot(R))).normalize(),z.crossVectors(k,R);const D=z.dot(o[P])<0?-1:1;a.setXYZW(P,w.x,w.y,w.z,D)};for(const P of v)for(let R=P.start;R<P.start+P.count;R++)_(e.getX(R))}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t===void 0)return;let s=this.getAttribute("normal");if(s===void 0||s.count!==t.count)s=new ue(new Float32Array(t.count*3),3),this.setAttribute("normal",s);else for(let d=0;d<s.count;d++)s.setXYZ(d,0,0,0);const i=new T,r=new T,a=new T,n=new T,o=new T,l=new T,c=new T,f=new T;if(e)for(let d=0,u=e.count;d<u;d+=3){const m=e.getX(d),p=e.getX(d+1),x=e.getX(d+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,p),a.fromBufferAttribute(t,x),n.subVectors(a,r),o.subVectors(i,r),n.cross(o),l.fromBufferAttribute(s,m),c.fromBufferAttribute(s,p),f.fromBufferAttribute(s,x),l.add(n),c.add(n),f.add(n),s.setXYZ(m,l.x,l.y,l.z),s.setXYZ(p,c.x,c.y,c.z),s.setXYZ(x,f.x,f.y,f.z)}else for(let d=0,u=t.count;d<u;d+=3)i.fromBufferAttribute(t,d),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),n.subVectors(a,r),o.subVectors(i,r),n.cross(o),s.setXYZ(d,n.x,n.y,n.z),s.setXYZ(d+1,n.x,n.y,n.z),s.setXYZ(d+2,n.x,n.y,n.z);this.normalizeNormals(),s.needsUpdate=!0}normalizeNormals(){const e=this.attributes.normal;for(let t=0,s=e.count;t<s;t++)We.fromBufferAttribute(e,t).normalize(),e.setXYZ(t,We.x,We.y,We.z)}toNonIndexed(){if(this.index===null)return console.warn("BufferGeometry.toNonIndexed(): geometry is already non-indexed."),this;const e=new Ze,t=this.index,s=i=>{const r=i.itemSize,a=new i.array.constructor(t.count*r);for(let n=0;n<t.count;n++){const o=t.getX(n);for(let l=0;l<r;l++)a[n*r+l]=i.array[i._idx(o,l)]}return new ue(a,r,i.normalized)};for(const i in this.attributes)e.setAttribute(i,s(this.attributes[i]));for(const i in this.morphAttributes)e.morphAttributes[i]=this.morphAttributes[i].map(s);e.morphTargetsRelative=this.morphTargetsRelative;for(const i of this.groups)e.addGroup(i.start,i.count,i.materialIndex);return e}clone(){return new Ze().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.name=e.name,e.index!==null&&this.setIndex(e.index.clone());for(const t in e.attributes)this.setAttribute(t,e.attributes[t].clone());for(const t in e.morphAttributes)this.morphAttributes[t]=e.morphAttributes[t].map(s=>s.clone());this.morphTargetsRelative=e.morphTargetsRelative;for(const t of e.groups)this.addGroup(t.start,t.count,t.materialIndex);return e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}Ze.prototype.isBufferGeometry=!0;class fs extends Ze{constructor(){super(),this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}clone(){return new fs().copy(this)}}fs.prototype.isInstancedBufferGeometry=!0;class ds extends J{constructor(e=new Ze,t=null){super(),this.type="Mesh",this.geometry=e,this.material=t,this.count=1}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this.count=e.count,this}}ds.prototype.isMesh=!0;const rt=new E,ni=new Me,ai=new ze;class ps extends ds{constructor(e,t,s){super(e,t),this.type="InstancedMesh",this.instanceMatrix=new dt(new Float32Array(s*16),16),this.instanceColor=null,this.count=s,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<s;i++)this.setMatrixAt(i,rt.identity())}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}getColorAt(e,t){return t.fromArray(this.instanceColor.array,e*3)}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new dt(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Me),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,rt),ni.copy(e.boundingBox).applyMatrix4(rt),this.boundingBox.union(ni)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new ze),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let t=0;t<this.count;t++)this.getMatrixAt(t,rt),ai.copy(e.boundingSphere).applyMatrix4(rt),this.boundingSphere.union(ai)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}clone(e){return new ps(this.geometry,this.material,this.count).copy(this,e)}dispose(){this.dispatchEvent({type:"dispose"})}}ps.prototype.isInstancedMesh=!0;const ke=new T,oi=new q,li=new q;class ms extends J{constructor(){super(),this.type="Camera",this.matrixWorldInverse=new E,this.projectionMatrix=new E,this.projectionMatrixInverse=new E,this.coordinateSystem=Ie,this.reversedDepth=!0}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this.reversedDepth=e.reversedDepth,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}ms.prototype.isCamera=!0;function er(h,e,t,s,i,r,a){h.view===null&&(h.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1});const n=h.view;n.enabled=!0,n.fullWidth=e,n.fullHeight=t,n.offsetX=s,n.offsetY=i,n.width=r,n.height=a,h.updateProjectionMatrix()}class is extends ms{constructor(e=50,t=1,s=.1,i=2e3){super(),this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=i,this.infiniteFar=!1,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.infiniteFar=e.infiniteFar,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Rs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){return .5*this.getFilmHeight()/Math.tan(Ot*.5*this.fov)}getEffectiveFOV(){return Rs*2*Math.atan(Math.tan(Ot*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,s){ke.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ke.x,ke.y).multiplyScalar(-e/ke.z),ke.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(ke.x,ke.y).multiplyScalar(-e/ke.z)}getViewSize(e,t){return this.getViewBounds(e,oi,li),t.subVectors(li,oi)}setViewOffset(e,t,s,i,r,a){this.aspect=e/t,er(this,e,t,s,i,r,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ot*.5*this.fov)/this.zoom,s=2*t,i=this.aspect*s,r=-.5*i;const a=this.view;if(a!==null&&a.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*s/c,i*=a.width/l,s*=a.height/c}const n=this.filmOffset;n!==0&&(r+=e*n/this.getFilmWidth());const o=this.infiniteFar?1/0:this.far;this.projectionMatrix.makePerspective(r,r+i,t,t-s,e,o,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}}is.prototype.isPerspectiveCamera=!0;class Rn extends ms{constructor(e=-1,t=1,s=1,i=-1,r=.1,a=2e3){super(),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=s,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,s,i,r,a){er(this,e,t,s,i,r,a)}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=s-e,a=s+e,n=i+t,o=i-t;const l=this.view;if(l!==null&&l.enabled){const c=(this.right-this.left)/l.fullWidth/this.zoom,f=(this.top-this.bottom)/l.fullHeight/this.zoom;r+=c*l.offsetX,a=r+c*l.width,n-=f*l.offsetY,o=n-f*l.height}this.projectionMatrix.makeOrthographic(r,a,n,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}}Rn.prototype.isOrthographicCamera=!0;const Nt=256;function Dn(){let h=7;const e=()=>(h=h*16807%2147483647)/2147483647,t=[];for(let i=0;i<44;i++){const r=2+Math.floor(Math.pow(e(),1.6)*26),a=(e()-.5)*(e()<.8?1.3:3),n=Math.round(Math.cos(a)*r),o=Math.round(Math.sin(a)*r);!n&&!o||t.push([n,o,Math.pow(Math.hypot(n,o),-.35)*(.6+e()*.8),e()*Math.PI*2])}const s=t.reduce((i,[,,r])=>i+r*r*.5,0);return t.map(([i,r,a,n])=>[i,r,a/Math.sqrt(s),n])}const Ge=h=>Number(h).toFixed(6),Bn=`
fn fragment(in: FSIn) -> vec4f {
  let p = in.uv * 6.28318531;
  var g = vec2f(0.0);
${Dn().map(([h,e,t,s])=>`  g += vec2f(${Ge(h)}, ${Ge(e)}) * (${Ge(-t/Math.hypot(h,e))} * sin(${Ge(h)} * p.x + ${Ge(e)} * p.y + ${Ge(s)}));`).join(`
`)}
  // slopes and their squares: averaged by the mips, E[s^2] - E[s]^2 is the variance a
  // coarser texel hides
  return vec4f(g, g * g);
}`;let ce=null,rs=null,ve=null,ns=null;const En=`
fn foamHash(p: vec2f) -> vec2f {
  let a = fract(p / 32.0) * 32.0;
  return fract(sin(vec2f(dot(a, vec2f(127.1, 311.7)), dot(a, vec2f(269.5, 183.3)))) * 43758.5453);
}
fn fragment(in: FSIn) -> vec4f {
  let q = in.uv * 32.0; let cell = floor(q); let f = fract(q);
  var d1 = 10.0; var d2 = 10.0;
  for (var y = -1; y <= 1; y++) { for (var x = -1; x <= 1; x++) {
    let b = vec2f(f32(x), f32(y)); let h = foamHash(cell + b);
    let r = b + 0.15 + h * 0.7 - f; let d = length(r);
    if (d < d1) { d2 = d1; d1 = d; } else { d2 = min(d2, d); }
  } }
  let wall = 1.0 - smoothstep(0.035, 0.13, d2 - d1);
  let small = 1.0 - smoothstep(0.05, 0.14, d1);
  let broad = q / 4.0; let ib = floor(broad); let fb = fract(broad);
  let ub = fb * fb * (3.0 - 2.0 * fb);
  // Continuous periodic coverage: a hard random value per cell made square
  // foam patches visible from a low drone camera.
  let coverage = mix(mix(foamHash(ib * 4.0).x, foamHash((ib + vec2f(1.0, 0.0)) * 4.0).x, ub.x),
    mix(foamHash((ib + vec2f(0.0, 1.0)) * 4.0).x, foamHash((ib + vec2f(1.0)) * 4.0).x, ub.x), ub.y);
  return vec4f(max(wall, small * 0.65), coverage, 0.0, 1.0);
}`;function In(){return ve||(ve=new G({label:"coastal foam cells",width:Nt,height:Nt,format:"rgba8unorm",mips:!0,usage:["sample","render","copyDst"]}),ve.ready=!1,ns=new re({label:"coastal foam cells",code:En,colorFormats:["rgba8unorm"]})),ve}function Ln(){return ce||(ce=new G({label:"water slopes",width:Nt,height:Nt,format:"rgba16float",mips:!0,usage:["sample","render","copyDst"]}),ce.ready=!1,rs=new re({label:"water slope tile",code:Bn,colorFormats:["rgba16float"]}),ce)}function Nn(){ve&&!ve.ready&&ns.handle.pipeline&&(ns.render({colorViews:[ve.view({baseMipLevel:0,mipLevelCount:1})]}),we(ve),ve.ready=!0),!(!ce||ce.ready||!rs.handle.pipeline)&&(rs.render({colorViews:[ce.view({baseMipLevel:0,mipLevelCount:1})]}),we(ce),ce.ready=!0)}const Fn=new ae({name:"complexWaterHelpers",code:`
fn waterFresnel(cosI: f32, eta: f32) -> f32 {
  let c = clamp(cosI, 0.0, 1.0);
  let g2 = eta * eta - 1.0 + c * c;
  let g = sqrt(max(g2, 0.0));
  let a = (g - c) / (g + c);
  let b = (c * (g + c) - 1.0) / (c * (g - c) + 1.0);
  return select(0.5 * (a * a) * (b * b + 1.0), 1.0, g2 < 0.0);
}
fn waterPhaseHG(cosT: f32, g: f32) -> f32 {
  let g2 = g * g;
  return ((1.0 - g2) / (4.0 * PI)) / pow(max(1.0 + g2 - cosT * 2.0 * g, 1e-4), 1.5);
}
// Slow value noise for a coast's character along it (WebGL's sceneWater.ts: the same).
fn waterHash(p: vec2f) -> f32 {
  var p3 = fract(vec3f(p.x, p.y, p.x) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
fn waterNoise(p: vec2f) -> f32 {
  let i = floor(p); let f = fract(p); let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(waterHash(i), waterHash(i + vec2f(1.0, 0.0)), u.x), mix(waterHash(i + vec2f(0.0, 1.0)), waterHash(i + vec2f(1.0, 1.0)), u.x), u.y);
}
fn waterDGGX(NdH: f32, a2: f32) -> f32 { let d = NdH * NdH * (a2 - 1.0) + 1.0; return a2 / (d * d * PI); }
fn waterVSmith(NdL: f32, NdV: f32, a2: f32) -> f32 {
  let gv = NdL * sqrt(NdV * NdV * (1.0 - a2) + a2);
  let gl = NdV * sqrt(NdL * NdL * (1.0 - a2) + a2);
  return 0.5 / max(gv + gl, 1e-5);
}
fn waterProject(pV: vec3f) -> vec2f {
  let c = frame.proj * vec4f(pV, 1.0);
  let n = c.xy / max(c.w, 1e-4);
  return vec2f(n.x * 0.5 + 0.5, 0.5 - n.y * 0.5);
}
fn waterDepthAt(uv: vec2f) -> f32 {
  let size = vec2f(textureDimensions(waterSceneDepth));
  return textureLoad(waterSceneDepth, vec2i(clamp(uv, vec2f(0.0), vec2f(0.9999)) * size), 0).x;
}
// linear view z (negative) of the opaque scene at uv
fn waterSceneZ(uv: vec2f) -> f32 { return -viewDepth(waterDepthAt(uv)); }

// Screen-space reflection (Tidewater _waterSSR, rescaled from a bay to a city block):
// geometric steps through the depth copy, then a bisection. Returns (colour, weight).
fn waterSSR(posV: vec3f, Rv: vec3f, y0: f32, wobble: vec2f) -> vec4f {
  var hit = false;
  let stepScale = max(-posV.z / 60.0, 1.0);
  var t = 0.2 * stepScale;
  var dt = 0.3 * stepScale;
  var prevT = 0.0;
  for (var i = 0; i < 18; i++) {
    prevT = t;
    if (prevT >= 1600.0) { break; }
    t += dt;
    dt *= 1.4;
    let p = posV + Rv * t;
    let uv = waterProject(p);
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0 || p.z > -0.1) { break; }
    let sz = waterSceneZ(uv);
    if (p.z < sz && sz - p.z < max(dt * 1.3, max(t * 0.08, 0.4))) { hit = true; break; }
  }
  if (!hit) { return vec4f(0.0); }
  var a = prevT; var b = t;
  for (var k = 0; k < 5; k++) {
    let m = (a + b) * 0.5;
    let behind = (posV + Rv * m).z < waterSceneZ(waterProject(posV + Rv * m));
    b = select(b, m, behind);
    a = select(m, a, behind);
  }
  let hitV = posV + Rv * b;
  let uv = waterProject(hitV);
  // a ray that only passed far behind a thin object is no hit
  let gap = abs(waterSceneZ(uv) - hitV.z);
  let touch = smoothstep(max(b * 0.05, 0.6), max(b * 0.02, 0.25), gap);
  let edge = smoothstep(0.0, 0.07, uv.x) * smoothstep(1.0, 0.93, uv.x) * smoothstep(0.0, 0.07, uv.y) * smoothstep(1.0, 0.93, uv.y);
  let facing = smoothstep(0.5, 0.1, Rv.z);
  // nothing at the water's own level is reflected (the banks' ground: false hits)
  let hitY = (frame.invView * vec4f(hitV, 1.0)).y;
  // A facet tilted by s turns the reflected ray by 2s: at the hit, b metres on, that is a
  // shift of 2s·b seen from b + the camera distance (uv, capped).
  let shift = clamp(wobble * (2.0 * b / (b - posV.z)), vec2f(-0.06), vec2f(0.06));
  let col = textureSampleLevel(waterSceneColor, smpLinearClamp, clamp(uv + shift, vec2f(0.0), vec2f(1.0)), 0.0).rgb;
  return vec4f(col, edge * facing * touch * smoothstep(1600.0, 900.0, b) * smoothstep(y0 + 0.3, y0 + 1.5, hitY));
}`});function Un({atmosphere:h,scene:e,quality:t}){const s=new Gi({name:"complex water",lit:!1,modules:[h,Fn],attributes:{aShore:"f32",aFlow:"vec2f",aSea:"f32"},varyings:{vShore:"f32",vFlow:"vec2f",vSea:"f32"},defines:{IS_WATER:1,WATER_SSR:t.ssr?1:0,WATER_CLOUDS:t.clouds?1:0},uniforms:{haze:["f32",5e-4],absorb:["vec3f",new T(.52,.26,.25)],scatter:["vec3f",new T(.09,.12,.12)],slope:["f32",.05],maxDepth:["f32",2.6]},bindings:{waterWaves:{texture:Ln()},waterFoam:{texture:In()},waterSceneColor:{texture:()=>e.textures[0]},waterSceneDepth:{texture:()=>e.depthTexture,sampleType:"unfilterable-float"}},vertex:"o.vShore = v.aShore; o.vFlow = v.aFlow; o.vSea = v.aSea;",output:On});return s.lightingHooks=!1,s.userData.water=!0,s}const On=`
  let P = in.P;
  let screenUV = in.pixel * frame.invResolution;
  let toCam = frame.cameraPos - P;
  let dist = length(toCam);
  let V = toCam / dist;
  let shore = in.vs.vShore;
  let sea = clamp(in.vs.vSea, 0.0, 1.0);
  // how open the sea is to the swell in front of this shore (waterCore.ts: aSea - 1 is how shut in)
  let expo = 1.0 - clamp(in.vs.vSea - 1.0, 0.0, 1.0) * sea;
  // A rotating frame multiplied by world position stretches waves into coastal streaks.
  // All sea patches share one swell frame; shore-distance alone bends the breaking crests.
  let flow = normalize(mix(in.vs.vFlow, vec2f(-0.6, 0.8), sea) + vec2f(1e-5, 0.0));
  let side = vec2f(-flow.y, flow.x);
  // metres along / across the channel (the sea: in units of its longer swell, slower)
  let swell = mix(1.0, 3.2, sea);
  let q = vec2f(dot(P.xz, flow), dot(P.xz, side)) / swell;
  let t = frame.time / mix(1.0, 1.7, sea);
  let footprint = max(length(fwidth(q)), 1e-4);

  // Three layers of one slope tile: sizes, turns and drift (current + phase speed) differ,
  // so the pattern never repeats or slides as one sheet. Sampled in uniform control flow.
  let c1 = 0.8253; let s1 = 0.5646;   // 34.4 deg
  let c2 = 0.4536; let s2 = -0.8912;  // -63 deg
  let q2 = vec2f(c1 * q.x - s1 * q.y, s1 * q.x + c1 * q.y);
  let q3 = vec2f(c2 * q.x - s2 * q.y, s2 * q.x + c2 * q.y);
  let w1 = textureSample(waterWaves, smpAnisoRepeat, (q + vec2f(t * 0.62, 0.0)) / 13.0);
  let w2 = textureSample(waterWaves, smpAnisoRepeat, (q2 + vec2f(t * 0.41, t * 0.06)) / 5.3);
  let w3 = textureSample(waterWaves, smpAnisoRepeat, (q3 + vec2f(t * 0.26, -t * 0.05)) / 1.9);
  // calmer against the banks; the finest ripples only where a pixel can show them
  let calm = mix(mix(0.35, 1.0, smoothstep(0.0, 4.0, shore)), mix(0.85, 1.0, smoothstep(0.0, 12.0, shore)) * mix(0.55, 1.0, expo), sea);
  let near3 = smoothstep(0.09, 0.025, footprint);
  let slopeK = mix(mat.slope, 0.082, sea);
  let a1 = slopeK * calm; let a2 = slopeK * 0.75 * calm; let a3 = slopeK * 0.6 * calm;
  // back from each layer's turned frame into the channel frame
  let g2 = vec2f(c1 * w2.x + s1 * w2.y, -s1 * w2.x + c1 * w2.y);
  let g3 = vec2f(c2 * w3.x + s2 * w3.y, -s2 * w3.x + c2 * w3.y);
  let gq = w1.xy * a1 + g2 * a2 + g3 * (a3 * near3);
  let gW = gq.x * flow + gq.y * side;
  // unresolved slope variance (LEAN): what the mips averaged away, and the faded layer
  let v1 = max(w1.zw - w1.xy * w1.xy, vec2f(0.0));
  let v2 = max(w2.zw - w2.xy * w2.xy, vec2f(0.0));
  let v3 = max(w3.zw - w3.xy * w3.xy, vec2f(0.0));
  let variance = (v1.x + v1.y) * a1 * a1 + (v2.x + v2.y) * a2 * a2 + ((v3.x + v3.y) * near3 + (1.0 - near3)) * a3 * a3;
  // Specular anti-aliasing (Kaplanyan & Hoffman): slopes that change between neighbouring
  // pixels are unresolvable; their spread joins the roughness, and the reflected direction
  // uses the slope with that spread filtered out (no TAA here to average the noise).
  let dG = fwidth(gW);
  let aa = min(dot(dG, dG), 0.08);
  let varAll = variance + aa * 0.5;
  let gR = gW / (1.0 + aa * 150.0);
  let N = normalize(vec3f(-gR.x, 1.0, -gR.y));
  let alpha2 = 0.0008 + varAll * 2.0;

  let NdV = max(dot(N, V), 1e-4);
  let F = waterFresnel(NdV, 1.333);
  let L = frame.sunDir;
  let sunLight = frame.sunColor * sunShadow(P, vec3f(0.0, 1.0, 0.0), in.pixel);

  // ---- reflection: sky (with its clouds), then the city from the screen
  let Rraw = reflect(-V, N);
  // unresolved facets tilt the mean reflection up toward the darker sky (Tidewater)
  let Rup = max(Rraw.y, 0.004) + sqrt(varAll) * 1.3 * (1.0 - max(Rraw.y, 0.0));
  let R = normalize(vec3f(Rraw.x, Rup, Rraw.z));
#if WATER_CLOUDS
  var sky = skyClouds(R);
#else
  var sky = skyBase(R);
#endif
  var refl = mix(frame.horizonColor * 0.35, sky, smoothstep(-0.12, 0.08, Rraw.y));
  let posV = (frame.view * vec4f(P, 1.0)).xyz;
#if WATER_SSR
  // Estimated coastal terrain produces false reflected blocks at the sand/water
  // contact. In breaking shallows use the continuous sky reflection; restore city
  // reflections smoothly beyond the surf, without changing rivers or open sea.
  let coastReflection = mix(1.0, smoothstep(36.0, 80.0, shore), sea);
  if (F > 0.03 && coastReflection > 0.0) {
    // Marched off the mean (flat) surface: per-pixel ripples would send neighbouring rays
    // past different edges (speckle, with no temporal filter to average it). The ripples
    // distort the image instead, like a rippled mirror: a screen offset along the tilt.
    let Rv = normalize((frame.view * vec4f(reflect(-V, vec3f(0.0, 1.0, 0.0)), 0.0)).xyz);
    if (Rv.z < 0.5) {
      let tilt = (frame.view * vec4f(N.x, 0.0, N.z, 0.0)).xy;
      let hit = waterSSR(posV, Rv, P.y, tilt * vec2f(frame.proj[0][0], -frame.proj[1][1]) * 0.5);
      refl = mix(refl, hit.rgb, hit.a * coastReflection);
    }
  }
#endif

  // ---- sun glint (GGX; the sun light carries its shadow)
  let H = normalize(L + V);
  let NdL = max(dot(N, L), 0.0);
  let spec = waterDGGX(max(dot(N, H), 0.0), alpha2) * waterVSmith(NdL, NdV, alpha2) * waterFresnel(max(dot(V, H), 0.0), 1.333) * NdL;
  let glint = sunLight * min(spec, 60.0);

  // ---- the water body along the refracted view ray
  // No survey of the bed exists: a bank sloping ~1:3 to a modest depth, so the shallows
  // show the ground and the channel reads deep.
  let depth = mix(min(mat.maxDepth, shore * 0.33), min(28.0, 0.2 + shore * 0.055), sea);
  let Tr = refract(-V, N, 1.0 / 1.333);
  let Tv = normalize(vec3f(Tr.x, min(Tr.y, -0.08), Tr.z));
  let pathLen = depth / max(-Tv.y, 0.06);
  // the ground seen through it, displaced along the refracted ray (only if it lies behind)
  let pEndV = (frame.view * vec4f(P + Tv * min(pathLen, 12.0), 1.0)).xyz;
  let uvR = waterProject(pEndV);
  let onScreen = all(uvR > vec2f(0.0)) && all(uvR < vec2f(1.0));
  let valid = onScreen && waterSceneZ(uvR) < posV.z - 0.05;
  let uvBed = select(screenUV, uvR, valid);
  // wet silt: the painted bank ground, darkened
  let bedRaw = textureSampleLevel(waterSceneColor, smpLinearClamp, uvBed, 0.0).rgb;
  // The open sea has no surveyed bed. A constant lit sand estimate must replace the
  // opaque terrain tiles below it: their presence/absence otherwise paints a grid in the sea.
  // Keep the actual ground colour in the coastal shallows.
  let bedLight = frame.skyIrradiance * 0.48 + frame.sunColor * max(L.y, 0.0) * 0.22;
  let shallowSand = vec3f(0.58, 0.52, 0.38) * bedLight;
  let deepSand = vec3f(0.39, 0.43, 0.38) * bedLight;
  let bedSea = mix(shallowSand, deepSand, smoothstep(0.4, 7.0, depth));
  let bed = mix(bedRaw * vec3f(0.62, 0.6, 0.52), bedSea, sea);
  // (clear coastal water: red goes first, then green; a little blue-green scattering)
  let sigA = mix(mat.absorb, vec3f(0.38, 0.085, 0.055), sea); let sigS = mix(mat.scatter, vec3f(0.012, 0.030, 0.038), sea); let sigT = sigA + sigS;
  let Tview = exp(-sigT * pathLen);
  // single scattering (sun, Henyey-Greenstein) + ambient, integrated analytically
  let Ls = -refract(-L, vec3f(0.0, 1.0, 0.0), 1.0 / 1.333);
  let muS = max(Ls.y, 0.1);
  let muV = max(-Tv.y, 0.15);
  let sunIn = sunLight * (1.0 - waterFresnel(max(L.y, 0.02), 1.333));
  let kSun = sigT * (1.0 + muV / muS);
  let kAmb = sigT * (1.0 + muV / 0.75);
  let phase = waterPhaseHG(dot(Tv, Ls), 0.8) * 0.7 + 0.0239;
  let inSun = sunIn * sigS * phase * (1.0 - exp(-kSun * pathLen)) / kSun;
  let inAmb = frame.skyIrradiance * sigS * 0.5 * (1.0 - exp(-kAmb * pathLen)) / kAmb;
  let transmitted = bed * Tview + inSun + inAmb;

  var col = mix(transmitted, refl, F) + glint;
  // The sea's surf: crests running in (along the flow, toward the shore) break white near it, torn
  // by the swell; the swash line at the water's edge comes and goes. Only as much as the shore is
  // open to the sea (expo: a beach facing it full, a cove or a harbour hardly), and each stretch of
  // coast its own — crest spacing, speed, the timing and size of its sets vary slowly along it.
  let foamUV = P.xz / 8.0 + flow * frame.time * 0.012;
  let foamLOD = max(0.0, log2(max(length(fwidth(foamUV)) * 256.0, 1.0)));
  let shoreAA = max(fwidth(shore), 0.08);
  var foam = 0.0;
  if (sea > 0.5 && shore < 42.0) {
    // Explicit LOD keeps this narrow coastal branch legal and antialiased.
    let cells = textureSampleLevel(waterFoam, smpAnisoRepeat, foamUV, foamLOD).rg;
    let patchiness = clamp(0.6 + w1.y * 0.14 + w2.x * 0.12, 0.2, 1.0);
    let nA = waterNoise(P.xz / 140.0);
    let nB = waterNoise(P.xz / 330.0 + vec2f(17.0, 5.0));
    let spacing = mix(8.5, 15.0, nA);
    let speed = mix(0.09, 0.16, nB);
    let sets = 0.45 + 0.55 * smoothstep(-0.4, 0.9, sin(frame.time * mix(0.16, 0.27, nA) + nB * 6.2832 + dot(P.xz, flow) * 0.002));
    let width = mix(5.0, 36.0, expo) * mix(0.75, 1.15, nB);
    let phase = fract(shore / spacing + frame.time * speed + nA * 2.7 + w1.x * 0.025);
    let aaPhase = min(0.06, shoreAA / spacing);
    let front = 1.0 - smoothstep(0.018, 0.06 + aaPhase, min(phase, 1.0 - phase));
    let wake = smoothstep(0.015, 0.06 + aaPhase, phase) * (1.0 - smoothstep(0.09, 0.29, phase));
    let surf = (1.0 - smoothstep(width * 0.45, width, shore)) * smoothstep(0.0, 0.65, shore) * pow(expo, 0.8) * sets;
    let lace = cells.r * mix(0.38, 0.85, cells.g);
    let broken = smoothstep(0.12, 0.62, cells.g);
    let breaking = (front * (0.06 + 0.94 * lace) + wake * lace * 0.72) * broken * patchiness * surf;
    let reach = (0.9 + 0.85 * (0.5 + 0.5 * sin(frame.time * mix(0.6, 1.0, nB) + nA * 6.2832 + w1.x * 0.15))) * mix(0.35, 1.0, expo);
    let swash = (1.0 - smoothstep(reach, reach + 0.5 + shoreAA, shore)) * (0.2 + 0.7 * lace) * mix(0.3, 1.0, expo);
    foam = clamp(breaking + swash, 0.0, 0.94);
  }
  let foamLit = (sunLight * max(L.y, 0.0) + frame.skyIrradiance) * 0.46;
  col = mix(col, foamLit, foam);
  // haze, as on every other surface
  let fog = 1.0 - exp(-dist * mat.haze);
  col = mix(col, frame.horizonColor, clamp(fog, 0.0, 0.9));
  // the waterline: into the ground within the first metre (no hard polygon edge)
  let ground = textureSampleLevel(waterSceneColor, smpLinearClamp, screenUV, 0.0).rgb;
  // Sea shallows meet damp sand. Sampling lawn-painted terrain here leaked green
  // triangles into the surf, especially when coarse shore distance became zero.
  let edgeBed = mix(ground * 0.8, shallowSand * 0.85, sea);
  col = mix(edgeBed, col, smoothstep(0.0, 0.65, shore));
  r.color = vec4f(min(col, vec3f(64.0)), 1.0);
`;class Vn{constructor(e,t=()=>performance.now()){this.device=e,this.now=t,this.failure=null,this.pendingAt=null,this.nextProbeAt=0,this.disposed=!1,this.onError=()=>{this.failure="gpu-validation"},e.addEventListener("uncapturederror",this.onError)}check(){if(this.pendingAt!==null&&this.now()-this.pendingAt>8e3&&(this.failure="gpu-submit-timeout"),this.failure)throw new Error(this.failure)}submitted(){const e=this.now();this.disposed||this.pendingAt!==null||e<this.nextProbeAt||(this.pendingAt=e,this.nextProbeAt=e+1e3,this.device.queue.onSubmittedWorkDone().then(()=>{this.disposed||(this.pendingAt=null)},()=>{this.disposed||(this.failure="gpu-submit-rejected")}))}dispose(){this.disposed=!0,this.device.removeEventListener("uncapturederror",this.onError)}}const Pt=32;class Wn{constructor({interval:e=7}={}){this.enabled=!!g.hasTimestamp,this.ms={},this.last={},this.samples=0,this.interval=Math.max(1,Math.floor(e)),this.frame=0,this.active=!0,this.enabled&&(this.set=g.device.createQuerySet({type:"timestamp",count:Pt*2}),this.resolve=g.device.createBuffer({size:Pt*16,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),this.staging=[0,1,2].map(()=>({buffer:g.device.createBuffer({size:Pt*16,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),busy:!1,labels:null})),this.labels=[])}begin(){this.labels=[],this.active=this.frame++%this.interval===0}pass(e){if(!this.enabled||!this.active||this.labels.length>=Pt)return;const t=this.labels.push(e)-1;return{querySet:this.set,beginningOfPassWriteIndex:t*2,endOfPassWriteIndex:t*2+1}}end(e){if(!this.enabled||!this.labels.length)return null;const t=this.staging.find(i=>!i.busy);if(!t)return null;const s=this.labels.length;return e.resolveQuerySet(this.set,0,s*2,this.resolve,0),e.copyBufferToBuffer(this.resolve,0,t.buffer,0,s*16),t.busy=!0,t.labels=this.labels,()=>t.buffer.mapAsync(GPUMapMode.READ,0,s*16).then(()=>{const i=new BigInt64Array(t.buffer.getMappedRange(0,s*16)),r={};let a=0,n=null,o=null;t.labels.forEach((c,f)=>{const d=Math.max(0,Number(i[f*2+1]-i[f*2])/1e6);if(d<1e3){r[c]=(r[c]??0)+d,a+=d;const u=i[f*2],m=i[f*2+1];(n===null||u<n)&&(n=u),(o===null||m>o)&&(o=m)}}),t.buffer.unmap(),t.busy=!1,r.passes=a,r.total=n===null?0:Math.max(a,Number(o-n)/1e6),r.other=Math.max(0,r.total-a),this.last=r;const l=this.samples++<5?.5:.1;for(const c in this.ms)c in r||(r[c]=0);for(const c in r)this.ms[c]=(this.ms[c]??r[c])*(1-l)+r[c]*l}).catch(()=>{t.busy=!1})}dispose(){this.enabled&&(this.set.destroy(),this.resolve.destroy(),this.staging.forEach(e=>e.buffer.destroy()))}}const Gn=h=>`
fn aoView(ip: vec2i, size: vec2f) -> vec3f {
  let q = clamp(ip, vec2i(0), vec2i(size) - 1);
  return viewFromDepth((vec2f(q) + 0.5) / size, max(textureLoad(sceneDepth, q, 0).x, 1e-6));
}
fn aoStore(in: FSIn, value: f32, distance: f32) -> vec4f {
  let full = vec2f(textureDimensions(sceneDepth));
  let halfSize = vec2f((vec2i(full) + 1) / 2);
  // Match the original blur's explicit neighbour-coordinate arithmetic, which
  // need not round to the same depth texel as a rasterised UV at odd sizes.
  let q = vec2i((floor(in.pos.xy) + 0.5) / halfSize * full);
  let z = viewDepth(max(textureLoad(sceneDepth, q, 0).x, 1e-6));
  return vec4f(bitcast<f32>(pack2x16float(vec2f(value, distance))), z, 0.0, 1.0);
}
fn fragment(in: FSIn) -> vec4f {
  let size = vec2f(textureDimensions(sceneDepth));
  let ip = vec2i(in.uv * size);
  let d = textureLoad(sceneDepth, ip, 0).x;
  if (d <= 0.0) { return aoStore(in, 1.0, 60000.0); }
  let P = aoView(ip, size);
  let l = aoView(ip - vec2i(1, 0), size); let r = aoView(ip + vec2i(1, 0), size);
  let u = aoView(ip - vec2i(0, 1), size); let b = aoView(ip + vec2i(0, 1), size);
  let dx = select(P - l, r - P, abs(r.z - P.z) < abs(P.z - l.z));
  let dy = select(P - u, b - P, abs(b.z - P.z) < abs(P.z - u.z));
  var N = normalize(cross(dx, dy));
  if (dot(N, P) > 0.0) { N = -N; }
  let dist = -P.z;
  let R = clamp(dist * 0.035, 0.7, 9.0);
  let rPx = R * frame.proj[1][1] * 0.5 * size.y / dist;
  if (rPx < 1.5) { return aoStore(in, 1.0, dist); }
  let ign = fract(52.9829189 * fract(dot(in.pos.xy, vec2f(0.06711056, 0.00583715))));
  var occ = 0.0;
  let COUNT = 12;
  for (var i = 0; i < COUNT; i++) {
    let t = (f32(i) + ign) / f32(COUNT);
    let a = t * 18.8495559 + ign * 6.2831853;
    let o = vec2f(cos(a), sin(a)) * rPx * (0.12 + 0.88 * t * t);
    let S = aoView(ip + vec2i(o), size);
    let v = S - P;
    let vv = dot(v, v);
    let fall = sat(1.0 - vv / (R * R));
    occ += sat(dot(v, N) * inverseSqrt(vv + 1e-4) - 0.08) * fall;
  }
  let ao = sat(1.0 - occ / f32(COUNT) * 2.2);
  return aoStore(in, ao * ao, dist);
}`,hi=(h,e)=>`
fn fragment(in: FSIn) -> vec4f {
  let size = vec2f(textureDimensions(aoSrc));
  let ip = vec2i(in.uv * size);
  let full = vec2f(textureDimensions(sceneDepth));
  let z0 = viewDepth(max(textureLoad(sceneDepth, vec2i(in.uv * full), 0).x, 1e-6));
  let center = textureLoad(aoSrc, ip, 0); let centerAO = unpack2x16float(bitcast<u32>(center.r));
  var sum = 0.0; var wsum = 0.0;
  for (var i = -3; i <= 3; i++) {
    let q = clamp(ip + ${h===0?"vec2i(i, 0)":"vec2i(0, i)"}, vec2i(0), vec2i(size) - 1);
    let texel = textureLoad(aoSrc, q, 0); let z = texel.g;
    let dz = (z - z0) / (z0 * 0.03 + 0.05);
    let w = exp(-f32(i * i) / 8.0) * exp(-dz * dz);
    sum += unpack2x16float(bitcast<u32>(texel.r)).x * w; wsum += w;
  }
  ${h===0?"return vec4f(bitcast<f32>(pack2x16float(vec2f(sum / max(wsum, 1e-4), centerAO.y))), center.g, 0.0, 1.0);":"return vec4f(sum / max(wsum, 1e-4), centerAO.y, 0.0, 1.0);"}
}`,qn=()=>[-1,0,1].flatMap(h=>[-1,0,1].map(e=>`{
  let q = ${e===0&&h===0?"centerY":`taaY(taaTm(textureLoad(src, clamp(p + vec2i(${e}, ${h}), vec2i(0), size - 1), 0).rgb))`};
  m1 += q; m2 += q * q;
}`)).join(`
`),ft=new Map,At=new Map;function tr(h,e,t){const s=["A","B"].slice(0,t),i=g.device.createShaderModule({label:"texture pack",code:`
    @vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
      let p = vec2f(f32((i << 1u) & 2u), f32(i & 2u));
      return vec4f(p * 2.0 - 1.0, 0.0, 1.0);
    }
    ${s.map((r,a)=>`@group(0) @binding(${a}) var src${r}: texture_2d<f32>;`).join(`
`)}
    @fragment fn fs(@builtin(position) pos: vec4f) -> @location(0) vec4f {
      let at = vec2i(pos.xy);
      ${s.map(r=>`let ${r} = textureLoad(src${r}, at, 0);`).join(" ")}
      return ${e};
    }
  `});return{label:"texture pack "+h,layout:"auto",vertex:{module:i,entryPoint:"vs"},fragment:{module:i,entryPoint:"fs",targets:[{format:h}]},primitive:{topology:"triangle-list"}}}function $n(h,e,t){const s=`${h}|${t}|${e}`;let i=ft.get(s);return i||(i=g.device.createRenderPipeline(tr(h,e,t)),ft.set(s,i),i)}function ci(h,e,t){const s=`${h}|${t}|${e}`;return ft.has(s)?Promise.resolve():(At.has(s)||At.set(s,g.device.createRenderPipelineAsync(tr(h,e,t)).then(i=>{ft.has(s)||ft.set(s,i)}).finally(()=>At.delete(s))),At.get(s))}function ui(h,e,t){const s=[h.width,h.height],i=e.map(({img:l,flipY:c,texture:f})=>{if(f)return f;const d=g.device.createTexture({label:"pack source",size:s,format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});return g.queue.copyExternalImageToTexture({source:l,flipY:c},{texture:d},s),d}),r=$n(h.format,t,e.length),a=g.device.createBindGroup({layout:r.getBindGroupLayout(0),entries:i.map((l,c)=>({binding:c,resource:l.createView()}))}),n=g.getEncoder(),o=n.beginRenderPass({label:"texture pack",colorAttachments:[{view:h.getGPU().createView({baseMipLevel:0,mipLevelCount:1}),loadOp:"clear",storeOp:"store",clearValue:[0,0,0,0]}]});o.setPipeline(r),o.setBindGroup(0,a),o.draw(3),o.end(),we(h,n),g.onSubmit(null,()=>i.forEach((l,c)=>{e[c].texture||l.destroy()}))}class Hn{constructor(){this.entries=new Map,this.byTexture=new Map}peek(e){var t;return(t=this.entries.get(e))==null?void 0:t.texture}acquire(e,t,s){let i=this.entries.get(e);return!i&&s&&(i={key:e,texture:s(),owners:new Set},this.entries.set(e,i),this.byTexture.set(i.texture,i)),i?(i.owners.add(t),i.texture):null}has(e){return this.byTexture.has(e)}release(e,t){const s=this.byTexture.get(e);s&&(s.owners.delete(t),!s.owners.size&&(this.entries.delete(s.key),this.byTexture.delete(e),e.destroy()))}releaseOwner(e){for(const t of this.byTexture.keys())this.release(t,e)}}const fi=new WeakMap;function Yn(h){let e=fi.get(h);return e||(e=new Hn,fi.set(h,e)),e}let sr=null,jn=null;const Xn=()=>sr;function Kn(h){if(!g.device||jn!==g.device||!sr)return!1}function kt(h,{flipY:e=!1,srgb:t=!0,into:s=null,readback:i=null,staged:r=null}={}){const a=r?r.width:h.width,n=r?r.height:h.height,o=r??new G({label:"bc7 source",width:a,height:n,format:"rgba8unorm",mips:!0,usage:["sample","render","copyDst"]});r||g.queue.copyExternalImageToTexture({source:h,flipY:e},{texture:o.getGPU()},[a,n]);const l=g.getEncoder();we(o,l);const c=s??new G({label:"bc7",width:a,height:n,format:t?"bc7-rgba-unorm-srgb":"bc7-rgba-unorm",mips:!0,usage:["sample","copyDst"]}),f=Xn(),d=[];for(let u=0;u<o.mipLevelCount;u++){const m=Math.max(1,a>>u),p=Math.max(1,n>>u),x=Math.ceil(m/4),y=Math.ceil(p/4),v=Math.ceil(x*16/256)*256,w=g.device.createBuffer({label:"bc7 blocks",size:v*y,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC}),M=g.device.createBuffer({label:"bc7 params",size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});g.queue.writeBuffer(M,0,new Uint32Array([x,y,v/4,m,p,0,0,0]));const k=g.device.createBindGroup({layout:f.getBindGroupLayout(0),entries:[{binding:0,resource:o.getGPU().createView({baseMipLevel:u,mipLevelCount:1})},{binding:1,resource:{buffer:w}},{binding:2,resource:{buffer:M}}]}),z=l.beginComputePass({label:"bc7 encode"});if(z.setPipeline(f),z.setBindGroup(0,k),z.dispatchWorkgroups(Math.ceil(x/8),Math.ceil(y/8)),z.end(),l.copyBufferToTexture({buffer:w,bytesPerRow:v,rowsPerImage:y},{texture:c.getGPU(),mipLevel:u},{width:x*4,height:y*4}),d.push(w,M),i&&u===0){const _=g.device.createBuffer({size:v*y,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST});l.copyBufferToBuffer(w,0,_,0,v*y),g.onSubmit(null,()=>_.mapAsync(GPUMapMode.READ).then(()=>{const P=new Uint8Array(_.getMappedRange()),R=new Uint8Array(x*16*y);for(let D=0;D<y;D++)R.set(P.subarray(D*v,D*v+x*16),D*x*16);_.unmap(),_.destroy(),i(R)}))}}return g.onSubmit(null,()=>{d.forEach(u=>u.destroy()),o.destroy()}),c}let Ye=!1,di=!1;function Zn(){Ye=!0}const Jn=()=>new Promise(h=>{typeof requestIdleCallback=="function"?requestIdleCallback(()=>h(),{timeout:3e3}):setTimeout(h,60)}),Qn=h=>new Promise(e=>setTimeout(e,h));function ea(h=4e3){di||(di=!0,(async()=>{var f,d;if(await Qn(h),Ye||!g.device||(d=(f=g.adapter)==null?void 0:f.info)!=null&&d.isFallbackAdapter)return;const e=await fetch("/3d/pipelines.json",{priority:"low"}).catch(()=>null);if(!(e!=null&&e.ok)||Ye)return;const t=await e.json().catch(()=>null);if(!(t!=null&&t.pipelines)||Ye)return;const s=g.device,i=new Map,r=new Map,a=new Map,n=u=>(i.has(u)||i.set(u,s.createShaderModule({code:t.modules[u]})),i.get(u)),o=u=>(r.has(u)||r.set(u,s.createBindGroupLayout(t.bgls[u])),r.get(u)),l=u=>(a.has(u)||a.set(u,s.createPipelineLayout({bindGroupLayouts:t.layouts[u].map(o)})),a.get(u)),c=u=>u&&{...u,module:n(u.module)};for(const u of t.pipelines){if(await Jn(),Ye||g.device!==s)return;for(;document.hidden;)await new Promise(x=>document.addEventListener("visibilitychange",x,{once:!0}));if(Ye)return;s.pushErrorScope("validation");let m=null;try{m={layout:u.layout==="auto"?"auto":l(u.layout),vertex:c(u.vertex),primitive:u.primitive,depthStencil:u.depthStencil,multisample:u.multisample},u.fragment&&(m.fragment=c(u.fragment))}catch{m=null}const p=await s.popErrorScope().catch(()=>null);!m||p||await s.createRenderPipelineAsync(m).catch(()=>null)}})().catch(()=>{}))}function ta(h,e,t){const s=new Set;for(const r of e)for(const a of Array.isArray(r.material)?r.material:[r.material])s.add(a);let i=0;for(const r of h)s.has(r)?h[i++]=r:t(r);h.length=i}function pi(h,e){const t=Array.isArray(e);return t!==Array.isArray(h)?!1:t?h.length===e.length&&h.every((s,i)=>s.source===e[i]&&s.srcVersion===e[i].version):h.source===e&&h.srcVersion===e.version}function sa(h){var t;const e=new Set;for(const s of h)for(const i of Object.values(s.bindings))(t=i==null?void 0:i.texture)!=null&&t.isTexture&&e.add(i.texture);return e}function ia(h){const e=Object.getPrototypeOf(h).updateMatrixWorld,t=(s,i)=>{if(s.updateMatrixWorld!==e){s.updateMatrixWorld(i);return}if(s.matrixAutoUpdate){const a=s.position,n=s.quaternion,o=s.scale,l=s.__trs;if(s.pivot||!l||l[0]!==a.x||l[1]!==a.y||l[2]!==a.z||l[3]!==n.x||l[4]!==n.y||l[5]!==n.z||l[6]!==n.w||l[7]!==o.x||l[8]!==o.y||l[9]!==o.z){s.updateMatrix();const c=s.__trs??(s.__trs=new Float64Array(10));c[0]=a.x,c[1]=a.y,c[2]=a.z,c[3]=n.x,c[4]=n.y,c[5]=n.z,c[6]=n.w,c[7]=o.x,c[8]=o.y,c[9]=o.z}}(s.matrixWorldNeedsUpdate||i)&&(s.matrixWorldAutoUpdate===!0&&(s.parent===null?s.matrixWorld.copy(s.matrix):s.matrixWorld.multiplyMatrices(s.parent.matrixWorld,s.matrix)),s.matrixWorldNeedsUpdate=!1,i=!0);const r=s.children;for(let a=0,n=r.length;a<n;a++)t(r[a],i)};t(h,!1)}const Ct=[];function ra(h,e){Ct.length=0;for(let s=h;s;s=s.parent)Ct.push(s);let t=!1;for(let s=Ct.length-1;s>=0;s--){const i=Ct[s];if(i.updateMatrixWorld!==e){i.updateWorldMatrix(!1,!1),t=!0;continue}if(i.matrixAutoUpdate){const r=i.position,a=i.quaternion,n=i.scale,o=i.__trs;if(i.pivot||!o||o[0]!==r.x||o[1]!==r.y||o[2]!==r.z||o[3]!==a.x||o[4]!==a.y||o[5]!==a.z||o[6]!==a.w||o[7]!==n.x||o[8]!==n.y||o[9]!==n.z){i.updateMatrix();const l=i.__trs??(i.__trs=new Float64Array(10));l[0]=r.x,l[1]=r.y,l[2]=r.z,l[3]=a.x,l[4]=a.y,l[5]=a.z,l[6]=a.w,l[7]=n.x,l[8]=n.y,l[9]=n.z}}(i.matrixWorldNeedsUpdate||t)&&(i.matrixWorldAutoUpdate===!0&&(i.parent===null?i.matrixWorld.copy(i.matrix):i.matrixWorld.multiplyMatrices(i.parent.matrixWorld,i.matrix)),i.matrixWorldNeedsUpdate=!1,t=!0)}}const na=`{
  let f = in.vs.facade;
  let kind = floor((f.x % 32.0) / 8.0);
  let finish = f.x % 8.0;
  let variant = floor(f.y % 8.0);
  let buildingSeed = fract(f.y) * 8192.0;
  let windowLayout = floor(f.y / 8.0);
  let q = fract(in.uv);
  let footprint = max(fwidth(in.uv), vec2f(0.0001));
  let distant = smoothstep(0.15, 0.7, max(footprint.x, footprint.y));
  let up = smoothstep(0.5, 0.8, abs(in.N.y));
  let plain = select(1.0, 0.0, f.x < 32.0) + up;
  var paint = in.color.rgb;
  var rough = select(0.82, 0.9, up > 0.5);
  var metal = 0.0;
  if (up < 0.5 && finish > 0.5 && finish < 1.5) {
    let brickUV = in.uv * vec2f(f.z / 0.24, f.w / 0.075);
    let row = floor(brickUV.y);
    let brick = fract(brickUV + vec2f((row % 2.0) * 0.5, 0.0));
    let aa = max(fwidth(brickUV), vec2f(0.001));
    let edge = min(brick, 1.0 - brick);
    let joint = 1.0 - smoothstep(0.025 - aa.x, 0.025 + aa.x, edge.x) * smoothstep(0.055 - aa.y, 0.055 + aa.y, edge.y);
    let visibility = 1.0 - smoothstep(0.2, 0.7, max(aa.x, aa.y));
    paint = mix(paint, vec3f(0.38, 0.36, 0.32), joint * visibility * 0.5);
    rough = 0.92;
  } else if (up < 0.5 && finish > 1.5 && finish < 3.5) {
    let panelUV = in.uv * vec2f(f.z / select(1.2, 0.65, finish > 2.5), f.w / 1.0);
    let panel = fract(panelUV);
    let aa = max(fwidth(panelUV), vec2f(0.001));
    let edge = min(panel, 1.0 - panel);
    let joint = 1.0 - smoothstep(0.007 - aa.x, 0.007 + aa.x, edge.x) * smoothstep(0.007 - aa.y, 0.007 + aa.y, edge.y);
    paint *= 1.0 - joint * 0.22 * (1.0 - smoothstep(0.25, 0.8, max(aa.x, aa.y)));
    rough = select(0.6, 0.32, finish > 2.5);
    metal = select(0.0, 0.62, finish > 2.5);
  }
  var width = select(0.31, 0.36, kind < 0.5);
  var height = select(0.27, 0.31, kind < 0.5);
  width += (variant % 3.0 - 1.0) * 0.035;
  height += (floor(variant / 3.0) - 1.0) * 0.025;
  if (finish > 3.5) { width = 0.475; height = select(0.405, 0.44, variant % 2.0 > 0.5); }
  if (kind > 1.5 && kind < 2.5 && in.uv.y < 1.0) { width = 0.44; height = 0.4; }
  var centre = vec2f(0.5, 0.49);
  var openings = 1.0;
  var coverage = 1.0;
  if (windowLayout > 0.5 && windowLayout < 1.5) {
    // Punched windows: solid masonry/panel wall around a smaller opening.
    width = 0.19 + (variant % 3.0 - 1.0) * 0.025; height = 0.26; centre.y = 0.54;
  } else if (windowLayout > 1.5 && windowLayout < 2.5) {
    // Two narrow windows per bay, separated by an opaque wall pier.
    width = 0.105; height = 0.245 + (variant % 2.0) * 0.025;
    centre = vec2f(select(0.27, 0.73, q.x > 0.5), 0.54); coverage = 2.0;
  } else if (windowLayout > 2.5 && windowLayout < 3.5) {
    // A horizontal ribbon with substantial opaque sill and spandrel bands.
    width = 0.46; height = 0.13 + (variant % 3.0) * 0.015; centre.y = 0.61;
  } else if (windowLayout > 3.5) {
    // Aligned window columns with a blank bay between them.
    width = 0.23; height = 0.29; centre.y = 0.54; coverage = 0.5;
    openings = select(1.0, 0.0, fract((floor(in.uv.x) + variant) * 0.5) > 0.25);
  }
  let edge = abs(q - centre);
  let box = (1.0 - smoothstep(width - footprint.x, width + footprint.x, edge.x)) * (1.0 - smoothstep(height - footprint.y, height + footprint.y, edge.y)) * openings;
  let frameWidth = select(0.012, 0.022, finish < 3.5);
  let inner = (1.0 - smoothstep(width - frameWidth - footprint.x, width - frameWidth + footprint.x, edge.x)) * (1.0 - smoothstep(height - frameWidth - footprint.y, height - frameWidth + footprint.y, edge.y)) * openings;
  let split = select(0.5, 0.333, variant % 3.0 > 1.5);
  let splitAt = select(split, centre.x + (split - 0.5) * width * 2.0, windowLayout > 0.5);
  let mullion = smoothstep(0.008 - footprint.x, 0.008 + footprint.x, abs(q.x - splitAt));
  let pane = inner * mullion;
  let area = width * height * 4.0 * 0.91 * coverage;
  let glazing = mix(pane, area, distant) * clamp(1.0 - plain, 0.0, 1.0);
  let frame = (box - pane) * (1.0 - distant) * clamp(1.0 - plain, 0.0, 1.0);
  let framePaint = select(vec3f(0.54, 0.55, 0.54), vec3f(0.16, 0.18, 0.19), variant % 2.0 > 0.5);
  paint = mix(paint, framePaint, clamp(frame, 0.0, 1.0));
  let glass = mix(vec3f(0.035, 0.065, 0.085), vec3f(0.09, 0.14, 0.18), variant / 7.0);
  s.albedo = mix(paint, glass, glazing);
  s.roughness = mix(rough, 0.16, glazing);
  s.metalness = mix(metal, 0.0, glazing);
  s.specularIntensity = mix(0.6, 1.35, glazing);
  s.alpha = 1.0;
  // Stable per-building, floor and room variation: no frame-dependent flicker,
  // repeated eight-building light map, extra lights, textures or draw calls.
  if (any(mat.emissive != vec3f(0.0))) {
  let cell = floor(in.uv);
  let building = fract(sin(buildingSeed * 1.71 + 3.7) * 43758.5453);
  let room = fract(sin(dot(cell, vec2f(12.9898, 78.233)) + buildingSeed) * 43758.5453);
  let floorLight = fract(sin(cell.y * 17.71 + buildingSeed * 2.3) * 15731.743);
  let suite = fract(sin(dot(floor(cell / vec2f(3.0, 2.0)), vec2f(39.73, 11.13)) + buildingSeed) * 27531.49);
  let office = select(0.0, 1.0, kind > 2.5);
  let occupancy = clamp(0.22 + building * 0.32 + office * 0.14 + (floorLight - 0.5) * 0.28 + (suite - 0.5) * 0.3, 0.12, 0.88);
  let occupied = mix(select(0.0, 1.0, room < occupancy), occupancy, distant);
  let temperature = fract(building * 2.7 + suite * 0.22 + room * 0.16);
  let warm = mix(vec3f(1.0, 0.51, 0.22), vec3f(1.0, 0.82, 0.58), smoothstep(0.0, 0.55, temperature));
  let tint = mix(warm, vec3f(0.70, 0.84, 1.0), smoothstep(0.55, 1.0, temperature));
  let brightness = (0.24 + building * 0.60 + office * 0.42) * (0.55 + floorLight * 0.50 + room * 0.38);
  s.emissive = mat.emissive * tint * glazing * occupied * brightness;
  }
}`,ir=Object.freeze({kind:"color",late:!1,colorFormats:["rgba16float"],depthFormat:"depth32float",depthCompare:"greater-equal",passKey:"color.0.rgba16float.depth32float.greater-equal.."}),aa=Object.freeze({kind:"depth",late:!1,colorFormats:[],depthFormat:"depth32float",depthCompare:"less-equal",depthBias:2,depthBiasSlopeScale:1.5,passKey:"depth.0..depth32float.less-equal.."}),mi=Object.freeze([ir]),yi=Object.freeze([ir,aa]),Kt={high:{name:"high",shadow:2048,pcss:1,ssr:!0,clouds:!0},medium:{name:"medium",shadow:2048,pcss:0,ssr:!0,clouds:!1},low:{name:"low",shadow:1024,pcss:0,ssr:!1,clouds:!1}};let xi,K,Rt=!1,je,as="",Xe=null;function nt({shadow:h,pcss:e}){const t=Xe&&Xe.length<3?0:e,s=oe.get("shadowgrid")==="0"?0:64,i=Xe??[180,600,1800],r=h+"/"+t+"/"+i.join(",")+"/"+s;as!==r&&(K==null||K.dispose(),K=new yn({size:h,splits:i,normalBias:i.length===2?[.12,.45]:[i[0]<100?.05:.12,i[1]<400?.2:.3,.7],pcssCascades:t,cacheGrid:s}),as=r,je=null)}let Ke=null,ys=null,Dt=0;async function oa(){const h=Dt,e=await ws("/3d/detail.json").then(r=>{if(!r.ok)throw new Error("detail.json "+r.status);return r.json()}),t={},i=(await Promise.allSettled(Object.entries(e).map(async([r,a])=>{const n=await ws("/3d/"+a.file).then(l=>{if(!l.ok)throw new Error(a.file+" "+l.status);return l.blob()}),o=await createImageBitmap(n,{colorSpaceConversion:"none",premultiplyAlpha:"none"});try{if(await cr(),h!==Dt)return;const l=new G({width:o.width,height:o.height,format:"rgba8unorm",mips:!0,usage:["sample","render","copyDst"],label:"detail "+r});t[r]={tex:l,metres:a.metres,avgRough:a.avgRough},g.queue.copyExternalImageToTexture({source:o},{texture:l.getGPU()},[o.width,o.height]),we(l),g.submit()}finally{o.close()}}))).find(r=>r.status==="rejected");if(h!==Dt||i){if(Object.values(t).forEach(r=>r.tex.destroy()),i)throw i.reason;return}Ke=t}hr(()=>{Dt++,Object.values(Ke??{}).forEach(h=>h.tex.destroy()),Ke=null,ys=null,K==null||K.dispose(),K=null,as="",je=null});async function rr(){if(g.asyncShaders=!0,xi??(xi=(g.device&&!Rt?Promise.resolve():g.init({headless:!0})).then(async()=>{vs.bc=g.features.has("texture-compression-bc"),vs.etc2=g.features.has("texture-compression-etc2"),await Promise.all([xr(["rgba8unorm","rgba8unorm-srgb","rgba16float","r8unorm"]),ci("rgba8unorm","vec4f(A.x, A.y, B.y, B.z)",2),ci("r8unorm","vec4f(A.y, 0.0, 0.0, 1.0)",1)]),La(),g.format=navigator.gpu.getPreferredCanvasFormat(),ct.set("envSpecular",new ae({name:"complex reflected surroundings",deps:[lt],bindings:{env:{uniform:Bt},envCube:{texture:xs,viewDimension:"cube"},envPrev:{texture:ka,viewDimension:"cube"}},code:`
      var<private> envP: vec3f;
      fn hookEnvSpecular(R: vec3f, roughness: f32) -> vec3f {
        let sky = mix(skyBase(R), frame.horizonColor, roughness * 0.55) * frame.envIntensity;
        // (smooth surfaces only — glass, car paint, wet paving: a painted band or wall keeps the
        // colour measured from the photographs, not a tint of its grey neighbours)
        let w = env.on * (1.0 - smoothstep(0.15, 0.3, roughness));
        if (w <= 0.0) { return sky; }
        // (where the ray leaves the sphere round the complex, seen from the cube's centre)
        let o = envP - env.probe.xyz; let b = dot(o, R); let c = dot(o, o) - env.probe.w * env.probe.w;
        let t = max(-b + sqrt(max(b * b - c, 0.0)), 0.0);
        let dir = normalize(o + R * t) * vec3f(1.0, 1.0, -1.0);
        // (a new capture fades in over a second: swapped at once, every window's reflection
        // changed in one frame — a flicker whenever the sun had moved on a few degrees)
        var previous = vec4f(0.0); var current = vec4f(0.0);
        if (env.fade < 1.0) { previous = textureSampleLevel(envPrev, smpLinearClamp, dir, 0.0); }
        if (env.fade > 0.0) { current = textureSampleLevel(envCube, smpLinearClamp, dir, 0.0); }
        let s = mix(previous, current, env.fade);
        // (leaves are drawn with a partial alpha: any cover counts)
        return mix(sky, s.rgb / max(s.a, 1e-3) * min(s.a, 1.0), w * min(s.a * 8.0, 1.0));
      }`})),ct.set("bounce",new ae({name:"complex ground bounce",code:`
      fn hookBounce(P: vec3f, N: vec3f) -> vec3f {
        let below = sat(0.5 - 0.5 * N.y);
        let ground = frame.sunColor * max(frame.sunDir.y, 0.0) * 0.75 + frame.skyIrradiance * PI;
        return vec3f(0.2, 0.185, 0.16) * ground * below * INV_PI;
      }`})),ct.set("shadowPosition",new ae({name:"complex foliage shadow offset",code:`
      fn hookShadowPosition(P: vec3f, N: vec3f, pixel: vec2f) -> vec3f {
#if FOLIAGE == 2
        return P + frame.sunDir * 0.6;
#elif FOLIAGE
        return P + frame.sunDir * 2.2;
#else
        return P;
#endif
      }`})),g.device.lost.then(()=>{Rt=!0}),g.device.addEventListener("uncapturederror",h=>{console.warn("[3D] Native GPU validation failed:",h.error.message)})})),await xi,Rt)throw new Error("WebGPU device lost");ys??(ys=oa().catch(h=>console.info("[3D] surface detail unavailable:",h)))}const la=`
fn skyHash(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn skyNoise(p: vec2f) -> f32 {
  let i = floor(p); let f = fract(p); let u = f * f * (3.0 - 2.0 * f);
  return mix(mix(skyHash(i), skyHash(i + vec2f(1, 0)), u.x), mix(skyHash(i + vec2f(0, 1)), skyHash(i + vec2f(1, 1)), u.x), u.y);
}
`,lt=new ae({name:"complex daylight atmosphere",code:la+`
fn skyFbm(p0: vec2f) -> f32 {
  var p = p0; var a = 0.5; var s = 0.0;
  for (var i = 0; i < 5; i++) { s += a * skyNoise(p); p = mat2x2f(1.6, 1.2, -1.2, 1.6) * p; a *= 0.5; }
  return s;
}
// Fair-weather cumulus: domain-warped billows, gathered into separate puffs of varied
// size by a slow coverage field. (frame.cameraWaterHeight, unused by this view's water: the
// drone's sky, 0…1 — a few more puffs, their edges sharp. Twin: patchSky uDrone.)
fn cumulus(uv: vec2f) -> f32 {
  let k = frame.cameraWaterHeight;
  let warp = vec2f(skyFbm(uv * 0.7 + vec2f(3.1, 1.7)), skyFbm(uv * 0.7 + vec2f(8.3, 2.8))) - 0.5;
  let billow = skyFbm(uv * 1.7 + warp * 0.9);
  let cover = smoothstep(0.34, 0.6, skyNoise(uv * 0.85 + vec2f(5.0, 1.0)) * 0.7 + skyNoise(uv * 0.3 + vec2f(2.0, 7.0)) * 0.3);
  // Crisp, heaped edges where a puff is dense; nothing between puffs.
  return smoothstep(mix(0.5, 0.532, k), mix(0.6, 0.568, k), billow * (0.62 + 0.55 * cover) + 0.03 * k) * smoothstep(0.05 - 0.03 * k, 0.4 - 0.1 * k, cover);
}
// Weather (frame.debug): x overcast 0..1, y rain, z snow.
// The overcast deck's colour without its texture (grey by day, milky in snow, leaden in
// rain; the haze colour lit by the city at night). Twin of patchSky in complexScene.ts.
fn deckColor(ray: vec3f) -> vec3f {
  let day = 1.0 - frame.night;
  let e = clamp(ray.y, 0.0, 1.0);
  var grey = mix(vec3f(0.6, 0.64, 0.69), vec3f(0.8, 0.82, 0.85), frame.debug.z) * mix(1.0, 0.66, frame.debug.y);
  grey *= mix(0.35, 1.0, smoothstep(-0.12, 0.35, frame.sunDir.y));
  return mix(frame.horizonColor * 0.9 + vec3f(0.025, 0.02, 0.016), grey, day) * mix(0.93, 1.05, e);
}
// Clear-sky gradient, closed over by any overcast (also what glass reflects: no cloud
// noise per facade pixel).
fn skyBase(ray: vec3f) -> vec3f {
  let day = 1.0 - frame.night;
  let e = clamp(ray.y, 0.0, 1.0);
  let dusk = 1.0 - smoothstep(0.04, 0.45, frame.sunDir.y);
  let zenith = mix(vec3f(0.08, 0.27, 0.72), vec3f(0.24, 0.2, 0.34), dusk);
  // (the drone: the sky's horizon in the ground's haze colour, where the faded ground meets it)
  let horizon = mix(mix(vec3f(0.55, 0.71, 0.9), frame.horizonColor, dusk * 0.85), frame.horizonColor, frame.cameraWaterHeight * 0.75 * (1.0 - smoothstep(0.0, 0.25, ray.y)));
  let daySky = mix(horizon, zenith, pow(e, 0.55));
  let nightSky = mix(frame.horizonColor * 0.45, vec3f(0.006, 0.013, 0.04), pow(e, 0.35));
  return mix(mix(nightSky, daySky, day), deckColor(ray), frame.debug.x * smoothstep(-0.02, 0.06, ray.y) * 0.95);
}
// The sky with its clouds, without the sun disc (also what the water reflects).
fn skyClouds(ray: vec3f) -> vec3f { return skyCloudsOver(ray, skyBase(ray)); }
fn skyCloudsOver(ray: vec3f, base: vec3f) -> vec3f {
  let day = 1.0 - frame.night;
  var sky = base;
  if (ray.y > 0.0) {
    // A cloud layer overhead, seen in perspective; drifting slowly with the wind.
    // A curved cloud deck: near the horizon puffs flatten, but are not smeared into streaks.
    let uv = ray.xz / (ray.y + 0.22) * 1.35 + vec2f(frame.time * 0.005, frame.time * 0.0018);
    let d = cumulus(uv) * (1.0 - frame.debug.x);
    if (d > 0.002) {
      // Self-shadow: denser toward the sun means a darker underside.
      let toSun = normalize(frame.sunDir.xz + vec2f(0.0001, 0.0)) * 0.22;
      let k = frame.cameraWaterHeight;
      let lit0 = clamp(1.0 - (cumulus(uv + toSun) - d * 0.35) * 1.5, 0.0, 1.0);
      let lit = mix(lit0, smoothstep(0.12, 0.88, lit0), k);
      let sunTint = frame.sunColor / max(max(frame.sunColor.r, max(frame.sunColor.g, frame.sunColor.b)), 0.001);
      // (the drone's sky: shaded bases, bright tops, a silver lining toward the sun)
      var dayCloud = mix(mix(vec3f(0.6, 0.65, 0.74), vec3f(0.5, 0.56, 0.67), k), vec3f(1.06, 1.05, 1.02) * mix(vec3f(1.0), sunTint, 0.3) * (1.0 + 0.08 * k), lit);
      dayCloud += sunTint * k * 0.45 * pow(max(dot(ray, frame.sunDir), 0.0), 10.0) * (1.0 - smoothstep(0.3, 0.9, d));
      let cloud = mix(frame.horizonColor * 0.25, dayCloud, day);
      // Thin toward the horizon, where the haze takes over.
      sky = mix(sky, cloud, clamp(d * 1.25, 0.0, 0.97) * smoothstep(0.0, 0.08, ray.y));
    }
  }
  if (frame.debug.x > 0.001) {
    // The deck's texture: uneven thickness, darker ragged scud under rain.
    let uv = ray.xz / (max(ray.y, 0.0) + 0.3) * 0.9 + vec2f(frame.time * 0.012, frame.time * 0.004);
    let thick = skyFbm(uv * 0.8);
    let scud = smoothstep(0.52, 0.72, skyFbm(uv * 1.9 + vec2f(4.0, 9.0) + frame.time * 0.01));
    var deck = deckColor(ray) * (0.8 + 0.34 * thick) * (1.0 - 0.3 * frame.debug.y * scud);
    // The sun a pale glow behind thin cloud (snow, never rain).
    let sunHue = frame.sunColor / max(max(frame.sunColor.r, max(frame.sunColor.g, frame.sunColor.b)), 0.001);
    deck += sunHue * 0.22 * pow(max(dot(ray, frame.sunDir), 0.0), 18.0) * day * (1.0 - frame.debug.y) * smoothstep(-0.02, 0.1, frame.sunDir.y);
    sky = mix(sky, deck, frame.debug.x * smoothstep(-0.02, 0.06, ray.y) * 0.95);
  }
  return sky;
}
// Stars (frame.debug.w: how many show; frame.pad0: the sky's turn about the pole, from
// sidereal time). Twin of starField in complexScene.ts patchSky.
fn sHash3(p0: vec3f) -> vec3f { var p = fract(p0 * vec3f(0.1031, 0.103, 0.0973)); p += dot(p, p.yxz + 33.33); return fract((p.xxy + p.yxx) * p.zyx); }
fn starLayer(d: vec3f, scale: f32, density: f32, pr: f32, bright: f32, halo: f32, t: f32) -> vec3f {
  let c = floor(d * scale); let h = sHash3(c);
  if (h.x > density) { return vec3f(0.0); }
  let sd = normalize(c + 0.2 + 0.6 * sHash3(c + 17.0));
  let ang = length(d - sd); let k = h.z;
  var col = vec3f(1.15, 0.78, 0.58);
  if (k < 0.12) { col = vec3f(0.72, 0.82, 1.15); } else if (k < 0.6) { col = vec3f(1.0, 0.98, 0.95); } else if (k < 0.86) { col = vec3f(1.1, 0.95, 0.78); }
  let b = bright * (0.2 + 0.8 * pow(h.y, 3.0));
  let tw = 1.0 + mix(0.45, 0.22, frame.cameraWaterHeight) * sin(t * (1.5 + 5.0 * h.y) + h.x * 90.0) * sin(t * (2.3 + 3.0 * h.z) + h.y * 40.0);
  let core = exp(-pow(ang / (pr * 0.95), 2.0)) + halo * exp(-ang / (pr * 3.5));
  return col * b * tw * core;
}
fn starField(ray: vec3f, pr: f32) -> vec3f {
  let vis = frame.debug.w;
  if (vis < 0.002 || ray.y < -0.02) { return vec3f(0.0); }
  let k = vec3f(0.0, 0.6088, -0.7934);
  let cs = cos(-frame.pad0); let sn = sin(-frame.pad0);
  let d = ray * cs + cross(k, ray) * sn + k * dot(k, ray) * (1.0 - cs);
  let n = normalize(vec3f(0.42, 0.18, 0.89));
  let band = exp(-pow(dot(d, n) / 0.17, 2.0));
  let dust = skyFbm(vec2f(atan2(d.z, d.x) * 5.0, d.y * 7.0));
  let t = frame.time;
  let s = starLayer(d, 95.0, 0.5 + 0.4 * band, pr, 0.32, 0.0, t)
        + starLayer(d, 42.0, 0.45, pr, 0.85, 0.04, t)
        + starLayer(d, 15.0, 0.28, pr * 1.3, 2.6, 0.12 * (1.0 - frame.cameraWaterHeight), t);
  var milky = vec3f(0.022, 0.025, 0.036) * band * smoothstep(0.3, 0.75, dust) * (1.0 - 0.6 * smoothstep(0.55, 0.7, skyFbm(vec2f(atan2(d.z, d.x) * 11.0, d.y * 16.0))));
  // The drone's night (frame.cameraWaterHeight): a deeper field — a dense layer of faint stars
  // under the bright ones, a few brighter still (no glow past a star's own cell: it showed as a
  // box), and the Milky Way's band brighter,
  // warm along its core and cool at its edges, cut by its dark dust lanes.
  let dk = frame.cameraWaterHeight;
  var extra = vec3f(0.0);
  if (dk > 0.001) {
    extra = starLayer(d, 210.0, 0.28 + 0.5 * band, pr * 0.85, 0.16, 0.0, t) + starLayer(d, 11.0, 0.3, pr * 1.1, 3.2, 0.0, t);
    let lanes = smoothstep(0.5, 0.68, skyFbm(vec2f(atan2(d.z, d.x) * 14.0 + 3.0, d.y * 22.0)));
    let core = exp(-pow(dot(d, n) / 0.07, 2.0));
    milky = (mix(vec3f(0.03, 0.036, 0.06), vec3f(0.07, 0.058, 0.045), core) * band * (0.4 + 0.9 * smoothstep(0.25, 0.8, dust))) * (1.0 - 0.75 * lanes);
  }
  return (s + extra * dk + milky) * vis * smoothstep(-0.02, 0.22, ray.y);
}
fn complexSky(ray: vec3f, pr: f32) -> vec3f {
  let day = 1.0 - frame.night;
  var sky = skyBase(ray) + starField(ray, pr);
  // (the drawn clouds, except under the drone's photographed sky by day: the two together showed
  // coarse painted clouds beside the photograph's)
  if (frame.cameraWaterHeight * frame.windSpeed < 0.5) { sky = skyCloudsOver(ray, sky); }
  // The sun: a small soft disc, no glare halo (the sky reads as plain blue with clouds).
  let sun = max(dot(ray, frame.sunDir), 0.0);
  let sunHue = frame.sunColor / max(max(frame.sunColor.r, max(frame.sunColor.g, frame.sunColor.b)), 0.001);
  let k = frame.cameraWaterHeight;
  sky = mix(sky, sunHue * mix(1.15, 2.6, k), smoothstep(mix(0.99985, 0.99974, k), mix(0.99995, 0.99989, k), sun) * day * 0.85 * (1.0 - frame.debug.x));
  // (the drone's sky: the sun's corona, no glare across the view)
  sky += sunHue * k * day * (1.0 - frame.debug.x) * smoothstep(-0.05, 0.05, frame.sunDir.y) * (pow(sun, 1400.0) * 0.8 + pow(sun, 120.0) * 0.12 + pow(sun, 10.0) * 0.035);
  return sky;
}`}),ha="0.600",ca="0.855",ua="1.0",fa="1.0",da=`
fn fragment(in: FSIn) -> vec4f {
  let p = frame.invProj * vec4f(in.uv.x * 2.0 - 1.0, 1.0 - in.uv.y * 2.0, 0.001, 1.0);
  let ray = normalize((frame.invView * vec4f(normalize(p.xyz / p.w), 0.0)).xyz);
  // (a pixel's angular size, for stars one pixel across)
  let pr = length(fwidth(ray));
  var c = complexSky(ray, pr);
  // The drone's day sky (frame.cameraWaterHeight: how much; frame.windSpeed: its picture is in):
  // photographed clouds (droneSkyTex, the upper hemisphere of a CC0 sky) turned so the picture's
  // sun lies at the view's sun, its elevations stretched to match (the horizon and the zenith
  // stay), faded out toward dusk, under an overcast and into the haze at the horizon.
  let k = frame.cameraWaterHeight * frame.windSpeed;
  if (k > 0.001 && ray.y > -0.02) {
    let sunE = asin(clamp(frame.sunDir.y, -1.0, 1.0));
    // By day the photograph is the sky. As the sun goes down the sky becomes the sunset's own
    // (skyBase: its warm horizon and dimming zenith), the photograph's clouds kept on it lit in the
    // sunset's colours — gold and rose toward the sun, grey-violet away from it; by night they
    // are gone and the sky is clear for the stars.
    let photoK = k * (1.0 - frame.debug.x);
    if (photoK > 0.001) {
      let e = asin(clamp(ray.y, 0.0, 1.0));
      let eImg = ${ca};
      let eS = clamp(sunE, 0.1, 1.45);
      let e2 = select(eImg + (e - eS) * (1.5708 - eImg) / (1.5708 - eS), e * eImg / eS, e < eS);
      let az = atan2(ray.x, -ray.z);
      let saz = atan2(frame.sunDir.x, -frame.sunDir.z);
      let u = fract(${ha} + ${ua} * (az - saz) / 6.2831853);
      let v = clamp(1.0 - e2 / 1.5707963, 0.001, 0.999);
      let photo = textureSampleLevel(droneSkyTex, smpLinearRepeat, vec2f(u, v), 0.0).rgb * ${fa};
      let hue = frame.sunColor / max(max(frame.sunColor.r, max(frame.sunColor.g, frame.sunColor.b)), 0.001);
      let fade = smoothstep(0.0, 0.1, ray.y);
      let dayW = smoothstep(0.05, 0.32, sunE) * (1.0 - frame.night);
      let duskW = (1.0 - smoothstep(0.05, 0.32, sunE)) * smoothstep(-0.16, -0.01, sunE);
      // (the clouds in the photograph: its white, bright parts)
      let lum = dot(photo, vec3f(0.2126, 0.7152, 0.0722));
      let mx = max(photo.r, max(photo.g, photo.b));
      let mn = min(photo.r, min(photo.g, photo.b));
      let cloud = smoothstep(0.55, 0.85, mn / max(mx, 0.001)) * smoothstep(0.25, 0.7, lum);
      let toward = pow(max(dot(normalize(vec3f(ray.x, 0.0, ray.z) + vec3f(0.0001)), normalize(vec3f(frame.sunDir.x, 0.0, frame.sunDir.z) + vec3f(0.0001))), 0.0), 2.0);
      let lit = mix(vec3f(0.42, 0.36, 0.48), mix(vec3f(1.0, 0.55, 0.42), hue * vec3f(1.05, 0.82, 0.55), 0.5) * 1.25, toward) * (0.55 + 0.7 * lum);
      let low = 1.0 - smoothstep(-0.12, 0.0, sunE);
      let duskCloud = mix(lit, lit * vec3f(0.35, 0.3, 0.42), low);
      c = mix(c, photo, photoK * dayW * fade);
      c = mix(c, duskCloud, photoK * duskW * cloud * fade * 0.9);
      // (the sun's own disc over it, where the picture's glare now lies)
      let sun = max(dot(ray, frame.sunDir), 0.0);
      let sunHue = frame.sunColor / max(max(frame.sunColor.r, max(frame.sunColor.g, frame.sunColor.b)), 0.001);
      c += sunHue * photoK * (1.0 - frame.night) * smoothstep(-0.03, 0.02, sunE) * (smoothstep(0.99975, 0.9999, sun) * 1.6 + pow(sun, 900.0) * 0.4);
    }
  }
  return vec4f(c, 1.0);
}`,pa=`
fn pHash(p: vec2f) -> f32 { var p3 = fract(vec3f(p.x, p.y, p.x) * 0.1031); p3 += dot(p3, p3.yzx + 33.33); return fract((p3.x + p3.y) * p3.z); }
fn rainAt(q0: vec2f, r: f32, pix: f32, t: f32, amount: f32, slant: f32) -> f32 {
  let cu = r * 0.024; let cv = cu * 7.0;
  var q = q0; q.x += q.y * slant; q.y += t * 8.5;
  let g = q / vec2f(cu, cv); let cell = floor(g); let f = g - cell;
  if (pHash(cell + r) > amount * 0.6) { return 0.0; }
  let x0 = 0.2 + 0.6 * pHash(cell + r + 1.7); let y0 = 0.25 * pHash(cell + r + 3.1);
  let w = max(0.0045, pix * 0.75);
  let across = smoothstep(w, 0.0, abs(f.x - x0) * cu);
  let along = (f.y - y0) / 0.7;
  return across * smoothstep(0.0, 0.2, along) * smoothstep(1.0, 0.55, along) * min(1.0, 0.0045 / w * 1.6);
}
fn snowAt(q0: vec2f, r: f32, pix: f32, t: f32, amount: f32) -> f32 {
  let c = r * 0.045;
  var q = q0; q.y += t * 0.735;
  let g = q / c; let cell = floor(g); let f = g - cell;
  let h = pHash(cell + r);
  if (h > amount * 0.42) { return 0.0; }
  var p0 = vec2f(0.3 + 0.4 * pHash(cell + r + 1.7), 0.3 + 0.4 * pHash(cell + r + 3.1));
  p0.x += sin(t * 1.3 + h * 40.0) * 0.14;
  let rad = 0.007 + 0.008 * pHash(cell + r + 5.3); let rr = max(rad, pix * 0.9);
  let d = length((f - p0) * c);
  return smoothstep(rr, rr * 0.3, d) * min(1.0, pow(rad / rr, 2.0) * 1.4);
}
fn precipitate(c0: vec3f, uv: vec2f) -> vec3f {
  let rain = frame.debug.y; let snow = frame.debug.z;
  if (rain < 0.001 && snow < 0.001) { return c0; }
  let p = frame.invProj * vec4f(uv.x * 2.0 - 1.0, 1.0 - uv.y * 2.0, 0.001, 1.0);
  let ray = normalize((frame.invView * vec4f(normalize(p.xyz / p.w), 0.0)).xyz);
  let fwd = normalize((frame.invView * vec4f(0.0, 0.0, -1.0, 0.0)).xyz);
  let size = vec2f(textureDimensions(sceneDepth));
  let d = textureLoad(sceneDepth, vec2i(clamp(uv, vec2f(0.0), vec2f(0.9999)) * size), 0).x;
  // (nothing drawn: the sky, as far as can be)
  var sceneZ = 1e9;
  if (d > 0.0) { sceneZ = viewDepth(d); }
  let pixAngle = 2.0 / (frame.proj[1][1] * frame.resolution.y);
  let hl = max(length(ray.xz), 1e-4);
  let side = smoothstep(0.12, 0.45, hl);
  let rainTint = frame.horizonColor * 1.35 + 0.025;
  let snowTint = frame.horizonColor * 1.7 + 0.05;
  var c = c0;
  let radii = array<f32, 5>(28.0, 16.0, 9.0, 5.0, 2.5);
  for (var i = 0; i < 5; i++) {
    let r = radii[i];
    let t = r / hl;
    if (t * dot(ray, fwd) > sceneZ) { continue; }
    let w = frame.cameraPos + ray * t;
    let q = vec2f(atan2(ray.z, ray.x) * r, w.y);
    let pix = t * pixAngle;
    var a = 0.0; var s = 0.0;
    if (rain > 0.001) { a = rainAt(q, r, pix, frame.time, rain, 0.18); }
    if (snow > 0.001) { s = snowAt(q, r, pix, frame.time, snow); }
    let k = clamp(a * 0.34 + s * 0.9, 0.0, 1.0) * exp(-t * 0.012) * side;
    c = mix(c, mix(rainTint, snowTint, s / max(a + s, 0.001)), k);
  }
  return c;
}`,ma=`
fn fragment(in: FSIn) -> vec4f {
  let px = 1.0 / vec2f(textureDimensions(src));
  let size = vec2i(textureDimensions(src));
  let ip = vec2i(in.pos.xy);
  var c = textureLoad(src, ip, 0).rgb;
  c = select(min(c, vec3f(30000.0)), vec3f(0.0), c != c);
#if AO
  // (before the edge filter: a sampled blur of the occlusion, whole-screen)
  let aoTexel = textureSampleLevel(aoTex, smpLinearClamp, in.uv, 0.0);
  let finalZ = viewDepth(max(textureLoad(sceneDepth, vec2i(in.uv * vec2f(textureDimensions(sceneDepth))), 0).x, 1e-6));
  // (a plant or the water in front of the depth the occlusion was taken at: unshaded)
  let occl = select(1.0, aoTexel.r, abs(finalZ - aoTexel.g) < finalZ * 0.03 + 0.3);
#endif
  // Small edge-aware filter at internal resolution reduces facade shimmer.
  let a = textureLoad(src, clamp(ip + vec2i(1, 0), vec2i(0), size - 1), 0).rgb;
  let b = textureLoad(src, clamp(ip + vec2i(-1, 0), vec2i(0), size - 1), 0).rgb;
  let d = textureLoad(src, clamp(ip + vec2i(0, 1), vec2i(0), size - 1), 0).rgb;
  let e = textureLoad(src, clamp(ip + vec2i(0, -1), vec2i(0), size - 1), 0).rgb;
  let edge = length(a - b) + length(d - e);
  c = mix(c, (a + b + d + e + c * 4.0) / 8.0, smoothstep(0.15, 0.8, edge) * 0.65);
#if AO
  c *= occl;
#if AO_SHOW
  return vec4f(vec3f(occl), 1.0);
#endif
#endif
  c = precipitate(c, in.uv);
  c *= frame.exposure;
#if BLOOM
  c += textureSampleLevel(bloomTex, smpLinearClamp, in.uv, 0.0).rgb * bloom.strength;
#endif
#if TONEMAP_NEUTRAL
  // Khronos PBR Neutral: base colours come out as painted (no ACES hue skew and
  // oversaturation of the facades and grass); highlights roll off into white.
  c *= 1.45;
  let lo = min(c.r, min(c.g, c.b));
  c -= select(0.04, lo - 6.25 * lo * lo, lo < 0.08);
  let peak = max(c.r, max(c.g, c.b));
  if (peak > 0.76) {
    let newPeak = 1.0 - 0.0576 / (peak - 0.52);
    c *= newPeak / peak;
    c = mix(c, vec3f(newPeak), 1.0 - 1.0 / (0.15 * (peak - newPeak) + 1.0));
  }
  c = clamp(c, vec3f(0.0), vec3f(1.0));
  c = select(1.055 * pow(c, vec3f(1.0 / 2.4)) - 0.055, c * 12.92, c <= vec3f(0.0031308));
#else
  c = clamp((c * (2.51 * c + 0.03)) / (c * (2.43 * c + 0.59) + 0.14), vec3f(0.0), vec3f(1.0));
  c = pow(c, vec3f(1.0 / 2.2));
#endif
  return vec4f(c, 1.0);
}`,at=new Te("Bloom",{strength:["f32",0],threshold:["f32",1],exposure:["f32",1],pad:["f32",0]},{label:"complex bloom"}),gi=5,ya=`
  c = select(min(c, vec3f(30000.0)), vec3f(0.0), c != c);
  c *= bloom.exposure;
  // soft knee over the threshold; very bright specks capped (no flicker from single pixels)
  let br = max(c.r, max(c.g, c.b));
  let knee = bloom.threshold * 0.5;
  let soft = clamp(br - bloom.threshold + knee, 0.0, 2.0 * knee);
  c *= max(soft * soft / (4.0 * knee + 1e-4), br - bloom.threshold) / max(br, 1e-4);
  c = min(c, vec3f(8.0));`,xa=h=>`
fn tap(uv: vec2f) -> vec3f { return textureSampleLevel(src, smpLinearClamp, uv, 0.0).rgb; }
fn fragment(in: FSIn) -> vec4f {
  let t = 1.0 / vec2f(textureDimensions(src));
  let uv = in.uv;
  var c = tap(uv) * 0.125
    + (tap(uv + t * vec2f(-2.0, -2.0)) + tap(uv + t * vec2f(2.0, -2.0)) + tap(uv + t * vec2f(-2.0, 2.0)) + tap(uv + t * vec2f(2.0, 2.0))) * 0.03125
    + (tap(uv + t * vec2f(0.0, -2.0)) + tap(uv + t * vec2f(-2.0, 0.0)) + tap(uv + t * vec2f(2.0, 0.0)) + tap(uv + t * vec2f(0.0, 2.0))) * 0.0625
    + (tap(uv + t * vec2f(-1.0, -1.0)) + tap(uv + t * vec2f(1.0, -1.0)) + tap(uv + t * vec2f(-1.0, 1.0)) + tap(uv + t * vec2f(1.0, 1.0))) * 0.125;
  ${h?ya:""}
  return vec4f(c, 1.0);
}`,ga=`
fn tap(uv: vec2f) -> vec3f { return textureSampleLevel(src, smpLinearClamp, uv, 0.0).rgb; }
fn fragment(in: FSIn) -> vec4f {
  let t = 1.0 / vec2f(textureDimensions(src));
  let uv = in.uv;
  let c = tap(uv) * 4.0
    + (tap(uv + vec2f(t.x, 0.0)) + tap(uv - vec2f(t.x, 0.0)) + tap(uv + vec2f(0.0, t.y)) + tap(uv - vec2f(0.0, t.y))) * 2.0
    + tap(uv + t) + tap(uv - t) + tap(uv + vec2f(t.x, -t.y)) + tap(uv + vec2f(-t.x, t.y));
  return vec4f(c / 16.0, 1.0);
}`,oe=typeof location<"u"?new URLSearchParams(location.search):new URLSearchParams,va=oe.get("tm")!=="aces",wa=oe.get("ao")!=="0",ba=oe.get("bloom")!=="0",Sa=oe.get("taa")!=="0",qe=[0,0,0,0],vi=new Te("Taa",{valid:["f32",0],pad0:["f32",0],pad1:["f32",0],pad2:["f32",0]},{label:"complex taa"}),_a=`
fn taaY(c: vec3f) -> vec3f { return vec3f(dot(c, vec3f(0.25, 0.5, 0.25)), dot(c, vec3f(0.5, 0.0, -0.5)), dot(c, vec3f(-0.25, 0.5, -0.25))); }
fn taaRgb(c: vec3f) -> vec3f { return vec3f(c.x + c.y - c.z, c.x + c.z, c.x - c.y - c.z); }
// (blended in a tone-mapped space: one bright highlight can't outweigh its neighbours)
fn taaTm(c: vec3f) -> vec3f { return c / (1.0 + max(c.r, max(c.g, c.b))); }
fn taaItm(c: vec3f) -> vec3f { return c / max(1e-4, 1.0 - max(c.r, max(c.g, c.b))); }
fn taaHistory(uv: vec2f) -> vec3f {
  let size = vec2f(textureDimensions(hist));
  let sp = uv * size; let t1 = floor(sp - 0.5) + 0.5; let f = sp - t1;
  let w0 = f * (-0.5 + f * (1.0 - 0.5 * f)); let w1 = 1.0 + f * f * (-2.5 + 1.5 * f);
  let w2 = f * (0.5 + f * (2.0 - 1.5 * f)); let w3 = f * f * (-0.5 + 0.5 * f);
  let w12 = w1 + w2; let a = (t1 - 1.0) / size; let b = (t1 + w2 / w12) / size; let c = (t1 + 2.0) / size;
  var r = textureSampleLevel(hist, smpLinearClamp, vec2f(b.x, a.y), 0.0).rgb * (w12.x * w0.y);
  r += textureSampleLevel(hist, smpLinearClamp, vec2f(a.x, b.y), 0.0).rgb * (w0.x * w12.y);
  r += textureSampleLevel(hist, smpLinearClamp, b, 0.0).rgb * (w12.x * w12.y);
  r += textureSampleLevel(hist, smpLinearClamp, vec2f(c.x, b.y), 0.0).rgb * (w3.x * w12.y);
  r += textureSampleLevel(hist, smpLinearClamp, vec2f(b.x, c.y), 0.0).rgb * (w12.x * w3.y);
  let ws = w12.x * w0.y + w0.x * w12.y + w12.x * w12.y + w3.x * w12.y + w12.x * w3.y;
  return max(r / ws, vec3f(0.0));
}
fn fragment(in: FSIn) -> vec4f {
  let size = vec2i(textureDimensions(src));
  let p = vec2i(in.pos.xy);
  let cur = textureLoad(src, p, 0).rgb;
  if (taa.valid < 0.5) { return vec4f(cur, 1.0); }
  // where this pixel was last frame
  let d = textureLoad(sceneDepth, p, 0).x;
  let ndc = vec2f(in.uv.x * 2.0 - 1.0, 1.0 - in.uv.y * 2.0);
  let wp = frame.invViewProj * vec4f(ndc, d, 1.0);
  let pc = frame.prevViewProjNoJitter * vec4f(wp.xyz / wp.w, 1.0);
  let puv = vec2f(pc.x / pc.w * 0.5 + 0.5, 0.5 - pc.y / pc.w * 0.5);
  if (pc.w <= 0.0 || any(puv < vec2f(0.0)) || any(puv > vec2f(1.0))) { return vec4f(cur, 1.0); }
  let centerY = taaY(taaTm(cur));
  // the neighbours' colour range (mean and spread)
  var m1 = vec3f(0.0); var m2 = vec3f(0.0);
  ${qn()}
  m1 /= 9.0; m2 /= 9.0;
  let sigma = sqrt(max(m2 - m1 * m1, vec3f(0.0)));
  let h = clamp(taaY(taaTm(taaHistory(puv))), m1 - sigma * 1.25, m1 + sigma * 1.25);
  // (more of the new frame while the view moves fast: less to reproject wrongly)
  let moved = length((puv - in.uv) * vec2f(size));
  let k = mix(0.1, 0.3, clamp(moved / 6.0, 0.0, 1.0));
  return vec4f(taaItm(taaRgb(mix(h, centerY, k))), 1.0);
}`,Ma=oe.get("envmap")!=="0",za=oe.get("recess")!=="0",Pa=`
{
  let uvT0 = in.uv * mat.uvemissiveMap.xy + mat.uvemissiveMap.zw;
  let cu = uvT0 * mat.room.xy; let cl = floor(cu); let f0 = fract(cu);
  let N0 = normalize(in.N);
  let a0 = dpdx(in.P); let a1 = dpdy(in.P); let b0 = dpdx(uvT0); let b1 = dpdy(uvT0);
  let a1p = cross(a1, N0); let a0p = cross(N0, a0);
  let T0 = normalize(a1p * b0.x + a0p * b1.x + vec3f(1e-7)); let B0 = normalize(a1p * b0.y + a0p * b1.y + vec3f(1e-7));
  let dv = normalize(in.P - frame.cameraPos);
  let r3 = vec3f(dot(dv, T0), dot(dv, B0), max(-dot(dv, N0), 0.05));
  let cellM = mat.room.zw;
  let depthM = 0.14 * (1.0 - smoothstep(40.0, 140.0, length(in.P - frame.cameraPos)));
  let lo = vec2f(0.06, 0.10) * cellM; let hi = vec2f(0.94, 0.84) * cellM;
  let p0 = f0 * cellM;
  let bay = ((i32(cl.x) % 4) + 4) % 4;
  if (depthM > 0.002 && bay != 3 && all(p0 > lo) && all(p0 < hi)) {
    let q = p0 + r3.xy * (depthM / r3.z);
    if (all(q > lo) && all(q < hi)) { puv = in.uv + (q - p0) / cellM / (mat.room.xy * mat.uvemissiveMap.xy); }
    else {
      reveal = 1.0;
      // (the wall's own paint, from beside the opening in the same bay)
      revealUV = (((cl + vec2f(0.03, 0.47)) / mat.room.xy) - mat.uvemissiveMap.zw) / mat.uvemissiveMap.xy;
    }
  }
}
`,se=256,Bt=new Te("Env",{probe:["vec4f",[0,25,0,320]],on:["f32",0],fade:["f32",1],pad1:["f32",0],pad2:["f32",0]},{label:"complex env"});let Se=null,Aa=null;const xs=()=>{var h;return((h=Se==null?void 0:Se.env)==null?void 0:h.tex)??Aa??(Aa=new G({width:4,height:4,dimension:"cube",format:"rgba16float",usage:["sample","render"],label:"complex env blank"}))},ka=()=>{var h;return((h=Se==null?void 0:Se.env)==null?void 0:h.back)??xs()},Ca=[[1,0,0,0,1,0],[-1,0,0,0,1,0],[0,1,0,0,0,1],[0,-1,0,0,0,-1],[0,0,-1,0,1,0],[0,0,1,0,1,0]],wi=(h,e)=>{let t=1,s=0;for(;h>0;)t/=e,s+=t*(h%e),h=Math.floor(h/e);return s},Ta=oe.get("int")!=="0",bi=oe.get("detail")!=="0",Ra=`
  let roomUV = puv * mat.uvemissiveMap.xy + mat.uvemissiveMap.zw;
  let roomDx = dpdx(in.P); let roomDy = dpdy(in.P);
  let roomUVdx = dpdx(roomUV); let roomUVdy = dpdy(roomUV);
  let roomFilter = max(fwidth(roomUV * mat.room.xy).x, fwidth(roomUV * mat.room.xy).y);
`,Da=`
  let uvT = in.uv * REPEAT + OFFSET;
  let cellUV = uvT * GRID;
  let cell = floor(cellUV);
  let fc = fract(cellUV);
  let Ng = normalize(in.N);
  let iq0 = roomDx; let iq1 = roomDy; let ist0 = roomUVdx; let ist1 = roomUVdy;
  let iq1p = cross(iq1, Ng); let iq0p = cross(Ng, iq0);
  let Tn = normalize(iq1p * ist0.x + iq0p * ist1.x + vec3f(1e-7));
  let Bn = normalize(iq1p * ist0.y + iq0p * ist1.y + vec3f(1e-7));
  let dW = normalize(in.P - frame.cameraPos);
  let rd = vec3f(dot(dW, Tn), dot(dW, Bn), max(-dot(dW, Ng), 0.04));
  let rh = vec3f(skyHash(cell), skyHash(cell + 17.3), skyHash(cell + 41.9));
  // (the cell's v runs down the wall: its ceiling at CEIL, its floor at FLOOR of the storey)
  let RW = BAYW; let RH = STOREY; let RC = STOREY * CEIL; let RF = STOREY * FLOOR; let RD = 3.6 + 2.2 * rh.z;
  let rp = vec3f(fc.x * RW, fc.y * RH, 0.0);
  let rdx = select(min(rd.x, -1e-4), max(rd.x, 1e-4), rd.x >= 0.0);
  let rdy = select(min(rd.y, -1e-4), max(rd.y, 1e-4), rd.y >= 0.0);
  let tx = (select(0.0, RW, rd.x >= 0.0) - rp.x) / rdx;
  let ty = (select(RC, RF, rd.y >= 0.0) - rp.y) / rdy;
  let tz = RD / rd.z;
  let th = min(tx, min(ty, tz));
  let hp = rp + rd * th;
  let wallC = mix(vec3f(0.78, 0.74, 0.67), vec3f(0.9, 0.89, 0.86), rh.x);
  let floorC = mix(vec3f(0.34, 0.24, 0.15), vec3f(0.64, 0.57, 0.47), rh.y);
  var col = wallC * 0.95; var lamp = 0.5;
  if (th == tz) {
    col = wallC * 0.9;
    // along the back wall: a sofa or cabinet, now and then a picture above it
    if (hp.y > RF - 0.85 && abs(hp.x - RW * 0.5) < RW * (0.25 + 0.2 * rh.y)) { col = mix(vec3f(0.2, 0.18, 0.17), vec3f(0.58, 0.52, 0.45), rh.x); }
    else if (rh.y > 0.55 && abs(hp.y - (RF - 1.75)) < 0.3 && abs(hp.x - RW * 0.5) < 0.45) { col = mix(vec3f(0.25, 0.3, 0.36), vec3f(0.62, 0.45, 0.32), rh.z); }
  } else if (th == ty) {
    if (rd.y >= 0.0) { col = floorC; lamp = 0.3; }
    else { col = vec3f(0.9); lamp = 1.0 - 0.7 * min(length(vec2f(hp.x - RW * 0.5, hp.z - RD * 0.5)) / RD, 1.0); }
  }
  let deep = sat(hp.z / RD);
  // (a room by day is several times darker than the sunlit wall outside it)
  let dayIn = (frame.skyIrradiance * PI * 0.3 + frame.sunColor * max(frame.sunDir.y, 0.0) * 0.035) * mix(0.85, 0.12, deep);
  var room = col * dayIn * INV_PI * 1.15 + s.emissive * col * (0.5 + 1.15 * lamp);
  // A window a few pixels across: the room's average (single cells would flicker).
  let avg = wallC * (dayIn * INV_PI * 0.7 + s.emissive * 0.95);
  room = mix(room, avg, smoothstep(0.12, 0.45, roomFilter));
  s.emissive = mix(s.emissive, room, roomOpen);
  s.albedo = mix(s.albedo, vec3f(0.012, 0.014, 0.016), roomOpen);
  s.metalness = mix(s.metalness, 0.0, roomOpen);
  s.roughness = mix(s.roughness, 0.05, roomOpen);
  s.specularIntensity = mix(s.specularIntensity, 3.3, roomOpen);`,Si=`{
  let a = s.albedo; let lum = luminance(a);
  let hi = max(a.r, max(a.g, a.b)); let chroma = (hi - min(a.r, min(a.g, a.b))) / max(hi, 1e-4);
  let xz = in.P.xz;
  let px = max(length(fwidth(xz)), 1e-4);
  let fine = 1.0 - smoothstep(0.02, 0.09, px);
  let mid = 1.0 - smoothstep(0.15, 0.7, px);
  let broad = skyNoise(xz * 0.07) * 0.6 + skyNoise(xz * 0.23 + 3.7) * 0.4;
  // Keep all visible frequencies; a zero footprint weight needs no noise.
  var grain = 0.0;
  if (fine > 0.0) { grain = skyNoise(xz * 3.1) * 0.5 + skyNoise(xz * 7.3 + 1.3) * 0.5; }
  let grass = smoothstep(0.015, 0.06, a.g - max(a.r, a.b));
  let tar = (1.0 - grass) * (1.0 - smoothstep(0.05, 0.13, lum)) * (1.0 - smoothstep(0.15, 0.35, chroma));
  let pave = (1.0 - grass) * smoothstep(0.13, 0.28, lum) * (1.0 - smoothstep(0.2, 0.4, chroma));
  var alb = a;
  // grass
  // (lawns read olive rather than paint-green; clumps and worn patches break them up)
  alb = mix(alb, vec3f(luminance(alb)) * vec3f(0.95, 1.12, 0.62) + alb * 0.25, grass * 0.45);
  let clump = mix(0.7, 1.15, broad) * mix(1.0, mix(0.74, 1.2, grain), fine);
  var dry = 0.0;
  if (grass * mid > 0.0) { dry = smoothstep(0.55, 0.8, skyNoise(xz * 0.045 + 9.1)); }
  alb *= mix(1.0, clump, grass);
  alb = mix(alb, alb * vec3f(1.35, 1.1, 0.7), dry * grass * 0.7 * mid);
  // (asphalt is a neutral dark grey, never the blue the painted plan and the sky tint give it)
  alb = mix(alb, vec3f(luminance(alb)) * vec3f(1.02, 1.0, 0.97), tar * 0.7);
  // asphalt: coarse aggregate, worn and patched (repairs a few metres across), the odd stain
  var agg = 1.0; var repair = 0.0; var stain = 0.0;
  if (tar > 0.0) {
    if (fine > 0.0) { agg = mix(0.72, 1.25, skyHash(floor(xz * 45.0))); }
    repair = smoothstep(0.68, 0.72, skyNoise(floor(xz * 0.4) * 0.37 + 11.0)) * 0.14;
    if (mid > 0.0) { stain = smoothstep(0.7, 0.9, skyNoise(xz * 0.9 + 4.2)) * 0.18; }
  }
  alb *= mix(1.0, mix(0.84, 1.1, broad) * (1.0 - repair - stain * mid) * mix(1.0, agg, fine * 0.7), tar);
  // (stone chips catch the sun: a jittered normal per few centimetres, only up close)
  var chip = vec2f(0.0);
  if (fine * (tar + pave * 0.5) > 0.0) { chip = vec2f(skyHash(floor(xz * 30.0) + 1.7), skyHash(floor(xz * 30.0) + 8.3)) - 0.5; }
  s.normal = normalize(s.normal + vec3f(chip.x, 0.0, chip.y) * 0.22 * fine * (tar + pave * 0.5));
  // paving blocks
  let bw = vec2f(0.2, 0.1);
  var q = xz / bw; q.x += 0.5 * step(0.5, fract(q.y * 0.5));
  let cellB = floor(q); let fb = fract(q);
  let joint = min(min(fb.x, 1.0 - fb.x) * bw.x, min(fb.y, 1.0 - fb.y) * bw.y);
  let jointK = 1.0 - smoothstep(0.004, 0.011, joint);
  let fineP = 1.0 - smoothstep(0.012, 0.045, px);
  var blockTone = 1.0;
  if (fineP * pave * mid > 0.0) { blockTone = mix(0.9, 1.08, skyHash(cellB + 3.1)); }
  alb *= mix(1.0, mix(0.93, 1.04, broad) * mix(1.0, blockTone * (1.0 - 0.32 * jointK), fineP), pave * mid);
  s.albedo = alb;
  s.roughness = s.roughness * mix(1.0, mix(0.86, 1.08, grain), fine);
}`,_i=`{
  let xz = in.P.xz;
  let px = max(length(fwidth(xz)), 1e-4);
  let m = skyNoise(xz * 0.18) * 0.6 + skyNoise(xz * 0.61 + 2.0) * 0.4;
  let d = (0.5 - abs(fract(xz / 4.5) - 0.5)) * 4.5;
  let seam = (1.0 - smoothstep(0.02, 0.06, min(d.x, d.y))) * (1.0 - smoothstep(0.04, 0.2, px));
  s.albedo *= mix(0.8, 1.1, m) * (1.0 - 0.2 * seam);
  s.roughness *= mix(0.82, 1.05, m);
}`,Mi=`if (abs(in.N.y) < 0.5) {
  let along = dot(in.P.xz, normalize(vec2f(-in.N.z, in.N.x) + vec2f(1e-5, 0.0)));
  let px = max(length(fwidth(in.P)), 1e-4);
  let streakWeight = 1.0 - smoothstep(0.3, 1.5, px);
  var streak = 0.0;
  if (streakWeight > 0.0) { streak = smoothstep(0.55, 0.9, skyNoise(vec2f(along * 1.7, in.P.y * 0.07))) * streakWeight; }
  let drift = mix(0.95, 1.03, skyNoise(vec2f(along * 0.035, in.P.y * 0.02) + 5.3));
  s.albedo *= drift * (1.0 - 0.09 * streak);
}`,zi=(h,e,t,s)=>`{
  let dN = normalize(in.N);
  let dTop = abs(dN.y) > 0.7;
  let dRun = normalize(vec3f(-dN.z, 0.0, dN.x) + vec3f(1e-5, 0.0, 0.0));
  let dUV = select(vec2f(dot(in.P, dRun), in.P.y), in.P.xz, dTop) / ${h.toFixed(3)};
  let dT = select(dRun, vec3f(1.0, 0.0, 0.0), dTop);
  let dB = select(vec3f(0.0, 1.0, 0.0), vec3f(0.0, 0.0, 1.0), dTop);
  let dFine = textureSample(detailMap, smpAnisoRepeat, dUV);
  let dBroad = textureSample(detailMap, smpAnisoRepeat, dUV * 0.21 + vec2f(0.37, 0.61));
  let dPx = max(length(fwidth(in.P)), 1e-4);
  let dNear = (1.0 - smoothstep(0.012, 0.07, dPx)) * (1.0 - smoothstep(0.3, 0.5, s.metalness));
  let dMid = (1.0 - smoothstep(0.15, 0.6, dPx)) * (1.0 - smoothstep(0.3, 0.5, s.metalness));
  s.albedo *= mix(1.0, dFine.r * 2.0, dNear * ${e.toFixed(2)}) * mix(1.0, dBroad.r * 2.0, dMid * ${(e*.7).toFixed(2)});
  let dn = dFine.gb * 2.0 - 1.0;
  s.normal = normalize(s.normal + (dT * dn.x + dB * dn.y) * dNear * ${t.toFixed(2)});
  s.roughness = mix(s.roughness, s.roughness * clamp(dFine.a / ${s.toFixed(3)}, 0.6, 1.4), dNear * 0.6);
}`,Ba=`{
  let part = i32(floor(in.uv.x * 16.0));
  var paint = vec3f(0.8);
#if INSTANCE_COLOR
  paint = clamp((in.color.rgb - 0.3) / 0.7, vec3f(0.0), vec3f(1.0));
#endif
  s.clearcoat = 0.0; s.metalness = 0.0; s.roughness = 0.6; s.emissive = vec3f(0.0);
  switch part {
    case 0: { s.albedo = paint * 0.92; s.clearcoat = 1.0; s.clearcoatRoughness = 0.12; s.roughness = 0.32; s.metalness = 0.35; }
    case 1: { s.albedo = vec3f(0.012, 0.015, 0.02); s.roughness = 0.12; s.specularIntensity = 3.0; }
    case 2: { s.albedo = vec3f(0.03); s.roughness = 0.55; }
    case 3: { s.albedo = vec3f(0.6, 0.61, 0.63); s.metalness = 1.0; s.roughness = 0.3; }
    case 4: { s.albedo = vec3f(0.78, 0.79, 0.8); s.metalness = 1.0; s.roughness = 0.16; }
    case 5: { s.albedo = vec3f(0.85, 0.85, 0.82); s.roughness = 0.12; s.specularIntensity = 2.0; }
    case 6: { s.albedo = vec3f(0.42, 0.02, 0.02); s.roughness = 0.14; s.specularIntensity = 2.0; }
    case 7: { s.albedo = vec3f(0.78, 0.78, 0.75); s.roughness = 0.45; }
    case 8: { s.albedo = vec3f(0.95, 0.6, 0.1); s.roughness = 0.4; }
    case 10: { s.albedo = vec3f(0.66, 0.68, 0.7); s.metalness = 0.6; s.roughness = 0.38; }
    case 11: { s.albedo = vec3f(0.86, 0.86, 0.84); s.clearcoat = 1.0; s.clearcoatRoughness = 0.15; s.roughness = 0.35; s.metalness = 0.2; }
    default: { s.albedo = vec3f(0.018); s.roughness = 0.9; }
  }
}`,Ea={paint:[.55,.45],granite:[.6,.35],concrete:[.6,.5],roof:[.55,.45]},Ia=`{
  let t = carTex; let tl = luminance(t);
  let glass = smoothstep(0.08, 0.16, t.b - t.r) * smoothstep(0.45, 0.65, tl);
  let dark = 1.0 - smoothstep(0.02, 0.07, tl);
  let body = (1.0 - glass) * (1.0 - dark);
#if INSTANCE_COLOR
  // The repaint was made for multiplying over the swatch (lerped 30 % toward white): here the
  // body takes the paint itself — white, silver, black as on Korean roads, not a red-tinted
  // version of each over the kit's red body.
  let paint = clamp((in.color.rgb - 0.3) / 0.7, vec3f(0.0), vec3f(1.0));
  s.albedo = mix(s.albedo, paint * mat.color * 0.92, body);
#endif
  s.clearcoat = body; s.clearcoatRoughness = 0.12;
  s.roughness = mix(mix(s.roughness, 0.85, dark), 0.3, body);
  s.metalness = mix(s.metalness * (1.0 - dark), 0.3, body);
  s.albedo = mix(s.albedo, vec3f(0.01, 0.012, 0.015), glass);
  s.roughness = mix(s.roughness, 0.12, glass);
  s.metalness = mix(s.metalness, 0.0, glass);
  s.specularIntensity = mix(s.specularIntensity, 3.0, glass);
}`;function uo(){return rr().then(()=>ea()).catch(()=>{})}async function La(){try{const h=await createImageBitmap(new ImageData(4,4));for(const e of["rgba8unorm-srgb","rgba8unorm"])for(const t of[!1,!0]){const s=g.device.createTexture({size:[4,4],format:e,usage:GPUTextureUsage.COPY_DST|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.RENDER_ATTACHMENT});g.queue.copyExternalImageToTexture({source:h,flipY:t},{texture:s},[4,4]),g.onSubmit(null,()=>s.destroy())}h.close()}catch{}}const Pi=h=>h.moving===!0,Na=typeof location<"u"&&new URLSearchParams(location.search).get("strips")==="0",Fa="0.14, 0.46, face",Ua="0.5, 0.78, abs(v.y)";function Oa(h){const e=h.elements;for(let t=0;t<16;t++)if(e[t]!==(t%5===0?1:0))return!1;return!0}function Va(h,e){const t=h.elements,s=e.elements;for(let i=0;i<16;i++)if(t[i]!==s[i])return!1;return!0}class nr{static async create(e,t=Kt.high){var i;await rr(),((i=g.adapter.info)!=null&&i.isFallbackAdapter||g.adapter.isFallbackAdapter)&&(t=Kt.low);const s=new nr(e,t);return s.health=new Vn(g.device),s.detailReady=!1,ys.finally(()=>{s.detailReady=!0}),s}constructor(e,t=Kt.high){if(this.quality=t,nt(t),this.canvas=document.createElement("canvas"),this.canvas.style.pointerEvents="none",this.canvas.style.visibility="hidden",this.canvas.setAttribute("aria-hidden","true"),this.context=this.canvas.getContext("webgpu"),!this.context)throw new Error("WebGPU canvas unavailable");this.context.configure({device:g.device,format:g.format,alphaMode:"opaque"}),e.appendChild(this.canvas),this.scene=new ji,this.scene.matrixAutoUpdate=!1,this.camera=new is,this.renderer=new hn,this.renderer.deferGeometryDisposal=!0,this.renderer.reuseDrawLists=!0,this.renderer.pipelinesPerFrame=3,this.renderer.pipelineGapMs=5,this.renderer.syncPipelines=!1,this.renderer.bundles=typeof location>"u"||new URLSearchParams(location.search).get("bundles")!=="0",this.renderer.bundleChunking=!0,this.renderer.bundleChunkSize=1,this.renderer.dirtyDrawUploads=!0,this.target=new de(1,1,{colors:["rgba16float"],depth:"depth32float",label:"complex HDR"}),this.copy=null,this.droneSkyTex=new G({label:"drone sky stand-in",width:1,height:1,format:"rgba8unorm-srgb",usage:["sample","copyDst"]}),this.droneSkyTex.upload(new Uint8Array([140,170,220,255])),this.sky=new re({label:"complex atmosphere",modules:[lt],code:da,colorFormats:["rgba16float"],depthFormat:"depth32float",depthCompare:"equal",bindings:{droneSkyTex:{texture:()=>this.droneSkyTex}}}),oe.get("envdebug")&&(this.sky=new re({label:"complex env debug",modules:[lt],colorFormats:["rgba16float"],depthFormat:"depth32float",depthCompare:"always",bindings:{envCube:{texture:xs,viewDimension:"cube"}},code:`
      fn fragment(in: FSIn) -> vec4f {
        let p = frame.invProj * vec4f(in.uv.x * 2.0 - 1.0, 1.0 - in.uv.y * 2.0, 0.001, 1.0);
        let ray = normalize((frame.invView * vec4f(normalize(p.xyz / p.w), 0.0)).xyz);
        let s = textureSampleLevel(envCube, smpLinearClamp, ray * vec3f(1.0, 1.0, -1.0), 0.0);
        return vec4f(mix(vec3f(1.0, 0.0, 1.0), s.rgb, s.a), 1.0);
      }`})),this.aoOn=wa&&t.name!=="low";const s={texture:()=>this.target.depthTexture,sampleType:"unfilterable-float"};if(this.aoOn&&(this.ao=new de(1,1,{colors:["rg16float"],label:"complex ao",usage:["sample","render"]}),this.aoRaw=new de(1,1,{colors:["rg32float"],label:"complex ao full depth",usage:["sample","render"]}),this.aoTmp=new de(1,1,{colors:["rg32float"],label:"complex ao blur",usage:["sample","render"]})),this.depthBinding=s,this.bloomOn=ba&&t.name!=="low",this.bloomOn){this.bloomRT=[];for(let i=0;i<gi;i++)this.bloomRT.push(new de(1,1,{colors:["rgba16float"],label:"complex bloom "+i,usage:["sample","render"]}))}this.taaOn=Sa,this.taaOn&&(this.taaHist=[0,1].map(i=>new de(1,1,{colors:["rgba16float"],label:"complex taa "+i,usage:["sample","render"]})),this.taaIdx=0,this.taaPass=new re({label:"complex taa",code:_a,colorFormats:["rgba16float"],bindings:{src:{texture:()=>this.target.texture},hist:{texture:()=>this.taaHist[this.taaIdx^1].texture},sceneDepth:s,taa:{uniform:vi}}})),this.resolved=()=>this.taaNow?this.taaHist[this.taaIdx]:this.target,Ma&&(this.env={tex:new G({width:se,height:se,dimension:"cube",format:"rgba16float",usage:["sample","copyDst"],label:"complex env"}),back:new G({width:se,height:se,dimension:"cube",format:"rgba16float",usage:["sample","copyDst"],label:"complex env back"}),faceRT:new de(se,se,{colors:["rgba16float"],label:"complex env face",usage:["render","copySrc"]}),depth:new de(se,se,{colors:[],depth:"depth32float",label:"complex env depth"}),block:Hi("complex env view"),cam:new is(90,1,.5,4e3),face:-1,dirtyAt:performance.now(),key:"",meshes:0,on:!1}),this.finish=new re({label:"complex filmic resolve",modules:[new ae({name:"complex precipitation",code:pa})],code:ma,colorFormats:[g.format],defines:{AO:this.aoOn?1:0,AO_SHOW:oe.get("ao")==="show"?1:0,TONEMAP_NEUTRAL:va?1:0,BLOOM:this.bloomOn?1:0},bindings:{src:{texture:()=>this.resolved().texture},sceneDepth:s,...this.aoOn?{aoTex:{texture:()=>this.ao.texture}}:{},...this.bloomOn?{bloomTex:{texture:()=>this.bloomRT[0].texture},bloom:{uniform:at}}:{}}}),this.meshes=new Map,this.materials=new Map,this.textures=new Map,this.ready=!1,this.shown=!1,this.failed=!1,this.disposed=!1,this.compiling=!1,this.stats=this.renderer.stats,this.timer=new Wn}makePost(){if(this.postMade)return;this.postMade=!0;const e=this.depthBinding;if(this.aoOn&&(this.aoPass=new re({label:"complex ao",code:Gn(),colorFormats:["rg32float"],bindings:{sceneDepth:e}}),this.aoBlurX=new re({label:"complex ao blur x",code:hi(0),colorFormats:["rg32float"],bindings:{aoSrc:{texture:()=>this.aoRaw.texture,sampleType:"unfilterable-float"},sceneDepth:e}}),this.aoBlurY=new re({label:"complex ao blur y",code:hi(1),colorFormats:["rg16float"],bindings:{aoSrc:{texture:()=>this.aoTmp.texture,sampleType:"unfilterable-float"},sceneDepth:e}})),this.bloomOn){const t={bloom:{uniform:at}};this.bloomDown=this.bloomRT.map((s,i)=>new re({label:"complex bloom down "+i,code:xa(i===0),colorFormats:["rgba16float"],bindings:{src:{texture:()=>(i===0?this.resolved():this.bloomRT[i-1]).texture},...i===0?t:{}}})),this.bloomUp=this.bloomRT.slice(1).map((s,i)=>new re({label:"complex bloom up "+i,code:ga,colorFormats:["rgba16float"],blend:"add",bindings:{src:{texture:()=>this.bloomRT[i+1].texture}}}))}}probeBloom(){if(this.probing)return;const e=this.bloomRT[gi-1],t=e.width,s=e.height,i=Math.ceil(t*8/256)*256,r=g.device.createBuffer({size:i*s,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});g.getEncoder().copyTextureToBuffer({texture:e.texture.getGPU()},{buffer:r,bytesPerRow:i},[t,s]),this.probing=!0,setTimeout(()=>r.mapAsync(GPUMapMode.READ).then(()=>{const a=new Uint16Array(r.getMappedRange());let n=0,o=0;for(let c=0;c<s;c++)for(let f=0;f<t*4;f++){const d=a[c*i/2+f],u=d>>10&31;u===31?n++:o=Math.max(o,u)}r.unmap(),r.destroy(),this.probing=!1;const l=window;l.__hdrFrames=(l.__hdrFrames??0)+1,n&&(l.__hdrBad=(l.__hdrBad??0)+1,console.warn("[3D probe] non-finite bloom",n,performance.now().toFixed(0))),l.__hdrMaxExp=Math.max(l.__hdrMaxExp??0,o)}).catch(()=>{this.probing=!1}),0)}setSize(e,t,s){var l,c,f,d,u,m;const i=g.device.limits.maxTextureDimension2D,r=Math.min(i,Math.max(1,Math.round(e*s))),a=Math.min(i,Math.max(1,Math.round(t*s)));if(this.canvas.width===r&&this.canvas.height===a)return;ur(this.canvas,r,a,fr().maxPixels),this.canvas.width=r,this.canvas.height=a,this.target.setSize(this.canvas.width,this.canvas.height),(l=this.copy)==null||l.setSize(this.canvas.width,this.canvas.height),(c=this.taaHist)==null||c.forEach(p=>p.setSize(this.canvas.width,this.canvas.height)),this.taaValid=!1;const n=Math.max(1,Math.ceil(r/2)),o=Math.max(1,Math.ceil(a/2));(f=this.ao)==null||f.setSize(n,o),(d=this.aoRaw)==null||d.setSize(n,o),(u=this.aoTmp)==null||u.setSize(n,o),(m=this.bloomRT)==null||m.forEach((p,x)=>p.setSize(Math.max(1,r>>x+1),Math.max(1,a>>x+1)))}suspendTargets(){var e;if(!(this.suspended||this.disposed||!this.shown)){this.suspended=!0;for(const t of[this.target,this.copy,this.ao,this.aoRaw,this.aoTmp,...this.taaHist??[],...this.bloomRT??[]])t==null||t.textures.forEach(s=>s.destroy()),(e=t==null?void 0:t.depthTexture)==null||e.destroy();this.context.unconfigure(),this.taaValid=!1}}setShadowSplits(e){Xe=e,nt(this.quality)}setDroneLite(e){this.halfSync=e&&!/[?&]halfsync=0/.test(location.search),e?(Xe=[200,900],nt(this.quality)):(Xe=null,nt(this.quality))}setQuality(e){var t,s,i;if(this.quality!==e){this.quality=e,nt(e);for(const[r,a]of this.materials)r.userData.water&&(a.dispose(),(t=a.uniformBlock.buffer)==null||t.destroy(),this.materials.delete(r));for(const[r,a]of this.meshes)(i=(s=r.material)==null?void 0:s.userData)!=null&&i.water&&(this.scene.remove(a),this.meshes.delete(r))}}staged(e){const t=e.image,s=t.width,i=t.height;this.stagings??(this.stagings=new Map);let r=this.stagings.get(e);if(r&&r.version!==e.version&&(r.tex.destroy(),r=null),r||(r={tex:new G({label:"staged canvas",width:s,height:i,format:"rgba8unorm",mips:!0,usage:["sample","render","copySrc","copyDst"]}),y:0,version:e.version,at:this.frameNo},this.stagings.set(e,r)),r.y<i){this.stageFrame!==this.frameNo&&(this.stageFrame=this.frameNo,this.stageBudget=this.shown?6e5:12e5);const a=typeof ImageBitmap<"u"&&t instanceof ImageBitmap,n=a?null:t.getContext("2d",{willReadFrequently:!0});if(!a&&!n)return this.stagings.delete(e),r.tex.destroy(),null;for(;this.stageBudget>=s&&r.y<i;){const o=Math.min(a?i:128,i-r.y,Math.max(1,Math.floor(this.stageBudget/s)));if(a){g.queue.copyExternalImageToTexture({source:t,origin:{x:0,y:r.y},flipY:e.flipY},{texture:r.tex.getGPU(),origin:{x:0,y:e.flipY?i-r.y-o:r.y}},[s,o]),r.y+=o,this.stageBudget-=s*o;continue}const l=n.getImageData(0,r.y,s,o).data;let c=l,f=r.y;if(e.flipY){f=i-r.y-o,c=new Uint8Array(l.length);for(let d=0;d<o;d++)c.set(l.subarray(d*s*4,(d+1)*s*4),(o-1-d)*s*4)}g.queue.writeTexture({texture:r.tex.getGPU(),origin:{x:0,y:f}},c,{bytesPerRow:s*4,rowsPerImage:o},{width:s,height:o}),r.y+=o,this.stageBudget-=s*o}}return r.y>=i?r.tex:null}fromStaged(e,t,s){if(this.stagings.delete(e),s.format.startsWith("bc7")){kt(null,{staged:t,into:s});return}g.getEncoder().copyTextureToTexture({texture:t.getGPU()},{texture:s.getGPU()},[t.width,t.height,1]),we(s),g.onSubmit(null,()=>t.destroy())}stripped(e){var t,s;return Na||!e||e.width*e.height<512*512||e.width%4||e.height%4?!1:typeof ImageBitmap<"u"&&e instanceof ImageBitmap?!0:typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement?(e.__cpu===void 0&&(e.__cpu=!!((s=(t=e.getContext("2d"))==null?void 0:t.getContextAttributes)!=null&&s.call(t).willReadFrequently)),e.__cpu):!1}snapshot(e,t=!0){const s=e.image;if(s&&this.stripped(s))return!t||this.staged(e)?s:null;if(!(typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement))return s;this.snaps??(this.snaps=new Map);const i=this.snaps.get(e);if(i)return i.ready?s:null;const r={version:e.version,ready:!1};this.snaps.set(e,r);const a=()=>{r.ready=!0};return s.decode?s.decode().then(a,a):a(),null}dropSnapshot(e){var t;(t=this.snaps)==null||t.delete(e)}imagesReady(e){var s,i,r,a,n,o;let t=!0;for(const l of Array.isArray(e)?e:[e]){for(const c of[l.map,l.emissiveMap,(i=(s=l.userData)==null?void 0:s.farGround)==null?void 0:i.map])!c||this.textures.has(c)||(r=c.userData)!=null&&r.compressed||this.immutableKey(c)&&this.pool().peek(this.immutableKey(c))||this.snapshot(c)||(t=!1);for(const c of[l.normalMap,l.roughnessMap,l.metalnessMap]){if(!c||this.textures.has(c)||(a=c.userData)!=null&&a.compressed||(n=c.userData)!=null&&n.released)continue;const f=(o=c.userData)==null?void 0:o.surfaceKey;f&&this.pool().peek("surface/"+f+"/"+c.image.width+"/"+c.image.height)||this.snapshot(c)||(t=!1)}}return t}texture(e){var l,c,f,d;if(this.textures.has(e))return this.textures.get(e);const t=this.immutableKey(e),s=t&&this.pool().acquire(t,this);if(s)return this.textures.set(e,s),this.dropStaging(e),this.release(e),s;const i=(l=e.userData)==null?void 0:l.compressed;if(i&&g.features.has(i.format.startsWith("etc2")?"texture-compression-etc2":"texture-compression-bc")){const u=new G({width:i.width,height:i.height,format:i.format,mips:i.levels.length,usage:["sample","copyDst"]});return i.levels.forEach(({w:m,h:p,data:x},y)=>{const v=Math.ceil(m/4),w=Math.ceil(p/4);g.queue.writeTexture({texture:u.getGPU(),mipLevel:y},x,{bytesPerRow:v*16,rowsPerImage:w},{width:v*4,height:w*4})}),u.sourceVersion=e.version,this.textures.set(e,u),u}const r=e.image;if(!(r!=null&&r.width)||!(r!=null&&r.height))return null;const a=e.version,n=this.stripped(r)&&((f=(c=this.stagings)==null?void 0:c.get(e))==null?void 0:f.version)===a?this.staged(e):null;if(!n&&((d=this.stagings)!=null&&d.has(e))&&(this.stagings.get(e).tex.destroy(),this.stagings.delete(e)),!r.data&&e.colorSpace==="srgb"&&Kn()){const u=n?(this.stagings.delete(e),kt(null,{staged:n})):kt(r,{flipY:e.flipY});return u.sourceVersion=a,this.textures.set(e,u),this.dropSnapshot(e),this.release(e),u}const o=new G({width:r.width,height:r.height,format:e.colorSpace==="srgb"?"rgba8unorm-srgb":"rgba8unorm",mips:!0,usage:["sample","render","copyDst"]});return n?this.fromStaged(e,n,o):(r.data?o.upload(r.data):g.queue.copyExternalImageToTexture({source:r,flipY:e.flipY},{texture:o.getGPU()},[r.width,r.height]),we(o)),o.sourceVersion=a,t&&this.pool().acquire(t,this,()=>o),this.textures.set(e,o),this.dropSnapshot(e),this.release(e),o}packedSurface(e){const t=e.normalMap,s=e.roughnessMap;if(!t||!s||e.metalnessMap&&e.metalnessMap!==s)return null;if(this.textures.has(t))return this.textures.get(t).packed?this.textures.get(t):null;const i=t.image,r=s.image,a=(c,f)=>c.x===f.x&&c.y===f.y;if(!(i!=null&&i.width)||!(r!=null&&r.width)||i.width!==r.width||i.height!==r.height||t.flipY!==s.flipY||t.wrapS!==1e3||s.wrapS!==1e3||!a(t.repeat,s.repeat)||!a(t.offset,s.offset))return null;const n=t.userData.surfaceKey&&t.userData.surfaceKey===s.userData.surfaceKey?t.userData.surfaceKey+"/"+i.width+"/"+i.height:null;this.surfaceCache??(this.surfaceCache=new Map);const o=n&&this.pool().acquire("surface/"+n,this);if(o)return this.textures.set(t,o),this.dropStaging(t),this.dropStaging(s),this.release(t),this.release(s),o;const l=new G({width:i.width,height:i.height,format:"rgba8unorm",mips:!0,usage:["sample","render"]});return ui(l,[this.packSource(t),this.packSource(s)],"vec4f(A.x, A.y, B.y, B.z)"),this.dropStaging(t),this.dropStaging(s),l.packed=!0,l.sourceVersion=t.version,this.textures.set(t,l),n&&this.surfaceCache.set(n,l),n&&this.pool().acquire("surface/"+n,this,()=>l),this.release(t),this.release(s),l}singleChannel(e){const t=this.textures.get(e);if(t)return t.channel?t:null;const s=this.immutableKey(e),i=s&&"channel/G/"+s,r=i&&this.pool().acquire(i,this);if(r)return this.textures.set(e,r),this.dropStaging(e),this.release(e),r;const a=e.image;if(!(a!=null&&a.width)||!(a!=null&&a.height)||a.data)return null;const n=new G({width:a.width,height:a.height,format:"r8unorm",mips:!0,usage:["sample","render"]}),o=()=>{ui(n,[this.packSource(e)],"vec4f(A.y, 0.0, 0.0, 1.0)"),this.dropStaging(e)};return o(),i||(n.repack=o),n.channel=!0,n.sourceVersion=e.version,this.textures.set(e,n),i&&this.pool().acquire(i,this,()=>n),this.release(e),n}packSource(e){var s;const t=(s=this.stagings)==null?void 0:s.get(e);return(t==null?void 0:t.version)===e.version&&t.y>=e.image.height?{texture:t.tex.getGPU()}:{img:e.image,flipY:e.flipY}}pool(){return this.sharedTextures??(this.sharedTextures=Yn(g.device))}immutableKey(e){var s;const t=(s=e.userData)==null?void 0:s.immutableKey;return t?"image/"+t+"/"+e.colorSpace+"/"+e.flipY:null}dropStaging(e){var s;const t=(s=this.stagings)==null?void 0:s.get(e);t&&(this.stagings.delete(e),g.onSubmit(null,()=>t.tex.destroy()))}release(e){var s;const t=e.image;!((s=e.userData)!=null&&s.releaseAfterUpload)||e.userData.released||!t||t.data||!("width"in t)||(typeof t.close=="function"?t.close():(t.width=1,t.height=1),e.userData.released=!0,this.released=(this.released??0)+1)}droneSkyPicture(){this.droneSkyAsked=!0,lr("/3d/drone/sky.jpg").then(e=>e.ok?e.blob():Promise.reject(new Error(String(e.status)))).then(e=>createImageBitmap(e,{imageOrientation:"none"})).then(e=>{if(this.disposed){e.close();return}const t=new G({label:"drone sky",width:e.width,height:e.height,format:"rgba8unorm-srgb",mips:!0,usage:["sample","render","copyDst"]});g.queue.copyExternalImageToTexture({source:e},{texture:t.getGPU()},[e.width,e.height]),we(t),e.close();const s=this.droneSkyTex;this.droneSkyTex=t,this.droneSkyReady=!0,g.onSubmit(null,()=>s.destroy())}).catch(e=>console.info("[3D] drone sky picture unavailable:",e))}refreshTextures(){let e=45e5;for(const[t,s]of this.textures){if(s.sourceVersion===t.version)continue;if(e<=0)break;const i=t.image;if(!(i!=null&&i.width)||i.data||i.width!==s.width||i.height!==s.height||s.packed){s.sourceVersion=t.version;continue}if(s.repack){if(this.stripped(i)&&!this.staged(t))continue;s.sourceVersion=t.version,s.repack(),this.release(t);continue}const r=i;if(this.stripped(r)){const a=this.staged(t);if(!a)continue;s.sourceVersion=t.version,this.fromStaged(t,a,s),this.release(t);continue}s.sourceVersion=t.version,e-=r.width*r.height,s.format.startsWith("bc7")?kt(r,{flipY:t.flipY,into:s}):(g.queue.copyExternalImageToTexture({source:r,flipY:t.flipY},{texture:s.getGPU()},[r.width,r.height]),we(s)),this.dropSnapshot(t),this.release(t)}}material(e){const t=this.materials.get(e);if(t&&t.srcVersion===e.version)return t;t&&(this.materials.delete(e),(this.retired??(this.retired=[])).push(t));const s=this.makeMaterial(e);return s.source=e,s.srcVersion=e.version,s}makeMaterial(e){if(e.userData.water){this.copy??(this.copy=new de(this.target.width,this.target.height,{colors:["rgba16float"],depth:"depth32float",label:"complex scene copy",usage:["sample","copyDst"],depthUsage:["sample","copyDst"]}));const p=Un({atmosphere:lt,scene:this.copy,quality:this.quality});return this.materials.set(e,p),p}const t={},s={},i=Ta&&!!(e.userData.interior&&e.emissiveMap),r=!!(e.userData.carPaint&&e.map),a=za&&i&&(e.userData.interior===!0||e.userData.interior.recess===!0);let n=`#if !PASS_DEPTH
envP = in.P;
#endif
var puv = in.uv;
var reveal = 0.0;
var revealUV = in.uv;
`+(a?Pa:"")+(i?`var roomOpen = 0.0;
`:"")+(r?`var carTex = vec3f(0.5);
`:"");const o=!!e.userData.constructedBuilding;o&&(n+=`if (in.vs.facade.z <= 0.0) {
`);const l=this.packedSurface(e),c=!l&&e.roughnessMap&&e.roughnessMap!==e.metalnessMap?this.singleChannel(e.roughnessMap):null,f=e.userData.plate;f&&e.map&&(t.map=this.texture(e.map),s.plateGrid=["vec4f",[f.cols,f.rows,0,0]],n+=`{ let pid = floor(in.color.r * 255.0 + 0.5) + 256.0 * floor(in.color.g * 255.0 + 0.5);
        let cell = vec2f(pid % mat.plateGrid.x, floor(pid / mat.plateGrid.x));
        let puv = (cell + clamp(in.uv, vec2f(0.01), vec2f(0.99))) / mat.plateGrid.xy;
        s.albedo = textureSampleLevel(map, smpLinearClamp, puv, 0.0).rgb; s.roughness = 0.45; s.metalness = 0.0; }
`);for(const[p,x]of f?[]:[["map",r?"s.albedo *= texel.rgb; s.alpha *= texel.a; carTex = texel.rgb;":"s.albedo *= texel.rgb; s.alpha *= texel.a;"],["roughnessMap",c?"s.roughness *= texel.r;":"s.roughness *= texel.g;"],["metalnessMap","s.metalness *= texel.b;"],["emissiveMap",i?"s.emissive *= texel.rgb; roomOpen = texel.a;":"s.emissive *= texel.rgb;"]]){if(l&&(p==="roughnessMap"||p==="metalnessMap"))continue;const y=e[p]&&(p==="roughnessMap"&&c?c:this.texture(e[p]));if(!y)continue;t[p]=y;const v=e[p];s["uv"+p]=["vec4f",[v.repeat.x,v.repeat.y,v.offset.x,v.offset.y]];const w=v.wrapS===1e3?"smpAnisoRepeat":"smpAnisoClamp",M=r&&p==="map"?`textureSampleLevel(${p}, smpLinearClamp, uv, 0.0)`:`textureSample(${p}, ${w}, uv)`;n+=`{ let uv = puv * mat.uv${p}.xy + mat.uv${p}.zw; let texel = ${M}; ${x} }
`}if(e.normalMap){t.normalMap=l??this.texture(e.normalMap);const p=e.normalMap;s.uvNormal=["vec4f",[p.repeat.x,p.repeat.y,p.offset.x,p.offset.y]],n+=`{
        let uv = puv * mat.uvNormal.xy + mat.uvNormal.zw;
        ${l?`let packed = textureSample(normalMap, smpAnisoRepeat, uv);
        var mapN = vec3f(packed.xy * 2.0 - 1.0, 0.0);
        mapN.z = sqrt(max(1.0 - dot(mapN.xy, mapN.xy), 0.0));
        s.roughness *= packed.z;${e.metalnessMap===e.roughnessMap?" s.metalness *= packed.w;":""}`:"let mapN = textureSample(normalMap, smpAnisoRepeat, uv).xyz * 2.0 - 1.0;"}
        let q0 = dpdx(in.P); let q1 = dpdy(in.P);
        let st0 = dpdx(uv); let st1 = dpdy(uv);
        let q1p = cross(q1, in.N); let q0p = cross(in.N, q0);
        let T = q1p * st0.x + q0p * st1.x;
        let B = q1p * st0.y + q0p * st1.y;
        let inv = inverseSqrt(max(max(dot(T,T), dot(B,B)), 0.000001));
        // Relief reads up close; far away it only sparkles, so it fades out.
        let near = 0.65 * (1.0 - smoothstep(60.0, 260.0, length(in.P - frame.cameraPos)));
        s.normal = normalize(T * inv * mapN.x * near + B * inv * mapN.y * near + in.N * mapN.z);
      }`}if(i){const p={grid:[8,8],bay:3.2,storey:2.9,ceil:0,floor:.9,...typeof e.userData.interior=="object"?e.userData.interior:{}};s.room=["vec4f",[p.grid[0],p.grid[1],p.bay,p.storey]],s.roomCF=["vec4f",[p.ceil,p.floor,0,0]];const x=Da.replace("in.uv * REPEAT","puv * REPEAT").replace("REPEAT","mat.uvemissiveMap.xy").replace("OFFSET","mat.uvemissiveMap.zw").replace("GRID","mat.room.xy").replaceAll("BAYW","mat.room.z").replaceAll("STOREY","mat.room.w").replace("CEIL;","mat.roomCF.x;").replace("FLOOR;","mat.roomCF.y;");n+=Ra+`if (roomOpen > 0.02) { ${x} }
`,a&&(n+=`if (reveal > 0.5) {
        let wallTex = textureSampleLevel(map, smpAnisoRepeat, revealUV * mat.uvmap.xy + mat.uvmap.zw, 0.0).rgb;
        s.albedo = mat.color * wallTex * 0.55; s.emissive = vec3f(0.0); s.metalness = 0.0; s.roughness = 0.85; s.specularIntensity = 0.5;
      }
`)}const d=e.userData.farGround;e.userData.naturalGround&&(n+=`if(any(in.uv < vec2f(0.0)) || any(in.uv > vec2f(1.0))) {
        let green = skyNoise(in.P.xz * 0.018);
        s.albedo = mix(vec3f(0.035,0.115,0.045),vec3f(0.085,0.19,0.065),green);
        s.roughness=0.96; s.metalness=0.0; s.emissive=vec3f(0.0);
      }
`),d!=null&&d.map&&(t.farMap=this.texture(d.map),s.farT=["vec4f",[d.half,d.on?1:0,0,0]],s.farB=["vec4f",d.box??[-1e9,-1e9,1e9,1e9]],n+=`let pz = vec2f(in.P.x, in.P.z);
      if (mat.farT.y > 0.5 && (any(in.uv < vec2f(0.0)) || any(in.uv > vec2f(1.0)) || any(pz < mat.farB.xy) || any(pz > mat.farB.zw))) {
        let fuv = vec2f(in.P.x, in.P.z) / (2.0 * mat.farT.x) + 0.5;
        if (all(fuv > vec2f(0.0)) && all(fuv < vec2f(1.0))) {
          let ft = textureSample(farMap, smpAnisoClamp, fuv);
          s.albedo = ft.rgb; s.metalness = 0.0; s.emissive = vec3f(0.0);
          s.roughness = select(0.95, 0.07, ft.a < 0.75);
          if (ft.a < 0.75) {
            // (its water — under the sea surfaces that come over it, or past them: a calm distant
            // sea, matte enough not to mirror the sky in streaks)
            let farD = length(in.P - frame.cameraPos);
            s.normal = vec3f(0.0, 1.0, 0.0);
            s.roughness = mix(0.38, 0.5, smoothstep(250.0, 2500.0, farD));
            s.albedo = mix(vec3f(0.016, 0.062, 0.085), vec3f(0.024, 0.085, 0.1), skyNoise(in.P.xz * 0.02));
          }
        }
      }
`),bi&&e.userData.groundDetail&&(n+=(e.userData.naturalGround?Si.replace("vec3f(0.95, 1.12, 0.62)","vec3f(0.8, 1.2, 0.8)").replace("dry * grass * 0.7 * mid","dry * grass * 0.2 * mid"):Si)+`
`);const u=bi&&(Ke==null?void 0:Ke[e.userData.detail]);if(u){t.detailMap=u.tex;const[p,x]=Ea[e.userData.detail]??[.5,.4];n+=(i?zi(u.metres,p,x,u.avgRough).replace("let dNear = (","let dNear = (1.0 - roomOpen) * ("):zi(u.metres,p,x,u.avgRough))+`
`}e.userData.roofDetail&&(n+=_i+`
`),(i||e.userData.weathered)&&(n+=Mi+`
`),e.userData.foliage&&(s.atlasGrid=["vec4f",[Number(e.userData.atlasCells??8),Number(e.userData.atlasRows??e.userData.atlasCells??8),0,0]]),e.userData.foliage&&(n+=`s.translucency = s.albedo * 0.32;
      // Plant cards thin out as they turn edge-on to the eye (or the sun, in the shadow
      // pass): no flat slabs from the side, no six-pointed star of crossed cards from above.
      // Looked down on steeply, the upright cards squash into streaks round the trunk (a
      // snowflake about every tree): they give way to the crown card seen from above.
      { let ng = normalize(cross(dpdx(in.P), dpdy(in.P))); let v = normalize(frame.cameraPos - in.P);
        let face = abs(dot(ng, v)); let upright = 1.0 - abs(ng.y);
        // (for the sun, harder: a card at a low angle to it casts a thin straight band)
#if PASS_DEPTH
        let faceCut = smoothstep(0.35, 0.75, face);
#else
        let faceCut = smoothstep(${Fa});
#endif
        s.alpha *= faceCut * mix(1.0, 1.0 - smoothstep(${Ua}), upright);
        // Crowns cut straight at their card's border read as polygons (and cast polygon
        // shadows): the upright cards soften at their sides and top, the crown card round.
        let cell = fract(in.uv * mat.atlasGrid.xy);
        let side = smoothstep(0.0, 0.12, min(min(cell.x, 1.0 - cell.x), 1.0 - cell.y));
        let crownEdge = 1.0 - smoothstep(0.78, 1.0, length(cell - 0.5) * 2.0);
        s.alpha *= select(crownEdge, side, upright > 0.5);
#if !PASS_DEPTH
        // Lit as a crown, not as flat cards (the foliage normals of SpeedTree and co.): the
        // normal leans out from the middle of the crown — sunlit on one side, shading off
        // smoothly round the other — instead of each card flat-lit, bright or dark, with
        // hard seams where they cross.
        let fq0 = dpdx(in.P); let fq1 = dpdy(in.P); let fu0 = dpdx(in.uv); let fu1 = dpdy(in.uv);
        let facing = select(-ng, ng, dot(ng, v) >= 0.0);
        let fT = normalize(cross(fq1, facing) * fu0.x + cross(facing, fq0) * fu1.x + vec3f(1e-7));
        var round = facing * 0.55;
        if (upright > 0.5) { round += fT * (cell.x - 0.5) * 2.0 + vec3f(0.0, (cell.y - 0.62) * 1.7, 0.0); }
        else { round += vec3f(0.0, 1.0, 0.0) + fT * (cell.x - 0.5) * 1.4; }
        s.normal = normalize(mix(s.normal, normalize(round), 0.75));
#endif
      }`),e.userData.volumeFoliage&&(n+="s.translucency = s.albedo * 0.12;"),e.userData.leafCluster&&(n+=`s.translucency = s.albedo * 0.4;
      { let ng = normalize(cross(dpdx(in.P), dpdy(in.P))); let v = normalize(frame.cameraPos - in.P);
        s.alpha *= smoothstep(0.08, 0.3, abs(dot(ng, v)));
        // Mipmaps average the leaves' edges (and a needle tuft's thin lines) away: the alpha
        // falls under the test and distant crowns go bare. Scaled back up by how far down the
        // mip chain the texel is read (after Golus's alpha-to-coverage notes).
        let texel = in.uv * vec2f(textureDimensions(map));
        let mip = max(0.0, log2(max(length(dpdx(texel)), length(dpdy(texel)))));
        s.alpha *= 1.0 + min(mip, 4.0) * 0.28; }`),e.userData.contextBuilding&&(n+=Mi+`if (in.N.y > 0.7) { s.albedo = vec3f(0.24, 0.245, 0.255); s.emissive = vec3f(0.0); s.metalness = 0.0; s.roughness = 0.9;
`+_i+" }"),o&&(n+="} else "+na+`
`),e.userData.sky||(n+=`{
      let up = smoothstep(0.45, 0.9, in.N.y);
      // Uniform weather branches: clear skies need neither procedural noise field.
      // Active rain/snow keep the original samples, arithmetic and order.
      if (frame.debug.y > 0.0) {
        let puddle = smoothstep(0.55, 0.75, skyFbm(in.P.xz * 0.35));
        s.albedo *= 1.0 - frame.debug.y * (0.18 + 0.22 * up + 0.12 * puddle * up);
        s.roughness = mix(s.roughness, 0.12 + 0.2 * (1.0 - puddle), frame.debug.y * up * 0.85);
      }
      if (frame.debug.z > 0.0) {
        let snow = frame.debug.z * smoothstep(0.35, 0.8, in.N.y * (0.8 + 0.35 * skyFbm(in.P.xz * 0.6)));
        s.albedo = mix(s.albedo, vec3f(0.86, 0.88, 0.92), snow);
        s.roughness = mix(s.roughness, 0.9, snow); s.metalness *= 1.0 - snow;
        s.emissive *= 1.0 - snow * 0.8;
      }
    }`),n+=`s.roughness = clamp(s.roughness, 0.12, 1.0);
      s.clearcoat = ${e.clearcoat?"0.16":"0.0"}; s.clearcoatRoughness = 0.22;`,r&&(n+=Ia),e.userData.carModel&&(n+=Ba);const m=new Gi({name:"complex "+e.id,color:e.color,roughness:e.roughness??.8,metalness:e.metalness??0,vertexColors:e.vertexColors,side:e.side===2?"double":e.side===1?"back":"front",alphaTest:e.alphaTest||0,transparent:e.transparent,opacity:e.opacity,modules:[lt],textures:t,surface:n,attributes:o?{facade:"vec4f"}:{},varyings:o?{facade:"vec4f"}:{},vertex:o?"o.facade = v.facade;":"",output:e.userData.sky?"":`// (never a NaN or an overflow into the half-float target: one such pixel, spread by the
        // bloom, would flash the whole frame black or white)
        r.color = vec4f(select(min(r.color.rgb, vec3f(30000.0)), vec3f(0.0), r.color.rgb != r.color.rgb), r.color.a);
        let fog = 1.0 - exp(-length(in.P - frame.cameraPos) * mat.haze * mat.hazeScale);
        // (the drone: everything fades into the horizon's haze toward the edge of the world it has
        // loaded — frame.windDir, unused by this view's water: where the fade starts and ends)
        let wall = frame.cameraWaterHeight * smoothstep(frame.windDir.x, frame.windDir.y, length((in.P - frame.cameraPos).xz));
        r.color = vec4f(mix(r.color.rgb, frame.horizonColor, max(clamp(fog, 0.0, 0.9), wall)), r.color.a);${e.userData.edgeFade?`
        // Past the painted (surveyed) ground, uv leaves 0..1: fade into the horizon haze (past the
        // 1 km land use once it is in).
        let pastNear = max(max(-in.uv.x, in.uv.x - 1.0), max(-in.uv.y, in.uv.y - 1.0));${e.userData.farGround?`
        let fq = abs(vec2f(in.P.x, in.P.z)) / mat.farT.x;
        let past = select(pastNear, (max(fq.x, fq.y) - 1.0) * 0.5, mat.farT.y > 0.5);`:`
        let past = pastNear;`}
        r.color = vec4f(mix(r.color.rgb, frame.horizonColor * 0.92, smoothstep(${e.userData.naturalGround?"1.0, 3.0":"-0.05, 0.9"}, past)), r.color.a);`:""}`,uniforms:{haze:["f32",5e-4],hazeScale:["f32",e.userData.hazeScale??1],...s},defines:{CLEARCOAT:e.clearcoat||r||e.userData.carModel?1:0,FOLIAGE:e.userData.leafCluster?2:e.userData.foliage?1:0},userData:{foliage:!!(e.userData.foliage||e.userData.leafCluster||e.userData.volumeFoliage)}});return this.materials.set(e,m),m}explain(e){const t=this.meshes.get(e),s=Array.isArray(e.material)?e.material:[e.material],i=s.flatMap(a=>{var n,o;return[a.map,a.normalMap,a.roughnessMap,(o=(n=a.userData)==null?void 0:n.farGround)==null?void 0:o.map].filter(Boolean).map(l=>{var c,f,d,u,m;return{w:(c=l.image)==null?void 0:c.width,h:(f=l.image)==null?void 0:f.height,kind:(u=(d=l.image)==null?void 0:d.constructor)==null?void 0:u.name,has:this.textures.has(l),stripped:this.stripped(l.image),staged:(m=this.stagings)!=null&&m.get(l)?this.stagings.get(l).y:null}})});if(!t)return{inScene:!1,imagesReady:this.imagesReady(e.material),tex:i,pending:this.pending,frame:this.frameNo};const r=[{kind:"color",colorFormats:["rgba16float"],depthFormat:"depth32float"}];return{inScene:!0,mats:(Array.isArray(t.material)?t.material:[t.material]).map((a,n)=>{var o;return{ver:a.srcVersion===((o=s[n])==null?void 0:o.version),ready:this.renderer.materialReady(t,a,r)}}),tex:i}}objectsReady(e){let t=!0;return e.traverseVisible(s=>{var a;if(!s.isMesh||(a=s.material)!=null&&a.isShaderMaterial||s.isInstancedMesh&&s.count===0&&!Object.hasOwn(s,"onBeforeRender"))return;const i=this.meshes.get(s);if(!i){t=!1;return}if(i.geometry!==s.geometry&&(t=!1),!pi(i.material,s.material)){t=!1;return}const r=i.castShadow?yi:mi;if(Array.isArray(i.material))for(const n of i.material)(!this.renderer.geometryReady(i,n)||!this.renderer.materialReady(i,n,r))&&(t=!1);else(!this.renderer.geometryReady(i,i.material)||!this.renderer.materialReady(i,i.material,r))&&(t=!1)}),t&&!this.failed}_moved(e,t){var i,r;t.count!==(e.count??1)||t.instVersion!==((i=e.instanceMatrix)==null?void 0:i.version)||!Va(t.matrix,e.matrixWorld)?(t.castShadow&&!t.moving&&(this.castersChanged=!0),t.moving=!0,t.movedAt=this.frameNo,t.count=e.count??1,t.instVersion=(r=e.instanceMatrix)==null?void 0:r.version,t.matrix.copy(e.matrixWorld),t.matrixWorldNeedsUpdate=!0,t.worldTransformVersion++):t.moving&&this.frameNo-t.movedAt>90&&(t.moving=!1,t.castShadow&&(this.castersChanged=!0))}sync(e,t){var C,F,A,N,$,Q;if(this.detailReady===!1){this.pending=!0,this.ready=!1;return}const s=this.movers??(this.movers=[]),i=this.syncShort??(this.syncFrame=(this.syncFrame??0)+1)%2===0;if(this.halfSync&&this.shown&&i&&this.longAt===this.frameNo-1){const b=Object.getPrototypeOf(e).updateMatrixWorld;for(let S=0;S<s.length;S+=2){const I=s[S],O=s[S+1];this.meshes.get(I)!==O||O.geometry!==I.geometry||(ra(I,b),t&&I.userData.forestLod&&gs(I,t),!(I.isInstancedMesh&&(O.instanceMatrix!==I.instanceMatrix||O.instanceColor!==I.instanceColor))&&this._moved(I,O))}return}ia(e),s.length=0,this.longAt=this.frameNo;const r=this.active??(this.active=[]);r.length=0;const a=this.syncEpoch=(this.syncEpoch??0)+1;let n=!1,o=!1,l=!1;const c=performance.now(),f=c+(this.shown?3:6),d=()=>{let b=0;for(const S of this.textures.values())b+=S.width*S.height;return b},u=(this.shown?1:1.5)*1e6,m=d();let p=0,x=0,y=0,v=0;const w=b=>{var V,W,ee;const S=(V=this.renderer.geometries)==null?void 0:V.get(b),I=new Set(Object.values(b.attributes??{}).map(U=>U.isInterleavedBufferAttribute?U.data:U));let O=0;for(const U of I){const fe=S==null?void 0:S.buffers.get(U);(fe==null?void 0:fe.array)===U.array&&fe.version===(U.version??0)||(O+=(fe==null?void 0:fe.array)===U.array&&((W=U.updateRanges)!=null&&W.length)?U.updateRanges.reduce((ar,or)=>ar+or.count*U.array.BYTES_PER_ELEMENT,0):((ee=U.array)==null?void 0:ee.byteLength)??0)}return b.index&&(!S||S.indexSrc!==b.index.array||S.indexVersion!==(b.index.version??0))&&(O+=b.index.array.byteLength),O},M=b=>y===0||y<4&&v+w(b)<=2*1024*1024&&performance.now()<=f;e.traverseVisible(b=>{var O,V;if(!b.isMesh||(O=b.material)!=null&&O.isShaderMaterial)return;t&&b.userData.forestLod&&gs(b,t),r.push(b);let S=this.meshes.get(b);S&&(S.syncEpoch=a);let I=!1;if(S&&S.castShadow!==b.castShadow&&(S.castShadow=b.castShadow,this.castersChanged=!0),S&&!pi(S.material,b.material))if(x&&(performance.now()>f||p>u)||!this.imagesReady(b.material))o=!0;else{const W=Array.isArray(b.material)?b.material.map(U=>this.material(U)):this.material(b.material);x++,p=d()-m,this.ready=!1;const ee=S.castShadow?yi:mi;this.shown&&!(Array.isArray(W)?W:[W]).every(U=>this.renderer.materialReady(S,U,ee))?o=!0:S.material=W}if(!S){const W=this.imagesReady(b.material);if(x&&(performance.now()>f||p>u)){o=!0;return}if(!M(b.geometry)){o=!0;return}if(!W){o=!0;return}const ee=this.materials.size+this.textures.size,U=Array.isArray(b.material)?b.material.map(fe=>this.material(fe)):this.material(b.material);this.materials.size+this.textures.size!==ee&&(x++,p=d()-m),S=new ds(b.geometry,U),S.syncEpoch=a,S.matrixAutoUpdate=!1,S.worldTransformVersion=0,S.frustumCulled=b.frustumCulled,S.castShadow=b.castShadow,b.isInstancedMesh&&(S.isInstancedMesh=!0,S.instanceMatrix=b.instanceMatrix,S.instanceColor=b.instanceColor,b.frustumCulled&&!b.boundingSphere&&b.computeBoundingSphere(),S.boundingSphere=b.boundingSphere),this.meshes.set(b,S),v+=w(b.geometry),y++,I=!0,this.scene.add(S),this.ready=!1,n=!0,S.castShadow&&(this.castersChanged=!0),S.matrix.copy(b.matrixWorld),S.matrixWorldNeedsUpdate=!0,S.worldTransformVersion++,S.count=b.count??1,S.instVersion=(V=b.instanceMatrix)==null?void 0:V.version}if(S.geometry!==b.geometry&&(M(b.geometry)?(v+=w(b.geometry),S.geometry=b.geometry,y++,I=!0,l=!0,S.castShadow&&(this.castersChanged=!0)):o=!0),b.isInstancedMesh&&(S.instanceMatrix!==b.instanceMatrix||S.instanceColor!==b.instanceColor)&&(S.instanceMatrix=b.instanceMatrix,S.instanceColor=b.instanceColor,S.instVersion=-1,l=!0),b.isInstancedMesh&&(b.frustumCulled&&!b.boundingSphere&&b.computeBoundingSphere(),S.boundingSphere=b.boundingSphere),b.isInstancedMesh&&(S.instanceRanges=b.frustumCulled?b.userData.instanceRanges:void 0,S.instanceLod=S.instanceRanges?b.userData.instanceLod:void 0),this._moved(b,S),(S.worldInstances===void 0||S.worldAt!==S.worldTransformVersion)&&(S.worldInstances=!!b.isInstancedMesh&&Oa(b.matrixWorld),S.worldAt=S.worldTransformVersion),(S.moving||b.userData.forestLod)&&s.push(b,S),this.renderer.geometryReady&&(I||c-(S.buffersCheckedAt??-1/0)>=(this.halfSync?250:80))){S.buffersCheckedAt=c;const W=S.material;if(Array.isArray(W)?W.some(U=>!this.renderer.geometryReady(S,U,!0)):!this.renderer.geometryReady(S,W,!0))if(S.castShadow&&(this.castersChanged=!0),I||M(S.geometry))if(I||(v+=w(S.geometry),y++),Array.isArray(W))for(const U of W)this.renderer._frameBuffers(S,S.geometry,U);else this.renderer._frameBuffers(S,S.geometry,W);else o=!0,S.buffersCheckedAt=-1/0}}),this.pending=o,o&&(this.ready=!1);let k=!1;for(const[b,S]of this.meshes)S.syncEpoch!==a&&(this.scene.remove(S),this.meshes.delete(b),k=!0,S.castShadow&&!S.moving&&(this.castersChanged=!0));if(this.sweep=(this.sweep??0)+1,!k&&!n&&!l&&!((C=this.forgetSoon)!=null&&C.size)&&this.sweep%120!==0)return;(k||l)&&this.renderer.retainGeometry(this.meshes.values());const z=new Set;for(const b of r)if(Array.isArray(b.material))for(const S of b.material)z.add(S);else z.add(b.material);for(const b of this.meshes.values())for(const S of Array.isArray(b.material)?b.material:[b.material])S.source&&z.add(S.source);const _=this.unusedAt??(this.unusedAt=new Map),P=performance.now();for(const[b,S]of this.materials){if(z.has(b)){_.delete(b);continue}const I=_.get(b)??P;_.set(b,I);const O=(F=this.forgetSoon)==null?void 0:F.has(b);P-I<2e4&&!O||(this.renderer.forgetMaterial(S),S.dispose(),(A=S.uniformBlock.buffer)==null||A.destroy(),this.materials.delete(b),_.delete(b))}if((N=this.forgetSoon)==null||N.clear(),($=this.retired)!=null&&$.length)return;const R=new Set([...this.materials.keys()].flatMap(b=>{var S;return[b.map,b.normalMap,b.roughnessMap,b.metalnessMap,b.emissiveMap,(S=b.userData.farGround)==null?void 0:S.map]})),D=sa(this.materials.values()),B=new Set;for(const[b,S]of this.textures)!R.has(b)&&!D.has(S)&&(B.add(S),this.textures.delete(b));const L=new Set(this.textures.values());for(const b of B)if(!L.has(b)){(Q=this.sharedTextures)!=null&&Q.has(b)?this.sharedTextures.release(b,this):b.destroy();for(const[S,I]of this.surfaceCache??[])I===b&&this.surfaceCache.delete(S)}if(this.stagings)for(const[b,S]of this.stagings)!R.has(b)&&this.frameNo-(S.at??0)>600&&(S.tex.destroy(),this.stagings.delete(b))}forget(e){this.forgetSoon??(this.forgetSoon=new Set);for(const t of e)this.forgetSoon.add(t)}render(e,t,s,i){var k,z,_,P,R,D,B,L,C,F;if(Zn(),this.disposed||this.failed)return;if(this.health.check(),this.detailReady===!1){this.pending=!0,this.ready=!1,g.submit();return}if(this.finish.handle.failed)throw new Error("WebGPU finish pipeline failed");for(const A of this.renderer.pipelines.values())if(A.handle.failed)throw new Error("WebGPU mesh pipeline failed: "+A.handle.label);if(this.suspended&&(this.context.configure({device:g.device,format:g.format,alphaMode:"opaque"}),this.suspended=!1),Rt){this.failed=!0;return}g.beginFrame(),this.frameNo=(this.frameNo??0)+1,(k=this.retired)!=null&&k.length&&(ta(this.retired,this.meshes.values(),A=>{var N;this.renderer.forgetMaterial(A),A.dispose(),(N=A.uniformBlock.buffer)==null||N.destroy()}),this.retired.length||(this.sweep=119)),this.sync(e,t),this.refreshTextures();const r=this.camera;r.position.copy(t.position),r.quaternion.copy(t.quaternion),this.renderer.lodCamera=this.noTreeLod?null:r,(r.fov!==t.fov||r.aspect!==t.aspect||r.near!==t.near||r.far!==t.far)&&(r.fov=t.fov,r.aspect=t.aspect,r.near=t.near,r.far=t.far,r.updateProjectionMatrix()),r.updateMatrixWorld();const a=_e.fields,n=s.keyElev*Math.PI/180,o=s.keyAz*Math.PI/180;a.sunDir.value.set(Math.cos(n)*Math.sin(o),Math.sin(n),Math.cos(n)*Math.cos(o)),a.sunColor.value.copy(s.key).multiplyScalar(s.keyI),a.skyIrradiance.value.copy(s.hemiSky).multiplyScalar(Math.max(.18,s.hemiI)),a.horizonColor.value.copy(s.fog),a.exposure.value=s.exposure*1.15,a.time.value=i,a.night.value=s.stars,a.envIntensity.value=Math.max(.9,s.env),a.debug.value.set(s.overcast??0,s.rain??0,s.snow??0,(s.stars??0)*(1-(s.overcast??0))),a.pad0.value=s.starTurn??0,a.cameraWaterHeight.value=this.droneSky??0,a.windDir.value.set(((z=this.droneFog)==null?void 0:z[0])??1e7,((_=this.droneFog)==null?void 0:_[1])??2e7),this.droneSky&&!this.droneSkyAsked&&this.droneSkyPicture(),a.windSpeed.value=this.droneSkyReady?1:0,this.bloomStrength=(s.bloom??.2)*.5,at.set("threshold",Math.max(.6,(s.bloomAt??4)*.35)),at.set("exposure",a.exposure.value);for(const[A,N]of this.materials)N.emissive.copy(A.emissive??{r:0,g:0,b:0}).multiplyScalar(A.emissiveIntensity??0),N.set("haze",(((P=e.fog)==null?void 0:P.density)??5e-4)*.5),N.uniformBlock.uploadEpoch=this.frameNo;je!==this&&(K.cascades.forEach(A=>{A.dirty=!0}),K.invalidateCache()),je=this,this.castersChanged&&(K.invalidateCache(),this.castersChanged=!1),this.shadowStats=K.stats,this.shadowMapSize=K.size,this.renderer.precompiling=!this.shown,this.renderer.pipelinesPerFrame=this.shown?3:2,this.renderer.pipelineGapMs=this.shown?5:0,g.deferCompiles=!this.shown,this.renderer.starved=!1;const l=this.timer;l.begin(),K.periods=this.droneSky?[1,3,6]:[1,2,4];const c=this.casterLists??(this.casterLists={all:[],moving:[],still:[]});c.all.length=c.moving.length=c.still.length=0;for(const A of this.meshes.values())A.castShadow&&(c.all.push(A),(Pi(A)?c.moving:c.still).push(A));K.render(this.scene,this.renderer,K.update(r,a.sunDir.value),A=>l.pass("shadow"+A),this.renderer.precompiling?null:Pi,c),this.env&&this.shown&&this.captureEnv(s),this.taaNow=this.taaOn&&this.shown&&!!((R=this.taaPass)!=null&&R.handle.pipeline);const f=r.position.clone();this.taaNow&&this.taaPrevAt&&(f.distanceTo(this.taaPrevAt)>40||r.fov!==this.taaPrevFov)&&(this.taaValid=!1);const d=this.frameNo%8+1;ts(r,this.canvas.width,this.canvas.height,this.taaNow?{jitterX:wi(d,2)-.5,jitterY:wi(d,3)-.5,prevViewProj:this.taaPrevVP??null}:{}),this.taaPrevVP=a.viewProjNoJitter.value.clone(),this.taaPrevAt=f,this.taaPrevFov=r.fov;const u={camera:r,kind:"color",colorViews:[this.target.texture.view()],colorFormats:["rgba16float"],depthView:this.target.depthTexture.view(),depthFormat:"depth32float"},m=this.renderer.collect(this.scene,u);let p=null;for(let A=m.opaque.length-1;A>=0;A--)m.opaque[A].material.userData.water&&(p??(p=[])).push(...m.opaque.splice(A,1));this.shown&&this.makePost();const x=this.shown&&this.aoOn&&this.quality.name!=="low"&&!!((D=this.aoPass)!=null&&D.handle.pipeline)&&!!((B=this.aoBlurX)!=null&&B.handle.pipeline)&&!!((L=this.aoBlurY)!=null&&L.handle.pipeline),y=A=>{this.shown&&this.sky.handle.pipeline&&this.sky.draw(A)};if(x){const A=[],N=[];for(const $ of m.opaque)($.material.userData.foliage?A:N).push($);this.renderer.render(this.scene,{...u,timestampWrites:l.pass("scene"),items:{opaque:N,transparent:[]},clearColors:[[0,0,0,1]],clearDepth:0}),this.aoPass.timestampWrites=l.pass("ao"),this.aoPass.render({colorViews:[this.aoRaw.texture],clear:qe}),this.aoBlurX.timestampWrites=l.pass("aoBlur"),this.aoBlurX.render({colorViews:[this.aoTmp.texture],clear:qe}),this.aoBlurY.timestampWrites=l.pass("aoBlur"),this.aoBlurY.render({colorViews:[this.ao.texture],clear:qe}),this.renderer.render(this.scene,{...u,label:"complex plants",timestampWrites:l.pass("plants"),items:{opaque:A,transparent:p?[]:m.transparent},betweenLists:y})}else this.renderer.render(this.scene,{...u,timestampWrites:l.pass("scene"),items:{opaque:m.opaque,transparent:p?[]:m.transparent},clearColors:[[0,0,0,1]],clearDepth:0,betweenLists:y}),this.shown&&this.ao&&g.getEncoder().beginRenderPass({label:"complex ao off",colorAttachments:[{view:this.ao.texture.view(),loadOp:"clear",storeOp:"store",clearValue:[1,0,0,1]}]}).end();if(p){if(Nn(),!this.renderer.precompiling){const A=g.getEncoder(),N=[this.target.width,this.target.height];A.copyTextureToTexture({texture:this.target.texture.getGPU()},{texture:this.copy.texture.getGPU()},N),A.copyTextureToTexture({texture:this.target.depthTexture.getGPU()},{texture:this.copy.depthTexture.getGPU()},N)}this.renderer.render(this.scene,{...u,label:"complex water",timestampWrites:l.pass("water"),items:{opaque:p,transparent:m.transparent}})}this.renderer.precompiling=!1,this.taaNow?(this.taaIdx^=1,vi.set("valid",this.taaValid?1:0),this.taaPass.timestampWrites=l.pass("taa"),this.taaPass.render({colorViews:[this.taaHist[this.taaIdx].texture],clear:qe}),this.taaValid=!0):this.taaValid=!1;const v=this.shown&&this.bloomOn&&this.quality.name!=="low"&&!!((C=this.bloomDown)!=null&&C.every(A=>A.handle.pipeline))&&!!((F=this.bloomUp)!=null&&F.every(A=>A.handle.pipeline));if(at.set("strength",v?this.bloomStrength??0:0),v){this.bloomDown.forEach((A,N)=>{A.timestampWrites=l.pass("bloom"),A.render({colorViews:[this.bloomRT[N].texture],clear:qe})});for(let A=this.bloomUp.length-1;A>=0;A--)this.bloomUp[A].timestampWrites=l.pass("bloom"),this.bloomUp[A].render({colorViews:[this.bloomRT[A].texture]})}this.shown&&(this.finish.timestampWrites=l.pass("finish"),this.finish.render({colorViews:[this.context.getCurrentTexture().createView()],clear:qe})),this.starved=this.renderer.starved;const w=this.renderer.precompiling?null:l.end(g.getEncoder());g.submit(),this.health.submitted(),w==null||w(),!this.ready&&!this.compiling&&(this.compiling=!0,g.pipelinesReady().then(()=>{var A,N,$;this.compiling=!1,!this.disposed&&(this.failed=[...this.renderer.pipelines.values()].some(Q=>Q.handle.failed)||this.sky.handle.failed||this.finish.handle.failed||!!((A=this.aoPass)!=null&&A.handle.failed||(N=this.aoBlurX)!=null&&N.handle.failed||($=this.aoBlurY)!=null&&$.handle.failed),this.ready=!this.failed&&!this.pending&&!this.starved,this.ready&&(this.shown=!0))}));const M=this.shown&&!this.failed?"visible":"hidden";this.canvas.style.visibility!==M&&(this.canvas.style.visibility=M)}captureEnv(e){const t=this.env,s=performance.now();Se=this,Bt.set("on",t.on?1:0),Bt.set("fade",t.fadeAt?Math.min(1,(s-t.fadeAt)/1e3):1);const i=`${Math.round(e.keyElev/3)}|${Math.round(e.keyAz/3)}|${(e.rain??0).toFixed(1)}|${(e.snow??0).toFixed(1)}|${(e.stars??0).toFixed(1)}|${(e.overcast??0).toFixed(1)}`;if(i!==t.key&&(t.key=i,t.dirtyAt=s),Math.abs(this.meshes.size-t.meshes)>Math.max(8,t.meshes*.1)&&(t.meshes=this.meshes.size,t.dirtyAt=s),t.face<0){if(!t.dirtyAt||s-t.dirtyAt<3e3||!this.ready||t.fadeAt&&s-t.fadeAt<1100)return;t.face=0,t.dirtyAt=0}if(this.frameNo%3)return;const[r,a,n,o,l,c]=Ca[t.face],f=Bt.fields.probe.value,d=t.cam;d.far=this.camera.far,d.position.set(f[0],f[1],f[2]),d.up.set(o,l,c),d.lookAt(f[0]+r,f[1]+a,f[2]+n),d.updateProjectionMatrix(),d.updateMatrixWorld(),ts(d,se,se,{block:t.block}),this.renderer.render(this.scene,{label:"complex env "+t.face,camera:d,kind:"color",frameBlock:t.block,timestampWrites:this.timer.pass("env"),colorViews:[t.faceRT.texture.view()],colorFormats:["rgba16float"],depthView:t.depth.depthTexture.view(),depthFormat:"depth32float",clearColors:[[0,0,0,0]],clearDepth:0}),g.getEncoder().copyTextureToTexture({texture:t.faceRT.texture.getGPU()},{texture:t.back.getGPU(),origin:[0,0,t.face]},[se,se,1]),++t.face===6&&(t.face=-1,t.on=!0,[t.tex,t.back]=[t.back,t.tex],t.fadeAt=performance.now())}dispose(){var e,t,s,i,r,a,n,o,l,c,f,d,u,m;this.disposed=!0,this.health.dispose(),this.snaps=null,(e=this.stagings)==null||e.forEach(p=>p.tex.destroy()),this.stagings=null,je===this&&(je=null),this.context.unconfigure(),this.canvas.remove();for(const p of this.materials.values())p.dispose(),(t=p.uniformBlock.buffer)==null||t.destroy();for(const p of this.retired??[])p.dispose(),(s=p.uniformBlock.buffer)==null||s.destroy();this.retired=[];for(const p of this.textures.values())(i=this.sharedTextures)!=null&&i.has(p)||p.destroy();(r=this.sharedTextures)==null||r.releaseOwner(this),this.renderer.dispose(),this.timer.dispose(),this.target.textures.forEach(p=>p.destroy()),this.target.depthTexture.destroy(),(a=this.copy)==null||a.textures.forEach(p=>p.destroy()),(n=this.copy)==null||n.depthTexture.destroy(),(o=this.ao)==null||o.textures.forEach(p=>p.destroy()),(l=this.aoRaw)==null||l.textures.forEach(p=>p.destroy()),(c=this.aoTmp)==null||c.textures.forEach(p=>p.destroy()),(f=this.bloomRT)==null||f.forEach(p=>p.textures.forEach(x=>x.destroy())),(d=this.taaHist)==null||d.forEach(p=>p.textures.forEach(x=>x.destroy())),this.env&&(this.env.tex.destroy(),this.env.back.destroy(),this.env.faceRT.textures.forEach(p=>p.destroy()),this.env.depth.depthTexture.destroy(),(u=this.env.block.buffer)==null||u.destroy(),Se===this&&(Se=null)),this.renderer.pipelines.clear(),this.materials.clear(),this.textures.clear(),this.meshes.clear(),this.casterLists=null,(m=this.surfaceCache)==null||m.clear()}}export{nr as ComplexRenderer,Ra as INTERIOR_DERIVATIVES_WGSL,Da as INTERIOR_WGSL,Kt as QUALITY,uo as warmDevice};
