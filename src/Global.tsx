export const COLORS = {
    0: "#000000", // Black
    1: "#787c7f", // Grey
    2: "#c8b653", // Yellow
    3: "#6ca965", // Green
}

export type validColor = 0 | 1 | 2 | 3;

export interface GameState {
    selectedWord : string;
    finished : boolean;
    win : boolean;
}