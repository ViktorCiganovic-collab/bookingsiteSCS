import './styling/App.css';
import backgroundVideo from './assets/background.mp4'
import './styling/Main.css';

function App() {
  return (
    <>
      <div className="video-container">
        <video autoPlay muted loop playsInline className="bg-video">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay">
          <h1>Welcome to Scandinavian Certificate Services</h1>
        </div>
      </div>
    </>
  )
}

export default App

