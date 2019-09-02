import { Component, ViewChild, AfterViewInit, NgZone } from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  lat:number = 17.385044;
  lng:number =  78.486671;
  place: String;
  @ViewChild('placesTextBox',{static:true}) textBox:any;
  
  constructor(public zone:NgZone){}

  ngAfterViewInit(){
    var that = this;
    // Waiting for "google" to initialize
    setTimeout(function(){
      that.getPlaces();
    },1000)
  }

  private getPlaces(){
    const autoComplete = new google.maps.places.Autocomplete(this.textBox.nativeElement,{})
    google.maps.event.addListener(autoComplete,'place_changed',()=>{
      const place= autoComplete.getPlace();
      this.zone.run(() =>{
        this.lat = place.geometry.location.lat();
        this.lng = place.geometry.location.lng();
      })
    })
  }
}
