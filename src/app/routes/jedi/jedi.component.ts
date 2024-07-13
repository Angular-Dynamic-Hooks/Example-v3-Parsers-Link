import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

/**
 * A routing view that shows details about a Jedi
 */
@Component({
  selector: 'app-jedi',
  templateUrl: './jedi.component.html',
  styleUrls: ['./jedi.component.scss'],
  imports: [RouterLink],
  standalone: true
})
export class JediComponent {
  jedi: any = {
    windu: {
      name: 'Mace Windu',
      picture:
        'https://static.wikia.nocookie.net/starwars/images/2/27/MaceWindu_-WoSW.png',
      description: `
        <p>Mace Windu, a Force-sensitive human male, was a revered Jedi Master and member of the Jedi High Council during the
        last years of the Galactic Republic. During his time in the Jedi Order, he once served as elected leader of the Jedi
        and, during the Clone Wars, as a Jedi General in the Grand Army of the Republic.</p>
        <p>He was the greatest champion of the Jedi Order and promoted its ancient traditions amidst the growing influence of
        the dark side of the Force in the corrupt, declining days of the Republic.</p>
      `,
    },
    kit_fisto: {
      name: 'Kit Fisto',
      picture:
        'https://vignette.wikia.nocookie.net/starwars/images/4/4c/Kit_Fisto_Card_Trader.png',
      description: `
        <p>Kit Fisto was a Nautolan Jedi Master during the last years of the Galactic Republic. He was among the Jedi who fought in
        the First Battle of Geonosis and was one of the few survivors out of the 200 Jedi who fought in the battle.</p>
        <p>While he was at the Jedi Temple, Anakin Skywalker revealed to Mace Windu that Chancellor Palpatine was a Sith Lord. Windu
        took Fisto, alongside Jedi Masters Agen Kolar and Saesee Tiin to Palpatine's office to arrest him. In the following duel,
        after Kolar and Tiin had perished, Fisto was killed by the Chancellor with Windu joining soon later.</p>
      `,
    },
    yoda: {
      name: 'Yoda',
      picture:
        'https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png',
      description: `
      <p>Yoda, a Force-sensitive male being belonging to a mysterious species, was a legendary Jedi Master who witnessed the rise and fall
      of the Galactic Republic, followed by the rise of the Galactic Empire.</p>
      <p>Small in stature but revered for his wisdom and power, Yoda trained generations of Jedi, ultimately serving as the Grand Master
      of the Jedi Order.</p>
      <p>Having lived through nine centuries of galactic history, he played integral roles in the Clone Wars, the rebirth of the Jedi through
      Luke Skywalker, and unlocking the path to immortality.</p>
      `,
    },
  };
  currentJedi: any;

  constructor(route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.currentJedi = this.jedi[params['name']];
    });
  }
}
