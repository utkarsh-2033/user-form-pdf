

export default function Footer() {
  return (
    <footer className="bg-white border-t py-6 shadow-md">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center px-6">
        <p className="text-sm text-gray-600 mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} PDF Generator. All rights reserved.
        </p> 
      </div>
    </footer>
  );
}
