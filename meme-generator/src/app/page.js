import Dashboard from '@/app/Dashboard/page'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className='mb-10 text-5xl font-black'>MEME GENERATOR</h1>
      <Dashboard />
    </main>
  );
}
