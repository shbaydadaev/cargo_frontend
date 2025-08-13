import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private apiKey = ""; // Your API key will be injected by the environment
  private apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${this.apiKey}`;

  constructor(private http: HttpClient) { }

  generateContent(prompt: string, isJson: boolean = false): Observable<any> {
    const payload: any = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    };
    if (isJson) {
      payload.generationConfig = { responseMimeType: "application/json" };
    }

    return this.http.post<any>(this.apiUrl, payload).pipe(
      map(response => {
        if (response.candidates && response.candidates[0].content.parts[0]) {
          const text = response.candidates[0].content.parts[0].text;
          return isJson ? JSON.parse(text) : text;
        }
        throw new Error('Invalid API response');
      }),
      catchError(error => {
        console.error('Gemini API Error:', error);
        return of(isJson ? {} : 'Sorry, something went wrong.');
      })
    );
  }
}