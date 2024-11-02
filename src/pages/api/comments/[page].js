import { db } from '@/db';
import { comment } from '@/db/schema';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { page } = req.query;

    try {
      const comments = await db.select().from(comment).where(comment.page.eq(page));
      res.status(200).json(comments);
    }
    catch {
      res.status(500).json({ error: 'Error fetching comments' });
    }
  }
  else {
    res.status(405).json({ error: 'Method is not allowed. '});
  }
}