import React from "react";

const CompanyPeople = () => {
  return (
    <div>
      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Meet the brains
            </h2>
            <p className="max-w-md mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis.
            </p>
          </div>

          <div className="grid grid-cols-2 mt-8 text-center sm:mt-16 lg:mt-20 sm:grid-cols-4 gap-y-8 lg:grid-cols-6">
            <div>
              <img
                className="object-cover mx-auto rounded-lg w-28 h-28"
                src="https://avatars.githubusercontent.com/u/78756747?v=4"
                alt=""
              />
              <p className="mt-8 text-lg font-semibold leading-tight text-black">
                Md Rezwan Nayem
              </p>
              <p className="mt-1 text-base leading-tight text-gray-600">
                Founder
              </p>
            </div>

            <div>
              <img
                className="object-cover mx-auto rounded-lg w-28 h-28"
                src="https://miro.medium.com/v2/resize:fit:572/0*ap7l9S1NbUBZT_Nt.jpg"
                alt=""
              />
              <p className="mt-8 text-lg font-semibold leading-tight text-black">
                Md Shohag Hossain
              </p>
              <p className="mt-1 text-base leading-tight text-gray-600">CTO</p>
            </div>

            <div>
              <img
                className="object-cover mx-auto rounded-lg w-28 h-28"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQankryt04OyH_wSJC68p3NlnIGB5-bxuuMGwyPsPL7Ug&s"
                alt=""
              />
              <p className="mt-8 text-lg font-semibold leading-tight text-black">
                Bessie Cooper
              </p>
              <p className="mt-1 text-base leading-tight text-gray-600">CMO</p>
            </div>

            <div>
              <img
                className="object-cover mx-auto rounded-lg w-28 h-28"
                src="https://i0.wp.com/digest.myhq.in/wp-content/uploads/2023/12/image-7.png?resize=900%2C600&ssl=1"
                alt=""
              />
              <p className="mt-8 text-lg font-semibold leading-tight text-black">
                Arlene McCoy
              </p>
              <p className="mt-1 text-base leading-tight text-gray-600">
                Senior Developer
              </p>
            </div>

            <div>
              <img
                className="object-cover mx-auto rounded-lg w-28 h-28"
                src="https://assets.entrepreneur.com/content/1x1/300/20170809112931-profilephoto.jpeg"
                alt=""
              />
              <p className="mt-8 text-lg font-semibold leading-tight text-black">
                Brooklyn Simmons
              </p>
              <p className="mt-1 text-base leading-tight text-gray-600">
                Product Designer
              </p>
            </div>

            <div>
              <img
                className="object-cover mx-auto rounded-lg w-28 h-28"
                src="https://www.founderjar.com/wp-content/uploads/2022/09/10.-Suumit-Shah.jpeg"
                alt=""
              />
              <p className="mt-8 text-lg font-semibold leading-tight text-black">
                Brooklyn
              </p>
              <p className="mt-1 text-base leading-tight text-gray-600">
                Product Designer
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyPeople;
