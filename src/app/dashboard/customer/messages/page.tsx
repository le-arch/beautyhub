
'use client';

import { useState, useEffect, useRef } from 'react';
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
  Phone,
  Video,
  Info,
  Calendar,
  CheckCircle,
  Paperclip,
  Mic
} from 'lucide-react';
import { mockConversations } from '@/lib/mock-data';
import type { Conversation, Message } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';


const ConversationTimestamp = ({ timestamp }: { timestamp: string }) => {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    setFormattedTime(
      new Date(timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }, [timestamp]);

  return <p className="text-xs text-muted-foreground">{formattedTime}</p>;
};

export default function MessagesPage() {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      text: newMessage,
      timestamp: new Date().toISOString(),
      sender: 'user',
    };

    const updatedConversation: Conversation = {
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
  
  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: 'File Selected',
        description: `${file.name} is ready to be sent.`,
      });
      // In a real app, you'd handle the file upload here.
    }
  };
  
  const handleVoiceNote = () => {
     toast({
        title: 'Voice Note',
        description: `Voice recording feature is not yet implemented.`,
      });
  }

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
                        <AvatarImage src={convo.salonAvatar} />
                        <AvatarFallback>{convo.salonName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{convo.salonName}</h3>
                          <ConversationTimestamp timestamp={convo.timestamp} />
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
                      <AvatarImage src={selectedConversation.salonAvatar} />
                      <AvatarFallback>{selectedConversation.salonName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{selectedConversation.salonName}</h3>
                      <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
                    <Button variant="ghost" size="icon"><Info className="h-5 w-5" /></Button>
                  </div>
                </CardHeader>
                <ScrollArea className="flex-1 p-6 bg-muted/20">
                  <div className="space-y-6">
                    {selectedConversation.messages.map(message => (
                      <div key={message.id} className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                         {message.sender === 'salon' && <Avatar className="h-8 w-8"><AvatarImage src={selectedConversation.salonAvatar} /><AvatarFallback>{selectedConversation.salonName.charAt(0)}</AvatarFallback></Avatar>}
                         <div className={`max-w-xs md:max-w-md ${message.sender === 'user' ? 'text-right' : ''}`}>
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
                            <div className={`p-3 rounded-2xl ${message.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-background border rounded-bl-none'}`}>
                              <p className="text-sm">{message.text}</p>
                            </div>
                          )}
                           <ConversationTimestamp timestamp={message.timestamp} />
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t bg-background">
                  <div className="relative flex items-center gap-2">
                    <Input 
                      placeholder="Type your message..." 
                      className="pr-12"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <div className="flex items-center">
                       <Button variant="ghost" size="icon" onClick={handleAttachmentClick}>
                        <Paperclip className="h-5 w-5 text-muted-foreground" />
                      </Button>
                      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
                      <Button variant="ghost" size="icon" onClick={handleVoiceNote}>
                        <Mic className="h-5 w-5 text-muted-foreground" />
                      </Button>
                      <Button 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={handleSendMessage}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-muted-foreground">Select a conversation</h2>
                  <p>Your messages with salons will appear here.</p>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}
