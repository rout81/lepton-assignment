import { DeckGL, GeoJsonLayer, HeatmapLayer } from "deck.gl";
import ReactMapGL from "react-map-gl";
import locationData from "../../data/location.geo.json";
import type { Feature, Geometry } from "geojson";
import { MapStyles } from "./MapStyles";
import { useEffect, useState } from "react";
import { MapOverlay } from "./MapOverlay";

const mapboxToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const INITIAL_VIEW_STATE = {
	longitude: 77.033442,
	latitude: 28.515621,
	zoom: 13,
	pitch: 0,
	bearing: 0,
};

type BikeRack = {
	ADDRESS: string;
	SPACES: number;
	COORDINATES: [longitude: number, latitude: number];
};

type PropertiesType = {
	id: number;
	ufi: string;
	city: string;
	Locality: string;
};

const heatMapLayer = new HeatmapLayer<BikeRack>({
	id: "heatmapLayer",
	data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json",
	aggregation: "SUM",
	getPosition: (d: BikeRack) => d.COORDINATES,
	getWeight: (d: BikeRack) => d.SPACES,
	radiusPixels: 25,
});

const geoJsonLayer = new GeoJsonLayer<PropertiesType>({
	id: "GeoJsonLayer",
	data: locationData,
	filled: true,
	pointType: "circle+text",
	pickable: true,
	getFillColor: [12, 208, 114, 100],
	getText: (f: Feature<Geometry, PropertiesType>) => f.properties.id,
	getLineWidth: 20,
	getLineColor: [12, 208, 114, 255],
	stroked: true,
	getPointRadius: 4,
	getTextSize: 12,
});
const layerList = [geoJsonLayer, heatMapLayer];

const MapGL = () => {
	const [mapStyle, setMapStyle] = useState(
		"mapbox://styles/mapbox/streets-v12",
	);

	const [layers, setLayers] = useState(layerList);
	const [layerVisibility, setLayerVisibility] = useState([
		{ id: geoJsonLayer.id, show: true },
		{ id: heatMapLayer.id, show: true },
	]);

	useEffect(() => {
		const heatMapLayer = new HeatmapLayer<BikeRack>({
			id: "heatmapLayer",
			data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-bike-parking.json",
			aggregation: "SUM",
			getPosition: (d: BikeRack) => d.COORDINATES,
			getWeight: (d: BikeRack) => d.SPACES,
			radiusPixels: 25,
		});

		const geoJsonLayer = new GeoJsonLayer<PropertiesType>({
			id: "GeoJsonLayer",
			data: locationData,
			filled: true,
			pointType: "circle+text",
			pickable: true,
			getFillColor: [12, 208, 114, 100],
			getText: (f: Feature<Geometry, PropertiesType>) => f.properties.id,
			getLineWidth: 20,
			getLineColor: [12, 208, 114, 255],
			stroked: true,
			getPointRadius: 4,
			getTextSize: 12,
		});
		const newLayerList = [geoJsonLayer, heatMapLayer];
		const filteredLayers = newLayerList.filter(
			(layer) => layerVisibility.find((l) => l.id === layer.id)?.show,
		);
		setLayers(filteredLayers);
	}, [layerVisibility]);

	const toggleVisibility = (layerId: string) => {
		setLayerVisibility((prevLayers) => {
			return prevLayers.map((layer) => {
				if (layer.id === layerId) {
					return {
						...layer,
						show: !layer.show,
					};
				}
				return layer;
			});
		});
	};

	return (
		<div>
			<DeckGL
				initialViewState={INITIAL_VIEW_STATE}
				controller={true}
				layers={layers}
			>
				<ReactMapGL
					style={{ width: "100%", height: "100%" }}
					mapStyle={mapStyle}
					mapboxAccessToken={mapboxToken}
				/>
				<MapStyles setMapStyle={setMapStyle} mapStyle={mapStyle} />
				<MapOverlay
					layerVisibility={layerVisibility}
					toggleVisibility={toggleVisibility}
				/>
			</DeckGL>
		</div>
	);
};

export { MapGL };
