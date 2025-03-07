// hooks/useCameraDetection.ts
import { useState, useEffect } from 'react';
import { useToast } from "../../../components/ui/use-toast";

const useCameraDetection = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkCameraStatus = async () => {
      try {
        const response = await fetch('/api/camera');
        const data = await response.json();
        setIsCameraActive(data.isActive);

        if (data.isActive) {
          toast("Camera detected!", {
            description: "Your camera is being accessed.",
          });
          
        }
      } catch (error) {
        console.error('Failed to check camera status:', error);
      }
    };

    checkCameraStatus();
    navigator.mediaDevices.ondevicechange = checkCameraStatus;
    const interval = setInterval(checkCameraStatus, 30000);

    return () => clearInterval(interval);
  }, [toast]);

  return isCameraActive;
};

export default useCameraDetection;
