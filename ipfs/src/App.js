import './App.css';
import {useState} from 'react';
import axios from 'axios';

function App() {
  const [fileImg, setFileImg] = useState(null);
  console.log(process.env.REACT_APP_PINATA_API_KEY)
  const sendFileToIPFS = async (e) => {

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
                alert(response.data.IpfsHash)
            }).catch(function (error) {
                alert(error)
            });
  //Take a look at your Pinata Pinned section, you will see a new file added to you list.   
    }
  }
  return (
    <div className="App">
      <form onSubmit={sendFileToIPFS}>
        <input type="file" onChange={(e) =>setFileImg(e.target.files[0])} required />
        <button type='submit' >Mint NFT</button>            
      </form>
    </div>
  );
}

export default App;
