
import {Manager} from './Manager'
import {Results} from './Results'
import audioCue from './audioCue.mp3'

let button = document.createElement('button')
button.innerHTML = 'Connect EEG'

export const settings = {
    name: "Experiment",
    devices: ["EEG"],
    author: "Garrett Flynn",
    description: "Compare alpha power when eyes closed vs. eyes open.",
    categories: ["learn"],
    instructions:"Coming soon...",
    display: {
      production: false,
      development: true
    },

    // intro: {
    //   title:false
    // },
    // analysis: ['eegfft'],
    analysis: ['eegcoherence'],

    connect: {
      toggle: button,
      onconnect: () => {

        button.innerHTML = 'Start Experiment'
        button.onclick = () => {
            let n = settings.graph.nodes.find(n => n.id === 'manager')
            n.instance.update('start', {data: true})
        }

      }
    },

    // App Logic
    graph:
    {
      nodes: [
        {name: 'eeg', class: brainsatplay.plugins.biosignals.EEG},
        {name: 'manager', class: Manager, params: {button}},
        {
          name: 'scheduler', 
          class: brainsatplay.plugins.utilities.Scheduler, 
          params:{
            trialTypes: ['Eyes Open', 'Eyes Closed'],
            trialCount: 2,
            duration: 60,
            interTrialInterval: 2,
            allowConsecutive: false,
            start: false
          }},

        {name: 'audioCue', class: brainsatplay.plugins.audio.Audio, params: {file: audioCue}},
        {name: 'data', class: brainsatplay.plugins.utilities.DataManager},
        // {name: 'spacebar', class: brainsatplay.plugins.controls.Event, params: {keycode: 'Space'}},
        // {name: 'results', class: Results},

        // UI
        {name:'ui', class: brainsatplay.plugins.interfaces.DOM, params: {
          html: `<div id="experiment"></div>`,
          style: `
          .brainsatplay-ui-container {
            width: 100%;
            height: 100%;
          }

          #experiment {
            width: 100%;
            height: 100%;

            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;

            display: flex;
            align-items: center;
            justify-content: center;
          }
          `
        }
      },

      {name: 'debug', class: brainsatplay.plugins.debug.Debug},
      ],

      edges: [
        {
          source: 'manager:element', 
          target: 'ui:experiment'
        },


        // Set Up Your Algorithm
        {
          source: 'eeg:atlas', 
          target: 'manager'
        },

        // Schedule an Experiment 
        {
          source: 'scheduler', 
          target: 'manager:schedule'
        },

        // Start Experiment
        {
          source: 'eeg:status', 
          target: 'manager:buttonToggle'
        },
        {
          source: 'manager:start', 
          target: 'scheduler:start'
        },

        // Declare User Commands
        // {
        //   source: 'spacebar', 
        //   target: 'scheduler:update'
        // },
        // {
        //   source: 'spacebar', 
        //   target: 'Test UI:click'
        // },

        // Track State Changes
        {
          source: 'scheduler:state', 
          target: 'manager:state'
        },

        // Audio Cue
        {
          source: 'scheduler:state', 
          target: 'audioCue:toggle'
        },

        {
          source: 'scheduler:done', 
          target: 'audioCue:toggle'
        },

        // Log App Events
        {
          source: 'manager', 
          target: 'data:log'
        },
        // {
        //   source: 'spacebar', 
        //   target: 'data:log'
        // },
        // {
        //   source: 'results:performance', 
        //   target: 'data:log'
        // },
        {
          source: 'scheduler:state', 
          target: 'data:log'
        },

        // Trigger Data Events 
        // {
        //   source: 'scheduler:done', 
        //   target: 'data:get'
        // },
        {
          source: 'scheduler:done', 
          target: 'data:csv'
        },

        {
          source: 'scheduler:done', 
          target: 'manager:done'
        },


        // Show Results
        // {
        //   source: 'scheduler:done', 
        //   target: 'results:show'
        // },
        // {
        //   source: 'results:show', 
        //   target: 'scheduler:reset'
        // },
      ]
    },
}