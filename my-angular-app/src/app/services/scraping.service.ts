import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define an interface for the data you expect back
export interface ProductData {
  productName: string;
  price: number;
  color: string;
}

@Injectable({
  providedIn: 'root'
})
export class ScrapingService {
  // URL to your backend endpoint (e.g., a serverless function)
  private backendUrl = 'YOUR_BACKEND_ENDPOINT_URL'; 

  constructor(private http: HttpClient) { }

  /**
   * Scrapes product data from a given URL via the backend service.
   * @param productUrl The URL of the product to scrape.
   */
  scrapeProduct(productUrl: string): Observable<ProductData> {
    // The backend expects the URL to be encoded and passed as a query parameter
    const url = `${this.backendUrl}?url=${encodeURIComponent(productUrl)}`;
    return this.http.get<ProductData>(url);
  }
}