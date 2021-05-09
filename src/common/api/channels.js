const Channel = {
    GetTime: 'get-time'
}

function isValidChannel(channel){
    if(!channel){
        return false;
    }

    for(const key in Channel){
        if (channel === Channel[key]){
            return true;
        }
    }

    return false;
}


export {Channel, isValidChannel}