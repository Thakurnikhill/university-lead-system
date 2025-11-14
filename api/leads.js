// api/leads.js
module.exports = (req, res) => {
  if (req.method === 'GET') {
    // return leads
    res.status(200).json([{ id: 1, name: 'Test University' }]);
  } else if (req.method === 'POST') {
    // parse body (Vercel gives raw body — for JSON use JSON.parse on buffer)
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = body ? JSON.parse(body) : {};
      // handle data...
      res.status(201).json({ success: true, payload: data });
    });
  } else res.status(405).end();
};
