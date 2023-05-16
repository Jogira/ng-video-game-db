import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, forkJoin, map } from 'rxjs';
import { environment as env } from 'src/app/environment/environment.prod';
import { APIResponse, Game } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailerRequest = this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenshotsRequests = this.http.get(`${env.BASE_URL}/games/${id}/screenshots`);


    return forkJoin({
      gameInfoRequest,
      // gameScreenshotsRequests,
      // gameTrailerRequest
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          // screenshots: resp['gameScreenshotsRequest']?.results,
          // trailers: resp['gameTrailersRequest']?.results,
        }
      })
    );

    throw new Error('Method not implemented.');
  }


  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }
}
