import {ipcMain} from 'electron'
import {Channel} from '../common/api/channels'

ipcMain.handle(Channel.GetTime, async (event, arg) => {
    return new Date();
})