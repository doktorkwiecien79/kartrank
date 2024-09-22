import { db } from '@/db';
import { comment } from '@/db/schema';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, parentId, message, page } = req.body;

    if (!name || !message || !page) {
      return res.status(400).json({ error: 'Nick and message are required.' });
    }

    try {
      await db.insert(comment).values({ name, parentId, message, page });
      res.status(201).json({ message: 'Comment added successfully. '});
    }
    catch (err) {
      console.log(error);
      res.status(500).json({ error: 'Error adding comment' });
    }
  }
  else if (req.method === 'GET') {
    
  }
  else {
    res.status(405).json({ error: 'Method is not allowed. '});
  }
}