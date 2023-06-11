import axios from 'axios';

export default async function getUnapprovedStories() {
  let res;
  try {
    res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/approve_story`);
  } catch (err) {
    return;
  }

  return res.data;
}
