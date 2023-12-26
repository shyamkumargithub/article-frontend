
import axios from 'axios';
import { APIBASE_URL } from '../constants/apiUrl';
export const uploadImage=async(file)=>{


    // create a new FormData object and append the file to it
    const formData = {};
    formData["myImage"]= file;
    console.log("===============image  form data", formData);

    let imgUrl=null
    // make a POST request to the File Upload API with the FormData object and Rapid API headers
   await axios
     .post(APIBASE_URL + "/uploadImage", formData, {
       headers: {
         "Content-Type": "multipart/form-data",
       },
     })
     .then((response) => {
       // handle the response
       console.log("image upload", response.data);
       imgUrl=response.data.url
     })
     .catch((error) => {
       // handle errors
     
       console.log("image error", error);
     });
    
     return imgUrl

}