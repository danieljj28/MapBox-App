import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css',
})
export class MiniMapComponent {

  @Input()
  lngLat?: [number, number];

  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {

    if( !this.divMap?.nativeElement ) throw 'Map div not found';
    if( !this.lngLat ) throw 'LngLat can be null';

    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat,// starting position [lng, lat]
      zoom: 15, // starting zoom
      dragPan: false,
    });

    new Marker()
      .setLngLat( this.lngLat )
      .addTo( map )
  }

}
