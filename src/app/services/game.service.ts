import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game, GameStatus } from '../interfaces/game.interface';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:8080/games';

  constructor(private http: HttpClient) { }

  getAllGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl);
  }

  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`);
  }

  createGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game);
  }

  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateGameStatus(id: number, status: GameStatus): Observable<Game> {
    return this.http.patch<Game>(`${this.apiUrl}/${id}/status`, { status });
  }

  getGamesByStatus(status: GameStatus): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.apiUrl}/status/${status}`);
  }
}
