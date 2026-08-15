const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  discountPrice: { 
    type: Number 
  },
  category: { 
    type: String, 
    required: true 
  },
  stock: { 
    type: Number, 
    default: 1 
  },
  images: [
    { 
      type: String, 
      required: true 
    }
  ],
  sellerName: { 
    type: String, 
    default: 'Market Plus Official' 
  },
  rating: { 
    type: Number, 
    default: 4.5 
  },
  reviewsCount: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Product', productSchema);

