import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

// const items = [
//   {
//     id: 1,
//     title: "Back End Developer",
//     department: "Engineering",
//     type: "Full-time",
//     location: "Remote",
//   },
//   {
//     id: 2,
//     title: "Front End Developer",
//     department: "Engineering",
//     type: "Full-time",
//     location: "Remote",
//   },
//   {
//     id: 3,
//     title: "User Interface Designer",
//     department: "Design",
//     type: "Full-time",
//     location: "Remote",
//   },
// ];

export default function Pagination({
  page,
  setPage,
  pageHandler,
  totalItems = 20,
}) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(page - 1) * 6 + 1}</span> to{" "}
            <span className="font-medium">{page * 6}</span> of{" "}
            <span className="font-medium">20</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-orange-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {/* {Array.from({ length: Math.ceil(totalItems / 6) }).map(
              (el, index) => (
                <div
                  key={index} // Add a unique key to each element
                  aria-current="page"
                  onClick={() => pageHandler(index + 1)} // Corrected this line
                  className={`relative z-10 inline-flex items-center ${
                    page === index + 1 ? "bg-orange-600" : "bg-gray-400"
                  } px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600`}
                >
                  {index + 1}
                </div>
              )
            )} */}
            <div
              aria-current="page"
              className={`relative z-10 inline-flex items-center
                  bg-orange-600
              px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600`}
            >
              1
            </div>
            <div
              aria-current="page"
              className={`relative z-10 inline-flex items-center
                  bg-slate-400
              px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600`}
            >
              2
            </div>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
