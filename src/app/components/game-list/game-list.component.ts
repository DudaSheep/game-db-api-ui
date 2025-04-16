import { Component, OnInit } from '@angular/core';
import { Game, GameStatus } from '../../interfaces/game.interface';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.css'
})
export class GameListComponent implements OnInit {
  games: Game[] = [];
  filteredGames: Game[] = [];
  selectedStatus: GameStatus | null = null;
  gameStatuses = Object.values(GameStatus);

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.loadGames();
  }

  loadGames(): void {
    this.gameService.getAllGames().subscribe(
      (games: Game[]) => {
        this.games = games;
        this.filteredGames = [...this.games];
      }
    );
  }

  filterGames(): void {
    if (this.selectedStatus) {
      this.filteredGames = this.games.filter(game => game.status === this.selectedStatus);
    } else {
      this.filteredGames = [...this.games];
    }
  }

  updateGameStatus(game: Game): void {
    if (game.id) {
      this.gameService.updateGameStatus(game.id, game.status).subscribe(
        (updatedGame: Game) => {
          const index = this.games.findIndex(g => g.id === updatedGame.id);
          if (index !== -1) {
            this.games[index] = updatedGame;
            this.filterGames();
          }
        }
      );
    }
  }

  deleteGame(id: number): void {
    if (confirm('Tem certeza que deseja excluir este jogo?')) {
      this.gameService.deleteGame(id).subscribe({
        next: () => {
          this.games = this.games.filter(game => game.id !== id);
          this.filteredGames = this.filteredGames.filter(game => game.id !== id);
        },
        error: (error) => {
          console.error('Erro ao excluir o jogo', error);
          alert('Erro ao excluir o jogo. Por favor tente novamente.');
        }
      })
    }
  }
}
