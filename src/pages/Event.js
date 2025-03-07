/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

function Event({ events }) {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [currentEvents, setCurrentEvents] = useState(events);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const eventList =
    filter || search || priceSort ? filteredEvents : currentEvents;

  const sortEvents = (eventsL) => {
    const nonDefaultPoster = [];
    const defaultPoster = [];

    eventsL.forEach((e) => {
      if (e.poster_url === "https://i.imgur.com/2jzM0wr.jpg") {
        defaultPoster.push(e);
      } else {
        nonDefaultPoster.push(e);
      }
    });
    return [...nonDefaultPoster, ...defaultPoster];
  };

  useEffect(() => {
    setCurrentEvents(sortEvents(events));
  }, [events]);

  const applyFilter = (filt, sTerm, sortVal) => {
    let fList = [...currentEvents];

    if (filt !== "") {
      fList = currentEvents.filter(
        (e) => e.event_type.toLowerCase().trim() === filt.toLowerCase().trim()
      );
    }

    if (sTerm !== "") {
      fList = fList.filter((e) => {
        return (
          e.event_name.toLowerCase().includes(sTerm.toLowerCase()) ||
          e.description.toLowerCase().includes(sTerm.toLowerCase()) ||
          e.organiser.toLowerCase().includes(sTerm.toLowerCase()) ||
          e.event_type.toLowerCase().includes(sTerm.toLowerCase())
        );
      });
    }

    if (sortVal !== "") {
      if (sortVal === "p-low") {
        fList.sort((e1, e2) => e1.price - e2.price);
      } else if (sortVal === "p-high") {
        fList.sort((e1, e2) => e2.price - e1.price);
      }
    }

    return fList;
  };

  const onSearch = (term) => {
    setSearch(term);
    setFilteredEvents(applyFilter(filter, term, priceSort));
  };

  const onFilter = (f) => {
    setFilter(f);
    setFilteredEvents(applyFilter(f, search, priceSort));
  };

  const onSort = (s) => {
    setPriceSort(s);
    setFilteredEvents(applyFilter(filter, search, s));
  };

  return (
    <div>
      <section className="bg-slate-900 flex flex-col">
        <div className="container px-6 py-10 mx-auto ">
          <h1 className="text-3xl font-semibold text-center capitalize lg:text-4xl text-white">
            Events
          </h1>

          <div className="flex justify-center mx-auto mt-2">
            <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
            <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
            <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
          </div>
          <br />
          <div className="text-center">
            <a
              href="https://imminent-crepe-93a.notion.site/Rules-and-Regulations-39aa0ccf420f4136b9e407837f20eb0f"
              target={"_blank"}
              className="text-blue-600 underline text-lg"
            >
              Rules and Regulations
            </a>
          </div>
          <div className="flex justify-center mt-5">
            <div className="w-full md:w-2/3 rounded shadow p-5 bg-gray-900">
              <div className="relative">
                <div className="absolute flex items-center ml-2 h-full">
                  <svg
                    className="w-4 h-4 fill-current text-primary-gray-dark"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                  </svg>
                </div>

                <input
                  type="text"
                  onChange={(e) => onSearch(e.target.value)}
                  value={search}
                  placeholder="Search for an event..."
                  class="px-8 py-3 w-full rounded-md bg-gray-100 border-gray-500 text-sm text-gray-700 border-transparent focus:bg-white outline-none"
                />
              </div>

              <div className="flex items-center justify-between mt-4">
                <p className="font-medium">Filters</p>

                <button
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                  onClick={() => {
                    setFilter("");
                    setSearch("");
                    setPriceSort("");
                  }}
                >
                  Reset
                </button>
              </div>

              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                  <select
                    value={priceSort}
                    onChange={(e) => onSort(e.target.value)}
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm text-gray-700"
                  >
                    <option value="">Sort</option>
                    <option value="p-low">Price: Low to High</option>
                    <option value="p-high">Price: High to Low</option>
                  </select>

                  <select
                    className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm text-gray-700"
                    value={filter}
                    onChange={(e) => onFilter(e.target.value)}
                  >
                    <option value="">All Event Types</option>
                    <option value="codeathon">Codeathon</option>
                    <option value="competition">Competition</option>
                    <option value="exhibition">Exhibition</option>
                    <option value="game">Game</option>
                    <option value="workshop">Workshop</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center mt-6">
            {eventList.map((e) => {
              return (
                <EventCard
                  key={e.event_id}
                  EventName={e.event_name}
                  EventDisc={e.description}
                  Organizer={e.organiser}
                  Type={e.event_type}
                  Price={e.price}
                  imgUrl={e.poster_url}
                  filter={onFilter}
                  search={onSearch}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Event;
