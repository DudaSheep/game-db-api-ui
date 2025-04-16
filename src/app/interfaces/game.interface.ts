export enum GameStatus {
    FINISHED = 'FINISHED',
    ONGOING = 'ONGOING',
    ONHOLD = 'ONHOLD'
}

export interface Game {
    id?: number;
    name: string;
    description: string;
    status: GameStatus;
} 