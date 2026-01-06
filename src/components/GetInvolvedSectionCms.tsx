import { useEffect, useState } from 'react';
import {
  UserPlusIcon,
  LeafIcon,
  HandshakeIcon,
  TreeDeciduousIcon,
  HeartIcon,
  BookOpenIcon,
  DollarSignIcon,
  SchoolIcon
} from 'lucide-react';
import { fetchSanity } from '../cms/sanityRest';
import { useJoinModal } from '../context/JoinModalContext';
import { useDonationModal } from '../context/DonationModalContext';

interface InvolvementOption {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  colorTheme: 'purple' | 'green';
}

interface GetInvolvedBlock {
  _type: 'blockGetInvolved';
  title: string;
  subtitle: string;
  options: InvolvementOption[];
}

// Icon mapping
const iconMap: Record<string, any> = {
  UserPlus: UserPlusIcon,
  Leaf: LeafIcon,
  Handshake: HandshakeIcon,
  TreeDeciduous: TreeDeciduousIcon,
  Heart: HeartIcon,
  BookOpen: BookOpenIcon,
  DollarSign: DollarSignIcon,
  School: SchoolIcon
};

export function GetInvolvedSectionCms() {
  const [block, setBlock] = useState<GetInvolvedBlock | null>(null);
  const [loading, setLoading] = useState(true);
  const { openJoinModal } = useJoinModal();
  const { openDonationModal } = useDonationModal();

  useEffect(() => {
    // Try multiple slug variations to match whatever format is used in Sanity
    const tryFetchPage = async () => {
      const slugVariations = [
        '/get-involved',
        'get-involved',
        '/get-involved/',
        'Get Involved'
      ];

      for (const slugVar of slugVariations) {
        const data = await fetchSanity<any>(
          `*[_type == "page" && slug.current == $slug][0]{
            _id,
            title,
            "slugText": slug.current,
            content[]{
              _type,
              title,
              subtitle,
              options
            }
          }`,
          { slug: slugVar }
        );

        if (data) {
          const getInvolvedBlock = data?.content?.find((block: any) => block._type === 'blockGetInvolved');

          if (getInvolvedBlock) {
            setBlock(getInvolvedBlock);
          }
          setLoading(false);
          return;
        }
      }

      // If no page found with any slug variation, just show fallback content
      setLoading(false);
    };

    tryFetchPage();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-green-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-gray-600 dark:text-gray-400">Loading...</div>
        </div>
      </section>
    );
  }

  // Fallback to hardcoded content if no CMS data
  const defaultOptions: InvolvementOption[] = [
    {
      icon: 'UserPlus',
      title: 'Volunteer / Join',
      description: 'Become a Green Scout or volunteer your time and skills to help us plant more trees and educate communities about environmental conservation.',
      buttonText: 'Join Green Scout',
      buttonLink: '/contact',
      colorTheme: 'purple'
    },
    {
      icon: 'Leaf',
      title: 'Donate a Tree',
      description: 'Sponsor a tree to be planted in a school or community. You can dedicate it to someone special and receive updates on its growth and impact.',
      buttonText: 'Donate Now',
      buttonLink: '/donate',
      colorTheme: 'green'
    },
    {
      icon: 'Handshake',
      title: 'Partner With Us',
      description: 'Organizations, schools, and businesses can partner with Green Scout to create sustainable environmental initiatives and corporate social responsibility programs.',
      buttonText: 'Become a Partner',
      buttonLink: '/contact',
      colorTheme: 'green'
    }
  ];

  const title = block?.title || 'Get Involved';
  const subtitle = block?.subtitle || 'Join our movement to create a greener Kenya. There are many ways you can contribute to the Green Scout initiative.';
  const options = block?.options || defaultOptions;

  return (
    <section id="get-involved" className="py-20 px-4 md:px-8 bg-gradient-to-b from-white to-green-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-purple-700 dark:text-purple-400">
          {title}
        </h2>
        <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12">
          {subtitle}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {options.map((option, index) => {
            const Icon = iconMap[option.icon] || UserPlusIcon;
            const isPurple = option.colorTheme === 'purple';
            const bgColor = isPurple ? 'bg-purple-200' : 'bg-green-200';
            const iconColor = isPurple ? 'text-purple-700' : 'text-green-700';
            const gradientColors = isPurple
              ? 'from-purple-600 to-purple-800'
              : 'from-green-600 to-green-800';

            const isJoinButton = option.buttonText.toLowerCase().includes('join');
            const isPartnerButton = option.buttonText.toLowerCase().includes('partner');
            const isDonateButton = option.buttonText.toLowerCase().includes('donate');
            const isModalButton = isJoinButton || isPartnerButton || isDonateButton;

            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 p-6 text-center hover:shadow-xl dark:hover:shadow-gray-900 transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${bgColor} dark:${bgColor.replace('200', '900/40')} mb-6 transform transition-transform hover:scale-110`}>
                  <Icon className={`w-8 h-8 ${iconColor} dark:${iconColor.replace('700', '400')}`} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {option.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {option.description}
                </p>
                {isModalButton ? (
                  <button
                    onClick={() => {
                      if (isDonateButton) {
                        openDonationModal();
                      } else {
                        const id = isPartnerButton ? 'partner-form' : 'volunteer-form';
                        openJoinModal(id);
                      }
                    }}
                    className={`inline-block px-6 py-3 bg-gradient-to-r ${gradientColors} text-white hover:opacity-90 transition-all rounded-lg font-medium w-full`}
                  >
                    {option.buttonText}
                  </button>
                ) : (
                  <a
                    href={option.buttonLink}
                    className={`inline-block px-6 py-3 bg-gradient-to-r ${gradientColors} text-white hover:opacity-90 transition-all rounded-lg font-medium w-full`}
                  >
                    {option.buttonText}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
