import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css',
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{

  @ViewChild('map')
  public divMap?: ElementRef;

  public currentZoom = 10;
  public map?: Map;
  public currentlngLat: LngLat = new LngLat(-3.681576042308336, 40.403682938819145)

  ngAfterViewInit(): void {

    if( !this.divMap ) throw 'El elemento html no fue encontrado';

    console.log(this.divMap);

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentlngLat,// starting position [lng, lat]
      zoom: this.currentZoom, // starting zoom
    });
    this.mapListener();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListener(): void {

    if( !this.map ) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev) => {
      this.currentZoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if( this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentlngLat = this.map!.getCenter();
    })
  }

  btnZoomIn(): void {
    this.map?.zoomIn();
  }

  btnZoomOut(): void {
    this.map?.zoomOut();
  }

  zoomChanged( value: string ): void {
    this.currentZoom = Number(value);
    this.map?.zoomTo(this.currentZoom);
  }
}
