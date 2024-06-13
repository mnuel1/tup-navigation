import React, { createContext, useState, ReactNode, FC } from 'react';

interface RoomContextProps {
  roomLabel: string;
  setRoomLabel: (label: string) => void;
  roomName: string;
  setRoomName: (name: string) => void;
  roomFloor: number;
  setRoomFloor: (floor: number) => void;
}

const RoomContext = createContext<RoomContextProps | undefined>(undefined);

const RoomProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [roomLabel, setRoomLabel] = useState<string>('');
  const [roomName, setRoomName] = useState<string>('');
  const [roomFloor, setRoomFloor] = useState<number>(1);

  return (
    <RoomContext.Provider
      value={{ roomLabel, setRoomLabel, roomName, setRoomName, roomFloor, setRoomFloor }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export { RoomProvider, RoomContext };
