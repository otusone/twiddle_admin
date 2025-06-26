export default function EventSection() {
  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-6 font-sans mb-2">
      
      
      <div className="flex justify-between items-center text-sm font-semibold text-gray-800">
        <div className="flex items-center gap-3">
          <span className="text-base">Upcoming Events</span>
          <span className="text-xs text-gray-400 font-medium cursor-pointer underline">Show Details</span>
        </div>
        <span className="text-blue-500 text-sm font-medium cursor-pointer">Next Event →</span>
      </div>

      
      <div className="flex gap-6 items-center">
        <div
          className="w-[100px] h-[120px] rounded-xl bg-purple-400 bg-cover bg-center flex-shrink-0"
        //   style={{
        //     backgroundImage: "url('https://dummyimage.com/100x120/cccccc/ffffff&text=🎤')",
        //   }}
        ></div>

        <div className="flex-1">
          <p className="text-xs text-gray-500 mb-0.5">Carnival</p>
          <h3 className="text-base font-bold mb-2">Grand Concert</h3>

          <div className="flex flex-wrap text-xs text-gray-600 gap-x-4 mb-1">
            <span className="flex items-center gap-1">
              📅 21 October, 2022
            </span>
            <span className="flex items-center gap-1">🕙 10PM - 01AM</span>
            <span className="flex items-center gap-1">📍 Stanford Stadium</span>
          </div>

          <div className="flex text-xs text-gray-600 gap-4 border-t border-gray-200 pt-2 mt-2">
            <span>Tickets Issued: <b>100k</b></span>
            <span>Ticket Sold: <b>80k</b></span>
            <span>Ticket Cancelled: <b>10k</b></span>
          </div>

          <div className="text-yellow-600 bg-yellow-100 text-xs font-semibold inline-block mt-3 py-1 px-2 rounded-md">
            🎫 Ticket Price: ₹1200
          </div>
        </div>
      </div>
 
      <div className="flex flex-col sm:flex-row justify-between gap-5">
        
        <div className="flex-1">
          <div className="text-xs font-semibold text-gray-700 mb-2">
            EVENT MANAGERS (3)
          </div>
          <div className="flex gap-3">
            {["Belle", "Samantha", "Womania"].map((name, i) => (
              <div key={i} className="flex flex-col items-center gap-1 text-xs">
                <div
                  className="w-14 h-14 rounded-lg bg-purple-400 bg-cover bg-center"
                //   style={{
                //     backgroundImage:
                //       "url('https://dummyimage.com/60x60/cccccc/ffffff&text=M')",
                //   }}
                ></div>
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>


        <div className="flex-1">
          <div className="text-xs font-semibold text-gray-700 mb-2">
            ARTISTS (12)
          </div>
          <div className="flex gap-3">
            {["Nipen", "Nipen", "Nipen"].map((name, i) => (
              <div key={i} className="flex flex-col items-center gap-1 text-xs">
                <div
                  className="w-14 h-14 rounded-lg bg-purple-400 bg-cover bg-center"
                //   style={{
                //     backgroundImage:
                //       "url('https://dummyimage.com/60x60/cccccc/ffffff&text=A')",
                //   }}
                ></div>
                <span>{name}</span>
              </div>
            ))}

            <div className="w-14 h-14 flex items-center justify-center rounded-lg bg-gray-100 cursor-pointer">
              ➜
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
