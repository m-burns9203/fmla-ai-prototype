import FileUpload from './components/FileUpload';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">FMLA Document Intelligence</h1>
        <p className="text-gray-600 mb-8">Upload FMLA forms for AI-powered extraction</p>
        
        <div className="bg-white rounded-lg shadow p-6">
          <FileUpload />
        </div>
      </div>
    </main>
  );
}