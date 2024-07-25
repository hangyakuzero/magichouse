// pages/api/user.js
import dbConnect from "@/lib/dbConnect";
import { User } from "@/model/User";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      await dbConnect();
      const user = await User.findOne({ email });
      if (user) {
        return res.status(200).json({ id: user._id.toString() });
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error("Error: ", error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
