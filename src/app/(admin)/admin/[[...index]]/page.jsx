'use client';
import { NextStudio } from 'next-sanity/studio';
import config from '../../../../../sanity.config';

export default function AdminPage() {
  return (
    <div style={{ minHeight: '100vh', width: '100%', paddingTop: '80px' }}>
      <NextStudio config={config} />
    </div>
  );
}
