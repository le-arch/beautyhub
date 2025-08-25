'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Moon, 
  Sun, 
  Camera, 
  Key,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Heart,
  MessageCircle,
  Calendar,
  Star,
  Settings as SettingsIcon
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    bookingConfirmations: true,
    promotions: true,
    newMessages: true,
    favoriteUpdates: false,
    locationServices: true,
    emailMarketing: false
  });
  
  const [preferences, setPreferences] = useState({
    theme: 'light',
    language: 'en',
    currency: 'NGN',
    distanceUnit: 'km',
    autoLocation: true,
    showProfile: true,
    allowMessages: true
  });
  
  const user = {
    name: 'Beauty Lover',
    email: 'beautylover@example.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    phone: '+234 80 1234 5678',
    location: 'Lagos, Nigeria'
  }
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return (
      <main className="flex-1 p-8 bg-gradient-beauty-secondary pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-32">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <SettingsIcon className="h-12 w-12 text-purple-600" />
            </div>
            <h1 className="text-3xl font-semibold text-warmgray-900 mb-4">
              Sign in to access settings
            </h1>
            <p className="text-lg text-warmgray-600 mb-8 max-w-md mx-auto">
              Create an account to customize your BeautyHub experience.
            </p>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
              asChild
            >
              <Link href="/">Get Started</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8 bg-gradient-beauty-secondary pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
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
              <Bell className="h-4 w-4" />
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
          <TabsContent value="account" className="space-y-8">
            {/* Profile Information */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-warmgray-900 flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-600" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700 text-xl">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-warmgray-500">
                      JPG, PNG or GIF. Max size 2MB.
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      defaultValue={user.name}
                      className="bg-warmgray-50 border-purple-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email"
                      defaultValue={user.email}
                      className="bg-warmgray-50 border-purple-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      defaultValue={user.phone}
                      className="bg-warmgray-50 border-purple-200"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location"
                      defaultValue={user.location}
                      className="bg-warmgray-50 border-purple-200"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Password & Security */}
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
                    <div className="relative">
                      <Input 
                        id="current-password" 
                        type={showCurrentPassword ? "text" : "password"}
                        className="bg-warmgray-50 border-purple-200 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-warmgray-500"
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <div className="relative">
                      <Input 
                        id="new-password" 
                        type={showNewPassword ? "text" : "password"}
                        className="bg-warmgray-50 border-purple-200 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-warmgray-500"
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start">
                  <div>
                    <p className="text-sm text-warmgray-600 mb-2">
                      Password strength: <span className="text-green-600 font-medium">Strong</span>
                    </p>
                    <p className="text-xs text-warmgray-500">
                      Your password should be at least 8 characters long and include numbers, letters, and symbols.
                    </p>
                  </div>
                  
                  <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-8">
            {/* Notification Settings */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-warmgray-900 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-purple-600" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    { key: 'bookingConfirmations', label: 'Booking Confirmations', description: 'Get notified when your bookings are confirmed or updated' },
                    { key: 'newMessages', label: 'New Messages', description: 'Receive alerts when salons send you messages' },
                    { key: 'favoriteUpdates', label: 'Favorite Salon Updates', description: 'Get notified about new services and promotions from your favorite salons' },
                    { key: 'promotions', label: 'Promotions & Deals', description: 'Receive special offers and promotions from salons near you' },
                    { key: 'locationServices', label: 'Location-based Suggestions', description: 'Get salon recommendations based on your location' },
                    { key: 'emailMarketing', label: 'Email Marketing', description: 'Receive beauty tips, trends, and newsletter updates' }
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
              </CardContent>
            </Card>

            {/* App Preferences */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-warmgray-900 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-600" />
                  App Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <div className="flex gap-3">
                      <Button
                        variant={preferences.theme === 'light' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreferences(prev => ({ ...prev, theme: 'light' }))}
                        className={preferences.theme === 'light' 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                          : 'border-purple-200 text-purple-600 hover:bg-purple-50'
                        }
                      >
                        <Sun className="h-4 w-4 mr-2" />
                        Light
                      </Button>
                      <Button
                        variant={preferences.theme === 'dark' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPreferences(prev => ({ ...prev, theme: 'dark' }))}
                        className={preferences.theme === 'dark' 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                          : 'border-purple-200 text-purple-600 hover:bg-purple-50'
                        }
                      >
                        <Moon className="h-4 w-4 mr-2" />
                        Dark
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <select 
                      className="w-full px-3 py-2 bg-warmgray-50 border border-purple-200 rounded-md text-sm"
                      value={preferences.language}
                      onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
                    >
                      <option value="en">English</option>
                      <option value="fr">Français</option>
                      <option value="ar">العربية</option>
                      <option value="sw">Kiswahili</option>
                      <option value="ha">Hausa</option>
                      <option value="yo">Yoruba</option>
                      <option value="ig">Igbo</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <select 
                      className="w-full px-3 py-2 bg-warmgray-50 border border-purple-200 rounded-md text-sm"
                      value={preferences.currency}
                      onChange={(e) => setPreferences(prev => ({ ...prev, currency: e.target.value }))}
                    >
                      <option value="NGN">Nigerian Naira (₦)</option>
                      <option value="GHS">Ghanaian Cedi (₵)</option>
                      <option value="KES">Kenyan Shilling (KSh)</option>
                      <option value="USD">US Dollar ($)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="GBP">British Pound (£)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Distance Unit</Label>
                    <select 
                      className="w-full px-3 py-2 bg-warmgray-50 border border-purple-200 rounded-md text-sm"
                      value={preferences.distanceUnit}
                      onChange={(e) => setPreferences(prev => ({ ...prev, distanceUnit: e.target.value }))}
                    >
                      <option value="km">Kilometers (km)</option>
                      <option value="mi">Miles (mi)</option>
                    </select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-warmgray-900">Auto-detect Location</p>
                      <p className="text-sm text-warmgray-600">Automatically use your location to find nearby salons</p>
                    </div>
                    <Switch
                      checked={preferences.autoLocation}
                      onCheckedChange={(checked) =>
                        setPreferences(prev => ({ ...prev, autoLocation: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-8">
            {/* Privacy Settings */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-warmgray-900 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  Privacy & Visibility
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-warmgray-900">Profile Visibility</p>
                      <p className="text-sm text-warmgray-600">Allow salon owners to see your profile when you message them</p>
                    </div>
                    <Switch
                      checked={preferences.showProfile}
                      onCheckedChange={(checked) =>
                        setPreferences(prev => ({ ...prev, showProfile: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-warmgray-900">Allow Messages</p>
                      <p className="text-sm text-warmgray-600">Let salon owners contact you directly through the app</p>
                    </div>
                    <Switch
                      checked={preferences.allowMessages}
                      onCheckedChange={(checked) =>
                        setPreferences(prev => ({ ...prev, allowMessages: checked }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-warmgray-900 flex items-center gap-2">
                  <Download className="h-5 w-5 text-purple-600" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-warmgray-700 mb-3">
                      You have the right to access, update, or delete your personal data at any time.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                        <Download className="h-4 w-4 mr-2" />
                        Download My Data
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-8">
            {/* Usage & Activity */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-warmgray-900 flex items-center gap-2">
                  <Star className="h-5 w-5 text-purple-600" />
                  Your BeautyHub Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Heart className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-semibold text-warmgray-900">12</p>
                    <p className="text-sm text-warmgray-600">Favorite Salons</p>
                  </div>
                  
                  <div className="text-center p-4 bg-pink-50 rounded-lg">
                    <MessageCircle className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                    <p className="text-2xl font-semibold text-warmgray-900">28</p>
                    <p className="text-sm text-warmgray-600">Messages Sent</p>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-semibold text-warmgray-900">5</p>
                    <p className="text-sm text-warmgray-600">Appointments</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Premium Plans */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-warmgray-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  Premium Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-4">
                    Free Account
                  </Badge>
                  <p className="text-warmgray-600 mb-6">
                    You're currently using BeautyHub for free! Upgrade to Premium for exclusive features.
                  </p>
                  
                  <div className="space-y-3 text-left mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-sm text-warmgray-700">Priority customer support</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-sm text-warmgray-700">Advanced filtering and search</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-sm text-warmgray-700">Exclusive salon promotions</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                      <span className="text-sm text-warmgray-700">Early access to new features</span>
                    </div>
                  </div>
                  
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    Upgrade to Premium
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Account Actions */}
        <Card className="border-purple-100 mt-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-medium text-warmgray-900">Need help with your account?</p>
                <p className="text-sm text-warmgray-600">Contact our support team for assistance with any issues.</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                  Contact Support
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => alert("Logout functionality to be implemented")}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
