import { Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameFormComponent } from './components/game-form/game-form.component';

export const routes: Routes = [
    { path: '', component: GameListComponent },
    { path: 'new', component: GameFormComponent }
];
