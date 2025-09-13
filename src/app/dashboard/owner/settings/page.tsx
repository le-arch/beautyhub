
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building,
  Bell, 
  Shield, 
  CreditCard, 
  Key,
  Trash2,
  Download,
  Settings as SettingsIcon,
  Loader2,
  Save,
  Mail,
  Phone,
  MapPin,
  Camera,
  Globe,
  Edit,
  Clock,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PasswordInput } from '@/components/password-input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function OwnerSettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [notifications, setNotifications] = useState({
    newBookings: true,
    bookingCancellations: true,
    newMessages: true,
    newReviews: true,
    weeklySummary: false,
    platformUpdates: true,
  });
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

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

  const handleSaveChanges = async (section: string) => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({ title: `${section} Saved!`, description: 'Your changes have been saved.' });
    setSaving(false);
    setIsEditing(false);
  };
  
  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
              <SettingsIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold text-warmgray-900">Settings</h1>
              <p className="text-lg text-warmgray-600">
                Manage your salon account and notification preferences
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
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Salon Profile</span>
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger 
              value="billing"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Plan & Billing</span>
            </TabsTrigger>
            <TabsTrigger 
              value="data"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg"
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Data & Privacy</span>
            </TabsTrigger>
          </TabsList>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-8">
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
                    <Button onClick={() => handleSaveChanges('Profile')} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
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
                      <Button onClick={() => handleSaveChanges('Profile')} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-warmgray-900 flex items-center gap-2">
                  <Key className="h-5 w-5 text-purple-600" />
                  Password & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <PasswordInput
                        id="current-password"
                        autoComplete="current-password"
                        className="bg-warmgray-50 border-purple-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <PasswordInput
                        id="new-password"
                        autoComplete="new-password"
                        className="bg-warmgray-50 border-purple-200"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-8">
             <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-warmgray-900 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-purple-600" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    { key: 'newBookings', label: 'New Bookings', description: 'Notify me when a customer makes a new booking.' },
                    { key: 'bookingCancellations', label: 'Booking Cancellations', description: 'Notify me when a customer cancels a booking.' },
                    { key: 'newMessages', label: 'New Messages', description: 'Get alerts for new messages from customers.' },
                    { key: 'newReviews', label: 'New Reviews', description: 'Notify me when a customer leaves a review.' },
                    { key: 'weeklySummary', label: 'Weekly Summary', description: 'Receive a weekly performance report via email.' },
                    { key: 'platformUpdates', label: 'Platform Updates', description: 'Get emails about new features and updates.' }
                  ].map((item) => (
                    <div key={item.key} className="flex items-start justify-between py-3">
                      <div className="flex-1">
                        <p className="font-medium text-warmgray-900">{item.label}</p>
                        <p className="text-sm text-warmgray-600">{item.description}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) =>
                          setNotifications(prev => ({ ...prev, [item.key]: checked }))
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-6">
                  <Button onClick={() => handleSaveChanges('Notifications')} disabled={saving}>
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Notifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-8">
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-warmgray-900">Current Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <p className="font-semibold text-warmgray-900 text-lg">Premium Plan</p>
                    <p className="text-warmgray-600 mb-4">You have access to all features, including analytics and priority support.</p>
                    <p className="text-2xl font-bold text-purple-700">₦25,000 <span className="text-base font-normal text-warmgray-600">/ month</span></p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">Manage Subscription</Button>
                      <Button variant="ghost" className="text-purple-600 hover:text-purple-700">Switch Plan</Button>
                    </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Monthly Subscription</p>
                      <p className="text-sm text-warmgray-500">Invoice #12346 - Aug 1, 2024</p>
                    </div>
                    <p className="font-semibold text-warmgray-800">₦25,000</p>
                  </div>
                  <Separator/>
                   <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Monthly Subscription</p>
                      <p className="text-sm text-warmgray-500">Invoice #12345 - Jul 1, 2024</p>
                    </div>
                    <p className="font-semibold text-warmgray-800">₦25,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data" className="space-y-8">
             <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-warmgray-900 flex items-center gap-2">
                  <Download className="h-5 w-5 text-purple-600" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-warmgray-700 mb-3">
                    Download your salon data, including booking history, customer messages, and service performance.
                  </p>
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    <Download className="h-4 w-4 mr-2" />
                    Download All Data as CSV
                  </Button>
                </div>
                 <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <h4 className="font-semibold text-red-800">Delete Account & Data</h4>
                  <p className="text-sm text-red-700 my-3">
                    This action is irreversible. It will permanently delete your salon profile, all associated data, and your owner account.
                  </p>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Request Account Deletion
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
