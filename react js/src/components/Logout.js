import axios from 'axios';
import React from 'react'

function Logout() {

    axios.post('http://192.168.2.236:8000/logout/')
      // {
      //   headers: {
      // "Cookie":"e4iaNdTVw04XgrVz1SHvqkGbgf5p3FN8ioqSLtNU6rsBkvKsdKU4IRdmTGs0XQjk",
      //      'X-CSRFTOKEN': "e4iaNdTVw04XgrVz1SHvqkGbgf5p3FN8ioqSLtNU6rsBkvKsdKU4IRdmTGs0XQjk"
      //   }
      // }

      .then((res) => {
        console.log(res);
         console.log(res.data);
      });
  return (
    <div>
    
    </div>
  )
}

export default Logout
