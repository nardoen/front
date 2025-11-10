import React, { createContext, useContext, useState, useEffect } from 'react';
import authAxios from '../api/authAxios';

const OffDayContext = createContext();

export const useOffDay = () => {
  const context = useContext(OffDayContext);
  if (!context) {
    throw new Error('useOffDay must be used within an OffDayProvider');
  }
  return context;
};

export const OffDayProvider = ({ children }) => {
  const [offDayInfo, setOffDayInfo] = useState(null);
  const [showOffDayNotification, setShowOffDayNotification] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check for off-day status
  const checkOffDay = async () => {
    try {
      const response = await authAxios.get('/api/offday/');
      if (response.data && response.data.is_off_day && response.data.off_days && response.data.off_days.length > 0) {
        setOffDayInfo({
          isOffDay: response.data.is_off_day,
          offDays: response.data.off_days
        });
        setShowOffDayNotification(true);
      } else {
        setOffDayInfo(null);
        setShowOffDayNotification(false);
      }
    } catch (error) {
      console.error('Error checking off-day status:', error);
      setOffDayInfo(null);
      setShowOffDayNotification(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOffDay();
  }, []);

  // Helper function to check if a specific date is an off-day
  const isOffDay = (date) => {
    if (!offDayInfo || !offDayInfo.offDays) return false;
    
    const checkDate = new Date(date);
    checkDate.setHours(0, 0, 0, 0);
    
    return offDayInfo.offDays.some(offDay => {
      const startDate = new Date(offDay.start_date);
      const endDate = new Date(offDay.end_date);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);
      
      return checkDate >= startDate && checkDate <= endDate;
    });
  };

  // Helper function to get all off-day dates as an array
  const getOffDayDates = () => {
    if (!offDayInfo || !offDayInfo.offDays) return [];
    
    const offDates = [];
    offDayInfo.offDays.forEach(offDay => {
      const startDate = new Date(offDay.start_date);
      const endDate = new Date(offDay.end_date);
      
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        offDates.push(new Date(d));
      }
    });
    
    return offDates;
  };

  const handleCloseOffDayNotification = () => {
    setShowOffDayNotification(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const value = {
    offDayInfo,
    showOffDayNotification,
    loading,
    isOffDay,
    getOffDayDates,
    handleCloseOffDayNotification,
    formatDate,
    checkOffDay // Allow manual refresh if needed
  };

  return (
    <OffDayContext.Provider value={value}>
      {children}
    </OffDayContext.Provider>
  );
};

export default OffDayContext;