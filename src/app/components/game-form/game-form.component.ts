import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Game, GameStatus } from '../../interfaces/game.interface';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { GameListComponent } from '../game-list/game-list.component';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Use ReactiveFormsModule aqui resolveu problema do html
  templateUrl: './game-form.component.html',
  styleUrl: './game-form.component.css'
})
export class GameFormComponent implements OnInit {
  gameForm: FormGroup;
  gameStatuses = Object.values(GameStatus);

  constructor(
    private fb: FormBuilder,
    private gameService: GameService,
    private router: Router
  ) {
    this.gameForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      status: [GameStatus.ONGOING]
    });
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.gameForm.valid) {
      const game: Game = this.gameForm.value;
      this.gameService.createGame(game).subscribe(
        () => {
          this.router.navigate(['/']);
        }
      );
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
