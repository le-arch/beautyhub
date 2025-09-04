
'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { UserSettings } from '@/lib/types';
import { mockUserSettings } from '@/lib/mock-data';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('preferences');
  const { toast } = useToast();

  const [settings, setSettings] = useState<UserSettings>(mockUserSettings);
  const [saving, setSaving] = useState(false);

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

  const handleSaveChanges = async (section: 'profile' | 'preferences') => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({ title: `${section.charAt(0).toUpperCase() + section.slice(1)} Saved!` });

    setSaving(false);
  };
  
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
          <TabsContent value="account">
              <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>This is your public information. It can be edited on your <a href="/dashboard/customer/profile" className="text-primary underline">profile page</a>.</CardDescription>
                  </CardHeader>
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
              <Button onClick={() => handleSaveChanges('preferences')} disabled={saving}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Preferences
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
