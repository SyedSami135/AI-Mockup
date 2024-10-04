"use client";
import { useRouter } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';

const Start = () => {
    const router= useRouter();
  return (
    <Button size="lg" onClick={() => router.push(`/dashboard/`)}>Start Free Trial</Button>
  )
}

export default Start