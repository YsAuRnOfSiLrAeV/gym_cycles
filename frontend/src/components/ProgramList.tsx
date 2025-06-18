import { Link } from 'react-router-dom';

const programs = [
  {
    id: 1,
    title: "Strength Cycle (8 weeks)",
    image: "/powlif_adv.png",
    description:
      "A strength cycle for a powerlifter that is suitable for athletes at the II-KMS level, since it was tested on athletes of that level and has proven to be effective. The program uses wave periodization with a gradual increase in training intensity. The cycle is designed for people who have a high level of exercise execution, so some adjustments are permitted during the implementation of this mesocycle. The athlete must have good flexibility, correct joint angles, and overall technique must be at a high level.",
    category: "Intermediate",
    type: "strength"
  },
  {
    id: 2,
    title: "Hypertrophy Cycle (8 weeks)",
    image: "/hypertr_mid.png",
    description:
      'This hypertrophy cycle is designed for intermediate-level athletes who aim to effectively increase muscle cross-sectional area. The program is oriented toward athletes who have 1-3 years of gym training experience, adhere to a regimen, properly dose loads and nutrition, and have the desire to increase muscle mass. The cycle is built using wave periodization and a "full-body" system. Preference is given to basic exercises, however there are also isolation exercises designed to add load to individual muscle groups.',
    category: "Intermediate",
    type: "hypertrophy"
  },
];

export default function ProgramList() {
  return (
    <div className="flex-1 bg-[#eeeeee] border-t-12 border-[#D0D0D0]">
      <div className="flex flex-col">
        {programs.map((program) => (
          <div
            key={program.id}
            className="group relative flex flex-col rounded-xl hover:shadow-lg mt-8 lg:mx-8 bg-white transition-shadow"
          >
            <h2 className="text-2xl font-poppins font-semibold px-6 pt-6">
              {program.title}
            </h2>

            <span className="inline-block w-fit mt-2 text-sm text-[#666666] bg-[#e9e9e9] px-3 py-1 rounded ml-6">
              {program.category}
            </span>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 p-6 pt-4">
              <img
                src={program.image}
                alt={program.title}
                className="w-full lg:w-60 h-60 object-cover rounded"
              />

              <p className="text-base font-thin text-black">
                {program.description}
              </p>
            </div>

            <Link
              to={`/${program.type}`}
              className="w-fit mt-4 mb-6 ml-6 lg:mt-0 lg:mb-0 lg:ml-0 lg:absolute lg:bottom-4 lg:right-6 bg-[#7B4B3A] text-white font-poppins text-base px-5 py-2.5 rounded transition duration-300 ease-in-out lg:opacity-0 lg:scale-95 group-hover:opacity-100 group-hover:scale-100"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
