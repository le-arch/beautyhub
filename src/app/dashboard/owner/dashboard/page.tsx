
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Eye, 
  MessageCircle, 
  Star, 
  TrendingUp, 
  Calendar, 
  DollarSign,
  Camera,
  Settings,
  Crown,
  ChevronRight,
  Plus
} from 'lucide-react';
import Link from 'next/link';

const mockAnalytics = {
  profileViews: 1247,
  monthlyInquiries: 89,
  averageRating: 4.8,
  totalReviews: 127,
  monthlyRevenue: '₦450,000',
  bookingConversion: 68
};

const recentMessages = [
  {
    id: '1',
    customerName: 'Adunni Johnson',
    message: 'Hi! I\'d like to book braids for next Friday...',
    timestamp: '2 mins ago',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c647?w=150'
  },
  {
    id: '2',
    customerName: 'Kemi Okafor',
    message: 'Thank you for the amazing service yesterday!',
    timestamp: '1 hour ago',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150'
  }
];

const upcomingBookings = [
  {
    id: '1',
    customerName: 'Funmi Adebayo',
    service: 'Box Braids',
    time: '10:00 AM',
    date: 'Today',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150'
  },
  {
    id: '2',
    customerName: 'Chioma Eze',
    service: 'Twist Out',
    time: '2:00 PM',
    date: 'Tomorrow',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
  }
];

export default function SalonDashboard() {
  const user = { name: 'Salon Owner' };

  return (
    <div className="min-h-screen bg-gradient-beauty-secondary pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-warmgray-900 mb-2">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-lg text-warmgray-600">
                Here's what's happening with your salon today
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                asChild
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <Link href="/dashboard/owner/services">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Service
                </Link>
              </Button>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                asChild
              >
                <Link href="/dashboard/owner/profile">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-warmgray-600 mb-1">Profile Views</div>
                  <div className="text-2xl font-semibold text-warmgray-900">{mockAnalytics.profileViews}</div>
                  <div className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last month
                  </div>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-warmgray-600 mb-1">New Inquiries</div>
                  <div className="text-2xl font-semibold text-warmgray-900">{mockAnalytics.monthlyInquiries}</div>
                  <div className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8% from last month
                  </div>
                </div>
                <div className="p-3 bg-pink-100 rounded-full">
                  <MessageCircle className="h-6 w-6 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-warmgray-600 mb-1">Average Rating</div>
                  <div className="text-2xl font-semibold text-warmgray-900">{mockAnalytics.averageRating}</div>
                  <div className="text-xs text-warmgray-500 mt-1">{mockAnalytics.totalReviews} reviews</div>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-warmgray-600 mb-1">This Month</div>
                  <div className="text-2xl font-semibold text-warmgray-900">{mockAnalytics.monthlyRevenue}</div>
                  <div className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15% from last month
                  </div>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upgrade Plan */}
            <Card className="border-2 border-gradient-to-r from-purple-200 to-pink-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-warmgray-900 mb-2">Upgrade to Premium</h3>
                  <p className="text-sm text-warmgray-600 mb-4">
                    Get 3x more visibility and unlock advanced features like detailed analytics and priority support.
                  </p>
                  <Button asChild className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                    <Link href="/dashboard/owner/settings">Upgrade Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-warmgray-900 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-warmgray-600">Profile Completeness</span>
                      <span className="font-medium text-warmgray-900">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-warmgray-600">Booking Conversion</span>
                      <span className="font-medium text-warmgray-900">{mockAnalytics.bookingConversion}%</span>
                    </div>
                    <Progress value={mockAnalytics.bookingConversion} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-warmgray-600">Response Rate</span>
                      <span className="font-medium text-warmgray-900">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card className="border-purple-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-warmgray-900 flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-purple-600" />
                    Recent Messages
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    asChild
                    className="text-purple-600 hover:text-purple-700"
                  >
                    <Link href="/dashboard/owner/messages">
                        View All
                        <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={message.avatar} alt={message.customerName} />
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {message.customerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-warmgray-900">{message.customerName}</p>
                          <span className="text-xs text-warmgray-500">{message.timestamp}</span>
                        </div>
                        <p className="text-sm text-warmgray-600 truncate">{message.message}</p>
                      </div>
                      {message.unread && (
                        <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Bookings */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-warmgray-900 flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                  Upcoming Bookings
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center space-x-3 p-3 rounded-lg bg-purple-50">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={booking.avatar} alt={booking.customerName} />
                        <AvatarFallback className="bg-purple-100 text-purple-600 text-xs">
                          {booking.customerName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-warmgray-900">{booking.customerName}</p>
                        <p className="text-xs text-warmgray-600">{booking.service}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-purple-600">{booking.date}</p>
                        <p className="text-xs text-warmgray-500">{booking.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-warmgray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50"
                    asChild
                  >
                    <Link href="/dashboard/owner/gallery">
                        <Camera className="h-4 w-4 mr-2" />
                        Update Gallery
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50"
                    asChild
                  >
                    <Link href="/dashboard/owner/services">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Service
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50"
                    asChild
                  >
                    <Link href="/dashboard/owner/analytics">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
