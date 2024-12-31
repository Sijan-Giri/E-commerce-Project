import Card from "../../globals/components/card/Card";
import Navbar from "../../globals/components/navbar/Navbar";

const Home = () => {
    return (
      <>
        <header className="min-h-screen bg-gray-900 pb-32">
            <Navbar />
          <div className="lg:flex pr-6 items-center lg:text-left w-full justify-between mt-12 text-center">
            <div className="pl-6">
              <h1 className="text-white text-4xl">
                A <span className="font-bold">free repository</span> for community <br /> components using{" "}
                <span style={{ color: "#0ED3CF" }}>TailwindCSS</span>
              </h1>
              <p className="text-white text-lg mt-4">
                Open source Tailwind UI components and templates to <br />
                bootstrap your new apps, projects or landing sites!
              </p>
  
              <div className="flex p-2 items-center lg:max-w-lg mt-6 px-2 border rounded-lg border-opacity-20">
                <input className="bg-gray-900 outline-none text-white w-full ml-4" type="text" placeholder="Search Components" />
                <div className="bg-gray-900">
                  <div style={{ backgroundColor: "#0ED3CF" }} className="p-3 rounded-lg cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="mt-8 lg:mt-0">
              <img className="w-full h-96 mr-96" src="https://tailwindcomponents.com/svg/website-designer-bro.svg" alt="" />
            </div>
          </div>
        </header>
        <div>
      <h1 className="text-4xl font-bold text-center text-gray-800 mt-12">
        My Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
      </>
    );
  };
  
  export default Home;
  