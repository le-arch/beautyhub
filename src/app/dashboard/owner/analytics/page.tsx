
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Eye, 
  MessageCircle, 
  Users, 
  DollarSign, 
  Star,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const analyticsData = {
  overview: {
    totalViews: 12470,
    totalInquiries: 234,
    totalBookings: 158,
    totalRevenue: 2450000,
    averageRating: 4.8,
    responseRate: 92
  },
  trends: {
    views: { value: 12, trend: 'up' },
    inquiries: { value: 8, trend: 'up' },
    bookings: { value: -3, trend: 'down' },
    revenue: { value: 15, trend: 'up' }
  },
  monthlyData: [
    { month: 'Jan', views: 1200, inquiries: 45, bookings: 28, revenue: 420000 },
    { month: 'Feb', views: 1350, inquiries: 52, bookings: 31, revenue: 465000 },
    { month: 'Mar', views: 1100, inquiries: 38, bookings: 24, revenue: 360000 },
    { month: 'Apr', views: 1450, inquiries: 48, bookings: 32, revenue: 480000 },
    { month: 'May', views: 1520, inquiries: 55, bookings: 35, revenue: 525000 },
    { month: 'Jun', views: 1380, inquiries: 41, bookings: 29, revenue: 435000 }
  ],
  topServices: [
    { name: 'Box Braids', bookings: 45, revenue: 675000, percentage: 28 },
    { name: 'Twist Out', bookings: 38, revenue: 304000, percentage: 24 },
    { name: 'Hair Treatment', bookings: 32, revenue: 384000, percentage: 20 },
    { name: 'Cornrows', bookings: 25, revenue: 250000, percentage: 16 },
    { name: 'Loc Maintenance', bookings: 18, revenue: 270000, percentage: 12 }
  ],
  customerInsights: {
    newCustomers: 67,
    returningCustomers: 91,
    averageSessionTime: '4m 32s',
    mostActiveDay: 'Friday',
    peakHours: '2PM - 5PM'
  }
};

export default function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedMetric, setSelectedMetric] = useState('views');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const TrendIcon = ({ trend, value }: { trend: string; value: number }) => {
    if (trend === 'up') {
      return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    }
    return <ArrowDownRight className="h-4 w-4 text-red-600" />;
  };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-warmgray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-lg text-warmgray-600">
                Track your salon's performance and growth
              </p>
            </div>
            <div className="flex gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40 bg-white border-purple-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="3months">Last 3 months</SelectItem>
                  <SelectItem value="6months">Last 6 months</SelectItem>
                  <SelectItem value="1year">Last year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Eye className="h-5 w-5 text-purple-600" />
                </div>
                <Badge className={`text-xs ${analyticsData.trends.views.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  <TrendIcon trend={analyticsData.trends.views.trend} value={analyticsData.trends.views.value} />
                  {Math.abs(analyticsData.trends.views.value)}%
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-warmgray-600 mb-1">Total Views</p>
                <p className="text-2xl font-semibold text-warmgray-900">{analyticsData.overview.totalViews.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-pink-600" />
                </div>
                <Badge className={`text-xs ${analyticsData.trends.inquiries.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  <TrendIcon trend={analyticsData.trends.inquiries.trend} value={analyticsData.trends.inquiries.value} />
                  {Math.abs(analyticsData.trends.inquiries.value)}%
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-warmgray-600 mb-1">Inquiries</p>
                <p className="text-2xl font-semibold text-warmgray-900">{analyticsData.overview.totalInquiries}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <Badge className={`text-xs ${analyticsData.trends.bookings.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  <TrendIcon trend={analyticsData.trends.bookings.trend} value={analyticsData.trends.bookings.value} />
                  {Math.abs(analyticsData.trends.bookings.value)}%
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-warmgray-600 mb-1">Bookings</p>
                <p className="text-2xl font-semibold text-warmgray-900">{analyticsData.overview.totalBookings}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-yellow-600" />
                </div>
                <Badge className={`text-xs ${analyticsData.trends.revenue.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  <TrendIcon trend={analyticsData.trends.revenue.trend} value={analyticsData.trends.revenue.value} />
                  {Math.abs(analyticsData.trends.revenue.value)}%
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-warmgray-600 mb-1">Revenue</p>
                <p className="text-2xl font-semibold text-warmgray-900">{formatCurrency(analyticsData.overview.totalRevenue)}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Performance */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Chart */}
            <Card className="border-purple-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-warmgray-900 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
                    Performance Trends
                  </CardTitle>
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-32 bg-white border-purple-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="views">Views</SelectItem>
                      <SelectItem value="inquiries">Inquiries</SelectItem>
                      <SelectItem value="bookings">Bookings</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {/* Simple bar chart representation */}
                <div className="space-y-4">
                  {analyticsData.monthlyData.map((data, index) => (
                    <div key={data.month} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium text-warmgray-600">{data.month}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-warmgray-700">
                            {selectedMetric === 'views' && data.views.toLocaleString()}
                            {selectedMetric === 'inquiries' && data.inquiries}
                            {selectedMetric === 'bookings' && data.bookings}
                            {selectedMetric === 'revenue' && formatCurrency(data.revenue)}
                          </span>
                        </div>
                        <Progress 
                          value={
                            selectedMetric === 'views' ? (data.views / 2000) * 100 :
                            selectedMetric === 'inquiries' ? (data.inquiries / 60) * 100 :
                            selectedMetric === 'bookings' ? (data.bookings / 40) * 100 :
                            (data.revenue / 600000) * 100
                          } 
                          className="h-2"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Services */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-warmgray-900">Top Performing Services</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {analyticsData.topServices.map((service, index) => (
                    <div key={service.name} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-warmgray-900">{service.name}</p>
                          <p className="text-sm text-warmgray-600">{service.bookings} bookings</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-warmgray-900">{formatCurrency(service.revenue)}</p>
                        <p className="text-sm text-warmgray-600">{service.percentage}% of total</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Insights */}
          <div className="space-y-6">
            {/* Customer Insights */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-warmgray-900 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-600" />
                  Customer Insights
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-warmgray-600">New Customers</span>
                    <span className="font-medium text-warmgray-900">{analyticsData.customerInsights.newCustomers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-warmgray-600">Returning Customers</span>
                    <span className="font-medium text-warmgray-900">{analyticsData.customerInsights.returningCustomers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-warmgray-600">Avg. Session Time</span>
                    <span className="font-medium text-warmgray-900">{analyticsData.customerInsights.averageSessionTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-warmgray-600">Most Active Day</span>
                    <span className="font-medium text-warmgray-900">{analyticsData.customerInsights.mostActiveDay}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-warmgray-600">Peak Hours</span>
                    <span className="font-medium text-warmgray-900">{analyticsData.customerInsights.peakHours}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rating & Reviews */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-warmgray-900 flex items-center">
                  <Star className="h-5 w-5 mr-2 text-yellow-500" />
                  Rating & Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-semibold text-warmgray-900 mb-2">
                    {analyticsData.overview.averageRating}
                  </div>
                  <div className="flex justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 ${
                          i < Math.floor(analyticsData.overview.averageRating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-warmgray-300'
                        }`} 
                      />
                    ))}
                  </div>
                  <p className="text-sm text-warmgray-600">Based on 127 reviews</p>
                </div>
                
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-3">
                      <span className="text-sm text-warmgray-600 w-8">{rating}★</span>
                      <Progress 
                        value={rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 3 : rating === 2 ? 1 : 1} 
                        className="flex-1 h-2" 
                      />
                      <span className="text-sm text-warmgray-600 w-8">
                        {rating === 5 ? '95' : rating === 4 ? '25' : rating === 3 ? '4' : rating === 2 ? '2' : '1'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Rate */}
            <Card className="border-purple-100">
              <CardHeader>
                <CardTitle className="text-warmgray-900">Response Performance</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-warmgray-600">Response Rate</span>
                      <span className="font-medium text-warmgray-900">{analyticsData.overview.responseRate}%</span>
                    </div>
                    <Progress value={analyticsData.overview.responseRate} className="h-2" />
                  </div>
                  
                  <div className="pt-3 border-t border-warmgray-200">
                    <p className="text-sm text-warmgray-600 mb-2">Average Response Time</p>
                    <p className="text-lg font-medium text-warmgray-900">2.3 hours</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
