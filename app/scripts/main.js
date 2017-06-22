/*jslint browser: true*/
/*global L */

(function (window, document, L, undefined) {
	'use strict';

	/* create leaflet map */
	var map = L.map('map', {
		center: [42.3528, -83.0992],
		zoom: 14
	});

	/* add hash */
	var hash = new L.Hash(map);

	/* add default OSM tile layer */
	new L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		minZoom: 0,
		maxZoom: 18,
		attribution: 'Map data © <a href="http://www.openstreetmap.org">OpenStreetMap contributors</a>'
	}).addTo(map);

	/* add the 2007 overlay */
	var overlay = L.tileLayer('http:////45.55.189.222/tile/{z}/{x}/{y}.png').addTo(map);

	var range = document.getElementById('range');

	function clip() {
		var nw = map.containerPointToLayerPoint([0, 0]),
		se = map.containerPointToLayerPoint(map.getSize()),
		clipX = nw.x + (se.x - nw.x) * range.value;
		overlay.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
	}

	range['oninput' in range ? 'oninput' : 'onchange'] = clip;
	map.on('move', clip);

	clip();
	if (!window.location.hash) {
		map.setView([52.2644,5.2899], 10);
	}
}(window, document, L));