import { FaReply } from "react-icons/fa";

export default function FeedsSection() {
  return (
    <div className="bg-white rounded-2xl p-4 max-w-[400px] h-full flex flex-col font-sans mb-2">
      <h2 className="text-xl font-semibold mb-4">Feeds</h2>

      <div className="flex-grow overflow-y-auto flex flex-col gap-3 pr-1  scrollbar-hide">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="bg-[#f3f6fb] rounded-xl p-3 flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-t from-purple-400 to-purple-200" />
              <div className="flex flex-col">
                <div className="font-semibold text-sm text-gray-900">
                  File {i + 1}
                </div>
                <div className="text-xs text-gray-600 max-w-[160px] truncate">
                  Lorem Ipsum has been the industry standard...
                </div>
                <div className="text-[10px] text-gray-400 mt-0.5">
                  3 mins ago
                </div>
              </div>
            </div>

            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-600 shadow cursor-pointer">
              <FaReply size={12} />
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-gray-400 text-center mt-3">SCROLL DOWN</p>
    </div>
  );
}
