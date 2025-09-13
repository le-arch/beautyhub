
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Settings as SettingsIcon,
  Loader2,
  Save,
  Sun,
  Moon,
  Trash2,
  Download,
  Mail,
  Phone,
  MapPin,
  Camera,
  Edit
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { UserSettings, Profile as ProfileType } from '@/lib/types';
import { mockUserSettings, mockUser, mockProfile } from '@/lib/mock-data';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<ProfileType>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [settings, setSettings] = useState<UserSettings>(mockUserSettings);
  const [saving, setSaving] = useState(false);
  const user = mockUser;

  const handleProfileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile(prev => ({
      ...prev!,
      [id]: value,
    }));
  };

  const handleSettingsChange = (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...(prev.notifications as object || {}),
        [key]: value
      }
    }));
  };

  useEffect(() => {
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  const handleSaveChanges = async (section: string) => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: `${section.charAt(0).toUpperCase() + section.slice(1)} Saved!`, description: 'Your changes have been saved.' });
    setSaving(false);
    if(section === 'Account') {
      setIsEditing(false);
    }
  };
  
  if (!user || !profile) {
    return <div>Loading...</div>
  }

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-beauty-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
              <SettingsIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-warmgray-900">Settings</h1>
              <p className="text-lg text-warmgray-600">
                Manage your account and customize your BeautyHub experience
              </p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 bg-white p-2 rounded-xl border border-purple-100 h-auto">
             <TabsTrigger 
              value="account" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
            </TabsTrigger>
            <TabsTrigger 
              value="preferences"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg"
            >
              <SettingsIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger 
              value="privacy"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger 
              value="billing"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account">
              <Card className="border-purple-100 shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-warmgray-900">Your Information</CardTitle>
                    <CardDescription>Keep your personal details up to date.</CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      className="border-purple-200 text-purple-600 hover:bg-purple-50"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleSaveChanges('Account')}
                      disabled={saving}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    >
                      {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-8 pt-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                        <AvatarImage
                          src={profile.avatar_url || ''}
                          alt={profile.full_name || ''}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 text-2xl">
                          {profile.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() ||
                            user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <Button
                          size="icon"
                          className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-purple-600 hover:bg-purple-700"
                        >
                          <Camera className="h-4 w-4 text-white" />
                          <span className="sr-only">Change photo</span>
                        </Button>
                      )}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-warmgray-900">
                        {profile.full_name || 'New User'}
                      </h2>
                      <p className="text-warmgray-600">{user.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="flex items-center gap-2 text-warmgray-700">
                        <User className="h-4 w-4" />
                        Full Name
                      </Label>
                      <Input
                        id="full_name"
                        value={profile.full_name || ''}
                        onChange={handleProfileInputChange}
                        disabled={!isEditing || saving}
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
                        value={user.email || ''}
                        disabled
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
                        value={profile.phone || ''}
                        onChange={handleProfileInputChange}
                        disabled={!isEditing || saving}
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
                        value={profile.location || ''}
                        onChange={handleProfileInputChange}
                        disabled={!isEditing || saving}
                        className="bg-warmgray-50 border-purple-200 disabled:opacity-70"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-8">
            <Card className="border-purple-100">
              <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                      { key: 'booking_updates', label: 'Booking Updates', description: 'When bookings are confirmed or changed.' },
                      { key: 'new_messages', label: 'New Messages', description: 'When you receive a new message from a salon.' },
                      { key: 'promotions', label: 'Promotions', description: 'Special offers from salons.' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-start justify-between py-3">
                      <div className="flex-1">
                        <p className="font-medium text-warmgray-900">{item.label}</p>
                        <p className="text-sm text-warmgray-600">{item.description}</p>
                      </div>
                      <Switch
                        checked={(settings.notifications as any)?.[item.key] ?? false}
                        onCheckedChange={(checked) => handleNotificationChange(item.key, checked)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-purple-100">
              <CardHeader><CardTitle>App Preferences</CardTitle></CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="font-medium text-warmgray-900">Theme</label>
                    <div className="flex gap-3">
                      <Button variant={settings.theme === 'light' ? 'default' : 'outline'} size="sm" onClick={() => handleSettingsChange('theme', 'light')}>
                        <Sun className="h-4 w-4 mr-2" /> Light
                      </Button>
                      <Button variant={settings.theme === 'dark' ? 'default' : 'outline'} size="sm" onClick={() => handleSettingsChange('theme', 'dark')}>
                        <Moon className="h-4 w-4 mr-2" /> Dark
                      </Button>
                    </div>
                </div>
                <div className="space-y-2">
                  <label className="font-medium text-warmgray-900">Language</label>
                  <select value={settings.language || 'en'} onChange={(e) => handleSettingsChange('language', e.target.value)} className="w-full px-3 py-2 bg-warmgray-50 border border-purple-200 rounded-md text-sm">
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => handleSaveChanges('Preferences')} disabled={saving}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Preferences
              </Button>
            </div>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-8">
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control how your information is used and seen by others.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start justify-between py-3">
                  <div>
                    <p className="font-medium text-warmgray-900">Public Profile</p>
                    <p className="text-sm text-warmgray-600">Allow salons to see your name and profile picture when you book.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-start justify-between py-3">
                  <div>
                    <p className="font-medium text-warmgray-900">Data Sharing</p>
                    <p className="text-sm text-warmgray-600">Allow BeautyHub to use your anonymized data for analytics.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                 <Separator />
                <div className="space-y-3">
                  <p className="font-medium text-warmgray-900">Manage Your Data</p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                      <Download className="h-4 w-4 mr-2" /> Download My Data
                    </Button>
                     <Button variant="destructive">
                      <Trash2 className="h-4 w-4 mr-2" /> Delete My Account
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardHeader className="border-t pt-6">
                <Button onClick={() => handleSaveChanges('Privacy settings')} disabled={saving}>
                  {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Privacy Settings
                </Button>
              </CardHeader>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-8">
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your saved cards for quick and easy checkout.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg flex items-center justify-between bg-purple-50">
                    <div className="flex items-center gap-4">
                      <CreditCard className="h-8 w-8 text-purple-600" />
                      <div>
                        <p className="font-medium">Visa ending in 1234</p>
                        <p className="text-sm text-warmgray-500">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">Remove</Button>
                  </div>
                  <Button variant="outline" className="w-full border-purple-200 text-purple-600 hover:bg-purple-50">
                    Add New Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>A record of your deposits and payments on BeautyHub.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Deposit for Amber Glow Salon</p>
                      <p className="text-sm text-warmgray-500">Aug 13, 2024</p>
                    </div>
                    <p className="font-semibold text-warmgray-800">- ₦3,000</p>
                  </div>
                   <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Deposit for Nairobi Nail Bar</p>
                      <p className="text-sm text-warmgray-500">Jul 28, 2024</p>
                    </div>
                    <p className="font-semibold text-warmgray-800">- ₦1,500</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
