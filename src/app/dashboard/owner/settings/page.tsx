
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
  MessageSquare,
  Loader2,
  Save
} from 'lucide-react';
import Link from 'next/link';
import { PasswordInput } from '@/components/password-input';

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

  const handleSaveChanges = async (section: string) => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // toast({ title: `${section} Saved!`, description: 'Your changes have been saved.' });
    setSaving(false);
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
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
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
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-warmgray-900 flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-600" />
                  Account Owner
                </CardTitle>
                <CardDescription>Manage your personal login information.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="owner-name">Full Name</Label>
                    <Input id="owner-name" defaultValue="Salon Owner" className="bg-warmgray-50 border-purple-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="owner-email">Email Address</Label>
                    <Input id="owner-email" type="email" defaultValue="owner@amberglow.com" disabled className="bg-warmgray-200 border-purple-200" />
                  </div>
                </div>
                 <div className="flex justify-end mt-6">
                  <Button onClick={() => handleSaveChanges('Account Details')} disabled={saving}>
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Account Details
                  </Button>
                </div>
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
