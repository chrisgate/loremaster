import { Application } from '../declarations';
import users from './users/users.service';
import campaigns from './campaigns/campaigns.service';
import players from './players/players.service';
import characters from './characters/characters.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(campaigns);
  app.configure(players);
  app.configure(characters);
}
