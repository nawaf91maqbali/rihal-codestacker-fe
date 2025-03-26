import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ'; // For custom tile sources
import { fromLonLat, toLonLat } from 'ol/proj';
import Feature, { FeatureLike } from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';
import Overlay from 'ol/Overlay';
import { PopupComponent } from '../popup/popup.component';
import { Crime } from '../../../../model/crime';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CrimeType } from '../../../../enums/enums';

@Component({
  selector: 'app-map',
  imports: [PopupComponent, NzButtonModule, NzIconModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})

//map component
export class MapComponent {
  @Output() reportCrime = new EventEmitter<void>();
  @Input() crimesArray: Crime[] = []; //lsit of crime to display on map
  map: Map = new Map(); // Initialize with a default value
  popup!: Overlay; // 
  baseLayer!: TileLayer;
  vectorSource!: VectorSource;
  vectorLayer!: VectorLayer;

  ngOnInit(): void {
    //load initial map
    this.initializeMap();
  }


  //call to initalize map component on the page
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
      target: 'map',
      layers: [
        tileLayer, // Use the ArcGIS World Street Map tile layer
      ],
      view: new View({
        center: fromLonLat([55.9233, 21.4735]), // Center on Oman
        zoom: 6 // Zoom level to focus on Oman
      }),
      controls: [] // Remove all default controls
    });
    this.setMarkers();
  }

  //call the set markers pin on the map
  setMarkers() {
    //add markers on the map
    //check if there's a crimes to load
    if (this.crimesArray.length > 0) {

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

      //loop through the crimes array to get details
      this.crimesArray.forEach(crime => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([crime.longitude, crime.latitude])),
          details: crime.report_details,
          type: crime.crime_type,
          date_time: crime.report_date_time,
          status: crime.report_status
        });
        feature.setStyle(new Style({
          image: new Icon({
            //load pin image each crime type with a specific image/icon
            src: `/${crime.crime_type === CrimeType.Assault ? 'blue-pin'
              : crime.crime_type === CrimeType.Homicide ? 'green-pin'
                : crime.crime_type === CrimeType.Kidnapping ? 'red-pin'
                  : crime.crime_type === CrimeType.Robbery ? 'yellow-pin'
                    : 'pink-pin'}.png`,
            scale: 0.5
          })
        }));

        this.vectorSource.addFeature(feature);
      })


      // Create a popup overlay
      this.popup = new Overlay({
        element: document.getElementById('popup')!, // Ensure you have a div with id="popup" in your template
        autoPan: true
      });
      this.map.addOverlay(this.popup);

      // Add a pointermove event listener to the map
      //display popup when hover
      this.map.on('pointermove', (event) => {
        const feature = this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
          return feature;
        });
        if (feature instanceof Feature) {
          this.setPopupValues(feature, this.popup);
        } else {
          const popupElement = this.popup.getElement();
          if (popupElement) {
            popupElement.classList.remove('visible'); // Hide the popup
          }
          this.popup.setPosition(undefined);
        }

      });

      // Add a click event listener to the map
      //display popup when click
      this.map.on('click', (event) => {
        const feature = this.map.forEachFeatureAtPixel(event.pixel, (feature) => {
          return feature;
        });
        if (feature instanceof Feature) {
          this.setPopupValues(feature, this.popup);
        } else {
          const popupElement = this.popup.getElement();
          if (popupElement) {
            popupElement.classList.remove('visible'); // Hide the popup
          }
          this.popup.setPosition(undefined);
        }
      });

      // Change the cursor style when hovering over a feature
      this.map.on('pointermove', (event) => {
        const hasFeature = this.map.hasFeatureAtPixel(event.pixel);
        this.map.getTargetElement().style.cursor = hasFeature ? 'pointer' : 'default';
      });
    }
  }

  //call to load popup details
  setPopupValues(feature: FeatureLike, popup: Overlay) {
    const details = feature.get('details');
    const type = feature.get('type');
    const date_time = feature.get('date_time');
    const status = feature.get('status');
    const geometry = feature.getGeometry();

    if (geometry instanceof Point) {
      const coordinates = geometry.getCoordinates();

      const popupElement = popup.getElement();
      if (popupElement) {
        var detailsElement = popupElement.querySelector(".details");
        if (detailsElement) {
          detailsElement.innerHTML = details;
        }
        var typeElement = popupElement.querySelector(".type");
        if (typeElement) {
          typeElement.innerHTML = type;
        }
        var dateTimeElement = popupElement.querySelector(".datetime");
        if (dateTimeElement) {
          dateTimeElement.innerHTML = date_time;
        }
        var statusElement = popupElement.querySelector(".status");
        if (statusElement) {
          statusElement.innerHTML = status;
        }
        popupElement.classList.add('visible'); // Show the popup
        popup.setPosition(coordinates);
      }
    }
  }

  //call when need to update pins on the map
  reloadMarkers(updateCrimes: Crime[]) {
    this.crimesArray = updateCrimes;
    this.setMarkers();
  }
}
