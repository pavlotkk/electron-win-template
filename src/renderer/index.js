// require("html-loader!./index.html");

import './index.scss';
import {Channel} from '../common/api/channels';

const timeElement = document.getElementById("time");

setInterval(()=> {
    window.api.request(Channel.GetTime, null, (error, dts) => {
        timeElement.textContent = dts.toLocaleString();
    });
}, 500)

