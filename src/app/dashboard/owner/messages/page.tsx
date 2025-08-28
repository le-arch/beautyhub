
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Send,
  Search,
  Archive,
  User,
  Info,
  Calendar,
} from 'lucide-react';

const mockConversations = [
  {
    id: 'convo-1',
    customerName: 'Amina Hassan',
    customerAvatar: 'https://images.unsplash.com/photo-1494790108355-2616b332c647?w=100',
    lastMessage: 'Great, see you then!',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    unreadCount: 0,
    messages: [
       {
        id: 'msg-1',
        sender: 'salon',
        text: 'Your appointment for Knotless Braids is confirmed for tomorrow at 10:00 AM. We look forward to seeing you!',
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        type: 'booking',
        bookingDetails: {
          service: 'Knotless Braids',
          date: 'Tomorrow',
          time: '10:00 AM',
        },
      },
      {
        id: 'msg-2',
        sender: 'user',
        text: 'Great, see you then!',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      },
    ],
  },
  {
    id: 'convo-2',
    customerName: 'Fatou Diallo',
    customerAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100',
    lastMessage: 'Perfect, I will book it now. Thanks!',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    unreadCount: 1,
    messages: [
       {
        id: 'msg-3',
        sender: 'user',
        text: 'Hello, do you have any availability for a hydrating facial this Saturday?',
        timestamp: new Date(Date.now() - 2.2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'msg-4',
        sender: 'salon',
        text: 'Hi Fatou! Yes, we have an opening at 1 PM on Saturday. Would that work for you?',
        timestamp: new Date(Date.now() - 2.1 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'msg-5',
        sender: 'user',
        text: 'Perfect, I will book it now. Thanks!',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      }
    ],
  },
];

export default function OwnerMessagesPage() {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
      id: `msg-${Date.now()}`,
      text: newMessage,
      timestamp: new Date().toISOString(),
      sender: 'salon',
    };

    const updatedConversation = {
      ...selectedConversation,
      messages: [...selectedConversation.messages, message],
      lastMessage: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    setSelectedConversation(updatedConversation);
    
    setConversations(prev =>
      prev.map(convo => (convo.id === updatedConversation.id ? updatedConversation : convo))
    );

    setNewMessage('');
  };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="h-full">
        <Card className="h-full flex flex-col md:flex-row shadow-none border-0 md:border">
          {/* Conversations List */}
          <div className="w-full md:w-1/3 border-b md:border-r">
            <CardHeader className="p-4">
              <CardTitle>Messages</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-10" />
              </div>
            </CardHeader>
            <ScrollArea className="h-[200px] md:h-[calc(100vh-220px)]">
              <CardContent className="p-0">
                {conversations.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map(convo => (
                  <div
                    key={convo.id}
                    className={`p-4 cursor-pointer hover:bg-muted ${selectedConversation.id === convo.id ? 'bg-muted' : ''}`}
                    onClick={() => setSelectedConversation(convo)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={convo.customerAvatar} />
                        <AvatarFallback>{convo.customerName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{convo.customerName}</h3>
                          <p className="text-xs text-muted-foreground">{new Date(convo.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-muted-foreground truncate max-w-[150px]">{convo.lastMessage}</p>
                          {convo.unreadCount > 0 && <Badge className="bg-primary">{convo.unreadCount}</Badge>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </ScrollArea>
          </div>

          {/* Chat Interface */}
          <div className="flex-1 flex flex-col">
            {selectedConversation ? (
              <>
                <CardHeader className="flex flex-row items-center justify-between p-4 border-b">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={selectedConversation.customerAvatar} />
                      <AvatarFallback>{selectedConversation.customerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{selectedConversation.customerName}</h3>
                      <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><User className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon"><Info className="h-5 w-5" /></Button>
                  </div>
                </CardHeader>
                <ScrollArea className="flex-1 p-6 bg-muted/20">
                  <div className="space-y-6">
                    {selectedConversation.messages.map(message => (
                      <div key={message.id} className={`flex gap-3 ${message.sender === 'salon' ? 'justify-end' : ''}`}>
                         {message.sender === 'user' && <Avatar className="h-8 w-8"><AvatarImage src={selectedConversation.customerAvatar} /><AvatarFallback>{selectedConversation.customerName.charAt(0)}</AvatarFallback></Avatar>}
                         <div className={`max-w-xs md:max-w-md ${message.sender === 'salon' ? 'text-right' : ''}`}>
                          {message.type === 'booking' && message.bookingDetails ? (
                            <Card className="bg-background">
                              <CardHeader className="p-3 bg-muted/50 rounded-t-lg">
                                <p className="font-semibold flex items-center gap-2"><Calendar className="h-4 w-4" /> Appointment Confirmed</p>
                              </CardHeader>
                              <CardContent className="p-3 text-left">
                                <p className="font-semibold">{message.bookingDetails.service}</p>
                                <p className="text-sm">{message.bookingDetails.date} at {message.bookingDetails.time}</p>
                                <Separator className="my-2" />
                                <p className="text-xs text-muted-foreground">{message.text}</p>
                              </CardContent>
                            </Card>
                          ) : (
                            <div className={`p-3 rounded-2xl ${message.sender === 'salon' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-background border rounded-bl-none'}`}>
                              <p className="text-sm">{message.text}</p>
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <div className="relative">
                    <Input 
                      placeholder="Type your message..." 
                      className="pr-12"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button 
                      size="icon" 
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={handleSendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-muted-foreground">Select a conversation</h2>
                  <p>Your messages with customers will appear here.</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}
