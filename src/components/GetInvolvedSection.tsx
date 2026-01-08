import { UserPlusIcon, LeafIcon, HandshakeIcon } from 'lucide-react';
import { useJoinModal } from '../context/JoinModalContext';
import { useDonationModal } from '../context/DonationModalContext';

export function GetInvolvedSection() {
  const { openJoinModal } = useJoinModal();
  const { openDonationModal } = useDonationModal();

  return <section id="get-involved" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-green-100 dark:from-gray-900 dark:to-gray-800">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-purple-700 dark:text-purple-400">
        Get Involved
      </h2>
      <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12">
        Join our movement to create a greener Kenya. There are many ways you
        can contribute to the Green Scout initiative.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-200 dark:bg-purple-900/40 mb-6 transform transition-transform hover:scale-110">
            <UserPlusIcon className="w-8 h-8 text-purple-700 dark:text-purple-400" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            Volunteer / Join
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Become a Green Scout or volunteer your time and skills to help us
            plant more trees and educate communities about environmental
            conservation.
          </p>
          <button
            onClick={() => openJoinModal('join-the-movement')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:opacity-90 transition-all rounded-lg font-medium w-full"
          >
            Join Green Scout
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-200 dark:bg-green-900/40 mb-6 transform transition-transform hover:scale-110">
            <LeafIcon className="w-8 h-8 text-green-700 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            Donate a Tree
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Sponsor a tree to be planted in a school or community. You can
            dedicate it to someone special and receive updates on its growth
            and impact.
          </p>
          <button
            onClick={() => openDonationModal()}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white hover:opacity-90 transition-all rounded-lg font-medium w-full"
          >
            Donate Now
          </button>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-200 dark:bg-green-900/40 mb-6 transform transition-transform hover:scale-110">
            <HandshakeIcon className="w-8 h-8 text-green-700 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
            Partner With Us
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Organizations, schools, and businesses can partner with Green
            Scout to create sustainable environmental initiatives and
            corporate social responsibility programs.
          </p>
          <button
            onClick={() => openJoinModal('partner-form')}
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-800 text-white hover:opacity-90 transition-all rounded-lg font-medium w-full"
          >
            Become a Partner
          </button>
        </div>
      </div>
    </div>
  </section>;
}
