const status = [
  {
    label: "Online now",
    users: 3,
    images: [
      "https://randomuser.me/api/portraits/women/1.jpg",
      "https://randomuser.me/api/portraits/men/2.jpg",
      "https://randomuser.me/api/portraits/men/3.jpg",
    ],
  },
  {
    label: "Offline",
    users: 3,
    images: [],
  },
  {
    label: "Last Visited",
    users: 3,
    images: [],
  },
];

export default function UserStatus() {
  return (
    <div className="flex flex-col p-4 gap-3 font-sans">
      {status.map((group, i) => (
        <div key={i} className="flex flex-col gap-2">
          <div className="flex justify-between text-sm font-semibold text-gray-800">
            {group.label}
            <span className="text-green-500 text-xs cursor-pointer">
              See all
            </span>
          </div>
          <div className="bg-[#F3F6FA] rounded-xl p-5 ">
            <div className="flex gap-3 items-center">
              {[...Array(group.users)].map((_, idx) => {
                const img = group.images?.[idx]; 
                return (
                  <div
                    key={idx}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-[0_0_0_2px_#e4e4e4] bg-cover bg-center bg-gray-300"
                    style={{
                      backgroundImage: img
                        ? `url(${img}), url('https://dummyimage.com/40x40/cccccc/ffffff&text=U')`
                        : `url('https://dummyimage.com/40x40/cccccc/ffffff&text=U')`,
                    }}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
