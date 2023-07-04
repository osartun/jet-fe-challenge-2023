type RoomType = "cpu" | "human";

interface Room {
  id: string;
  name: string;
  owner: string;
  type: RoomType;
}
