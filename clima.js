async function buscarClima() {
    const cidade = document.getElementById('cidade').value;

    try {
        // 1️⃣ Converter cidade em latitude e longitude
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cidade}&count=1&language=pt&format=json`);
        const geoData = await geoRes.json();

        if (!geoData.results) {
            document.getElementById('resultado').innerText = 'Cidade não encontrada';
            return;
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        const nome = geoData.results[0].name;

        // 2️⃣ Buscar clima
        const climaRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );

        const climaData = await climaRes.json();

        const temp = climaData.current_weather.temperature;
        const vento = climaData.current_weather.windspeed;

        // 3️⃣ Mostrar na tela
        document.getElementById('resultado').innerHTML = `
            <h2>${nome}</h2>
            <p>🌡️ Temperatura: ${temp}°C</p>
            <p>💨 Vento: ${vento} km/h</p>
        `;

    } catch (erro) {
        document.getElementById('resultado').innerText = 'Erro ao buscar dados';
        console.error(erro);
    }
}