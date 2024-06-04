import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor{
  color: string,
  marker: Marker,
}

interface PlainMarker {
  color: string,
  lnglat: number[],
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl:  './markers-page.component.css',
})
export class MarkersPageComponent implements AfterViewInit{


  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;
  public currentlngLat: LngLat = new LngLat(-3.681576042308336, 40.403682938819145);

  public markers: MarkerAndColor[] = [];

  ngAfterViewInit(): void {

    if( !this.divMap ) throw 'El elemento html no fue encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentlngLat,// starting position [lng, lat]
      zoom: 10, // starting zoom
    });

    this.readFromLocalStorage();

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Daniel Jaen';

    // const marker = new Marker({
    //   element: markerHtml,
    // })
    // .setLngLat( this.currentlngLat )
    // .addTo( this.map )
  }

  createMarker(): void {

    if( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker( lngLat: LngLat, color: string): void {

    if( !this.map ) return;


    const marker = new Marker({
      color: color,
      draggable: true
    })
    .setLngLat(lngLat)
    .addTo(this.map);

    this.markers.push({color, marker});
    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    })

  }

  private saveToLocalStorage(){

    const plainMarkers: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return{
        color,
        lnglat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarkers ));

  }


  private readFromLocalStorage(){
    if( !localStorage.getItem('plainMarkers') ) return;
    if( !this.map ) return;

    const plainMarkers: PlainMarker[] = JSON.parse ( localStorage.getItem('plainMarkers')! );

    plainMarkers.forEach( ({color, lnglat}) => {
      const [lng, lat] = lnglat;
      const coords: LngLat = new LngLat(lng, lat);

      // const marker = new Marker({
      //   color: color,
      //   draggable: true
      // })
      // .setLngLat(coords)
      // .addTo(this.map!);

      // this.markers.push({color, marker});
      this.addMarker(coords, color);
    })

  }

  deleteMarker(index: number): void{
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
    this.saveToLocalStorage();
  }

  flyTo( marker: Marker ): void{
    this.map?.flyTo({
      zoom:14,
      center: marker.getLngLat(),

    })
  }

}
