export default function Author() {
    return (
      <div className="flex-1 bg-[#eeeeee] border-t-12 border-[#D0D0D0]">
        <div className="relative rounded-xl mt-8 lg:mx-8 bg-white p-4 lg:p-8 text-gray-800 text-[17px] leading-relaxed">
          <h1 className="text-3xl font-poppins font-semibold mb-8">About author</h1>
  
          <div className="lg:hidden flex justify-center mb-6">
            <img
              src="author.jpg"
              alt="Author photo"
              className="w-48 h-48 object-cover rounded-xl shadow"
            />
          </div>
  
          <img
            src="author.jpg"
            alt="Author photo"
            className="hidden lg:block w-60 h-60 object-cover rounded-xl shadow mb-4 ml-8 float-right"
          />
  
          <div className="clear-none">
            <p className="mb-4">
              Hello! My name is Yaroslav, I am the founder of <strong>GymCycles</strong> and a specialist in strength training.
            </p>
  
            <p className="mb-4">
              I have 8 clients who have successfully progressed or are progressing in strength sports under my mentorship.
            </p>
  
            <p className="mb-4">
              The materials on this website, as well as the website itself, are my development.
            </p>
  
            <div>
              <p className="font-poppins font-semibold mb-2">My achievements at 17 years old:</p>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Candidate Master of Sports in bench press</li>
                <li>Candidate Master of Sports in deadlift</li>
                <li>First rank in squat</li>
                <li>Candidate Master of Sports in strict bicep curl</li>
              </ul>
            </div>
  
            <p>
              For questions about cycles:{" "}
              <a
                href="mailto:yaroslav.kalinichenko@auk.edu.ua"
                className="text-[#4E342E] underline hover:text-[#7B4B3A] transition-colors"
              >
                yaroslav.kalinichenko@auk.edu.ua
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
  