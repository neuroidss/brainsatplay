//Load and save CSV data
import {DataAtlas} from '../../../library/src/DataAtlas'
import { StateManager } from '../../../library/src/ui/StateManager';
import {CSV} from '../../general/csv'

export class DataLoader {
    constructor(atlas=new DataAtlas(), onload = this.onload) {
        this.atlas = atlas;
        this.state = new StateManager({
            loaded:{header:[],data:{},type:''}
        });

        this.onload = onload;

        this.state.subscribe('loaded',(loaded)=>{this.onload(loaded);});
    }

    readyHEGDataForWriting = (from=0,to='end') => {
        let data = this.atlas.readyHEGDataForWriting(from,to);
        return data;
    }

    readyEEGDataForWriting = (from=0,to='end') => {
        let data = this.atlas.readyEEGDataForWriting(from,to);
        return data;
    }

    //for getting data saved in our format
    getHEGDataFromCSV = () => {
        CSV.openCSV(',',(data, header) => {
            let t = [], red = [], ir = [], ratio = [], ratiosma = [], ambient = [];
            let err = 0;
            let mse = 0;
            data.forEach((row)=>{
                t.push(parseFloat(row[1]));
                red.push(parseFloat(row[2]));
                ir.push(parseFloat(row[3]));
                ratio.push(parseFloat(row[4]));
                if(ratio.length > 40) ratiosma.push(this.mean(ratio.slice(ratio.length-40)))
                else ratiosma.push(this.mean(ratio.slice(0)));
                ambient.push(parseFloat(row[5]));
                err += Math.abs((ratio[ratio.length-1] - ratiosma[ratiosma.length-1])/ratiosma[ratiosma.length-1])
                mse += Math.pow((ratio[ratio.length-1] - ratiosma[ratiosma.length-1]),2)
            });
            err = err/ratio.length;
            let rmse = Math.sqrt(mse/ratiosma.length);
            this.state.data.type = 'heg';
            this.state.data.loaded.header = header;
            this.state.data.loaded.data = { times:t, red:red, ir:ir, ratio:ratio, ratiosma:ratiosma, ambient:ambient, error:err, rmse:rmse};
        });
    }

    getEEGDataFromCSV = () => {
        CSV.openCSV(',',(data, header) => {
            let channels = {times:[], fftTimes:[]};
            let indices = [];
            let dtypes = [];
            let names = [];
            let ffts = false;
            header.forEach((value, idx) => {
                let v = value.split(';');
                if(v.length > 1) {
                    if(v[1].toLowerCase().indexOf("fft") > -1) {
                        ffts=true;
                        indices.push(idx);
                        dtypes.push('fft');
                        channels[v[0]+"_fft"] = [];
                        names.push(v[0]+"_fft");
                    }
                } else if (ffts === false && idx > 1) {
                    indices.push(idx); //push all headers till we get to the first fft header
                    channels[v[0]+"_signal"] = [];
                    names.push(v[0]+"_signal");
                    dtypes.push('signal');
                } else if (v[0].toLowerCase().indexOf('unix') > -1) {
                    dtypes.push('times');
                    indices.push(idx);
                }
            });

            data.forEach((row) => {
                let j = 0;
                let ffttime = false;
                indices.forEach((idx,j) => {
                    if(dtypes[j] === 'signal') {
                        channels[names[j]].push(row[idx]);
                    } else if (dtypes[j] === 'fft' && row[idx+1]) {
                        if(!ffttime) {channels.fftTimes.push(row[1]); ffttime = true;}

                        if(indices[idx+1])
                            channels[names[j]].push(row[idx+1].slice(idx+1,indices[idx+1]));
                        else channels[names[j]].push(row[idx+1].slice(idx+1));
                    } else if (dtypes[j] === 'times') {
                        channels.times.push(row[j]);
                    }
                });
            });

            this.state.data.loaded = {type:'eeg', header:header, data:channels};
        });
    }

    onload = (loaded) => {
        console.log(loaded);
    }

}