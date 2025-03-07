// **Peer Support Model**
// File: backend/models/PeerMessage.ts
import mongoose from 'mongoose';

const PeerMessageSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('PeerMessage', PeerMessageSchema);