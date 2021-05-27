import Worker from 'web-worker'

let defaultWorkerThreads = 2

let eegWorkers = []

for(var i = 0; i < defaultWorkerThreads; i++){
    eegWorkers.push(
        new Worker(
            new URL('./utils/eeg.worker.js', import.meta.url),
            {name:'eegworker_'+i, type: 'module'}
        )
    )
}

export class WorkerManager {
    constructor(){
        this.workerResponses = []
        this.workers = []
        this.workerThreads = defaultWorkerThreads
        this.workerThreadrot = 0

        // Setup EEG Workers
        try {
            for(var i = 0; i < eegWorkers.length; i++){

                eegWorkers[i].onmessage = (e) => {
                    var msg = e.data;
                    //console.log(msg)
                    //window.receivedMsg(msg);
                    this.workerResponses.forEach((foo,i) => {
                        foo(msg);
                    });
                };

                this.workers.push(eegWorkers[i]);
            }
            console.log("worker threads: ", this.workers.length)
        }
        catch (err) {
            console.error(err);
        }
    }

    addWorker = (workerurl) => {
        console.log('add worker')
        try {
            this.workers.push(new Worker(workerurl,//new URL(workerurl, import.meta.url),
            {
            name:'eegworker_'+this.workers.length, 
            type: 'module',
            }));
            this.workers[i].onmessage = (e) => {
                var msg = e.data;
                //console.log(msg)
                //window.receivedMsg(msg);
                this.workerResponses.forEach((foo,i) => {
                foo(msg);
                })
            };
            console.log("worker threads: ", this.workers.length)
            return this.workers.length-1; //index
        } catch (err) {
            console.log(err);
        }
    }

    postToWorker = (input,workeridx = null) => {
        if(workeridx === null) {
            this.workers[this.workerThreadrot].postMessage(input);
            if(this.workerThreads > 1){
                this.workerThreadrot++;
                if(this.workerThreadrot >= this.workerThreads){
                    this.workerThreadrot = 0;
                }
            }
        }
        else{
            this.workers[workeridx].postMessage(input);
        }
    }
}
