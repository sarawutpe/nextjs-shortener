import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from 'hoc/sessionOptions';

export default withIronSessionApiRoute(async (req, res) => {
  try {
    const { data } = await req.body;
    const user = { auth: true, id: data.id };
    // save session
    req.session.user = user;
    await req.session.save();
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}, sessionOptions);
