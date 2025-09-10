import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Cat {
  id: number;
  name: string;
}

export function CatList() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get<Cat[]>('/api/cats').then(response => {
      setCats(response.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ul>
      {cats.map(c => (
        <li key={c.id}>{c.name}</li>
      ))}
    </ul>
  );
}