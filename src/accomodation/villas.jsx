import { useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import Navbar from "../components/navbar";
import RoomCollection from "../components/RoomCollection";

function Villas() {
  const { rooms, loading, error } = useContext(RoomContext);

  if (loading) return <div className="p-4 text-center">Loading villas...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  const villas = rooms.filter(room => 
    room.roomType?.toLowerCase().includes("villa") ||
    room.roomName?.toLowerCase().includes("villa")
  );

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Navbar />
      
      {/* Overview Section */}
      <section className="mb-12 pt-6">
        <h1 className="text-center text-4xl md:text-5xl font-bold mb-6 mt-10 text-amber-800">
          Araw sa Paraiso Villas
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Araw sa Paraiso's Villas Just steps from the beach in secluded settings along Pamalican Island’s shore, 
            Amanpulo’s Villas offer consummate privacy. Designed for seamless indoor-to-outdoor living, each one is arranged 
            around an expansive swimming pool with outdoor lounging and dining areas. All villas are staffed by a private chef 
            and butler, and club cars (one per bedroom) invite independent exploration of the island.
            </p>
          
          <div className="border-t border-b border-gray-200 py-6 mb-6">
            <h2 className=" text-center text-3xl font-semibold mb-4 text-gray-800">All stays include</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Daily breakfast</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Daily scheduled wellness class</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Non-motorised watersports equipment</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Daily afternoon tea at Clubhouse</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Morning snorkeling trip</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Complimentary WiFi</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>In-room refreshments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Access to wellness facilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>24/7 concierge service</span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-gray-500 mt-4 italic">
              *Some activities require advance booking or are first come, first serve
            </p>
          </div>
        </div>
      </section>

      <RoomCollection 
        rooms={villas} 
        title="Our Premium Villas"
        fallbackDescription="Ultimate luxury in our spacious villas."
        basePath="/villas"
      />
    </div>
  );
}

export default Villas;