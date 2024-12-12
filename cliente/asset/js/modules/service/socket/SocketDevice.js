import SocketDeviceSingleton  from './SocketDeviceSingleton .js';

const SocketDevice = {
    socketDevice: null,
    getInstance: function (url){
        if(!this.socketDevice) {
            this.socketDevice = new SocketDeviceSingleton(url);
        }
        return this.socketDevice;
    }
}

export default SocketDevice;