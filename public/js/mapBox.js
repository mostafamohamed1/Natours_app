

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoibW9zdGFmYW1vaGFtZWR4eCIsImEiOiJja3NxZzU2dzYwY245MnF0Zjk3dGk0eHE5In0.w0TgjkKoW-rGGMny8TFL0A';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mostafamohamedxx/cksqj76790lbk18mw1tg6q52l',
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
