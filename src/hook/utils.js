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

    const hr = ("0" + h).slice(-2)
    const mr = ("0" + m).slice(-2)

    return `${hr}:${mr}`;
}

export function convertWindSpeedKm(ms) {
    return ms * 3.6;
}

export function horarioLocal(dt, timezone) {
    if ( !dt && !timezone) return document.getElementById('horariLocalId').textContent = ''

    const calcularTimeStamp = new Date((dt + timezone) * 1000)

    const horarioFormatado = calcularTimeStamp.toLocaleString('pt-BR', {
        weekday: 'long',   
        year: 'numeric',   
        month: 'long',     
        day: 'numeric',    
        hour: '2-digit',   
        minute: '2-digit', 
        // second: '2-digit', 
        timeZone: 'UTC'  
    })

    return horarioFormatado
}

export async function carregarIcon(iconCode) {
  const res = await fetch(`./src/assets/iconsTemp/${iconCode}.svg`);
  let svg = await res.text();

  const color = iconCode.endsWith('d') ? 'var(--icon-svg-day)' : 'var(--icon-svg-night)';

  svg = svg.replace('<svg', `<svg style="color: ${color}"`);

  return svg
}
