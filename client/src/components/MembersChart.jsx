import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = {
  labels: ["New members", "Male", "Female"],
  datasets: [
    {
      data: [70.34, 10.34, 20.34],
      backgroundColor: ["#367cff", "#b0ddc6", "#f4a7b9"],
      borderWidth: 0,
      circumference: 180,
      rotation: 270,
      cutout: "60%",
    },
  ],
};

const chartOptions = {
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: function (context) {
          return `${context.label}: ${context.raw}%`;
        },
      },
    },
  },
  maintainAspectRatio: false,
};

export default function MembersChart() {
  return (
    <div className="p-4 font-sans">
      <h2 className="text-lg font-semibold mb-4">Members</h2>

      <div className="flex flex-col md:flex-row justify-between items-start gap-3">
        <div className="flex flex-col items-center w-full md:w-3/5">
          <div className="relative w-full max-w-[250px] aspect-square">
            <Doughnut data={chartData} options={chartOptions} />

            <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold text-gray-800 text-base">
              <div>70.34%</div>
              <div className="text-xs text-gray-500">
                Percentage of<br />Subscribers
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs text-gray-600">
            <div>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#367cff] mr-1"></span>
              New members
            </div>
            <div>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#b0ddc6] mr-1"></span>
              Male
            </div>
            <div>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#f4a7b9] mr-1"></span>
              Female
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-2/5">
          {[
            { label: "New members", value: "70.34%" },
            { label: "Males", value: "10.34%" },
            { label: "Females", value: "20.34%" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between bg-[#F2F8FF] rounded-xl px-3 py-2 text-xs font-medium"
            >
              <span className="text-gray-500">▶</span>
              <span className="flex-1 ml-2">{item.label}</span>
              <span className="text-[#367cff] font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 text-[10px] text-gray-400 text-right">
        * Data based on Current accounting year
      </p>
    </div>
  );
}
