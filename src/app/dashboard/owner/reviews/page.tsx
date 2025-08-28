
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { 
  Star,
  MessageSquare,
  Filter,
  Smile,
  Meh,
  Frown,
  Reply
} from 'lucide-react';

const mockReviewsData = [
  {
    id: 'rev1',
    customerName: 'Amina Hassan',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c17d5098?w=100',
    rating: 5,
    comment: 'Amazing service! The braids came out perfect and the staff was so welcoming. Definitely coming back!',
    service: 'Box Braids',
    date: '2024-08-10',
    response: null,
  },
  {
    id: 'rev2',
    customerName: 'Fatou Diallo',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100',
    rating: 3,
    comment: 'The salon is clean and professional, but I had to wait 30 minutes past my appointment time which was frustrating.',
    service: 'Twist Out',
    date: '2024-08-08',
    response: 'Hi Fatou, we are so sorry for the delay you experienced. We had an unforeseen issue but we are working to ensure this doesn’t happen again. We appreciate your patience.',
  },
   {
    id: 'rev3',
    customerName: 'Kemi Okafor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    rating: 5,
    comment: 'Best natural hair treatment I\'ve had in Lagos! My hair feels so healthy and moisturized. Worth every naira.',
    service: 'Natural Hair Treatment',
    date: '2024-08-05',
    response: null,
  }
];

const averageRating = (mockReviewsData.reduce((acc, r) => acc + r.rating, 0) / mockReviewsData.length).toFixed(1);

export default function OwnerReviewsPage() {
  const [reviews, setReviews] = useState(mockReviewsData);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const getRatingIcon = (rating: number) => {
    if (rating >= 4) return <Smile className="h-6 w-6 text-green-500" />;
    if (rating >= 3) return <Meh className="h-6 w-6 text-yellow-500" />;
    return <Frown className="h-6 w-6 text-red-500" />;
  };

  return (
    <main className="flex-1 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-warmgray-900 mb-2">Customer Reviews</h1>
          <p className="text-lg text-warmgray-600">
            Monitor feedback and engage with your clients.
          </p>
        </div>

        {/* Review Summary */}
        <Card className="mb-8 border-purple-100">
          <CardHeader>
            <CardTitle>Review Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-5xl font-bold text-warmgray-900">{averageRating}</p>
                 <div className="flex items-center my-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-6 w-6 ${i < Math.floor(Number(averageRating)) ? 'text-yellow-400 fill-current' : 'text-warmgray-300'}`} />
                    ))}
                </div>
                <p className="text-warmgray-600">Based on {reviews.length} reviews</p>
              </div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(star => {
                    const count = reviews.filter(r => r.rating === star).length;
                    const percentage = (count / reviews.length) * 100;
                    return (
                        <div key={star} className="flex items-center gap-4">
                            <span className="text-sm text-warmgray-600">{star} star</span>
                            <Progress value={percentage} className="w-full h-2" />
                            <span className="text-sm font-medium text-warmgray-800">{count}</span>
                        </div>
                    );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter Reviews
            </Button>
          </div>
          {reviews.map(review => (
            <Card key={review.id} className="border-purple-100">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={review.avatar} alt={review.customerName} />
                    <AvatarFallback>{review.customerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-warmgray-900">{review.customerName}</h3>
                      <span className="text-xs text-warmgray-500">{review.date}</span>
                    </div>
                     <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-warmgray-300'}`} />
                        ))}
                    </div>
                    <p className="text-sm text-warmgray-700">{review.comment}</p>
                    
                    {review.response ? (
                        <div className="mt-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
                             <h4 className="text-sm font-semibold text-purple-800 flex items-center gap-2"><Reply className="h-4 w-4"/> Your Response</h4>
                             <p className="text-sm text-purple-700 mt-2">{review.response}</p>
                        </div>
                    ) : (
                        <div className="mt-4">
                          {replyingTo === review.id ? (
                            <div className="space-y-2">
                                <Textarea placeholder={`Reply to ${review.customerName}...`} className="bg-warmgray-50 border-purple-200"/>
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>Cancel</Button>
                                    <Button size="sm">Send Reply</Button>
                                </div>
                            </div>
                          ) : (
                            <Button variant="outline" size="sm" className="border-purple-200 text-purple-600 hover:bg-purple-50" onClick={() => setReplyingTo(review.id)}>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Reply
                            </Button>
                          )}
                        </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
