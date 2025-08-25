'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  CreditCard,
  MessageCircle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { mockSalons } from '@/lib/mock-data';

interface BookingSystemProps {
  salonId: number;
  onClose?: () => void;
}

export function BookingSystem({ salonId, onClose }: BookingSystemProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const bookingSalon = mockSalons.find(s => s.id === salonId);

  if (!bookingSalon) {
    return (
      <div className="min-h-screen bg-gradient-beauty-secondary pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-warmgray-900 mb-4">No Salon Selected</h2>
              <p className="text-warmgray-600 mb-6">Please select a salon to book an appointment.</p>
              <Button>
                Find Salons
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const availableTimes = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const handleServiceToggle = (serviceIndex: number) => {
    setSelectedServices(prev => 
      prev.includes(serviceIndex) 
        ? prev.filter(i => i !== serviceIndex)
        : [...prev, serviceIndex]
    );
  };

  const calculateTotal = () => {
    return selectedServices.reduce((total, serviceIndex) => {
      const service = bookingSalon.services[serviceIndex];
      if (service) {
        return total + service.price;
      }
      return total;
    }, 0);
  };

  const handleBookingSubmit = async () => {
    if (!selectedDate || !selectedTime || selectedServices.length === 0 || !customerInfo.name) {
      alert('Please fill in all required fields');
      return;
    }
    alert('Booking Submitted (UI Only)');
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center font-medium
            ${step <= currentStep 
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
              : 'bg-warmgray-200 text-warmgray-600'
            }
          `}>
            {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
          </div>
          {index < 2 && (
            <div className={`
              w-16 h-1 mx-2
              ${step < currentStep ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-warmgray-200'}
            `} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-warmgray-900 mb-2">Select Services</h3>
        <p className="text-warmgray-600">Choose the services you'd like to book</p>
      </div>

      <div className="space-y-4">
        {bookingSalon.services.map((service, index) => (
          <Card 
            key={index}
            className={`cursor-pointer transition-all duration-200 ${
              selectedServices.includes(index)
                ? 'ring-2 ring-purple-500 bg-purple-50'
                : 'hover:shadow-md'
            }`}
            onClick={() => handleServiceToggle(index)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-warmgray-900">{service.name}</h4>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <CreditCard className="h-4 w-4 text-warmgray-400" />
                      <span className="text-sm font-medium text-purple-600">${service.price}</span>
                    </div>
                  </div>
                </div>
                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center
                  ${selectedServices.includes(index)
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-warmgray-300'
                  }
                `}>
                  {selectedServices.includes(index) && (
                    <CheckCircle className="h-4 w-4 text-white" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedServices.length > 0 && (
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="font-medium text-warmgray-900">Total:</span>
            <span className="text-lg font-semibold text-purple-600">
              ${calculateTotal().toLocaleString()}
            </span>
          </div>
          <p className="text-sm text-warmgray-600 mt-1">
            Deposit required: ${Math.round(calculateTotal() * 0.3).toLocaleString()} (30%)
          </p>
        </div>
      )}

      <Button 
        onClick={() => setCurrentStep(2)}
        disabled={selectedServices.length === 0}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
      >
        Continue to Date & Time
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-warmgray-900 mb-2">Select Date & Time</h3>
        <p className="text-warmgray-600">When would you like your appointment?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label className="text-base font-medium mb-3 block">Select Date</Label>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
            className="rounded-md border border-purple-200"
          />
        </div>

        <div>
          <Label className="text-base font-medium mb-3 block">Available Times</Label>
          <div className="grid grid-cols-2 gap-2">
            {availableTimes.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTime(time)}
                className={selectedTime === time ? "bg-gradient-to-r from-purple-600 to-pink-600" : ""}
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(1)}
          className="flex-1"
        >
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep(3)}
          disabled={!selectedDate || !selectedTime}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          Continue to Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-warmgray-900 mb-2">Your Details</h3>
        <p className="text-warmgray-600">Please provide your contact information</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="Your full name"
            value={customerInfo.name}
            onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            placeholder="+237 XXX XXX XXX"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="notes">Special Requests (Optional)</Label>
          <Textarea
            id="notes"
            placeholder="Any special requests or notes for the salon..."
            value={customerInfo.notes}
            onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
            className="mt-1"
          />
        </div>
      </div>

      <Card className="bg-purple-50 border-purple-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-warmgray-900 mb-3">Booking Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Date:</span>
              <span className="font-medium">{selectedDate?.toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Time:</span>
              <span className="font-medium">{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span>Services:</span>
              <span className="font-medium">{selectedServices.length} selected</span>
            </div>
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="font-medium text-purple-600">${calculateTotal().toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Direct Chat Booking</h4>
            <p className="text-sm text-blue-700 mt-1">
              Your booking request will be sent directly to the salon via chat. They will confirm availability and guide you through payment.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(2)}
          className="flex-1"
        >
          Back
        </Button>
        <Button 
          onClick={handleBookingSubmit}
          disabled={!customerInfo.name || !customerInfo.phone}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
        >
          Send Booking Request
          <MessageCircle className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
        <Card className="bg-white border-purple-100 w-full max-w-4xl max-h-[90vh] flex flex-col">
          <CardHeader>
             <div className="flex items-center gap-4">
              <Image 
                src={bookingSalon.image}
                alt={bookingSalon.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-warmgray-900">{bookingSalon.name}</h2>
              </div>
              {onClose && (
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <span className="sr-only">Close</span>
                  ×
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-8 overflow-y-auto">
            {renderStepIndicator()}
            
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </CardContent>
        </Card>
    </div>
  );
}