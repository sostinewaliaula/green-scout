import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NamedTree {
  name: string;
  namedAfter: string;
  location: string;
  species: string;
  plantedDate: string;
  image: string;
  description: string;
  rank: string;
}

const namedTrees: NamedTree[] = [
  {
  name: "Wangari's Legacy",
  namedAfter: 'Wangari Maathai',
  location: 'Karura Forest, Nairobi',
  species: 'African Olive',
  plantedDate: 'April 22, 2022',
  image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Named after the Nobel laureate environmentalist, this tree has grown 1.5 meters in its first year.',
    rank: 'CEO'
  },
  {
  name: "Sarah's Hope",
  namedAfter: 'Sarah Kimani',
  location: 'Nakuru High School',
  species: 'Acacia',
  plantedDate: 'June 5, 2022',
  image: 'https://images.unsplash.com/photo-1628365254332-f851b69c9eec?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Sarah led her school to plant 100 trees. This acacia symbolizes her leadership.',
    rank: 'Manager'
  },
  {
  name: "Kipchoge's Champion",
  namedAfter: 'Eliud Kipchoge',
  location: 'Eldoret Sports Academy',
  species: 'Cedar',
  plantedDate: 'September 15, 2022',
  image: 'https://images.unsplash.com/photo-1626129919273-33b2829f1d05?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: "This strong cedar represents the endurance and strength of Kenya's marathon champion.",
    rank: 'Senior'
  },
  {
    name: "Green Guardian",
    namedAfter: 'Jane Doe',
    location: 'Mombasa School',
    species: 'Baobab',
    plantedDate: 'March 10, 2023',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Jane inspired her school to join the GreenScout movement.',
    rank: 'Junior'
  },
  {
    name: "Hope Sprout",
    namedAfter: 'John Volunteer',
    location: 'Kisumu Academy',
    species: 'Mango',
    plantedDate: 'May 2, 2023',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'John is a dedicated volunteer who cares for young trees.',
    rank: 'Intern/Volunteer'
  },
  {
    name: "Forest Friend",
    namedAfter: 'Mary W.',
    location: 'Nairobi Primary',
    species: 'Fig',
    plantedDate: 'July 12, 2023',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Mary is a passionate advocate for urban trees.',
    rank: 'Volunteer'
  },
  {
    name: "Eco Star",
    namedAfter: 'Peter N.',
    location: 'Machakos School',
    species: 'Neem',
    plantedDate: 'August 8, 2023',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Peter has helped plant over 200 trees.',
    rank: 'Volunteer'
  },
  {
    name: "Sapling Leader",
    namedAfter: 'Lucy K.',
    location: 'Eldoret Academy',
    species: 'Pine',
    plantedDate: 'September 1, 2023',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Lucy leads sapling care teams.',
    rank: 'Volunteer'
  },
  // Adding more members to reach ~60
  {
    name: "Green Pioneer",
    namedAfter: 'David M.',
    location: 'Thika School',
    species: 'Jacaranda',
    plantedDate: 'October 15, 2023',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'David pioneered urban tree planting in Thika.',
    rank: 'Volunteer'
  },
  {
    name: "Nature's Voice",
    namedAfter: 'Grace A.',
    location: 'Kakamega Academy',
    species: 'Eucalyptus',
    plantedDate: 'November 3, 2023',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Grace advocates for environmental education.',
    rank: 'Volunteer'
  },
  // Continue with more entries...
  {
    name: "Tree Guardian",
    namedAfter: 'Michael O.',
    location: 'Nyeri School',
    species: 'Cypress',
    plantedDate: 'December 10, 2023',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Michael protects young trees from damage.',
    rank: 'Volunteer'
  },
  {
    name: "Earth Protector",
    namedAfter: 'Faith W.',
    location: 'Kericho Academy',
    species: 'Tea Tree',
    plantedDate: 'January 5, 2024',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Faith promotes sustainable tea farming.',
    rank: 'Volunteer'
  },
  {
    name: "Green Innovator",
    namedAfter: 'James K.',
    location: 'Kisii School',
    species: 'Bamboo',
    plantedDate: 'February 12, 2024',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'James innovates with bamboo planting.',
    rank: 'Volunteer'
  },
  {
    name: "Climate Warrior",
    namedAfter: 'Patricia N.',
    location: 'Embu Academy',
    species: 'Avocado',
    plantedDate: 'March 8, 2024',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Patricia fights climate change through action.',
    rank: 'Volunteer'
  },
  {
    name: "Forest Dreamer",
    namedAfter: 'Robert M.',
    location: 'Meru School',
    species: 'Coffee',
    plantedDate: 'April 20, 2024',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Robert dreams of a greener Meru.',
    rank: 'Volunteer'
  },
  {
    name: "Eco Educator",
    namedAfter: 'Susan W.',
    location: 'Nakuru Academy',
    species: 'Sycamore',
    plantedDate: 'May 15, 2024',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Susan educates others about trees.',
    rank: 'Volunteer'
  },
  {
    name: "Green Mentor",
    namedAfter: 'Thomas O.',
    location: 'Eldoret School',
    species: 'Oak',
    plantedDate: 'June 1, 2024',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Thomas mentors young environmentalists.',
    rank: 'Volunteer'
  },
  {
    name: "Nature's Friend",
    namedAfter: 'Victoria K.',
    location: 'Mombasa Academy',
    species: 'Palm',
    plantedDate: 'July 10, 2024',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Victoria befriends every tree she meets.',
    rank: 'Volunteer'
  },
  {
    name: "Tree Whisperer",
    namedAfter: 'William A.',
    location: 'Kisumu School',
    species: 'Willow',
    plantedDate: 'August 5, 2024',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'William understands tree language.',
    rank: 'Volunteer'
  },
  {
    name: "Green Ambassador",
    namedAfter: 'Zoe M.',
    location: 'Nairobi Academy',
    species: 'Jasmine',
    plantedDate: 'September 12, 2024',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Zoe represents GreenScout globally.',
    rank: 'Volunteer'
  },
  // Adding more members to reach ~60
  {
    name: "Forest Guardian",
    namedAfter: 'Alice B.',
    location: 'Kitale School',
    species: 'Maple',
    plantedDate: 'October 1, 2024',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Alice guards the forest with dedication.',
    rank: 'Volunteer'
  },
  {
    name: "Eco Warrior",
    namedAfter: 'Brian C.',
    location: 'Bungoma Academy',
    species: 'Birch',
    plantedDate: 'October 15, 2024',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Brian fights for environmental justice.',
    rank: 'Volunteer'
  },
  {
    name: "Tree Champion",
    namedAfter: 'Catherine D.',
    location: 'Kakamega School',
    species: 'Cherry',
    plantedDate: 'November 1, 2024',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Catherine champions tree planting.',
    rank: 'Volunteer'
  },
  {
    name: "Green Visionary",
    namedAfter: 'Daniel E.',
    location: 'Eldoret Academy',
    species: 'Elm',
    plantedDate: 'November 15, 2024',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Daniel envisions a greener future.',
    rank: 'Volunteer'
  },
  {
    name: "Nature's Hero",
    namedAfter: 'Emma F.',
    location: 'Nakuru School',
    species: 'Fir',
    plantedDate: 'December 1, 2024',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Emma is a hero for nature.',
    rank: 'Volunteer'
  },
  {
    name: "Forest Protector",
    namedAfter: 'Frank G.',
    location: 'Kisumu Academy',
    species: 'Ginkgo',
    plantedDate: 'December 15, 2024',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Frank protects forests tirelessly.',
    rank: 'Volunteer'
  },
  {
    name: "Green Leader",
    namedAfter: 'Grace H.',
    location: 'Mombasa School',
    species: 'Hickory',
    plantedDate: 'January 1, 2025',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Grace leads green initiatives.',
    rank: 'Volunteer'
  },
  {
    name: "Tree Advocate",
    namedAfter: 'Henry I.',
    location: 'Thika Academy',
    species: 'Ironwood',
    plantedDate: 'January 15, 2025',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Henry advocates for tree rights.',
    rank: 'Volunteer'
  },
  {
    name: "Eco Pioneer",
    namedAfter: 'Irene J.',
    location: 'Nyeri School',
    species: 'Juniper',
    plantedDate: 'February 1, 2025',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Irene pioneers eco-friendly practices.',
    rank: 'Volunteer'
  },
  {
    name: "Green Innovator",
    namedAfter: 'Jack K.',
    location: 'Kericho Academy',
    species: 'Koa',
    plantedDate: 'February 15, 2025',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Jack innovates green solutions.',
    rank: 'Volunteer'
  },
  {
    name: "Forest Friend",
    namedAfter: 'Karen L.',
    location: 'Kisii School',
    species: 'Larch',
    plantedDate: 'March 1, 2025',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Karen befriends every forest.',
    rank: 'Volunteer'
  },
  {
    name: "Tree Guardian",
    namedAfter: 'Larry M.',
    location: 'Embu Academy',
    species: 'Magnolia',
    plantedDate: 'March 15, 2025',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Larry guards trees with care.',
    rank: 'Volunteer'
  },
  {
    name: "Nature's Voice",
    namedAfter: 'Martha N.',
    location: 'Meru School',
    species: 'Nutmeg',
    plantedDate: 'April 1, 2025',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Martha speaks for nature.',
    rank: 'Volunteer'
  },
  {
    name: "Green Warrior",
    namedAfter: 'Nathan O.',
    location: 'Nakuru Academy',
    species: 'Oak',
    plantedDate: 'April 15, 2025',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Nathan wars for green causes.',
    rank: 'Volunteer'
  },
  {
    name: "Forest Champion",
    namedAfter: 'Olivia P.',
    location: 'Eldoret School',
    species: 'Pine',
    plantedDate: 'May 1, 2025',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Olivia champions forest causes.',
    rank: 'Volunteer'
  },
  {
    name: "Tree Protector",
    namedAfter: 'Paul Q.',
    location: 'Mombasa Academy',
    species: 'Quince',
    plantedDate: 'May 15, 2025',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Paul protects trees fiercely.',
    rank: 'Volunteer'
  },
  {
    name: "Eco Guardian",
    namedAfter: 'Quinn R.',
    location: 'Kisumu School',
    species: 'Redwood',
    plantedDate: 'June 1, 2025',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Quinn guards the ecosystem.',
    rank: 'Volunteer'
  },
  {
    name: "Green Visionary",
    namedAfter: 'Rachel S.',
    location: 'Thika Academy',
    species: 'Spruce',
    plantedDate: 'June 15, 2025',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Rachel envisions green futures.',
    rank: 'Volunteer'
  },
  {
    name: "Tree Advocate",
    namedAfter: 'Sam T.',
    location: 'Nyeri School',
    species: 'Tamarind',
    plantedDate: 'July 1, 2025',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Sam advocates for tree rights.',
    rank: 'Volunteer'
  },
  {
    name: "Forest Hero",
    namedAfter: 'Tina U.',
    location: 'Kericho Academy',
    species: 'Umbrella',
    plantedDate: 'July 15, 2025',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Tina is a forest hero.',
    rank: 'Volunteer'
  },
  {
    name: "Nature's Guardian",
    namedAfter: 'Victor V.',
    location: 'Kisii School',
    species: 'Vine',
    plantedDate: 'August 1, 2025',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Victor guards nature.',
    rank: 'Volunteer'
  },
  {
    name: "Green Pioneer",
    namedAfter: 'Wendy W.',
    location: 'Embu Academy',
    species: 'Willow',
    plantedDate: 'August 15, 2025',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Wendy pioneers green solutions.',
    rank: 'Volunteer'
  },
  {
    name: "Tree Warrior",
    namedAfter: 'Xavier X.',
    location: 'Meru School',
    species: 'Xylocarp',
    plantedDate: 'September 1, 2025',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Xavier wars for trees.',
    rank: 'Volunteer'
  },
  {
    name: "Forest Voice",
    namedAfter: 'Yara Y.',
    location: 'Nakuru Academy',
    species: 'Yew',
    plantedDate: 'September 15, 2025',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Yara voices forest concerns.',
    rank: 'Volunteer'
  },
  {
    name: "Green Champion",
    namedAfter: 'Zack Z.',
    location: 'Eldoret School',
    species: 'Zelkova',
    plantedDate: 'October 1, 2025',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    description: 'Zack champions green causes.',
    rank: 'Volunteer'
  }
];

// Pyramid layout: 1, 4, 3 (for 8 cards)
const pyramidRows = [
  [namedTrees[0]], // CEO
  [namedTrees[1], namedTrees[2], namedTrees[3], namedTrees[4]], // Manager, Senior, Junior, Intern/Volunteer
  [namedTrees[5], namedTrees[6], namedTrees[7]] // Volunteers
];

export function NamedTreesSection() {
  const [selectedTree, setSelectedTree] = useState<NamedTree | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAllCards, setShowAllCards] = useState(false);

  const openModal = (tree: NamedTree) => {
    setSelectedTree(tree);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTree(null);
  };

  const toggleViewAll = () => {
    setShowAllCards(!showAllCards);
  };

  return (
    <>
      <section id="gallery" className="py-20 px-4 md:px-8 bg-purple-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-green-700">
          Named Trees
        </h2>
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-12">
          These special trees have been named after scouts and WSPU members who
          have made outstanding contributions to environmental conservation.
        </p>
          
          {!showAllCards ? (
            // Pyramid layout
            <div className="flex flex-col gap-8 items-center">
              {pyramidRows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex flex-row gap-8 justify-center">
                  {row.map((tree, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-48 cursor-pointer"
                      onClick={() => openModal(tree)}
                    >
                      <div className="h-48 overflow-hidden flex items-center justify-center">
                        <img src={tree.image} alt={`${tree.name} tree`} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-green-700 mb-1">{tree.name}</h3>
                        <p className="text-purple-700 font-medium mb-1">Named after: {tree.namedAfter}</p>
                        <p className="text-xs text-gray-500 font-semibold">{tree.rank}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            // Grid layout for all cards
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {namedTrees.map((tree, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 w-48 cursor-pointer"
                  onClick={() => openModal(tree)}
                >
                  <div className="h-48 overflow-hidden flex items-center justify-center">
                    <img src={tree.image} alt={`${tree.name} tree`} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-green-700 mb-1">{tree.name}</h3>
                    <p className="text-purple-700 font-medium mb-1">Named after: {tree.namedAfter}</p>
                    <p className="text-xs text-gray-500 font-semibold">{tree.rank}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <button 
              onClick={toggleViewAll}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-purple-600 text-white hover:opacity-90 transition-all rounded-lg font-medium transform hover:scale-105 inline-block"
            >
              {showAllCards ? 'Show Pyramid View' : 'View All Named Trees'}
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedTree && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
              >
                ×
              </button>
              <div className="h-48 overflow-hidden">
                <img src={selectedTree.image} alt={`${selectedTree.name} tree`} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-700 mb-2">{selectedTree.name}</h3>
                <p className="text-purple-700 font-medium mb-2">Named after: {selectedTree.namedAfter}</p>
                <p className="text-sm text-gray-500 mb-4 font-semibold">{selectedTree.rank}</p>
                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <p><span className="font-medium">Species:</span> {selectedTree.species}</p>
                  <p><span className="font-medium">Location:</span> {selectedTree.location}</p>
                  <p><span className="font-medium">Planted:</span> {selectedTree.plantedDate}</p>
                </div>
                <p className="text-gray-700">{selectedTree.description}</p>
              </div>
            </div>
        </div>
        </div>
      )}
    </>
  );
}