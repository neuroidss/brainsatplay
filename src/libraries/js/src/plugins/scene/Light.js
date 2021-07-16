import * as THREE from 'three'
import { StateManager } from '../../ui/StateManager'

export class Light{

    static id = String(Math.floor(Math.random()*1000000))
    
    constructor(label, session, params={}) {
        this.label = label
        this.session = session
        this.params = params

        this.paramOptions = {
            x: {default: -1, min: -10, max:10, step: 0.01},
            y: {default: 1.5, min: -10, max:10, step: 0.01},
            z: {default: -1.5, min: -10, max:10, step: 0.01},
            color: {default: '#ffffff'},
            intensity: {default: 1, min: 0, max:10, step: 0.01},
            distance: {default: 100, min: 0, max:1000, step: 0.01},
            decay: {default: 1, min: 0, max:10, step: 0.01},
        }

        this.props = {
            id: String(Math.floor(Math.random() * 1000000)),
            mesh: null,
            state: new StateManager(),
            lastRendered: Date.now()
        }

        this.props.mesh = new THREE.AmbientLight( 0xFFFFFF ); //new THREE.DirectionalLight();

        this.ports = {
            add: {
                default: this.props.mesh,
                input: {type: null},
                output: {type: Object, name: 'Mesh'},
                onUpdate: () => {
                    if (this.props.mesh == null){
                        this.props.mesh = new THREE.AmbientLight( this.params.color );
                        this.props.mesh.target.position.set( 0, 0, - 2 );
                    }
                    this.props.mesh.position.set( this.params.x, this.params.y, this.params.z );
                    return [{data: this.props.mesh, meta: {params: this.params}}]
                }
            },
            radius: {
                types: {
                    in: 'number',
                    out: null,
                }
            },
            dx: {
                types: {
                    in: 'number',
                    out: null,
                }
            },
            dy: {
                types: {
                    in: 'number',
                    out: null,
                }
            },
            color: {
                types: {
                    in: 'color',
                    out: null,
                }
            },
        }

    }

    init = () => {

        // Subscribe to Changes in Parameters
        this.props.state.addToState('params', this.params, () => {
            if (Date.now() - this.props.lastRendered > 500){
                // this.session.graph.runSafe(this,'add',[{forceRun: true}])
                this.props.lastRendered = Date.now()
            }
        })

    }

    deinit = () => {
        if (this.props.mesh){
            // if (this.props.mesh.type === 'Mesh') {
            //     this.props.mesh.geometry.dispose();
            //     this.props.mesh.material.dispose();
            // }
            // this.props.scene.remove(this.mesh);
        }
    }
    
    radius = (userData) => {
        this.params.radius = Math.abs(Number.parseFloat(userData[0].data))
    }

    dx = (userData) => {
        let desiredX = Number.parseFloat(this.params.x) + Number.parseFloat(userData[0].data)
        if (desiredX > 0){
            this.params.x = desiredX
        }
    }

    dy = (userData) => {
        let desiredY =  Number.parseFloat(this.params.y) + Number.parseFloat(userData[0].data)
        if (desiredY > 0){
            this.params.y = desiredY
        }
    }

    color = (userData) => {
        this.params.color = userData[0].data
    }
}