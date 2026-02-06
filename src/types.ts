export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface WindowData {
  id: string;
  title: string;
  content: React.ReactNode;
  customClass?: string;
  position: Position;
  size: Size;
  minSize: Size;
  zIndex: number;
}

export interface DesktopIconData {
  id: string;
  icon: string;
  title: string;
  position: Position;
}