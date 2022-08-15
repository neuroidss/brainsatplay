import * as brainsatplay from '../../src/core/src/index'

// JSON Files
// import { appInfo, options } from './demos/signals'
import {appInfo, options} from './demos/phaser'
// import {appInfo, options} from './demos/starter'

const method = 'local'

let app: brainsatplay.App | brainsatplay.editable.App
// ------------------- Method #1: Dynamic Import (package.json) -------------------
// NOTE: Only works when all files are served to the browser

if (method === 'remote') {
    // const local = 'app'
    const remote = 'https://raw.githubusercontent.com/brainsatplay/brainsatplay-starter-kit/main'
    app = new brainsatplay.editable.App(remote)
    // app = new brainsatplay.editable.App(local)
    // app = new brainsatplay.editable.App() // select from filesystem
}

// ------------------- Method #2: Direct Import (index.js) -------------------
else {
    // app = new brainsatplay.editable.App(appInfo)
    app = new brainsatplay.App(appInfo, options)    
}

app.start().then(() => console.log(app))