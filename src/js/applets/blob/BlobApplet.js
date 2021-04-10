import {brainsatplay} from '../../brainsatplay'
import {DOMFragment} from '../../frontend/utils/DOMFragment'

import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'three/examples/jsm/libs/stats.module'
import vertexShader from './shaders/blob/vertex.glsl'
import fragmentShader from './shaders/blob/fragment.glsl'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass'
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { gsap } from 'gsap'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import blobTexture from "./img/blobTexture.jpeg"

// import * as p5 from 'p5'
// console.log(p5.noise)

//Example Applet for integrating with the UI Manager
export class BlobApplet {

    static devices = ['eeg'] //,heg

    constructor(
        parent=document.body,
        bci=new brainsatplay(),
        settings=[]
    ) {
    
        //-------Keep these------- 
        this.parentNode = parent;
        this.settings = settings;
        this.bci = bci; //Reference to the brainsatplay session to access data and subscribe
        this.AppletHTML = null;
        //------------------------

        this.props = { //Changes to this can be used to auto-update the HTML and track important UI values 
            id: String(Math.floor(Math.random()*1000000)), //Keep random ID
            //Add whatever else
        };

        //etc..

    }

    //---------------------------------
    //---Required template functions---
    //---------------------------------

    //Initalize the app with the DOMFragment component for HTML rendering/logic to be used by the UI manager. Customize the app however otherwise.
    init() {

        //HTML render function, can also just be a plain template string, add the random ID to named divs so they don't cause conflicts with other UI elements
        let HTMLtemplate = (props=this.props) => { 
            return `
            <div id='${props.id}' class="blob-wrapper" style='height:${props.height}; width:${props.width};'>
                <div id="blob-renderer-container"><canvas class="blob-webgl"></canvas></div>
                <div class="blob-gui-container"></div>
            </div>
            `;
            // return `
            // <div id='${props.id}' class="blob-wrapper" style='height:${props.height}; width:${props.width};'>
            //     <div id="blob-renderer-container"><canvas class="blob-webgl"></canvas></div>
            //     <div class="blob-gui-container"></div>
            //     <div class="blob-mask"></div>
            //     <div id="blob-gameHero" class="blob-container">
            //         <div>
            //             <h1>Blob Study</h1>
            //         </div>
            //     </div>
            // </div>
            // `;
        }

        //HTML UI logic setup. e.g. buttons, animations, xhr, etc.
        let setupHTML = (props=this.props) => {
            document.getElementById(props.id);
        }

        this.AppletHTML = new DOMFragment( // Fast HTML rendering container object
            HTMLtemplate,       //Define the html template string or function with properties
            this.parentNode,    //Define where to append to (use the parentNode)
            this.props,         //Reference to the HTML render properties (optional)
            setupHTML,          //The setup functions for buttons and other onclick/onchange/etc functions which won't work inline in the template string
            undefined,          //Can have an onchange function fire when properties change
            "NEVER"             //Changes to props or the template string will automatically rerender the html template if "NEVER" is changed to "FRAMERATE" or another value, otherwise the UI manager handles resizing and reinits when new apps are added/destroyed
        );  

        if(this.settings.length > 0) { this.configure(this.settings); } //You can give the app initialization settings if you want via an array.



/**
 * Blob
 */

const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
        gsap.delayedCall(0.1,() => 
        {
            canvas.style.opacity = '1'
            this.resizeBlob()
            // gsap.delayedCall(2.0,() => 
            // {
            //     document.querySelector('.blob-mask').style.opacity = '0'
            //     document.getElementById('blob-gameHero').style.opacity = '0'

            // })
        })
    }, 
    // Progress
    (itemURL, itemsLoaded, itemsTotal) => {
        console.log(itemsLoaded/itemsTotal)
    }
)
const textureLoader = new THREE.TextureLoader(loadingManager)
const texture = textureLoader.load(blobTexture)

/**
 * Canvas
 */
const blobContainer = document.getElementById(this.props.id)
let canvas = document.querySelector('canvas.blob-webgl')

/**
 * Scene
 */
const scene = new THREE.Scene()
// // const light = new THREE.AmbientLight(0x00b3ff);
// const light = new THREE.AmbientLight(0xffffff);
// light.position.set(0, 5, 10);
// light.intensity = 1.4;
// scene.add(light);

let sphereDiameter = 100

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.z = 20

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

/**
 * Texture Params
 */
 let imageWidth = 1200
 let imageHeight = 600
 const segmentsX = 400
 const imageAspect = imageWidth/imageHeight
 let fov_y = camera.position.z * camera.getFilmHeight() / camera.getFocalLength();
 let meshWidth = (fov_y  - 1.0)* camera.aspect;
 let meshHeight = meshWidth / imageAspect;

// Renderer
renderer.setSize(blobContainer.clientWidth, blobContainer.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
document.getElementById('blob-renderer-container').appendChild(renderer.domElement)
canvas = document.querySelector('canvas.blob-webgl')

// GUI
// const gui = new GUI({ autoPlace: false });
// blobContainer.querySelector('.blob-gui-container').appendChild(gui.domElement);

/** 
 * Postprocessing 
 **/

 // Render Target

 let RenderTargetClass = null

 if(renderer.getPixelRatio() === 1 && renderer.capabilities.isWebGL2)
 {
     RenderTargetClass = THREE.WebGLMultisampleRenderTarget
 }
 else
 {
     RenderTargetClass = THREE.WebGLRenderTarget
 }

 const renderTarget = new RenderTargetClass(
    window.innerWidth , window.innerHeight,
    {
        minFilter: THREE.LinearFilter,
        maxFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        encoding: THREE.sRGBEncoding,
        type: THREE.HalfFloatType // For Safari (doesn't work)
    }
 )

 // Composer
const effectComposer = new EffectComposer(renderer,renderTarget)
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
effectComposer.setSize(blobContainer.clientWidth, blobContainer.clientHeight)

 // Passes
const renderPass = new RenderPass(scene, camera)
effectComposer.addPass(renderPass)

// const effectGrayScale = new ShaderPass( LuminosityShader );
// effectComposer.addPass( effectGrayScale );

// const effectSobel = new ShaderPass( SobelOperatorShader );
// effectSobel.uniforms[ 'resolution' ].value.x = window.innerWidth * window.devicePixelRatio;
// effectSobel.uniforms[ 'resolution' ].value.y = window.innerHeight * window.devicePixelRatio;
// effectComposer.addPass( effectSobel );

// const shaderPass = new ShaderPass(RGBShiftShader)
// shaderPass.enabled = true
// effectComposer.addPass(shaderPass)

const bloomPass = new UnrealBloomPass()
bloomPass.enabled = true
// bloomPass.strength = 0.5
bloomPass.radius = 1
// bloomPass.threshold = 0.6
effectComposer.addPass(bloomPass)

// // Custom Shader Pass
// const customPass = new ShaderPass({
//     uniforms: {
//         tDiffuse: { value: null },
//         uInterfaceMap: { value: null }
//     },
//     vertexShader: interfaceVertexShader,
//     fragmentShader: interfaceFragmentShader
// })
// customPass.material.uniforms.uInterfaceMap.value = futuristicInterface
// effectComposer.addPass(customPass)

// Antialiasing
if(renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2)
{
    const smaaPass = new SMAAPass()
    effectComposer.addPass(smaaPass)
    console.log('Using SMAA')
}


// Controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.screenSpacePanning = true
controls.enableDamping = true
controls.enabled = false;

//controls.addEventListener('change', render)

// Plane
const sphereGeometry = new THREE.SphereGeometry(sphereDiameter, Math.pow(2,6), Math.pow(2,6) );
let tStart = Date.now()

// const material = new THREE.MeshNormalMaterial( );

var materialControls = new function () {
    this.rPower = 0.0;
    this.gPower = 0.85;
    this.bPower = 1.0;
    this.alpha = 1.0;
    this.noiseIntensity = 0.5;

    this.updateColor = function () {
        material.uniforms.uColor.value = [
            materialControls.rPower,
            materialControls.gPower,
            materialControls.bPower,
            materialControls.alpha
        ]
    };

    this.updateNoise = function () {
        material.uniforms.uNoiseIntensity.value = materialControls.noiseIntensity
    };
};


const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true,
    // wireframe: true,
    blending: THREE.AdditiveBlending,
    uniforms:
    {
        uTime: { value: 0 },
        aspectRatio: {value: window.innerWidth / window.innerHeight},
        uColor: {value: [materialControls.rPower,materialControls.gPower,materialControls.bPower,materialControls.alpha] },
        uNoiseIntensity: {value: materialControls.noiseIntensity}
    }
})


// Mesh
const blob = new THREE.Mesh(sphereGeometry, material)
scene.add(blob)

// let colorMenu = gui.addFolder('Color');
// colorMenu.add(materialControls, 'rPower', 0, 1).onChange(materialControls.updateColor);
// colorMenu.add(materialControls, 'gPower', 0, 1).onChange(materialControls.updateColor);
// colorMenu.add(materialControls, 'bPower', 0, 1).onChange(materialControls.updateColor);

// let offsetMenu = gui.addFolder('Noise');
// offsetMenu.add(materialControls, 'noiseIntensity', 0, 1).onChange(materialControls.updateNoise);



// Resize
this.resizeBlob = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    meshWidth = (fov_y  - 1.0)* camera.aspect;
    meshHeight = meshWidth / imageAspect
    regenerateGeometry()
    renderer.setSize(blobContainer.clientWidth, blobContainer.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    effectComposer.setSize(blobContainer.clientWidth, blobContainer.clientHeight)

}

window.addEventListener('resize', this.resizeBlob, 
false)

function regenerateGeometry() {
    let newGeometry = new THREE.SphereGeometry(
        5,32,32
    )
    blob.geometry.dispose()
    blob.geometry = newGeometry
}

// Coherence
const getCoherence = (band='alpha1') => {
    let coherence = null;
    if(this.bci.atlas.settings.coherence) {
        let coherenceBuffer = this.bci.atlas.data.coherence[0].means[band]
        if(coherenceBuffer.length > 0) {
            coherence = 1000*coherenceBuffer[coherenceBuffer.length-1] ?? 1
        }
    }
    return coherence ?? 0.5 + Math.sin(Date.now()/1000)/2; // Real or Simulation
}

// Animate

let easing = 0.01;
let currentCoherence = 1

var animate = () => {

    // Limit Framerate
    setTimeout( function() {
        requestAnimationFrame( animate );
    }, 1000 / 60 );

    material.uniforms.uTime.value = Date.now() - tStart

    let desiredCoherence = getCoherence()
    let dCoherence = desiredCoherence - currentCoherence
    currentCoherence = (currentCoherence + easing*dCoherence)    
    material.uniforms.uNoiseIntensity.value = 1-currentCoherence
    controls.update()
    effectComposer.render()
};


// // Stats
// const stats = Stats()
// blobContainer.appendChild(stats.dom)

    animate();
    }

    //Delete all event listeners and loops here and delete the HTML block
    deinit() {
        this.AppletHTML.deleteNode();
        //Be sure to unsubscribe from state if using it and remove any extra event listeners
    }

    //Responsive UI update, for resizing and responding to new connections detected by the UI manager
    responsive() {
        this.resizeBlob()
    }

    configure(settings=[]) { //For configuring from the address bar or saved settings. Expects an array of arguments [a,b,c] to do whatever with
        settings.forEach((cmd,i) => {
            //if(cmd === 'x'){//doSomething;}
        });
    }

    //--------------------------------------------
    //--Add anything else for internal use below--
    //--------------------------------------------

    //doSomething(){}
} 