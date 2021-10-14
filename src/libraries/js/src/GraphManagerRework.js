import { StateManager } from "./ui/StateManager";
import { WorkerManager } from "./utils/workers/Workers";

/* proposed structure
.Applet {
  .devices []
  .graph {
    .events[] { //multithreaded events, these are just discontinuous graph i/o but allow cross-threaded nodes
        .addEvent(name)
        .subEvent(name,port)
        .unsubEvent(name,port)
    }
    .nodes[] {
      .plugins[] { 
        .oninput(in) {
            if(nodegraph) 
              call pluginsgraph.plugins[0].oninput(in) return {result}; //i.e. recursive graphs. Graphs may allow asynchronous actions via events
            else if (pluginsfunction) call nodefunction(in) return {result}; //should return objects with the port names to output to.   
         }
        .ports[] { 
            define node (outer) i/o
        }
        .addPort()
        .removePort()
        .wires[]{
            connect plugin port (outer) i/o to graph i/o (inner) if using a graph plugin
        }
        .addWire()
        .removeWire()
      } 
      .ports[] {
        define plugin (outer) i/o
      }  
      .addPort()
      .removePort()
      .wires[] { 
        connect node (inner) i/o
      }
      .addWire()
      .removeWire()
    }
    .ports[] {
      define graph (outer) i/o
    }
    .addPort()
    .removePort()
    .wires[] {
      connect plugin (inner) i/o
    }
    .addWire()
    .removeWire()
  }
}
*/

//multithreaded event manager, spawn one per thread and import a single instance elsewhere.

/**
 * How it'll work:
 * Function output --> Event Emitter Tx
 * 
 * Event Emitter Rx[] --> State sub triggers to pass output to subscribed ports.
 * 
 * So set the worker onmessage up with the event manager as well (when it's done).
 * This is going to be integral with the node/plugin system so that's what will handle wiring up event i/o
 * and enable native multithreaded graphs. 
 * Use flags, intervals, and animation loops where appropriate to avoid overrun. 
 */
class GraphEventManager {
    constructor() {
        if(window) {
            if(!window.workers) { 
                window.workers = new WorkerManager();
            } //if on main thread
            else {
                let found = window.workers.workerResponses.find((foo) => {
                    if(foo.name === 'eventmanager') return true;
                });
                if(!found) {
                    window.workers.addCallback('eventmanager',this.workerCallback);
                }
            }
        } 
    }

    subEvent(workerIdx=0,foo='') {  

    }

    workerCallback = (msg) => {

    }
}


class Applet {
    constructor(name='') {
        this.name = name;
        this.graphs = {};
        
        this.state = new StateManager({});
    }

    addGraph = (name='') => {
        if(!this.graphs[name]) this.graphs[name] = new Graph(name);
    }

    removeGraph = (name='') => {}
}

class Graph {
    constructor(name='', parentApplet) {
        this.name = name;
        this.parentApplet = parentApplet;
        this.nodes = {};
    }

    addNode = () => {}

    removeNode = () => {}

}

class Node {
    constructor(name='', parentGraph, parentApplet) {
        this.name = name;
        this.parentGraph = parentGraph;
        this.parentApplet = parentApplet;
        this.position = {x:0, y:0, z:0};
        this.ports = {};
        this.plugins = {}; //can add entire new graphs
    }

    addPort = (name='') => {
        if(!this.ports[name]) this.ports[name] = new Port(name, this);
    }

    connect = (name='',sourceNode,sourcePort,targetNode,targetPort) => {

        if(!sourceNode.wires[name] && !targetNode.wires[name]) {
            let wire = new Wire(name, this);

        }
    }

    addPlugin = (name='') => {
        if(!this.graphs[name]) this.graphs[name] = new Graph(name, this.parentApplet);
    }
 
    removePort = (name='') => {}

    removeWire = (name='') => {}

    removeGraph = (name='') => {}
}

class Plugin {
    constructor(name='', parentGraph, parentApplet) {
        this.name = name;
        this.parentGraph = parentGraph;
        this.parentApplet = parentApplet;
        this.ports = {};
        this.graphs = {}; //can add entire new graphs
    }

    addPort = (name='') => {
        if(!this.ports[name]) this.ports[name] = new Port(name, this);
    }

    connect = (name='',sourceNode,sourcePort,targetNode,targetPort) => {

        if(!sourceNode.wires[name] && !targetNode.wires[name]) {
            let wire = new Wire(name, this);

        }
    }

    addPlugin = (name='') => {
        if(!this.graphs[name]) this.graphs[name] = new Graph(name, this.parentApplet);
    }
 
    removePort = (name='') => {}

    removeWire = (name='') => {}

    removeGraph = (name='') => {}
}


class Port {
    constructor (name='', parentNode, onchange = (newValue) => {}) {
        this.name = name;
        this.parentNode = parentNode;

        this.onchange = onchange;
        this.wires = {};
        
        this.value;
    }

    connect(sourcePlugin,sourcePort,targetNode,targetPort) {

    }

    checkForUpdates() {

    }

    set = (newValue) => {
        this.value = newValue;
        this.onchange(newValue);
    }

    get = () => {
        return this.value;
    }

    onchange = (newValue) => {
        
    }
}

class Wire {
    constructor (name='', parentNode) {
        this.name = name;
        this.parentNode = parentNode;
        
        this.sourcePlugin;
        this.sourcePort;
        this.targetPlugin;
        this.targetPort;

        this.value;
    }

    set = (newValue) => {
        this.value = newValue;
        this.onchange(newValue);
    }

    get = () => {
        return this.value;
    }

    onchange = (newValue) => {

    }
}