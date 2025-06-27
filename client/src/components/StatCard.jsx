const cards = [
  {
    title: "Total Users",
    value: "100k",
    note: "Average 11k users daily",
    gradient: "bg-gradient-to-br from-orange-500 to-orange-400",
    iconBg: "bg-orange-700 bg-opacity-50",
  },
  {
    title: "Total Revenue",
    value: "089 lakh",
    note: "Average 11k users daily",
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-500",
    iconBg: "bg-indigo-800 bg-opacity-50",
  },
  {
    title: "Total Subscriber",
    value: "018k",
    note: "Average 11k users daily",
    gradient: "bg-gradient-to-br from-cyan-400 to-blue-500",
    iconBg: "bg-cyan-800 bg-opacity-50",
  },
  {
    title: "Total Events",
    value: "1k",
    note: "Based on Current accounting",
    gradient: "bg-gradient-to-br from-green-500 to-emerald-500",
    iconBg: "bg-emerald-800 bg-opacity-50",
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-5 font-sans">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`relative flex justify-between items-center rounded-2xl px-6 py-8 text-white shadow-xl overflow-hidden ${card.gradient}`}
        >
        
          <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2)_1px,_transparent_1px)] bg-[length:30px_30px]"></div>

          
          <div className="relative z-10">
            <h3 className="text-sm font-semibold mb-1">{card.title}</h3>
            <h2 className="text-3xl font-bold mb-1">{card.value}</h2>
            <p className="text-xs text-white text-opacity-80">{card.note}</p>
          </div>

        
          <div className={`relative z-10 flex items-center justify-center ${card.iconBg} w-16 h-20 rounded-xl`}>
            <div
              className="w-6 h-6 rounded-md"
              style={{
                WebkitMaskImage:
                  "url('https://img.icons8.com/ios-filled/50/ffffff/image.png')",
                WebkitMaskSize: "60%",
                WebkitMaskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                maskImage:
                  "url('https://img.icons8.com/ios-filled/50/ffffff/image.png')",
                maskSize: "60%",
                maskPosition: "center",
                maskRepeat: "no-repeat",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}
