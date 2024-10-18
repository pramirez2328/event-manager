import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
declare var google: any;

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit, AfterViewInit {
  event: any;
  eventId: string | null | undefined;
  lat!: number;
  lng!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id');

    if (this.eventId) {
      this.event = this.eventService.getEventById(this.eventId);
      if (this.event?.location) {
        this.getPlaceLocation(this.event.location);
      }
    }
  }

  ngAfterViewInit(): void {
    // Wait for the view to initialize and then load the map
    if (this.lat && this.lng) {
      this.loadMap();
    }
  }

  // Fetch latitude and longitude from Google Geocode API
  async getPlaceLocation(address: string): Promise<void> {
    const apiKey = environment.googleApiKey;

    try {
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${apiKey}`;
      const geocodeResponse = await this.http.get<any>(geocodeUrl).toPromise();
      if (
        geocodeResponse.status === 'OK' &&
        geocodeResponse.results.length > 0
      ) {
        const location = geocodeResponse.results[0].geometry.location;
        this.lat = location.lat;
        this.lng = location.lng;

        this.loadMap();
      } else {
        console.error('Geocoding failed:', geocodeResponse.status);
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  }

  // Initialize the Google Map only when the map element is available and coordinates are set
  loadMap(): void {
    // Delay map initialization to give the DOM time to render
    setTimeout(() => {
      const mapDiv = document.getElementById('map');
      if (mapDiv && this.lat && this.lng) {
        const mapOptions = {
          center: { lat: this.lat, lng: this.lng },
          zoom: 15,
        };

        // Create the map instance and set it to the element with id 'map'
        const map = new google.maps.Map(mapDiv as HTMLElement, mapOptions);

        // Add a marker for the event location
        new google.maps.Marker({
          position: { lat: this.lat, lng: this.lng },
          map: map,
          title: 'Event Location',
        });
      } else {
        console.error('Map div not found or coordinates not set.');
      }
    }, 500); // 500ms delay to allow the DOM to render
  }

  // Generate link to Google Maps for the event location
  getGoogleMapsLink(location: string): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      location
    )}`;
  }

  backToEvents() {
    // Navigate back to the events list
    this.router.navigate(['/events/list']);
  }
}
