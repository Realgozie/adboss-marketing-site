import footerImage from "../assets/footer-1.jpg"; // ✅ Make sure image exists in src/assets

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-8 pb-10 text-center">
      {/* Image Section */}
      <div className="flex justify-center mb-6">
        <img
          src={footerImage}
          alt="AdBOSS Footer Visual"
          className="rounded-lg shadow-md w-full max-w-md"
        />
      </div>

      {/* Footer Text Content */}
      <p className="text-sm mb-2">
        &copy; {new Date().getFullYear()} AdBOSS. All rights reserved.
      </p>
      <p className="text-sm">
        Email us at:{" "}
        <a
          href="mailto:info.adboss@gmail.com"
          className="underline text-blue-400"
        >
          info.adboss@gmail.com
        </a>{" "}
        |{" "}
        <a href="mailto:info@adboss.com" className="underline text-blue-400">
          info@adboss.com
        </a>
      </p>
    </footer>
  );
}
