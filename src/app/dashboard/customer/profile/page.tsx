'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Camera, Edit, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data. In a real app, this would come from context or an API.
  const [user, setUser] = useState({
    name: 'Beauty Lover',
    email: 'beautylover@example.com',
    phone: '+234 80 1234 5678',
    location: 'Lagos, Nigeria',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser(prev => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically call an API to save the user data
    toast({
      title: 'Profile Updated',
      description: 'Your information has been successfully saved.',
    });
  };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-beauty-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-warmgray-900">My Profile</h1>
          <p className="text-lg text-warmgray-600">View and manage your personal details.</p>
        </div>
        
        <Card className="border-purple-100 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-warmgray-900">Your Information</CardTitle>
              <CardDescription>Keep your personal details up to date.</CardDescription>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)} variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Avatar Section */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 text-2xl">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700">
                    <Camera className="h-4 w-4 text-white" />
                    <span className="sr-only">Change photo</span>
                  </Button>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-warmgray-900">{user.name}</h2>
                <p className="text-warmgray-600">{user.email}</p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-warmgray-700">
                  <User className="h-4 w-4" />
                  Full Name
                </Label>
                <Input 
                  id="name" 
                  value={user.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-warmgray-50 border-purple-200 disabled:opacity-70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-warmgray-700">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input 
                  id="email" 
                  type="email"
                  value={user.email}
                  onChange={handleInputChange}
                  disabled // Typically email is not editable
                  className="bg-warmgray-200 border-purple-200 disabled:opacity-50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-warmgray-700">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input 
                  id="phone" 
                  type="tel"
                  value={user.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-warmgray-50 border-purple-200 disabled:opacity-70"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2 text-warmgray-700">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input 
                  id="location"
                  value={user.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-warmgray-50 border-purple-200 disabled:opacity-70"
                />
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-3">
                <Button onClick={() => setIsEditing(false)} variant="ghost">Cancel</Button>
                <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
