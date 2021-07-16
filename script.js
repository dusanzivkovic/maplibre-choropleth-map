const map = new maplibregl.Map({
    container: 'map',
    center: [21.69, 50.32],
    style: 'https://api.maptiler.com/maps/bffdf1d7-d710-4ce7-a807-18085a91662d/style.json?key=FUWC63pC4JOppUGhyT5X',
    zoom: 4,
})

map.on('load', () => {
    map.addSource('states', {
        'type': 'geojson',
        'data': 'Europe.geojson'
    })
    map.addLayer({
        'id': 'countries-layer',
        'type': 'fill',
        'source': 'states',
        'paint': {
            'fill-color': [
                'interpolate', ['exponential', 0], ['get', 'GDP_per_capita'],
                10000,'#feedde', 20000, '#fdd0a2', 30000, '#fdae6b', 40000, '#fd8d3c', 50000, '#e6550d', 50001, '#a63603'
            ],
            'fill-opacity': .95,
            'fill-outline-color': 'rgba(0, 0, 0, 1)'
        }
    })
    map.on('click', 'countries-layer', (e) => {
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<h3>${e.features[0].properties.SOVEREIGNT}</h3><p>${e.features[0].properties.GDP_per_capita}</p>`)
            .addTo(map)
    })
    map.on('mouseenter', 'countries-layer',  () => {
        map.getCanvas().style.cursor = 'pointer'
    })  
    map.on('mouseleave', 'countries-layer',  () => {
    map.getCanvas().style.cursor = ''
    })
})

map.addControl(new maplibregl.NavigationControl());