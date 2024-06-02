// import { Inter } from "next/font/google";
import "./globals.css";

  


// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "loquilabs",
  description: "Generated by create next app",
  icons:{
    icon: '/favicon.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>{children}</body>
      {/* <script src="app/audio-chat/volume-meter.js"></script>
	    <script src="../app/audio-chat/audioDetectionConfig.js"></script>
		  <script src="./audioDetection.js"></script>
		  <script src="../app/audio-chat/audioStream.js"></script>

		  <script src="../app/audio-chat/demoAudioRecorder.js"></script>
		  <script src="../app/audio-chat/demoAudioDetectionListeners.js"></script> */}
      </html>
  );
}
