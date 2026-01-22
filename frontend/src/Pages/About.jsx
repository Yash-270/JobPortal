export const About = () => {
  return (
    <div className="bg-white min-h-screen">

      {/* INTRO */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-blue-600">
          About JobPortal
        </h1>
        <p className="text-gray-600 mt-4">
          JobPortal is built to connect job seekers with the right opportunities.
        </p>
      </section>

      {/* MISSION */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
          alt="Team work"
          className="rounded-xl shadow-md w-full"
        />

        <div>
          <h2 className="text-2xl font-bold mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600">
            We aim to simplify hiring and job searching by providing
            a clean, fast and transparent platform for everyone.
          </p>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-3 gap-6">

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-blue-600">
              For Candidates
            </h3>
            <p className="text-gray-600 mt-2">
              Discover jobs, apply easily and manage your profile.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-blue-600">
              For Recruiters
            </h3>
            <p className="text-gray-600 mt-2">
              Post jobs and review applications effortlessly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold text-blue-600">
              Secure Platform
            </h3>
            <p className="text-gray-600 mt-2">
              Your data is safe and protected with us.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
