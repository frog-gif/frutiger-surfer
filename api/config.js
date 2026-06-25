export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 's-maxage=3600');
  res.send(`
    window.ENV_SUPABASE_URL = "${process.env.SUPABASE_URL || ''}";
    window.ENV_SUPABASE_ANON = "${process.env.SUPABASE_ANON_KEY || ''}";
  `);
}
