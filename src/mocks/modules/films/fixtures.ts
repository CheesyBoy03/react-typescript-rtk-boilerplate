import { Film } from 'api/filmsApi';

export const films: Film[] = [
  {
    id: 1,
    title: 'A New Hope',
    episode_id: 4,
    opening_crawl:
      "It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.  During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet.  Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....",
    director: 'George Lucas',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1977-05-25',
    planets: ['Tatooine', 'Alderaan', 'Yavin IV'],
  },
  {
    id: 2,
    title: 'The Empire Strikes Back',
    episode_id: 5,
    opening_crawl:
      'It is a dark time for the Rebellion. Although the Death Star has been destroyed, Imperial troops have driven the Rebel forces from their hidden base and pursued them across the galaxy.  Evading the dreaded Imperial Starfleet, a group of freedom fighters led by Luke Skywalker has established a new secret base on the remote ice world of Hoth.  The evil lord Darth Vader, obsessed with finding young Skywalker, has dispatched thousands of remote probes into the far reaches of space....',
    director: 'Irvin Kershner',
    producer: 'Gary Kurtz, Rick McCallum',
    release_date: '1980-05-17',
    planets: ['Hoth', 'Dagobah', 'Bespin', 'Ord Mantell'],
  },
  {
    id: 3,
    title: 'Return of the Jedi',
    episode_id: 6,
    opening_crawl:
      'Luke Skywalker has returned to his home planet of Tatooine in an attempt to rescue his friend Han Solo from the clutches of the vile gangster Jabba the Hutt.  Little does Luke know that the GALACTIC EMPIRE has secretly begun construction on a new armored space station even more powerful than the first dreaded Death Star.  When completed, this ultimate weapon will spell certain doom for the small band of rebels struggling to restore freedom to the galaxy...',
    director: 'Richard Marquand',
    producer: 'Howard G. Kazanjian, George Lucas, Rick McCallum',
    release_date: '1983-05-25',
    planets: ['Tatooine', 'Dagobah', 'Endor', 'Naboo', 'Coruscant'],
  },
  {
    id: 4,
    title: 'The Phantom Menace',
    episode_id: 1,
    opening_crawl:
      'Turmoil has engulfed the Galactic Republic. The taxation of trade routes to outlying star systems is in dispute.  Hoping to resolve the matter with a blockade of deadly battleships, the greedy Trade Federation has stopped all shipping to the small planet of Naboo.  While the Congress of the Republic endlessly debates this alarming chain of events, the Supreme Chancellor has secretly dispatched two Jedi Knights, the guardians of peace and justice in the galaxy, to settle the conflict....',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '1999-05-19',
    planets: ['Tatooine', 'Naboo', 'Coruscant'],
  },
  {
    id: 5,
    title: 'Attack of the Clones',
    episode_id: 2,
    opening_crawl:
      'There is unrest in the Galactic Senate. Several thousand solar systems have declared their intentions to leave the Republic.  This separatist movement, under the leadership of the mysterious Count Dooku, has made it difficult for the limited number of Jedi Knights to maintain  peace and order in the galaxy.  Senator Amidala, the former Queen of Naboo, is returning to the Galactic Senate to vote on the critical issue of creating an ARMY OF THE REPUBLIC to assist the overwhelmed Jedi....',
    director: 'George Lucas',
    producer: 'Rick McCallum',
    release_date: '2002-05-16',
    planets: ['Tatooine', 'Naboo', 'Coruscant', 'Kamino', 'Geonosis'],
  },
];
