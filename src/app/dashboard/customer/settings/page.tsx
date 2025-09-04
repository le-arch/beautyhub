
'use client';

import { useState, useEffect, useCallback } from 'react';
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
  Globe, 
  Moon, 
  Sun, 
  Camera, 
  Key,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Calendar,
  Settings as SettingsIcon,
  MessageCircle,
  Loader2,
  Save,
  AlertTriangle
} from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import { createClient } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Profile, UserSettings } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function SettingsPage() {
  const { user, profile: contextProfile, loading: userLoading } = useUser();
  const [activeTab, setActiveTab] = useState('account');
  const supabase = createClient();
  const { toast } = useToast();

  const [profile, setProfile] = useState<Partial<Profile>>({});
  const [settings, setSettings] = useState<Partial<UserSettings>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    const { data, error: settingsError } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (settingsError && settingsError.code !== 'PGRST116') {
      console.error('Error fetching settings:', settingsError);
      setError('Could not load your settings.');
    } else {
      setSettings(data || {});
    }

    setProfile(contextProfile || {});
    setLoading(false);
  }, [user, contextProfile, supabase]);
  
  useEffect(() => {
    if (!userLoading) {
      fetchSettings();
    }
  }, [userLoading, fetchSettings]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile(prev => ({ ...prev, [e.target.id]: e.target.value }));
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

  const handleSaveChanges = async (section: 'profile' | 'preferences') => {
    if (!user) return;
    setSaving(true);

    if (section === 'profile') {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          phone: profile.phone,
          location: profile.location,
        })
        .eq('id', user.id);
        
      if (profileError) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not save profile.' });
      } else {
        toast({ title: 'Profile Saved!' });
      }
    }

    if (section === 'preferences') {
      const { error: settingsError } = await supabase
        .from('user_settings')
        .upsert({ user_id: user.id, ...settings }, { onConflict: 'user_id' });
        
      if (settingsError) {
        toast({ variant: 'destructive', title: 'Error', description: 'Could not save preferences.' });
      } else {
        toast({ title: 'Preferences Saved!' });
      }
    }
    
    setSaving(false);
  };
  
  const renderSkeleton = () => (
    <div className="space-y-8">
      <Skeleton className="h-20 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
  )

  if (userLoading || loading) {
    return (
       <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-beauty-secondary">
        <div className="max-w-6xl mx-auto">
          {renderSkeleton()}
        </div>
      </main>
    )
  }

  if (error) {
    return (
       <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-gradient-beauty-secondary">
        <div className="max-w-6xl mx-auto">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </main>
    )
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
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-xl text-warmgray-900 flex items-center gap-2">
                  <User className="h-5 w-5 text-purple-600" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input 
                      id="full_name" 
                      value={profile.full_name || ''}
                      onChange={handleProfileChange}
                      className="bg-warmgray-50 border-purple-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={user?.email || ''} disabled className="bg-warmgray-200 border-purple-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={profile.phone || ''} onChange={handleProfileChange} className="bg-warmgray-50 border-purple-200" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={profile.location || ''} onChange={handleProfileChange} className="bg-warmgray-50 border-purple-200" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => handleSaveChanges('profile')} disabled={saving}>
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    Save Changes
                  </Button>
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
                    <Label>Theme</Label>
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
                  <Label>Language</Label>
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
