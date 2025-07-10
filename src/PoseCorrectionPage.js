import React, { useState, useRef, useEffect } from 'react';
import Navbar from './NavBar';

const PoseCorrection = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    setError(''); 
    
    try {
      if (!videoRef.current) {
        console.error("Video reference is not available");
        setError("Video element not found. Please try refreshing the page.");
        return;
      }
      
      console.log("Requesting camera access...");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      
      console.log("Camera access granted. Setting up video stream...");
      
      streamRef.current = stream;
      
      videoRef.current.srcObject = stream;
      
      const playPromise = new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => {
          console.log("Video metadata loaded");
          videoRef.current.play()
            .then(() => {
              console.log("Video playing successfully");
              resolve();
            })
            .catch(err => {
              console.error("Error playing video:", err);
              setError(`Error playing video: ${err.message}`);
            });
        };
      });
      
      await playPromise;
      setIsCameraOn(true);
      console.log("Camera is now on and ready");
      
    } catch (err) {
      console.error('Error accessing webcam:', err);
      setError(`Camera access error: ${err.message}`);
      setIsCameraOn(false);
    }
  };

  const stopCamera = () => {
    console.log("Attempting to stop camera...");
    if (streamRef.current) {
      const tracks = streamRef.current.getTracks();
      tracks.forEach(track => {
        console.log(`Stopping ${track.kind} track`);
        track.stop();
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
        console.log("Video source cleared");
      }
      
      streamRef.current = null;
      setIsCameraOn(false);
      console.log("Camera stopped successfully");
    } else {
      console.log("No camera stream to stop");
    }
  };

  const captureSnapshot = () => {
    console.log("Attempting to capture snapshot...");
    
    if (!videoRef.current) {
      console.error("Video reference not available for capture");
      setError('Video element not available. Try refreshing the page.');
      return;
    }
    
    if (!canvasRef.current) {
      console.error("Canvas reference not available for capture");
      setError('Canvas element not available. Try refreshing the page.');
      return;
    }
    
    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      if (!video.videoWidth || !video.videoHeight) {
        console.error("Video dimensions are invalid:", video.videoWidth, video.videoHeight);
        setError('Video not properly initialized. Please try again.');
        return;
      }
      
      console.log(`Capturing image with dimensions: ${video.videoWidth}x${video.videoHeight}`);
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageUrl = canvas.toDataURL('image/png');
      console.log("Image captured successfully");
      
      setCapturedImage(imageUrl);
      setFeedback('Your posture looks good! Keep it up!');
      
      stopCamera();
      
    } catch (err) {
      console.error("Error during capture:", err);
      setError(`Capture error: ${err.message}`);
    }
  };

  const handleCaptureClick = () => {
    console.log("Capture button clicked. Camera on:", isCameraOn);
    
    if (!isCameraOn) {
      setCapturedImage(null);
      setFeedback('');
      setTimeout(() => {
        startCamera();
      }, 100);
    } else {
      captureSnapshot();
    }
  };

  useEffect(() => {
    console.log("Component mounted");
    
    return () => {
      console.log("Component unmounting, cleaning up camera");
      stopCamera();
    };
  }, []);

  useEffect(() => {
    console.log("Video ref available:", !!videoRef.current);
    console.log("Canvas ref available:", !!canvasRef.current);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white">
      <Navbar />
      <div className="pt-20 px-6 max-w-2xl mx-auto text-center">
      <h2 className="text-4xl font-bold text-orange-400 mb-8 pt-16">Real-Time Pose Correction</h2>

        <div className="bg-gray-800 p-6 rounded-xl shadow-lg">

          <canvas ref={canvasRef} style={{ display: 'none' }} />
          
          <div className={isCameraOn ? "mb-4" : "hidden"}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="mx-auto mb-4 max-w-full h-auto rounded-lg shadow"
              style={{ width: '100%' }}
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-800 text-white rounded-lg">
              <p>Error: {error}</p>
              <button 
                onClick={() => setError('')}
                className="mt-2 px-2 py-1 bg-red-700 text-white text-sm rounded"
              >
                Dismiss
              </button>
            </div>
          )}

          <button
            onClick={handleCaptureClick}
            className="bg-orange-600 px-5 py-2 text-lg font-semibold rounded-lg shadow-md hover:bg-orange-800 transition"
          >
            {isCameraOn ? 'Capture Pose' : capturedImage ? 'Capture Again' : 'Capture Pose'}
          </button>

          <div className="mt-2 text-sm text-gray-400">
            Camera status: {isCameraOn ? 'On' : 'Off'}
          </div>

          {feedback && (
            <div className="mt-4 p-4 bg-gray-700 text-gray-300 rounded-xl shadow-lg">
              <p>{feedback}</p>
            </div>
          )}

          {capturedImage && (
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-orange-400 mb-4">Captured Pose</h3>
              <img src={capturedImage} alt="Captured Pose" className="mx-auto rounded-lg shadow-lg" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PoseCorrection;