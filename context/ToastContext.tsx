import React, { createContext, useContext, useRef, useState, useCallback } from 'react';
import { Animated, Text, View } from 'react-native';

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'warning') => void;
}

const ToastContext = createContext<ToastContextType>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'warning'; key: number } | null>(null);
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(150)).current;

  const showToast = useCallback((message: string, type: 'success' | 'warning' = 'success') => {
    const key = Date.now();
    setToast({ message, type, key });
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.timing(translateX, { toValue: 150, duration: 300, useNativeDriver: true }),
      ]).start(() => setToast(null));
    }, 2500);
  }, [opacity, translateX]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            right: 20,
            backgroundColor: '#1F2937',
            borderRadius: 50,
            paddingVertical: 12,
            paddingHorizontal: 20,
            zIndex: 999,
            opacity,
            transform: [{ translateX }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text className={`text-white font-bold text-sm ${toast.type === 'success' ? 'border-l-4 border-green-500' : 'border-l-4 border-yellow-500'}`}>
            {toast.type === 'success' ? '✅' : '⚠️'} {toast.message}
          </Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};