import axios from 'axios';

export default async function getUnapprovedStories() {
  const res = await axios.get('http://localhost:3000/api/admin/approve_story');
  if (res.status === 500) throw new Error('Ашибка!!!');

  return res.data;
}
