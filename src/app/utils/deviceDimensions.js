
export function getDeviceInfo() {
    const WIDTH = window.innerWidth;
    const HEIGHT = window.innerHeight;

    const effectiveWidth = WIDTH < HEIGHT ? WIDTH : HEIGHT; //considering potrait and landscape mode

    let device = {};
    device.width = WIDTH;
    device.height = HEIGHT;
    device.orientation = ""; //will be set while calling deviceInit.
    device.highestDimension = WIDTH > HEIGHT ? WIDTH : HEIGHT;
    device.lowestDimension = effectiveWidth;
    return device;
}
