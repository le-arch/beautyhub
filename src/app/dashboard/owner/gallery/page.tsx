'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Upload, 
  Image as ImageIcon, 
  Video, 
  X, 
  Star, 
  Eye,
  MoreVertical,
  Edit,
  Trash2,
  Download,
  Play
} from 'lucide-react';
import ImageWithFallback from '@/components/image-with-fallback';

const mockGalleryItems = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1702236240794-58dc4c6895e5?w=400',
    thumbnail: 'https://images.unsplash.com/photo-1702236240794-58dc4c6895e5?w=200',
    title: 'Box Braids Portfolio',
    description: 'Intricate box braids with accessories',
    tags: ['braids', 'protective-style'],
    featured: true,
    views: 1247,
    likes: 89,
    uploadDate: '2024-01-15'
  },
  {
    id: '2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1625536658395-2bd89a631e37?w=400',
    thumbnail: 'https://images.unsplash.com/photo-1625536658395-2bd89a631e37?w=200',
    title: 'Dreadlock Styling',
    description: 'Natural dreadlock maintenance and styling',
    tags: ['dreadlocks', 'natural-hair'],
    featured: false,
    views: 892,
    likes: 67,
    uploadDate: '2024-01-10'
  },
  {
    id: '3',
    type: 'video',
    url: '#',
    thumbnail: 'https://images.unsplash.com/photo-1650176491728-a5e6edd08575?w=200',
    title: 'Nail Art Process',
    description: 'Step-by-step nail art tutorial',
    tags: ['nails', 'tutorial'],
    featured: false,
    views: 2156,
    likes: 143,
    uploadDate: '2024-01-08',
    duration: '2:34'
  },
  {
    id: '4',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1559185590-879c66a55254?w=400',
    thumbnail: 'https://images.unsplash.com/photo-1559185590-879c66a55254?w=200',
    title: 'Facial Treatment',
    description: 'Relaxing spa facial service',
    tags: ['spa', 'facial'],
    featured: false,
    views: 634,
    likes: 45,
    uploadDate: '2024-01-05'
  },
  {
    id: '5',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1660505102581-85cffa4e6550?w=400',
    thumbnail: 'https://images.unsplash.com/photo-1660505102581-85cffa4e6550?w=200',
    title: 'Bridal Makeup',
    description: 'Elegant bridal makeup look',
    tags: ['makeup', 'bridal'],
    featured: true,
    views: 1789,
    likes: 124,
    uploadDate: '2024-01-03'
  },
  {
    id: '6',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1626383120723-2a941488860d?w=400',
    thumbnail: 'https://images.unsplash.com/photo-1626383120723-2a941488860d?w=200',
    title: 'Salon Interior',
    description: 'Modern salon workspace',
    tags: ['interior', 'workspace'],
    featured: false,
    views: 445,
    likes: 32,
    uploadDate: '2024-01-01'
  }
];

export default function GalleryManager() {
  const [galleryItems, setGalleryItems] = useState(mockGalleryItems);
  const [selectedTab, setSelectedTab] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [uploadType, setUploadType] = useState('image');

  const filteredItems = galleryItems.filter(item => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'featured') return item.featured;
    return item.type === selectedTab;
  });

  const handleDeleteItem = (itemId: string) => {
    setGalleryItems(prev => prev.filter(item => item.id !== itemId));
    if (selectedItem?.id === itemId) {
      setShowItemModal(false);
    }
  };

  const handleToggleFeatured = (itemId: string) => {
    setGalleryItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, featured: !item.featured } : item
    ));
  };

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setShowItemModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-beauty-secondary pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-semibold text-warmgray-900 mb-2">Gallery Manager</h1>
              <p className="text-lg text-warmgray-600">
                Showcase your work with stunning photos and videos
              </p>
            </div>
            <Button 
              onClick={() => setShowUploadModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Media
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-warmgray-600">Total Items</p>
                  <p className="text-2xl font-semibold text-warmgray-900">{galleryItems.length}</p>
                </div>
                <div className="p-2 bg-purple-100 rounded-lg">
                  <ImageIcon className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-warmgray-600">Total Views</p>
                  <p className="text-2xl font-semibold text-warmgray-900">
                    {galleryItems.reduce((sum, item) => sum + item.views, 0).toLocaleString()}
                  </p>
                </div>
                <div className="p-2 bg-green-100 rounded-lg">
                  <Eye className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-warmgray-600">Total Likes</p>
                  <p className="text-2xl font-semibold text-warmgray-900">
                    {galleryItems.reduce((sum, item) => sum + item.likes, 0)}
                  </p>
                </div>
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Star className="h-5 w-5 text-pink-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-warmgray-600">Featured</p>
                  <p className="text-2xl font-semibold text-warmgray-900">
                    {galleryItems.filter(item => item.featured).length}
                  </p>
                </div>
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-600 fill-current" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Card className="border-purple-100 mb-6">
          <CardContent className="p-6">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All ({galleryItems.length})</TabsTrigger>
                <TabsTrigger value="image">Images ({galleryItems.filter(i => i.type === 'image').length})</TabsTrigger>
                <TabsTrigger value="video">Videos ({galleryItems.filter(i => i.type === 'video').length})</TabsTrigger>
                <TabsTrigger value="featured">Featured ({galleryItems.filter(i => i.featured).length})</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="border-purple-100 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="relative" onClick={() => handleItemClick(item)}>
                <div className="aspect-square">
                  <ImageWithFallback 
                    src={item.thumbnail} 
                    alt={item.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {item.type === 'video' && (
                    <div className="bg-white/90 rounded-full p-3">
                      <Play className="h-6 w-6 text-warmgray-900" />
                    </div>
                  )}
                </div>

                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                  </div>
                )}

                {/* Video Duration */}
                {item.type === 'video' && item.duration && (
                  <div className="absolute bottom-2 right-2">
                    <Badge className="bg-black/70 text-white text-xs">
                      {item.duration}
                    </Badge>
                  </div>
                )}

                {/* Actions Menu */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle menu action
                    }}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-medium text-warmgray-900 mb-1 truncate">{item.title}</h3>
                <p className="text-sm text-warmgray-600 mb-3 overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>{item.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs border-purple-200 text-purple-600">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-warmgray-500">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {item.views}
                    </span>
                    <span className="flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      {item.likes}
                    </span>
                  </div>
                  <span>{new Date(item.uploadDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upload Modal */}
        <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Media</DialogTitle>
              <DialogDescription>
                Add photos or videos to showcase your work
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Upload Type Selection */}
              <div className="flex space-x-4">
                <Button
                  variant={uploadType === 'image' ? 'default' : 'outline'}
                  onClick={() => setUploadType('image')}
                  className="flex-1"
                >
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Image
                </Button>
                <Button
                  variant={uploadType === 'video' ? 'default' : 'outline'}
                  onClick={() => setUploadType('video')}
                  className="flex-1"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Video
                </Button>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-purple-200 rounded-lg p-8 text-center hover:border-purple-300 transition-colors">
                <div className="flex flex-col items-center">
                  <Upload className="h-12 w-12 text-purple-400 mb-4" />
                  <p className="text-lg font-medium text-warmgray-900 mb-2">
                    Drop your {uploadType}s here
                  </p>
                  <p className="text-sm text-warmgray-600 mb-4">
                    or click to browse files
                  </p>
                  <Button variant="outline" className="border-purple-200 text-purple-600">
                    Choose Files
                  </Button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Give your media a title"
                    className="bg-warmgray-50 border-purple-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input 
                    id="description" 
                    placeholder="Brief description of your work"
                    className="bg-warmgray-50 border-purple-200 focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input 
                    id="tags" 
                    placeholder="braids, natural-hair, styling"
                    className="bg-warmgray-50 border-purple-200 focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Upload
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Item Detail Modal */}
        {selectedItem && (
          <Dialog open={showItemModal} onOpenChange={setShowItemModal}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedItem.title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Media Display */}
                <div className="aspect-square rounded-lg overflow-hidden">
                  <ImageWithFallback 
                    src={selectedItem.url} 
                    alt={selectedItem.title}
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-warmgray-900">{selectedItem.views}</p>
                    <p className="text-sm text-warmgray-600">Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-warmgray-900">{selectedItem.likes}</p>
                    <p className="text-sm text-warmgray-600">Likes</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-semibold text-warmgray-900">
                      {selectedItem.featured ? 'Yes' : 'No'}
                    </p>
                    <p className="text-sm text-warmgray-600">Featured</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleFeatured(selectedItem.id)}
                    className="border-purple-200 text-purple-600 hover:bg-purple-50"
                  >
                    <Star className={`h-4 w-4 mr-2 ${selectedItem.featured ? 'fill-current' : ''}`} />
                    {selectedItem.featured ? 'Remove from Featured' : 'Add to Featured'}
                  </Button>
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDeleteItem(selectedItem.id)}
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
