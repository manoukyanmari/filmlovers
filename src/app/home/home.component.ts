import {
  Component,
  OnInit
} from '@angular/core';

import { AppState } from '../app.service';
import { Title } from './title';
import { XLargeDirective } from './x-large';
import {FilmSearchService} from "../services/film-search.service";
declare var $: any;

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'home'
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Title
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './home.component.css' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  // Set our default values
  public filmName: string;
  public filmDetails: any;
  public filmGenres: any;
  public filmListViaGenre: any[]=[];
  public checkedGenres: any[] = [];
  public films: any[] = [];
  public sameElements: any[] = [];

  constructor(public filmSearchService: FilmSearchService) {

  }
  public ngOnInit() {
    this.filmSearchService.getFilmsList().then((response)=>{
      this.filmGenres = response.genres;
      console.log(this.filmGenres,'sasaasasas');
      return;
    });
  }

  public bringGenreFilms(value: number, isselected: boolean) {

    var indexOfGenre = this.checkedGenres.indexOf(value);
    console.log(value,'asasasxcx');
    console.log(isselected);
    if(isselected && indexOfGenre === -1) {
        this.checkedGenres.push(value);
    }
    if (indexOfGenre > -1 || !isselected) {
      this.checkedGenres.splice(indexOfGenre, 1);
    }
    this.updateFilmGenres();
  }

  public updateFilmGenres() {
    this.filmListViaGenre = [];
    this.checkedGenres.forEach((value)=>{
      this.filmSearchService.getFilmsViaGenre(value).then((response)=>{
        this.filmListViaGenre.push(response.results);
        this.films = Array.prototype.concat.apply([], this.filmListViaGenre);
        var k;
        for (var j = 0; j < response.results.length; j++) {
          // for(var i = 0; i < this.filmListViaGenre.length; i++) {
          //   if (this.filmListViaGenre[i].id == response.results[j].id) {
          //     this.filmListViaGenre.splice(i, 1);
          //   } else {
          //     this.filmListViaGenre.push(response.results[j]);
          //   }
          // }
          var sameElements = [];
          var tooltipsData = this.filmListViaGenre.filter(function (element, index) {
            if(element.id === response.results[j].id){
              sameElements.push(index);
            }
          });
          console.log(sameElements,'dfdfdf');
          // this.filmListViaGenre.filter((element, index) => {
          //   console.log(element.id === response.results[j].id,'sas');
          //   if(element.id === response.results[j].id) {
          //     k = index;
          //     this.filmListViaGenre.splice(k, 1);
          //   }
          //   this.filmListViaGenre.push(response.results[j]);
          //
          // });
        }

        console.log(this.filmListViaGenre);
        console.log(this.films,'dsdsds');
      })
    });
  }

  public searchForFilm(value: string) {
    this.filmName = value;

    this.filmSearchService.getFilm(this.filmName).then((response)=>{
      this.filmDetails = response;
      return;
    })
  }


}
