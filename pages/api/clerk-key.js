export default function handler(req, res) {
    if (req.method === 'GET') {
        const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
        if (!clerkKey) {
            return res.status(500).json({ error: 'CLERK_PUBLISHABLE_KEY is not set.' });
        }
        res.status(200).json({ key: clerkKey });
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
