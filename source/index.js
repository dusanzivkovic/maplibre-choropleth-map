import maplibregl from 'maplibre-gl'
import '../assets/main.scss'
import Europe from '../data/gdp.geojson'

const map = new maplibregl.Map({
    container: 'map',
    center: [24.61, 52.64],
    style: `https://api.maptiler.com/maps/bffdf1d7-d710-4ce7-a807-18085a91662d/style.json?key=${process.env.API_KEY}`,
    zoom: 3.7,
})

map.on('load', () => {
    map.addSource('countries', {
        'type': 'geojson',
        'data': Europe
    })
    map.addLayer({
        'id': 'countries-layer',
        'type': 'fill',
        'source': 'countries',
        'paint': {
            'fill-color': [
                'interpolate', ['linear'], ['get', 'GDP'],
                10000,'#feebe2', 20000, '#fcc5c0', 30000, '#fa9fb5', 40000, '#f768a1', 50000, '#c51b8a', 50001, '#7a0177'
            ],
            'fill-opacity': .95,
            'fill-outline-color': 'rgba(255,255,255, 1)'
        }
    })
    map.on('click', 'countries-layer', (e) => {
        new maplibregl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<h3>${e.features[0].properties.NUTS_NAME}</h3><p>GDP: €${e.features[0].properties.GDP}</p>`)
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

