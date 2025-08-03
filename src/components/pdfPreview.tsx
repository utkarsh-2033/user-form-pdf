'use client';
import { generatePdf } from '../utils/generatepdf';
import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import { useRouter } from 'next/navigation';
import { FiDownload } from 'react-icons/fi';

export default function PdfPreview() {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    position: string;
    description: string;
  } | null>(null);
  const [url, setUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    const data = sessionStorage.getItem('formData');
    if (data) setFormData(JSON.parse(data));
  }, []);

  useEffect(() => {
    let blobUrl: string;
    const loadPdf = async () => {
      if (!formData) return;
      const pdfBytes = await generatePdf(formData);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      blobUrl = URL.createObjectURL(blob);
      setUrl(blobUrl);
    };
    loadPdf();

    // Cleanup blob URL on unmount or when formData changes
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [formData]);

  const handleDownload = async () => {
    if (!formData) return;
    const pdfBytes = await generatePdf(formData);
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    saveAs(blob, 'user-details.pdf');
  };

  return (
    <div className="min-h-screen pt-2 flex flex-col items-center justify-center text-black bg-gray-200 px-4 py-8 relative">
      {/* Back Button Top Left */}
      <button
        onClick={() => router.push('/')}
        className="absolute top-8 left-8 text-xl px-4 py-2 rounded-md border hover:bg-gray-200"
        aria-label="Back"
      >
        &larr;
      </button>

      <div className="bg-white rounded-md shadow-md p-8 w-full max-w-xl border">
        <div className="grid grid-cols-2 gap-y-10 gap-x-8 items-start">
          <div className="font-bold text-xl text-left">Name</div>
          <div className="text-gray-500 text-xl text-left">{formData?.name}</div>

          <div className="font-bold text-xl text-left">Email</div>
          <div className="text-gray-500 text-xl text-left">{formData?.email}</div>

          <div className="font-bold text-xl text-left">Phone Number</div>
          <div className="text-gray-500 text-xl text-left">{formData?.phone}</div>

          <div className="font-bold text-xl text-left">Position</div>
          <div className="text-gray-500 text-xl text-left">{formData?.position}</div>

          <div className="font-bold text-xl text-left">Description</div>
          <div className="text-gray-500 text-xl text-left whitespace-pre-line">{formData?.description}</div>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleDownload}
          className="bg-green-700 text-white px-12 py-2 rounded-md hover:bg-green-800 flex items-center gap-2"
        >
          <FiDownload /> Download PDF
        </button>
      </div>

      {/* PDF Preview */}
      {url && (
        <div className="my-6 w-full max-w-xl">
          <iframe
            src={url}
            width="100%"
            height="500px"
            title="PDF Preview"
            className="border rounded"
          />
        </div>
      )}

    </div>
  );
}
