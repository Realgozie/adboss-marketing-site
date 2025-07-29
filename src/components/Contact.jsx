export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-white text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
        <p className="text-gray-600 mb-2">Email us at:</p>
        <p className="text-gray-700">
          <a
            href="mailto:info.adboss@gmail.com"
            className="text-blue-600 underline"
          >
            info.adboss@gmail.com
          </a>
        </p>
        <p className="text-gray-700 mt-1">
          <a href="mailto:info@adboss.com" className="text-blue-600 underline">
            info@adboss.com
          </a>
        </p>
      </div>
    </section>
  );
}
