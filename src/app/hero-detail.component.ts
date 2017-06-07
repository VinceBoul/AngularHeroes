import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';
import { HeroService } from './hero.service';
import { Hero } from './hero';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'hero-detail',
  templateUrl: './templates/hero-detail.component.html',
  styleUrls: [ './css/hero-detail.component.css' ]
})

export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;

	constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() : void{
    console.log("Initialisation de HeroDetailComponent");
    
    this.route.params
      .switchMap((params: Params) => this.heroService.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  } 

  save(): void {
    this.heroService.update(this.hero)
      .then(() => this.goBack());
  }
}