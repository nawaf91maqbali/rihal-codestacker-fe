import { AfterViewInit, Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ'; // For custom tile sources
import { fromLonLat, toLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import { Icon, Style } from 'ol/style';

@Component({
  selector: 'app-add-map',
  imports: [],
  templateUrl: './add-map.component.html',
  styleUrl: './add-map.component.scss'
})
export class AddMapComponent implements OnInit {
  @Output() getLatLong = new EventEmitter<number[]>();
  map: Map = new Map(); // Initialize with a default value
  baseLayer!: TileLayer; // Base layer for light/dark theme
  vectorSource!: VectorSource;
  vectorLayer!: VectorLayer;

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    // Use the provided ArcGIS World Street Map tile source
    const tileLayer = new TileLayer({
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
        attributions: ''
      })
    });

    // Create the map with the tile layer and no controls
    this.map = new Map({
      target: 'add-map',
      layers: [
        tileLayer, // Use the ArcGIS World Street Map tile layer
      ],
      view: new View({
        center: fromLonLat([55.9233, 21.4735]), // Center on Oman
        zoom: 6 // Zoom level to focus on Oman
      }),
      controls: [] // Remove all default controls
    });

    //get Long and Lat when clicking
    if (this.getLatLong) {
      this.map.on('click', (event) => {
        const coordinates = toLonLat(event.coordinate);

        this.getLatLong.emit(coordinates);
        this.setMarkerOnMap(coordinates)
      });
    }
  }

  setMarkerOnMap(coordinates: number[]) {
    if (coordinates[0] > 0 && coordinates[1] > 0) {
      if (!this.vectorLayer) {
        // Create a vector source to hold the markers
        this.vectorSource = new VectorSource();

        // Create a vector layer for the markers
        this.vectorLayer = new VectorLayer({
          source: this.vectorSource
        });

        this.map.addLayer(this.vectorLayer);
      }

      // Clear previous markers (if needed)
      this.vectorSource.clear();

      // Create a new feature (marker)
      const feature = new Feature({
        geometry: new Point(fromLonLat(coordinates)),
      });

      feature.setStyle(new Style({
        image: new Icon({
          //src: 'https://openlayers.org/en/latest/examples/data/icon.png',
          src: '/blue-pin.png',
          scale: 0.5
        })
      }));

      this.vectorSource.addFeature(feature);
    }
  }
}
