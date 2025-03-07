import Sponsor from "../assets/sponsors.json";

function Card({ imgurl, white }) {
  return (
    <div>
      <div
        className={`h-[200px] w-[350px] overflow-hidden text-center m-[35px] rounded-xl ${
          white == true ? `bg-white` : `bg-gray-900`
        }`}
      >
        <div className="h-full w-full flex justify-center align-center">
          <img className="p-2 m-auto w-9/12 max-w-xs h-auto" src={imgurl} />
        </div>
      </div>
    </div>
  );
}

function Sponsors() {
  return (
    <>
      <div id="Sponsors" className="bg-black text-center">
        <br />
        <br />
        <br />
        <span className="text-blue-500 leading-tight mt-20 mb-40 text-3xl sm:text-5xl lg:text-6xl font-bold ">
          Our Sponsors
        </span>
        <br />
        <br />
        <div className="p-2.5">
          <div className="flex flex-wrap justify-center align-center">
            {Sponsor.slice(0, Sponsor.length).map((card) => (
              <Card imgurl={card.imgurl} white={card.whiteBG} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sponsors;
