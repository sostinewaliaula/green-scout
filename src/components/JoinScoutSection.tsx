import React from 'react';
import { CheckIcon, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
export function JoinScoutSection() {
  const benefits = ['Learn practical environmental conservation skills', 'Develop leadership and project management abilities', 'Connect with like-minded peers across Kenya', 'Make a tangible impact on your community and environment', 'Enhance your academic profile with meaningful extracurricular activities', 'Gain certificates and recognition for your environmental work'];
  const steps = [{
    number: '01',
    title: 'Apply Online',
    description: 'Fill out a simple application form expressing your interest in becoming a Green Scout.'
  }, {
    number: '02',
    title: 'Attend Orientation',
    description: 'Join an orientation session at your school or community center to learn about the program.'
  }, {
    number: '03',
    title: 'Complete Basic Training',
    description: 'Participate in initial training on environmental concepts and tree planting techniques.'
  }, {
    number: '04',
    title: 'Join Your First Activity',
    description: 'Participate in a tree planting event or workshop to begin your journey as a Green Scout.'
  }];
  return <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-700">
              Become a Green Scout
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Join a community of young environmental leaders making a real
              difference in Kenya. The Green Scout program is open to students
              aged 8-18 who are passionate about creating a sustainable future.
            </p>
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              Benefits of Joining
            </h3>
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, index) => <li key={index} className="flex items-start gap-2">
                  <CheckIcon className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>)}
            </ul>
            <Link to="/get-involved" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-purple-600 text-white rounded-lg font-medium hover:opacity-90 transition-all transform hover:scale-105">
              Apply to Join
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
          <div className="md:w-1/2">
            <div className="bg-gradient-to-br from-green-50 to-purple-50 p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-green-800 mb-6">
                How to Join
              </h3>
              <div className="space-y-6">
                {steps.map((step, index) => <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold flex-shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>)}
              </div>
              <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2">
                  For Schools & Organizations
                </h4>
                <p className="text-gray-700 mb-4">
                  Interested in establishing a Green Scout program at your
                  school or organization? We provide training, resources, and
                  ongoing support.
                </p>
                <Link to="/get-involved" className="inline-flex items-center text-purple-700 font-medium hover:text-purple-900 transition-colors">
                  Learn more about partnerships
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
}