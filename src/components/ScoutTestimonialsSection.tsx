import React from 'react';
export function ScoutTestimonialsSection() {
  const testimonials = [{
    quote: 'Being a Green Scout changed how I see the world. I used to think environmental problems were too big for me to solve, but now I know that every tree I plant makes a difference.',
    name: 'David Maina',
    age: 14,
    level: 'Sapling Scout',
    school: 'Nakuru Boys High School',
    image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }, {
    quote: "I've learned so much about Kenya's native trees and how they support wildlife. My favorite part is seeing birds return to our school garden that we planted last year.",
    name: 'Faith Wanjiku',
    age: 10,
    level: 'Seedling Scout',
    school: 'Nairobi Primary School',
    image: 'https://images.unsplash.com/photo-1628191139360-4083564d03fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }, {
    quote: "As a Forest Guardian, I've had the opportunity to mentor younger scouts and lead community projects. The leadership skills I've gained have helped me in school and beyond.",
    name: 'Joseph Ochieng',
    age: 17,
    level: 'Forest Guardian',
    school: 'Kisumu High School',
    image: 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }];
  return <section className="py-20 px-4 md:px-8 bg-green-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-800">
            In Their Own Words
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Hear directly from our Green Scouts about their experiences,
            challenges, and the impact the program has had on their lives and
            communities.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
              <div className="h-64 overflow-hidden">
                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                  <p className="text-gray-700 italic mb-6">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">
                    {testimonial.name}
                  </h3>
                  <p className="text-purple-700">
                    {testimonial.level}, Age {testimonial.age}
                  </p>
                  <p className="text-gray-600 text-sm">{testimonial.school}</p>
                </div>
              </div>
            </div>)}
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 italic">
            "The greatest reward as a Scout Leader is watching these young
            people discover their power to create positive change. Their
            enthusiasm and commitment give me hope for Kenya's future."
          </p>
          <p className="mt-4 font-medium text-gray-900">
            — Elizabeth Mutua, Scout Leader, Mombasa County
          </p>
        </div>
      </div>
    </section>;
}