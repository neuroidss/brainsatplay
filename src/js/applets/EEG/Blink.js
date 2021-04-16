import {brainsatplay} from '../../brainsatplay'
import {DOMFragment} from '../../frontend/utils/DOMFragment'

//Example Applet for integrating with the UI Manager
export class BlinkApplet {

    static devices = ['eeg']; //{devices:['eeg'], eegChannelTags:['FP1','FP2']  }

    constructor(
        parent=document.body,
        bci=new brainsatplay(),
        settings=[]
    ) {
    
        //-------Keep these------- 
        this.bci = bci; //Reference to the brainsatplay session to access data and subscribe
        this.parentNode = parent;
        this.settings = settings;
        this.AppletHTML = null;
        //------------------------

        this.props = { //Changes to this can be used to auto-update the HTML and track important UI values 
            id: String(Math.floor(Math.random()*1000000)), //Keep random ID
            buttonOutput: 0 //Add whatever else
        };

        //etc..
        this.sub1 = undefined;
    }

    //---------------------------------
    //---Required template functions---
    //---------------------------------

     //Initalize the app with the DOMFragment component for HTML rendering/logic to be used by the UI manager. Customize the app however otherwise.
    init() {

        //HTML render function, can also just be a plain template string, add the random ID to named divs so they don't cause conflicts with other UI elements
        let HTMLtemplate = (props=this.props) => { 
            let name = 'BCI App'; if(this.bci) if(this.bci.devices.length > 0) name = "BCI App for "+this.bci.devices[0].info.deviceName;
            return `
                <div id='${props.id}' style='height:${props.height}; width:${props.width}; display: flex; align-items: center; justify-content: center;'>
                    <div id="${props.id}-left" style="margin: 25px; border-radius: 50%; background: white; transition: opacity 0.12s;">
                        <div id="${props.id}-left" style="width: 50%; height: 50%; border-radius: 50%; background: cyan; transform: translate(50%,50%)">
                        <div id="${props.id}-left" style="width: 50%; height: 50%; border-radius: 50%; background: black; transform: translate(50%,50%)"></div>
                        </div>
                    </div>
                    <div id="${props.id}-right" style="margin: 25px; border-radius: 50%; background: white; transition: opacity 0.12s;">
                        <div id="${props.id}-left" style="width: 50%; height: 50%; border-radius: 50%; background: cyan; transform: translate(50%,50%)">
                        <div id="${props.id}-left" style="width: 50%; height: 50%; border-radius: 50%; background: black; transform: translate(50%,50%)"></div>
                        </div>
                    </div> 
                </div>
            `;
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

        if(this.settings.length > 0) { this.configure(this.settings); } //you can give the app initialization settings if you want via an array.


        //Add whatever else you need to initialize
        this.responsive()

        this.updateAnimation = () => {
            let leftEye = document.getElementById(this.props.id+"-left")
            let rightEye = document.getElementById(this.props.id+"-right")
            let blink = this.bci.atlas.getBlink()
            let leftOpacity = 1-(blink[0]? 1 : 0)
            let rightOpacity = 1-(blink[1]? 1 : 0)
            if (leftEye) leftEye.style.opacity = leftOpacity
            if (rightEye) rightEye.style.opacity = rightOpacity

            setTimeout(() => {this.animate = requestAnimationFrame(this.updateAnimation);},60);
        }
        this.updateAnimation()
    }

    //Delete all event listeners and loops here and delete the HTML block
    deinit() {
        this.AppletHTML.deleteNode();
        cancelAnimationFrame(this.animate);
        //Be sure to unsubscribe from state if using it and remove any extra event listeners
    }

    //Responsive UI update, for resizing and responding to new connections detected by the UI manager
    responsive() {
        let container = document.getElementById(this.props.id)
        let leftEye = document.getElementById(this.props.id+"-left")
        let rightEye = document.getElementById(this.props.id+"-right")
        leftEye.style.width = leftEye.style.height = rightEye.style.width = rightEye.style.height = `${Math.min(container.clientWidth,container.clientHeight)/4}px`
        //let canvas = document.getElementById(this.props.id+"canvas");
        //canvas.width = this.AppletHTML.node.clientWidth;
        //canvas.height = this.AppletHTML.node.clientHeight;
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