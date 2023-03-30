import './App.css';
import {useState} from 'react';
import axios from 'axios';

function App() {

  const [fileImg, setFileImg] = useState(null);
  const [hash, setHash] = useState('');
  console.log(process.env.REACT_APP_PINATA_API_KEY);

  const sendFileToIPFS = async (event) => {
    event.preventDefault();
    if (fileImg) {
      console.log(fileImg);
            const formData = new FormData();
            formData.append('file', fileImg);
            const  url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

            axios.post(url, 
              formData,
              {
                headers: {
                  'Content-Type': `multipart/form-data; boundary= ${formData._boundary}`,
                  'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                  'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
                }
              }
              ).then(function (response) {
                alert(response.data.IpfsHash);
                setHash(response.data.IpfsHash);
                console.log(hash);
            }).catch(function (error) {
                alert(error)
            });
    }
  }
  return (
    <div className="App">
      <h1>{hash}</h1>
      <form onSubmit={sendFileToIPFS}>
        <input type="file" onChange={(event) =>setFileImg(event.target.files[0])} required />
        <button type="submit" >Send</button>            
      </form>
    </div>
  );
}

export default App;
