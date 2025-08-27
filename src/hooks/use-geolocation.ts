'use client';

import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [location, setLocation] = useState<{ city: string; country: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const onSuccess = async (position: GeolocationPosition) => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
        const data = await response.json();
        if (data.address) {
          setLocation({
            city: data.address.city || data.address.town || data.address.village,
            country: data.address.country
          });
        } else {
          setError('Could not determine location');
        }
      } catch (err) {
        setError('Failed to fetch location data');
      }
    };

    const onError = (err: GeolocationPositionError) => {
      setError(err.message);
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return { location, error };
};
