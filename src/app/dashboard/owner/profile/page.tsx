
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Building,
  Mail,
  Phone,
  MapPin,
  Camera,
  Globe,
  Edit,
  Save,
  Clock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function SalonProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    name: 'Amber Glow Salon',
    description: 'Welcome to Amber Glow Salon, where we believe in beauty with a passion. Located in the heart of Lagos, we have been serving our community for over 5 years with top-notch beauty services.',
    email: 'contact@amberglow.com',
    phone: '+234 80 1234 5678',
    address: '123 Beauty Lane, Ikeja, Lagos, Nigeria',
    website: 'https://amberglow.com',
    avatar: 'https://placehold.co/100x100.png',
    operatingHours: {
      monday: { from: '09:00', to: '20:00' },
      tuesday: { from: '09:00', to: '20:00' },
      wednesday: { from: '09:00', to: '20:00' },
      thursday: { from: '09:00', to: '21:00' },
      friday: { from: '09:00', to: '21:00' },
      saturday: { from: '08:00', to: '21:00' },
      sunday: { from: '10:00', to: '18:00' },
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setProfile(prev => ({ ...prev, [id]: value }));
  };

  const handleTimeChange = (day: string, field: 'from' | 'to', value: string) => {
    setProfile(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: { ...prev.operatingHours[day as keyof typeof prev.operatingHours], [field]: value }
      }
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your salon information has been successfully saved.',
    });
  };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-warmgray-900">Salon Profile</h1>
          <p className="text-lg text-warmgray-600">Manage your salon's public information.</p>
        </div>
        
        <Card className="border-purple-100 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-warmgray-900">Your Salon Details</CardTitle>
              <CardDescription>Keep your salon's details fresh and accurate.</CardDescription>
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
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 text-2xl">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700">
                    <Camera className="h-4 w-4 text-white" />
                    <span className="sr-only">Change photo</span>
                  </Button>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Salon Name</Label>
                <Input 
                  id="name" 
                  value={profile.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="bg-warmgray-50 border-purple-200 disabled:opacity-70 text-2xl font-bold p-2 h-auto"
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="description">Salon Description</Label>
              <Textarea
                id="description"
                value={profile.description}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="bg-warmgray-50 border-purple-200 disabled:opacity-70 min-h-[100px]"
                placeholder="Tell customers what makes your salon special."
              />
            </div>
            
            <Separator />

            <h3 className="text-lg font-semibold text-warmgray-800">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={profile.address} onChange={handleInputChange} disabled={!isEditing} className="bg-warmgray-50 border-purple-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={profile.phone} onChange={handleInputChange} disabled={!isEditing} className="bg-warmgray-50 border-purple-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Public Email</Label>
                <Input id="email" type="email" value={profile.email} onChange={handleInputChange} disabled={!isEditing} className="bg-warmgray-50 border-purple-200" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" type="url" value={profile.website} onChange={handleInputChange} disabled={!isEditing} className="bg-warmgray-50 border-purple-200" />
              </div>
            </div>
            
            <Separator />
            
            <h3 className="text-lg font-semibold text-warmgray-800">Operating Hours</h3>
             <div className="space-y-4">
              {daysOfWeek.map(day => (
                <div key={day} className="grid grid-cols-3 items-center gap-4">
                  <Label className="capitalize">{day}</Label>
                  <Input 
                    type="time" 
                    value={profile.operatingHours[day as keyof typeof profile.operatingHours].from}
                    onChange={(e) => handleTimeChange(day, 'from', e.target.value)}
                    disabled={!isEditing} 
                    className="bg-warmgray-50 border-purple-200"
                  />
                  <Input 
                    type="time" 
                    value={profile.operatingHours[day as keyof typeof profile.operatingHours].to}
                    onChange={(e) => handleTimeChange(day, 'to', e.target.value)}
                    disabled={!isEditing} 
                    className="bg-warmgray-50 border-purple-200"
                  />
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex justify-end gap-3 pt-4">
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
