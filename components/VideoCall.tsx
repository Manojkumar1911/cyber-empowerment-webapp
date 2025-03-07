// components/VideoCall.tsx
import { useState, useEffect } from 'react';
//import AlertBox from './AlertBox';
import { Button } from '../components/ui/button';
import AlertBox from './AlertBox';

const VideoCall = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isBeingRecorded, setIsBeingRecorded] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);

  useEffect(() => {
    const detectRecording = () => {
      const randomDetection = Math.random() < 0.1;
      setIsBeingRecorded(randomDetection);
    };

    const interval = setInterval(detectRecording, 5000);
    return () => clearInterval(interval);
  }, []);

  const toggleCamera = async () => {
    try {
      await fetch('/api/camera/restrict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restrictionLevel: isCameraOn ? 'full' : 'none' }),
      });
      setIsCameraOn(!isCameraOn);
    } catch (error) {
      console.error('Failed to toggle camera:', error);
    }
  };

  return (
    <div>
      {isBeingRecorded && <AlertBox message='Warning: Your video call is being recorded!' />}
      <video autoPlay />
      <Button onClick={() => setIsCallActive(!isCallActive)}>
        {isCallActive ? 'End Call' : 'Start Secure Call'}
      </Button>
      <Button onClick={toggleCamera}>{isCameraOn ? 'Disable Camera' : 'Enable Camera'}</Button>
    </div>
  );
};

export default VideoCall;