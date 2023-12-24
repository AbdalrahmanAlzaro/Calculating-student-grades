import { useState } from "react";
import "./App.css"; // Make sure your CSS file contains the styles for the 'aa' class
import Form from "./components/Form";
import Table from './components/Table'
import videoFile from "./assets/pexels-mikhail-nilov-6981411 (1080p).mp4";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="aa w-full h-screen p-4 relative">
      <video autoPlay loop muted className="video-bg absolute inset-0 w-full h-[160vh] object-cover">
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Form />
      <Table/>
    </div>
  );
}

export default App;
