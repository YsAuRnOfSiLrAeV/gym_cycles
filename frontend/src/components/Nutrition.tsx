export default function Nutrition() {
    return (
      <div className="flex-1 bg-[#eeeeee] border-t-12 border-[#D0D0D0]">
            <div className="relative rounded-xl mt-8 lg:mx-8 bg-white p-4 lg:p-8 text-gray-800 text-[17px] leading-relaxed">
          <h1 className="text-3xl font-poppins font-semibold mb-8">Nutrition</h1>
  
          <p className="mb-4">
            <span className="text-[#8e5c4b] font-bold">Nutrition</span> is one of the key components that not only ensures recovery after training but also creates conditions for adaptations, particularly muscle mass and strength growth. The approach to diet should be rational, systematic, and based on goals, functional state of the body, type of loads, and cycle intensity.
          </p>
  
          <h2 className="text-2xl font-poppins font-semibold mt-6 mb-3">Energy Balance</h2>
          <p className="mb-4">
            The foundation of diet planning is calculating the total daily caloric needs. For muscle mass gain, it's advisable to maintain a positive energy balance within 10-15% of the basic needs. During strength cycles or competition preparation, the energy surplus can be reduced or switched to maintenance mode. When it's necessary to reduce body fat percentage, typically it's <span className="text-[#8e5c4b] font-bold">sufficient</span> to gradually <span className="text-[#8e5c4b] font-bold">reduce the carbohydrate component of the diet</span>. Proteins and fats should preferably remain at a constant level.
          </p>
  
          <h2 className="text-2xl font-poppins font-semibold mt-6 mb-3">Proteins</h2>
        <p className="mb-4">
          The optimal protein amount for athletes engaged in strength sports ranges from <span className="text-[#8e5c4b] font-bold">1.2</span> to <span className="text-[#8e5c4b] font-bold">1.7</span> g per kg of body weight. Preference is given to complete sources: meat, fish, eggs, fermented dairy products.
        </p>
        <p className="mb-4">
          The main function of proteins is structure building: muscle fibers, enzymes, hormones, antibodies. When entering the body, proteins break down into <span className="text-[#8e5c4b] font-bold">amino acids</span>, from which necessary tissues are formed. It's important to remember that excess protein <span className="text-[#8e5c4b] font-bold">is not stored "in reserve"</span> like fats or carbohydrates do. Excess amino acids are deaminated (amino group is removed), and the carbon residue goes to <span className="text-[#8e5c4b] font-bold">gluconeogenesis</span> - glucose formation, which is then either used as energy or, in case of excess, the glucose itself can be converted into fat.
        </p>
        <p className="mb-4">
          Additionally, the small intestine takes a significant portion of amino acids for its own needs: mucosal renewal, immune support, synthesis of local protein structures. Therefore, only part of the consumed protein reaches muscle tissue, and this should be considered when planning the diet.
        </p>
  
          <h2 className="text-2xl font-poppins font-semibold mt-6 mb-3">Carbohydrates</h2>
        <p className="mb-4">
          With sufficient energy consumption, carbohydrates are the main energy source. All carbohydrates - <span className="text-[#8e5c4b] font-bold">regardless of form</span> - ultimately break down into <span className="text-[#8e5c4b] font-bold">glucose</span> during metabolism. Glucose is the main fuel for the body during high-intensity workouts with heavy weights, especially in exercises with low repetitions. Therefore, it's sometimes advisable to consume something <span className="text-[#8e5c4b] font-bold">sweet</span> before training - this helps raise blood glucose levels and provides more resources during heavy sets. In strength disciplines, the diet base should consist of carbohydrates with low and medium glycemic response, while high GI carbohydrates should be consumed around training. Carbohydrates <span className="text-[#8e5c4b] font-bold">are the main regulator of the energy profile</span>: they should be manipulated when transitioning between bulking and cutting phases.
        </p>
  
        <h2 className="text-2xl font-poppins font-semibold mt-6 mb-3">Fats</h2>
        <p className="mb-4">
          It's important to clearly distinguish between "fats" as a macronutrient and "subcutaneous fat" as a form of energy storage. Dietary fats are an important layer of energy, cell structures, and hormonal balance. <span className="text-[#8e5c4b] font-bold">Main functions:</span> membrane construction, sex hormone synthesis, thermoregulation, absorption of fat-soluble vitamins (A, D, E, K).
        </p>
        <p className="mb-4">
          During digestion, fats break down into fatty acids and glycerol, after which they are incorporated into various metabolic pathways. Part is used as energy, part goes to structure synthesis, and only in excess - can be stored as triglycerides in adipose tissue. But this is a completely different stage - the actual accumulation, not the functional use of fats.
        </p>
        <p className="mb-4">
          They should not be reduced below <span className="text-[#8e5c4b] font-bold">0.8 g/kg</span>. Preference is given to unsaturated fats: olive oil, nuts, seeds, fatty fish. Trans fats and excessive consumption of fried foods should be avoided.
        </p>

  
          <h2 className="text-2xl font-poppins font-semibold mt-6 mb-3">Timing and Hydration</h2>
          <p className="mb-4">
            The main task is to ensure uniform intake of macronutrients throughout the day. Water is no less important element. Approximate need is <span className="text-[#8e5c4b] font-bold">30-40 ml/kg</span>. With high intensity - more. <span className="text-[#8e5c4b] font-bold">Salt</span> is recommended <span className="text-[#8e5c4b] font-bold">not to be restricted</span> during active physical exercise.
          </p>
        </div>
      </div>
    );
  }
  