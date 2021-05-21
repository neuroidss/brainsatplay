//Template system to feed into the deviceStream class for creating possible configurations. 
//Just fill out the template functions accordingly and add this class (with a unique name) to the list of usable devices.
import { DOMFragment } from '../../ui/DOMFragment';
import {DataAtlas} from '../../DataAtlas'
import {BiquadChannelFilterer} from '../../algorithms/BiquadFilters'
import BCI2K from 'bci2k'

export class bci2000Plugin {
    constructor(mode, onconnect=this.onconnect, ondisconnect=this.ondisconnect) {
        this.atlas = null;
        this.mode = mode;
        this.operator = new BCI2K.bciOperator(); //Invoke a device class here if needed
        this.filters = [];

        this.onconnect = onconnect;
        this.ondisconnect = ondisconnect;
    }

    init = async (info,pipeToAtlas) => {

        info.sps = 256 // Arbitrary
        info.deviceType = 'eeg'
        this.info = info;

        return new Promise((resolve, reject) => {

            let script = ``;
            script += `Reset System; `;
            script += `Startup System localhost; `;
            script += `Add State StimulusCode 4 0; `;
            script += `Add State BrainClick 1 0; `;
            script += `Add State Baseline 1 0; `;
            script += `Add State TrialStart 1 0; `;
            script += `Start executable SignalGenerator; `;
            script += `Start executable DummyApplication; `;
            script += `Start executable DummySignalProcessing; `;
            script += `Set Parameter WSSourceServer *:20100; `;
            script += `Wait for connected; `;
            script += `Set Config; `;
            script += `Start; `;
    
            this.operator.connect("ws://127.0.0.1").then(() => {
                console.log("Connected to Operator layer through NodeJS server");
                this.operator.execute(script);
                this.device = new BCI2K.bciData();
                this.device.connect("ws://127.0.0.1:20100").then((x) => {
    
                    // Create Event Handlers
                    this.device.onGenericSignal = (raw) => {
                        console.log(raw)
                        if(this.info.useAtlas) {
                            raw.forEach((chData,i) => {
                                let coord = this.atlas.getEEGDataByChannel(i);
                                // coord.times.push(...time);
                                coord.raw.push(...chData);
                                coord.count += chData.length;
                                // if(this.info.useFilters === true) {                
                                //     let latestFiltered = new Array(chData.length).fill(0);
                                //     if(this.filters[this.info] !== undefined) {
                                //         chData.forEach((sample,k) => { 
                                //             latestFiltered[k] = this.filters[i].apply(sample); 
                                //         });
                                //     }
                                //     coord.filtered.push(...latestFiltered);
                                // }
                                // console.log(coord.filtered);
                            })	
                        }
                    };

                    this.device.onStateFormat = data => console.log(data);
                    this.device.onSignalProperties = data => {
                        console.log(data);
    
                        // Check if already created (websocket tends to close and reopen...)
                        if (this.atlas == null){
                            // let eegChannelTags = []
                            // data.channels.forEach((t,i) => {
                            //     eegChannelTags.push({ch: i, tag: t, analyze: true})
                            // })
                            this.info.eegChannelTags = data.channels.length//eegChannelTags
        
                            // Create Data Atlas Given Signal Properties
                            this.setupAtlas(this.info,pipeToAtlas);  
                            
                            // Validate Connection
                            this.onconnect();
                        }
                        resolve(true)                
                    }
                });
              });
            })
    }

    setupAtlas = (info,pipeToAtlas) => {

        if(pipeToAtlas === true) { //New Atlas
			let config = '10_20';
            this.atlas = new DataAtlas(
				location+":"+this.mode,
				{eegshared:{eegChannelTags:info.eegChannelTags, sps:info.sps}},
				config,true,true,
				info.analysis
				);
			info.useAtlas = true;
		} else if (typeof pipeToAtlas === 'object') { //Reusing an atlas
			this.atlas = pipeToAtlas; //External atlas reference
            this.atlas.data.eegshared.eegChannelTags = info.eegChannelTags;
            this.atlas.data.eegshared.sps = info.sps;
            this.atlas.data.eegshared.frequencies = this.atlas.bandpassWindow(0,128,info.sps*0.5);
			this.atlas.data.eegshared.bandFreqs = this.atlas.getBandFreqs(this.atlas.data.eegshared.frequencies);
			this.atlas.data.eeg = this.atlas.genMuseAtlas(); 
            this.atlas.data.coherence = this.atlas.genCoherenceMap(info.eegChannelTags);
            this.atlas.settings.coherence = true;
            this.atlas.settings.eeg = true;
            info.useAtlas = true;
			if(info.analysis.length > 0 ) {
				this.atlas.settings.analysis.push(...info.analysis);
                if(!this.atlas.settings.analyzing) { 
                    this.atlas.settings.analyzing = true;
                    this.atlas.analyzer();
                }
			}
		}

        // Auto-assign channel tags
        if (!Array.isArray(info.eegChannelTags)) info.eegChannelTags = this.atlas.data.eegshared.eegChannelTags
       console.log(info.eegChannelTags)

        // Create Filters
        if(info.useFilters === true) {
            info.eegChannelTags.forEach((row,i) => {
                this.filters.push(new BiquadChannelFilterer(row.ch,info.sps,true,1));
            });
        }

        this.atlas.data.eegshared.startTime = Date.now();
        this.atlas.settings.deviceConnected = true;
        if(this.atlas.settings.analyzing !== true && this.info.analysis.length > 0) {
            this.atlas.settings.analyzing = true;
            setTimeout(() => {this.atlas.analyzer();},1200);		
        }

    }

    _onConnected = () => {} //for internal use only on init

    connect = () => {

    }

    disconnect = () => {
        this.ondisconnect();
        //ondisconnected: this.atlas.settings.deviceConnected = false;
    }

    //externally set callbacks
    onconnect = () => {}
    ondisconnect = () => {}

    addControls = (parentNode = document.body) => {
        let id = Math.floor(Math.random()*10000); //prevents any possible overlap with other elements
        let template = () => {
            return `
            `;
        }

        let setup = () => {
           

        }

        this.ui = new DOMFragment(
            template,
            parentNode,
            undefined,
            setup
        )
        
    }

}