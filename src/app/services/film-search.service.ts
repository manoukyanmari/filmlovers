import {Injectable, OnInit} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class FilmSearchService implements OnInit {

  public ApiUrl = "https://api.themoviedb.org/3/";
  public entityUrl = "search/movie";
  public entityUrlList = "genre/movie/list";
  public token: string = '34a3e2ab5a032c7e4ede7b8c9f36b0af';

  constructor(protected http: Http) {

  }
  ngOnInit():void {
  }

  public getFilm(value: string) {
    return this.http.post(this.ApiUrl + this.entityUrl + '?api_key=' + this.token + '&query=' + value, '')
      .toPromise()
      .then(this.extractData.bind(this))
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getFilmsList() {
    // console.log(this.ApiUrl + this.entityUrlList + '?api_key=' + this.token + '&language=en-US', 'sdsdsdsdsd');return false;
    return this.http.get(this.ApiUrl + this.entityUrlList + '?api_key=' + this.token + '&language=en-US')
      .toPromise()
      .then(this.extractData.bind(this))
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  public getFilmsViaGenre(value: number) {
    return this.http.get(this.ApiUrl + 'genre/' + value + '/movies' + '?api_key=' + this.token)
      .toPromise()
      .then(this.extractData.bind(this))
      .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  protected extractData(res: Response){
    let body = res.json();
    return body || { };
  }
}
