function getIconeClima(codigo) {
    if (codigo === 0) return '☀️'
    if (codigo <= 2) return '⛅'
    if (codigo === 3) return '☁️'
    if (codigo <= 67) return '🌧️'
    if (codigo <= 77) return '❄️'
    if (codigo <= 82) return '🌦️'
    return '⛈️'
}

async function buscarClima() {
    const cidade = document.getElementById('cidade').value.trim()
    const resultado = document.getElementById('resultado')

    if (!cidade) {
        resultado.innerHTML = '<p class="erro">Digite o nome de uma cidade.</p>'
        return
    }

    resultado.innerHTML = '<p class="resultado-vazio">Buscando...</p>'

    try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`)
        const geoData = await geoRes.json()

        if (!geoData.results) {
            resultado.innerHTML = '<p class="erro">Cidade não encontrada.</p>'
            return
        }

        const { latitude: lat, longitude: lon, name: nome, country } = geoData.results[0]

        const climaRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        )
        const climaData = await climaRes.json()

        const { temperature: temp, windspeed: vento, weathercode: codigo } = climaData.current_weather
        const icone = getIconeClima(codigo)

        resultado.innerHTML = `
            <div class="clima-info">
                <div class="cidade-nome">${nome}${country ? ', ' + country : ''}</div>
                <div class="clima-icone">${icone}</div>
                <div class="temperatura">${temp}°C</div>
                <div class="detalhes">
                    <div class="detalhe">
                        <div class="valor">💨 ${vento}</div>
                        <div class="label">km/h vento</div>
                    </div>
                    <div class="detalhe">
                        <div class="valor">📍 ${lat.toFixed(1)}°</div>
                        <div class="label">latitude</div>
                    </div>
                </div>
            </div>
        `
    } catch (erro) {
        console.error(erro)
        resultado.innerHTML = '<p class="erro">Erro ao buscar dados do clima.</p>'
    }
}

document.getElementById('cidade').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') buscarClima()
})