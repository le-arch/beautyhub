'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
  ArrowLeft,
  User,
  MapPin,
  Star
} from "lucide-react";
import { mockSalons } from '@/lib/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';


interface BookingSystemProps {
  salonId: number;
  onClose?: () => void;
}

interface SelectedService {
  name: string;
  duration: number; // in minutes
  price: number;
}

export function BookingSystem({ salonId, onClose }: BookingSystemProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>([]);
  const [notes, setNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');

  const salon = mockSalons.find(s => s.id === salonId);
  const user = { id: 'user123' }; // Mock user

  if (!salon) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <Card className="bg-white border-purple-100 w-full max-w-md">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold text-warmgray-900 mb-4">Salon Not Found</h2>
              <p className="text-warmgray-600 mb-6">The selected salon could not be found.</p>
              <Button onClick={onClose}>Close</Button>
            </CardContent>
        </Card>
      </div>
    );
  }
  
  const generateTimeSlots = (date: Date) => {
    const slots = [];
    const startHour = 9;
    const endHour = 18;
    
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const isAvailable = Math.random() > 0.3;
        slots.push({ time, available: isAvailable });
      }
    }
    return slots;
  };

  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  const totalDuration = selectedServices.reduce((sum, item) => sum + item.duration, 0);
  const totalPrice = selectedServices.reduce((sum, item) => sum + item.price, 0);
  const depositAmount = Math.round(totalPrice * 0.3); // 30% deposit

  const handleServiceToggle = (service: { name: string; price: number }) => {
    const isSelected = selectedServices.find(s => s.name === service.name);
    
    if (isSelected) {
      setSelectedServices(prev => prev.filter(s => s.name !== service.name));
    } else {
      setSelectedServices(prev => [...prev, {
        name: service.name,
        duration: 60, // Mock duration
        price: service.price
      }]);
    }
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || selectedServices.length === 0) {
      alert('Please select date, time, and at least one service');
      return;
    }
    setIsProcessing(true);
    // Mock booking creation
    await new Promise(resolve => setTimeout(resolve, 1000));
    const newBookingId = `BK-${Date.now()}`;
    setBookingId(newBookingId);

    // In a real app, you would send this to your backend
    console.log("Creating conversation and message for booking:", {
      salonId: salon.id,
      bookingId: newBookingId,
      service: selectedServices.map(s => s.name).join(', '),
      date: selectedDate.toLocaleDateString(),
      time: selectedTime
    })
    
    setIsProcessing(false);
    setStep(5);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    // Mock payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setStep(6);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1: // Select Services
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-warmgray-900 mb-4">Select Services</h3>
              <div className="space-y-3">
                {salon.services.map((service, index) => {
                  const isSelected = selectedServices.some(s => s.name === service.name);
                  return (
                    <div
                      key={index}
                      onClick={() => handleServiceToggle(service)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-warmgray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected 
                              ? 'bg-purple-600 border-purple-600' 
                              : 'border-warmgray-300'
                          }`}>
                            {isSelected && <CheckCircle className="h-3 w-3 text-white" />}
                          </div>
                          <div>
                            <h4 className="font-medium text-warmgray-900">{service.name}</h4>
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <p className="font-semibold text-purple-600">₦{service.price.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {selectedServices.length > 0 && (
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-warmgray-900 mb-2">Selected Services</h4>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total: {totalDuration / 60}h {totalDuration % 60}m</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            )}
          </div>
        );

      case 2: // Select Date & Time
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-warmgray-900 mb-4">Select Date</h3>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1)) || date.getDay() === 0}
                  className="rounded-md border border-purple-200"
                />
              </div>
            </div>
            {selectedDate && (
              <div>
                <h4 className="font-medium text-warmgray-900 mb-3">
                  Available times for {selectedDate.toLocaleDateString()}
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      size="sm"
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                      className={`${
                        selectedTime === slot.time
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                          : 'border-purple-200 text-purple-600 hover:bg-purple-50'
                      } ${!slot.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 3: // Add Notes
        return (
           <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-warmgray-900 mb-4">Additional Notes</h3>
              <Textarea
                placeholder="Any special requests or notes for the salon..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[120px] bg-warmgray-50 border-purple-200"
              />
            </div>
             <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-medium text-warmgray-900 mb-3">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Salon:</span>
                  <span className="font-medium">{salon.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{selectedDate?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span>{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{Math.round(totalDuration / 60)}h {totalDuration % 60}m</span>
                </div>
                <Separator className="my-2" />
                <div className="space-y-1">
                  {selectedServices.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>₦{item.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-base">
                  <span>Total:</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-purple-600">
                  <span>Deposit (30%):</span>
                  <span>₦{depositAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Confirm Booking
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-warmgray-900 mb-4">Confirm Booking</h3>
              <p className="text-warmgray-600 mb-6">
                Please review your booking details and confirm to proceed with payment.
              </p>
            </div>
            <Card className="border-purple-100">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={salon.image} alt={salon.name} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-100 to-pink-100 text-purple-700">
                      {salon.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-warmgray-900">{salon.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-warmgray-600 mb-1">
                      <MapPin className="h-3 w-3" />
                      <span>{salon.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-warmgray-600">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span>{salon.rating} ({salon.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-purple-600" />
                    <span>{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600" />
                    <span>{selectedTime} ({Math.round(totalDuration / 60)}h {totalDuration % 60}m)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-purple-600" />
                    <span>{selectedServices.map(s => s.name).join(', ')}</span>
                  </div>
                </div>
                {notes && (
                  <>
                    <Separator className="my-4" />
                    <div>
                      <h5 className="font-medium text-warmgray-900 mb-1">Notes:</h5>
                      <p className="text-sm text-warmgray-600">{notes}</p>
                    </div>
                  </>
                )}
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₦{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-purple-600">
                    <span>Deposit Required:</span>
                    <span>₦{depositAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-xs text-warmgray-500">
                    <span>Remaining Balance:</span>
                    <span>₦{(totalPrice - depositAmount).toLocaleString()} (Pay at salon)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 5: // Payment
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-warmgray-900 mb-2">Booking Created!</h3>
              <p className="text-warmgray-600">
                Your booking has been created successfully. A message has been sent to the salon. Please proceed with the deposit payment to confirm your appointment.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-700">
                <strong>Booking ID:</strong> {bookingId}
              </p>
              <p className="text-sm text-purple-700 mt-1">
                <strong>Deposit Amount:</strong> ₦{depositAmount.toLocaleString()}
              </p>
            </div>
          </div>
        );

      case 6: // Success
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-warmgray-900 mb-2">Payment Successful!</h3>
              <p className="text-warmgray-600">
                Your deposit has been paid and your appointment is confirmed. We've sent you a confirmation email and a message with all the details.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">What's Next?</h4>
              <ul className="text-sm text-green-700 space-y-1 text-left">
                <li>• You'll receive a reminder 24 hours before your appointment</li>
                <li>• Pay the remaining balance at the salon</li>
                <li>• Arrive 10 minutes early for check-in</li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={onClose}
                variant="outline"
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                Done
              </Button>
            </div>
          </div>
        );

      default: return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return selectedServices.length > 0;
      case 2: return selectedDate && selectedTime;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  const stepTitles = [
    'Select Services',
    'Choose Date & Time',
    'Add Notes',
    'Confirm Booking',
    'Payment',
    'Complete'
  ];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <Card className="bg-white border-purple-100 w-full max-w-xl max-h-[90vh] flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-semibold text-warmgray-900 mb-1">
                Book Appointment
              </h1>
              <p className="text-md text-warmgray-600">
                at {salon.name}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
                <span className="sr-only">Close</span>
                 X
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-6">
            <div className="mb-6">
                <div className="flex items-center justify-center mb-2">
                    {stepTitles.map((title, index) => (
                    <div key={index} className="flex items-center flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step > index + 1 
                            ? 'bg-green-600 text-white' 
                            : step === index + 1 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-warmgray-200 text-warmgray-600'
                        }`}>
                        {step > index + 1 ? <CheckCircle className="h-4 w-4" /> : index + 1}
                        </div>
                        {index < stepTitles.length - 1 && (
                        <div className={`flex-1 h-1 mx-2 ${
                            step > index + 1 ? 'bg-green-600' : 'bg-warmgray-200'
                        }`} />
                        )}
                    </div>
                    ))}
                </div>
                 <p className="text-center text-xs text-warmgray-600">
                    Step {step} of {stepTitles.length}: {stepTitles[step - 1]}
                </p>
            </div>
            {renderStepContent()}
        </CardContent>
         {step < 6 && (
          <div className="p-6 border-t">
            <div className="flex justify-between">
                <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
                >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
                </Button>

                {step < 4 && (
                <Button
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                )}

                {step === 4 && (
                <Button
                    onClick={handleBooking}
                    disabled={!canProceed() || isProcessing}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                    {isProcessing ? 'Creating...' : 'Confirm Booking'}
                </Button>
                )}

                {step === 5 && (
                <Button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                >
                    <CreditCard className="h-4 w-4 mr-2" />
                    {isProcessing ? 'Processing...' : `Pay Deposit ₦${depositAmount.toLocaleString()}`}
                </Button>
                )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
