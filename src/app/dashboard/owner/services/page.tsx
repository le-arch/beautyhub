'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  DollarSign, 
  Users, 
  TrendingUp,
  Camera,
  Package,
  Calendar,
  Star,
  Eye,
  MoreVertical,
  Save,
  X,
  Copy,
  Filter,
  Search,
  SortAsc
} from 'lucide-react';
import ImageWithFallback from '@/components/image-with-fallback';

const serviceCategories = [
  'Braiding', 'Nails', 'Dreadlocks', 'Spa & Facials', 'Makeup', 'Barbering', 'Natural Hair', 'Hair Treatments'
];

const mockServices = [
  {
    id: '1',
    name: 'Box Braids',
    category: 'Braiding',
    description: 'Classic protective style with synthetic or human hair extensions',
    price: 15000,
    duration: 240, // minutes
    image: 'https://images.unsplash.com/photo-1702236240794-58dc4c6895e5?w=300',
    isActive: true,
    bookings: 45,
    revenue: 675000,
    rating: 4.8,
    lastBooked: '2024-01-15',
    tags: ['protective-style', 'long-lasting', 'trendy'],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    }
  },
  {
    id: '2',
    name: 'Twist Out',
    category: 'Natural Hair',
    description: 'Natural hair styling technique for defined, voluminous curls',
    price: 8000,
    duration: 120,
    image: 'https://images.unsplash.com/photo-1625536658395-2bd89a631e37?w=300',
    isActive: true,
    bookings: 38,
    revenue: 304000,
    rating: 4.6,
    lastBooked: '2024-01-14',
    tags: ['natural-hair', 'chemical-free', 'versatile'],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true
    }
  },
  {
    id: '3',
    name: 'Acrylic Nails',
    category: 'Nails',
    description: 'Long-lasting acrylic nail extensions with custom designs',
    price: 12000,
    duration: 90,
    image: 'https://images.unsplash.com/photo-1650176491728-a5e6edd08575?w=300',
    isActive: true,
    bookings: 52,
    revenue: 624000,
    rating: 4.9,
    lastBooked: '2024-01-16',
    tags: ['long-lasting', 'customizable', 'nail-art'],
    availability: {
      monday: false,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: true
    }
  },
  {
    id: '4',
    name: 'Deep Conditioning Treatment',
    category: 'Hair Treatments',
    description: 'Intensive moisture and repair treatment for damaged hair',
    price: 6000,
    duration: 60,
    image: 'https://images.unsplash.com/photo-1559185590-879c66a55254?w=300',
    isActive: true,
    bookings: 29,
    revenue: 174000,
    rating: 4.7,
    lastBooked: '2024-01-13',
    tags: ['moisturizing', 'repair', 'therapeutic'],
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    }
  }
];

const mockPackages = [
  {
    id: 'p1',
    name: 'Bridal Beauty Package',
    services: ['Box Braids', 'Acrylic Nails', 'Makeup'],
    originalPrice: 35000,
    packagePrice: 28000,
    savings: 7000,
    isActive: true,
    bookings: 12
  },
  {
    id: 'p2',
    name: 'Natural Hair Care Bundle',
    services: ['Twist Out', 'Deep Conditioning Treatment'],
    originalPrice: 14000,
    packagePrice: 12000,
    savings: 2000,
    isActive: true,
    bookings: 18
  }
];

export default function ServiceManager() {
  const [services, setServices] = useState(mockServices);
  const [packages, setPackages] = useState(mockPackages);
  const [selectedTab, setSelectedTab] = useState('services');
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: '',
    description: '',
    price: '',
    duration: '',
    image: '',
    tags: '',
    isActive: true,
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    }
  });

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'price':
        return a.price - b.price;
      case 'bookings':
        return b.bookings - a.bookings;
      case 'revenue':
        return b.revenue - a.revenue;
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const totalRevenue = services.reduce((sum, service) => sum + service.revenue, 0);
  const totalBookings = services.reduce((sum, service) => sum + service.bookings, 0);
  const averageRating = services.reduce((sum, service) => sum + service.rating, 0) / services.length;
  const activeServices = services.filter(service => service.isActive).length;

  const handleEditService = (service: any) => {
    setEditingService(service);
    setServiceForm({
      name: service.name,
      category: service.category,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString(),
      image: service.image,
      tags: service.tags.join(', '),
      isActive: service.isActive,
      availability: service.availability
    });
    setShowServiceModal(true);
  };

  const handleAddService = () => {
    setEditingService(null);
    setServiceForm({
      name: '',
      category: '',
      description: '',
      price: '',
      duration: '',
      image: '',
      tags: '',
      isActive: true,
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: false
      }
    });
    setShowServiceModal(true);
  };

  const handleSaveService = () => {
    const serviceData = {
      id: editingService?.id || Date.now().toString(),
      name: serviceForm.name,
      category: serviceForm.category,
      description: serviceForm.description,
      price: parseInt(serviceForm.price),
      duration: parseInt(serviceForm.duration),
      image: serviceForm.image,
      isActive: serviceForm.isActive,
      tags: serviceForm.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      availability: serviceForm.availability,
      // Mock data for new services
      bookings: editingService?.bookings || 0,
      revenue: editingService?.revenue || 0,
      rating: editingService?.rating || 0,
      lastBooked: editingService?.lastBooked || new Date().toISOString().split('T')[0]
    };

    if (editingService) {
      setServices(prev => prev.map(service => 
        service.id === editingService.id ? serviceData : service
      ));
    } else {
      setServices(prev => [...prev, serviceData]);
    }

    setShowServiceModal(false);
    setEditingService(null);
  };

  const handleDeleteService = (serviceId: string) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
  };

  const handleToggleServiceStatus = (serviceId: string) => {
    setServices(prev => prev.map(service => 
      service.id === serviceId ? { ...service, isActive: !service.isActive } : service
    ));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-beauty-secondary pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-warmgray-900 mb-2">Service Manager</h1>
              <p className="text-lg text-warmgray-600">
                Manage your salon services, pricing, and availability
              </p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={() => setShowPackageModal(true)}
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <Package className="h-4 w-4 mr-2" />
                Create Package
              </Button>
              <Button 
                onClick={handleAddService}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Service
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warmgray-600 mb-1">Total Revenue</p>
                  <p className="text-2xl font-semibold text-warmgray-900">{formatCurrency(totalRevenue)}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warmgray-600 mb-1">Total Bookings</p>
                  <p className="text-2xl font-semibold text-warmgray-900">{totalBookings}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warmgray-600 mb-1">Average Rating</p>
                  <p className="text-2xl font-semibold text-warmgray-900">{averageRating.toFixed(1)}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Star className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-warmgray-600 mb-1">Active Services</p>
                  <p className="text-2xl font-semibold text-warmgray-900">{activeServices}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="services">Services ({services.length})</TabsTrigger>
            <TabsTrigger value="packages">Packages ({packages.length})</TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            {/* Filters and Search */}
            <Card className="border-purple-100">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warmgray-400 h-4 w-4" />
                    <Input
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white border-purple-200"
                    />
                  </div>
                  
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-48 bg-white border-purple-200">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {serviceCategories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40 bg-white border-purple-200">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                      <SelectItem value="bookings">Bookings</SelectItem>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedServices.map((service) => (
                <Card key={service.id} className="border-purple-100 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <div className="aspect-video">
                      <ImageWithFallback 
                        src={service.image} 
                        alt={service.name}
                        width={300}
                        height={169}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge 
                        variant={service.isActive ? "default" : "secondary"}
                        className={service.isActive 
                          ? "bg-green-500 text-white" 
                          : "bg-warmgray-300 text-warmgray-700"
                        }
                      >
                        {service.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </div>

                    {/* Actions Menu */}
                    <div className="absolute top-3 right-3">
                      <div className="h-8 w-8 p-0 bg-white/90 hover:bg-white rounded-md flex items-center justify-center cursor-pointer transition-colors">
                        <MoreVertical className="h-4 w-4 text-warmgray-600" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-warmgray-900">{service.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium text-warmgray-700">{service.rating}</span>
                        </div>
                      </div>
                      
                      <Badge variant="outline" className="mb-2 border-purple-200 text-purple-600">
                        {service.category}
                      </Badge>
                      
                      <p className="text-sm text-warmgray-600 mb-3 overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {service.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-warmgray-200 text-warmgray-600">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-warmgray-600">Price:</span>
                        <span className="font-medium text-warmgray-900">{formatCurrency(service.price)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-warmgray-600">Duration:</span>
                        <span className="font-medium text-warmgray-900">{formatDuration(service.duration)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-warmgray-600">Bookings:</span>
                        <span className="font-medium text-warmgray-900">{service.bookings}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-warmgray-600">Revenue:</span>
                        <span className="font-medium text-warmgray-900">{formatCurrency(service.revenue)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditService(service)}
                        className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <div className="flex items-center">
                        <Switch
                          checked={service.isActive}
                          onCheckedChange={() => handleToggleServiceStatus(service.id)}
                          className="data-[state=checked]:bg-purple-600"
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteService(service.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id} className="border-purple-100">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-warmgray-900 mb-2">{pkg.name}</h3>
                        <Badge 
                          variant={pkg.isActive ? "default" : "secondary"}
                          className={pkg.isActive 
                            ? "bg-green-500 text-white" 
                            : "bg-warmgray-300 text-warmgray-700"
                          }
                        >
                          {pkg.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <div className="h-8 w-8 p-0 bg-transparent hover:bg-warmgray-100 rounded-md flex items-center justify-center cursor-pointer transition-colors">
                        <MoreVertical className="h-4 w-4 text-warmgray-600" />
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-sm text-warmgray-600 mb-1">Included Services:</p>
                        <div className="flex flex-wrap gap-1">
                          {pkg.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-purple-200 text-purple-600">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-warmgray-600">Original Price:</span>
                          <p className="font-medium text-warmgray-900">{formatCurrency(pkg.originalPrice)}</p>
                        </div>
                        <div>
                          <span className="text-warmgray-600">Package Price:</span>
                          <p className="font-medium text-green-600">{formatCurrency(pkg.packagePrice)}</p>
                        </div>
                        <div>
                          <span className="text-warmgray-600">Savings:</span>
                          <p className="font-medium text-green-600">{formatCurrency(pkg.savings)}</p>
                        </div>
                        <div>
                          <span className="text-warmgray-600">Bookings:</span>
                          <p className="font-medium text-warmgray-900">{pkg.bookings}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Service Modal */}
        <Dialog open={showServiceModal} onOpenChange={setShowServiceModal}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Edit Service' : 'Add New Service'}
              </DialogTitle>
              <DialogDescription>
                {editingService ? 'Update your service details' : 'Create a new service offering'}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceName">Service Name</Label>
                  <Input
                    id="serviceName"
                    value={serviceForm.name}
                    onChange={(e) => setServiceForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Box Braids"
                    className="bg-warmgray-50 border-purple-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="serviceCategory">Category</Label>
                  <Select 
                    value={serviceForm.category} 
                    onValueChange={(value) => setServiceForm(prev => ({ ...prev, category: value }))}
                  >
                    <SelectTrigger className="bg-warmgray-50 border-purple-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceCategories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceDescription">Description</Label>
                <Textarea
                  id="serviceDescription"
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your service, techniques used, and what makes it special..."
                  rows={3}
                  className="bg-warmgray-50 border-purple-200"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="servicePrice">Price (₦)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warmgray-400 h-4 w-4" />
                    <Input
                      id="servicePrice"
                      type="number"
                      value={serviceForm.price}
                      onChange={(e) => setServiceForm(prev => ({ ...prev, price: e.target.value }))}
                      placeholder="15000"
                      className="pl-10 bg-warmgray-50 border-purple-200"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="serviceDuration">Duration (minutes)</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-warmgray-400 h-4 w-4" />
                    <Input
                      id="serviceDuration"
                      type="number"
                      value={serviceForm.duration}
                      onChange={(e) => setServiceForm(prev => ({ ...prev, duration: e.target.value }))}
                      placeholder="240"
                      className="pl-10 bg-warmgray-50 border-purple-200"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="serviceTags">Tags (comma separated)</Label>
                <Input
                  id="serviceTags"
                  value={serviceForm.tags}
                  onChange={(e) => setServiceForm(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="protective-style, long-lasting, trendy"
                  className="bg-warmgray-50 border-purple-200"
                />
              </div>

              {/* Availability */}
              <div className="space-y-4">
                <Label>Service Availability</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(serviceForm.availability).map(([day, available]) => (
                    <div key={day} className="flex items-center space-x-2">
                      <Switch
                        checked={available}
                        onCheckedChange={(checked) => 
                          setServiceForm(prev => ({
                            ...prev,
                            availability: { ...prev.availability, [day]: checked }
                          }))
                        }
                      />
                      <Label className="text-sm capitalize">{day}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Status */}
              <div className="flex items-center space-x-2">
                <Switch
                  checked={serviceForm.isActive}
                  onCheckedChange={(checked) => setServiceForm(prev => ({ ...prev, isActive: checked }))}
                />
                <Label>Service is active and bookable</Label>
              </div>

              <div className="flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowServiceModal(false)}
                  className="border-purple-200 text-purple-600"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveService}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingService ? 'Update Service' : 'Create Service'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
