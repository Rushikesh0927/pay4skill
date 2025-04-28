import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Send, Paperclip } from 'lucide-react';

interface Message {
  id: string;
  sender: 'student' | 'employer';
  content: string;
  timestamp: string;
}

interface ChatThread {
  id: string;
  employerName: string;
  employerAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

export default function Chat() {
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [chatThreads, setChatThreads] = useState<ChatThread[]>([
    {
      id: '1',
      employerName: 'Tech Solutions Inc.',
      lastMessage: 'When can you start working on the project?',
      lastMessageTime: '10:30 AM',
      unreadCount: 2,
      messages: [
        {
          id: '1',
          sender: 'employer',
          content: 'Hi, I saw your application for the React project.',
          timestamp: '10:00 AM',
        },
        {
          id: '2',
          sender: 'student',
          content: "Hello! Yes, I'm very interested in the project.",
          timestamp: '10:15 AM',
        },
        {
          id: '3',
          sender: 'employer',
          content: 'When can you start working on the project?',
          timestamp: '10:30 AM',
        },
      ],
    },
    {
      id: '2',
      employerName: 'Design Studio',
      lastMessage: 'Great work on the UI design!',
      lastMessageTime: 'Yesterday',
      unreadCount: 0,
      messages: [
        {
          id: '1',
          sender: 'employer',
          content: 'Great work on the UI design!',
          timestamp: 'Yesterday',
        },
      ],
    },
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedThread) return;

    const updatedThreads = chatThreads.map(thread => {
      if (thread.id === selectedThread) {
        const newMsg: Message = {
          id: Date.now().toString(),
          sender: 'student' as const,
          content: newMessage,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        return {
          ...thread,
          messages: [...thread.messages, newMsg],
          lastMessage: newMessage,
          lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }
      return thread;
    });

    setChatThreads(updatedThreads);
    setNewMessage('');
  };

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: undefined,
  };

  return (
    <DashboardLayout role="student" user={user}>
      <div className="flex h-[calc(100vh-4rem)] gap-4">
        {/* Chat Threads List */}
        <Card className="w-1/3">
          <CardContent className="p-4">
            <div className="space-y-2">
              {chatThreads.map((thread) => (
                <div
                  key={thread.id}
                  className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                    selectedThread === thread.id ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => setSelectedThread(thread.id)}
                >
                  <Avatar>
                    <AvatarImage src={thread.employerAvatar} />
                    <AvatarFallback>{thread.employerName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{thread.employerName}</p>
                      <span className="text-xs text-gray-500">{thread.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{thread.lastMessage}</p>
                  </div>
                  {thread.unreadCount > 0 && (
                    <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {thread.unreadCount}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="flex-1">
          <CardContent className="p-4 h-full flex flex-col">
            {selectedThread ? (
              <>
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {chatThreads
                    .find((thread) => thread.id === selectedThread)
                    ?.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender === 'student' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender === 'student'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100'
                          }`}
                        >
                          <p>{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a conversation to start chatting
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
