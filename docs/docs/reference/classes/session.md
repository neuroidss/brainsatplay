---
id: "session"
title: "Class: Session"
sidebar_label: "Session"
sidebar_position: 0
custom_edit_url: null
---

# Class: Session

```javascript
import {Session} from 'brainsatplay'
```

## Constructors

### constructor

\+ **new Session**(`username?`: *string*, `password?`: *string*, `appname?`: *string*, `access?`: *string*, `remoteHostURL?`: *string*, `localHostURL?`: *string*): [*Session*](session.md)

```javascript
let session = new Session();
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `username` | *string* | '' |
| `password` | *string* | '' |
| `appname` | *string* | '' |
| `access` | *string* | 'public' |
| `remoteHostURL` | *string* | 'http://server.brainsatplay.com' |
| `localHostURL` | *string* | 'http://localhost:8000' |

**Returns:** [*Session*](session.md)

Defined in: [src/Session.js:68](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L68)

## Properties

### atlas

• **atlas**: *DataAtlas*

___

### devices

• **devices**: *any*[]

___

### info

• **info**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `auth` | *object* |
| `auth.access` | *string* |
| `auth.appname` | *string* |
| `auth.authenticated` | *boolean* |
| `auth.password` | *string* |
| `auth.url` | URL |
| `auth.username` | *string* |
| `connections` | *never*[] |
| `localHostURL` | *string* |
| `nDevices` | *number* |
| `remoteHostURL` | *string* |
| `subscribed` | *boolean* |

___

### socket

• **socket**: *undefined* \| ``null`` \| WebSocket

___

### state

• **state**: *StateManager*

___

### streamObj

• **streamObj**: *streamSession*

___

### subscribed

• **subscribed**: *undefined* \| *boolean*

## Methods

### addAnalysisMode

▸ **addAnalysisMode**(`name?`: *string*): *void*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | *string* | '' |

**Returns:** *void*

Defined in: [src/Session.js:357](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L357)

▸ **addAnalysisMode**(`mode?`: *string*, `deviceName?`: *any*, `n?`: *number*): *void*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `mode` | *string* | '' |
| `deviceName` | *any* | - |
| `n` | *number* | 0 |

**Returns:** *void*

Defined in: [src/Session.js:468](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L468)

___

### addAnalyzerFunc

▸ **addAnalyzerFunc**(`prop?`: *any*, `callback?`: () => *void*): *void*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `prop` | *any* | null |
| `callback` | () => *void* | - |

**Returns:** *void*

Defined in: [src/Session.js:483](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L483)

___

### addStreamFunc

▸ **addStreamFunc**(`name`: *any*, `callback`: *any*, `idx?`: *number*): *void*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | *any* | - |
| `callback` | *any* | - |
| `idx` | *number* | 0 |

**Returns:** *void*

Defined in: [src/Session.js:525](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L525)

___

### addStreamParams

▸ **addStreamParams**(`params?`: *any*[]): *void*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `params` | *any*[] | [] |

**Returns:** *void*

Defined in: [src/Session.js:532](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L532)

___

### beginStream

▸ **beginStream**(`streamParams?`: *any*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `streamParams` | *any* |

**Returns:** *void*

Defined in: [src/Session.js:329](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L329)

___

### checkPathname

▸ **checkPathname**(`pathname`: *any*): *any*

#### Parameters

| Name | Type |
| :------ | :------ |
| `pathname` | *any* |

**Returns:** *any*

Defined in: [src/Session.js:1248](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L1248)

___

### checkURL

▸ **checkURL**(`url`: *any*): *any*

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | *any* |

**Returns:** *any*

Defined in: [src/Session.js:1241](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L1241)

___

### closeSocket

▸ **closeSocket**(): *void*

**Returns:** *void*

Defined in: [src/Session.js:1223](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L1223)

___

### configureStreamForGame

▸ **configureStreamForGame**(`deviceTypes?`: *any*[], `streamParams?`: *any*[]): *boolean*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `deviceTypes` | *any*[] | [] |
| `streamParams` | *any*[] | [] |

**Returns:** *boolean*

Defined in: [src/Session.js:1154](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L1154)

___

### connect

▸ **connect**(`device?`: *string*, `analysis?`: *any*, `onconnect?`: *any*, `ondisconnect?`: *any*, `streaming?`: *boolean*, `streamParams?`: *any*, `useFilters?`: *boolean*, `pipeToAtlas?`: *boolean*): *undefined* \| ``false``

**`method`** module:brainsatplay.Session.setLoginInfo

**`description`** Connect local device and add it. Use [reconnect()]{@link module:brainsatplay.Session.reconnect} if disconnecting and reconnecting device in same session.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `device` | *string* | "freeeeg32\_2" | "freeeeg32", "freeeeg32_19", "muse", "notion" |
| `analysis` | *any* | - | "eegfft", "eegcoherence", etc |
| `onconnect` | *any* | - | Callback function on device connection. Subscribe to device outputs after connection completed. |
| `ondisconnect` | *any* | - | Callback function on device disconnection. Unsubscribe from outputs after device is disconnected. |
| `streaming` | *boolean* | false | Set to stream to server (must be connected) |
| `streamParams` | *any* | [] | e.g. [['eegch','FP1','all']] |
| `useFilters` | *boolean* | true | Filter device output if it needs filtering (some hardware already applies filters so we may skip those). |
| `pipeToAtlas` | *boolean* | true | Send data to atlas. |

**Returns:** *undefined* \| ``false``

Defined in: [src/Session.js:154](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L154)

___

### disconnect

▸ **disconnect**(`deviceIdx?`: *any*, `ondisconnect?`: *any*): *void*

**`method`** module:brainsatplay.Session.disconnect

**`description`** Disconnect local device.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceIdx` | *any* | Index of device. |
| `ondisconnect` | *any* | Callback function on device disconnection. |

**Returns:** *void*

Defined in: [src/Session.js:246](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L246)

___

### endStream

▸ **endStream**(): *void*

**Returns:** *void*

Defined in: [src/Session.js:337](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L337)

___

### getApp

▸ **getApp**(): *App*<DefaultFunctionsFactory, any\>

**Returns:** *App*<DefaultFunctionsFactory, any\>

Defined in: [src/Session.js:558](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L558)

___

### getDevice

▸ **getDevice**(`deviceNameOrType?`: *string*, `deviceIdx?`: *number*): *undefined*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `deviceNameOrType` | *string* | 'freeeeg32\_2' |
| `deviceIdx` | *number* | 0 |

**Returns:** *undefined*

Defined in: [src/Session.js:342](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L342)

___

### getDeviceData

▸ **getDeviceData**(`deviceType?`: *string*, `tag?`: *string*, `deviceIdx?`: *number*): *void*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `deviceType` | *string* | 'eeg' |
| `tag` | *string* | 'all' |
| `deviceIdx` | *number* | 0 |

**Returns:** *void*

Defined in: [src/Session.js:390](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L390)

___

### getGames

▸ **getGames**(`appname?`: *string*, `onsuccess?`: (`newResult`: *any*) => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `appname` | *string* |
| `onsuccess` | (`newResult`: *any*) => *void* |

**Returns:** *void*

Defined in: [src/Session.js:812](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L812)

___

### getStreamData

▸ **getStreamData**(`userOrAppname?`: *string*, `propname?`: *any*): *object*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `userOrAppname` | *string* | '' |
| `propname` | *any* | null |

**Returns:** *object*

Defined in: [src/Session.js:403](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L403)

___

### insertMultiplayerIntro

▸ **insertMultiplayerIntro**(`applet`: *any*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `applet` | *any* |

**Returns:** *void*

Defined in: [src/Session.js:898](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L898)

___

### kickPlayerFromGame

▸ **kickPlayerFromGame**(`gameId`: *any*, `userToKick`: *any*, `onsuccess?`: (`newResult`: *any*) => *void*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `gameId` | *any* |
| `userToKick` | *any* |
| `onsuccess` | (`newResult`: *any*) => *void* |

**Returns:** *void*

Defined in: [src/Session.js:1136](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L1136)

___

### login

▸ **login**(`beginStream?`: *boolean*, `dict?`: { `access`: *string* ; `appname`: *string* ; `authenticated`: *boolean* = false; `password`: *string* ; `url`: URL ; `username`: *string*  }, `baseURL?`: *string*): *Promise*<undefined \| WebSocket\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `beginStream` | *boolean* | false |
| `dict` | *object* | - |
| `dict.access` | *string* | - |
| `dict.appname` | *string* | - |
| `dict.authenticated` | *boolean* | false |
| `dict.password` | *string* | - |
| `dict.url` | URL | - |
| `dict.username` | *string* | - |
| `baseURL` | *string* | - |

**Returns:** *Promise*<undefined \| WebSocket\>

Defined in: [src/Session.js:575](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L575)

___

### loginWithGoogle

▸ **loginWithGoogle**(): *Promise*<any\>

**Returns:** *Promise*<any\>

Defined in: [src/Session.js:562](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L562)

___

### loginWithRealm

▸ **loginWithRealm**(`authResponse`: *any*): *Promise*<User<DefaultFunctionsFactory, any, DefaultUserProfileData\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `authResponse` | *any* |

**Returns:** *Promise*<User<DefaultFunctionsFactory, any, DefaultUserProfileData\>\>

Defined in: [src/Session.js:566](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L566)

___

### makeConnectOptions

▸ **makeConnectOptions**(`parentNode?`: HTMLElement, `onconnect?`: *any*, `ondisconnect?`: *any*): *void*

**`method`** module:brainsatplay.Session.makeConnectOptions

**`description`** Generate DOM fragment with a selector for available devices.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parentNode` | HTMLElement | Parent node to insert fragment into. |
| `onconnect` | *any* | Callback function on device connection. |
| `ondisconnect` | *any* | Callback function on device disconnection. |

**Returns:** *void*

Defined in: [src/Session.js:261](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L261)

___

### makeGameBrowser

▸ **makeGameBrowser**(`appname`: *any*, `parentNode`: *any*, `onjoined?`: (`gameInfo`: *any*) => *void*, `onleave?`: (`gameInfo`: *any*) => *void*): ``null`` \| HTMLElement

#### Parameters

| Name | Type |
| :------ | :------ |
| `appname` | *any* |
| `parentNode` | *any* |
| `onjoined` | (`gameInfo`: *any*) => *void* |
| `onleave` | (`gameInfo`: *any*) => *void* |

**Returns:** ``null`` \| HTMLElement

Defined in: [src/Session.js:1099](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L1099)

___

### onconnected

▸ **onconnected**(): *void*

**Returns:** *void*

Defined in: [src/Session.js:222](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L222)

___

### onconnectionLost

▸ **onconnectionLost**(`response`: *any*): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `response` | *any* |

**Returns:** *void*

Defined in: [src/Session.js:1227](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L1227)

___

### ondisconnected

▸ **ondisconnected**(): *void*

**Returns:** *void*

Defined in: [src/Session.js:224](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L224)

___

### processSocketMessage

▸ **processSocketMessage**(`received?`: *string*): *void*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `received` | *string* | '' |

**Returns:** *void*

Defined in: [src/Session.js:649](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L649)

___

### reconnect

▸ **reconnect**(`deviceIdx?`: *any*, `onconnect?`: *any*): *void*

**`method`** module:brainsatplay.Session.reconnect

**`description`** Reconnect a device that has already been added.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `deviceIdx` | *any* | Index of device. |
| `onconnect` | *any* | Callback function on device reconnection. |

**Returns:** *void*

Defined in: [src/Session.js:233](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L233)

___

### request

▸ **request**(`body`: *any*, `method?`: *string*, `pathname?`: *string*, `baseURL?`: *string*): *Promise*<any\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `body` | *any* | - |
| `method` | *string* | "POST" |
| `pathname` | *string* | '' |
| `baseURL` | *string* | - |

**Returns:** *Promise*<any\>

Defined in: [src/Session.js:618](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L618)

___

### sendWSCommand

▸ **sendWSCommand**(`command?`: *string*, `dict?`: {}): *void*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `command` | *string* | '' |
| `dict` | *object* | {} |

**Returns:** *void*

Defined in: [src/Session.js:1213](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L1213)

___

### setLoginInfo

▸ **setLoginInfo**(`username?`: *string*, `password?`: *string*, `access?`: *string*, `appname?`: *string*): *void*

**`method`** module:brainsatplay.Session.setLoginInfo

**`description`** Set user information.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `username` | *string* | '' | Username. |
| `password` | *string* | '' | Password. |
| `access` | *string* | 'public' | Access level ('public' or 'private'). |
| `appname` | *string* | '' | Name of the app. |

**Returns:** *void*

Defined in: [src/Session.js:133](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L133)

___

### setupWebSocket

▸ **setupWebSocket**(`auth?`: { `access`: *string* ; `appname`: *string* ; `authenticated`: *boolean* = false; `password`: *string* ; `url`: URL ; `username`: *string*  }): *undefined* \| WebSocket

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `auth` | *object* | - |
| `auth.access` | *string* | - |
| `auth.appname` | *string* | - |
| `auth.authenticated` | *boolean* | false |
| `auth.password` | *string* | - |
| `auth.url` | URL | - |
| `auth.username` | *string* | - |

**Returns:** *undefined* \| WebSocket

Defined in: [src/Session.js:719](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L719)

___

### signup

▸ **signup**(`dict?`: {}, `baseURL?`: *string*): *Promise*<any\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `dict` | *object* | {} |
| `baseURL` | *string* | - |

**Returns:** *Promise*<any\>

Defined in: [src/Session.js:592](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L592)

___

### stopAnalysis

▸ **stopAnalysis**(`name?`: *string*): *void*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | *string* | '' |

**Returns:** *void*

Defined in: [src/Session.js:374](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L374)

___

### streamAppData

▸ **streamAppData**(`propname?`: *string*, `props?`: {}, `onData?`: (`newData`: *any*) => *void*): *string*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `propname` | *string* | 'data' |
| `props` | *object* | {} |
| `onData` | (`newData`: *any*) => *void* | - |

**Returns:** *string*

Defined in: [src/Session.js:498](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L498)

___

### subscribe

▸ **subscribe**(`deviceName?`: *string*, `tag?`: *string*, `prop?`: *any*, `onData?`: (`newData`: *any*) => *void*): *undefined*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `deviceName` | *string* | 'eeg' |
| `tag` | *string* | 'FP1' |
| `prop` | *any* | null |
| `onData` | (`newData`: *any*) => *void* | - |

**Returns:** *undefined*

Defined in: [src/Session.js:422](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L422)

___

### subscribeToGame

▸ **subscribeToGame**(`gameid?`: *string*, `spectating?`: *boolean*, `userToSubscribe?`: *string*, `onsuccess?`: (`newResult`: *any*) => *void*): *void*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `gameid` | *string* | - |
| `spectating` | *boolean* | false |
| `userToSubscribe` | *string* | - |
| `onsuccess` | (`newResult`: *any*) => *void* | - |

**Returns:** *void*

Defined in: [src/Session.js:837](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L837)

___

### subscribeToUser

▸ **subscribeToUser**(`username?`: *string*, `userProps?`: *any*[], `userToSubscribe?`: *string*, `onsuccess?`: (`newResult`: *any*) => *void*): *void*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `username` | *string* | '' |
| `userProps` | *any*[] | [] |
| `userToSubscribe` | *string* | - |
| `onsuccess` | (`newResult`: *any*) => *void* | - |

**Returns:** *void*

Defined in: [src/Session.js:763](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L763)

___

### unsubscribe

▸ **unsubscribe**(`tag?`: *string*, `sub`: *any*): *void*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tag` | *string* | 'FP1' |
| `sub` | *any* | - |

**Returns:** *void*

Defined in: [src/Session.js:459](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L459)

___

### unsubscribeAll

▸ **unsubscribeAll**(`tag?`: *string*): *void*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `tag` | *string* | 'FP1' |

**Returns:** *void*

Defined in: [src/Session.js:464](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L464)

___

### unsubscribeFromGame

▸ **unsubscribeFromGame**(`gameId?`: *string*, `onsuccess?`: (`newResult`: *any*) => *void*): *void*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `gameId` | *string* | '' |
| `onsuccess` | (`newResult`: *any*) => *void* | - |

**Returns:** *void*

Defined in: [src/Session.js:878](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L878)

___

### unsubscribeFromUser

▸ **unsubscribeFromUser**(`username?`: *string*, `userProps?`: *any*, `userToUnsubscribe?`: *string*, `onsuccess?`: (`newResult`: *any*) => *void*): *void*

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `username` | *string* | '' |
| `userProps` | *any* | null |
| `userToUnsubscribe` | *string* | - |
| `onsuccess` | (`newResult`: *any*) => *void* | - |

**Returns:** *void*

Defined in: [src/Session.js:793](https://github.com/brainsatplay/brainsatplay/blob/a8df662/src/library/src/Session.js#L793)