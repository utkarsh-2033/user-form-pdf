'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { generatePdf } from '../utils/generatepdf';
import { saveAs } from 'file-saver';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiFileText, FiDownload } from 'react-icons/fi';

export default function Form() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    description: '',
  });
  useEffect(() => {
      const data = sessionStorage.getItem('formData');
      if (data) setFormData(JSON.parse(data));
    }, []);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name) errs.name = 'Required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid Email';
    if (!formData.phone || formData.phone.length < 10) errs.phone = 'Phone must be 10+ digits';
    if (!formData.position) errs.position = 'Required';
    if (!formData.description) errs.description = 'Required';
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleView = () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
    } else {
    sessionStorage.setItem('formData', JSON.stringify(formData));
    router.push('/preview');
    }
  };

  const handleDownload = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
    } else {
      const pdfBytes = await generatePdf(formData);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, 'user-details.pdf');
    }
  };

  const handleReset = () => {
  setFormData({
    name: '',
    email: '',
    phone: '',
    position: '',
    description: '',
  });
  setErrors({});
  sessionStorage.removeItem('formData');
};

  const inputStyles = `flex items-center gap-3 border border-gray-300 rounded-lg  p-3 shadow-lg focus-within:ring-2 ring-green-400`;

  return (
    <div className="min-h-screen pt-8 text-black flex flex-col items-center justify-center bg-white px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add Your details</h1>
      <div className="space-y-4 w-full max-w-md">
        <div className={inputStyles}>
          <FiUser />
          <div className="flex-1">
            <label htmlFor="name" className="font-semibold block">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className="flex-1 outline-none"
            />
            {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
          </div>
        </div>
        <div className={inputStyles}>
          <FiMail />
          <div className="flex-1">
            <label htmlFor="email" className="font-semibold block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. Johndoe@gmail.com"
              className="flex-1 outline-none"
            />
            {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
          </div>
        </div>
        <div className={inputStyles}>
          <FiPhone />
          <div className="flex-1">
            <label htmlFor="phone" className="font-semibold block">Phone No.</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 8234567890"
              className="flex-1 outline-none"
            />
            {errors.phone && <div className="text-red-600 text-sm mt-1">{errors.phone}</div>}
          </div>
        </div>
        <div className={inputStyles}>
          <FiBriefcase />
          <div className="flex-1">
            <label htmlFor="position" className="font-semibold block">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="e.g. Junior Frontend Developer"
              className="flex-1 outline-none"
            />
            {errors.position && <div className="text-red-600 text-sm mt-1">{errors.position}</div>}
          </div>
        </div>
        <div className={inputStyles}>
          <FiFileText />
          <div className="flex-1">
            <label htmlFor="description" className="font-semibold block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Work experiences"
              className="flex-1 outline-none resize-none"
            />
            {errors.description && <div className="text-red-600 text-sm mt-1">{errors.description}</div>}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={handleView} className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800">View PDF</button>
          <button onClick={handleDownload} className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 flex items-center gap-2">
            <FiDownload /> Download PDF
          </button>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4">
          <button onClick={handleReset} className="bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-800">
            Reset Form
          </button>
        </div>
      </div>
    </div>
  );
}
