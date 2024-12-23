'use client';

import { Send, Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';
import { Plus, Users, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const DEMO_USERS: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    status: 'online',
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    status: 'away',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    status: 'offline',
  },
  {
    id: '4',
    name: 'Diana Miller',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    status: 'online',
  },
  {
    id: '5',
    name: 'Edward Wilson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    status: 'online',
  },
];

const DEMO_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Hey everyone! Welcome to the team! 👋',
    senderId: '1',
    timestamp: '2024-03-20T10:00:00Z',
  },
  {
    id: '2',
    content: 'Thanks Alice! Excited to be here!',
    senderId: '2',
    timestamp: '2024-03-20T10:01:00Z',
  },
  {
    id: '3',
    content: 'When is our next team meeting?',
    senderId: '3',
    timestamp: '2024-03-20T10:02:00Z',
  },
  {
    id: '4',
    content: "It's scheduled for tomorrow at 2 PM",
    senderId: '1',
    timestamp: '2024-03-20T10:03:00Z',
  },
];

const DEMO_CHATS: Chat[] = [
  {
    id: '1',
    name: 'Development Team',
    type: 'group',
    lastMessage: 'Next meeting tomorrow at 2 PM',
    timestamp: '2024-03-20T10:03:00Z',
    participants: DEMO_USERS.slice(0, 3),
    messages: DEMO_MESSAGES,
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
  },
  {
    id: '2',
    name: 'Marketing Team',
    type: 'group',
    lastMessage: 'Campaign draft ready for review',
    timestamp: '2024-03-20T09:45:00Z',
    participants: DEMO_USERS.slice(2, 5),
    messages: [],
    avatar: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    type: 'direct',
    lastMessage: 'See you at lunch!',
    timestamp: '2024-03-20T09:30:00Z',
    participants: [DEMO_USERS[0]],
    messages: [],
  },
  {
    id: '4',
    name: 'Bob Smith',
    type: 'direct',
    lastMessage: 'Thanks for the help!',
    timestamp: '2024-03-20T09:15:00Z',
    participants: [DEMO_USERS[1]],
    messages: [],
  },
];

interface ChatListProps {
  selectedChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
}
export interface User {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  name: string;
  type: 'direct' | 'group';
  lastMessage: string;
  timestamp: string;
  participants?: User[];
  messages?: Message[];
  avatar?: string;
}

interface ChatAreaProps {
  selectedChat: Chat | null;
}

function ChatList({ selectedChat, onSelectChat }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  const filteredChats = DEMO_CHATS.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Chat</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={() => setIsCreateGroupOpen(true)}
              >
                <Users className="h-4 w-4" />
                Create Group
              </Button>
              <Button variant="outline" className="justify-start gap-2">
                Start Direct Message
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 pr-4">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className={`w-full rounded-lg p-3 text-left transition-colors hover:bg-accent ${
                selectedChat?.id === chat.id ? 'bg-accent' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                {/* <UserAvatar
                  user={
                    chat.type === 'direct' ? chat.participants?.[0] : undefined
                  }
                  fallback={chat.name.slice(0, 2)}
                  src={chat.avatar}
                /> */}
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{chat.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {/* {new Date(chat.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })} */}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function ChatArea({ selectedChat }: ChatAreaProps) {
  const [message, setMessage] = useState('');

  if (!selectedChat) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border">
        <p className="text-muted-foreground">
          Select a chat to start messaging
        </p>
      </div>
    );
  }

  const getUser = (senderId: string) =>
    DEMO_USERS.find((user) => user.id === senderId);

  return (
    <div className="flex h-full flex-col rounded-lg border">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          {/* <UserAvatar
            user={
              selectedChat.type === 'direct'
                ? selectedChat.participants?.[0]
                : undefined
            }
            fallback={selectedChat.name.slice(0, 2)}
            src={selectedChat.avatar}
          /> */}
          <div>
            <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
            {selectedChat.type === 'group' && (
              <p className="text-sm text-muted-foreground">
                {selectedChat.participants?.length} members
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="icon" variant="ghost">
            <Phone className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <Video className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Leave Chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {selectedChat.messages?.map((message: Message) => {
            const user = getUser(message.senderId);
            const isCurrentUser = message.senderId === '1'; // Demo current user

            return (
              <div
                key={message.id}
                className={`flex items-start gap-2 ${
                  isCurrentUser ? 'flex-row-reverse' : ''
                }`}
              >
                {/* <UserAvatar user={user} /> */}
                <div
                  className={`rounded-lg px-4 py-2 ${
                    isCurrentUser
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-accent'
                  }`}
                >
                  {!isCurrentUser && (
                    <p className="mb-1 text-xs font-medium">{user?.name}</p>
                  )}
                  <p>{message.content}</p>
                  <p className="mt-1 text-xs opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setMessage('');
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function Messaging() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  return (
    <div className="grid h-[calc(100vh-7rem)] gap-6 md:grid-cols-[320px_1fr]">
      <div className="md:block">
        <ChatList onSelectChat={setSelectedChat} selectedChat={selectedChat} />
      </div>
      <ChatArea selectedChat={selectedChat} />
    </div>
  );
}
