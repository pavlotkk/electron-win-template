import { contextBridge, ipcRenderer } from 'electron';
import { isValidChannel } from '../common/api/channels';


/**
 * IPC bridge
 * ==========
 * Use in renderer script as `window.api.request()`
 * ----------
 * api:
 *  - request: do async request
 *      @channel: Channel - request channel
 *      @data: any (optional) - request data
 *      @callback: function(error: Exception, data: any) (optional) - callback
 *  - listen: api listener
 *      @channel: Channel - request channel
 *      @callback: function(error: Exception, data: any) (optional) - callback
 */
contextBridge.exposeInMainWorld(
  'api', {
      request: (channel, data = null, callback = null) => {
        if(!isValidChannel(channel)){
            console.error(`Invalid request channel '${channel}'`);
            return;
        }

        ipcRenderer.invoke(channel, data).then((...resp) => {
            if(callback){
                callback(null, ...resp);
            }
        })
      },
      listen: (channel, callback) => {
        if(!isValidChannel(channel)){
            console.error(`Invalid listener channel '${channel}'`);
            return;
        }
        ipcRenderer.on(channel, (event, ...args) => {
            callback(null, ...args);
        });
      }
  }
)