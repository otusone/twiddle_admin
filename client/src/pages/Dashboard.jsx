import StatCards from "../components/StatCard";
import UserStatus from "../components/UserStatus";
import MembersChart from "../components/MembersChart";
import UpcomingEvents from "../components/EventSection";
import FeedList from "../components/FeedsSection";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5 h-screen overflow-y-auto hide-scrollbar">
      <div className="w-full">
        <StatCards />
      </div>

      
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.4fr] gap-6 items-start">
        <div className="flex flex-col gap-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-4 shadow-lg min-h-[100px]">
              <UserStatus />
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg min-h-[100px]">
              <MembersChart />
            </div>
          </div>

        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-2">
            <div className="col-span-1 md:col-span-2 bg-white rounded-2xl p-4 shadow-lg min-h-[100px]">
              <UpcomingEvents />
            </div>
            <div className="col-span-1 bg-white rounded-2xl p-4 shadow-lg min-h-[100px]">
              <UserStatus />
            </div>
          </div>


        </div>
        <div className="flex flex-col self-stretch bg-white rounded-2xl p-4 shadow-lg min-h-[100px] mb-2">
          <FeedList />
        </div>
      </div>
    </div>
  );
}
