export function byId(id) {
    return document.getElementById(id)
}

export function kelvinCelsius(tempDay) {
    return tempDay - 273.15
}

export function visibility(visible) {
    return visible / 1000;
}

export function timeStamp(codigo, timezone) {
    const data = new Date((timezone + codigo) * 1000);

    const h = data.getUTCHours();
    const m = data.getUTCMinutes();

    return `${h}:${m}`;
}

export function convertWindSpeedKm(ms) {
    return ms * 3.6;
}