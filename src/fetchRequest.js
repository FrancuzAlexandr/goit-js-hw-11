import axios from 'axios';

export class PixabayAPI {
    
    constructor() {
     this.page = 1;
      this.query = null;
      this.baseURL = 'https://pixabay.com/api/';
    }

   fetchGallery() {
      return  axios.get(`${this.baseURL}`, {
        params: {
            key: '31188352-46a7e6bf452f5b6a9df0581a7',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: this.page,
            per_page: 40,
            q: this.query,
          },
      });
    }
  }


 