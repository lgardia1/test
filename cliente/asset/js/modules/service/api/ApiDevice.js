import ApiDeviceSingleTon from "./ApiDeviceSingleTon.js"

const ApiDevice = {
    apiDevice: null,
    getInstance: function (url){
        if(!this.apiDevice) {
            this.apiDevice = new ApiDeviceSingleTon(url);
        }
        return this.apiDevice;
    }
}

export default ApiDevice;