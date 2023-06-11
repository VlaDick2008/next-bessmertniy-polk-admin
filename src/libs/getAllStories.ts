import axios from 'axios';

export default async function getStoriesCount() {
  let res;
  try {
    res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/all_stories`);
  } catch (err) {
    return;
  }

  return res.data;
}
