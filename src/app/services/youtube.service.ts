import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class YoutubeService {

  private youtubeUrl:string = 'https://www.googleapis.com/youtube/v3';
  private apikey:string = 'AIzaSyAV25eY3dz3NoADib5uI6aAa4Xo3IAKZEs';
  private playlist:string = 'UUziL_aQ4Mz2EPMeuDwxVQQg';
  private nextPageToken:string = '';

  constructor(public http:Http) { }

  getVideos(){

    let url = `${this.youtubeUrl}/playlistItems`;
    let params = new URLSearchParams();

    params.set('part', 'snippet');
    params.set('maxResults', '3');
    params.set('playlistId', this.playlist);
    params.set('key', this.apikey);

    if(this.nextPageToken){
      params.set('pageToken', this.nextPageToken);
    }

    return this.http.get(url, { search: params })
              .pipe(map(res=>{
                console.log(res.json());
                this.nextPageToken = res.json().nextPageToken;
                
                let videos:any[] = [];
                for( let video of res.json().items ){
                  let snippet = video.snippet;
                  videos.push(snippet);
                }
                return videos;
              }));

  }

}
