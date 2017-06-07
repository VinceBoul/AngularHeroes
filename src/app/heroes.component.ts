import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router';

@Component({
  	selector: 'my-heroes',
	templateUrl: './templates/heroes.component.html',
	styleUrls: [ './css/heroes.component.css' ]
})
export class HeroesComponent implements OnInit  { 
	title = 'Tour of Heroes';
	selectedHero: Hero;
	heroes: Hero[];
	providers: [HeroService]

	constructor(
		private heroService: HeroService,
		private router : Router) { }

	ngOnInit(): void {
	    this.getHeroes();
	}

	getHeroes(): void {
    	// old version --> this.heroes = this.heroService.getHeroes();
	//	this.heroService.getHeroes().then(heroes => this.heroes = heroes);
		this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  	}

  	gotoDetail(): void {
	  this.router.navigate(['/detail', this.selectedHero.id]);
	}

	add(name: string): void {
		name = name.trim();
		if (!name) { return; }
		this.heroService.create(name)
		.then(hero => {
		  this.heroes.push(hero);
		  this.selectedHero = null;
		});
	}

	delete(hero: Hero): void {
		this.heroService
		  .delete(hero.id)
		  .then(() => {
		    this.heroes = this.heroes.filter(h => h !== hero);
		    if (this.selectedHero === hero) { this.selectedHero = null; }
		  });
	}



	onSelect(hero: Hero): void {
	  this.selectedHero = hero;
	  console.log(hero.name);
	}
}
