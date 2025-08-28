
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Key,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Calendar,
  Settings as SettingsIcon,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';

export default function OwnerSettingsPage() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    newBookings: true,
    bookingCancellations: true,
    newMessages: true,
    newReviews: true,
    weeklySummary: false,
    platformUpdates: true,
  });
  
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
              value="notifications" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg"
            >
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
             <TabsTrigger 
              value="account" 
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-lg"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="space-y-8">
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
                
                <div className="flex justify-end">
                  <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    Update Password
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
                    <p className="text-warmgray-600 mb-4">You have access to all features.</p>
                    <p className="text-2xl font-bold text-purple-700">₦25,000 <span className="text-base font-normal text-warmgray-600">/ month</span></p>
                    <Button className="mt-4 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white">Manage Subscription</Button>
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
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-warmgray-700 mb-3">
                      Download your salon data, including booking history, customer messages, and service performance.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                        <Download className="h-4 w-4 mr-2" />
                        Download All Data
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
        </Tabs>
      </div>
    </main>
  );
}
