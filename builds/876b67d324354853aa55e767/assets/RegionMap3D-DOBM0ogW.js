var Ve=Object.defineProperty;var qe=(l,e,t)=>e in l?Ve(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var d=(l,e,t)=>qe(l,typeof e!="symbol"?e+"":e,t);import{r as m,at as Xe,j as f,d as Ye}from"./index-BkPOf1Dd.js";import{s as Ze}from"./safeCompile-DPLJPbD1.js";import{b as oe,U as re,W as Ke}from"./three.module-CvqoMEPB.js";import{O as Je}from"./OrbitControls-KzURwYeY.js";import{dk as Qe,aj as me,dl as ge,dm as Y,dn as et,d4 as ae,Z as We,a as w,h as tt,cg as Ge,V as Z,j as ye,a4 as K,dp as nt,s as it,U as ve,S as st,ba as ot,cU as rt,cT as je,o as at,dq as lt,c as ct,b as dt,P as ht,cR as de,R as ut,cL as ft,cQ as pt,cM as mt,C as we,x as De,l as gt,dj as yt,d6 as vt,b6 as wt}from"./three.core-CPp7qtH9.js";import{p as bt}from"./mapTile-_qElKX7i.js";import{c as xt}from"./treemap-BxCH7QZk.js";import{d as St}from"./threeCleanup-BIAvvWFR.js";const Oe=new ae,ne=new w;class Ne extends Qe{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new me(e,3)),this.setAttribute("uv",new me(t,2))}applyMatrix4(e){const t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new ge(t,6,1);return this.setAttribute("instanceStart",new Y(i,3,0)),this.setAttribute("instanceEnd",new Y(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));const i=new ge(t,6,1);return this.setAttribute("instanceColorStart",new Y(i,3,0)),this.setAttribute("instanceColorEnd",new Y(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new et(e.geometry)),this}fromLineSegments(e){const t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ae);const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Oe.setFromBufferAttribute(t),this.boundingBox.union(Oe))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new We),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let s=0,r=e.count;s<r;s++)ne.fromBufferAttribute(e,s),n=Math.max(n,i.distanceToSquared(ne)),ne.fromBufferAttribute(t,s),n=Math.max(n,i.distanceToSquared(ne));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}re.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Z},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};oe.line={uniforms:Ge.merge([re.common,re.fog,re.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class Fe extends tt{constructor(e){super({type:"LineMaterial",uniforms:Ge.clone(oe.line.uniforms),vertexShader:oe.line.vertexShader,fragmentShader:oe.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const he=new K,Te=new w,Ce=new w,M=new K,z=new K,B=new K,ue=new w,fe=new it,k=new nt,Pe=new w,ie=new ae,se=new We,R=new K;let I,F;function Be(l,e,t){return R.set(0,0,-e,1).applyMatrix4(l.projectionMatrix),R.multiplyScalar(1/R.w),R.x=F/t.width,R.y=F/t.height,R.applyMatrix4(l.projectionMatrixInverse),R.multiplyScalar(1/R.w),Math.abs(Math.max(R.x,R.y))}function Et(l,e){const t=l.matrixWorld,i=l.geometry,n=i.attributes.instanceStart,s=i.attributes.instanceEnd,r=Math.min(i.instanceCount,n.count);for(let a=0,c=r;a<c;a++){k.start.fromBufferAttribute(n,a),k.end.fromBufferAttribute(s,a),k.applyMatrix4(t);const h=new w,y=new w;I.distanceSqToSegment(k.start,k.end,y,h),y.distanceTo(h)<F*.5&&e.push({point:y,pointOnLine:h,distance:I.origin.distanceTo(y),object:l,face:null,faceIndex:a,uv:null,uv1:null})}}function Mt(l,e,t){const i=e.projectionMatrix,s=l.material.resolution,r=l.matrixWorld,a=l.geometry,c=a.attributes.instanceStart,h=a.attributes.instanceEnd,y=Math.min(a.instanceCount,c.count),u=-e.near;I.at(1,B),B.w=1,B.applyMatrix4(e.matrixWorldInverse),B.applyMatrix4(i),B.multiplyScalar(1/B.w),B.x*=s.x/2,B.y*=s.y/2,B.z=0,ue.copy(B),fe.multiplyMatrices(e.matrixWorldInverse,r);for(let p=0,U=y;p<U;p++){if(M.fromBufferAttribute(c,p),z.fromBufferAttribute(h,p),M.w=1,z.w=1,M.applyMatrix4(fe),z.applyMatrix4(fe),M.z>u&&z.z>u)continue;if(M.z>u){const T=M.z-z.z,D=(M.z-u)/T;M.lerp(z,D)}else if(z.z>u){const T=z.z-M.z,D=(z.z-u)/T;z.lerp(M,D)}M.applyMatrix4(i),z.applyMatrix4(i),M.multiplyScalar(1/M.w),z.multiplyScalar(1/z.w),M.x*=s.x/2,M.y*=s.y/2,z.x*=s.x/2,z.y*=s.y/2,k.start.copy(M),k.start.z=0,k.end.copy(z),k.end.z=0;const E=k.closestPointToPointParameter(ue,!0);k.at(E,Pe);const _=ve.lerp(M.z,z.z,E),g=_>=-1&&_<=1,C=ue.distanceTo(Pe)<F*.5;if(g&&C){k.start.fromBufferAttribute(c,p),k.end.fromBufferAttribute(h,p),k.start.applyMatrix4(r),k.end.applyMatrix4(r);const T=new w,D=new w;I.distanceSqToSegment(k.start,k.end,D,T),t.push({point:D,pointOnLine:T,distance:I.origin.distanceTo(D),object:l,face:null,faceIndex:p,uv:null,uv1:null})}}}class zt extends ye{constructor(e=new Ne,t=new Fe({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let r=0,a=0,c=t.count;r<c;r++,a+=2)Te.fromBufferAttribute(t,r),Ce.fromBufferAttribute(i,r),n[a]=a===0?0:n[a-1],n[a+1]=n[a]+Te.distanceTo(Ce);const s=new ge(n,2,1);return e.setAttribute("instanceDistanceStart",new Y(s,1,0)),e.setAttribute("instanceDistanceEnd",new Y(s,1,1)),this}raycast(e,t){const i=this.material.worldUnits,n=e.camera;if(n===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),i===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;const s=e.params.Line2!==void 0&&e.params.Line2.threshold||0;I=e.ray;const r=this.matrixWorld,a=this.geometry,c=this.material;F=c.linewidth+s,a.boundingSphere===null&&a.computeBoundingSphere(),se.copy(a.boundingSphere).applyMatrix4(r);let h;if(i)h=F*.5;else{const u=Math.max(n.near,se.distanceToPoint(I.origin));h=Be(n,u,c.resolution)}if(se.radius+=h,I.intersectsSphere(se)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),ie.copy(a.boundingBox).applyMatrix4(r);let y;if(i)y=F*.5;else{const u=Math.max(n.near,ie.distanceToPoint(I.origin));y=Be(n,u,c.resolution)}ie.expandByScalar(y),I.intersectsBox(ie)!==!1&&(i?Et(this,t):Mt(this,n,t))}onBeforeRender(e){const t=this.material.uniforms;t&&t.resolution&&(e.getViewport(he),this.material.uniforms.resolution.value.set(he.z,he.w))}}const kt=[{key:"sido",label:"시·도"},{key:"sgg",label:"시·군·구"},{key:"dong",label:"읍·면·동"}],Re={서울특별시:"서울",부산광역시:"부산",대구광역시:"대구",인천광역시:"인천",광주광역시:"광주",대전광역시:"대전",울산광역시:"울산",세종특별자치시:"세종",경기도:"경기",강원특별자치도:"강원",충청북도:"충북",충청남도:"충남",전북특별자치도:"전북",전라남도:"전남",전남광주통합특별시:"전남광주",경상북도:"경북",경상남도:"경남",제주특별자치도:"제주"},_t="#f2c14e",X={dark:{idle:new we("#25251f"),edge:16117728,edgeOpacity:.3,shadow:.42,sky:16052194,bounce:1315599,side:.52},light:{idle:new we("#d9d2c0"),edge:1446926,edgeOpacity:.22,shadow:.2,sky:16777215,bounce:12103318,side:.7}},Lt=5;function At(l,e,t){if(!l||l.change===null)return X[t].idle.clone();const{r:i,g:n,b:s}=xt(l.change/e*Lt,t);return new we(`rgb(${i}, ${n}, ${s})`)}function Ut(l){return`${l>0?"+":""}${l.toFixed(1)}%`}const pe=new Map;function jt(l){let e=pe.get(l);return e||(e=fetch(`/geo/realestate/${l}`).then(t=>{if(!t.ok)throw new Error(`geo ${t.status}`);return t.json()}).then(t=>t.features),e.catch(()=>pe.delete(l)),pe.set(l,e)),e}function Dt(l){return l.geometry.type==="Polygon"?[l.geometry.coordinates]:l.geometry.coordinates}function Ot(l){let e=1/0,t=-1/0,i=1/0,n=-1/0;for(const y of l)for(const u of y.polygons)for(const[p,U]of u[0])p<e&&(e=p),p>t&&(t=p),U<i&&(i=U),U>n&&(n=U);const s=(e+t)/2,r=(i+n)/2,a=Math.cos(r*Math.PI/180),h=100/(Math.max((t-e)*a,n-i)||1);return(y,u)=>[(y-s)*a*h,(u-r)*h]}function Ie(l,e){const t=l.map(([i,n])=>new Z(...e(i,n)));return t.length>1&&t[0].equals(t[t.length-1])&&t.pop(),t}const He=.12,Tt=l=>1-Math.pow(1-l,3),Ct=l=>l<.5?4*l*l*l:1-Math.pow(-2*l+2,3)/2;class Pt{constructor(e,t,i){d(this,"renderer");d(this,"scene",new dt);d(this,"camera",new ht(30,1,.1,5e3));d(this,"controls");d(this,"root",new de);d(this,"ground");d(this,"sun");d(this,"hemi");d(this,"theme","dark");d(this,"level","sgg");d(this,"orbit",!1);d(this,"blocks",new Map);d(this,"outline",new de);d(this,"outlineMat",new Fe({color:_t,linewidth:2.4,transparent:!0,depthTest:!1}));d(this,"raycaster",new ut);d(this,"depth",3);d(this,"fit",null);d(this,"tween",null);d(this,"introStart",0);d(this,"raf",0);d(this,"dirty",!0);d(this,"width",1);d(this,"height",1);d(this,"hovered",null);d(this,"selected",null);d(this,"moves",new Map);d(this,"saturation",5);d(this,"resizeObserver");d(this,"visibilityObserver");d(this,"visible",!0);d(this,"down",null);d(this,"labelLayer");d(this,"onHover",()=>{});d(this,"onPick",()=>{});d(this,"onGesture",()=>{});d(this,"touch");d(this,"touches",new Map);d(this,"pinch",null);d(this,"paused",!1);d(this,"refreshVisibility",()=>{!this.visible||document.hidden||this.paused?(cancelAnimationFrame(this.raf),this.raf=0):this.raf||(this.dirty=!0,this.loop())});d(this,"compiled",!1);d(this,"compiling",!1);d(this,"loop",()=>{this.raf=requestAnimationFrame(this.loop);const e=performance.now(),t=this.step(e),i=this.controls.update();if(t||i||this.dirty){if(!this.compiled){this.compiling||(this.compiling=!0,Ze(this.renderer,this.scene,this.camera).then(()=>{this.compiled=!0,this.dirty=!0}));return}this.renderer.render(this.scene,this.camera),this.placeLabels(),this.dirty=!1}});d(this,"handleMove",e=>{if(e.pointerType==="touch")return this.handleTouchMove(e);if(e.target!==this.renderer.domElement)return;const t=this.pick(e.clientX,e.clientY),i=(t==null?void 0:t.region.key)??null;i!==this.hovered&&(this.hovered=i,this.dirty=!0),this.renderer.domElement.style.cursor=t!=null&&t.region.pickable?"pointer":this.controls.enabled?"grab":"default";const n=this.host.getBoundingClientRect();this.onHover((t==null?void 0:t.region)??null,e.clientX-n.left,e.clientY-n.top)});d(this,"handleLeave",()=>{this.hovered=null,this.dirty=!0,this.onHover(null,0,0)});d(this,"handleDown",e=>{if(!this.onSurface(e)){this.down=null;return}if(e.pointerType==="touch"&&(this.touches.set(e.pointerId,this.local(e)),this.touches.size===2)){this.down=null,this.tween=null,this.pinch=this.pinchState(),this.onHover(null,0,0);return}this.down={x:e.clientX,y:e.clientY,t:performance.now()}});d(this,"handleCancel",e=>{this.touches.delete(e.pointerId),this.touches.size<2&&(this.pinch=null),this.down=null});d(this,"blockTwoFingerScroll",e=>{e.touches.length>1&&e.preventDefault()});d(this,"handleUp",e=>{var s,r;const t=this.pinch!==null;this.touches.delete(e.pointerId),this.touches.size<2&&(this.pinch=null);const i=this.down;if(this.down=null,t||!i||Math.hypot(e.clientX-i.x,e.clientY-i.y)>8||performance.now()-i.t>700||(r=(s=e.target)==null?void 0:s.closest)!=null&&r.call(s,".rm3-label"))return;const n=this.pick(e.clientX,e.clientY)??(e.pointerType==="touch"?this.nearestLabel(e):null);n!=null&&n.region.pickable&&this.onPick(n.region)});this.host=e,this.labelLayer=t,this.touch=i,this.renderer=new Ke({antialias:!0,alpha:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.outputColorSpace=st,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ot,e.prepend(this.renderer.domElement),this.camera.up.set(0,0,1),this.scene.add(this.root),this.root.add(this.outline),this.hemi=new rt(X.dark.sky,X.dark.bounce,1.15),this.scene.add(this.hemi),this.sun=new je(16774885,1.6),this.sun.position.set(-60,-40,120),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048),this.sun.shadow.bias=-5e-4;const n=this.sun.shadow.camera;n.left=n.bottom=-80,n.right=n.top=80,n.near=1,n.far=400,this.scene.add(this.sun);const s=new je(10466559,.35);s.position.set(70,90,40),this.scene.add(s),this.ground=new ye(new at(600,600),new lt({opacity:.42})),this.ground.receiveShadow=!0,this.ground.position.z=-.01,this.scene.add(this.ground),this.controls=new Je(this.camera,this.renderer.domElement),this.controls.enableZoom=!1,this.controls.enablePan=!1,this.controls.enableDamping=!0,this.controls.dampingFactor=.09,this.controls.rotateSpeed=.55,this.controls.minPolarAngle=.12,this.controls.maxPolarAngle=1.12,this.controls.minAzimuthAngle=-.85,this.controls.maxAzimuthAngle=.85,this.controls.enabled=!i,this.controls.touches={ONE:ct.ROTATE,TWO:-1},i&&(this.renderer.domElement.style.touchAction="pan-y"),this.controls.addEventListener("change",()=>this.dirty=!0),this.controls.addEventListener("start",()=>this.tween=null);const r=this.host;r.addEventListener("pointermove",this.handleMove),r.addEventListener("pointerleave",this.handleLeave),r.addEventListener("pointerdown",this.handleDown),r.addEventListener("pointerup",this.handleUp),r.addEventListener("pointercancel",this.handleCancel),r.addEventListener("touchmove",this.blockTwoFingerScroll,{passive:!1}),this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(e),this.visibilityObserver=new IntersectionObserver(a=>{this.visible=a.some(c=>c.isIntersecting),this.refreshVisibility()}),this.visibilityObserver.observe(e),document.addEventListener("visibilitychange",this.refreshVisibility),this.resize(),this.loop()}dispose(){cancelAnimationFrame(this.raf),this.resizeObserver.disconnect(),this.visibilityObserver.disconnect(),document.removeEventListener("visibilitychange",this.refreshVisibility);const e=this.host;e.removeEventListener("pointermove",this.handleMove),e.removeEventListener("pointerleave",this.handleLeave),e.removeEventListener("pointerdown",this.handleDown),e.removeEventListener("pointerup",this.handleUp),e.removeEventListener("pointercancel",this.handleCancel),e.removeEventListener("touchmove",this.blockTwoFingerScroll),this.clear(),St(this.controls),this.outlineMat.dispose(),this.renderer.dispose(),this.renderer.domElement.remove()}clear(){for(const e of this.blocks.values())e.mesh.geometry.dispose(),e.cap.dispose(),e.side.dispose(),e.edges.geometry.dispose(),e.edges.material.dispose(),e.label.remove(),this.root.remove(e.group);this.blocks.clear(),this.clearOutline()}clearOutline(){for(const e of[...this.outline.children])e.geometry.dispose(),this.outline.remove(e)}setRegions(e,t){if(this.clear(),this.level=t,this.hovered=null,!e.length)return;const i=Ot(e);this.depth=t==="sido"?4.2:t==="sgg"?3.4:2.8;let n=1;const s=new Z;for(const r of e){const a=[],c=[],h=this.depth+.02;for(const J of r.polygons){const L=Ie(J[0],i);if(L.length<3)continue;const $=new ft(L);for(const A of J.slice(1)){const P=Ie(A,i);P.length>=3&&$.holes.push(new pt(P))}a.push($);for(const A of[L,...$.holes.map(P=>P.getPoints())])for(let P=0;P<A.length;P++){const V=A[P],Q=A[(P+1)%A.length];c.push(V.x,V.y,h,Q.x,Q.y,h)}}if(!a.length)continue;const y=new mt(a,{depth:this.depth,bevelEnabled:!1,curveSegments:1}),u=X[this.theme],p=new De({color:u.idle,roughness:.58,metalness:.06}),U=new De({color:u.idle.clone().multiplyScalar(u.side),roughness:.85,metalness:0}),j=new ye(y,[p,U]);j.castShadow=!0,j.receiveShadow=!0,j.userData.key=r.key;const E=new gt;E.setAttribute("position",new me(c,3));const _=new yt(E,new vt({color:u.edge,transparent:!0,opacity:u.edgeOpacity})),g=new de;g.add(j,_),g.scale.z=.001,this.root.add(g);const[C,T]=r.lx!==null?i(r.lx,r.ly):[0,0],D=s.distanceTo(new Z(C,T));n=Math.max(n,D);const b=document.createElement("div");b.className="rm3-label",this.touch&&r.pickable&&(b.classList.add("is-tappable"),b.addEventListener("click",()=>this.onPick(r))),this.labelLayer.appendChild(b),this.blocks.set(r.key,{region:r,group:g,mesh:j,cap:p,side:U,edges:_,label:b,labelSize:null,anchor:new w(C,T,this.depth),lift:0,color:u.idle.clone(),target:u.idle.clone(),delay:D,grow:0})}for(const r of this.blocks.values())r.delay=r.delay/n*380;this.introStart=performance.now(),this.applyMoves(),this.applySelected(),this.frame(!0)}setTheme(e){this.theme=e;const t=X[e];this.hemi.color.setHex(t.sky),this.hemi.groundColor.setHex(t.bounce),this.ground.material.opacity=t.shadow;for(const i of this.blocks.values()){const n=i.edges.material;n.color.setHex(t.edge),n.opacity=t.edgeOpacity}this.applyMoves()}setMoves(e,t){this.moves=e,this.saturation=t,this.applyMoves()}applyMoves(){for(const e of this.blocks.values()){const t=this.moves.get(e.region.key);e.target=At(t,this.saturation,this.theme);const i=(t==null?void 0:t.change)??null,n=i===null?"idle":i>0?"up":i<0?"down":"flat";e.label.dataset.tone=n,e.label.innerHTML="";const s=document.createElement("b");s.textContent=e.region.label;const r=document.createElement("span");r.textContent=i===null?"—":Ut(i),e.label.append(s,r),e.labelSize=null}this.dirty=!0}setSelected(e){this.selected=e,this.applySelected()}applySelected(){this.clearOutline();for(const t of this.blocks.values())t.label.classList.toggle("is-selected",t.region.key===this.selected);const e=this.selected?this.blocks.get(this.selected):null;if(e){const t=e.edges.geometry.getAttribute("position"),i=new Ne;i.setPositions(Array.from(t.array));const n=new zt(i,this.outlineMat);n.renderOrder=10,n.userData.key=e.region.key,this.outline.add(n)}this.dirty=!0}fitPose(){if(!this.blocks.size)return null;const e=new ae;for(const h of this.blocks.values())e.expandByObject(h.mesh);if(e.isEmpty())return null;e.max.z=this.depth,e.min.z=0;const t=e.getCenter(new w);t.z=0;const i=.58,n=-.18,s=new w(Math.sin(i)*Math.sin(n),-Math.sin(i)*Math.cos(n),Math.cos(i)),r=[new w(e.min.x,e.min.y,0),new w(e.max.x,e.min.y,0),new w(e.min.x,e.max.y,0),new w(e.max.x,e.max.y,0),new w(e.min.x,e.min.y,e.max.z),new w(e.max.x,e.max.y,e.max.z)],a=this.camera.clone();let c=160;for(let h=0;h<4;h++){a.position.copy(t).addScaledVector(s,c),a.lookAt(t),a.updateMatrixWorld();let y=0;for(const u of r){const p=u.clone().project(a);y=Math.max(y,Math.abs(p.x),Math.abs(p.y))}c*=y/.94}return{position:t.clone().addScaledVector(s,c),target:t}}frame(e){const t=this.fitPose();t&&(this.fit=t,this.moveTo(t,e?850:0))}moveTo(e,t){t<=0?(this.camera.position.copy(e.position),this.controls.target.copy(e.target),this.controls.update(),this.tween=null):this.tween={from:{position:this.camera.position.clone(),target:this.controls.target.clone()},to:e,start:performance.now(),ms:t},this.dirty=!0}reset(){this.frame(!0)}setOrbit(e){this.touch&&(this.orbit=e,this.dirty=!0,this.controls.enabled=e,this.renderer.domElement.style.touchAction=e?"none":"pan-y")}twist(e){const t=this.controls.target,i=this.camera.position.clone().sub(t).applyAxisAngle(new w(0,0,1),e);this.camera.position.copy(t).add(i),this.dirty=!0}zoom(e){if(!this.fit)return;const t=this.controls.target.clone(),i=this.camera.position.clone().sub(t),n=this.fit.position.distanceTo(this.fit.target),s=ve.clamp(i.length()*e,n*He,n*1.5);this.moveTo({position:t.clone().add(i.setLength(s)),target:t},320),this.onGesture()}groundAt(e,t){const i=new Z(e/this.width*2-1,-(t/this.height)*2+1);return this.raycaster.setFromCamera(i,this.camera),this.raycaster.ray.intersectPlane(new wt(new w(0,0,1),0),new w)}zoomAt(e,t,i){if(!this.fit)return;const n=this.controls.target,s=this.camera.position.clone().sub(n),r=this.fit.position.distanceTo(this.fit.target),a=ve.clamp(s.length()/i,r*He,r*1.5),c=a/s.length(),h=this.groundAt(e,t);h&&n.sub(h).multiplyScalar(c).add(h),this.camera.position.copy(n).add(s.setLength(a)),this.dirty=!0}panBy(e,t){const i=this.groundAt(e.x,e.y),n=this.groundAt(t.x,t.y);if(!i||!n)return;const s=i.sub(n);this.controls.target.add(s),this.camera.position.add(s),this.dirty=!0}resize(){const e=Math.max(1,this.host.clientWidth),t=Math.max(1,this.host.clientHeight);e===this.width&&t===this.height||(this.width=e,this.height=t,this.renderer.setSize(e,t,!1),this.renderer.domElement.style.width=`${e}px`,this.renderer.domElement.style.height=`${t}px`,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.outlineMat.resolution.set(e,t),this.fit&&this.frame(!1),this.dirty=!0)}step(e){let t=!1;if(this.tween){const n=Math.min(1,(e-this.tween.start)/this.tween.ms),s=Ct(n);this.camera.position.lerpVectors(this.tween.from.position,this.tween.to.position,s),this.controls.target.lerpVectors(this.tween.from.target,this.tween.to.target,s),n>=1&&(this.tween=null),t=!0}for(const n of this.blocks.values()){const s=Math.min(1,Math.max(0,(e-this.introStart-n.delay)/620));s!==n.grow&&(n.grow=s,n.group.scale.z=Math.max(.001,Tt(s)),t=!0);const r=n.region.key===this.selected?this.depth*.5:n.region.key===this.hovered?this.depth*.32:0;Math.abs(r-n.lift)>.005&&(n.lift+=(r-n.lift)*.22,n.group.position.z=n.lift,t=!0),n.color.equals(n.target)||(n.color.lerp(n.target,.14),Math.abs(n.color.r-n.target.r)+Math.abs(n.color.g-n.target.g)+Math.abs(n.color.b-n.target.b)<.004&&n.color.copy(n.target),t=!0);const a=n.color.clone();n.region.key===this.hovered&&a.offsetHSL(0,0,.06),n.cap.color.copy(a),n.side.color.copy(a).multiplyScalar(X[this.theme].side)}const i=this.selected?this.blocks.get(this.selected):null;return i&&(this.outline.position.z=i.lift+(i.group.scale.z-1)*this.depth),this.outline.visible=!!i&&i.grow>=1,t}setPaused(e){this.paused=e,this.refreshVisibility()}placeLabels(){const e=[],t=this.level==="sido",i=[...this.blocks.values()].sort((s,r)=>{const a=c=>c.region.key===this.selected&&!t?2:c.region.key===this.hovered?1:0;return a(r)-a(s)||(t?s.region.area-r.region.area:r.region.area-s.region.area)}),n=new w;for(const s of i){if(s.region.lx===null||s.grow<.6){s.label.style.opacity="0";continue}n.copy(s.anchor),n.z=this.depth*s.group.scale.z+s.lift,n.project(this.camera);const r=(n.x*.5+.5)*this.width,a=(-n.y*.5+.5)*this.height;s.labelSize||(s.labelSize={w:s.label.offsetWidth,h:s.label.offsetHeight});const{w:c,h}=s.labelSize,y=[[0,0],[0,-h*.8],[0,h*.8],[-c*.7,0],[c*.7,0],[c*.8,-h*.9],[-c*.8,-h*.9],[c*.8,h*.9],[-c*.8,h*.9],[0,-h*1.6],[0,h*1.6],[-c*1.2,0],[c*1.2,0]];let u=null;for(const[U,j]of y){const E={x0:r+U-c/2,y0:a+j-h/2,x1:r+U+c/2,y1:a+j+h/2},_=E.x0>=0&&E.y0>=0&&E.x1<=this.width&&E.y1<=this.height,g=e.every(C=>E.x1<C.x0||E.x0>C.x1||E.y1<C.y0||E.y0>C.y1);if(_&&g){u=E;break}}!u&&s.region.key===this.selected&&(u={x0:r-c/2,y0:a-h/2,x1:r+c/2,y1:a+h/2}),u&&e.push(u),s.label.style.opacity=u?"1":"0",s.label.style.pointerEvents=u&&this.touch&&!this.orbit&&s.region.pickable?"auto":"none";const p=u??{x0:r-c/2,y0:a-h/2};s.label.style.transform=`translate(${p.x0.toFixed(1)}px, ${p.y0.toFixed(1)}px)`}}pick(e,t){var a;const i=this.renderer.domElement.getBoundingClientRect(),n=new Z((e-i.left)/i.width*2-1,-((t-i.top)/i.height)*2+1);this.raycaster.setFromCamera(n,this.camera);const r=(a=this.raycaster.intersectObjects([...this.blocks.values()].map(c=>c.mesh),!1)[0])==null?void 0:a.object.userData.key;return r?this.blocks.get(r)??null:null}local(e){const t=this.renderer.domElement.getBoundingClientRect();return{x:e.clientX-t.left,y:e.clientY-t.top}}pinchState(){const[e,t]=[...this.touches.values()];return{dist:Math.hypot(e.x-t.x,e.y-t.y)||1,angle:Math.atan2(t.y-e.y,t.x-e.x),mid:{x:(e.x+t.x)/2,y:(e.y+t.y)/2}}}onSurface(e){var i;const t=e.target;return t===this.renderer.domElement||!!((i=t==null?void 0:t.closest)!=null&&i.call(t,".rm3-label"))}handleTouchMove(e){if(!this.touches.has(e.pointerId)||(this.touches.set(e.pointerId,this.local(e)),this.touches.size!==2||!this.pinch))return;const t=this.pinchState();this.zoomAt(t.mid.x,t.mid.y,t.dist/this.pinch.dist),this.panBy(this.pinch.mid,t.mid);let i=t.angle-this.pinch.angle;i>Math.PI&&(i-=2*Math.PI),i<-Math.PI&&(i+=2*Math.PI),Math.abs(i)>.002&&this.twist(i),this.pinch=t,this.onGesture()}nearestLabel(e){const{x:t,y:i}=this.local(e),n=this.renderer.domElement.getBoundingClientRect();let s=null,r=28;for(const a of this.blocks.values()){if(a.label.style.opacity!=="1")continue;const c=a.label.getBoundingClientRect(),h=Math.hypot(c.left-n.left+c.width/2-t,c.top-n.top+c.height/2-i);h<r&&(r=h,s=a)}return s}}function Bt(){return typeof window<"u"&&("WebGL2RenderingContext"in window||"WebGLRenderingContext"in window)}function qt({regions:l,sido:e,sgg:t,dong:i,period:n,periodLabel:s,touch:r,onSelect:a,paused:c=!1}){var _e,Le;const h=m.useRef(null),y=m.useRef(null),u=m.useRef(null),[p,U]=m.useState(Bt),j=Xe(),[E,_]=m.useState(t?"dong":"sgg"),[g,C]=m.useState(null),[T,D]=m.useState(!1),[b,J]=m.useState(null),[L,$]=m.useState(null),[A,P]=m.useState(!1),[V,Q]=m.useState(()=>{try{return window.localStorage.getItem("re_region_map_pinched")==="1"}catch{return!1}});m.useEffect(()=>{if(V)try{window.localStorage.setItem("re_region_map_pinched","1")}catch{}},[V]);const be=m.useRef({sido:e,sgg:t});m.useEffect(()=>{const o=be.current;t&&t!==o.sgg?_("dong"):!t&&(o.sgg||e!==o.sido)&&_("sgg"),be.current={sido:e,sgg:t}},[e,t]);const xe=m.useRef(c);m.useEffect(()=>{var o;xe.current=c,(o=u.current)==null||o.setPaused(c)},[c]);const O=l.find(o=>o.code===e),q=O==null?void 0:O.sgg.find(o=>o.code===t),S=E==="dong"&&!t?"sgg":E,ee=S==="sido"?"sido.json":S==="sgg"?`sgg/${e}.json`:`emd/${t}.json`,G=`${S}:${S==="sgg"?e:S==="dong"?t:""}:${n}`;m.useEffect(()=>{let o=!1;return D(!1),jt(ee).then(x=>!o&&C({key:ee,level:S,features:x})).catch(()=>!o&&D(!0)),()=>{o=!0}},[ee,S]),m.useEffect(()=>{let o=!1,x=0;const N=()=>{Ye.realEstateSummary({level:S,sido:S==="sgg"?e:void 0,sgg:S==="dong"?t:void 0,period:n}).then(v=>{o||(J({key:G,items:v.items,pending:v.pending}),v.pending>0&&(x=window.setTimeout(N,3500)))}).catch(()=>{o||(x=window.setTimeout(N,8e3))})};return N(),()=>{o=!0,window.clearTimeout(x)}},[G,S,e,t,n]);const te=m.useMemo(()=>{if(!g)return[];const o=g.level==="sido"?new Set(l.map(v=>v.code)):g.level==="sgg"?new Set(((O==null?void 0:O.sgg)??[]).map(v=>v.code)):new Set((q==null?void 0:q.dongs)??[]),x=new Map(g.level==="sido"?l.map(v=>[v.code,v.name]):((O==null?void 0:O.sgg)??[]).map(v=>[v.code,v.name])),N=v=>g.level==="sido"?Re[v]??v:g.level==="sgg"?v.split(" ").pop()??v:v;return g.features.map(v=>{const W=v.properties,Ae=g.level==="dong"?W.name:W.code,Ue=g.level==="dong"?W.name:x.get(W.code)??W.name;return{key:Ae,name:Ue,label:N(Ue),lx:W.lx??0,ly:W.ly??0,area:W.area,polygons:Dt(v),pickable:o.has(Ae)}})},[g,l,O,q]),le=m.useMemo(()=>{const o=new Map;if(b&&b.key===G)for(const x of b.items)o.set(x.code,x);return o},[b,G]);m.useEffect(()=>{if(!p||!h.current||!y.current)return;let o;try{o=new Pt(h.current,y.current,r)}catch{U(!1);return}return u.current=o,o.setPaused(xe.current),()=>{o.dispose(),u.current=null}},[p,r]),m.useEffect(()=>{var o;(o=u.current)==null||o.setTheme(j)},[j,p,r]),m.useEffect(()=>{var o;(o=u.current)==null||o.setOrbit(A)},[A,p,r]),m.useEffect(()=>{var o;(o=u.current)==null||o.setRegions(te,(g==null?void 0:g.level)??"sgg"),$(null)},[te,g==null?void 0:g.level]);const ce=10;m.useEffect(()=>{var o;(o=u.current)==null||o.setMoves(le,ce)},[le,ce,te]);const Se=S==="sido"?e:S==="sgg"?t||null:i||null;m.useEffect(()=>{var o;(o=u.current)==null||o.setSelected(Se)},[Se,te]);const Ee=m.useRef(()=>{});Ee.current=o=>{S==="sido"?o.key===e&&!t?_("sgg"):a({sido:o.key,sgg:"",dong:""}):S==="sgg"?o.key===t?(i&&a({sido:e,sgg:t,dong:""}),_("dong")):a({sido:e,sgg:o.key,dong:""}):a({sido:e,sgg:t,dong:o.key===i?"":o.key})},m.useEffect(()=>{const o=u.current;o&&(o.onPick=x=>Ee.current(x),o.onHover=(x,N,v)=>$(x?{region:x,x:N,y:v}:null),o.onGesture=()=>Q(!0))},[p,r]);const H=L?le.get(L.region.key):void 0,Me=b&&b.key===G?b.pending:0,$e=b&&b.key===G&&b.items.length&&b.items[0].ready!==void 0?b.items.reduce((o,x)=>o+(x.ready??1),0)/b.items.length:1,ze=!g||g.key!==ee||!b||b.key!==G,ke=[{label:"전국",go:()=>_("sido")},...O?[{label:Re[O.name]??O.name,go:()=>t?a({sido:e,sgg:"",dong:""}):_("sgg")}]:[],...q?[{label:q.name,go:()=>i?a({sido:e,sgg:t,dong:""}):_("dong")}]:[],...i?[{label:i,go:null}]:[]];return f.jsxs("section",{className:"rm3","data-mode":j,"aria-label":"지역별 등락 3D 지도",children:[f.jsxs("header",{className:"rm3-head",children:[f.jsx("div",{className:"rm3-tabs",role:"tablist","aria-label":"지도 단위",children:kt.map(o=>f.jsx("button",{type:"button",role:"tab","aria-selected":S===o.key,className:S===o.key?"active":"",disabled:o.key==="dong"&&!t,onClick:()=>_(o.key),children:o.label},o.key))}),f.jsx("nav",{className:"rm3-crumbs","aria-label":"선택한 지역",children:ke.map((o,x)=>f.jsxs("span",{children:[x>0&&f.jsx("i",{"aria-hidden":"true",children:"›"}),o.go&&x<ke.length-1?f.jsx("button",{type:"button",onClick:o.go,children:o.label}):f.jsx("b",{children:o.label})]},x))})]}),f.jsxs("div",{className:`rm3-stage${A?" is-orbit":""}`,ref:h,children:[f.jsx("div",{className:"rm3-labels",ref:y,"aria-hidden":"true"}),!p&&f.jsx("p",{className:"rm3-fallback",children:"이 브라우저는 3D 지도(WebGL)를 지원하지 않습니다. 위의 지역 선택을 이용해 주세요."}),T&&f.jsx("p",{className:"rm3-fallback",children:"지도 경계를 불러오지 못했습니다."}),(ze||Me>0)&&p&&!T&&f.jsxs("div",{className:"rm3-busy",role:"status",children:[f.jsx("span",{className:"rm3-spinner"}),Me>0?`지역 등락 집계 중 ${Math.round($e*100)}%`:"지도를 그리는 중…"]}),r&&p&&A&&f.jsx("p",{className:"rm3-hint is-orbit",children:"한 손가락: 회전·기울기 · 두 손가락: 확대·이동·회전"}),r&&p&&!A&&!V&&!ze&&f.jsx("p",{className:"rm3-hint",children:"두 손가락으로 확대·이동·회전 · 지역 이름을 눌러도 선택됩니다"}),L&&!r&&f.jsxs("div",{className:"rm3-tip",style:{transform:`translate(${L.x>(((_e=h.current)==null?void 0:_e.clientWidth)??0)*.55?`calc(${Math.round(L.x-14)}px - 100%)`:`${Math.round(L.x+14)}px`}, ${L.y>(((Le=h.current)==null?void 0:Le.clientHeight)??0)*.6?`calc(${Math.round(L.y-14)}px - 100%)`:`${Math.round(L.y+14)}px`})`},children:[f.jsx("strong",{children:L.region.name}),H&&H.change!==null?f.jsxs(f.Fragment,{children:[f.jsx("em",{"data-tone":H.change>0?"up":H.change<0?"down":"flat",children:bt(H.change)}),f.jsxs("small",{children:[s," · 거래 단지 ",H.moved.toLocaleString(),"곳 (▲",H.up," ▼",H.down,")"]})]}):f.jsxs("small",{children:[s," 기간 내 비교 거래 없음"]}),L.region.pickable&&f.jsx("span",{className:"rm3-tip-hint",children:S==="sido"?"클릭하면 시·군·구 지도로":S==="sgg"?"클릭하면 읍·면·동 지도로":"클릭하면 이 동만 보기"})]}),p&&f.jsxs("div",{className:"rm3-controls",children:[r&&f.jsx("button",{type:"button",className:`rm3-orbit${A?" is-on":""}`,"aria-pressed":A,"aria-label":A?"회전 모드 끄기":"한 손가락으로 회전·기울기",onClick:()=>P(o=>!o),children:"3D"}),f.jsx("button",{type:"button",onClick:()=>{var o;return(o=u.current)==null?void 0:o.zoom(.7)},"aria-label":"확대",children:"+"}),f.jsx("button",{type:"button",onClick:()=>{var o;return(o=u.current)==null?void 0:o.zoom(1.4)},"aria-label":"축소",children:"−"}),f.jsx("button",{type:"button",onClick:()=>{var o;return(o=u.current)==null?void 0:o.reset()},"aria-label":"시점 초기화",title:"시점 초기화",children:"⟲"})]})]}),f.jsxs("footer",{className:"rm3-legend",children:[f.jsx("span",{children:"하락"}),f.jsx("i",{className:"rm3-legend-bar","aria-hidden":"true"}),f.jsx("span",{children:"상승"}),f.jsxs("small",{children:["전체 집계 단지의 가격 가중 평균 · ",s," · ±",ce,"%",f.jsx("i",{className:"rm3-legend-idle","aria-hidden":"true"}),"비교 자료 없음"]})]})]})}export{qt as default};
