export interface Position {
  x: number;
  y: number;
}

export interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
  position: Position;
  zIndex: number;
}