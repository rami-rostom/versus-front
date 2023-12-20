export type NewEventState = {
  title: string;
  title_slug: string;
  start_date: string;
  end_date: string;
  isLoading: boolean;
  error: string | null;
};

export type NewEvent = {
  title: string;
  start_date: string;
  end_date: string;
  user_id: number;
};

// the ? are temporary
export type Event = {
  id: number;
  title: string;
  title_slug?: string;
  start_date?: string | Date;
  end_date?: string | Date;
  banner?: string;
  thumbnail?: string;
  location?: string;
  status?: string;
  description?: string;
  rules?: string;
  contact?: string;
  type_event?: string;
  type_event_id?: number;
  game?: {
    id: null | number;
    name: string;
    thumbnail: null | string;
    createdAt: null | string;
    updatedAt: null | string;
  };
  game_id?: number;
  platform?: {
    id: null | number;
    name: string;
    createdAt: string;
    updatedAt: null | string;
  };
  platform_id?: number;
  user_id?: number;
  participants: [
    {
      id: number;
      username: string;
      username_slug: string;
      email: string;
      password: string;
      avatar: null | string;
      createdAt: string;
      updatedAt: null | string;
      role_id: number;
      event_has_user: {
        createdAt: string;
        event_id: number;
        user_id: number;
      };
    }
  ];
};

export type EventState = {
  event: Event;
  isLoading: boolean;
  modified: boolean;
  error: string | null;
};

export type EventsState = {
  events: Event[];
  isLoading: boolean;
  modified: boolean;
  error: string | null;
};

export type UserEventsState = {
  events: Event[];
  error: null | string;
  isLoading: boolean;
};
